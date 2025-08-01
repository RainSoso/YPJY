import { h } from 'vue';
import moment from 'moment';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import MCategory from '/@/components/Custom/MCategory.vue';

let years: any = [];
for (let start = parseInt(moment(new Date()).format('YYYY')), i = start - 5; i < start + 2; i++) {
    years.push({ label: i, value: i + '' });
}

export const columns: BasicColumn[] = [{
  title: '行政区划', dataIndex: 'xzqhdm', format: 'areaCode', width: 110
}, {
  title: '社会信用代码', dataIndex: 'shxydm', width: 180, defaultHidden: true
}, {
  title: '企业名称', dataIndex: 'qymc', width: 250
}, {
  title: '年份', dataIndex: 'year', width: 60
}, {
  title: '年度检查计划(含GMP检查)', dataIndex: 'jhJccs', width: 110, customRender({ record: row }) {
    return h('span', {}, [row.jhJccs, ' / ', row.jhGmpcs]);
  }
}, {
  title: '涉及重点监管内容', dataIndex: 'tags', align: 'left', customRender: ({ text }) => h(MCategory, { value: text, displayType: 'original' })
}, {
  title: '实际检查情况(含GMP检查)', dataIndex: 'sjJccs', width: 110, customRender({ record: row }) {
    return h('span', {}, [row.sjJccs, ' / ', row.sjGmpcs]);
  }
}, {
  title: '是否完成年度计划', dataIndex: 'sfwcndjh_dictText', width: 80, ellipsis: false
}, {
  title: '缺陷数量', dataIndex: 'qxsl', width: 175, customRender({ record: row }) {
    return h('div', { style: { display: 'inline-flex', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', margin: '0 4px' } }, [
      h('div', { style: { width: '50%' } }, ['严重：', row.yzqxsl]),
      h('div', { style: { width: '50%' } }, ['主要：', row.zyqxsl]),
      h('div', { style: { width: '50%' } }, ['一般：', row.ybqxsl]),
      h('div', { style: { width: '50%' } }, ['未定义：', row.wdyqxsl])
    ]);
  }
}, {
  title: '完成整改', dataIndex: 'sfwczg_dictText', width: 90
}];

export const searchFormSchema: FormSchema[] = [{
  label: '年度', field: 'year', component: 'Select', componentProps: { allowClear: false, options: years }
  , defaultValue: moment(new Date()).format('YYYY'), colProps: { xxl: { span: 3 } }
}, {
  label: '所属地市', field: 'xzqhdm',
  component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }
  , colProps: { xxl: { span: 4 } }
}, {
  label: '企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
}, {
  label: '社会信用代码', labelWidth: 110, field: 'shxydm', component: 'JInput', colProps: { xxl: { span: 5 } }
}];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '年份',
    field: 'year',
    component: 'Input',
  },
  {
    label: '计划检查次数',
    field: 'jhJccs',
    component: 'InputNumber',
  },
  {
    label: '计划GMP检查次数',
    field: 'jhGmpcs',
    component: 'InputNumber',
  },
  {
    label: '涉及重点监管内容',
    field: 'zdjgnr',
    component: 'Input',
  },
  {
    label: '实际检查次数',
    field: 'sjJccs',
    component: 'InputNumber',
  },
  {
    label: '实际GMP检查次数',
    field: 'sjGmpcs',
    component: 'InputNumber',
  },
  {
    label: '是否完成年度计划',
    field: 'sfwcndjh',
    component: 'Input',
  },
  {
    label: '严重缺陷数量',
    field: 'yzqxsl',
    component: 'InputNumber',
  },
  {
    label: '主要缺陷数量',
    field: 'zyqxsl',
    component: 'InputNumber',
  },
  {
    label: '一般缺陷数量',
    field: 'ybqxsl',
    component: 'InputNumber',
  },
  {
    label: '未定义缺陷数量',
    field: 'wdyqxsl',
    component: 'InputNumber',
  },
  {
    label: '完成整改',
    field: 'sfwczg',
    component: 'Input',
  },
];
