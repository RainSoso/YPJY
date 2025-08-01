import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getZxTitle } from './Rcjgjbxx.api';

export const columns: BasicColumn[] = [
  {
    title: '企业名称',
    dataIndex: 'qymc'
  },
  {
    title: '社会信用代码',
    dataIndex: 'shxydm'
  },
  {
    title: '监管编号',
    dataIndex: 'jgbh'
  },
  {
    title: '表单名称',
    dataIndex: 'bdmc'
  },
  {
    title: '检查时间',
    dataIndex: 'jcsj'
  },
  {
    title: '检查部门',
    dataIndex: 'lybm'
  },
  {
    title: '综合评定结论',
    dataIndex: 'jcjl',
    customRender({ text, record }) {
      const year = record.jcsj ? new Date(record.jcsj).getFullYear() : new Date().getFullYear();

      if (year >= 2025) {
        // 2025年及以后的显示规则
        switch (text) {
          case '1': return '符合要求';
          case '2': return '整改后评定';
          case '3': return '不符合要求';
          default: return text; // 其他情况保持原值
        }
      } else {
        // 2025年以前的显示规则
        switch (text) {
          case '1': return '基本符合规定';
          case '2': return '立即整改';
          case '3': return '限期整改';
          case '4': return '现场处罚';
          case '5': return '拟立案处罚';
          default: return text; // 其他情况保持原值
        }
      }
    }

  },
];
export const searchFormSchema: FormSchema[] = [
  {
    label: '所属区县',
    field: 'xzqhdm',
    component: 'JAreaSelect',
    componentProps: {
      level: 3, province: '420000', hideProvince: true,
    },
  },
  {
    label: '检查时间', field: 'jcsjRange', component: 'RangePicker',
    rangeFields: ['jcsj_begin', 'jcsj_end']
  },
  {
    label: '检查形式',
    field: 'jcxs',
    component: 'JInput'
  },
  {
    label: '综合评定结论',
    field: 'jcjl',
    component: 'Select',
    componentProps: {
      options: [
        { label: '基本符合规定', value: '1' },
        { label: '立即整改', value: '2' },
        { label: '限期整改', value: '3' },
        { label: '现场处罚', value: '4' },
        { label: '拟立案处罚', value: '5' }
      ]
    }
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'JInput'
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'JInput'
  },
  {
    label: '检查部门',
    field: 'lybm',
    component: 'JInput'
  },
];

export const searchFormSchemaJlgl: FormSchema[] = [
  {
    label: '检查类型',
    field: 'jclx',
    component: 'Select',
    componentProps: {
      options: [
        { label: '常规检查', value: '1' },
        { label: '有因检查', value: '2' },
        { label: '联合检查', value: '3' },
        { label: '委托检查', value: '4' },
        { label: '委托检查', value: '5' },
        { label: '追溯责任检查', value: '6' }
      ]
    }
  }
];

export const searchFormSchemaZxjc: FormSchema[] = [
  {
    label: '所属区县',
    field: 'xzqhdm',
    component: 'JAreaSelect',
    componentProps: {
      level: 3, province: '420000', hideProvince: true,
    },
  },
  {
    label: '专项检查类别',
    field: 'zxtitle',
    component: 'ApiSelect',
    componentProps: {
      api: getZxTitle,
      labelField: 'name',
      valueField: 'value',
    },
  },
];
export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '表单名称',
    field: 'bdmc',
    component: 'Input',
  },
  {
    label: 'code',
    field: 'code',
    component: 'Input',
  },
  {
    label: '监管类型',
    field: 'jglx',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'tyshxydm',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '行政区划代码',
    field: 'xzqhdm',
    component: 'Input',
  },
  {
    label: '检查时间',
    field: 'jcsj',
    component: 'Input',
  },
  {
    label: '检查部门',
    field: 'jcbm',
    component: 'Input',
  },
  {
    label: '检查部门id',
    field: 'jcbmid',
    component: 'Input',
  },
  {
    label: '检查人员',
    field: 'jcry',
    component: 'Input',
  },
  {
    label: '检查内容',
    field: 'jcnr',
    component: 'Input',
  },
  {
    label: '检查结果',
    field: 'jcjg',
    component: 'Input',
  },
  {
    label: '备注，',
    field: 'bz',
    component: 'Input',
  },
  {
    label: '处理建议，（药品生产）',
    field: 'cljy',
    component: 'Input',
  },
  {
    label: '检查行为名称（药品生产）',
    field: 'jcxwmc',
    component: 'Input',
  },
  {
    label: '检查行为编号，（药品生产）',
    field: 'jcxwbh',
    component: 'Input',
  },
  {
    label: '监管等级(医疗器械生产)',
    field: 'jgdj',
    component: 'Input',
  },
  {
    label: '任务书类型(医疗器械生产)',
    field: 'rwslx',
    component: 'Input',
  },
  {
    label: '检查类型(医疗器械生产)',
    field: 'jclx',
    component: 'Input',
  },
  {
    label: '检查方式(医疗器械生产)',
    field: 'jcfs',
    component: 'Input',
  },
  {
    label: '产品类别(医疗器械生产)',
    field: 'cplb',
    component: 'Input',
  },
];
