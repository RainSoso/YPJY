import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { fileList } from "./modules/fileList.vue";

export const columns: BasicColumn[] = [
    {
    title: '公司名称',
    dataIndex: 'firmName'
   },
   {
    title: '社会信用代码',
    dataIndex: 'socialCode'
   },
   {
    title: '报告年份',
    dataIndex: 'reportYear'
   },
   {
    title: '联系人',
    dataIndex: 'createUser'
   },
   {
    title: '联系方式',
    dataIndex: 'phoneNumber'
   },

];
//搜索选项
export const searchFormSchema: FormSchema[] = [
 {
    label: '公司名称',
    field: 'firmName',
    component: 'Input'
  },
 {
    label: '社会信用代码',
    field: 'socialCode',
    component: 'Input'
  },
  {
    label: '年份',
    field: 'reportYear',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '公司名称',
    field: 'firmName',
    component: 'Input',
  },
  {
    label: '文件类型',
    field: 'type',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'socialCode',
    component: 'Input',
  },
  {
    label: '报告年份',
    field: 'reportYear',
    component: 'Input',
  },
  {
    label: '联系人',
    field: 'createUser',
    component: 'Input',
  },
  {
    label: '联系方式',
    field: 'phoneNumber',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'note',
    component: 'Input',
  },  {
    label: '备注',
    field: 'note',
    component: 'Input',
  }

];
