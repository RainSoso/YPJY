import { ref, computed } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import Tools from '/@/utils/tools';

const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));

export const columns: BasicColumn[] = [{
  title: '统一社会信用代码', dataIndex: 'shxydm', width: 200, defaultHidden: true
}, {
  title: '企业名称', dataIndex: 'qymc', width: 300
}, {
  title: '所属地市', dataIndex: 'xzqhdm', format: 'areaCode', width: 110
}, {
  title: '制剂品种', dataIndex: 'zjpz', width: 130, slots: { customRender: 'zjpz' }
}, {
  title: '监督检查', dataIndex: 'rcjg', width: 70, slots: { customRender: 'rcjg' }
}, {
  title: '稽查执法', dataIndex: 'zfcf', width: 70, slots: { customRender: 'zfcf' }
}, {
  title: '抽检总数/不合格数量', dataIndex: 'cjy', width: 130, slots: { customRender: 'cjy' }
}, {
  title: '信用评级', dataIndex: 'xypj', width: 70
}];

export function getSearchFormSchema(year: any): FormSchema[] {
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
    label: '企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '社会信用代码', labelWidth: 110, field: 'shxydm', component: 'JInput', colProps: { xxl: { span: 5 } }
  }];
}
