import { ref, computed } from 'vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { simpleDebounce } from '/@/utils/common/compUtils';
import { getYppz } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.api';
import { getAllLevels } from './JcPzJcxx.api';
import Tools from '/@/utils/tools';
import { selectOptions } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.data';

const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));

export const columns: BasicColumn[] = [{
  title: '集采层级', dataIndex: 'levels', width: 130
}, {
  title: '中选时间', dataIndex: 'addDate', format: 'date|YYYY-MM-DD', width: 100
}, {
  title: '项目简称', dataIndex: 'proTitle'
}, {
  title: '批准文号', dataIndex: 'pzwh', defaultHidden: true, slots: { customRender: 'pzwh' }
}, {
  title: '品种名称', dataIndex: 'spmc', defaultHidden: true
}, {
  title: '通用名', dataIndex: 'tymc', defaultHidden: true
}, {
  title: '药品类别', dataIndex: 'ypfl', width: 80, defaultHidden: true
}, {
  title: '剂型', dataIndex: 'jx', defaultHidden: true
}, {
  title: '规格', dataIndex: 'ypgg', defaultHidden: true
}, {
  title: '药品上市许可持有人名称', dataIndex: 'cyrQymc', defaultHidden: true
}, {
  title: '药理分类', dataIndex: 'ylfl', defaultHidden: true
}, {
  title: '参与省份', dataIndex: 'cysf'
}];

export const recolumns: BasicColumn[] = [{
  title: '集采层级', dataIndex: 'levels', width: 130, sorter: true
}, {
  title: '中选时间', dataIndex: 'addDate', format: 'date|YYYY-MM-DD', width: 100, sorter: true
}, {
  title: '项目简称', dataIndex: 'proTitle', sorter: true
}, {
  title: '批准文号', dataIndex: 'pzwh', width: 170, sorter: true, slots: { customRender: 'pzwh' }
}, {
  title: '药品通用名', dataIndex: 'tymc', sorter: true
}, {
  title: '商品名', dataIndex: 'spmc', defaultHidden: true
}, {
  title: '药品类别', dataIndex: 'ypfl', width: 80, defaultHidden: true
}, {
  title: '剂型', dataIndex: 'jx', defaultHidden: true
}, {
  title: '规格', dataIndex: 'ypgg', defaultHidden: true
}, {
  title: '药品上市许可持有人', dataIndex: 'cyrQymc', sorter: true
},{
  title: '药品生产企业', dataIndex: 'scQymc', sorter: true
}, {
  title: '药理分类', dataIndex: 'ylfl', defaultHidden: true
}, {
  title: '参与省份', dataIndex: 'cysf'
}];
export function getSearchFormSchema(year: any): FormSchema[] {
  if (year) currentYear.value = parseInt(year);
  return [{
    label: '年份', field: 'year', component: 'Select', componentProps: { options: yearArray, onChange(v) { currentYear.value = v; } }
    , colProps: { xxl: { span: 5 } }, defaultValue: year || Tools.getCurrentYear()
  }, {
    label: '项目简称', field: 'proTitle', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '参与省份', field: 'cysf', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '药品上市许可持有人', labelWidth: 150, field: 'cyrQymc', component: 'JInput', colProps: { xxl: { span: 7 } }
  }, {
    label: '药品生产企业', labelWidth: 120, field: 'scQymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '品种名称', field: 'tymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '生产方式', field: 'scfs', component: 'Select', colProps: { xxl: { span: 5 } }, componentProps: { options: [{ label: '自产', value: 'A' }, { label: '委托', value: 'B' }] }
  }];
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  { label: '', field: 'year', component: 'Input', show: false },
  {
    label: '集采层级',
    field: 'levels',
    component: 'JSelectInput',
    componentProps: ({ formActionType }) => {
      getAllLevels().then((data) => {
        let options: any = [];
        data.forEach((item) => {
          options.push({ label: item, value: item })
        });
        formActionType.updateSchema({ field: 'levels', componentProps: { options } });
      });
      return {};
    },
    rules: [
      {
        required: true,
        message: '请选择集采层级!'
      },
    ],
    colProps: {
      span: 12,
    },
  },
  {
    label: '中选时间',
    field: 'addDate',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: {
      span: 12,
    },
  },
  {
    label: '项目简称',
    field: 'proTitle',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入项目简称!'
      },
    ],
  },
  {
    label: '批准文号',
    field: 'pzwh',
    component: 'MPopup',
    required: true,
    componentProps: ({ formModel }) => {
      return Tools.deepMerge({}, selectOptions, {
        onChange(value, options, selected) {
          if (selected) {
            let yppz = options[0]?.source || {};
            formModel.tymc = yppz?.yptymc || '';
            formModel.cyrmc = yppz?.cyrmc || yppz?.ypscqymc || '';
            formModel.ypfl = yppz?.ypfl || '';
            formModel.spmc = yppz?.ypspmc || '';
            formModel.jx = yppz?.jx || '';
            formModel.ypgg = yppz?.ypgg || '';
          }
        }
      });
    }
  },
  {
    label: '药品通用名',
    field: 'tymc',
    component: 'Input',
  },
  {
    label: '商品名',
    field: 'spmc',
    component: 'Input',
  },
  {
    label: '药品类别',
    field: 'ypfl',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'YPPZLX-1',
      placeholder: '药品类别',
      getPopupContainer: () => document.body,
    },
  },
  {
    label: '剂型',
    field: 'jx',
    component: 'Input',
  },
  {
    label: '规格',
    field: 'ypgg',
    component: 'Input',
  },
  {
    label: '上市许可持有人',
    field: 'cyrmc',
    component: 'Input',
    colProps: {
      span: 24,
    },
  },
  {
    label: '药理分类',
    field: 'ylfl',
    component: 'Input',
  },
  {
    label: '参与省份',
    field: 'cysf',
    component: 'Input',
  },
];
