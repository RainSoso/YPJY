import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '公告编号',
    dataIndex: 'ggbh'
   },
   {
    title: '公告人',
    dataIndex: 'ggr'
   },
   {
    title: '公告时间',
    dataIndex: 'ggsj'
   },
   {
    title: '公告网站地址',
    dataIndex: 'ggwzdz'
   }
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '公告编号',
    field: 'ggbh',
    component: 'Input'
  },
 {
    label: '公告时间',
    field: 'ggsjRange',
    component: 'RangePicker',
    rangeFields: ['begin', 'end']
  },
];

export const formSchema: FormSchema[] = [{
  label: '', field: 'id', component: 'Input', show: false
}, {
  label: '委托报告外键', field: 'wtbgId', component: 'Input', show: false
}, {
  label: '公告编号', field: 'ggbh', component: 'Input', required: true, colProps: { span: 16 }
}, {
  label: '公告时间', field: 'ggsj', component: 'DatePicker', required: true,
  componentProps: { showTime: true, valueFormat: 'YYYY-MM-DD hh:mm:ss' },
  colProps: { span: 8 }
}, {
  label: '公告网站地址', field: 'ggwzdz', component: 'Input', colProps: { span: 16 }
}, {
  label: '公告人', field: 'ggr', component: 'Input', colProps: { span: 8 }
},
{
  label: '附件', field: 'file', component: 'JUpload', componentProps: { bizPath: 'wtbg', maxCount: 1 }
}];
