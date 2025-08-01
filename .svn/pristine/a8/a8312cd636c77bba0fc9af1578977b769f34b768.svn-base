import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import moment from 'moment';

export const columns: BasicColumn[] = [
  {
    title: '案件编号',
    dataIndex: 'ajbh'
  },
  {
    title: '案由',
    dataIndex: 'ay'
  },
  {
    title: '执法类别',
    dataIndex: 'zflb'
  },
  {
    title: '案件来源',
    dataIndex: 'ajly'
  },
  {
    title: '当事人ID',
    dataIndex: 'dsrid'
  },
  {
    title: '当事人',
    dataIndex: 'dsrmc'
  },
  {
    title: '地址',
    dataIndex: 'dz'
  },
  {
    title: '邮编',
    dataIndex: 'yb'
  },
  {
    title: '法定代表人',
    dataIndex: 'fddbr'
  },
  {
    title: '联系电话',
    dataIndex: 'lxdh'
  },
  {
    title: '法定代表人身份证号码',
    dataIndex: 'fddbrsfzhm'
  },
  {
    title: '基本情况介绍',
    dataIndex: 'jbqkjs'
  },
  {
    title: '登记时间',
    dataIndex: 'djsj'
  },
  {
    title: 'bpmStatus',
    dataIndex: 'bpmStatus'
  },
  {
    title: 'createName',
    dataIndex: 'createName'
  },
  {
    title: 'createDate',
    dataIndex: 'createDate'
  },
  {
    title: 'updateName',
    dataIndex: 'updateName'
  },
  {
    title: 'updateDate',
    dataIndex: 'updateDate'
  },
  {
    title: '案件所属行政区划',
    dataIndex: 'ajssxzqh'
  },


  {
    title: '是否历史案件',
    dataIndex: 'sflsaj'
  },
  {
    title: '是否当场办理',
    dataIndex: 'sfdcbl'
  },
  {
    title: '案件发生时间',
    dataIndex: 'ajfssj'
  },
  {
    title: '统一社会信用代码',
    dataIndex: 'shxydm'
  },
  {
    title: 'ysdw',
    dataIndex: 'ysdw'
  },
  {
    title: 'spbajly',
    dataIndex: 'spbajly'
  },
  {
    title: 'spblarq',
    dataIndex: 'spblarq'
  },
  {
    title: '处罚日期',
    dataIndex: 'cfrq'
  },
  {
    title: '处罚文书号',
    dataIndex: 'cfwsh'
  },
  {
    title: '处罚类型',
    dataIndex: 'cflx'
  },
  {
    title: '失信类型',
    dataIndex: 'sxlx'
  },
  {
    title: 'sfla',
    dataIndex: 'sfla'
  },
  {
    title: 'lasj',
    dataIndex: 'lasj'
  },
  {
    title: 'yjdw',
    dataIndex: 'yjdw'
  },
  {
    title: '主要违法事实',
    dataIndex: 'zywfss'
  },
  {
    title: '导入标记，0表示为初始导入，1表示指定过失信类型',
    dataIndex: 'impFlag'
  },
  {
    title: '导入人员id',
    dataIndex: 'impUserId'
  },
  {
    title: '导入人员姓名',
    dataIndex: 'impUserName'
  },
  {
    title: '导入日期',
    dataIndex: 'impDate'
  },
  {
    title: '涉嫌违法条款',
    dataIndex: 'sxwftk'
  },
  {
    title: '案由Id',
    dataIndex: 'ayid'
  },
  {
    title: '创建时间',
    dataIndex: 'createdate'
  },
  {
    title: '创建数据登录用户名称',
    dataIndex: 'createDataUser'
  },
  {
    title: '违法事实',
    dataIndex: 'wfss'
  },
  {
    title: '证据材料',
    dataIndex: 'zjcl'
  },
  {
    title: '处罚依据',
    dataIndex: 'cfyj'
  },
  {
    title: '处罚建议',
    dataIndex: 'cfjy'
  },
  {
    title: '案件办理状态',
    dataIndex: 'ajblzt'
  },
  {
    title: '创建人组织机构id',
    dataIndex: 'createDeptId'
  },
  {
    title: '创建人组织机构名称',
    dataIndex: 'createDeptName'
  },
  {
    title: '更新人组织机构id',
    dataIndex: 'updateDeptId'
  },
  {
    title: '更新人组织机构名称',
    dataIndex: 'updateDeptName'
  },
  {
    title: '执行结果',
    dataIndex: 'zxjg'
  },
  {
    title: '结案时间',
    dataIndex: 'jasj'
  },
  {
    title: '签发人id',
    dataIndex: 'qfrId'
  },
  {
    title: '签发人名称',
    dataIndex: 'qfrMc'
  },
  {
    title: '档案归类',
    dataIndex: 'dagl'
  },
  {
    title: '保存期限',
    dataIndex: 'bcqx'
  },
  {
    title: '归档时间',
    dataIndex: 'gdsj'
  },
  {
    title: '是否生成卷宗，1为是',
    dataIndex: 'sfscjz'
  },
  {
    title: '数据中心交换标志',
    dataIndex: 'flagSjzx'
  },
  {
    title: '入库日期',
    dataIndex: 'rkDate'
  },
  {
    title: '食品移交标识 空：未推送 1：已推送',
    dataIndex: 'syncSpyj'
  },
];

