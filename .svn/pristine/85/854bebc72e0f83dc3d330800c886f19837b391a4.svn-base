import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '公告编号',
    dataIndex: 'ggbh'
   },
   {
    title: '委托类型',
    dataIndex: 'wtlx'
   },
   {
    title: '委托品种范围',
    dataIndex: 'wtpzfw'
   },
   {
    title: '委托方社会信用代码',
    dataIndex: 'shxydm'
   },
   {
    title: '企业名称（委托）',
    dataIndex: 'qymc'
   },
   {
    title: '许可证号（委托）',
    dataIndex: 'xkzh'
   },
   {
    title: '注册地址（委托）',
    dataIndex: 'zcdz'
   },
   {
    title: '法定代表人',
    dataIndex: 'fddbr'
   },
   {
    title: '委托报告事项',
    dataIndex: 'wtbgsx'
   },
   {
    title: '受托方社会信用代码',
    dataIndex: 'stfshxydm'
   },
   {
    title: '企业名称（受托方）',
    dataIndex: 'stfqymc'
   },
   {
    title: '许可证号（受托方）',
    dataIndex: 'xkzstf'
   },
   {
    title: '注册地址（受托方）',
    dataIndex: 'stfzcdz'
   },
   {
    title: '仓库地址（受托方）',
    dataIndex: 'stfckdz'
   },
   {
    title: '委托销售品种',
    dataIndex: 'wtxspz'
   },
   {
    title: '委托储存',
    dataIndex: 'wtcc'
   },
   {
    title: '委托运输',
    dataIndex: 'wtys'
   },
   {
    title: '委托开始时间',
    dataIndex: 'wtkssj'
   },
   {
    title: '委托结束时间',
    dataIndex: 'wtjssj'
   },
   {
    title: 'yqrwtsxsm',
    dataIndex: 'yqrwtsxsm'
   },
   {
    title: '联系人',
    dataIndex: 'lxr'
   },
   {
    title: '联系电话',
    dataIndex: 'lxdh'
   },
   {
    title: '简要情况说明',
    dataIndex: 'jyqksm'
   },
   {
    title: '监管部门补正意见',
    dataIndex: 'jgbmbzyj'
   },
   {
    title: '审核人',
    dataIndex: 'auditBy'
   },
   {
    title: '审核人联系方式',
    dataIndex: 'auditTel'
   },
   {
    title: '用户ID',
    dataIndex: 'userId'
   },
   {
    title: '流转状态，1草稿2待确认3待审核4待补正5已公告',
    dataIndex: 'state'
   },
   {
    title: '提交审核时间',
    dataIndex: 'submitDate'
   },
   {
    title: '创建日期',
    dataIndex: 'createdDate'
   },
   {
    title: '修改日期',
    dataIndex: 'updateDate'
   },
   {
    title: '公告ID',
    dataIndex: 'ggId'
   },
   {
    title: '报告类别，1公告(正式的，首次的)2变更9解除',
    dataIndex: 'category'
   },
   {
    title: '是否已变更，Y是N否，原公告发生变更时标记为Y',
    dataIndex: 'hasChanged'
   },
   {
    title: '被变更报告id',
    dataIndex: 'originalId'
   },
   {
    title: '报告完整生命周期的ID串，用,分隔',
    dataIndex: 'lifeLinks'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '公告编号',
    field: 'ggbh',
    component: 'Input'
  },
 {
    label: '委托类型',
    field: 'wtlx',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '公告信息',
    field: '',
    component: 'Divider',
    colProps: {
      span: 24,
    }
  },
  {
    label: '公告编号',
    field: 'ggbh',
    component: 'Input',
    required: true,
  },
  {
    label: '公告时间',
    field: 'ggsj',
    component: 'DatePicker',
    required: true,
  },
  {
    label: '公告网址',
    field: 'ggwz',
    component: 'Input',
  },
  {
    label: '公告人',
    field: 'ggr',
    component: 'Input',
    required: true,
  },
  {
    label: '委托方信息',
    field: '',
    component: 'Divider',
    colProps: {
      span: 24,
    }
  },
  {
    label: '企业名称（委托）',
    field: 'qymc',
    component: 'Input',
    required: true,
  },
  {
    label: '委托方社会信用代码',
    field: 'shxydm',
    component: 'Input',
    required: true,
  },
  {
    label: '许可证号（委托）',
    field: 'xkzh',
    component: 'Input',
    required: true,
  },
  // {
  //   label: '委托类型',
  //   field: 'wtlx',
  //   component: 'Input',
  // },
  {
    label: '委托品种范围',
    field: 'wtpzfw',
    component: 'Input',
    required: true,
  },
  {
    label: '委托报告事项',
    field: 'wtbgsx',
    component: 'JCheckbox',
    required: true,
    componentProps: {
      options: [
        { label: '储存', value: '储存' },
        { label: '运输', value: '运输' },
        { label: '销售', value: '销售' },
      ],
    },
  },
  {
    label: '委托销售品种',
    field: 'wtxspz',
    component: 'Input',
    required: true,
  },
  {
    label: '委托储存',
    field: 'wtcc',
    component: 'Input',
  },
  {
    label: '委托运输',
    field: 'wtys',
    component: 'Input',
  },
  {
    label: '注册地址（委托）',
    field: 'zcdz',
    component: 'Input',
    required: true,
  },
  {
    label: '法定代表人',
    field: 'fddbr',
    component: 'Input',
    required: true,
  },
 
  {
    label: '受托方信息',
    field: '',
    component: 'Divider',
    colProps: {
      span: 24,
    }
  },
  {
    label: '企业名称（受托方）',
    field: 'stfqymc',
    component: 'Input',
    required: true,
  },
  {
    label: '受托方社会信用代码',
    field: 'stfshxydm',
    component: 'Input',
    required: true,
  },
  {
    label: '许可证号（受托方）',
    field: 'xkzstf',
    component: 'Input',
  },
  {
    label: '注册地址（受托方）',
    field: 'stfzcdz',
    component: 'Input',
    required: true,
  },
  {
    label: '仓库地址（受托方）',
    field: 'stfckdz',
    component: 'Input',
    required: true,
  },
  {
    label: '委托信息',
    field: '',
    component: 'Divider',
    colProps: {
      span: 24,
    }
  },
  
  {
    label: '委托开始时间',
    field: 'wtkssj_',
    component: 'DatePicker',
    required: true,
  },
  {
    label: '委托结束时间',
    field: 'wtjssj_',
    component: 'DatePicker',
    required: true,
  },
  // {
  //   label: 'yqrwtsxsm',
  //   field: 'yqrwtsxsm',
  //   component: 'Input',
  // },
  {
    label: '联系人',
    field: 'lxr',
    component: 'Input',
    required: true,
  },
  {
    label: '联系电话',
    field: 'lxdh',
    component: 'Input',
    required: true,
  },
  {
    label: '简要情况说明',
    field: 'jyqksm',
    component: 'Input',
  },
  // {
  //   label: '监管部门补正意见',
  //   field: 'jgbmbzyj',
  //   component: 'Input',
  // },
  // {
  //   label: '审核人',
  //   field: 'auditBy',
  //   component: 'Input',
  // },
  // {
  //   label: '审核人联系方式',
  //   field: 'auditTel',
  //   component: 'Input',
  // },
  // {
  //   label: '用户ID',
  //   field: 'userId',
  //   component: 'Input',
  // },
  // {
  //   label: '流转状态，1草稿2待确认3待审核4待补正5已公告',
  //   field: 'state',
  //   component: 'Input',
  // },
  // {
  //   label: '提交审核时间',
  //   field: 'submitDate',
  //   component: 'Input',
  // },
  // {
  //   label: '创建日期',
  //   field: 'createdDate',
  //   component: 'Input',
  // },
  // {
  //   label: '修改日期',
  //   field: 'updateDate',
  //   component: 'Input',
  // },
  // {
  //   label: '公告ID',
  //   field: 'ggId',
  //   component: 'Input',
  // },
  // {
  //   label: '报告类别，1公告(正式的，首次的)2变更9解除',
  //   field: 'category',
  //   component: 'Input',
  // },
  // {
  //   label: '是否已变更，Y是N否，原公告发生变更时标记为Y',
  //   field: 'hasChanged',
  //   component: 'Input',
  // },
  // {
  //   label: '被变更报告id',
  //   field: 'originalId',
  //   component: 'Input',
  // },
  // {
  //   label: '报告完整生命周期的ID串，用,分隔',
  //   field: 'lifeLinks',
  //   component: 'Input',
  // },
];
