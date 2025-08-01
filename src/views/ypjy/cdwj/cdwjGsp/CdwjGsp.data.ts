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
    title: '企业名称',
    dataIndex: 'qymc'
   },
   {
    title: '注册地址',
    dataIndex: 'zcdz'
   },
   {
    title: '仓库地址/经营地址',
    dataIndex: 'ckdz'
   },
   {
    title: '经营范围/经营活动',
    dataIndex: 'jyfw'
   },
   {
    title: '检查日期',
    dataIndex: 'jcrq'
   },
   {
    title: '检查结论',
    dataIndex: 'jcjl'
   },
  //  {
  //   title: '状态',
  //   dataIndex: 'zt'
  //  },
  //  {
  //   title: '附件',
  //   dataIndex: 'fj'
  //  },
];

export const searchFormSchema: FormSchema[] = [
//  {
//     label: '场地文件ID',
//     field: 'cdwjid',
//     component: 'Input'
//   },
 {
    label: '企业名称',
    field: 'qymc',
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
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '注册地址',
    field: 'zcdz',
    component: 'Input',
  },
  {
    label: '仓库地址/经营地址',
    field: 'ckdz',
    component: 'Input',
  },
  {
    label: '经营范围/经营活动',
    field: 'jyfw',
    component: 'Input',
  },
  {
    label: '检查日期',
    field: 'jcrq',
    component: 'Input',
  },
  {
    label: '检查结论',
    field: 'jcjl',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'zt',
    component: 'Input',
  },
  {
    label: '附件',
    field: 'fj',
    component: 'Input',
  },
];
