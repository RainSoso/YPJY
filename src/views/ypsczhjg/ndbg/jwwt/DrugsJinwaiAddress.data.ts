import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '境外id',
    dataIndex: 'entrustedId',
    defaultHidden:true,
   },
   {
    title: '生产地址',
    dataIndex: 'scdz'
   },
   {
    title: '车间',
    dataIndex: 'sccj'
   },
   {
    title: '生产线',
    dataIndex: 'scx'
   },
   {
    title: '生产数量',
    dataIndex: 'scsl'
   },
   {
    title: '生产数量单位',
    dataIndex: 'scsldw',
    defaultHidden:true,
   },
   {
    title: '交货数量',
    dataIndex: 'jhsl',
    defaultHidden:true,
   },
   {
    title: '交货数量单位',
    dataIndex: 'jhsldw'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '境外id',
    field: 'entrustedId',
    component: 'Input'
  },
 {
    label: '生产地址',
    field: 'scdz',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '境外id',
    field: 'entrustedId',
    component: 'Input',
  },
  {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
  },
  {
    label: '生产车间',
    field: 'sccj',
    component: 'Input',
  },
  {
    label: '生产数量',
    field: 'scsl',
    component: 'Input',
  },
  {
    label: '生产线',
    field: 'scx',
    component: 'InputNumber',
  },
  {
    label: '生产数量单位',
    field: 'scsldw',
    component: 'Input',
  },
  {
    label: '交货数量',
    field: 'jhsl',
    component: 'InputNumber',
  },
  {
    label: '交货数量单位',
    field: 'jhsldw',
    component: 'Input',
  },
];
