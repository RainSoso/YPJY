import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';


const mockData: Recordable = {
  bt: '2022年李时珍医药集团有限公司药品年度报告',
  sjsj: '2022-12-31',
};

export const columns: BasicColumn[] = [
  {
    title: '年度',
    field: 'nd',
    dataIndex: 'nd',
  }, {
    title: '境内持有人',
    field: 'jncyr',
    dataIndex: 'jncyr',
  }, {
    title: '境内持有人(中文)',
    field: 'jncyrzw',
    dataIndex: 'jncyrzw',
  }, {
    title: '境内持有人(英文)',
    field: 'jncyryw',
    dataIndex: 'jncyryw',
  }, {
    title: '提交日期',
    field: 'tjsj',
    dataIndex: 'tjsj',
  }, {
    title: '状态',
    field: 'zt',
    dataIndex: 'zt',
  },
];

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