export const simpleColumns: BasicColumn[] = [{
  title: '案件编号', dataIndex: 'ajbh', width: 250
}, {
  title: '案由', dataIndex: 'ay'
}, {
  title: '承办机关', dataIndex: '', width: 150
}, {
  title: '登记时间', dataIndex: 'djsj', width: 130, format: 'date|YYYY-MM-DD'
}, {
  title: '处罚类型', dataIndex: 'cflx_dictText', width: 130
}];


export function getSearchFormSchema(defaultDjsj: boolean = true, year: number | string | null = null): FormSchema[] {
  let end, start: string = (end = moment(year ? year + '-01-01' : moment(new Date()).format('YYYY-01-01'), 'YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss');
  end = end.add(1, 'year').add(-1, 'day').format('YYYY-MM-DD HH:mm:ss');

  return [{
    label: '登记时间', field: 'djsjRange', component: 'RangePicker',
    defaultValue: defaultDjsj ? [start, end] : undefined, rangeFields: ['djsj_begin', 'djsj_end']
  }, 
  {
    label: '所属地市', field: 'ajssxzqh'
    , component: 'JDictSelectTag', componentProps: { dictCode: 'area_city',showChooseOption: false }
    , colProps: { xxl: { span: 4 } }
  }
  // {
  //   label: '所属区县',
  //   field: 'ajssxzqh',
  //   component: 'JAreaSelect',
  //   componentProps: {
  //     level: 3, province: '420000', hideProvince: true, 
  //   },
  // }
  , {
    label: '案件编号', field: 'ajbh', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '案由', field: 'ay', component: 'JInput', colProps: { xxl: { span: 5 } }
  }];
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '执法类别',
    field: 'zflb',
    component: 'Input',
  },
  {
    label: '案件来源',
    field: 'ajly',
    component: 'Input',
  },
  {
    label: '当事人ID',
    field: 'dsrid',
    component: 'Input',
  },
  {
    label: '当事人',
    field: 'dsrmc',
    component: 'Input',
  },
  {
    label: '地址',
    field: 'dz',
    component: 'Input',
  },
  {
    label: '邮编',
    field: 'yb',
    component: 'Input',
  },
  {
    label: '法定代表人',
    field: 'fddbr',
    component: 'Input',
  },
  {
    label: '联系电话',
    field: 'lxdh',
    component: 'Input',
  },
  {
    label: '法定代表人身份证号码',
    field: 'fddbrsfzhm',
    component: 'Input',
  },
  {
    label: '基本情况介绍',
    field: 'jbqkjs',
    component: 'Input',
  },
  {
    label: '登记时间',
    field: 'djsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'bpmStatus',
    field: 'bpmStatus',
    component: 'Input',
  },
  {
    label: 'createName',
    field: 'createName',
    component: 'Input',
  },
  {
    label: 'createDate',
    field: 'createDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'updateName',
    field: 'updateName',
    component: 'Input',
  },
  {
    label: 'updateDate',
    field: 'updateDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '案件所属行政区划',
    field: 'ajssxzqh',
    component: 'Input',
  },
  {
    label: '案件编号',
    field: 'ajbh',
    component: 'Input',
  },
  {
    label: '案由',
    field: 'ay',
    component: 'Input',
  },
  {
    label: '是否历史案件',
    field: 'sflsaj',
    component: 'Input',
  },
  {
    label: '是否当场办理',
    field: 'sfdcbl',
    component: 'Input',
  },
  {
    label: '案件发生时间',
    field: 'ajfssj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '统一社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: 'ysdw',
    field: 'ysdw',
    component: 'Input',
  },
  {
    label: 'spbajly',
    field: 'spbajly',
    component: 'Input',
  },
  {
    label: 'spblarq',
    field: 'spblarq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '处罚日期',
    field: 'cfrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '处罚文书号',
    field: 'cfwsh',
    component: 'Input',
  },
  {
    label: '处罚类型',
    field: 'cflx',
    component: 'Input',
  },
  {
    label: '失信类型',
    field: 'sxlx',
    component: 'Input',
  },
  {
    label: 'sfla',
    field: 'sfla',
    component: 'Input',
  },
  {
    label: 'lasj',
    field: 'lasj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'yjdw',
    field: 'yjdw',
    component: 'Input',
  },
  {
    label: '主要违法事实',
    field: 'zywfss',
    component: 'Input',
  },
  {
    label: '导入标记，0表示为初始导入，1表示指定过失信类型',
    field: 'impFlag',
    component: 'Input',
  },
  {
    label: '导入人员id',
    field: 'impUserId',
    component: 'Input',
  },
  {
    label: '导入人员姓名',
    field: 'impUserName',
    component: 'Input',
  },
  {
    label: '导入日期',
    field: 'impDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '涉嫌违法条款',
    field: 'sxwftk',
    component: 'Input',
  },
  {
    label: '案由Id',
    field: 'ayid',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'createdate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '创建数据登录用户名称',
    field: 'createDataUser',
    component: 'Input',
  },
  {
    label: '违法事实',
    field: 'wfss',
    component: 'Input',
  },
  {
    label: '证据材料',
    field: 'zjcl',
    component: 'Input',
  },
  {
    label: '处罚依据',
    field: 'cfyj',
    component: 'Input',
  },
  {
    label: '处罚建议',
    field: 'cfjy',
    component: 'Input',
  },
  {
    label: '案件办理状态',
    field: 'ajblzt',
    component: 'Input',
  },
  {
    label: '创建人组织机构id',
    field: 'createDeptId',
    component: 'Input',
  },
  {
    label: '创建人组织机构名称',
    field: 'createDeptName',
    component: 'Input',
  },
  {
    label: '更新人组织机构id',
    field: 'updateDeptId',
    component: 'Input',
  },
  {
    label: '更新人组织机构名称',
    field: 'updateDeptName',
    component: 'Input',
  },
  {
    label: '执行结果',
    field: 'zxjg',
    component: 'Input',
  },
  {
    label: '结案时间',
    field: 'jasj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '签发人id',
    field: 'qfrId',
    component: 'Input',
  },
  {
    label: '签发人名称',
    field: 'qfrMc',
    component: 'Input',
  },
  {
    label: '档案归类',
    field: 'dagl',
    component: 'Input',
  },
  {
    label: '保存期限',
    field: 'bcqx',
    component: 'Input',
  },
  {
    label: '归档时间',
    field: 'gdsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '是否生成卷宗，1为是',
    field: 'sfscjz',
    component: 'Input',
  },
  {
    label: '数据中心交换标志',
    field: 'flagSjzx',
    component: 'Input',
  },
  {
    label: '入库日期',
    field: 'rkDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '食品移交标识 空：未推送 1：已推送',
    field: 'syncSpyj',
    component: 'Input',
  },
];
