import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';
import { h } from 'vue';
import { Tooltip } from 'ant-design-vue';
export const columns: BasicColumn[] = [
    {
    title: '标题',
    dataIndex: 'title'
   },
   {
    title: '摘要',
    dataIndex: 'zy'
   },
   {
    title: '状态',
    dataIndex: 'zt',
    customRender: ({ text, record }) => h(Tooltip, {}, {
      default: () => columnRender('zxpx_zt', text)
    })
   },
  //  {
  //   title: '附件',
  //   dataIndex: 'fiele'
  //  },
   {
    title: '发布人',
    dataIndex: 'createBy'
   },
   {
    title: '创建时间',
    dataIndex: 'createTime'
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '标题',
    field: 'title',
    component: 'JInput'
  },
 {
    label: '状态',
    field: 'zt',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '标题',
    field: 'title',
    component: 'InputTextArea',
  },
  {
    label: '摘要',
    field: 'zy',
    component: 'InputTextArea',
  },
  // {
  //   label: '状态',
  //   field: 'zt',
  //   component: 'JDictSelectTag',
  //   componentProps: {
  //     dictCode: 'zxpx_zt',
  //     showChooseOption: false
  //   }
  // },
  {
    label: '附件',
    field: 'fiele',
    component: 'JUpload',
    componentProps: { bizPath: 'zxpx' },
  },
];

