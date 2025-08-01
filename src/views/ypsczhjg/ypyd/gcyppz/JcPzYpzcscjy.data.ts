import { RouteLocationNormalizedLoaded } from 'vue-router';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JInputTypeEnum } from '/@/enums/jeecgEnum';
import { columnRender } from '/@/utils/dict/dictUtils';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { list } from './JcPzYpzcscjy.api';
import Tools from '/@/utils/tools';
import { Tooltip } from 'ant-design-vue';
import { h } from 'vue';

export function getColumns(showJcmx: boolean = false, showJnCjqk: boolean = false) {
  let array: BasicColumn[] = [{
    title: '药品批准文号', sorter: true, sortDirections: ['descend', 'ascend'], dataIndex: 'yppzwh', width: 150
  }, {
    title: '药品通用名', dataIndex: 'yptymc', sorter: true
  }, {
    title: '药品类型', sorter: true, dataIndex: 'ypfl',customRender: function (text) { return filterDictTextByCache("YPPZLX-1", text.text)}, width: 100
  }, {
    title: '剂型', sorter: true, dataIndex: 'bzjx', width: 100
  }, {
    title: '社会信用代码', dataIndex: 'shxydm', defaultHidden: true, sorter: true
  }, {
    title: '药品上市许可持有人', dataIndex: 'cyrmc', sorter: true
  }, {
    title: '生产企业', dataIndex: 'ypscqymc', sorter: true
  }, {
    title: '生产状况', dataIndex: 'sczk', width: 100, sorter: true, customRender: ({ text, record }) => h(Tooltip, {}, {
      title() {
        let res: { tc: Array<any>, zc: Array<any> } = { tc: [], zc: [] };
        (record.zcqk || '').split(',').forEach(item => {
          if (item.indexOf('在产') >= 0) res.zc.push(item.substring(0, item.indexOf('在产')));
          if (item.indexOf('停产') >= 0) res.tc.push(item.substring(0, item.indexOf('停产')));
        });
        return [...(0 < res.zc.length ? [h('div', {}, '在产： ' + res.zc.join('、'))] : []), ...(0 < res.tc.length ? [h('div', {}, '停产： ' + res.tc.join('、'))] : [])];
      },
      default: () => columnRender('yppzSczk', text)
    })
  }, {
    title: '销售数量(年报)', dataIndex: 'nbXssl', align: 'center', width: 140, sorter: true
  }, {
    title: '变更次数(年报)', dataIndex: 'nbBgcs', align: 'center', width: 140, sorter: true
  }, {
    title: '追溯状态', dataIndex: 'zszt', width: 100, sorter: true, customRender: ({ text, record }) => columnRender('yppzZszt', text, null, ({ item }) => {
      if (item.value === '1' || item.value === '2') {
        Tools.goToZsPreview(record.yppzwh, item.value);
      }
    })
  }, {
    title: '药品商品名', dataIndex: 'ypspmc', defaultHidden: true, sorter: true
  }, {
    title: '英文名称', dataIndex: 'yptymcyw', defaultHidden: true, sorter: true
  }, {
    title: '化学名称', dataIndex: 'yphxmc', defaultHidden: true, sorter: true
  }, {
    title: '拉丁名称', dataIndex: 'ypldxm', defaultHidden: true, sorter: true
  }, {
    title: '规格', dataIndex: 'ypgg', defaultHidden: true, sorter: true
  }, {
    title: '包装规格', dataIndex: 'bzgg', defaultHidden: true, sorter: true
  }, {
    title: '批准日期', dataIndex: 'pzrq', width: 110, format: 'date|YYYY-MM-DD', defaultHidden: true, sorter: true
  }, {
    title: '批准文号有效期', dataIndex: 'yppzwhyxq', width: 130, format: 'date|YYYY-MM-DD', defaultHidden: true, sorter: true
  }, {
    title: '原批准文号', dataIndex: 'ypypzwh', defaultHidden: true, sorter: true
  }, {
    title: '新药证书编号', dataIndex: 'xyzsbh', defaultHidden: true, sorter: true
  }, {
    title: '新药证书持有者', dataIndex: 'xyzscyzmc', defaultHidden: true, sorter: true
  }, {
    title: '生产地址', dataIndex: 'scdz', defaultHidden: true, sorter: true
  }, {
    title: '药品有效期', dataIndex: 'ypyxq', defaultHidden: true, sorter: true
  }, {
    title: '审批结论', dataIndex: 'ypspjl01', defaultHidden: true
  }, {
    title: '药品标准', dataIndex: 'ypbz', defaultHidden: true
  }, {
    title: '药品标准号', dataIndex: 'ypbzh', defaultHidden: true
  }, {
    title: '检测期到期时间', dataIndex: 'qxdqsj', width: 130, format: 'date|YYYY-MM-DD', defaultHidden: true, sorter: true
  }, {
    title: '检测期年限', dataIndex: 'qxnx', defaultHidden: true, sorter: true
  }, {
    title: '期限类型', dataIndex: 'qxlx', defaultHidden: true, sorter: true
  }, {
    title: '证书状态编码', dataIndex: 'pzzt', defaultHidden: true, sorter: true
  }, {
    title: '注销时间', dataIndex: 'ztbzsj', defaultHidden: true, sorter: true
  }, {
    title: '抽检情况', dataIndex: 'cjqk', width: 100, slots: { customRender: 'cjqk' }
  }, {
    title: '生产企业地址', dataIndex: 'scqydz', defaultHidden: true, sorter: true
  }, {
    title: '所属辖区', dataIndex: 'areaCode', width: 120, sorter: true, customRender({ text }) {
      return getTextByCode(text);
    }
  }];
  if (showJnCjqk) {
    array.push({
      title: '今年抽检', dataIndex: 'cjcs', width: 80, slots: { customRender: 'jnCjqk' }
    });
  }
  if (showJcmx) {
    let targetIdx = -1;
    array.forEach((item, idx) => {
      if (item.dataIndex == 'yppzwhyxq') {
        item.defaultHidden = true;
        targetIdx = idx;
      }
    });
    if (0 <= targetIdx) array.splice(targetIdx, 0, { title: '集采次数', dataIndex: 'cjNum', width: 100, sorter: true, slots: { customRender: 'cjNum' } });
  }
  return array;
}

