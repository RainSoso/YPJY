import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '计划年份',
    align: "center",
    dataIndex: 'jhYear',
    width: '80px'
  },
  // {
  //   title: '计划表名',
  //   align: "center",
  //   dataIndex: 'jhTitle_dictText',
  //   width: '320px'
  // },
  // {
  //   title: '生产企业',
  //   align: "center",
  //   dataIndex: 'qymc',
  //   width: '220px'
  // },
  {
    title: '产品名称',
    align: "center",
    dataIndex: 'scypmc',
    width: '120px'
  },
  {
    title: '规格',
    align: "center",
    dataIndex: 'ypgg',
    width: '100px'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'dw',
    width: '80px'
  },
  {
    title: '原料名称',
    align: "center",
    dataIndex: 'xyylymc',
    width: '120px'
  },
  {
    title: '申报状态',
    align: "center",
    dataIndex: 'sbState_dictText',
    width: '120px'
  },
  {
    title: '申报周期状态',
    align: "center",
    dataIndex: 'sbzqlx',
    width: '110px'
  },
  // {
  //   title: '申报生产计划',
  //   children: [
  //     {
  //       title: '企业申报',
  //       children: [
  //         {
  //           title: '年度申报',
  //           align: "center",
  //           dataIndex: 'qyJhscl',
  //           width: '80px'
  //         },
  //       ]
  //     },
  //     {
  //       title: '省局申报',
  //       children: [
  //         {
  //           title: '年度申报',
  //           align: "center",
  //           dataIndex: 'sjJhscl',
  //           width: '80px'
  //         },
  //       ]
  //     },
  //   ]
  // },

  // {
  //   title: '国家计划',
  //   children: [
  //     {
  //       title: '年度计划',
  //       align: "center",
  //       dataIndex: 'gjJhscl',
  //       width: '80px'
  //     },
  //     {
  //       title: '原料供应',
  //       children: [
  //         {
  //           title: '用量(公斤)',
  //           align: "center",
  //           dataIndex: 'qyXyylyjhsyl',
  //           width: '90px'
  //         },
  //         {
  //           title: '供应单位',
  //           align: "center",
  //           dataIndex: 'gydwmc',
  //           width: '120px'
  //         },
  //       ]
  //     },
  //   ]
  // },

  // {
  //   title: '备注',
  //   align: "center",
  //   dataIndex: 'remark',
  //   width: '150px'
  // },

  // {
  //   title: '企业完成情况',
  //   children: [
  //     {
  //       title: '1-5月',
  //       align: "center",
  //       dataIndex: 'sjscl1',
  //       width: '80px'
  //     },
  //     {
  //       title: '6-9月',
  //       align: "center",
  //       dataIndex: 'sjscl2',
  //       width: '80px'
  //     },
  //     {
  //       title: '10-12月',
  //       align: "center",
  //       dataIndex: 'sjscl3',
  //       width: '80px'
  //     },
  //   ]
  // },
  // {
  //   title: '企业需用情况',
  //   children: [
  //     {
  //       title: '1-5月',
  //       align: "center",
  //       dataIndex: 'XYYLYSJSYL1',
  //       width: '80px'
  //     },
  //     {
  //       title: '6-9月',
  //       align: "center",
  //       dataIndex: 'XYYLYSJSYL2',
  //       width: '80px'
  //     },
  //     {
  //       title: '10-12月',
  //       align: "center",
  //       dataIndex: 'XYYLYSJSYL3',
  //       width: '80px'
  //     },
  //   ]
  // },
];

//查询数据
export function getSearchFormSchema(): FormSchema[] {
  return [
    // {
    //   label: "申报状态",
    //   field: 'sbState',
    //   component: 'JDictSelectTag',
    //   componentProps: { dictCode: 'tysc_sbState', showChooseOption: false }
    //   , colProps: { xxl: { span: 4 } },
    // },
    {
      label: "计划表名",
      field: 'jhTitle',
      component: 'JDictSelectTag',
      componentProps: { dictCode: 'tysc_title', showChooseOption: false }
      , colProps: { xxl: { span: 12 } },
    },
    

  ];
}

//表单数据
export const formSchema: FormSchema[] = [
  {
    label: '计划年份',
    field: 'jhYear',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { required: true, message: '请输入计划年份!' },
      ];
    },
  },
  {
    label: '药品生产许可证编号',
    field: 'ypscxkzbh',
    component: 'Input',
  },
  {
    label: '管制类别',
    field: 'gzlb',
    component: 'Input',
  },
  {
    label: '生产药品名称',
    field: 'scypmc',
    component: 'Input',
  },
  {
    label: '药品规格',
    field: 'ypgg',
    component: 'Input',
  },
  {
    label: '生产药品批准文号（备案号）',
    field: 'scyppzwh',
    component: 'Input',
  },
  {
    label: '企业计划生产量',
    field: 'qyJhscl',
    component: 'Input',
  },
  {
    label: '企业追加计划生产量',
    field: 'qyJhsclZj',
    component: 'Input',
  },
  {
    label: '省局计划生产量',
    field: 'sjJhscl',
    component: 'Input',
  },
  {
    label: '省局追加计划生产量',
    field: 'sjJhsclZj',
    component: 'Input',
  },
  {
    label: '国家计划生产量',
    field: 'gjJhscl',
    component: 'Input',
  },
  {
    label: '国家追加计划生产量',
    field: 'gjJhsclZj',
    component: 'Input',
  },
  {
    label: '实际生产量1-5月',
    field: 'sjscl1',
    component: 'Input',
  },
  {
    label: '实际生产量1-9月',
    field: 'sjscl2',
    component: 'Input',
  },
  {
    label: '实际生产量1-12月',
    field: 'sjscl3',
    component: 'Input',
  },
  {
    label: '需用原料药名称',
    field: 'xyylymc',
    component: 'Input',
  },
  {
    label: '需用原料药批准文号（备案号）',
    field: 'xyylypzwh',
    component: 'Input',
  },
  {
    label: '企业需用原料药计划使用量',
    field: 'qyXyylyjhsyl',
    component: 'Input',
  },
  {
    label: '企业需用原料药追加计划使用量',
    field: 'qyXyylyjhsylZj',
    component: 'Input',
  },
  {
    label: '省局需用原料药计划使用量',
    field: 'sjXyylyjhsyl',
    component: 'Input',
  },
  {
    label: '省局需用原料药追加计划使用量',
    field: 'sjXyylyjhsylZj',
    component: 'Input',
  },
  {
    label: '国家需用原料药计划使用量',
    field: 'gjXyylyjhsyl',
    component: 'Input',
  },
  {
    label: '国家需用原料药追加计划使用量',
    field: 'gjXyylyjhsylZj',
    component: 'Input',
  },
  {
    label: '需用原料药实际使用量1-5月',
    field: 'xyylysjsyl1',
    component: 'Input',
  },
  {
    label: '需用原料药实际使用量1-9月',
    field: 'xyylysjsyl2',
    component: 'Input',
  },
  {
    label: '需用原料药实际使用量1-12月',
    field: 'xyylysjsyl3',
    component: 'Input',
  },
  {
    label: '需用原料药库存',
    field: 'xyylykc',
    component: 'Input',
  },
  {
    label: '供应单位',
    field: 'gydwmc',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '追加原料药供应单位',
    field: 'gydwmcZj',
    component: 'Input',
  },
  // {
  //   label: '申报状态（10：企业申报；20省局审核；30国家下达；40省局批复；50企业执行）',
  //   field: 'sbState',
  //   component: 'Input',
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
