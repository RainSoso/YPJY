import { ref, computed } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import Tools from '/@/utils/tools';
const currentYear = ref(Tools.getCurrentYear() - 1);
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));

export const columns: BasicColumn[] = [{
  title: '药品持有人名称', dataIndex: 'cyrmc', sorter: true
}, {
  title: '签约人数', dataIndex: 'qyrs', width: 150, sorter: true
}, {
  title: '备案人数', dataIndex: 'bars', width: 150, sorter: true
}, {
  title: '管理工作负责人', dataIndex: 'glfzr', width: 150, sorter: true
}, {
  title: '联系电话', dataIndex: 'lxdh', width: 150, sorter: true
}];

export function getSearchFormSchema(route: RouteLocationNormalizedLoaded | null = null,year: number | string | null = null): FormSchema[] {
  return [{
    label: '', field: 'sftx', component: 'Input', show: false,
  }, {
    label: '年度', field: 'year', component: 'Select', componentProps: { options: yearArray, onChange(v) { currentYear.value = v; } }
    , colProps: { xxl: { span: 4 } }, defaultValue: year || (Tools.getCurrentYear() - 1)
  },{
    label: '企业类型', field: 'zslx', component: 'Select', componentProps: { options: [{ label: '药品上市许可持有人', value: '201010' }, { label: '药品生产企业', value: '6' }] }, colProps: { xxl: { span: 5 } },
    defaultValue: route?.query?.zslx
  }, {
    label: '所属地市', field: 'xzqhdm', component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }, colProps: { xxl: { span: 4 } },
    defaultValue: route?.query?.xzqhdm
  }, {
    label: '药品持有人名称', labelWidth: 110, field: 'cyrmc', component: 'JInput',colProps: { xxl: { span: 5 } }
  }];
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
];
