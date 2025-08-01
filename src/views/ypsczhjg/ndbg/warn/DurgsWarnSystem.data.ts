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
    title: '项目',
    dataIndex: 'project_dictText'
   },
   {
    title: '是否有内容', dataIndex: 'isContent_dictText', customRender: ({ text, record }) => {
      return record.project == 1 ? '是' :  columnRender('SFBZ-1', record.isContent);
    }
   },
   {
    title: '是否委托开展药物警戒活动', dataIndex: 'isContent', customRender: ({ text, record }) => {
      return record.project == 1 ? columnRender('SFBZ-1', text) : '';
    }
   },
   {
    title: '附件数量',
    dataIndex: 'fjsl', customRender: ({record}) => {
      return h(attachNumber, {fileId: record.id, type: filterDictTextByCache('ndbgYwjjProject',record.project)});
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
    label: '项目',
    field: 'project',
    component: 'Input'
  },
 {
    label: '是否有内容',
    field: 'isContent',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '项目',
    field: 'project',
    component: 'Input',
  },
  {
    label: '是否有内容',
    field: 'isContent',
    component: 'Input',
  },
  {
    label: '附件',
    field: 'enclosure',
    component: 'Input',
  },
];
