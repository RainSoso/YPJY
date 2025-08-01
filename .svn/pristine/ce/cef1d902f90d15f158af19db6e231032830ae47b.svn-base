import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
   {
    title: '用户名称',
    dataIndex: 'username',
    width:110
   },
   {
    title: '意见标题',
    dataIndex: 'yjbt',
    width:200
   },
   {
    title: '意见内容',
    dataIndex: 'yjnr'
   },
  //  {
  //   title: '事项项目',
  //   dataIndex: 'sxxm',
  //   width:200
  //  },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '意见标题',
    field: 'yjbt',
    component: 'JInput'
  },
 {
    label: '意见内容',
    field: 'yjnr',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '用户ID',
    field: 'userId',
    component: 'Input',
    show: false
  },
  {
    label: '用户名称',
    field: 'username',
    component: 'Input',
    show: false
  },
  {
    label: '意见标题',
    field: 'yjbt',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入意见标题!'
      },
    ],
  },
  {
    label: '意见内容',
    field: 'yjnr',
    component: 'InputTextArea',
    componentProps: {
      rows: 6
    },
    rules: [
      {
        required: true,
        message: '请输入意见标题!'
      },
    ],
  },
  {
    label: '事项项目',
    field: 'sxxm',
    component: 'Input',
    show: false
  },
];
