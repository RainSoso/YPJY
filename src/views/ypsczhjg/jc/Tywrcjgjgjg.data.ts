import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '检查类别',
    dataIndex: 'jglbbh_dictText'
   },
   {
    title: '检查单位',
    dataIndex: 'jcdwmc'
   },
   {
    title: '检查人',
    dataIndex: 'jcr'
   },
   {
    title: '检查时间',
    dataIndex: 'jcsj'
   },
  //  {
  //   title: 'jcrwfjbh',
  //   dataIndex: 'jcrwfjbh'
  //  },
  //  {
  //   title: '监管表单编号',
  //   dataIndex: 'jgbdbh'
  //  },
  //  {
  //   title: '监管表单名称',
  //   dataIndex: 'jgbdmc'
  //  },
  //  {
  //   title: '社会信用代码',
  //   dataIndex: 'shxydm'
  //  },
  //  {
  //   title: '企业名称',
  //   dataIndex: 'qymc'
  //  },


  //  {
  //   title: '得分',
  //   dataIndex: 'df'
  //  },
  //  {
  //   title: '备注',
  //   dataIndex: 'bz'
  //  },
  //  {
  //   title: '检查单位名称',
  //   dataIndex: 'jcdwmc'
  //  },
  //  {
  //   title: '检查单位',
  //   dataIndex: 'jcdwzzjgdm'
  //  },
  //  {
  //   title: 'jglbbh',
  //   dataIndex: 'jglbbh'
  //  },
   {
    title: '检查结果',
    dataIndex: 'jcjg_dictText',
 
   },
  //  {
  //   title: 'ywbldwxzqhdm',
  //   dataIndex: 'ywbldwxzqhdm'
  //  },
  //  {
  //   title: 'jcgzlx',
  //   dataIndex: 'jcgzlx'
  //  },
  //  {
  //   title: 'lrrbh',
  //   dataIndex: 'lrrbh'
  //  },
  //  {
  //   title: 'lrrxm',
  //   dataIndex: 'lrrxm'
  //  },
  //  {
  //   title: 'jcrIds',
  //   dataIndex: 'jcrIds'
  //  },
  //  {
  //   title: 'sjlydate',
  //   dataIndex: 'sjlydate'
  //  },
  //  {
  //   title: 'yjzd1',
  //   dataIndex: 'yjzd1'
  //  },
  //  {
  //   title: 'yjzd2',
  //   dataIndex: 'yjzd2'
  //  },
  //  {
  //   title: 'flagSjzx',
  //   dataIndex: 'flagSjzx'
  //  },
  //  {
  //   title: 'delflag',
  //   dataIndex: 'delflag'
  //  },
  //  {
  //   title: 'sjly',
  //   dataIndex: 'sjly'
  //  },
  //  {
  //   title: 'hgsjdj',
  //   dataIndex: 'hgsjdj'
  //  },
  //  {
  //   title: 'ezsjdj',
  //   dataIndex: 'ezsjdj'
  //  },
  //  {
  //   title: 'syncSpyj',
  //   dataIndex: 'syncSpyj'
  //  },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '监管编号',
    field: 'jgbh',
    component: 'Input'
  },
 {
    label: '监管任务编号',
    field: 'jcrwbh',
    component: 'Input'
  },
  {
    label: '检查结果', field: 'jcjg', component: 'JDictSelectTag', componentProps: { dictCode: 'JGJCJG-1', stringToNumber: false }, disabledLabelWidth: true
  },
  {
    label: '检查类别', field: 'jglbbh', component: 'JDictSelectTag', componentProps: { dictCode: 'JGFLID', stringToNumber: false }, disabledLabelWidth: true
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '监管编号',
    field: 'jgbh',
    component: 'Input',
  },
  {
    label: '监管任务编号',
    field: 'jcrwbh',
    component: 'Input',
  },
  {
    label: 'jcrwfjbh',
    field: 'jcrwfjbh',
    component: 'Input',
  },
  {
    label: '监管表单编号',
    field: 'jgbdbh',
    component: 'Input',
  },
  {
    label: '监管表单名称',
    field: 'jgbdmc',
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
    label: '检查人',
    field: 'jcr',
    component: 'Input',
  },
  {
    label: '检查时间',
    field: 'jcsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '得分',
    field: 'df',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'bz',
    component: 'Input',
  },
  {
    label: '检查单位名称',
    field: 'jcdwmc',
    component: 'Input',
  },
  {
    label: '检查单位',
    field: 'jcdwzzjgdm',
    component: 'Input',
  },
  {
    label: 'jglbbh',
    field: 'jglbbh',
    component: 'Input',
  },
  {
    label: '检查结果',

    field: 'jcjg',
    component: 'Input',
  },
  {
    label: 'ywbldwxzqhdm',
    field: 'ywbldwxzqhdm',
    component: 'Input',
  },
  {
    label: 'jcgzlx',
    field: 'jcgzlx',
    component: 'Input',
  },
  {
    label: 'lrrbh',
    field: 'lrrbh',
    component: 'Input',
  },
  {
    label: 'lrrxm',
    field: 'lrrxm',
    component: 'Input',
  },
  {
    label: 'jcrIds',
    field: 'jcrIds',
    component: 'Input',
  },
  {
    label: 'sjlydate',
    field: 'sjlydate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'yjzd1',
    field: 'yjzd1',
    component: 'Input',
  },
  {
    label: 'yjzd2',
    field: 'yjzd2',
    component: 'Input',
  },
  {
    label: 'flagSjzx',
    field: 'flagSjzx',
    component: 'Input',
  },
  {
    label: 'delflag',
    field: 'delflag',
    component: 'Input',
  },
  {
    label: 'sjly',
    field: 'sjly',
    component: 'Input',
  },
  {
    label: 'hgsjdj',
    field: 'hgsjdj',
    component: 'Input',
  },
  {
    label: 'ezsjdj',
    field: 'ezsjdj',
    component: 'Input',
  },
  {
    label: 'syncSpyj',
    field: 'syncSpyj',
    component: 'Input',
  },
];
