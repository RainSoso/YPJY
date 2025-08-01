import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '场地文件ID',
    dataIndex: 'cdwjid',
    defaultHidden:true
   },
  //  {
  //   title: '社会信用代码',
  //   dataIndex: 'shxydm'
  //  },
   {
    title: '人员类别',
    dataIndex: 'lb_dictText'
   },
   {
    title: '姓名',
    dataIndex: 'xm'
   },
   {
    title: '性别',
    dataIndex: 'xb',
    defaultHidden:true
   },
   {
    title: '身份证号',
    dataIndex: 'sfzh',
    defaultHidden:true
   },
   {
    title: '联系方式',
    dataIndex: 'lxfs',
    defaultHidden:true
   },
   {
    title: '学历',
    dataIndex: 'xl_dictText'
   },
   {
    title: '专业',
    dataIndex: 'zy',
    defaultHidden:true
   },
   {
    title: '职称',
    dataIndex: 'zc'
   },
   {
    title: '执业药师注册证号',
    dataIndex: 'zyyszczh',
    defaultHidden:true
   },
   {
    title: '执业药师资格证号',
    dataIndex: 'zyyszgzh',
    defaultHidden:true
   },
   {
    title: '法人授权委托书流水号',
    dataIndex: 'frsqs',
    defaultHidden:true
   },
   {
    title: '授权品种',
    dataIndex: 'sqpz',
    defaultHidden:true
   },
   {
    title: '授权开始期限',
    dataIndex: 'sqksrq'
   },
   {
    title: '授权结束期限',
    dataIndex: 'sqjsrq'
   },
   {
    title: '授权区域',
    dataIndex: 'sqqy',
    defaultHidden:true
   },
   {
    title: '0 有效 1转岗 2离职',
    dataIndex: 'flag',
    defaultHidden:true
   },
   {
    title: '0 已删除 1未删除',
    dataIndex: 'delFlag',
    defaultHidden:true
   },
];

export const searchFormSchema: FormSchema[] = [

 {
    label: '姓名',
    field: 'xm',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '场地文件ID',
    field: 'cdwjid',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '人员类别',
    field: 'lb',
    component: 'JDictSelectTag',
    componentProps: {
      showChooseOption:false,
      type: 'select',
      dictCode: 'cdwjRy_rylb'
    },

  },
  {
    label: '姓名',
    field: 'xm',
    component: 'Input',
  },
  {
    label: '性别',
    field: 'xb',
    component: 'Input',
  },
  {
    label: '身份证号',
    field: 'sfzh',
    component: 'Input',
  },
  {
    label: '联系方式',
    field: 'lxfs',
    component: 'Input',
  },
  {
    label: '学历',
    field: 'xl',
    component: 'JDictSelectTag',
    componentProps: {
      showChooseOption:false,
      type: 'select',
      dictCode: 'XLDM-1'
    },
  },
  {
    label: '专业',
    field: 'zy',
    component: 'Input',
  },
  {
    label: '职称',
    field: 'zc',
    component: 'Input',
  },
  {
    label: '执业药师注册证号',
    field: 'zyyszczh',
    component: 'Input',
  },
  {
    label: '执业药师资格证号',
    field: 'zyyszgzh',
    component: 'Input',
  },
  {
    label: '法人授权委托书流水号',
    field: 'frsqs',
    component: 'Input',
  },
  {
    label: '授权品种',
    field: 'sqpz',
    component: 'Input',
  },
  {
    label: '授权开始期限',
    field: 'sqksrq',
    component: 'DatePicker',
  },
  {
    label: '授权结束期限',
    field: 'sqjsrq',
    component: 'DatePicker',
  },
  {
    label: '授权区域',
    field: 'sqqy',
    component: 'Input',
  },
  // {
  //   label: '0 有效 1转岗 2离职',
  //   field: 'flag',
  //   component: 'Input',
  // },
  // {
  //   label: '0 已删除 1未删除',
  //   field: 'delFlag',
  //   component: 'Input',
  // },
];
