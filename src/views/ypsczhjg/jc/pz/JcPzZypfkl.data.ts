import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
   {
    title: '备案号',
    dataIndex: 'bah',
    width:180,
    sorter:true
   },
   {
    title: '中药配方颗粒',
    dataIndex: 'zypfklmc'
   },
   {
    title: '生产企业社会信用代码',
    dataIndex: 'shxydm',
    defaultHidden: true
   },
   {
    title: '生产企业',
    dataIndex: 'scqy',
    sorter:true
   },

   {
    title: '规格',
    dataIndex: 'gg'
   },
   {
    title: '包装规格',
    dataIndex: 'bzgg',
   },
   {
    title: '保质期',
    dataIndex: 'bzq',
    width:100,
    defaultHidden: true,
    sorter:true
   },
   {
    title: '备案时间',
    dataIndex: 'basj', 
    format: 'date|YYYY-MM-DD',
    sorter:true,
    width: 130
   },
   {
    title: '同步时间',
    dataIndex: 'syncTime',
    format: 'date|YYYY-MM-DD',
    width: 130,
    defaultHidden: true
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '所属地市', field: 'xzqhdm', component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }, colProps: { xxl: { span: 4 }}
 }, {
    label: '备案号', field: 'bah', component: 'JInput',
    colProps: { xxl: { span: 4 } }
 }, {
    label: '生产企业', field: 'scqy', component: 'JInput',
    colProps: { xxl: { span: 4 } }
 }, {
    label: '中药配方颗粒', field: 'zypfklmc', component: 'JInput',colProps: { xxl: { span: 4 } }
 }
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '业务主表ID',
    field: 'ywzbid',
    component: 'Input',
  },
  {
    label: '备案号',
    field: 'bah',
    component: 'Input',
  },
  {
    label: '中药配方颗粒名称',
    field: 'zypfklmc',
    component: 'Input',
  },
  {
    label: '生产企业社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '生产企业',
    field: 'scqy',
    component: 'Input',
  },
  {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
  },
  {
    label: '生产企业行政区划代码',
    field: 'scqyXzqhdm',
    component: 'Input',
  },
  {
    label: '备案时间',
    field: 'basj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
  },
  {
    label: '包装规格',
    field: 'bzgg',
    component: 'Input',
  },
  {
    label: '保质期',
    field: 'bzq',
    component: 'Input',
  },
  {
    label: '执行的配方颗粒标准',
    field: 'zxdpfklbz',
    component: 'Input',
  },
  {
    label: '饮片执行的炮制规范',
    field: 'ypzxdpzgf',
    component: 'Input',
  },
  {
    label: '不良反应监测信息',
    field: 'blfyjcxx',
    component: 'Input',
  },
  {
    label: '备案省局',
    field: 'basj2',
    component: 'Input',
  },
  {
    label: '销售备案号',
    field: 'xsbah',
    component: 'Input',
  },
  {
    label: '销往省份',
    field: 'xwsf',
    component: 'Input',
  },
  {
    label: '销售关联生产ID',
    field: 'xsglscid',
    component: 'Input',
  },
  {
    label: '同步时间',
    field: 'syncTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
];
