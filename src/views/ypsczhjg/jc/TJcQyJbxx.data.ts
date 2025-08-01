import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Button } from '/@/components/Button';
import { DescItem } from '/@/components/Description/index';
import { Badge } from 'ant-design-vue';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { defHttp } from '/@/utils/http/axios';

export const columns: BasicColumn[] = [
  {
    title: '社会信用代码',
    dataIndex: 'shxydm'
  },
  {
    title: '年度报告id',
    dataIndex: 'durgBasicInfoId'
  },
  {
    title: '企业名称',
    dataIndex: 'qymc'
  },
  {
    title: '注册地址',
    dataIndex: 'zcdz'
  },
  {
    title: '法定代表人',
    dataIndex: 'fddbr'
  },
  {
    title: '法人身份证号',
    dataIndex: 'frsfzh'
  },
  {
    title: '法人手机号码',
    dataIndex: 'sjhm'
  },
  {
    title: '联系人',
    dataIndex: 'lxr'
  },
  {
    title: '联系电话',
    dataIndex: 'lxdh'
  },
  {
    title: '电子邮箱',
    dataIndex: 'dzyx'
  },
  {
    title: '行政区划号(省)',
    dataIndex: 'xzqhS'
  },
  {
    title: '行政区划号(市)',
    dataIndex: 'xzqhDs'
  },
  {
    title: '行政区划号(县、区)',
    dataIndex: 'xzqhdm'
  },
  {
    title: '乡镇街道代码',
    dataIndex: 'xzjddm'
  },
  {
    title: '邮政编码',
    dataIndex: 'yzbm'
  },
  {
    title: '经济类型',
    dataIndex: 'jjlx'
  },
  {
    title: '经济行业',
    dataIndex: 'jjhy'
  },
  {
    title: '是否规模以上',
    dataIndex: 'sfgmys'
  },
  {
    title: '企业规模',
    dataIndex: 'qygm'
  },
  {
    title: '企业获证',
    dataIndex: 'qyhz'
  },
  {
    title: '企业状况',
    dataIndex: 'qyzk'
  },
  {
    title: '企业类型',
    dataIndex: 'qylx'
  },
  {
    title: '成立时间',
    dataIndex: 'clsj'
  },
  {
    title: '监管分级',
    dataIndex: 'jgfj'
  },
  {
    title: '基层监管单位',
    dataIndex: 'jcjgdw'
  },
  {
    title: '生产地址',
    dataIndex: 'scdz'
  },
  {
    title: '经营地址',
    dataIndex: 'jydz'
  },
  {
    title: '仓库地址',
    dataIndex: 'ckdz'
  },
  {
    title: '推展字段2',
    dataIndex: 'tzzd2'
  },
  {
    title: '信用评级',
    dataIndex: 'tzzd1'
  },
  {
    title: '地理位置横坐标',
    dataIndex: 'locationx'
  },
  {
    title: '地理位置纵坐标',
    dataIndex: 'locationy'
  },
  {
    title: '行政区划名称',
    dataIndex: 'xzqhname'
  },
  {
    title: '备注',
    dataIndex: 'remark'
  },
  {
    title: '当前地图放大比例',
    dataIndex: 'zoom'
  },
  {
    title: '填报状态 1可以填写 0不能补填',
    dataIndex: 'yxbt'
  },
  {
    title: '同步状态:0已同步 1未同步 2已更新',
    dataIndex: 'sync'
  },
  {
    title: '数据来源',
    dataIndex: 'sjly'
  },
  {
    title: '交换时间',
    dataIndex: 'sjlydate'
  },
  {
    title: '经度',
    dataIndex: 'tempstr'
  },
  {
    title: 'flag=5',
    dataIndex: 'processflag'
  },
  {
    title: 'adminvis',
    dataIndex: 'adminvis'
  },
  {
    title: 'opt',
    dataIndex: 'opt'
  },
  {
    title: '默认：0，删除：1',
    dataIndex: 'zt'
  },
  {
    title: '同步状态:0已同步 1未同步 2已更新',
    dataIndex: 'syncZfcf'
  },
  {
    title: '刷新行政区划是市直辖标记',
    dataIndex: 'flagXzqhSzj'
  },
  {
    title: '数据整理-社会信用代码',
    dataIndex: 'sjzlBfShxydm'
  },
  {
    title: '数据整理状态0工商不存在1：工商存在 无：未处理',
    dataIndex: 'sjzlFlag'
  },
  {
    title: 'rcjgFlag',
    dataIndex: 'rcjgFlag'
  },
  {
    title: '经营范围',
    dataIndex: 'jyfw'
  },
  {
    title: '工商企业类型',
    dataIndex: 'gsqylx'
  },
  {
    title: '注册资本',
    dataIndex: 'zczb'
  },
  {
    title: '登记机关',
    dataIndex: 'djjg'
  },
  {
    title: '注册资本单位',
    dataIndex: 'zczbdw'
  },
  {
    title: '企业证件类型',
    dataIndex: 'zjlx'
  },
  {
    title: '创建时间',
    dataIndex: 'createdate'
  },
  {
    title: '创建数据登录用户名称',
    dataIndex: 'createDataUser'
  },
  {
    title: '基层监管单位名称',
    dataIndex: 'jgjgdwmc'
  },
  {
    title: '创建人姓名',
    dataIndex: 'createName'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '修改人姓名',
    dataIndex: 'updateName'
  },
  {
    title: '修改时间',
    dataIndex: 'updateDate'
  },
  {
    title: '行政区划名称',
    dataIndex: 'xzqhmc'
  },
  {
    title: '预留字段1',
    dataIndex: 'ylzd1'
  },
  {
    title: '纬度',
    dataIndex: 'ylzd2'
  },
  {
    title: '数据中心交换标志',
    dataIndex: 'flagSjzx'
  },
  {
    title: '法定代表人证件类型',
    dataIndex: 'fddbrlx'
  },
  {
    title: '工商社会信用代码',
    dataIndex: 'gsShxydm'
  },
  {
    title: '工商企业名称',
    dataIndex: 'gsQymc'
  },
  {
    title: '工商状态1：已匹配 2：未匹配',
    dataIndex: 'gssync'
  },
  {
    title: '"查询方式 1 完全匹配 2根据社会性用代码找企业 3 根据企业名称',
    dataIndex: 'cxfs'
  },
  {
    title: 'shxydmzj',
    dataIndex: 'shxydmzj'
  },
  {
    title: '工商企业名称',
    dataIndex: 'gsqymc'
  },
  {
    title: '工商社会信用代码',
    dataIndex: 'gsshxydm'
  },
  {
    title: '工商法定代表人',
    dataIndex: 'gsfddbr'
  },
  {
    title: '工商联系人',
    dataIndex: 'gslxr'
  },
  {
    title: '工商联系电话',
    dataIndex: 'gslxdh'
  },
  {
    title: '工商手机号码',
    dataIndex: 'gssjhm'
  },
  {
    title: '工商电子邮箱',
    dataIndex: 'gsdzyx'
  },
  {
    title: '工商经营地址',
    dataIndex: 'gsjydz'
  },
  {
    title: '工商经营范围',
    dataIndex: 'gsjyfw'
  },
  {
    title: '同步企业数据到地市 0 未同步 1 已同步',
    dataIndex: 'dssync'
  },
  {
    title: '应用系统同步标 0 未同步 1 已同步',
    dataIndex: 'syncYy'
  },
  {
    title: '标签', dataIndex: 'tags_dictText', width: 85
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input'
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '注册地址',
    field: 'zcdz',
    component: 'Input',
  },
  {
    label: '法定代表人',
    field: 'fddbr',
    component: 'Input',
  },
  {
    label: '法人身份证号',
    field: 'frsfzh',
    component: 'Input',
  },
  {
    label: '法人手机号码',
    field: 'sjhm',
    component: 'Input',
  },
  {
    label: '联系人',
    field: 'lxr',
    component: 'Input',
  },
  {
    label: '联系电话',
    field: 'lxdh',
    component: 'Input',
  },
  {
    label: '电子邮箱',
    field: 'dzyx',
    component: 'Input',
  },
  {
    label: '行政区划号(省)',
    field: 'xzqhS',
    component: 'Input',
  },
  {
    label: '行政区划号(市)',
    field: 'xzqhDs',
    component: 'Input',
  },
  {
    label: '行政区划号(县、区)',
    field: 'xzqhdm',
    component: 'Input',
  },
  {
    label: '乡镇街道代码',
    field: 'xzjddm',
    component: 'Input',
  },
  {
    label: '邮政编码',
    field: 'yzbm',
    component: 'Input',
  },
  {
    label: '经济类型',
    field: 'jjlx',
    component: 'Input',
  },
  {
    label: '经济行业',
    field: 'jjhy',
    component: 'Input',
  },
  {
    label: '是否规模以上',
    field: 'sfgmys',
    component: 'Input',
  },
  {
    label: '企业规模',
    field: 'qygm',
    component: 'Input',
  },
  {
    label: '企业获证',
    field: 'qyhz',
    component: 'Input',
  },
  {
    label: '企业状况',
    field: 'qyzk',
    component: 'Input',
  },
  {
    label: '企业类型',
    field: 'qylx',
    component: 'Input',
  },
  {
    label: '成立时间',
    field: 'clsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '监管分级',
    field: 'jgfj',
    component: 'Input',
  },
  {
    label: '基层监管单位',
    field: 'jcjgdw',
    component: 'Input',
  },
  {
    label: '生产地址',
    field: 'scdz',
    component: 'Input',
  },
  {
    label: '经营地址',
    field: 'jydz',
    component: 'Input',
  },
  {
    label: '仓库地址',
    field: 'ckdz',
    component: 'Input',
  },
  {
    label: '推展字段2',
    field: 'tzzd2',
    component: 'Input',
  },
  {
    label: '信用评级',
    field: 'tzzd1',
    component: 'Input',
  },
  {
    label: '地理位置横坐标',
    field: 'locationx',
    component: 'Input',
  },
  {
    label: '地理位置纵坐标',
    field: 'locationy',
    component: 'Input',
  },
  {
    label: '行政区划名称',
    field: 'xzqhname',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'Input',
  },
  {
    label: '当前地图放大比例',
    field: 'zoom',
    component: 'Input',
  },
  {
    label: '填报状态 1可以填写 0不能补填',
    field: 'yxbt',
    component: 'Input',
  },
  {
    label: '同步状态:0已同步 1未同步 2已更新',
    field: 'sync',
    component: 'Input',
  },
  {
    label: '数据来源',
    field: 'sjly',
    component: 'Input',
  },
  {
    label: '交换时间',
    field: 'sjlydate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '经度',
    field: 'tempstr',
    component: 'Input',
  },
  {
    label: 'flag=5',
    field: 'processflag',
    component: 'Input',
  },
  {
    label: 'adminvis',
    field: 'adminvis',
    component: 'Input',
  },
  {
    label: 'opt',
    field: 'opt',
    component: 'Input',
  },
  {
    label: '默认：0，删除：1',
    field: 'zt',
    component: 'InputNumber',
  },
  {
    label: '同步状态:0已同步 1未同步 2已更新',
    field: 'syncZfcf',
    component: 'Input',
  },
  {
    label: '刷新行政区划是市直辖标记',
    field: 'flagXzqhSzj',
    component: 'Input',
  },
  {
    label: '数据整理-社会信用代码',
    field: 'sjzlBfShxydm',
    component: 'Input',
  },
  {
    label: '数据整理状态0工商不存在1：工商存在 无：未处理',
    field: 'sjzlFlag',
    component: 'Input',
  },
  {
    label: 'rcjgFlag',
    field: 'rcjgFlag',
    component: 'Input',
  },
  {
    label: '经营范围',
    field: 'jyfw',
    component: 'Input',
  },
  {
    label: '工商企业类型',
    field: 'gsqylx',
    component: 'Input',
  },
  {
    label: '注册资本',
    field: 'zczb',
    component: 'InputNumber',
  },
  {
    label: '登记机关',
    field: 'djjg',
    component: 'Input',
  },
  {
    label: '注册资本单位',
    field: 'zczbdw',
    component: 'Input',
  },
  {
    label: '企业证件类型',
    field: 'zjlx',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'createdate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '创建数据登录用户名称',
    field: 'createDataUser',
    component: 'Input',
  },
  {
    label: '基层监管单位名称',
    field: 'jgjgdwmc',
    component: 'Input',
  },
  {
    label: '创建人姓名',
    field: 'createName',
    component: 'Input',
  },
  {
    label: '创建时间',
    field: 'createDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '修改人姓名',
    field: 'updateName',
    component: 'Input',
  },
  {
    label: '修改时间',
    field: 'updateDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '行政区划名称',
    field: 'xzqhmc',
    component: 'Input',
  },
  {
    label: '预留字段1',
    field: 'ylzd1',
    component: 'Input',
  },
  {
    label: '纬度',
    field: 'ylzd2',
    component: 'Input',
  },
  {
    label: '数据中心交换标志',
    field: 'flagSjzx',
    component: 'Input',
  },
  {
    label: '法定代表人证件类型',
    field: 'fddbrlx',
    component: 'Input',
  },
  {
    label: '工商社会信用代码',
    field: 'gsShxydm',
    component: 'Input',
  },
  {
    label: '工商企业名称',
    field: 'gsQymc',
    component: 'Input',
  },
  {
    label: '工商状态1：已匹配 2：未匹配',
    field: 'gssync',
    component: 'Input',
  },
  {
    label: '"查询方式 1 完全匹配 2根据社会性用代码找企业 3 根据企业名称',
    field: 'cxfs',
    component: 'Input',
  },
  {
    label: 'shxydmzj',
    field: 'shxydmzj',
    component: 'Input',
  },
  {
    label: '工商企业名称',
    field: 'gsqymc',
    component: 'Input',
  },
  {
    label: '工商社会信用代码',
    field: 'gsshxydm',
    component: 'Input',
  },
  {
    label: '工商法定代表人',
    field: 'gsfddbr',
    component: 'Input',
  },
  {
    label: '工商联系人',
    field: 'gslxr',
    component: 'Input',
  },
  {
    label: '工商联系电话',
    field: 'gslxdh',
    component: 'Input',
  },
  {
    label: '工商手机号码',
    field: 'gssjhm',
    component: 'Input',
  },
  {
    label: '工商电子邮箱',
    field: 'gsdzyx',
    component: 'Input',
  },
  {
    label: '工商经营地址',
    field: 'gsjydz',
    component: 'Input',
  },
  {
    label: '工商经营范围',
    field: 'gsjyfw',
    component: 'Input',
  },
  {
    label: '同步企业数据到地市 0 未同步 1 已同步',
    field: 'dssync',
    component: 'Input',
  },
  {
    label: '应用系统同步标 0 未同步 1 已同步',
    field: 'syncYy',
    component: 'Input',
  },
];
