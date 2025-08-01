import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { columnRender } from '/@/utils/dict/dictUtils';

export const columns: BasicColumn[] = [{
  title: '公告编号', dataIndex: 'ggbh', width: 100
}, {
  title: '委托类型', dataIndex: 'wtlx', defaultHidden: true
}, {
  title: '企业名称（委托）', dataIndex: 'qymc', width: 140
}, {
  title: '许可证号（委托）', dataIndex: 'xkzh', width: 110
}, {
  title: '注册地址（委托）', dataIndex: 'zcdz', width: 100, defaultHidden: true
}, {
  title: '委托类型', dataIndex: 'wtbgsx', width: 80
}, {
  title: '委托品种范围', dataIndex: 'wtpzfw', width: 100
}, {
  title: '法定代表人', dataIndex: 'fddbr', width: 110, defaultHidden: true
}, {
  title: '企业名称（受托方）', dataIndex: 'stfqymc', width: 140
}, {
  title: '许可证号（受托方）', dataIndex: 'xkzstf', width: 120
}, {
  title: '注册地址（受托方）', dataIndex: 'stfzcdz', width: 100, defaultHidden: true
}, {
  title: '仓库地址（受托方）', dataIndex: 'stfckdz', width: 100, defaultHidden: true
}, {
  title: '委托销售品种', dataIndex: 'wtxspz', defaultHidden: true
}, {
  title: '委托储存', dataIndex: 'wtcc', defaultHidden: true
}, {
  title: '委托运输', dataIndex: 'wtys', defaultHidden: true
}, {
  title: '委托开始时间', dataIndex: 'wtkssj', defaultHidden: true
}, {
  title: '委托结束时间', dataIndex: 'wtjssj', defaultHidden: true
}, {
  title: '已确认委托事项说明', dataIndex: 'yqrwtsxsm', defaultHidden: true
}, {
  title: '联系人', dataIndex: 'lxr', defaultHidden: true
}, {
  title: '联系电话', dataIndex: 'lxdh', defaultHidden: true
}, {
  title: '简要情况说明', dataIndex: 'jyqksm', defaultHidden: true
}, {
  title: '监管部门补正意见', dataIndex: 'jgbmbzyj', defaultHidden: true
}, {
  title: '用户id', dataIndex: 'userId', defaultHidden: true
}, {
  title: '报告类别', dataIndex: 'category', width: 60, customRender: ({ text }) => columnRender('wtbgBaseCategory', text)
}, {
  title: '上报时间', dataIndex: 'submitDate', format: 'date|YYYY-MM-DD', width: 80
}, {
  title: '状态', dataIndex: 'state_dictText', width: 50
}, {
  title: '委托时间', dataIndex: 'wtkssj', format: 'date|YYYY-MM-DD', width: 80
}, {
  title: '创建日期', dataIndex: 'createDate', defaultHidden: true
}, {
  title: '修改日期', dataIndex: 'updateDate', defaultHidden: true
}];


export const searchFormSchema: FormSchema[] = [{
  label: '委托企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
}, {
  label: '受托企业名称', field: 'stfqymc', component: 'JInput', colProps: { xxl: { span: 5 } }
}, {
  label: '委托类型', field: 'wtbgsx', component: 'JInput', colProps: { xxl: { span: 5 } }
}, {
  label: '已变更', labelWidth: 80, field: 'hasChanged', component: 'JDictSelectTag', componentProps: { dictCode: 'yes_no', showChooseOption: false },
  defaultValue: 'N', colProps: { xxl: { span: 3 } }
}];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '公告编号',
    field: 'ggbh',
    component: 'Input',
    show: false
  },
  {
    label: '委托类型',
    field: 'wtlx',
    component: 'Input',
    show: false
  },
  {
    label: '委托品种范围',
    field: 'wtpzfw',
    component: 'Input',
    show: false
  },
  {
    label: '企业名称（委托）',
    field: 'qymc',
    component: 'Input',
    show: false
  },
  {
    label: '许可证号（委托）',
    field: 'xkzh',
    component: 'Input',
    show: false
  },
  {
    label: '注册地址（委托）',
    field: 'zcdz',
    component: 'Input',
    show: false
  },
  {
    label: '法定代表人',
    field: 'fddbr',
    component: 'Input',
    show: false
  },
  {
    label: '委托报告事项',
    field: 'wtbgsx',
    component: 'Input',
    show: false
  },
  {
    label: '企业名称（受托方）',
    field: 'stfqymc',
    component: 'Input',
    show: false
  },
  {
    label: '许可证号（受托方）',
    field: 'xkzstf',
    component: 'Input',
    show: false
  },
  {
    label: '注册地址（受托方）',
    field: 'stfzcdz',
    component: 'Input',
    show: false
  },
  {
    label: '仓库地址（受托方）',
    field: 'stfckdz',
    component: 'Input',
    show: false
  },
  {
    label: '委托销售品种',
    field: 'wtxspz',
    component: 'Input',
    show: false
  },
  {
    label: '委托储存',
    field: 'wtcc',
    component: 'Input',
    show: false
  },
  {
    label: '委托运输',
    field: 'wtys',
    component: 'Input',
    show: false
  },
  {
    label: '委托开始时间',
    field: 'wtkssj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
    show: false
  },
  {
    label: '委托结束时间',
    field: 'wtjssj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
    show: false
  },
  {
    label: '已确认委托事项说明',
    field: 'yqrwtsxsm',
    component: 'Input',
    show: false
  },
  {
    label: '联系人',
    field: 'lxr',
    component: 'Input',
    show: false
  },
  {
    label: '联系电话',
    field: 'lxdh',
    component: 'Input',
    show: false
  },
  {
    label: '简要情况说明',
    field: 'jyqksm',
    component: 'Input',
    show: false
  },
  {
    label: '监管部门补正意见',
    field: 'jgbmbzyj',
    required: true,
    component: 'InputTextArea',
    colProps: {
      span: 22,
    },
    componentProps: {
      placeholder: '请输入意见',
      rows: 6,
    },
  },
  {
    label: '用户id',
    field: 'userId',
    component: 'Input',
    show: false
  },
  {
    label: '状态',
    field: 'state',
    component: 'InputNumber',
    show: false
  },
  {
    label: '创建日期',
    field: 'createDate',
    component: 'Input',
    show: false
  },
  {
    label: '修改日期',
    field: 'updateDate',
    component: 'Input',
    show: false
  },
];

export const backFormSchema: FormSchema[] = [{
  label: '', field: 'id', component: 'Input', show: false
}, {
  label: '状态', field: 'state', component: 'InputNumber', show: false
}, {
  label: '补正意见', field: 'jgbmbzyj', required: true, component: 'InputTextArea', componentProps: { maxLength: 500, rows: 6 }
}, {
  label: '联系人', field: 'auditBy', required: true, component: 'Input', componentProps: { maxLength: 64 }, colProps: { span: 12 }
}, {
  label: '联系电话', field: 'auditTel', component: 'Input', componentProps: { maxLength: 64 }, colProps: { span: 12 }
}];

