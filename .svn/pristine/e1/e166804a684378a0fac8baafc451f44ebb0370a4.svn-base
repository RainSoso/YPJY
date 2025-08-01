import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';

export const columns: BasicColumn[] = [{
  title: '批准文号', dataIndex: 'pzwh', width: 170
}, {
  title: '原批准文号', dataIndex: 'ypzwh', defaultHidden: true
}, {
  title: '行政区划代码', dataIndex: 'xzqhdm', defaultHidden: true
}, {
  title: '社会信用代码', dataIndex: 'shxydm', defaultHidden: true
}, {
  title: '制剂名称', dataIndex: 'zjmc', width: 250
}, {
  title: '制剂名称汉语拼音', dataIndex: 'hypy', defaultHidden: true
}, {
  title: '制剂类别', dataIndex: 'zjlb', width: 100
}, {
  title: '剂型', dataIndex: 'jx', width: 180
}, {
  title: '规格', dataIndex: 'gg', defaultHidden: true
}, {
  title: '有效期', dataIndex: 'yxq', defaultHidden: true
}, {
  title: '制剂企业名称', dataIndex: 'qymc',
}, {
  title: '申请人制剂配制地址', dataIndex: 'scdz', defaultHidden: true
}, {
  title: '医疗机构制剂许可证编号', dataIndex: 'zsbh', defaultHidden: true
}, {
  title: '发证机关', dataIndex: 'fzjg', width: 170
}, {
  title: '发证日期', dataIndex: 'fzrq', format: 'date|YYYY-MM-DD', width: 100, defaultHidden: true
}, {
  title: '生产状况', dataIndex: 'sczk', width: 85, customRender: ({ text }) => columnRender('yppzSczk', text)
}, {
  title: '批准文号有效期', dataIndex: 'pzwhyxq', format: 'date|YYYY-MM-DD', width: 130, defaultHidden: true
}, {
  title: '备注', dataIndex: 'bz', defaultHidden: true
}];

export const searchFormSchema: FormSchema[] = [
  {
    label: '所属地市', field: 'newxzqhdm', component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }, colProps: { xxl: { span: 4 } }
  },
  {
    label: '批准文号',
    field: 'pzwh',
    component: 'JInput'
  },
  {
    label: '制剂名称',
    field: 'zjmc',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '批准文号',
    field: 'pzwh',
    component: 'Input',
  },
  {
    label: '原批准文号',
    field: 'ypzwh',
    component: 'Input',
  },
  {
    label: '行政区划代码',
    field: 'xzqhdm',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '制剂名称',
    field: 'zjmc',
    component: 'Input',
  },
  {
    label: '制剂名称汉语拼音',
    field: 'hypy',
    component: 'Input',
  },
  {
    label: '制剂类别',
    field: 'zjlb',
    component: 'Input',
  },
  {
    label: '剂型',
    field: 'jx',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'gg',
    component: 'Input',
  },
  {
    label: '有效期',
    field: 'yxq',
    component: 'Input',
  },
  {
    label: '批准文号有效期至',
    field: 'pzwhyxq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '申请人单位名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '申请人制剂配制地址',
    field: 'scdz',
    component: 'Input',
  },
  {
    label: '医疗机构制剂许可证编号',
    field: 'zsbh',
    component: 'Input',
  },
  {
    label: '发证日期',
    field: 'fzrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '发证机关',
    field: 'fzjg',
    component: 'Input',
  },
  {
    label: '生产状况',
    field: 'sczk',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'bz',
    component: 'Input',
  },
];
