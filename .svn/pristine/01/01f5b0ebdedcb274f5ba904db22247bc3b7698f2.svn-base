import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
//列表数据
export const columns: BasicColumn[] = [
  //  {
  //   title: '事项ID',
  //   align:"center",
  //   dataIndex: 'eventId'
  //  },
  {
    title: '事项标题',
    align: "center",
    dataIndex: 'cpEvent.title'
  },
  //  {
  //   title: '主办机构编号',
  //   align:"center",
  //   dataIndex: 'orgCode'
  //  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'optType_dictText'
  },
  {
    title: '主办机构名称',
    align: "center",
    dataIndex: 'orgName'
  },
  {
    title: '主办人姓名',
    align: "center",
    dataIndex: 'assigneeName'
  },
  {
    title: '签收时间',
    align: "center",
    dataIndex: 'signDate',
    customRender: ({ text }) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
  },
  {
    title: '办结时间',
    align: "center",
    dataIndex: 'finishDate',
    customRender: ({ text }) => {
      return !text ? "" : (text.length > 10 ? text.substr(0, 10) : text)
    },
  },

  {
    title: '办理意见',
    align: "center",
    dataIndex: 'comment'
  },
];
//查询数据
export function getSearchFormSchema(): FormSchema[] {
  return [
    // {
    //   label: "标题",
    //   field: 'title',
    //   component: 'Input',
    //   colProps: { span: 6 },
    // },
    // {
    //   label: "分类",
    //   field: 'category',
    //   component: 'JDictSelectTag',
    //   componentProps: { dictCode: 'xtcz_category', showChooseOption: false }
    //   , colProps: { xxl: { span: 4 } },
    // },

    {
      label: "状态",
      field: 'optType',
      component: 'JDictSelectTag',
      defaultValue:"40",
      componentProps: { dictCode: 'xtcz_task_state', showChooseOption: false }, 
      colProps: { xxl: { span: 4 } },
    },
  ]
};
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '事项ID',
    field: 'eventId',
    component: 'InputNumber',
  },
  {
    label: '主办机构编号',
    field: 'orgCode',
    component: 'Input',
  },
  {
    label: '主办机构名称',
    field: 'orgName',
    component: 'Input',
  },
  {
    label: '主办人',
    field: 'assignee',
    component: 'InputNumber',
  },
  {
    label: '主办人姓名',
    field: 'assigneeName',
    component: 'Input',
  },
  {
    label: '主办企业统一社会信用代码',
    field: 'entShxydm',
    component: 'Input',
  },
  {
    label: '主办企业名称',
    field: 'entName',
    component: 'Input',
  },
  {
    label: '签收时间',
    field: 'signDate',
    component: 'DatePicker',
  },
  {
    label: '签收人',
    field: 'signBy',
    component: 'Input',
  },
  {
    label: '办结时间',
    field: 'finishDate',
    component: 'DatePicker',
  },
  {
    label: '办理人',
    field: 'finishBy',
    component: 'Input',
  },
  {
    label: '操作类型，0待签收1待办2办结3转办9退回',
    field: 'optType',
    component: 'InputNumber',
  },
  {
    label: '办理意见，退回必填',
    field: 'comment',
    component: 'Input',
  },
  {
    label: '是否发生改变',
    field: 'isChange',
    component: 'Input',
  },
  {
    label: '线性办理字符串',
    field: 'links',
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



/**
* 流程表单调用这个方法获取formSchema
* @param param
*/
export function getBpmFormSchema(_formData): FormSchema[] {
  // 默认和原始表单保持一致 如果流程中配置了权限数据，这里需要单独处理formSchema
  return formSchema;
}