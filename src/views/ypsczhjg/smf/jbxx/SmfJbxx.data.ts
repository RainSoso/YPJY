import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { UploadTypeEnum } from '/@/components/Form/src/jeecg/components/JUpload';
import { columnRender } from '/@/utils/dict/dictUtils';

export const columns: BasicColumn[] = [
   {
    title: '统一社会信用代码',
    dataIndex: 'shxydm',
    width:190
   },
   {
    title: '企业名称',
    dataIndex: 'qymc',
    width:200
   },
   {
    title: '注册地址',
    dataIndex: 'zcdz',
    width:240
   },
   {
    title: '生产地址',
    dataIndex: 'address',
    width:220
   },
   {
    title: '生产范围',
    dataIndex: 'scfw',
    width:240
   },
   {
    title: '场地联系人',
    dataIndex: 'lxr',
    width:110
   },
   {
    title: '场地联系方式',
    dataIndex: 'lxfs',
    width:120
   },
   {
    title: '状态',
    dataIndex: 'state',
    width:80,
    customRender: ({ text }) => columnRender('smfState', text || '0')
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '统一社会信用代码',
    field: 'shxydm',
    component: 'JInput'
  },
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
    label: '审核情况',
    field: 'state',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [{label:'退回补正',value:2}, {label:'通过',value:3},{label:'作废',value:9}]
    },
    required: true
  },
  {
    label: '退回补正说明',
    field: 'thReason',
    component: 'InputTextArea',
    colProps: {
      span: 22,
    },
    componentProps: {
      placeholder: '请输入退回补正原因',
      rows: 6,
    },
    dynamicRules: ({ values }) => {
      return values.state =='2' ? [{ required: true, message: '请填写退回补正原因!' }] : [];
    },
  },
  {
    label: '联系人',
    field: 'thLxr',
    component: 'Input',
    colProps: {
      span: 11,
    },
  },
  {
    label: '联系电话',
    field: 'thLxdh',
    component: 'Input',
    colProps: {
      span: 11,
    },
  },
  // {
  //   field: 'zzjgt',
  //   component: 'JUpload',
  //   label: '上传图片',
  //   helpMessage: '无限制上传',
  //   componentProps: {
  //     fileType: UploadTypeEnum.image,
  //   },
  // },


];
