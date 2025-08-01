import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';

export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'qymc'
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm'
   },
    {
    title: '标题',
    dataIndex: 'title'
   },
   {
    title: '填报内容',
    dataIndex: 'tbnr'
   },
   {
    title: '日期',
    dataIndex: 'tbrq'
   },
   {
    title: '流转状态',
    dataIndex: 'zt',
    customRender: ({ text }) => {
      return filterDictTextByCache('ypjy_baxx_zt',text);
     }
   },
   {
    title: '审核意见',
    dataIndex: 'shyj'
   },
   {
    title: 'field1',
    dataIndex: 'field1',
    defaultHidden:true,
   },
   {
    title: 'field2',
    dataIndex: 'field2',
    defaultHidden:true,
   },
   {
    title: 'field3',
    dataIndex: 'field3',
    defaultHidden:true,
   },
   {
    title: 'field4',
    dataIndex: 'field4',
    defaultHidden:true,
   },
   {
    title: 'field5',
    dataIndex: 'field5',
    defaultHidden:true,
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '标题',
    field: 'title',
    component: 'Input'
  },
 {
    label: '企业名称',
    field: 'qymc',
    component: 'Input'
  },
  {
    label: '流转状态',
    field: 'zt',
    component: 'JDictSelectTag',
    componentProps: { dictCode: 'ypjy_baxx_zt', showChooseOption: false },
    colProps: { xxl: { span: 6 } }
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '标题',
    field: 'title',
    component: 'Input',
  },
  {
    label: '填报内容',
    field: 'tbnr',
    component: 'Input',
  },
  {
    label: '日期',
    field: 'tbrq',
    component: 'Input',
  },
  {
    label: '0待提交，1待审核，2审核通过，3审核失败',
    field: 'zt',
    component: 'Input',
  },
  {
    label: '审核意见',
    field: 'shyj',
    component: 'Input',
  },
  {
    label: 'field1',
    field: 'field1',
    component: 'Input',
  },
  {
    label: 'field2',
    field: 'field2',
    component: 'Input',
  },
  {
    label: 'field3',
    field: 'field3',
    component: 'Input',
  },
  {
    label: 'field4',
    field: 'field4',
    component: 'Input',
  },
  {
    label: 'field5',
    field: 'field5',
    component: 'Input',
  },
];
