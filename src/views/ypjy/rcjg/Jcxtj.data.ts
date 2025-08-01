import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '检查人员',
    dataIndex: 'jcry',
    width: 20,
    slots: { customRender: 'jcry' }
   },
   {
    title: '检查总数',
    dataIndex: 'cou',
    width: 20,
    slots: { customRender: 'cou' }
   },
   {
    title: '严重缺陷项目',
    dataIndex: 'two',
    width: 20,
    slots: { customRender: 'two' }
   },
   {
    title: '主要缺陷项目',
    dataIndex: 'one',
    width: 20,
    slots: { customRender: 'one' }
   },
   {
    title: '一般缺陷项目',
    dataIndex: 'zero',
    width: 20,
    slots: { customRender: 'zero' }
   },
 
   {
    title: '严重缺陷项目比列',
    dataIndex: 'twop',
    width: 20
   },
   {
    title: '主要缺陷项目比列',
    dataIndex: 'onep',
    width: 20
   },
   {
    title: '一般缺陷项目比列',
    dataIndex: 'zerop',
    width: 20
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '检查人员',
    field: 'jcry',
    component: 'Input'
  }
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: 'jcry',
    field: 'jcry',
    component: 'Input',
  },
  {
    label: 'two',
    field: 'two',
    component: 'Input',
  },
  {
    label: 'one',
    field: 'one',
    component: 'Input',
  },
  {
    label: 'zero',
    field: 'zero',
    component: 'Input',
  },
  {
    label: 'cou',
    field: 'cou',
    component: 'Input',
  },
  {
    label: 'twop',
    field: 'twop',
    component: 'Input',
  },
  {
    label: 'onep',
    field: 'onep',
    component: 'Input',
  },
  {
    label: 'zerop',
    field: 'zerop',
    component: 'Input',
  },
];
