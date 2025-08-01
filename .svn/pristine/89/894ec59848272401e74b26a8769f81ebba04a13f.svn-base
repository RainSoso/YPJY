import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import Tools from '/@/utils/tools';
import { ref, computed } from 'vue';

const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));
const currentYear = ref(Tools.getCurrentYear());
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '计划年份',
    align: "center",
    dataIndex: 'jhYear',
    width: '80px'
  },
  // {
  //   title: '管制类别',
  //   align: "center",
  //   dataIndex: 'gzlb_dictText',
  //   width: '150px'
  // },
  {
    title: '计划表名',
    align: "center",
    dataIndex: 'jhTitle_dictText',
    width: '300px'
  },
  {
    title: '生产药品名称',
    align: "center",
    dataIndex: 'scypmc',
    width: '180px'
  },
  {
    title: '药品规格',
    align: "center",
    dataIndex: 'ypgg',
    width: '150px'
  },
  {
    title: '单位',
    align: "center",
    dataIndex: 'dw',
    width: '80px'
  },
  {
    title: '需用原料药名称',
    align: "center",
    dataIndex: 'xyylymc',
    width: '180px'
  },
  {
    title:'计划',
    children:[
      {
        title: '企业计划生产量',
        align: "center",
        dataIndex: 'qyJhscl',
        width: '120px'
      },     
      {
        title: '原料药计划需用量',
        align: "center",
        dataIndex: 'qyXyylyjhsyl',
        width: '120px'
      },
      {
        title: '供应单位',
        align: "center",
        dataIndex: 'gydwmc',
        width: '120px'
      },
      {
        title: '备注',
        align: "center",
        dataIndex: 'remark',
        width: '300px'
      },
    ]
  },
  // {
  //   title:'追加计划',
  //   children:[
  //     {
  //       title: '企业追加计划生产量',
  //       align: "center",
  //       dataIndex: 'qyJhsclZj',
  //       width: '120px'
  //     },
      
      
  //     {
  //       title: '原料药追加计划需用量',
  //       align: "center",
  //       dataIndex: 'qyXyylyjhsylZj',
  //       width: '120px'
  //     },
      
  //     {
  //       title: '追加原料药供应单位',
  //       align: "center",
  //       dataIndex: 'gydwmcZj',
  //       width: '120px'
  //     },
  //     {
  //       title: '追加备注',
  //       align: "center",
  //       dataIndex: 'remarkZj',
  //       width: '300px'
  //     },
  //   ]
  // },
  
  //  {
  //   title: '申报状态（10：企业申报；20省局审核；30国家下达；40省局批复；50企业执行）',
  //   align:"center",
  //   dataIndex: 'sbState'
  //  },
];
//查询数据
export function getSearchFormSchema(): FormSchema[] {
  return [
    {
      label: "计划年份",
      field: 'jhYear',
      component: 'Select',
      componentProps: { options: yearArray, onChange(v) { currentYear.value = v; } }
      , colProps: { xxl: { span: 4 } }, defaultValue: Tools.getCurrentYear()
    },
    // {
    //   label: "管制类别",
    //   field: 'gzlb',
    //   component: 'JDictSelectTag',
    //   componentProps: { dictCode: 'tysc_pzlx', showChooseOption: false }
    //   , colProps: { xxl: { span: 4 } },
    // },
    {
      label: "计划表名",
      field: 'jhTitle',
      component: 'JDictSelectTag',
      componentProps: { dictCode: 'tysc_title', showChooseOption: false }
      , colProps: { xxl: { span: 7 } },
    },
    {
      label: "生产药品名称",
      field: 'scypmc',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: "需用原料药名称",
      field: 'xyylymc',
      component: 'Input',
      colProps: { span: 6 },
    },
    {
      label: "供应单位",
      field: 'gydwmc',
      component: 'Input',
      colProps: { span: 6 },
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