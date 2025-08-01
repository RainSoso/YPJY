import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { disconnect } from 'process';

export const columns: BasicColumn[] = [{
  title: '标题', dataIndex: 'title', align: 'left'
}, {
  title: '文号', dataIndex: 'wh', width: 220, defaultHidden: true
}, {
  title: '发布时间', dataIndex: 'releaseTime', format: 'date|YYYY-MM-DD', width: 100
}];

export const searchFormSchema: FormSchema[] = [{
  label: '标题',
  field: 'title',
  component: 'JInput'
}, {
  label: '文号',
  field: 'wh',
  component: 'JInput'
},
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '标题',
    field: 'title',
    component: 'Input',
    colProps: {
      offset: 1,
      pull: 1,
      span: 24,
    },
    rules: [
      {
        required: true,
        message: '请输入标题!'
      },
    ],
  }, {
    label: '药品',
    field: 'mainCategory',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'zskFlfgypFgfl',
      mode: 'tags',
      placeholder: '药品',
      getPopupContainer: () => document.body,
    },
    rules: [
      {
        required: true,
        message: '请选择大类!',
        type: 'array',
      },
    ],
    colProps: {
      span: 9,
    },
  }, {
    label: '分类',
    field: 'category',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'zskFlfgCategory',
      placeholder: '分类',
      getPopupContainer: () => document.body,
    },
    rules: [
      {
        required: true,
        message: '请选择分类!'
      },
    ],
    colProps: {
      span: 9,
    },
  }, {
    label: '来源',
    field: 'ly',
    component: 'Input',
    defaultValue: 'https://',
    colProps: {
      offset: 1,
      pull: 1,
      span: 24,
    },
  },
  {
    label: '文号',
    field: 'wh',
    component: 'Input',
  }, {
    label: '发布时间',
    field: 'releaseTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
    },
    colProps: {
      span: 9,
    },
    // colProps: {
    //  span:12,
    //  flex:9,
    // },
  }, {
    label: '排序号',
    field: 'sort',
    component: 'Input',
    defaultValue: '99',
    colProps: {
      span: 9,
    },
    //   colProps: {
    //   offset:1,
    //   pull:3,
    //   span:24,
    // },
  }, {
    field: 'fj',
    component: 'JUpload',
    helpMessage: '最多上传1个附件',
    label: '附件（1）',
    componentProps: { maxCount: 1, bizPath: 'zsk' },
  },
];
