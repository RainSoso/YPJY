import {h} from 'vue';
import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import attachNumber from '../components/attachNumber.vue';

export const columns: BasicColumn[] = [
    {
    title: '药品id',
    dataIndex: 'durgBasicInfoId',
    defaultHidden:true,
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
    title: '项目',
    dataIndex: 'project'
   },
   {
    title: '是否有内容',
    dataIndex: 'isContent_dictText',
    width:120,
   },
   {
    title: '对否有风险计划',
    dataIndex: 'isRiskPlan',
    defaultHidden:true,
   },
   {
    title: '理由',
    dataIndex: 'isNoPlanReason',
    defaultHidden:true,
   },
   {
    title: '是否符合标准',
    dataIndex: 'isAccordWithStandard',
    defaultHidden:true,
   },
   {
    title: '是否符合监管标准',
    dataIndex: 'isAccordWithSuperviseStandard',
    defaultHidden:true,
   },
   {
    title: '是否退回',
    dataIndex: 'isReturn',
    defaultHidden:true,
   },
   {
    title: '是否召回',
    dataIndex: 'isRecall',
    defaultHidden:true,
   },
   {
    title: '召回等级',
    dataIndex: 'recallGrade',
    defaultHidden:true,
   },
   {
    title: '是否GMP',
    dataIndex: 'isGmp',
    defaultHidden:true,
   },
   {
    title: '附件数量',
    dataIndex: 'fjsl',
    width: 120, customRender: ({record}) => {
      return h(attachNumber, {fileId: record.id, type: record.project});
    }
   },
   {
    title: '附件',
    dataIndex: 'enclosure',
    defaultHidden:true
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品id',
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
    label: '药品id',
    field: 'durgBasicInfoId',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
  },
  {
    label: '项目',
    field: 'project',
    component: 'Input',
  },
  {
    label: '是否有内容',
    field: 'isContent',
    component: 'Input',
  },
  {
    label: '对否有风险计划',
    field: 'isRiskPlan',
    component: 'Input',
  },
  {
    label: '理由',
    field: 'isNoPlanReason',
    component: 'Input',
  },
  {
    label: '是否符合标准',
    field: 'isAccordWithStandard',
    component: 'Input',
  },
  {
    label: '是否符合监管标准',
    field: 'isAccordWithSuperviseStandard',
    component: 'Input',
  },
  {
    label: '是否退回',
    field: 'isReturn',
    component: 'Input',
  },
  {
    label: '是否召回',
    field: 'isRecall',
    component: 'Input',
  },
  {
    label: '召回等级',
    field: 'recallGrade',
    component: 'Input',
  },
  {
    label: '是否GMP',
    field: 'isGmp',
    component: 'Input',
  },
  {
    label: '附件',
    field: 'enclosure',
    component: 'Input',
  },
];
