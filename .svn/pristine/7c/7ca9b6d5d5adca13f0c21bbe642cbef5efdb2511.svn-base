import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: '审批人',
    dataIndex: 'spr',
    width:150
   },
   {
    title: '审批意见',
    dataIndex: 'spyj'
   },
   {
    title: '操作时间',
    dataIndex: 'createTime',
    width:200
   },
   {
    title: '备注',
    dataIndex: 'bz'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '申请事项表主键',
    field: 'sqsxId',
    component: 'Input'
  },
 {
    label: '审批意见',
    field: 'spyj',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '申请事项表主键',
    field: 'sqsxId',
    component: 'Input',
    show: false,
  },
  {
    label: '操作类型',
    field: 'czlx',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [{label:'通过',value:'1'}, {label:'驳回',value:'0'}]
    },
    required: true
  },
  {
    label: '审批意见',
    field: 'spyj',
    component: 'InputTextArea',
    colProps: {
      span: 22,
    },
    componentProps: {
      placeholder: '请输入审批意见',
      rows: 6,
    },
    dynamicRules: ({ values }) => {
      return values.czlx =='0' ? [{ required: true, message: '请填写审批意见!' }] : [];
    },
  },
  {
    label: '审批人名称',
    field: 'spr',
    component: 'Input',
    show: false , 
  },
  {
    label: '审批人id',
    field: 'sprid',
    component: 'Input',
    show: false ,
  },
  {
    label: '备注',
    field: 'bz',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
];
