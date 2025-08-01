import { ref, computed } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import Tools from '/@/utils/tools';

const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));
const qysczslx = ref([])
const pTags = ref('A04');
export const columns: BasicColumn[] = [{
  title: '统一社会信用代码', dataIndex: 'shxydm', width: 200, sorter: true, defaultHidden: true
}, {
  title: '企业名称', dataIndex: 'qymc', width: 300, slots: { customRender: 'qymc' }, sorter: true
}, {
  title: '所属地市', dataIndex: 'xzqhdm', format: 'areaCode',slots: { customRender: 'xzqhdm' }, width: 110, sorter: true
}, {
  title: '监督检查', dataIndex: 'rcjg', width: 70, slots: { customRender: 'rcjg' }
}, {
  title: '稽查执法', dataIndex: 'zfcf', width: 70, slots: { customRender: 'zfcf' }
}, {
  title: '抽检总数/不合格数量', dataIndex: 'cy', width: 130, slots: { customRender: 'cy' }
}, {
  title: '信用评级', dataIndex: 'xypj', slots: { customRender: 'xypj' },width: 70, sorter: true
}];

export function getSearchFormSchema(year: any, zslx?): FormSchema[] {
  if (year) currentYear.value = parseInt(year);
  if (zslx) pTags.value = zslx == '11' ? 'A06' : 'A05';
  return [{
    label: '年份', field: 'year', component: 'Select', componentProps: { options: yearArray, onChange(v) { currentYear.value = v; } }
    , colProps: { xxl: { span: 4 } }, defaultValue: year || Tools.getCurrentYear()
  }, {
    label: '所属区县',
    field: 'xzqhdm',
    component: 'JAreaSelect',
    componentProps: {
      level: 3, province: '420000', hideProvince: true,
    }
  }, {
    label: '企业名称', field: 'qymc', component: 'Input', colProps: { xxl: { span: 5 } }
  }, {
    field: 'tags',
    component: 'JCategorySelect',
    label: '企业标签',
    componentProps: {
      pcode: pTags.value,
      multiple: true,
      back: 'code'
    }
  },
  {
    field: 'cxfs',
    component: 'JDictSelectTag',
    label: '查询方式',
    // helpMessage: '企业是否同时满足标签属性',
    componentProps: {
      dictCode: 'ypjy_cxlb',
      type: 'select',
      showChooseOption: false
    }
  }, {
    label: '社会信用代码', labelWidth: 110, field: 'shxydm', component: 'Input', colProps: { xxl: { span: 5 } }
  }
  ];
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '统一社会信用代码',
    field: 'shxydm',
    component: 'Input',
    order: 'desc',
  },
  {
    label: '企业主键',
    field: 'qyid',
    component: 'Input',
  },
  {
    label: '许可',
    field: 'xk',
    component: 'InputNumber',
  },
  {
    label: '监督检查',
    field: 'rcjg',
    component: 'InputNumber',
  },
  {
    label: '执法处罚',
    field: 'zfcf',
    component: 'InputNumber',
  },
  {
    label: '抽样',
    field: 'cy',
    component: 'InputNumber',
  },
  {
    label: '检验',
    field: 'jy',
    component: 'InputNumber',
  },
  {
    label: '投诉举报',
    field: 'tsjb',
    component: 'InputNumber',
  },
  {
    label: '刷新标志(1:待刷新 0:已刷新)',
    field: 'fresh',
    component: 'Input',
  },
  {
    label: '品种',
    field: 'pz',
    component: 'InputNumber',
  },
  {
    label: 'total',
    field: 'total',
    component: 'InputNumber',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: 'shxydmzj',
    field: 'shxydmzj',
    component: 'Input',
  },
  {
    label: '企业类型',
    field: 'qylx',
    component: 'Input',
  },
  {
    label: 'jcjgdw',
    field: 'jcjgdw',
    component: 'Input',
  },
  {
    label: 'jgjgdwmc',
    field: 'jgjgdwmc',
    component: 'Input',
  },
  {
    label: 'zt',
    field: 'zt',
    component: 'Input',
  },
  {
    label: '行政区划代码',
    field: 'xzqhdm',
    component: 'Input',
  },
  {
    label: '企业状况',
    field: 'qyzk',
    component: 'Input',
  },
  {
    label: '应急审批',
    field: 'processflag',
    component: 'Input',
  },
  {
    label: '药品品种',
    field: 'yppz',
    component: 'InputNumber',
  },
  {
    label: '器械品种',
    field: 'qxpz',
    component: 'InputNumber',
  },
];
