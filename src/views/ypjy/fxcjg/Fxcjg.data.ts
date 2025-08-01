import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '社会信用代码',
    dataIndex: 'shxydm',
    defaultHidden: true
   },
   {
    title: '检查编号',
    dataIndex: 'jcbh'
   },
   {
    title: '计划编号',
    dataIndex: 'jhbh',
    defaultHidden: true
   },
   {
    title: '方案名称',
    dataIndex: 'famc',
    defaultHidden: true
   },
   {
    title: '企业名称',
    dataIndex: 'qymc',
    defaultHidden: true
   },
   {
    title: '检查日期',
    dataIndex: 'jcsj',
    customRender({ text }) {
      if (text) {
        text = text.substr(0,10);
      } 
      return text;
    }
   },
   {
    title: '检查类别',
    dataIndex: 'jclb'
   },
   {
    title: '检查依据',
    dataIndex: 'jcyj',
    defaultHidden: true
   },
   {
    title: '检查行为名称',
    dataIndex: 'jcxw',
    defaultHidden: true
   },
   {
    title: '现场检查情况',
    dataIndex: 'xcjcqk',
    defaultHidden: true
   },
   {
    title: '01：未发现问题终止检查并向监管对象告知检查结果；02：发现问题做出责令改正等行政命令； 03：发现问题做出行政指导； 04：发现问题做出行政处罚决定； 05：发现问题做出行政强制决定； 06：发现问题做出其他具体行政行为',
    dataIndex: 'jcjglx',
    defaultHidden: true
   },
   {
    title: '检查结论',
    dataIndex: 'jcjl'
   },
   {
    title: '其他需要说明的问题',
    dataIndex: 'qtxysmwt',
    defaultHidden: true
   },
   {
    title: '检查人员',
    dataIndex: 'jcry'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input'
  },
 {
    label: '检查编号',
    field: 'jcbh',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '检查编号',
    field: 'jcbh',
    component: 'Input',
  },
  {
    label: '计划编号',
    field: 'jhbh',
    component: 'Input',
  },
  {
    label: '方案名称',
    field: 'famc',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '检查日期',
    field: 'jcsj',
    component: 'Input',
  },
  {
    label: '检查类别',
    field: 'jclb',
    component: 'Input',
  },
  {
    label: '检查依据',
    field: 'jcyj',
    component: 'Input',
  },
  {
    label: '检查行为名称',
    field: 'jcxw',
    component: 'Input',
  },
  {
    label: '现场检查情况',
    field: 'xcjcqk',
    component: 'Input',
  },
  {
    label: '01：未发现问题终止检查并向监管对象告知检查结果；02：发现问题做出责令改正等行政命令； 03：发现问题做出行政指导； 04：发现问题做出行政处罚决定； 05：发现问题做出行政强制决定； 06：发现问题做出其他具体行政行为',
    field: 'jcjglx',
    component: 'Input',
  },
  {
    label: '检查结论',
    field: 'jcjl',
    component: 'Input',
  },
  {
    label: '其他需要说明的问题',
    field: 'qtxysmwt',
    component: 'Input',
  },
  {
    label: '检查人员',
    field: 'jcry',
    component: 'Input',
  },
];
