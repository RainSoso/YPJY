import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '年报id',
    dataIndex: 'reportId',
    defaultHidden:true,
   },
   {
    title :'企业名称',
    dataIndex :'qymc',
   },
   {
    title: '委托方所在国家/地区',
    dataIndex: 'countryOrAddress',
   },
   {
    title: '药品通用名称',
    dataIndex: 'durgName',
   },
   {
    title: '剂型',
    dataIndex: 'durgType',
    width:200,
   },
   {
    title: '规格',
    dataIndex: 'specifications',
    width:200,
   },
   {
    title: '委托方(持有人)名称',
    dataIndex: 'entrustName'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品通用名称',
    field: 'durgName',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '年报id',
    field: 'reportId',
    component: 'Input',
  },
  {
    label: '药品通用名称',
    field: 'durgName',
    component: 'Input',
  },
  {
    label: '剂型',
    field: 'durgType',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'specifications',
    component: 'Input',
  },
  {
    label: '委托方所在国家/地区',
    field: 'countryOrAddress',
    component: 'Input',
  },
  {
    label: '委托方(持有人)名称',
    field: 'entrustName',
    component: 'Input',
  },
];
