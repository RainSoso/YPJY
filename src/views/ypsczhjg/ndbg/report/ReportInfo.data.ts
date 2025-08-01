import { ref, computed } from 'vue';
import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';
import { useUserStore } from '/@/store/modules/user';
import moment from 'moment';
import Tools from '/@/utils/tools';
var date = new Date()
let jyear = moment(date).subtract(1, "year").startOf("year").format("YYYY")
const userStore = useUserStore();

const currentYear = ref(Tools.getCurrentYear() - 1);
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));

export const columns: BasicColumn[] = [
    {
    title: '年度',
    dataIndex: 'year',
    width:120
   },
   {
    title: '状态', dataIndex: 'state', width: 80, customRender: ({ text }) => columnRender('ypscQynbState', text || '0')
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm',
    width:210
   },
   {
    title: '境内持有人',
    dataIndex: 'qymc'
   },
   {
    title: '填报人',
    dataIndex: 'user',
    defaultHidden:true,
   },
   {
    title: '联系方式',
    dataIndex: 'contactInfo',
    defaultHidden:true,
   },
   {
    title: '报告周期起',
    dataIndex: 'reportingCycleStart',
    defaultHidden:true,
   },
   {
    title: '报告周期止',
    dataIndex: 'reportingCycleEnd',
    defaultHidden:true,
   },
   {
    title: '批准人',
    dataIndex: 'approveUser',
    defaultHidden:true,
   },
   {
    title: '批准日期',
    dataIndex: 'approveTime',
    format:'date|YYYY-MM-DD',
    width:165,
   },
   {
    title: '质量管理概述',
    dataIndex: 'zlglgs',
    defaultHidden:true,
   },
   {
    title: '审核次数',
    dataIndex: 'shsl',
    width:110,
    slots: { customRender: 'shsl' }
   },
];

export const ckpzcolumns: BasicColumn[] = [
  {
  title: '境内持有人',
  dataIndex: 'jncyr',
  width:120
 },
 {
  title: '药品通用名称',
  dataIndex: 'yptymc',
  width:200
 },
 {
  title: '药品批准文号/注册证号/备案号',
  dataIndex: 'yppzwh',
  width:220
 },
 {
  title: '年度',
  dataIndex: 'year',
  width:80
 },
 {
  title: '生产状况',
  dataIndex: 'sczk',
  customRender: ({ text }) => columnRender('yppzSczk', text || '0'),
  width:100
 },
 {
  title: '出口情况',
  dataIndex: 'ckqk',
 },
];

export function getSearchFormSchema(year: number | string | null = null): FormSchema[] {
  return [{
    label: '', field: 'state', component: 'Input', show: false,
  }, {
    label: '所属地市', field: 'xzqhdm', component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }, colProps: { xxl: { span: 4 } }
  }, {
    label: '年度', field: 'year', component: 'Select', componentProps: { options: yearArray, onChange(v) { currentYear.value = v; } }
    , colProps: { xxl: { span: 4 } }, defaultValue: year || (Tools.getCurrentYear() - 1)
  }, {
    label: '境内持有人', labelWidth: 110, field: 'qymc', component: 'JInput'
  }];
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},

  {
    field: 'state',
    component: 'RadioButtonGroup',
    label: '审核结果',
    componentProps: {
      options: [{label:'退回补正',value:'2'}, {label:'确认且不允许修改',value:'3'}]
    },
    required: true
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
    show:false,
  },
  {
    label: '退回人id',
    field: 'returnUser',
    component: 'Input',
    defaultValue: userStore.getUserInfo.id,
    show:false,
  },
  {
    label: '退回原因',
    field: 'returnReason',
    component: 'InputTextArea',
    colProps: {
      span: 22,
    },
    componentProps: {
      placeholder: '请输入退回原因',
      rows: 6,
    },
    dynamicRules: ({ values }) => {
      return values.state =='2' ? [{ required: true, message: '请填写退回原因!' }] : [];
    },
},
{
    label: '联系人',
    field: 'lxr',
    component: 'Input',
    defaultValue: userStore.getUserInfo.realname,
    colProps: {
      span: 11,
   },
},
{
    label: '联系方式',
    field: 'lxfs',
    component: 'Input',
    colProps: {
      span: 11,
    },
},
{
    label: '退回时间',
    field: 'returnTime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
    show:false,
  }, 
];
