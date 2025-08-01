import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';

export const columns: BasicColumn[] = [
    {
    title: '年度报告id',
    dataIndex: 'reportId',
    defaultHidden:true,
   },
   {
    title: '药品通用名称',
    dataIndex: 'drugName',
   },
   {
    title: '药品批准文号/注册证号',
    dataIndex: 'drugApproveNo'
   },
   {
    title: '剂型',
    dataIndex: 'dosageType',
    defaultHidden:true,
   },
   {
    title: '规格',
    dataIndex: 'specifications',
    defaultHidden:true,
   },
   {
    title: '商品名',
    dataIndex: 'goodName',
    defaultHidden:true,
   },
   {
    title: '生产/进口批次',
    dataIndex: 'jkpc',
    defaultHidden:true,
   },
   {
    title: '年度内是否生产',
    dataIndex: 'isProduct_dictText',
    defaultHidden:true,
   },
   {
    title: '年度内是否生产',
    dataIndex: 'lsfzc',
    customRender: ({text}) => columnRender('SFBZ-1', text || '0')
   },
   {
    title: '管理属性',
    dataIndex: 'glsx',
    defaultHidden:true,
   },
   {
    title: '是否已填报完成',
    dataIndex: 'isComplete',
    customRender: ({text}) => columnRender('yes_no', text || 'N')
   }
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品通用名称',
    field: 'drugName',
    component: 'JInput'
  },
 {
    label: '药品批准文号',
    field: 'drugApproveNo',
    component: 'JInput'
  },
];

export const searchFormSchematwo: FormSchema[] = [
  {
    label: '所属地市', field: 'xzqhdm',
    component: 'JAreaSelect', componentProps: { level: 2, province: '420000', hideProvince: true, cityChooseOption: '全省' }
    , colProps: { xxl: { span: 4 } }
   },
  {
     label: '药品通用名称',
     field: 'drugName',
     component: 'JInput'
   },
  {
     label: '药品批准文号',
     field: 'drugApproveNo',
     component: 'JInput'
   },
 ];
export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '年度报告id',
    field: 'reportId',
    component: 'Input',
  },
  {
    label: '药品批准文号/注册证号',
    field: 'drugApproveNo',
    component: 'Input',
  },
  {
    label: '药品通用名称',
    field: 'drugName',
    component: 'Input',
  },
  {
    label: '剂型',
    field: 'dosageType',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'specifications',
    component: 'Input',
  },
  {
    label: '商品名',
    field: 'goodName',
    component: 'Input',
  },
  {
    label: '生产/进口批次',
    field: 'jkpc',
    component: 'Input',
  },
  {
    label: '是否生产',
    field: 'isProduct',
    component: 'Input',
  },
  {
    label: '管理属性',
    field: 'glsx',
    component: 'Input',
  },
];

