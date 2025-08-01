import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '标题',
    dataIndex: 'title'
   },
   {
    title: '年度',
    dataIndex: 'nd',
    defaultHidden:true
   },
   {
    title: '季度',
    dataIndex: 'jd',
    defaultHidden:true
   },
   {
    title: '填报单位',
    dataIndex: 'tbdw'
   },
   {
    title: '行政区划',
    dataIndex: 'xzqudm',
    defaultHidden:true
   },
   {
    title: '填报人',
    dataIndex: 'tbr'
   },
   {
    title: '联系方式',
    dataIndex: 'lxfs'
   },
   {
    title: '辖区',
    dataIndex: 'xiaqu'
   },
  //  {
  //   title: '状态',
  //   dataIndex: 'zt',
  //   customRender({ text }) {
  //     var str = '未上报';
  //     if (text == '1') {
  //       str = '已上报';
  //     }
  //     return str;
  //   },
  //  },
   {
    title: '附件',
    dataIndex: 'fj',
    defaultHidden:true
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '标题',
    field: 'title',
    component: 'JInput'
  },
  // {
  //   label: '年度',
  //   field: 'nd',
  //   component: 'Input'
  // },
  {
    label: '填报单位',
    field: 'tbdw',
    component: 'Select',
    componentProps: {
      options: [
        { label: '武汉分局', value: '武汉分局' },
        { label: '襄阳分局', value: '襄阳分局' },
        { label: '宜昌分局', value: '宜昌分局' },
        { label: '鄂州分局', value: '鄂州分局' },
        { label: '咸宁分局', value: '咸宁分局' },
        { label: '孝感分局', value: '孝感分局' },
        { label: '荆门分局', value: '荆门分局' },
        { label: '恩施分局', value: '恩施分局' },
        { label: '黄石分局', value: '黄石分局' },
        { label: '荆州分局', value: '荆州分局' },
        { label: '十堰分局', value: '十堰分局' },
        { label: '黄冈分局', value: '黄冈分局' },
        { label: '随州分局', value: '随州分局' },
        { label: '汉江分局', value: '汉江分局' }
      ]
    }

  }, 
  {
    label: '填报人',
    field: 'tbr',
    component: 'JInput'
  }, 
  
];


export const searchFormSchemaMe: FormSchema[] = [
  {
     label: '标题',
     field: 'title',
     component: 'JInput'
   },
   // {
   //   label: '年度',
   //   field: 'nd',
   //   component: 'Input'
   // },
  //  {
  //   label: '状态',
  //   field: 'zt',
  //   component: 'Select',
  //   componentProps: {
  //     options: [
  //       { label: '未上报', value: '0' },
  //       { label: '已上报', value: '1' },
  //     ]
  //   }
  // },
   
 ];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '标题',
    field: 'title',
    component: 'Input',
    required: true
    
  },
  {
    label: '填报单位',
    field: 'tbdw',
    component: 'Input',
    required: true
  },
  {
    label: '辖区',
    field: 'xiaqu',
    component: 'Input',
    required: true
  },
  
  {
    label: '填报人',
    field: 'tbr',
    component: 'Input',
    required: true
  },
  {
    label: '联系方式',
    field: 'lxfs',
    component: 'Input',
    required: true
  },
  {
    label: '描述',
    field: 'ms',
    component: 'InputTextArea',
  },
  {
    label: '重点问题',
    field: 'zdwt',
    component: 'InputTextArea',
  },
  // {
  //   label: '联系方式',
  //   field: 'lxfs',
  //   component: 'Input',
  // },
  // {
  //   label: '0 未发布 1已发布',
  //   field: 'zt',
  //   component: 'Input',
  // },
  // {
  //   label: '附件',
  //   field: 'fj',
  //   component: 'Input',
  // },
  {
    label: '附件',
    field: 'fj',
    component: 'JUpload',
    componentProps: { bizPath: 'fxbg' },
  },
];
