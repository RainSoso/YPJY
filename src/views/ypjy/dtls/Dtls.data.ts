import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
   
   
   {
    title: '企业名称',
    dataIndex: 'qymc'
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm'
   },
   {
    title: '地区',
    dataIndex: 'xzqhdm',
    format: 'areaCode',
   },
   {
    title: '证书编号',
    dataIndex: 'zsbh'
   },
  //  {
  //   title: '证书类型',
  //   dataIndex: 'type',
  //   customRender({ text }) {
  //     var str = '药品经营零售';
  //     if (text == '02') {
  //       str = '零售连锁门店';
  //     } 
  //     return str;
  //   }
  //  },
   {
    title: 'zcdz',
    dataIndex: 'zcdz',
    defaultHidden: true

   },
   {
    title: 'ckdz',
    dataIndex: 'ckdz',
    defaultHidden: true
   },
   {
    title: 'fw',
    dataIndex: 'fw',
    defaultHidden: true
   },
   {
    title: 'fddbr',
    dataIndex: 'fddbr',
    defaultHidden: true
   },
   {
    title: 'qyfzr',
    dataIndex: 'qyfzr',
    defaultHidden: true
   },
   {
    title: 'fzjg',
    dataIndex: 'fzjg',
    defaultHidden: true
   },
   {
    title: 'zlfzr',
    dataIndex: 'zlfzr',
    defaultHidden: true
   },
   {
    title: 'fzrq',
    dataIndex: 'fzrq',
    defaultHidden: true
   },
   {
    title: 'yxqz',
    dataIndex: 'yxqz',
    defaultHidden: true
   },
   {
    title: 'qfr',
    dataIndex: 'qfr',
    defaultHidden: true
   },
   {
    title: 'rcjgjgid',
    dataIndex: 'rcjgjgid',
    defaultHidden: true
   },
   {
    title: 'rcjgjgmc',
    dataIndex: 'rcjgjgmc',
    defaultHidden: true
   },
   {
    title: 'rcjgryid',
    dataIndex: 'rcjgryid',
    defaultHidden: true
   },
   {
    title: 'rcjgryxm',
    dataIndex: 'rcjgryxm',
    defaultHidden: true
   },
   {
    title: 'bz',
    dataIndex: 'bz',
    defaultHidden: true
   },
   {
    title: 'qyid',
    dataIndex: 'qyid',
    defaultHidden: true
   },
   
   {
    title: 'status',
    dataIndex: 'status',
    defaultHidden: true
   },
   {
    title: 'fzjgid',
    dataIndex: 'fzjgid',
    defaultHidden: true
   },
];

export const searchFormSchema: FormSchema[] = [

 {
    label: '企业名称',
    field: 'qymc',
    component: 'JInput'
  },
  {
    label: '所属区县',
    field: 'xzqhdm',
    component: 'JAreaSelect',
    componentProps: {
      level: 3, province: '420000', hideProvince: true, 
    },
  }
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: 'type',
    field: 'type',
    component: 'Input',
  },
  {
    label: 'zsbh',
    field: 'zsbh',
    component: 'Input',
  },
  {
    label: 'shxydm',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: 'qymc',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: 'zcdz',
    field: 'zcdz',
    component: 'Input',
  },
  {
    label: 'ckdz',
    field: 'ckdz',
    component: 'Input',
  },
  {
    label: 'fw',
    field: 'fw',
    component: 'Input',
  },
  {
    label: 'fddbr',
    field: 'fddbr',
    component: 'Input',
  },
  {
    label: 'qyfzr',
    field: 'qyfzr',
    component: 'Input',
  },
  {
    label: 'fzjg',
    field: 'fzjg',
    component: 'Input',
  },
  {
    label: 'zlfzr',
    field: 'zlfzr',
    component: 'Input',
  },
  {
    label: 'fzrq',
    field: 'fzrq',
    component: 'Input',
  },
  {
    label: 'yxqz',
    field: 'yxqz',
    component: 'Input',
  },
  {
    label: 'qfr',
    field: 'qfr',
    component: 'Input',
  },
  {
    label: 'rcjgjgid',
    field: 'rcjgjgid',
    component: 'Input',
  },
  {
    label: 'rcjgjgmc',
    field: 'rcjgjgmc',
    component: 'Input',
  },
  {
    label: 'rcjgryid',
    field: 'rcjgryid',
    component: 'Input',
  },
  {
    label: 'rcjgryxm',
    field: 'rcjgryxm',
    component: 'Input',
  },
  {
    label: 'bz',
    field: 'bz',
    component: 'Input',
  },
  {
    label: 'qyid',
    field: 'qyid',
    component: 'Input',
  },
  {
    label: 'xzqhdm',
    field: 'xzqhdm',
    component: 'Input',
  },
  {
    label: 'status',
    field: 'status',
    component: 'Input',
  },
  {
    label: 'fzjgid',
    field: 'fzjgid',
    component: 'Input',
  },
];
