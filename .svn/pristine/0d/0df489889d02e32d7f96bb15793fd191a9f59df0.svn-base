import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';

export const columns: BasicColumn[] = [
    {
    title: '注册证书号码',
    dataIndex: 'zczshm',
    defaultHidden: true
   },
   {
    title: '资格证书号码',
    dataIndex: 'zgzshm'
   },
   {
    title: '中文姓名',
    dataIndex: 'zwxm'
   },
   {
    title: '证件类型',
    dataIndex: 'zjlx',
    customRender: ({ text }) => {
      return filterDictTextByCache('SFZJLX-1',text);
    },
    defaultHidden: true
   },
   {
    title: '证件号码',
    dataIndex: 'zjhm',
    defaultHidden: true
   },
   {
    title: '性别',
    dataIndex: 'xb',
    defaultHidden: true
   },
   {
    title: '名族',
    dataIndex: 'mz',
    defaultHidden: true
   },
   {
    title: '出生日期',
    dataIndex: 'csrq',
    defaultHidden: true
   },
   {
    title: '职称',
    dataIndex: 'zc',
    customRender: ({ text }) => {
      return filterDictTextByCache('zyys_zc',text);
    }
   },
   {
    title: '参加工作时间',
    dataIndex: 'cjgzsj',
    defaultHidden: true
   },
   {
    title: '手机号码',
    dataIndex: 'sjhm',
    defaultHidden: true
   },
   {
    title: '电子邮件',
    dataIndex: 'dzyj',
    defaultHidden: true
   },
   {
    title: '邮政编码',
    dataIndex: 'yzbm',
    defaultHidden: true
   },
   {
    title: '毕业学校',
    dataIndex: 'byxx',
    defaultHidden: true
   },
   {
    title: '所学专业',
    dataIndex: 'sxzy',
    defaultHidden: true
   },
   {
    title: '学历',
    dataIndex: 'xl',
    defaultHidden: true
   },
   {
    title: '执业地区所属省',
    dataIndex: 'zydqsssZzqZxs',
    defaultHidden: true
   },
   {
    title: '执业地区所属地区',
    dataIndex: 'zydqssdq',
    defaultHidden: true
   },
   {
    title: '执业地区所属区县',
    dataIndex: 'zydqssqx',
    defaultHidden: true
   },
   {
    title: '执业类别',
    dataIndex: 'zylb',
    customRender: ({ text }) => {
      return filterDictTextByCache('zyys_zylb',text);
    }
   },
   {
    title: '执业范围',
    dataIndex: 'zyfw',
    customRender: ({ text }) => {
      return filterDictTextByCache('zyys_zyfw',text);
    }
   },
   {
    title: '执业单位名称',
    dataIndex: 'zydwmc',
   },
   {
    title: '执业单位地址',
    dataIndex: 'zydwdz',
    defaultHidden: true
   },
   {
    title: '执业单位联系电话',
    dataIndex: 'zydwlxdh',
    defaultHidden: true
   },
   {
    title: '执业单位证号',
    dataIndex: 'zydwzh',
    defaultHidden: true
   },
   {
    title: '现工作岗位',
    dataIndex: 'xgzgwShow'
   },
   {
    title: '注册时间',
    dataIndex: 'zcsj',
    defaultHidden: true
   },
   {
    title: '有效日期',
    dataIndex: 'yxrq',
    defaultHidden: true
   },
   {
    title: '注册类型',
    dataIndex: 'zclx',
    defaultHidden: true
   },
   {
    title: '注册状态',
    dataIndex: 'zczt',
    defaultHidden: true
   },
   {
    title: '发证机关',
    dataIndex: 'fzjg',
    defaultHidden: true
   },
   {
    title: '注销注册原因',
    dataIndex: 'zxzcyy',
    defaultHidden: true
   },
   {
    title: '变更原因',
    dataIndex: 'bgyy',
    defaultHidden: true
   },
   {
    title: '是否跨省变更：1.是,2.否',
    dataIndex: 'sfksbg',
    defaultHidden: true
   },
   {
    title: '企业社会信用代码',
    dataIndex: 'qyshxydm',
    defaultHidden: true
   },
   {
    title: '报考单位',
    dataIndex: 'bkdw',
    defaultHidden: true
   },
   {
    title: '考试年份',
    dataIndex: 'ksnf',
    defaultHidden: true
   },
   {
    title: 'zzmm',
    dataIndex: 'zzmm',
    defaultHidden: true
   },
   {
    title: 'qsr',
    dataIndex: 'qsr',
    defaultHidden: true
   },
   {
    title: 'qssj',
    dataIndex: 'qssj',
    defaultHidden: true
   },
   {
    title: 'slr',
    dataIndex: 'slr',
    defaultHidden: true
   },
   {
    title: 'slsj',
    dataIndex: 'slsj',
    defaultHidden: true
   },
   {
    title: 'spr',
    dataIndex: 'spr',
    defaultHidden: true
   },
   {
    title: 'spsj',
    dataIndex: 'spsj',
    defaultHidden: true
   },
   {
    title: 'zzr',
    dataIndex: 'zzr',
    defaultHidden: true
   },
   {
    title: 'zzsj',
    dataIndex: 'zzsj',
    defaultHidden: true
   },
   {
    title: 'fzr',
    dataIndex: 'fzr',
    defaultHidden: true
   },
   {
    title: 'fzsj',
    dataIndex: 'fzsj',
    defaultHidden: true
   },
   {
    title: 'sqbh',
    dataIndex: 'sqbh',
    defaultHidden: true
   },
   {
    title: 'slbh',
    dataIndex: 'slbh',
    defaultHidden: true
   },
   {
    title: 'czbs',
    dataIndex: 'czbs',
    defaultHidden: true
   },
   {
    title: 'tbsj',
    dataIndex: 'tbsj',
    defaultHidden: true
   },
   {
    title: 'zcid',
    dataIndex: 'zcid',
    defaultHidden: true
   },
   {
    title: 'gljyjlid',
    dataIndex: 'gljyjlid',
    defaultHidden: true
   },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '注册证书号码',
    field: 'zczshm',
    component: 'JInput'
  },
 {
    label: '资格证书号码',
    field: 'zgzshm',
    component: 'JInput'
  },
  {
    label: '执业单位名称',
    field: 'zydwmc',
    component: 'JInput'
  },
  {
    label: '报考单位',
    field: 'bkdw',
    component: 'JInput'
  }
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '注册证书号码',
    field: 'zczshm',
    component: 'Input',
  },
  {
    label: '资格证书号码',
    field: 'zgzshm',
    component: 'Input',
  },
  {
    label: '中文姓名',
    field: 'zwxm',
    component: 'Input',
  },
  {
    label: '证件类型',
    field: 'zjlx',
    component: 'Input',
  },
  {
    label: '证件号码',
    field: 'zjhm',
    component: 'Input',
  },
  {
    label: '性别',
    field: 'xb',
    component: 'Input',
  },
  {
    label: '名族',
    field: 'mz',
    component: 'Input',
  },
  {
    label: '出生日期',
    field: 'csrq',
    component: 'Input',
  },
  {
    label: '职称',
    field: 'zc',
    component: 'Input',
  },
  {
    label: '参加工作时间',
    field: 'cjgzsj',
    component: 'Input',
  },
  {
    label: '手机号码',
    field: 'sjhm',
    component: 'Input',
  },
  {
    label: '电子邮件',
    field: 'dzyj',
    component: 'Input',
  },
  {
    label: '邮政编码',
    field: 'yzbm',
    component: 'Input',
  },
  {
    label: '毕业学校',
    field: 'byxx',
    component: 'Input',
  },
  {
    label: '所学专业',
    field: 'sxzy',
    component: 'Input',
  },
  {
    label: '学历',
    field: 'xl',
    component: 'Input',
  },
  {
    label: '执业地区所属省',
    field: 'zydqsssZzqZxs',
    component: 'Input',
  },
  {
    label: '执业地区所属地区',
    field: 'zydqssdq',
    component: 'Input',
  },
  {
    label: '执业地区所属区县',
    field: 'zydqssqx',
    component: 'Input',
  },
  {
    label: '执业类别',
    field: 'zylb',
    component: 'Input',
  },
  {
    label: '执业范围',
    field: 'zyfw',
    component: 'Input',
  },
  {
    label: '执业单位名称',
    field: 'zydwmc',
    component: 'Input',
  },
  {
    label: '执业单位地址',
    field: 'zydwdz',
    component: 'Input',
  },
  {
    label: '执业单位联系电话',
    field: 'zydwlxdh',
    component: 'Input',
  },
  {
    label: '执业单位证号',
    field: 'zydwzh',
    component: 'Input',
  },
  {
    label: '现工作岗位',
    field: 'xgzgw',
    component: 'Input',
  },
  {
    label: '注册时间',
    field: 'zcsj',
    component: 'Input',
  },
  {
    label: '有效日期',
    field: 'yxrq',
    component: 'Input',
  },
  {
    label: '注册类型',
    field: 'zclx',
    component: 'Input',
  },
  {
    label: '注册状态',
    field: 'zczt',
    component: 'Input',
  },
  {
    label: '发证机关',
    field: 'fzjg',
    component: 'Input',
  },
  {
    label: '注销注册原因',
    field: 'zxzcyy',
    component: 'Input',
  },
  {
    label: '变更原因',
    field: 'bgyy',
    component: 'Input',
  },
  {
    label: '是否跨省变更：1.是,2.否',
    field: 'sfksbg',
    component: 'Input',
  },
  {
    label: '企业社会信用代码',
    field: 'qyshxydm',
    component: 'Input',
  },
  {
    label: '报考单位',
    field: 'bkdw',
    component: 'Input',
  },
  {
    label: '考试年份',
    field: 'ksnf',
    component: 'Input',
  },
  {
    label: 'zzmm',
    field: 'zzmm',
    component: 'Input',
  },
  {
    label: 'qsr',
    field: 'qsr',
    component: 'Input',
  },
  {
    label: 'qssj',
    field: 'qssj',
    component: 'Input',
  },
  {
    label: 'slr',
    field: 'slr',
    component: 'Input',
  },
  {
    label: 'slsj',
    field: 'slsj',
    component: 'Input',
  },
  {
    label: 'spr',
    field: 'spr',
    component: 'Input',
  },
  {
    label: 'spsj',
    field: 'spsj',
    component: 'Input',
  },
  {
    label: 'zzr',
    field: 'zzr',
    component: 'Input',
  },
  {
    label: 'zzsj',
    field: 'zzsj',
    component: 'Input',
  },
  {
    label: 'fzr',
    field: 'fzr',
    component: 'Input',
  },
  {
    label: 'fzsj',
    field: 'fzsj',
    component: 'Input',
  },
  {
    label: 'sqbh',
    field: 'sqbh',
    component: 'Input',
  },
  {
    label: 'slbh',
    field: 'slbh',
    component: 'Input',
  },
  {
    label: 'czbs',
    field: 'czbs',
    component: 'Input',
  },
  {
    label: 'tbsj',
    field: 'tbsj',
    component: 'Input',
  },
  {
    label: 'zcid',
    field: 'zcid',
    component: 'Input',
  },
  {
    label: 'gljyjlid',
    field: 'gljyjlid',
    component: 'Input',
  },
];
