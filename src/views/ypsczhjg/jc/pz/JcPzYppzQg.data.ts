import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

let areaFilters = [];
'北京市,天津市,河北省,山西省,内蒙古自治区,辽宁省,吉林省,黑龙江省,上海市,江苏省,浙江省,安徽省,福建省,江西省,山东省,河南省,湖北省,湖南省,广东省,广西壮族自治区,海南省,重庆市,四川省,贵州省,云南省,西藏自治区,陕西省,甘肃省,青海省,宁夏回族自治区,新疆维吾尔自治区,新疆生产建设兵团'.split(',').forEach((item)=>{
  areaFilters.push({text:item, value:item});
});

export const columns: BasicColumn[] = [
  {
    title: '批准文号',
    dataIndex: 'yppzwh'
  },
  {
    title: '药品通用名称',
    dataIndex: 'yptymc'
  },
  {
    title: '英文名称',
    dataIndex: 'yptymcyw', defaultHidden: true
  },
  {
    title: '商品名',
    dataIndex: 'ypspmc', defaultHidden: true
  },
  {
    title: '化学名称',
    dataIndex: 'yphxmc', defaultHidden: true
  },
  {
    title: '拉丁名称',
    dataIndex: 'ypldxm', defaultHidden: true
  },
  {
    title: '药品名称汉语拼音',
    dataIndex: 'yptymchypy', defaultHidden: true
  },
  {
    title: '药品类型',
    dataIndex: 'ypfl'
  },
  {
    title: '剂型',
    dataIndex: 'jx'
  },
  {
    title: '批准文号有效期',
    dataIndex: 'yppzwhyxq'
  },
  {
    title: '规格',
    dataIndex: 'ypgg'
  },
  {
    title: '包装规格',
    dataIndex: 'bzgg', defaultHidden: true
  },
  {
    title: '批准日期',
    dataIndex: 'pzrq', defaultHidden: true
  },
  {
    title: '原批准文号',
    dataIndex: 'ypypzwh', defaultHidden: true
  },
  {
    title: '生产单位',
    dataIndex: 'ypscqymc'
  },
  {
    title: '新药证书编号',
    dataIndex: 'xyzsbh', defaultHidden: true
  },
  {
    title: '新药证书持有者',
    dataIndex: 'xyzscyzmc', defaultHidden: true
  },
  {
    title: '生产地址',
    dataIndex: 'scdz', defaultHidden: true
  },
  {
    title: '药品有效期',
    dataIndex: 'ypyxq', defaultHidden: true
  },
  {
    title: '药品标准号',
    dataIndex: 'ypbzh', defaultHidden: true
  },
  {
    title: '行政区划', dataIndex: 'dzszzxszzq', filters: areaFilters
  },
  {
    title: '过渡期/保护期/监测期到期时间',
    dataIndex: 'qxdqsj', defaultHidden: true
  },
  {
    title: 'qxnx',
    dataIndex: 'qxnx', defaultHidden: true
  },
  {
    title: '期限类型',
    dataIndex: 'qxlx', defaultHidden: true
  },
  {
    title: '批准文号状态=1：正常=2：注销=3：撤销',
    dataIndex: 'pzzt', defaultHidden: true
  },
  {
    title: '注销时间',
    dataIndex: 'ztbzsj', defaultHidden: true
  },
  {
    title: '注销原因',
    dataIndex: 'ztbzyy', defaultHidden: true
  },
  {
    title: 'yppypscqymczwh',
    dataIndex: 'yppypscqymczwh', defaultHidden: true
  },
  {
    title: '行政区划',
    dataIndex: 'xzqh', defaultHidden: true
  },
  {
    title: '鹏达数据交换标识：NULL：为交换，1：已交换',
    dataIndex: 'flagSjzx', defaultHidden: true
  },
  {
    title: 'sf',
    dataIndex: 'sf', defaultHidden: true
  },
  {
    title: 'ypbz',
    dataIndex: 'ypbz', defaultHidden: true
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '批准文号',
    field: 'yppzwh',
    component: 'Input'
  },
  {
    label: '药品通用名称',
    field: 'yptymc',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '批准文号',
    field: 'yppzwh',
    component: 'Input',
  },
  {
    label: '药品通用名称',
    field: 'yptymc',
    component: 'Input',
  },
  {
    label: '英文名称',
    field: 'yptymcyw',
    component: 'Input',
  },
  {
    label: '商品名',
    field: 'ypspmc',
    component: 'Input',
  },
  {
    label: '化学名称',
    field: 'yphxmc',
    component: 'Input',
  },
  {
    label: '拉丁名称',
    field: 'ypldxm',
    component: 'Input',
  },
  {
    label: '药品名称汉语拼音',
    field: 'yptymchypy',
    component: 'Input',
  },
  {
    label: '药品类型',
    field: 'ypfl',
    component: 'Input',
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
    label: '包装规格',
    field: 'bzgg',
    component: 'Input',
  },
  {
    label: '批准日期',
    field: 'pzrq',
    component: 'Input',
  },
  {
    label: '批准文号有效期',
    field: 'yppzwhyxq',
    component: 'Input',
  },
  {
    label: '原批准文号',
    field: 'ypypzwh',
    component: 'Input',
  },
  {
    label: '生产单位',
    field: 'ypscqymc',
    component: 'Input',
  },
  {
    label: '新药证书编号',
    field: 'xyzsbh',
    component: 'Input',
  },
  {
    label: '新药证书持有者',
    field: 'xyzscyzmc',
    component: 'Input',
  },
  {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
  },
  {
    label: '药品有效期',
    field: 'ypyxq',
    component: 'Input',
  },
  {
    label: '药品标准号',
    field: 'ypbzh',
    component: 'Input',
  },
  {
    label: '行政区划',
    field: 'dzszzxszzq',
    component: 'Input',
  },
  {
    label: '过渡期/保护期/监测期到期时间',
    field: 'qxdqsj',
    component: 'Input',
  },
  {
    label: 'qxnx',
    field: 'qxnx',
    component: 'Input',
  },
  {
    label: '期限类型',
    field: 'qxlx',
    component: 'Input',
  },
  {
    label: '批准文号状态=1：正常=2：注销=3：撤销',
    field: 'pzzt',
    component: 'Input',
  },
  {
    label: '注销时间',
    field: 'ztbzsj',
    component: 'Input',
  },
  {
    label: '注销原因',
    field: 'ztbzyy',
    component: 'Input',
  },
  {
    label: 'yppypscqymczwh',
    field: 'yppypscqymczwh',
    component: 'Input',
  },
  {
    label: '行政区划',
    field: 'xzqh',
    component: 'Input',
  },
  {
    label: '鹏达数据交换标识：NULL：为交换，1：已交换',
    field: 'flagSjzx',
    component: 'Input',
  },
  {
    label: 'sf',
    field: 'sf',
    component: 'Input',
  },
  {
    label: 'ypbz',
    field: 'ypbz',
    component: 'Input',
  },
];
