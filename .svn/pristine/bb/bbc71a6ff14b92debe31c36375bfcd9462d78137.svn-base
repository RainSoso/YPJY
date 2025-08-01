import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [{
  title: '社会信用代码', dataIndex: 'shxydm', defaultHidden: true
}, {
  title: '证书编号', dataIndex: 'zsbh', width: 110
}, {
  title: '企业名称', dataIndex: 'qymc'
}, {
  title: '注册地址', dataIndex: 'zcdz', defaultHidden: true
}, {
  title: '法定代表人', dataIndex: 'fddbr', width: 95
}, {
  title: '企业负责人', dataIndex: 'qyfzr', defaultHidden: true
}, {
  title: '质量授权人', dataIndex: 'zlsqr', defaultHidden: true
}, {
  title: '生产负责人', dataIndex: 'scfzr', width: 95, defaultHidden: true
}, {
  title: '生产地址', dataIndex: 'scdz', defaultHidden: true
}, {
  title: '生产地址和生产范围', dataIndex: 'scfw', defaultHidden: true
}, {
  title: '生产地址和生产范围副本', dataIndex: 'scfwFb', defaultHidden: true
}, {
  title: '发证机关', dataIndex: 'fzjg', defaultHidden: true
}, {
  title: '发证日期', dataIndex: 'fzrq', width: 95
}, {
  title: '有效期至', dataIndex: 'yxqz', width: 95
}, {
  title: '即将到期天数', dataIndex: 'dqts', width: 110, format(text) {
    return text + ' 天'
  },
}, {
  title: '分类码', dataIndex: 'fl', defaultHidden: true
}, {
  title: '日常监管机构名称', dataIndex: 'rcjgjgmc', defaultHidden: true
}, {
  title: '日常监管人员姓名', dataIndex: 'rcjgryxm', defaultHidden: true
}, {
  title: '备注', dataIndex: 'bz', defaultHidden: true
}, {
  title: '状态', dataIndex: 'status', defaultHidden: true
}, {
  title: '行政区划代码', dataIndex: 'xzqhdm', defaultHidden: true
}];

export const searchFormSchema: FormSchema[] = [
  {
  label: '所属地市', field: 'xzqhdm',
  component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }
  , colProps: { xxl: { span: 4 } }
},
{
  label: '到期范围', field: 'dqRange', component: 'Select', componentProps: {
    options: [{ value: '1M', label: '一个月内' }, { value: '3M', label: '三个月内' }, { value: '6M', label: '六个月内' }, { value: '1Y', label: '一年内' }]
  }
  , colProps: { xxl: { span: 4 } }
}, {
  label: '证书编号', field: 'zsbh', component: 'JInput', colProps: { xxl: { span: 5 } }
}, {
  label: '企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
}];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '证书编号',
    field: 'zsbh',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '注册地址',
    field: 'zcdz',
    component: 'Input',
  },
  {
    label: '法定代表人',
    field: 'fddbr',
    component: 'Input',
  },
  {
    label: '企业负责人',
    field: 'qyfzr',
    component: 'Input',
  },
  {
    label: '质量授权人',
    field: 'zlsqr',
    component: 'Input',
  },
  {
    label: '生产负责人',
    field: 'scfzr',
    component: 'Input',
  },
  {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
  },
  {
    label: '生产地址和生产范围',
    field: 'scfw',
    component: 'Input',
  },
  {
    label: '生产地址和生产范围副本',
    field: 'scfwFb',
    component: 'Input',
  },
  {
    label: '发证机关',
    field: 'fzjg',
    component: 'Input',
  },
  {
    label: '发证日期',
    field: 'fzrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '有效期至',
    field: 'yxqz',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '分类码',
    field: 'fl',
    component: 'Input',
  },
  {
    label: '日常监管机构名称',
    field: 'rcjgjgmc',
    component: 'Input',
  },
  {
    label: '日常监管人员姓名',
    field: 'rcjgryxm',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'bz',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Input',
  },
  {
    label: '行政区划代码',
    field: 'xzqhdm',
    component: 'MAreaSelect',
  },
];
