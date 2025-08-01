import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { format } from 'path';

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
    title: '监管机构名称',
    dataIndex: 'superviseName',
   },
   {
    title: '检查时间',
    dataIndex: 'checkTime',
    format: 'date|YYYY-MM-DD',
    width:200,
   },
   {
    title: '检查范围',
    dataIndex: 'checkRange',
    width:200,
   },
   {
    title: '检查类型',
    dataIndex: 'checkType_dictText',
    width:200,
   },
   {
    title: '缺陷及整改情况',
    dataIndex: 'defectsAndRectification'
   },
   {
    title: '检查结果处置情况',
    dataIndex: 'checkResult_dictText'
   },
   {
    title: '附件',
    dataIndex: 'enclosure',
    defaultHidden:true,
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '监管名称',
    field: 'superviseName',
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
    label: '监管名称',
    field: 'superviseName',
    component: 'Input',
  },
  {
    label: '检查时间',
    field: 'checkTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '检查类型',
    field: 'checkType',
    component: 'Input',
  },
  {
    label: '检查范围',
    field: 'checkRange',
    component: 'Input',
  },
  {
    label: '缺陷与不足',
    field: 'defectsAndRectification',
    component: 'Input',
  },
  {
    label: '检查结果',
    field: 'checkResult',
    component: 'Input',
  },
  {
    label: '附件',
    field: 'enclosure',
    component: 'Input',
  },
];
