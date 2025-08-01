import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';
import moment from 'moment';

export const columns: BasicColumn[] = [
   {
    title: '平台来源',
    dataIndex: 'platType',
    customRender: ({ text }) => columnRender('tsjb_ptly', text || '1000005')
   },
   {
    title: '投诉举报对象',
    dataIndex: 'complaintObject'
   },
   {
    title: '录入人员',
    dataIndex: 'lrrName',
    width:100
   },
   {
    title: '录入时间',
    dataIndex: 'lrsj',
    format: 'date|YYYY-MM-DD',
    width:130,
    sorter: true
   },
   {
    title: '状态',
    dataIndex: 'zc',
    customRender: ({ text }) => columnRender('tsjb_zc', text || '0'),
    width:100
   },

];

export const searchFormSchema: FormSchema[] = [
 {
    label: '录入时间',
    field: 'lrsjRange',
    component: 'RangePicker', rangeFields: ['lrsj_begin', 'lrsj_end']
  },
  {
    label: '投诉举报对象',
    field: 'complaintObject',
    component: 'JInput'
  },
 {
    label: '平台来源',
    field: 'platType',
    component: 'JDictSelectTag', componentProps: { dictCode: 'tsjb_ptly' }
  },
];


export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '登记编号',
    field: 'registerCode',
    component: 'Input',
  },
  {
    label: '平台来源',
    field: 'platType',
    component: 'InputNumber',
  },
  {
    label: '投诉举报标签：1：投诉；2：举报；3：其它。',
    field: 'complaintReportFlg',
    component: 'InputNumber',
  },
  {
    label: '投诉举报对象类型：1:企业，2:平台，3:其它。',
    field: 'complaintObjectType',
    component: 'InputNumber',
  },
  {
    label: '投诉举报对象',
    field: 'complaintObject',
    component: 'Input',
  },
  {
    label: '投诉举报对象统一社会信用代码',
    field: 'enterpriseCreditCode',
    component: 'Input',
  },
  {
    label: '投诉举报属地',
    field: 'complaintTerritory',
    component: 'Input',
  },
  {
    label: '投诉举报属地行政区划代码',
    field: 'areaNumber',
    component: 'Input',
  },
  {
    label: '投诉举报内容',
    field: 'complaintDetail',
    component: 'Input',
  },
  {
    label: '投诉举报递交日期',
    field: 'complaintDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '事件发生地点',
    field: 'happenPlace',
    component: 'Input',
  },
  {
    label: '事件发生日期',
    field: 'happenDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '录入人id',
    field: 'lrrId',
    component: 'Input',
  },
  {
    label: '录入人名称',
    field: 'lrrName',
    component: 'Input',
  },
  {
    label: '录入部门',
    field: 'deptId',
    component: 'Input',
  },
  {
    label: '录入时间',
    field: 'lrsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '暂存：0：暂存；1：上报',
    field: 'zc',
    component: 'Input',
  },
  {
    label: '投诉举报内容 国标',
    field: 'complaintDetailGb',
    component: 'Input',
  },
];
