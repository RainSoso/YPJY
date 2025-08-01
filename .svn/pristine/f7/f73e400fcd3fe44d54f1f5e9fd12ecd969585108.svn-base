import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '名称',
    dataIndex: 'name'
   },
   {
    title: '数据值',
    dataIndex: 'value'
   },
   {
    title: '数据类型',
    dataIndex: 'dataType',
    width:150
   },
   {
    title: '排序号',
    dataIndex: 'sort',
    width:100
   },
   {
    title: '备注',
    dataIndex: 'remarks'
   },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '名称',
    field: 'name',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    required: true
  },
  {
    label: '数据值',
    field: 'value',
    component: 'Input'
  },
  {
    label: '数据类型',
    field: 'dataType',
    component: 'Input',
    defaultValue:'String',
    required: true
  },
  {
    label: '排序号',
    field: 'sort',
    component: 'InputNumber',
    defaultValue:85
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'Input',
  },
];
