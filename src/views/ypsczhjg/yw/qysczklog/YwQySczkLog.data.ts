import { ref } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
import { getColumns, getSearchFormSchema } from '/@/views/ypsczhjg/yw/rcjg/Tywrcjgjgjg.data';
import { list } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.api';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil.js';
import Tools from '/@/utils/tools';

export const czlxField = ref('');

export const columns: BasicColumn[] = [{
  title: '操作类型', dataIndex: 'czlx', width: 80, customRender: ({ text }) => {
    return render.renderDictNative(
      text, [
      { label: '停产', value: '0', color: 'red' },
      { label: '复产', value: '1', color: 'green' }
    ], true);
  },
}, {
  title: '单位/部门', dataIndex: 'createByOrgName', width: 150
}, {
  title: '备注人', dataIndex: 'createByName', width: 100
}, {
  title: '备注时间', dataIndex: 'createTime', format: 'date|YYYY-MM-DD', width: 100,
}, {
  title: '备注/说明', dataIndex: 'remark'
}];

export const searchFormSchema: FormSchema[] = [{
  label: '统一社会信用代码', field: 'shxydm', component: 'Input'
}, {
  label: '企业名称', field: 'qymc', component: 'Input'
}];

export function getformSchema(permission = { hasTc: true, hasFc: true }): FormSchema[] {
  return [{
    label: '', field: 'id', component: 'Input', show: false
  }, {
    label: '统一社会信用代码', field: 'shxydm', labelWidth: 155, component: 'Input', componentProps: { disabled: true }
  }, {
    label: '企业名称', field: 'qymc', component: 'Input', componentProps: { disabled: true }
  }, {
    label: '操作类型', field: 'czlx', component: 'RadioButtonGroup', required: true,
    componentProps: ({ formModel }) => {
      let options = ref<any>([]), res = {
        options: options.value, onChange: (e: any) => {
          czlxField.value = e;
        }
      };
      getDictItems('qylog_czlx', null).then((res) => {
        if (permission.hasTc) {
          let item = res.find(item => item.value === '0');
          item && options.value.push(item);
        }
        if (permission.hasFc) {
          let item = res.find(item => item.value === '1');
          item && options.value.push(item);
        }
      });
      res.onChange(formModel.czlx);
      return res;
    },
  }, {
    label: '复产检查', field: 'jdjcId', component: 'MPopup', componentProps: ({ formModel }) => {
      const selectOptions = {
        placeholder: '请选择企业复产监督检查记录',
        modalTitle: '选择监督检查',
        rowKey: 'id',
        labelKey: 'label',
        width: '90%',
        tableProps: {
          api: list,
          columns: getColumns(),
          formConfig: {
            schemas: getSearchFormSchema(),
          },
          beforeFetch(params) {
            params.shxydm = formModel.shxydm;
            return params;
          },
          defSort: {
            column: 'ywbldwxzqhdm',
            order: 'asc',
          },
        }
      };
      return Tools.deepMerge({}, selectOptions, {
        onChange(value, options, selected) { }
      });
    },
    ifShow: ({ values }) => {
      return values.czlx === '1';
    },
    dynamicRules: ({ values }) => {
      return values.czlx == '1' ? [{ required: true, message: '请选择监督检查信息！' }] : [];
    },
  }, {
    label: '备注/说明', field: 'remark', component: 'InputTextArea',
    componentProps: ({ formModel }) => {
      return { rows: 5, placeholder: formModel.czlx === '0' ? '请填写停产原因以及停产时间' : '' }
    },
    required: true
  }, {
    label: '附件(5)', field: 'fj', component: 'MUpload', helpMessage: '最多上传5个附件',
    componentProps: ({ formModel }) => {
      return { maxCount: 5, biz: 'qysczklog', bisId: formModel.id, source: '企业停复产', category: formModel.czlx === "1" ? '复产' : '停产' }
    },
    dynamicRules: ({ values }) => {
      return values.czlx == '1' ? [{ required: true, message: '请上传附件' }] : [];
    }
  }]
};