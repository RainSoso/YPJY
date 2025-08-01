import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '药品信息id',
    dataIndex: 'durgBasicInfoId',
    defaultHidden:true,
   },
   {
    title: '药品批准文号',
    dataIndex: 'drugApproveNo',
   },
   {
    title: '规格',
    dataIndex: 'gg',
    width:200,
   },
   {
    title: '生产(进口)数量',
    dataIndex: 'scsl',
    defaultHidden:true,
   },
   {
    title: '生产(进口)数量单位',
    dataIndex: 'scsldw',
    defaultHidden:true,
   },
   {
    title: '境内销售数量',
    dataIndex: 'jlxssl',
    defaultHidden:true,
   },
   {
    title: '境内销售单位',
    dataIndex: 'jnxssldw',
    defaultHidden:true,
   },
   {
    title: '生产(进口)数量',
    dataIndex: 'jksl',
  },
  {
    title: '境内销售数量',
    dataIndex: 'jnsl',
   },
  //  {
  //   title: '出口情况',
  //   dataIndex: 'ckqk',
  //  },
];

export const wpzcolumns: BasicColumn[] = [
  {
  title: '药品信息id',
  dataIndex: 'durgBasicInfoId',
  defaultHidden:true,
 },
 {
  title: '药品名称',
  dataIndex: 'drugName',
 },
 {
  title: '执行标准',
  dataIndex: 'zxbz',
 },
 {
  title: '境内销量(千克（Kg）)',
  dataIndex: 'jlxssl',
 },
 {
  title: '出口销量(千克（Kg）)',
  dataIndex: 'scsl',
 },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品信息id',
    field: 'durgBasicInfoId',
    component: 'Input'
  },
 {
    label: '规格',
    field: 'gg',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '药品信息id',
    field: 'durgBasicInfoId',
    component: 'Input',
    show:false,
  },
  {
    label: '药品批准文号',
    field: 'drugApproveNo',
    component: 'Input',
    dynamicDisabled:true,
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        message: '请输入规格!'
      },
    ],
  },
  {
    label: '生产(进口)数量',
    field: 'scsl',
    component: 'InputNumber',
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
          required: true,
          validator: async (rule, value) => {
            const reg  =new RegExp("^((-[1-9|0]\d*))$");  
              if (reg.test(value)) {
                  return Promise.reject('生产数量必须是正整数,最小输入0');
              }
              return Promise.resolve();
          },
          trigger: 'change',
      },
  ],
  },
  {
    label: '生产(进口)数量单位',
    field: 'scsldw',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ndbgScxsdw',
     },
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        message: '请输入单位!'
      },
    ],
  },
  {
    label: '境内销售数量',
    field: 'jlxssl',
    component: 'InputNumber',
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
          required: true,
          validator: async (rule, value) => {
            const reg  =new RegExp("^((-[1-9|0]\d*))$");  
              if (reg.test(value)) {
                  return Promise.reject('销售数量必须是正整数,最小输入0');
              }
              return Promise.resolve();
          },
          trigger: 'change',
      },
  ],
  },
  {
    label: '境内销售单位',
    field: 'jnxssldw',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ndbgScxsdw',
    },
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        message: '请输入单位!'
      },
    ],
  },
  {
    label: '出口情况',
    field: 'ckqk',
    component: 'Input',
    colProps: {
      offset: 1,
    },
  },
];
