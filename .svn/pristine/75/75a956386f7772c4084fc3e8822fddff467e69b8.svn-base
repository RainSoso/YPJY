import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import { columnRender } from '/@/utils/dict/dictUtils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '社会信用代码',
    align: "center",
    dataIndex: 'shxydm',
    width: '160px',
    ifShow: false
  },
  {
    title: '企业名称',
    align: "center",
    dataIndex: 'qymc',
    width: '200px'
  },
  {
    title: '经营范围',
    align: "center",
    dataIndex: 'jyfw',

  },
  // {
  //   title: '风险提示',
  //   align: "center",
  //   dataIndex: 'fxd',
  //   customRender: ({ text }) => columnRender('ypjy_fxd', text)
  // },
  {
    title: '计划检查方式',
    align: "center",
    dataIndex: 'jcqk'
  }
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "年度未检查",
    field: 'ndwjc',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ypjy_jcjh_ndwjc',
      type: 'select'
    }
  },
  {
    label: "社会信用代码",
    field: 'shxydm',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "企业名称",
    field: 'qymc',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    field: 'tags',
    component: 'JCategorySelect',
    label: '企业标签',
    componentProps: {
      pcode: 'A04',
      multiple: true,
      back: 'code'
    }
  },
  {
    field: 'cxfs',
    component: 'JDictSelectTag',
    label: '查询方式',
    helpMessage: '企业是否同时满足标签属性',
    componentProps: {
      dictCode: 'ypjy_cxlb',
      type: 'select'
    }
  }
];
//表单数据
export const formSchema: FormSchema[] = [
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
    label: '常规检查次数',
    field: 'cgjcNum',
    component: 'InputNumber',
  },
  {
    label: '常规检查月份',
    field: 'cgjcYf',
    component: 'Input',
  },
  {
    label: 'gsp检查次数',
    field: 'gspNum',
    component: 'InputNumber',
  },
  {
    label: 'gsp检查月份',
    field: 'gspYf',
    component: 'Input',
  },
  {
    label: '专项检查次数',
    field: 'zxjcNum',
    component: 'InputNumber',
  },
  {
    label: '专项检查月份',
    field: 'zxjcYf',
    component: 'Input',
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
  shxydm: { title: '社会信用代码', order: 0, view: 'text', type: 'string', },
  qymc: { title: '企业名称', order: 1, view: 'text', type: 'string', },
  cgjcNum: { title: '常规检查次数', order: 2, view: 'number', type: 'number', },
  cgjcYf: { title: '常规检查月份', order: 3, view: 'text', type: 'string', },
  gspNum: { title: 'gsp检查次数', order: 4, view: 'number', type: 'number', },
  gspYf: { title: 'gsp检查月份', order: 5, view: 'text', type: 'string', },
  zxjcNum: { title: '专项检查次数', order: 6, view: 'number', type: 'number', },
  zxjcYf: { title: '专项检查月份', order: 7, view: 'text', type: 'string', },
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}