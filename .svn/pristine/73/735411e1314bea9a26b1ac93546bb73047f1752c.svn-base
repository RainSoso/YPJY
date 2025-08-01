import {h} from 'vue';
import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';
import attachNumber from '../components/attachNumber.vue';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';

export const columns: BasicColumn[] = [
    {
    title: '药品信息id',
    dataIndex: 'durgBasicInfoId',
    defaultHidden:true,
   },
   {
    title: '药品通用名称',
    dataIndex: 'drugName',
   },
   {
    title: '规格',
    dataIndex: 'gg',
    width:200,
   },
   {
    title: '项目',
    dataIndex: 'project',
   },
   {
    title: '是否有内容',
    dataIndex: 'sfwnr_dictText',
    width:120,
   },
   {
    title: '事项',
    dataIndex: 'sx',
    width:200,
   },
   {
    title: '完成情况',
    dataIndex: 'wcqk',
    defaultHidden:true,
   },
   {
    title: '批准时间',
    dataIndex: 'pzsj',
    defaultHidden:true,
   },
   {
    title: '药品补充批件编号',
    dataIndex: 'ypbcpjbh',
    defaultHidden:true,
   },
   {
    title: '持续稳定性考察结论或阶段性考察结论',
    dataIndex: 'cxxkcjlhjdxkcjl',
    defaultHidden:true,
   },
   {
    title: '备案公示时间',
    dataIndex: 'bagssj',
    defaultHidden:true,
   },
   {
    title: '备案号',
    dataIndex: 'bah',
    defaultHidden:true,
   },
   {
    title: '是否按照相关指导原则的技术要求完成研究',
    dataIndex: 'sfazxgzdyz',
    defaultHidden:true,
   },
   {
    title: '理由',
    dataIndex: 'smly',
    defaultHidden:true,
   },
   {
    title: '附件数量',
    dataIndex: 'fjsl',
    width:120, customRender: ({record}) => {
      return h(attachNumber, {fileId: record.id, type: record.project});
    },
   },
   {
    title: '附件',
    dataIndex: 'enclosure',
    defaultHidden:true,
   },
];

export const wpzcolumns: BasicColumn[] = [
  {
  title: '药品信息id',
  dataIndex: 'durgBasicInfoId',
  defaultHidden:true,
 },
 {
  title: '项目',
  dataIndex: 'project_dictText'
 },
 {
  title: '是否有内容',
  dataIndex: 'sfwnr',
  width:185, customRender: ({ text }) => columnRender('SFBZ-1', text)
 },
 {
  title: '附件数量',
  dataIndex: 'fjsl', width: 150, customRender: ({record}) => {
    return h(attachNumber, {fileId: record.id, type: filterDictTextByCache('ndbgYppzProject',record.project)});
  }
 },
 {
  title: '附件',
  dataIndex: 'enclosure',
  defaultHidden:true,
 },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '药品信息id',
    field: 'durgBasicInfoId',
    component: 'Input'
  },
 {
    label: '规格',
    field: 'gg',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '药品信息id',
    field: 'durgBasicInfoId',
    component: 'Input',
    show:false,
  },
  {
    label: '药品批准文号/注册证号',
    field: 'drugApproveNo',
    component: 'Input',
    dynamicDisabled:true,
  },
  {
    label: '药品通用名称',
    field: 'drugName',
    component: 'Input',
    dynamicDisabled:true,
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入规格!'
      },
    ],
  },
  {
    label: '项目',
    field: 'project',
    component: 'JDictSelectTag',
    defaultValue:'01',
    componentProps: {
      dictCode: 'ndbgBgxm',
      placeholder: '项目',
    },
  },
  {
    label: '有无继续完成的工作/是否有内容',
    labelWidth:250,
    field: 'sfwnr',
    component: 'JDictSelectTag',
    defaultValue:'1',
    componentProps: {
      dictCode: 'SFBZ-1',
      type: 'radioButton',
    },
    rules: [
      {
        required: true,
        message: '请输入是否!'
      },
    ],
  },
  {
    label: '事项',
    field: 'sx',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  //   rules: [
  //     {
  //       required: true,
  //       validator: async (rule, value) => {
  //       console.log(rule);
  //       if (value.sfwnr==='1') {
  //           return Promise.reject('请填写事项');
  //           } 
  //             return Promise.resolve();
  //       },
  //         trigger: 'change',
  //     },
  // ],
  },
  {
    label: '完成情况',
    field: 'wcqk',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ndbgBgwcqk',
      type: 'radioButton',
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '批准时间',
    field: 'pzsj',
    component: 'DatePicker',
    show: ({ model }) => {
      return model.project === '02';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '药品补充批件编号',
    field: 'ypbcpjbh',
    component: 'Input',
    show: ({ model }) => {
      return model.project === '02';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '持续稳定性考察结论或阶段性考察结论',
    labelWidth:250,
    field: 'cxxkcjlhjdxkcjl',  
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'ndbgKcJ',
      type: 'radioButton',
    },
    show: ({ model }) => {
      return model.project === '02';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '备案公示时间',
    field: 'bagssj',
    component: 'DatePicker',
    show: ({ model }) => {
      return model.project === '03';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '备案号',
    field: 'bah',
    component: 'Input',
    show: ({ model }) => {
      return model.project === '03';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '是否按照相关指导原则的技术要求完成研究',
    labelWidth:280,
    field: 'sfazxgzdyz',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'SFBZ-1',
      type: 'radioButton',
    },
    show: ({ model }) => {
      return model.project === '04';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '如否，说明理由',
    field: 'smly',
    component: 'Input',
    show: ({ model }) => {
      return model.project === '04';
    },
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
  {
    label: '附件',
    field: 'enclosure',
    component: 'JUpload',
    helpMessage: '只能上传一个附件',
    dynamicDisabled: ({ values }) => {
      return values.sfwnr === '0';
    }, 
  },
];
