import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
   
   {
    title: '社会信用代码',
    dataIndex: 'shxydm'
   },
   {
    title: '企业名称',
    dataIndex: 'qymc'
   },
   {
    title: '地区',
    dataIndex: 'xzqhdm',
    format: 'areaCode',
   },
   {
    title: '备案编号',
    dataIndex: 'zsbh',
   },
   {
    title: '法定代表人',
    dataIndex: 'fddbr',
    defaultHidden: true
   },
   {
    title: '网站名称',
    dataIndex: 'wzmc',
    defaultHidden: true
   },
   {
    title: '网络客户端应用程序名',
    dataIndex: 'wlkhdyymc',
    defaultHidden: true
   },
   {
    title: '网站域名',
    dataIndex: 'wzym',
    defaultHidden: true
   },
   {
    title: '网站IP地址',
    dataIndex: 'ipdz',
    defaultHidden: true
   },
   {
    title: '电信业务经营许可证编号',
    dataIndex: 'dxxkbh',
    defaultHidden: true
   },
   {
    title: '非经营性互联网信息服务备案编号',
    dataIndex: 'fjyxhlwbabh',
    defaultHidden: true
   },
   {
    title: '发证机关',
    dataIndex: 'fzjg',
    defaultHidden: true
   },
   {
    title: '备案日期',
    dataIndex: 'fzrq',
    defaultHidden: true
   },
   {
    title: '有效期至',
    dataIndex: 'yxqz',
    defaultHidden: true
   },
   {
    title: '备注',
    dataIndex: 'bz',
    defaultHidden: true
   },
   {
    title: 'qyid',
    dataIndex: 'qyid',
    defaultHidden: true
   },
   {
    title: 'fzjgid',
    dataIndex: 'fzjgid',
    defaultHidden: true
   },
   {
    title: 'status',
    dataIndex: 'status',
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
    label: '社会信用代码',
    field: 'shxydm',
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
    label: '备案编号',
    field: 'zsbh',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '法定代表人',
    field: 'fddbr',
    component: 'Input',
  },
  {
    label: '网站名称',
    field: 'wzmc',
    component: 'Input',
  },
  {
    label: '网络客户端应用程序名',
    field: 'wlkhdyymc',
    component: 'Input',
  },
  {
    label: '网站域名',
    field: 'wzym',
    component: 'Input',
  },
  {
    label: '网站IP地址',
    field: 'ipdz',
    component: 'Input',
  },
  {
    label: '电信业务经营许可证编号',
    field: 'dxxkbh',
    component: 'Input',
  },
  {
    label: '非经营性互联网信息服务备案编号',
    field: 'fjyxhlwbabh',
    component: 'Input',
  },
  {
    label: '发证机关',
    field: 'fzjg',
    component: 'Input',
  },
  {
    label: '备案日期',
    field: 'fzrq',
    component: 'Input',
  },
  {
    label: '有效期至',
    field: 'yxqz',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'bz',
    component: 'Input',
  },
  {
    label: 'qyid',
    field: 'qyid',
    component: 'Input',
  },
  {
    label: 'fzjgid',
    field: 'fzjgid',
    component: 'Input',
  },
  {
    label: 'status',
    field: 'status',
    component: 'Input',
  },
  {
    label: '行政区划代码',
    field: 'xzqhdm',
    component: 'Input',
  },
];
