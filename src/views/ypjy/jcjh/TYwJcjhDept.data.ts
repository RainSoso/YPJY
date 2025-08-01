import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
import { columnRender } from '/@/utils/dict/dictUtils';
import { h } from 'vue';
import { Tooltip } from 'ant-design-vue';
//列表数据
export const columns: BasicColumn[] = [

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
      return record.zt ? (record.zt == '0' ? '未完成' : '已完成') : '';
    }
  },
  {
    title: '创建日期',
    align: "center",
    sorter: true,
    dataIndex: 'createTime'
  },
  {
    title: '接受单位',
    align: "center",
    sorter: true,
    dataIndex: 'jsdw_dictText',
    
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
  {
    label: "部门",
    field: 'bm',
    component: 'Select',
    componentProps: {
      options: [
        { label: '武汉分局', value: '武汉分局' },
        { label: '襄阳分局', value: '襄阳分局' },
        { label: '宜昌分局', value: '宜昌分局' },
        { label: '鄂州分局', value: '鄂州分局' },
        { label: '咸宁分局', value: '咸宁分局' },
        { label: '孝感分局', value: '孝感分局' },
        { label: '荆门分局', value: '荆门分局' },
        { label: '恩施分局', value: '恩施分局' },
        { label: '黄石分局', value: '黄石分局' },
        { label: '荆州分局', value: '荆州分局' },
        { label: '十堰分局', value: '十堰分局' },
        { label: '黄冈分局', value: '黄冈分局' },
        { label: '随州分局', value: '随州分局' },
        { label: '汉江分局', value: '汉江分局' }
      ]
    }
  },
  {
    label: '时间',
    field: 'qsdate',
    component: 'RangePicker',
    rangeFields: ['begin', 'end']
  },
  
];
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '接收单位',
    field: 'jsdw',
    component: 'Input',
  },
  {
    label: '状态',
    field: 'zt',
    component: 'Input',
  },
  {
    label: '计划名称',
    field: 'jhmc',
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

//计划方案完成情况
export const ssjhColumns: BasicColumn[] = [

  {
    title: '计划名称',
    align: "center",
    dataIndex: 'jhmc'
  },
  {
    title: '接收单位',
    align: "center",
    dataIndex: 'jsdw_dictText'
  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'zt_dictText',
  },
  {
    title: '创建日期',
    align: "center",
    sorter: true,
    dataIndex: 'createTime'
  },
];
// 高级查询数据
export const superQuerySchema = {
  createTime: { title: '创建日期', order: 0, view: 'datetime', type: 'string', },
  jsdw: { title: '接收单位', order: 1, view: 'text', type: 'string', },
  zt: { title: '状态', order: 2, view: 'text', type: 'string', },
  jhmc: { title: '计划名称', order: 3, view: 'text', type: 'string', },
};

/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}