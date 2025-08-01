import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '姓名',
    dataIndex: 'name',
    width: 220,
   },
   {
    title: '性别',
    dataIndex: 'sex',
    customRender: ({ record }) => {
      return render.renderDict(record.sex, 'sex');
    },
    width: 100,
   },
   {
    title: '年龄',
    dataIndex: 'age',
    width: 100,
   },
   {
    title: '检查人行政代码',
    dataIndex: 'jcrxzdm',
    width: 280,
   },
   {
    title: '检查人类型',
    dataIndex: 'jcylx',
    width: 220,
   },
   {
    title: '单位',
    dataIndex: 'jcydw'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '姓名',
    field: 'name',
    component: 'JInput'
  },
 {
    label: '单位',
    field: 'jcydw',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '姓名',
    field: 'name',
    component: 'Input',
    required:true,
    colProps: { span: 12 },
  },
  {
    label: '检查人行政代码',
    field: 'jcrxzdm',
    component: 'Input',
    required:true,
    colProps: { span: 12 },
  },
  {
    label: '性别',
    field: 'sex',
    component: 'JDictSelectTag',
    colProps: { span: 12 },
    required:true,
    componentProps: {
      dictCode: 'sex',
      placeholder: '请选择性别',
    },
  },
  {
    label: '年龄',
    field: 'age',
    component: 'Input',
    required:true,
    colProps: { span: 12 },
  },
  {
    label: '检查人类型',
    field: 'jcylx',
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    label: '检查人单位',
    field: 'jcydw',
    component: 'Input',
    colProps: { span: 12 },
  },
];
