import { ref, computed } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import Tools from '/@/utils/tools';
const currentYear = ref(Tools.getCurrentYear() + 3);
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '年度',
    align: "center",
    sorter: true,
    dataIndex: 'nd',
    width: 140
  },
  {
    title: '计划名称',
    align: "center",
    dataIndex: 'jhmc'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'zt',
    sorter: true,
    customRender: ({ record }) => {
      return record.zt ? (record.zt == '0' ? '未发布' : '已发布') : '';
    }
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "计划名称",
    field: 'jhmc',
    component: 'JInput',
    //colProps: {span: 6},
  },
  // {
  //   label: "检查方式",
  //   field: 'jcfs',
  //   component: 'Input',
  //   //colProps: {span: 6},
  // },
  {
    label: '检查类别',
    field: 'jclb',
    component: 'JDictSelectTag',
    componentProps: {
      //字典code配置，比如通过性别字典编码：sex，也可以使用demo,name,id 表名,名称,值的方式
      dictCode: 'ypjy_jhlb',
      //支持radio(单选按钮)、radioButton(单选按钮 btn风格)、select(下拉框)
      type: 'select',
      showChooseOption: false
    }
  },
  
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '检查类别',
    field: 'jclb',
    component: 'JDictSelectTag',
    defaultValue: '1',
    componentProps: {
      //字典code配置，比如通过性别字典编码：sex，也可以使用demo,name,id 表名,名称,值的方式
      dictCode: 'ypjy_jhlb',
      //支持radio(单选按钮)、radioButton(单选按钮 btn风格)、select(下拉框)
      type: 'radioButton',
    }
  },
  {
    label: '年度',
    field: 'nd',
    component: 'Select',
    defaultValue: currentYear.value - 3,
    componentProps: {
      options: yearArray,
    }

  },
  {
    label: '计划名称',
    field: 'jhmc',
    component: 'Input',
    defaultValue: (currentYear.value - 3) + '年度检查计划',
  },
  {
    label: '检查重点',
    field: 'jczd',
    component: 'InputTextArea',
  },
  {
    label: '接收单位',
    field: 'jsdw',
    component: 'Input',
    component: 'JSelectDept',
    componentProps: {
      //是否开启异步加载
      sync: false,
      //是否显示复选框
      checkable: true,
      //是否显示选择按钮
      showButton: false,
      //父子节点选中状态不再关联
      checkStrictly: true,
      //选择框标题
      modalTitle: '部门选择',
    },
    ifShow: ({ values }) => {
      return values.jclb == '2';
    },
  },

  {
    label: '检查方式',
    field: 'jcfs',
    component: 'JDictSelectTag',
    componentProps: {
      //字典code配置，比如通过性别字典编码：sex，也可以使用demo,name,id 表名,名称,值的方式
      dictCode: 'ypjy_jcfs',
      //支持radio(单选按钮)、radioButton(单选按钮 btn风格)、select(下拉框)
      type: 'radio'
    },
    ifShow: ({ values }) => {
      return values.jclb == '2';
    },
  },
  {
    label: '检查开始日期',
    field: 'jcrqStart',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
    ifShow: ({ values }) => {
      return values.jclb == '2';
    },
  },
  {
    label: '检查结束日期',
    field: 'jcrqEnd',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD'
    },
    ifShow: ({ values }) => {
      return values.jclb == '2';
    },
  },

  {
    label: '附件',
    field: 'fj',
    component: 'JUpload',
    componentProps: {
      //是否显示选择按钮
      text: '文件上传',
      //最大上传数
      maxCount: 5,
      //是否显示下载按钮
      download: true,
    },
  },
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false
  },
];

// 高级查询数据
export const superQuerySchema = {
  nd: { title: '年度', order: 0, view: 'text', type: 'string', },
  jhbh: { title: '计划编号', order: 1, view: 'text', type: 'string', },
  jhmc: { title: '计划名称', order: 2, view: 'text', type: 'string', },
  zdbm: { title: '制定部门', order: 3, view: 'text', type: 'string', },
  jclb: { title: '检查类别', order: 4, view: 'text', type: 'string', },
  jcfs: { title: '检查方式', order: 5, view: 'text', type: 'string', },
  jcrqStart: { title: '检查开始日期', order: 6, view: 'date', type: 'string', },
  jcrqEnd: { title: '检查结束日期', order: 7, view: 'date', type: 'string', },
  jccs: { title: '检查次数', order: 8, view: 'number', type: 'number', },
  gzmb: { title: '工作目标', order: 9, view: 'text', type: 'string', },
  jczd: { title: '检查重点', order: 10, view: 'text', type: 'string', },
  jsdw: { title: '接收单位', order: 11, view: 'text', type: 'string', },
  zt: { title: '状态', order: 12, view: 'text', type: 'string', },
  fj: { title: '附件', order: 13, view: 'text', type: 'string', },
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}