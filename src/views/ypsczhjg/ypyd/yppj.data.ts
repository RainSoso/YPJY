import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '批件号',
    dataIndex: 'pjh',
    width:120
   },

   {
    title: '批件类型',
    dataIndex: 'pjlx',
    width:80
   },
   {
    title: '更新内容',
    dataIndex: 'gxnr'
   },
   {
    title: '批准日期',
    dataIndex: 'pzrq',
    width:90
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '监管编号',
    field: 'bt',
    component: 'Input'
  },
 {
    label: '监管任务编号',
    field: 'scsj',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '监管编号',
    field: 'bt',
    component: 'Input',
  },
  {
    label: '监管任务编号',
    field: 'scsj',
    component: 'Input',
  },

];
