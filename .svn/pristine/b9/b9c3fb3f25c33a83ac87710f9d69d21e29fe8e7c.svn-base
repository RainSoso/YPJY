import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  //   {
  //   title: '外键关联 场地文件主键',
  //   dataIndex: 'cdwjid'
  //  },
   {
    title: '供应商/购货商',
    dataIndex: 'lb_dictText'
   },
   {
    title: '是否首营',
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
    title: '企业名称',
    dataIndex: 'qymc'
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm'
   },
   {
    title: '委托人',
    dataIndex: 'wtr'
   },
   {
    title: '委托人证件号码',
    dataIndex: 'wtrshz'
   },
   {
    title: '委托人联系方式',
    dataIndex: 'wtrlxfs'
   },
   {
    title: '起始日期',
    dataIndex: 'beginTime'
   },
   {
    title: '结束日期',
    dataIndex: 'endTime'
   },
   {
    title: '采购权限',
    dataIndex: 'cgqx',
    customRender({ text }) {
      var str = '是';
      if(text == 'N') {
        str = '否'
      }
      return str;
    }
   },
   {
    title: '提货权限',
    dataIndex: 'thqx',
    customRender({ text }) {
      var str = '是';
      if(text == 'N') {
        str = '否'
      }
      return str;
    }
   },
   {
    title: '销售权限',
    dataIndex: 'xsqx',
    customRender({ text }) {
      var str = '是';
      if(text == 'N') {
        str = '否'
      }
      return str;
    }
   },
   {
    title: '是否合规',
    dataIndex: 'sfhg',
    customRender({ text }) {
      var str = '是';
      if(text == 'N') {
        str = '否'
      }
      return str;
    }
   },
];

export const searchFormSchema: FormSchema[] = [

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
    label: '外键关联 场地文件主键',
    field: 'cdwjid',
    component: 'Input',
  },
  {
    label: '采购、供应',
    field: 'lb',
    component: 'Input',
  },
  {
    label: '是否首营',
    field: 'sfsy',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '委托人',
    field: 'wtr',
    component: 'Input',
  },
  {
    label: '委托人证件号码',
    field: 'wtrshz',
    component: 'Input',
  },
  {
    label: '委托人联系方式',
    field: 'wtrlxfs',
    component: 'Input',
  },
  {
    label: '起始日期',
    field: 'beginTime',
    component: 'Input',
  },
  {
    label: '结束日期',
    field: 'endTime',
    component: 'Input',
  },
  {
    label: '采购权限',
    field: 'cgqx',
    component: 'Input',
  },
  {
    label: '提货权限',
    field: 'thqx',
    component: 'Input',
  },
  {
    label: '销售权限',
    field: 'xsqx',
    component: 'Input',
  },
  {
    label: '是否合规',
    field: 'sfhg',
    component: 'Input',
  },
];
