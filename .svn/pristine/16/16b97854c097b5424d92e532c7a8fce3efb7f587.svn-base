import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '年报id',
    dataIndex: 'reportId',
    ifShow:false
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm',
    ifShow:false
   },
   {
    title: '内容',
    dataIndex: 'content'
   },
   {
    title: '附件',
    dataIndex: 'fj',
    width:250
   },
   {
    title:'审核人',
    dataIndex:'createBy',
    width:110
   },
   {
    title: '审核日期',
    dataIndex: 'createTime',
    format: 'date|YYYY-MM-DD',
    width:110
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'JInput'
  },{
    label: '内容',
    field: 'content',
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
    show: false
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
    show: false
  },
  {
    label: '审核信息',
    field: 'content',
    component: 'InputTextArea',
    required:true,
    componentProps: {
      rows: 6
    }
  },
  {
    label: '附件',
    field: 'fj',
    component: 'JUpload',
    componentProps: { bizPath: 'ndbg' },
  },
];
