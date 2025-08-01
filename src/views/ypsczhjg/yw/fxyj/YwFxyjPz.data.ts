import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '风险类型',
    dataIndex: 'fxlx',
    width:200
   },
   {
    title: '年份',
    dataIndex: 'year',
    width:160
   },
   {
    title: '药品批准文号',
    dataIndex: 'yppzwh'
   },
   {
    title: '药品通用名称',
    dataIndex: 'yptymc'
   },
   {
    title: '风险级别',
    dataIndex: 'fxjb'
   },
   {
    title: '发生次数',
    dataIndex: 'ywQty',
    width:150
   },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '年份',
    field: 'year',
    component: 'JInput',
    colProps: { xxl: { span: 6 } }
  },
 {
    label: '品种名称',
    field: 'yptymc',
    component: 'JInput',
    colProps: { xxl: { span: 6 } }
  },

];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '风险类型',
    field: 'fxlx',
    component: 'Input',
  },
  {
    label: '年份',
    field: 'year',
    component: 'Input',
  },
  {
    label: '药品批准文号',
    field: 'yppzwh',
    component: 'Input',
  },
  {
    label: '药品通用名称',
    field: 'yptymc',
    component: 'Input',
  },
  {
    label: '药品类型',
    field: 'ypfl',
    component: 'Input',
  },
  {
    label: '标准剂型',
    field: 'bzjx',
    component: 'Input',
  },
  {
    label: '药品上市许可持有人社会信用代码',
    field: 'cyrShxydm',
    component: 'Input',
  },
  {
    label: '药品上市许可持有人名称',
    field: 'cyrQymc',
    component: 'Input',
  },
  {
    label: '标签，分类字典A02',
    field: 'tags',
    component: 'Input',
  },
  {
    label: '标签(时效性)',
    field: 'tagsDate',
    component: 'Input',
  },
  {
    label: '风险内容',
    field: 'fxnr',
    component: 'Input',
  },
  {
    label: '风险级别',
    field: 'fxjb',
    component: 'Input',
  },
  {
    label: '发生次数',
    field: 'ywQty',
    component: 'Input',
  },
  {
    label: '涉及业务数据ids',
    field: 'ywIds',
    component: 'Input',
  },
  {
    label: '排序号',
    field: 'sort',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'Input',
  },
  {
    label: '删除状态，0正常1删除',
    field: 'delFlag',
    component: 'Input',
  },
];