export function getSearchFormSchema(route: RouteLocationNormalizedLoaded | null): FormSchema[] {
  let res: FormSchema[] = [{
    label: '', field: 'tags', component: 'Input', show: false
  }, {
    label: '所属地市', field: 'xzqhdm', component: 'JAreaSelect', componentProps: { level: 2, province: '420000', hideProvince: true, cityChooseOption: '全省' }
    , colProps: { xxl: { span: 4 } }
  }, {
    label: '批准文号', field: 'yppzwh', component: 'JInput', componentProps: { type: JInputTypeEnum.JINPUT_QUERY_LIKE }, colProps: { xxl: { span: 5 } }
  }, {
    label: '药品通用名', field: 'yptymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '药品类型', field: 'ypfl', component: 'JDictSelectTag', componentProps: { dictCode: 'YPPZLX-1', stringToNumber: false }, colProps: { xxl: { span: 5 } }
  }, {
    label: '剂型', field: 'bzjx', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '生产状况', field: 'sczk', component: 'JDictSelectTag', componentProps: { dictCode: 'yppzSczk', stringToNumber: false }, colProps: { xxl: { span: 4 } }
  }, {
    label: '处方', field: 'prescribe', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '药品上市许可持有人', labelWidth: 138, field: 'cyrmc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '药品生产企业', labelWidth: 108, field: 'ypscqymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '生产/注册', field: 'pzfw', component: 'Select', componentProps: {
      allowClear: false,
      options: [{ label: '注册品种', value: '1' }, { label: '生产品种', value: '2' }]
    }, defaultValue: route?.query?.pzfw || (route?.query?.isCyr == 'true' ? '1' : '2'), colProps: { xxl: { span: 5 } }
  }];
  return res;
}

