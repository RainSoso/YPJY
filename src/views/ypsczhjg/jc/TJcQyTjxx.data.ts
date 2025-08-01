import { ref, computed } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import Tools from '/@/utils/tools';

const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));
const qysczslx=ref([])

export const columns: BasicColumn[] = [{
  title: '统一社会信用代码', dataIndex: 'shxydm', width: 200, sorter: true, defaultHidden: true
}, {
  title: '企业名称', dataIndex: 'qymc', width: 300,slots:{ customRender: 'qymc' } ,sorter: true
}, {
  title: '所属地市', dataIndex: 'xzqhdm', format: 'areaCode', width: 110, sorter: true
}, {
  title: '药品品种/在产数量', dataIndex: 'yppz', width: 130, slots: { customRender: 'yppz' }, sorter: true
}, {
  title: '监督检查', dataIndex: 'rcjg', width: 70, slots: { customRender: 'rcjg' }
}, {
  title: '稽查执法', dataIndex: 'zfcf', width: 70, sorter: true, slots: { customRender: 'zfcf' }
}, {
  title: '抽检总数/不合格数量', dataIndex: 'cy', width: 130, slots: { customRender: 'cy' }
}, {
  title: '信用评级', dataIndex: 'xypj', width: 70, sorter: true
}];

export function getSearchFormSchema(year: any, qylx?): FormSchema[] {
  if (year) currentYear.value = parseInt(year);
  return [{
    label: '', field: 'tags', component: 'Input', show: false
  }, {
    label: '年份', field: 'year', component: 'Select', componentProps: { options: yearArray, onChange(v) { currentYear.value = v; } }
    , colProps: { xxl: { span: 4 } }, defaultValue: year || Tools.getCurrentYear()
  }, {
    label: '所属地市', field: 'xzqhdm',
    component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }
    , colProps: { xxl: { span: 4 } }
  }, {
    label: '企业类别', field: 'ypscqylx',
    component: 'JDictSelectTag', componentProps: { dictCode: 'YPSCQYLX-1' }
    , colProps: { xxl: { span: 5 } }
  }, {
    label: '企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '社会信用代码', labelWidth: 110, field: 'shxydm', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '剂型', field: 'jx', component: 'JInput', colProps: { xxl: { span: 5 } }
  },
  // {
  //   label: '证书类型', field: 'qysczslx', component: 'JSelectMultiple', componentProps:{ options:[{ label:"自产(A类)", value:'A' },{label:"委托(B类)",value:'B'},{label:"受托(C类)",value:'C'}, {label:"原料药(D类)", value:'D'}],onChange(v){ qysczslx.value = v;} },colProps: { xxl: { span: 8 }}
  // }, 
  {
    label: '企业类型', field: 'qylx', component: 'Select', componentProps: {
      options: [{
        label: '纯A类自行生产', value: '*A'
      }, {
        label: '含A类自行生产', value: 'A'
      }, {
        label: '纯B类委托生产', value: '*B'
      }, {
        label: '含B类委托生产', value: 'B'
      }, {
        label: '纯C类受托生产', value: '*C'
      }, {
        label: '含C类受托生产', value: 'C'
      }, {
        label: '纯D类原料药生产', value: '*D'
      }, {
        label: '含D类原料药生产', value: 'D'
      }, {
        label: '纯BD类委托和原料药生产', value: '*BD'
      }]
    }, colProps: { xxl: { span: 5 } }, defaultValue: qylx
  },{
    label: '是否停产', field: 'sczk', component: 'Select', componentProps: {
      options: [{ label: '是', value: '0' }, { label: '否', value: '1' }]
    }, colProps: { xxl: { span: 4 } }
  },{
    label: '生产范围', field: 'scfw', component: 'Input', colProps: { xxl: { span: 4 } }
  }];
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
