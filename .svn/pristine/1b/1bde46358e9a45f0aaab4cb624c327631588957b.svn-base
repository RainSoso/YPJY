import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

//列表数据
export const columns: BasicColumn[] = [
  {
    title: '编号',
    align: "center",
    dataIndex: 'code',
    width: "180px"
  },
  {
    title: '事项标题',
    align: "center",
    dataIndex: 'title',
    width: "350px"
  },
  {
    title: '事项分类',
    align: "center",
    dataIndex: 'category_dictText',
    width: "100px"
  },

  //  {
  //   title: '主体内容',
  //   align:"center",
  //   dataIndex: 'content'
  //  },
  {
    title: '发起人',
    align: "center",
    dataIndex: 'leader',
    width: "80px"
  },
  //  {
  //   title: '附件',
  //   align:"center",
  //   dataIndex: 'attaches'
  //  },
  {
    title: '状态',
    align: "center",
    dataIndex: 'state_dictText',
    width: "90px"
  },
  //  {
  //   title: '截止时间',
  //   align:"center",
  //   dataIndex: 'closingDate',
  //   customRender:({text}) =>{
  //     return !text?"":(text.length>10?text.substr(0,10):text)
  //   },
  //   width:"100px"
  //  },
  //  {
  //   title: '办结时间',
  //   align:"center",
  //   dataIndex: 'finishDate',
  //   customRender:({text}) =>{
  //     return !text?"":(text.length>10?text.substr(0,10):text)
  //   },
  //   width:"100px"
  //  },
  //  {
  //   title: '备注',
  //   align:"center",
  //   dataIndex: 'remarks'
  //  },
  //  {
  //   title: '机构名称',
  //   align:"center",
  //   dataIndex: 'orgCodeTxt',
  //  },
  //  {
  //   title: '归档人',
  //   align:"center",
  //   dataIndex: 'archiveBy'
  //  },
  //  {
  //   title: '归档机构编号',
  //   align:"center",
  //   dataIndex: 'archiveOrgCode'
  // },
];
//查询数据
export function getSearchFormSchema(): FormSchema[] {
  return [
    {
      label: "标题",
      field: 'title',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: "状态",
      field: 'state',
      component: 'JDictSelectTag',
      defaultValue: "0",
      componentProps: { dictCode: 'xtcz_state', showChooseOption: false }
      , colProps: { xxl: { span: 4 } },
    },
  ]
};
//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '截止时间',
    field: 'closingDate',
    component: 'DatePicker',
    colProps: {
      span: 8,
    },
    rules: [
      {
        required: true,
        message: '请选择截止时间!'
      },
    ],
  },
  {
    label: '备注',
    field: 'remarks',
    component: 'InputTextArea',
  },
  {
    field: 'attaches',
    component: 'JUpload',
    helpMessage: '最多上传1个附件',
    label: '附件',
    componentProps: { maxCount: 1, bizPath: 'xtcz' },
  },
  // {
  //   field: 'qyTags',
  //   component: 'JCategorySelect',
  //   label: '企业标签',
  //   componentProps: {
  //       pcode: 'A02',
  //       multiple: true
  //   }
  // },

  // {
  //   label: '归档人',
  //   field: 'archiveBy',
  //   component: 'Input',
  //   colProps: {
  //     offset: 1,
  //     pull: 1,
  //     span:22,
  //   },
  // },
  // {
  //   label: '归档机构编号',
  //   field: 'archiveOrgCode',
  //   component: 'Input',
  //   colProps: {
  //     offset: 1,
  //     pull: 1,
  //     span:22,
  //   },
  // },
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