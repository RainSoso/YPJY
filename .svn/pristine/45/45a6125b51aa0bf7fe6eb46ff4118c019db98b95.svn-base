import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { dictItemCheck } from './dict.api';
import { rules } from '/@/utils/helper/validator';
export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 240,
  },
  {
    title: '字典编号',
    dataIndex: 'dictCode',
    width: 240,
  },
  {
    title: '描述',
    dataIndex: 'description',
    // width: 120
  },
];

export const recycleBincolumns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 120,
  },
  {
    title: '字典编号',
    dataIndex: 'dictCode',
    width: 120,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '字典名称',
    field: 'dictName',
    component: 'JInput',
    colProps: { span: 6 },
  },
  {
    label: '字典编码',
    field: 'dictCode',
    component: 'JInput',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '字典名称',
    field: 'dictName',
    required: true,
    component: 'Input',
  },
  {
    label: '字典编码',
    field: 'dictCode',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
    dynamicRules: ({ model, schema }) => rules.duplicateCheckRule('sys_dict', 'dict_code', model, schema, true),
  },
  {
    label: '描述',
    field: 'description',
    component: 'Input',
  },
];

export const dictItemColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'itemText',
    customRender({text, record}) {
      if (!record.color) return text;
      if (record.displayType == 'tags') return h(Tag, {color: record?.color, class: 'lg'}, text);
      return h('span', {style: 'color:' + record?.color}, text);
    }
  },
  {
    title: '数据值',
    dataIndex: 'itemValue',
    width: 100,
  },
  {
    title:'排序',
    dataIndex:'sortOrder',
    width:80
  },
  {
    title:'是否启用',
    dataIndex: 'status_dictText',
    width:100
  }
];

export const dictItemSearchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'itemText',
    component: 'JInput',
  },
  {
    label: '状态',
    field: 'status',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '名称',
    field: 'itemText',
    labelWidth: 120,
    required: true,
    component: 'Input',
  },
  {
    label: '数据值',
    field: 'itemValue',
    labelWidth: 120,
    component: 'Input',
    dynamicRules: ({ values, model }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('请输入数据值');
            }
            if (new RegExp("[`~!@#$^&*()=|{}'.<>《》/?！￥（）—【】‘；：”“。，、？]").test(value)) {
              return Promise.reject('数据值不能包含特殊字符！');
            }
            return new Promise<void>((resolve, reject) => {
              let params = {
                dictId: values.dictId,
                id: model.id,
                itemValue: value,
              };
              dictItemCheck(params)
                .then((res) => {
                  res.success ? resolve() : reject(res.message || '校验失败');
                })
                .catch((err) => {
                  reject(err.message || '验证失败');
                });
            });
          },
        },
      ];
    },
  },
  {
    label: '颜色',
    field: 'color',
    labelWidth: 120,
    component: 'Input',
    componentProps: {
      type: 'color'
    },
    colProps: { span: 12 }
  },
  {
    field: 'displayType',
    label: '显示类型',
    labelWidth: 120,
    defaultValue: 'normal',
    component: 'JDictSelectTag',
    componentProps: {
        type:'radioButton',
        dictCode:'dict_item_displayType'
    },
    colProps: { span: 12 }
  },
  {
    label: '描述',
    field: 'description',
    labelWidth: 120,
    component: 'Input',
  },
  {
    field: 'sortOrder',
    label: '排序',
    labelWidth: 120,
    component: 'InputNumber',
    defaultValue: 1,
    colProps: { span: 12 },
  },
  {
    field: 'status',
    label: '是否启用',
    labelWidth: 120,
    defaultValue: 1,
    component: 'JDictSelectTag',
    componentProps: {
      type: 'radioButton',
      dictCode: 'dict_item_status',
      stringToNumber: true,
    },
    colProps: { span: 12 },
  },
];
