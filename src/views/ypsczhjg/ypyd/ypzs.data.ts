import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [{
  title: '药品生产批号',
  dataIndex: 'scph'
}, {
  title: '药品生产日期',
  dataIndex: 'scrq'

}, {
  title: '药品有效期截至日期',
  dataIndex: 'jzrq'
}, {
  title: '药品生产数量',
  dataIndex: 'scsl'

}];

export const searchFormSchema: FormSchema[] = [
  {
    label: '监管编号',
    field: 'bt',
    component: 'Input'
  },
  {
    label: '监管任务编号',
    field: 'scsj',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '监管编号',
    field: 'bt',
    component: 'Input',
  },
  {
    label: '监管任务编号',
    field: 'scsj',
    component: 'Input',
  },

];
