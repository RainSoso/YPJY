import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: '年度',
    dataIndex: 'year',
    width:100
   },
   {
    title: '企业名称',
    dataIndex: 'qymc',
    width:180
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm',
    width:120
   },
    {
    title: '药品批准文号',
    dataIndex: 'yppzwh',
    width:120
   },
   {
    title: '药品通用名称',
    dataIndex: 'yptymc',
    width:180
   },
   {
    title: '预警次数',
    dataIndex: 'num',
    width:80
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品批准文号',
    field: 'yppzwh',
    component: 'JInput'
  },
 {
    label: '药品通用名称',
    field: 'yptymc',
    component: 'JInput'
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '药品批准文号',
    field: 'yppzwh',
    component: 'Input',
  },
  {
    label: '药品通用名称',
    field: 'yptymc',
    component: 'Input',
  },
  {
    label: '年度',
    field: 'year',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '预警次数',
    field: 'num',
    component: 'InputNumber',
  },
  {
    label: '不良反应症状',
    field: 'blfyzz',
    component: 'Input',
  },
  {
    label: '相关建议',
    field: 'xgjy',
    component: 'Input',
  },
];