export const searchFormSchema: FormSchema[] = getSearchFormSchema(null);

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
    colProps: { span: 11 },
    rules: [{ required: true }],
  }, {
    label: '持有人社会信用代码',
    labelWidth: 160,
    field: 'cyrshxydm',
    component: 'Input',
    colProps: { span: 12, offset: 1 },
    rules: [{ required: true }],
  }, {
    label: '生产企业名称',
    field: 'ypscqymc',
    component: 'Input',
    colProps: { span: 11 },
    required: true,
  }, {
    label: '药品上市许可持有人',
    labelWidth: 160,
    field: 'cyrmc',
    component: 'Input',
    colProps: { offset: 1, span: 12 },
    rules: [{ required: true }],
  }, {
    label: '批准文号',
    field: 'yppzwh',
    component: 'Input',
    colProps: { span: 11 },
    rules: [{ required: true }],
  }, {
    label: '药品通用名',
    field: 'yptymc',
    component: 'Input',
    colProps: { offset: 1, span: 12 },
    rules: [{ required: true }],
  }, {
    label: '所属辖区',
    field: 'areaCode',
    component: 'MAreaSelect',
    componentProps: { provinceCodes: '420000', required: [false] }
  }, {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
  }, {
    label: '持有人地址',
    field: 'cyrdz',
    component: 'Input',
  }, {
    label: '标签选择',
    field: 'tags',
    component: 'MCategorySelect',
    componentProps: {
      pcode: 'A02',
      multiple: true,
      getPopupContainer: () => document.body,
    },
  }, {
    label: '生产状况',
    field: 'sczk',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'yppzSczk',
      placeholder: '生产状况',
      getPopupContainer: () => document.body,
    },
    colProps: { span: 11 }
  }, {
    label: '追溯状态',
    field: 'zszt',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'yppzZszt',
      placeholder: '追溯状态',
      getPopupContainer: () => document.body,
    },
    colProps: { offset: 1, span: 12 }
  }, {
    label: '商品名',
    field: 'ypspmc',
    component: 'Input',
    colProps: { span: 11 }
  }, {
    label: '英文名称',
    field: 'yptymcyw',
    component: 'Input',
    colProps: { offset: 1, span: 12 }
  }, {
    label: '化学名称',
    field: 'yphxmc',
    component: 'Input',
    colProps: { span: 11 }
  }, {
    label: '拉丁名称',
    field: 'ypldxm',
    component: 'Input',
    colProps: { offset: 1, span: 12 }
  }, {
    label: '药品类型',
    field: 'ypfl',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'YPPZLX-1',
      placeholder: '药品类型',
      getPopupContainer: () => document.body,
    },
    colProps: { span: 11 }
  }, {
    label: '药品有效期',
    field: 'ypyxq',
    component: 'Input',
    colProps: { offset: 1, span: 12 }
  }, {
    label: '剂型',
    field: 'jx',
    component: 'Input',
    colProps: { span: 11 }
  }, {
    label: '标准剂型',
    field: 'bzjx',
    component: 'Input',
    colProps: { offset: 1, span: 12 }
  }, {
    label: '规格',
    field: 'ypgg',
    component: 'Input',
    colProps: { span: 11 }
  }, {
    label: '包装规格',
    field: 'bzgg',
    component: 'Input',
    colProps: { offset: 1, span: 12 }
  }, {
    label: '批准日期',
    field: 'pzrq',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: { span: 11 }
  }, {
    label: '批准文号有效期',
    field: 'yppzwhyxq',
    component: 'DatePicker',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    colProps: { offset: 1, span: 12 }
  }, {
    label: '审批结论',
    field: 'ypspjl01',
    component: 'InputTextArea',
    componentProps: {
      rows: 5
    }
  }, {
    label: '药品标准',
    field: 'ypbz',
    component: 'InputTextArea',
  }, {
    label: '药品标准号',
    field: 'ypbzh',
    component: 'Input',
  }, {
    label: '检测期到期时间',
    field: 'qxdqsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
    colProps: { span: 11 }
  }, {
    label: '注销时间',
    field: 'ztbzsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
    colProps: { offset: 1, span: 12 }
  }, {
    label: '检测期年限',
    field: 'qxnx',
    component: 'Input',
    colProps: { span: 11 }
  }, {
    label: '期限类型',
    field: 'qxlx',
    component: 'Input',
    colProps: { offset: 1, span: 12 }
  }, {
    label: '药品名称汉语拼音',
    field: 'yptymchypy',
    component: 'Input',
    show: false
  }, {
    label: '原批准文号',
    field: 'ypypzwh',
    component: 'Input',
    show: false
  }, {
    label: '新药证书编号',
    field: 'xyzsbh',
    component: 'Input',
    show: false
  }, {
    label: '新药证书持有者',
    field: 'xyzscyzmc',
    component: 'Input',
    show: false
  }, {
    label: '证书状态编码',
    field: 'pzzt',
    component: 'Input',
    show: false
  }, {
    label: '证书状态说明：与证书状态编码（PZZT）相互对应，空为正常',
    field: 'ztbzyy',
    component: 'Input',
    show: false
  }, {
    label: 'qyid',
    field: 'qyid',
    component: 'Input',
    show: false
  }, {
    label: '数据中心交换标志',
    field: 'flagSjzx',
    component: 'Input',
    show: false
  }, {
    label: '短信发送标志0 未发送 1已发送',
    field: 'sms',
    component: 'Input',
    show: false
  }
];

export const selectOptions = {
  modalTitle: '选择药品品种',
  rowKey: 'yppzwh',
  labelKey: 'yppzwh',
  width: '90%',
  tableProps: {
    api: list,
    columns: getColumns(),
    formConfig: {
      schemas: searchFormSchema,
    },
    defSort: {
      column: 'areaCode',
      order: 'asc',
    },
  }
};