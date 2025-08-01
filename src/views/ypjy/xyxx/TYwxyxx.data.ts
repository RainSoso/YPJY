import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '社会信用代码',
    align: "center",
    dataIndex: 'shxydm'
  },
  {
    title: '主体名称',
    align: "center",
    dataIndex: 'qymc'
  },
  {
    title: '评价得分',
    align: "center",
    dataIndex: 'pjdf'
  },
  {
    title: '评价等级',
    align: "center",
    dataIndex: 'pjdj'
  },
];
//查询数据
export const searchFormSchema: FormSchema[] = [
  {
    label: "社会信用代码",
    field: 'shxydm',
    component: 'Input',
    //colProps: {span: 6},
  },
  {
    label: "主体名称",
    field: 'qymc',
    component: 'Input',
    //colProps: {span: 6},
  },
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '主体名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '评价得分',
    field: 'pjdf',
    component: 'InputNumber',
  },
  {
    label: '评价等级',
    field: 'pjdj',
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
  shxydm: { title: '社会信用代码', view: 'text', type: 'string', },
  qymc: { title: '主体名称', view: 'text', type: 'string', },
  pjdf: { title: '评价得分', view: 'number', type: 'number', },
  pjdj: { title: '评价等级', view: 'text', type: 'string', },
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}