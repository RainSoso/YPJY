import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { usePermission } from '/@/hooks/web/usePermission';
const { isDisabledAuth } = usePermission();

export const columns: BasicColumn[] = [
    {
    title: '年度报告id',
    dataIndex: 'reportId',
    defaultHidden:true,
   },
   {
    title: '药品信息id',
    dataIndex: 'durgBasicInfoId',
    defaultHidden:true,
   },
   {
    title: '药品批准文号/注册证号',
    dataIndex: 'drugApproveNo',
   },
   {
    title: '药品通用名称',
    dataIndex: 'drugName',
   },
   {
    title: '剂型',
    dataIndex: 'dosageType',
    defaultHidden:true,
   },
   {
    title: '规格',
    dataIndex: 'specifications',
    width:200,
   },
   {
    title: '商品名',
    dataIndex: 'goodName'
   },
   {
    title: '生产/进口批次',
    dataIndex: 'jkpc',
    defaultHidden:true,
   },
   {
    title: '年度内是否生产',
    dataIndex: 'isProduct_dictText',
    width:150,
   },
   {
    title: '管理属性',
    dataIndex: 'glsx',
    defaultHidden:true,
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '年度报告id',
    field: 'reportId',
    component: 'Input'
  },
 {
    label: '药品信息id',
    field: 'durgBasicInfoId',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '年度报告id',
    field: 'reportId',
    component: 'Input',
    show:false,
  },
  {
    label: '药品信息id',
    field: 'durgBasicInfoId',
    component: 'Input',
    show:false,
  },
  {
    label: '药品批准文号/注册证号',
    field: 'drugApproveNo',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return isDisabledAuth(['demo.dbarray']);
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '药品通用名称',
    field: 'drugName',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return isDisabledAuth(['demo.dbarray']);
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '剂型',
    field: 'dosageType',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      console.log(values);
      return isDisabledAuth(['demo.dbarray']);
    },
    colProps: {
      offset: 1,
      span: 9,
    },
  },
  {
    label: '规格',
    field: 'specifications',
    component: 'Input',
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        message: '请输入规格!'
      },
    ],
  },
  {
    label: '商品名',
    field: 'goodName',
    component: 'Input',
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        message: '请输入商品名!'
      },
    ],
  },
  {
    label: '生产/进口批次',
    field: 'jkpc',
    component: 'Input',
    colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        message: '请输入生产/进口批次!'
      },
    ],
  },
  {
    label: '年度内是否生产',
    field: 'isProduct',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'SFBZ-1',
      type: 'radioButton',
    }, colProps: {
      offset: 1,
      span: 9,
    },
    rules: [
      {
        required: true,
        // message: '请输入生产/进口批次!'
      },
    ],
  },
  {
    label: '管理属性',
    field: 'glsx',
    component: 'JCheckbox',
    componentProps: {
      options: [
        { label: '国家基本药物', value: '国家基本药物' },
        { label: '国家集采中选药品', value: '国家集采中选药品' },
        { label: '通过一致性评价', value: '通过一致性评价' },
        { label: '短缺药品（国家短缺药品清单和国家临床必需易短缺药品重点监测清单目录药品）', value: '短缺药品（国家短缺药品清单和国家临床必需易短缺药品重点监测清单目录药品）' },
        { label: '儿童用药', value: '儿童用药' },
        { label: 'OTC（非处方药）', value: 'OTC（非处方药）' },
        { label: '特殊药品（麻醉药品、精神药品、医疗用毒性药品、放射性药品、药品类易制毒化学品）', value: '特殊药品（麻醉药品、精神药品、医疗用毒性药品、放射性药品、药品类易制毒化学品）' },
        { label: '不适用', value: '不适用' },
      ],
    },
    rules: [
      {
        required: true,
      },
    ],
    colProps: {
      offset: 1,
      // span: 9,
    },
  },
];
export const formSchemaTWO: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '管理属性',
    field: 'glsx',
    component: 'JCheckbox',
    componentProps: {
      options: [
        { label: '国家基本药物', value: '国家基本药物' },
        { label: '国家集采中选药品', value: '国家集采中选药品' },
        { label: '通过一致性评价', value: '通过一致性评价' },
        { label: '短缺药品（国家短缺药品清单和国家临床必需易短缺药品重点监测清单目录药品）', value: '短缺药品（国家短缺药品清单和国家临床必需易短缺药品重点监测清单目录药品）' },
        { label: '儿童用药', value: '儿童用药' },
        { label: 'OTC（非处方药）', value: 'OTC（非处方药）' },
        { label: '特殊药品（麻醉药品、精神药品、医疗用毒性药品、放射性药品、药品类易制毒化学品）', value: '特殊药品（麻醉药品、精神药品、医疗用毒性药品、放射性药品、药品类易制毒化学品）' },
        { label: '不适用', value: '不适用' },
      ],
    },
    rules: [
      {
        required: true,
      },
    ],
    colProps: {
      offset: 1,
      // span: 9,
    },
  },
];