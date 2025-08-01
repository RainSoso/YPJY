import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  //   {
  //   title: '场地文件ID',
  //   dataIndex: 'cdwjid'
  //  },
   {
    title: '发现日期',
    dataIndex: 'rq'
   },
   {
    title: '通用名称',
    dataIndex: 'tymc'
   },
   {
    title: '规格',
    dataIndex: 'gg'
   },
   {
    title: '数量',
    dataIndex: 'sl'
   },
   {
    title: '批准文号',
    dataIndex: 'pzwh'
   },
   {
    title: '单位',
    dataIndex: 'dw'
   },
   {
    title: '生产批号',
    dataIndex: 'scph'
   },
   {
    title: '生产企业/上市许可持有人',
    dataIndex: 'scqy'
   },
   {
    title: '所属门店',
    dataIndex: 'ssmd'
   },
   {
    title: '不合格原因',
    dataIndex: 'bhgyy'
   },
   {
    title: '处理意见',
    dataIndex: 'clyj'
   },
   {
    title: '处理情况',
    dataIndex: 'clqk'
   },
   {
    title: '经办人',
    dataIndex: 'jbr'
   },
];

export const searchFormSchema: FormSchema[] = [

 {
    label: '通用名称',
    field: 'tymc',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '场地文件ID',
    field: 'cdwjid',
    component: 'Input',
  },
  {
    label: '发现日期',
    field: 'rq',
    component: 'Input',
  },
  {
    label: '通用名称',
    field: 'tymc',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
  },
  {
    label: '数量',
    field: 'sl',
    component: 'Input',
  },
  {
    label: '批准文号',
    field: 'pzwh',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'dw',
    component: 'Input',
  },
  {
    label: '生产批号',
    field: 'scph',
    component: 'Input',
  },
  {
    label: '生产企业/上市许可持有人',
    field: 'scqy',
    component: 'Input',
  },
  {
    label: '所属门店:连锁总部填写',
    field: 'ssmd',
    component: 'Input',
  },
  {
    label: '不合格原因',
    field: 'bhgyy',
    component: 'Input',
  },
  {
    label: '处理意见',
    field: 'clyj',
    component: 'Input',
  },
  {
    label: '处理情况',
    field: 'clqk',
    component: 'Input',
  },
  {
    label: '经办人',
    field: 'jbr',
    component: 'Input',
  },
];
