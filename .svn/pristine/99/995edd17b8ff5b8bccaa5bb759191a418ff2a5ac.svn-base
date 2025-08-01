import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { usePermission } from '/@/hooks/web/usePermission';
const { isDisabledAuth } = usePermission();
export const columns: BasicColumn[] = [
    {
    title: '药品id',
    dataIndex: 'durgsBasicInfoId',
    defaultHidden:true,
   },
   {
    title: '药品批准文号/注册证号',
    dataIndex: 'drugApproveNo',
   },
   {
    title: '药品通用名称',
    dataIndex: 'drugName',
   },
   {
    title: '规格',
    dataIndex: 'gg',
    width:200,
   },
   {
    title: '是否是分包装文号',
    dataIndex: 'sffwbz',
    defaultHidden:true,
   },
   {
    title: '分包装企业名称',
    dataIndex: 'fbzqymc',
    defaultHidden:true,
   },
   {
    title: '生产类型',
    dataIndex: 'sclx_dictText',
    width:120,
   },
   {
    title: '生产企业',
    dataIndex: 'scqlmc'
   },
   {
    title: '生产地址',
    dataIndex: 'scdz',
    defaultHidden:true,
   },
   {
    title: '生产车间',
    dataIndex: 'sccj',
    defaultHidden:true,
   },
   {
    title: '生产线',
    dataIndex: 'scx',
    defaultHidden:true,
   },
];
export const wpzcolumns: BasicColumn[] = [
  {
  title: '药品id',
  dataIndex: 'durgsBasicInfoId',
  defaultHidden:true,
 },
 {
  title: '药品批准文号/注册证号',
  dataIndex: 'drugApproveNo',
  defaultHidden:true,
  width:350,
 },
 {
  title: '药品名称',
  dataIndex: 'drugName',
  width:350,
 },
 {
  title: '执行标准',
  dataIndex: 'zxbz',
 },
 {
  title: '是否是分包装文号',
  dataIndex: 'sffwbz',
  defaultHidden:true,
 },
 {
  title: '分包装企业名称',
  dataIndex: 'fbzqymc',
  defaultHidden:true,
 },
 {
  title: '生产地址',
  dataIndex: 'scdz',
 },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品id',
    field: 'durgsBasicInfoId',
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
    label: '药品id',
    field: 'durgsBasicInfoId',
    component: 'Input',
    show:false,
  },
  {
    label: '药品批准文号/注册证号',
    field: 'drugApproveNo',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return isDisabledAuth(['demo.dbarray']);
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '药品通用名称',
    field: 'drugName',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return isDisabledAuth(['demo.dbarray']);
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入规格!'
      },
    ],
    colProps: {
      offset: 1,
      span:20,
    },
  },
  {
    label: '是否是分包装文号',
    field: 'sffwbz',
    component: 'JDictSelectTag',
    defaultValue:'0',
    componentProps: {
      dictCode: 'SFBZ-1',
      type: 'radioButton',
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '分包装企业名称',
    field: 'fbzqymc',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return values.sffwbz=='0';
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '生产类型',
    field: 'sclx',
    component: 'JDictSelectTag',
    defaultValue:'1',
    componentProps: {
      dictCode: 'ndbgSclx',
      type: 'radioButton',    
    },
    colProps: {
      offset: 1,
    },
    rules: [
      {
        required: true,
      },
    ],
  },
  {
    label: '生产企业名称',
    field: 'scqlmc',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return values.sclx=='1';
    },
    componentProps: ({ formModel }) => {
      return {
        onChange: async (e) => {
           console.log(formModel);
          // updateSchema({
          //   field: 'scqlmc',
          //   label: '字段3 New',
          // });
        },
      };
    }, rules: [
      {
        required: true,
        message: '请输入生产企业名称!'
      },
    ],
    colProps: {
      offset: 1,
    },
  },
  {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入生产地址!'
      },
    ],
    colProps: {
      offset: 1,
    },
  },
  {
    label: '生产车间',
    field: 'sccj',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入生产车间!'
      },
    ],
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '生产线',
    field: 'scx',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入生产线!'
      },
    ],
    colProps: {
      offset: 1,
      span: 9,
    },
  },
];
