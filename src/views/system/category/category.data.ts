import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [{
  title: '分类名称', dataIndex: 'name', width: 350, align: 'left'
}, {
  title: '分类编码', dataIndex: 'code', align: 'left'
}, {
  title: '分类值', dataIndex: 'value', width: 110
}, {
  title: '颜色', dataIndex: 'color', width: 110, customRender({ record }) {
    if (!record.color) return '';
    return h('div', { style: { background: record.color, color: '#fff' } }, record.color);
  }
}, {
  title: '排序号', dataIndex: 'sort', width: 110
}];

export const searchFormSchema: FormSchema[] = [{
  label: '名称', field: 'name', component: 'JInput', colProps: { span: 6 },
}, {
  label: '编码', field: 'code', component: 'JInput', colProps: { span: 6 },
}];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '父级节点',
    field: 'pid',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        value: 'key',
      },
      dropdownStyle: {
        maxHeight: '50vh',
      },
      getPopupContainer: () => document.body,
    },
    show: ({ values }) => {
      return values.pid !== '0';
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '分类名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '分类值', field: 'value', required: false, component: 'Input'
  }, {
    label: '颜色', field: 'color', component: 'Input', componentProps: { type: 'color' }
  },
  {
    field: 'displayType', label: '显示类型', defaultValue: 'normal', component: 'JDictSelectTag', componentProps: {
      type: 'radioButton', dictCode: 'dict_item_displayType'
    }
  }, {
    label: '排序号', field: 'sort', component: 'InputNumber', required: true, defaultValue: 99
  }
];
