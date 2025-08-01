import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  //   {
  //   title: '场地文件ID',
  //   dataIndex: 'cdwjid',
  //  },
   {
    title: '批准文号',
    dataIndex: 'pzwh'
   },
   {
    title: '商品名称',
    dataIndex: 'spm'
   },
   {
    title: '商品规格',
    dataIndex: 'spgg'
   },
   {
    title: '单位',
    dataIndex: 'dw'
   },
   {
    title: '是否首营品种',
    dataIndex: 'sfsy',
    customRender({ text }) {
      var str = '是';
      if(text == 'N') {
        str = '否'
      }
      return str;
    }
   },
   {
    title: '生产企业名称',
    dataIndex: 'scqymc'
   },
   {
    title: '生产企业社会信用代码',
    dataIndex: 'scqydm'
   },
   {
    title: '剂型',
    dataIndex: 'jx_dictText'
   },
   {
    title: '商品类别',
    dataIndex: 'lb_dictText'
   },
   {
    title: '存储条件',
    dataIndex: 'cctj'
   },
  //  {
  //   title: '状态',
  //   dataIndex: 'zt'
  //  },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '商品名称',
    field: 'spm',
    component: 'JInput'
  },
 {
    label: '批准文号',
    field: 'pzwh',
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
    label: '批准文号',
    field: 'pzwh',
    component: 'Input',
  },
  {
    label: '商品名称',
    field: 'spm',
    component: 'Input',
  },
  {
    label: '商品规格',
    field: 'spgg',
    component: 'Input',
  },
  {
    label: '单位',
    field: 'dw',
    component: 'Input',
  },
  {
    label: '是否首营品种',
    field: 'sfsy',
    component: 'Input',
  },
  {
    label: '生产企业名称',
    field: 'scqymc',
    component: 'Input',
  },
  {
    label: '生产企业社会信用代码',
    field: 'scqydm',
    component: 'Input',
  },
  {
    label: '品种类别',
    field: 'jx',
    component: 'Input',
  },
  {
    label: '商品类别',
    field: 'lb',
    component: 'Input',
  },
  {
    label: '存储条件',
    field: 'cctj',
    component: 'Input',
  },
  {
    label: '状态：经营/停业',
    field: 'zt',
    component: 'Input',
  },
];
