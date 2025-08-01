import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { formatToDate } from '/@/utils/dateUtil';
const formatToDate1 = formatToDate;

export const columns: BasicColumn[] = [
    {
    title: '企业名称',
    dataIndex: 'companyName'
   },
   {
    title: '受理编号',
    dataIndex: 'serial'
   },
  //  {
  //   title: '检查依据',
  //   dataIndex: 'inspectionBasis'
  //  },
   {
    title: '经营方式',
    dataIndex: 'businessMethod'
   },
   {
    title: '开始时间',
    dataIndex: 'startTime',
    customRender({ text }) {
      return formatToDate1(text);
    }
   },
   {
    title: '结束时间',
    dataIndex: 'finishTime',
    customRender({ text }) {
      return formatToDate1(text);
    }
   },
   {
    title: '检查人员',
    dataIndex: 'inspectorNames'
   },
   {
    title: '检查结论',
    dataIndex: 'islock'
   },
   {
    title: '检查结束时间',
    dataIndex: 'finishTime',
    defaultHidden:true
   },
   {
    title: '实施单位',
    dataIndex: 'implementationUnit',
    defaultHidden:true
   },
   {
    title: '任务来源',
    dataIndex: 'taskSource',
    defaultHidden:true
   },
   {
    title: '经营地址',
    dataIndex: 'inspectionAddress',
    defaultHidden:true
   },
   {
    title: '仓库地址',
    dataIndex: 'factoryAddress',
    defaultHidden:true
   },
   {
    title: '经营范围',
    dataIndex: 'inspectionScope',
    defaultHidden:true
   },
   {
    title: '被检单位综合评定情况简述',
    dataIndex: 'situation',
    defaultHidden:true
   },
   {
    title: '综合评定结论',
    dataIndex: 'result',
    defaultHidden:true
   },
   {
    title: '会签时间',
    dataIndex: 'operateTime',
    defaultHidden:true
   },
   {
    title: '会签人员Ids',
    dataIndex: 'signedidList',
    defaultHidden:true
   },
   {
    title: '保存锁定',
    dataIndex: 'islock',
    defaultHidden:true
   },
   {
    title: '附件',
    dataIndex: 'file',
    defaultHidden:true
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '企业名称',
    field: 'companyName',
    component: 'Input'
  },
 {
    label: '受理编号',
    field: 'serial',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '企业名称',
    field: 'companyName',
    component: 'JInput',
  },
  {
    label: '受理编号',
    field: 'serial',
    component: 'JInput',
  },
  {
    label: '检查依据',
    field: 'inspectionBasis',
    component: 'Input',
  },
  {
    label: '经营方式',
    field: 'businessMethod',
    component: 'Input',
  },
  {
    label: '检查人员',
    field: 'inspectorNames',
    component: 'Input',
  },
  {
    label: '检查开始时间',
    field: 'startTime',
    component: 'Input',
  },
  {
    label: '检查结束时间',
    field: 'finishTime',
    component: 'Input',
  },
  {
    label: '实施单位',
    field: 'implementationUnit',
    component: 'Input',
  },
  {
    label: '任务来源',
    field: 'taskSource',
    component: 'Input',
  },
  {
    label: '经营地址',
    field: 'inspectionAddress',
    component: 'Input',
  },
  {
    label: '仓库地址',
    field: 'factoryAddress',
    component: 'Input',
  },
  {
    label: '经营范围',
    field: 'inspectionScope',
    component: 'Input',
  },
  {
    label: '被检单位综合评定情况简述',
    field: 'situation',
    component: 'Input',
  },
  {
    label: '综合评定结论',
    field: 'result',
    component: 'Input',
  },
  {
    label: '会签时间',
    field: 'operateTime',
    component: 'Input',
  },
  {
    label: '会签人员Ids',
    field: 'signedidList',
    component: 'Input',
  },
  {
    label: '保存锁定',
    field: 'islock',
    component: 'Input',
  },
  {
    label: '附件',
    field: 'file',
    component: 'Input',
  },
];
