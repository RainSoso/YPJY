import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: '抽验级别',
    dataIndex: 'cyjb_dictText'
   },
   {
    title: '抽样编号',
    dataIndex: 'cybh'
   },
   {
    title: '药品通用名',
    dataIndex: 'yptym'
   },
  //   {
  //   title: '抽样单位id',
  //   dataIndex: 'cydwid'
  //  },
  //  {
  //   title: '抽样单位名称',
  //   dataIndex: 'cydwmc'
  //  },
  //  {
  //   title: '检验单位id',
  //   dataIndex: 'jydw'
  //  },
  //  {
  //   title: '检验单位名称',
  //   dataIndex: 'jydwmc'
  //  },
  {
    title: '抽样日期',
    dataIndex: 'cyrq'
   },
  //  {
  //   title: '抽样环节',
  //   dataIndex: 'cyhj'
  //  },
  //  {
  //   title: '抽验目的---->对应【检验报告书】中（检验目的）',
  //   dataIndex: 'cymd'
  //  },
  //  {
  //   title: '抽验目的细化类别',
  //   dataIndex: 'cymdxhlb'
  //  },
  //  {
  //   title: '是否基药',
  //   dataIndex: 'sfjy'
  //  },
  //  {
  //   title: '药品商品名',
  //   dataIndex: 'ypspm'
  //  },
  //  {
  //   title: '生产单位(委托方)---->对应【检验报告书】中（生产单位或产地）',
  //   dataIndex: 'bsccdw'
  //  },
  //  {
  //   title: '生产单位曾用名',
  //   dataIndex: 'bsccdycym'
  //  },
  //  {
  //   title: '生产单位所属省份',
  //   dataIndex: 'bsccdwsssf'
  //  },
  //  {
  //   title: '生产单位所属地市',
  //   dataIndex: 'bsscdwssds'
  //  },
  //  {
  //   title: '生产单位所属区/县',
  //   dataIndex: 'bsscdwssqx'
  //  },
  //  {
  //   title: '生产单位(受托方)',
  //   dataIndex: 'stfscdw'
  //  },
  //  {
  //   title: '受托方所属省份',
  //   dataIndex: 'stfsssf'
  //  },
  //  {
  //   title: '制剂规格---->对应【检验报告书】中（规格）',
  //   dataIndex: 'zjgg'
  //  },
  //  {
  //   title: '包装规格',
  //   dataIndex: 'bzgg'
  //  },
  //  {
  //   title: '批号---->对应【检验报告书】中（批号）',
  //   dataIndex: 'ph'
  //  },
  //  {
  //   title: '剂型---->对应【检验报告书】中（剂型）',
  //   dataIndex: 'jx'
  //  },
  //  {
  //   title: '生产日期',
  //   dataIndex: 'scrq'
  //  },
  //  {
  //   title: '有效期',
  //   dataIndex: 'yxrq'
  //  },
  //  {
  //   title: '有效期至---->对应【检验报告书】中（有效期至）',
  //   dataIndex: 'yxqz'
  //  },
  //  {
  //   title: '批准文号',
  //   dataIndex: 'pzwh'
  //  },
  //  {
  //   title: '抽样执行标准---->对应【检验报告书】中（检验依据）(说明书标示)',
  //   dataIndex: 'zxbz'
  //  },
  //  {
  //   title: '被抽样单位id',
  //   dataIndex: 'bcydwid'
  //  },
  //  {
  //   title: '被抽样单位名称---->对应【检验报告书】中（供样单位）',
  //   dataIndex: 'bcydwmc'
  //  },
  //  {
  //   title: '被抽样单位地址',
  //   dataIndex: 'bcydwdz'
  //  },
  //  {
  //   title: '被抽样单位联系人',
  //   dataIndex: 'bcydwcylxr'
  //  },
  //  {
  //   title: '被抽样单位电话',
  //   dataIndex: 'bcydwdh'
  //  },
  //  {
  //   title: '被抽样单位邮编',
  //   dataIndex: 'yb'
  //  },
  //  {
  //   title: '药品大类',
  //   dataIndex: 'ypdl'
  //  },
  //  {
  //   title: '药品细类',
  //   dataIndex: 'ypxl'
  //  },
  //  {
  //   title: '内包装---->对应【检验报告书】中（包装）',
  //   dataIndex: 'nbz'
  //  },
  //  {
  //   title: '外包装情况',
  //   dataIndex: 'wbzqk'
  //  },
  //  {
  //   title: '抽样地点',
  //   dataIndex: 'cydd'
  //  },
  //  {
  //   title: '样品贮存温度(℃)',
  //   dataIndex: 'ypzcwd'
  //  },
  //  {
  //   title: '样品贮存相对湿度(%)',
  //   dataIndex: 'ypzcxdsd'
  //  },
  //  {
  //   title: '样品包装',
  //   dataIndex: 'ypbz'
  //  },
  //  {
  //   title: '抽样数量---->对应【检验报告书】中（检品数量）',
  //   dataIndex: 'cysl'
  //  },
  //  {
  //   title: '留样数量',
  //   dataIndex: 'lysl'
  //  },
  //  {
  //   title: '抽样单位经手人id',
  //   dataIndex: 'cydwjsrqmid'
  //  },
  //  {
  //   title: '抽样单位经手人签名---->对应【检验报告书】中（抽样人）'
  //   ,
  //   dataIndex: 'cydwjsrqm'
  //  },
  //  {
  //   title: '被抽样单位经手人签名',
  //   dataIndex: 'bcydwjsrqm'
  //  },
  //  {
  //   title: '新数据=0或空已交换的数据=1（由交换工具更新）',
  //   dataIndex: 'flagSjzx'
  //  },
  //  {
  //   title: '送检日期',
  //   dataIndex: 'sjrq'
  //  },
  //  {
  //   title: '药品原料',
  //   dataIndex: 'ypyl'
  //  },
  //  {
  //   title: '药品制剂',
  //   dataIndex: 'ypzj'
  //  },
  //  {
  //   title: '特殊药品',
  //   dataIndex: 'tsyp'
  //  },
  //  {
  //   title: '抽样地点性质',
  //   dataIndex: 'cyddxz'
  //  },
  //  {
  //   title: '被抽样单位所在省份',
  //   dataIndex: 'bcydwsssf'
  //  },
  //  {
  //   title: '被抽样单位所在地市',
  //   dataIndex: 'bcydwssds'
  //  },
  //  {
  //   title: '被抽样单位所在县',
  //   dataIndex: 'bcydwssqx'
  //  },
  //  {
  //   title: '抽样说明',
  //   dataIndex: 'cysm'
  //  },

  //  {
  //   title: '抽样单位所属省份',
  //   dataIndex: 'cydwsssf'
  //  },
  //  {
  //   title: '抽样单位所属地市',
  //   dataIndex: 'cydwssds'
  //  },
  //  {
  //   title: '抽样单位所属县',
  //   dataIndex: 'cydwssx'
  //  },
  //  {
  //   title: '年度',
  //   dataIndex: 'nd'
  //  },
  //  {
  //   title: '质量受控代码',
  //   dataIndex: 'zlskdm'
  //  },
  //  {
  //   title: '抽样单位联系电话',
  //   dataIndex: 'cydwlxdh'
  //  },
  //  {
  //   title: '抽样单位联系人',
  //   dataIndex: 'cydwlxr'
  //  },
  //  {
  //   title: '生产单位详细地址',
  //   dataIndex: 'scdwxxdz'
  //  },
  //  {
  //   title: '检验单位所属省份',
  //   dataIndex: 'jydwsssf'
  //  },
  //  {
  //   title: '检验单位所属地市',
  //   dataIndex: 'jydwssds'
  //  },
  //  {
  //   title: '检验单位所属县',
  //   dataIndex: 'jydwssx'
  //  },
  //  {
  //   title: '创建日期',
  //   dataIndex: 'createDate'
  //  },
  //  {
  //   title: '修改该日期',
  //   dataIndex: 'updateDate'
  //  },
  //  {
  //   title: '效期',
  //   dataIndex: 'xq'
  //  },
  //  {
  //   title: 'shxydm',
  //   dataIndex: 'shxydm'
  //  },
  //  {
  //   title: '药品标示贮藏条件',
  //   dataIndex: 'ypbscctj'
  //  },
  //  {
  //   title: '药品单价',
  //   dataIndex: 'zfypdj'
  //  },
  //  {
  //   title: '药品总价',
  //   dataIndex: 'zfypzj'
  //  },
  //  {
  //   title: '结算方式',
  //   dataIndex: 'jsfs'
  //  },
  //  {
  //   title: '支付单位',
  //   dataIndex: 'zfdw'
  //  },
  //  {
  //   title: '支付单位联系人',
  //   dataIndex: 'zfdwlxr'
  //  },
  //  {
  //   title: '通讯地址',
  //   dataIndex: 'txdz'
  //  },
  //  {
  //   title: '支付金额',
  //   dataIndex: 'zfje'
  //  },
  //  {
  //   title: '支付日期',
  //   dataIndex: 'zfrq'
  //  },
  //  {
  //   title: '收款单位提供票据',
  //   dataIndex: 'skdwtgpj'
  //  },
  //  {
  //   title: '收款单位联系人',
  //   dataIndex: 'skdwlxr'
  //  },
  //  {
  //   title: '收款单位电话',
  //   dataIndex: 'skdwlxdh'
  //  },
  //  {
  //   title: '其他说明',
  //   dataIndex: 'qtsm'
  //  },
  //  {
  //   title: '新版抽样环节',
  //   dataIndex: 'newcyhj'
  //  },
  //  {
  //   title: '新版抽样地点性质',
  //   dataIndex: 'newcyddxz'
  //  },
  //  {
  //   title: '新版药品大类',
  //   dataIndex: 'newypdl'
  //  },
  //  {
  //   title: '新版药品细类',
  //   dataIndex: 'newypxl'
  //  },
  //  {
  //   title: '来源',
  //   dataIndex: 'ly'
  //  },
  //  {
  //   title: '是否委托生产',
  //   dataIndex: 'sfwtsc'
  //  },
  //  {
  //   title: '新版生产日期',
  //   dataIndex: 'newscrq'
  //  },
  //  {
  //   title: '支付单位联系电话',
  //   dataIndex: 'zfdwlxrdh'
  //  },
  //  {
  //   title: '生产单位地址(删)',

  //   dataIndex: 'bsscdwdz'
  //  },
  //  {
  //   title: 'bsccdwsfsc',
  //   dataIndex: 'bsccdwsfsc'
  //  },
  //  {
  //   title: 'stfssds',
  //   dataIndex: 'stfssds'
  //  },
  //  {
  //   title: 'stfssqx',
  //   dataIndex: 'stfssqx'
  //  },
  //  {
  //   title: 'stfdwdz',
  //   dataIndex: 'stfdwdz'
  //  },
  //  {
  //   title: 'zzlx',
  //   dataIndex: 'zzlx'
  //  },
  //  {
  //   title: 'zzdm',
  //   dataIndex: 'zzdm'
  //  },
  //  {
  //   title: 'ypbczt',
  //   dataIndex: 'ypbczt'
  //  },
  //  {
  //   title: 'starttime',
  //   dataIndex: 'starttime'
  //  },
  //  {
  //   title: 'endtime',
  //   dataIndex: 'endtime'
  //  },
  //  {
  //   title: 'zxrw',
  //   dataIndex: 'zxrw'
  //  },
  //  {
  //   title: 'bcydwlb',
  //   dataIndex: 'bcydwlb'
  //  },
  //  {
  //   title: 'dwxzxl',
  //   dataIndex: 'dwxzxl'
  //  },
  //  {
  //   title: 'scpzhgjsl',
  //   dataIndex: 'scpzhgjsl'
  //  },
  //  {
  //   title: 'scpzhgjsldw',
  //   dataIndex: 'scpzhgjsldw'
  //  },
  //  {
  //   title: 'kcsl',
  //   dataIndex: 'kcsl'
  //  },
  //  {
  //   title: 'kcsldw',
  //   dataIndex: 'kcsldw'
  //  },
  //  {
  //   title: 'kcjz',
  //   dataIndex: 'kcjz'
  //  },
  //  {
  //   title: 'uploadtype',
  //   dataIndex: 'uploadtype'
  //  },
  //  {
  //   title: 'deleteFlag',
  //   dataIndex: 'deleteFlag'
  //  },
  //  {
  //   title: 'dzzzFlag',
  //   dataIndex: 'dzzzFlag'
  //  },
  //  {
  //   title: 'isupload',
  //   dataIndex: 'isupload'
  //  },
  //  {
  //   title: 'syncQyda',
  //   dataIndex: 'syncQyda'
  //  },
  //  {
  //   title: 'version',
  //   dataIndex: 'version'
  //  },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: '抽样单位id',
    field: 'cydwid',
    component: 'Input'
  },
 {
    label: '抽样单位名称',
    field: 'cydwmc',
    component: 'Input'
  },
  {
    label: '抽验级别', field: 'cyjb', component: 'JDictSelectTag', componentProps: { dictCode: 'CYJB-1', stringToNumber: false }, disabledLabelWidth: true
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '抽样单位id',
    field: 'cydwid',
    component: 'Input',
  },
  {
    label: '抽样单位名称',
    field: 'cydwmc',
    component: 'Input',
  },
  {
    label: '检验单位id',
    field: 'jydw',
    component: 'Input',
  },
  {
    label: '检验单位名称',
    field: 'jydwmc',
    component: 'Input',
  },
  {
    label: '抽样环节',
    field: 'cyhj',
    component: 'Input',
  },
  {
    label: '抽验目的---->对应【检验报告书】中（检验目的）',
    field: 'cymd',
    component: 'Input',
  },
  {
    label: '抽验目的细化类别',
    field: 'cymdxhlb',
    component: 'Input',
  },
  {
    label: '抽样日期',
    field: 'cyrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '抽样单编号',
    field: 'cybh',
    component: 'Input',
  },

  {
    label: '是否基药',
    field: 'sfjy',
    component: 'Input',
  },
  {
    label: '药品商品名',
    field: 'ypspm',
    component: 'Input',
  },
  {
    label: '生产单位(委托方)---->对应【检验报告书】中（生产单位或产地）',
    field: 'bsccdw',
    component: 'Input',
  },
  {
    label: '生产单位曾用名',
    field: 'bsccdycym',
    component: 'Input',
  },
  {
    label: '生产单位所属省份',
    field: 'bsccdwsssf',
    component: 'Input',
  },
  {
    label: '生产单位所属地市',
    field: 'bsscdwssds',
    component: 'Input',
  },
  {
    label: '生产单位所属区/县',
    field: 'bsscdwssqx',
    component: 'Input',
  },
  {
    label: '生产单位(受托方)',
    field: 'stfscdw',
    component: 'Input',
  },
  {
    label: '受托方所属省份',
    field: 'stfsssf',
    component: 'Input',
  },
  {
    label: '制剂规格---->对应【检验报告书】中（规格）',
    field: 'zjgg',
    component: 'Input',
  },
  {
    label: '包装规格',
    field: 'bzgg',
    component: 'Input',
  },
  {
    label: '批号---->对应【检验报告书】中（批号）',
    field: 'ph',
    component: 'Input',
  },
  {
    label: '剂型---->对应【检验报告书】中（剂型）',
    field: 'jx',
    component: 'Input',
  },
  {
    label: '生产日期',
    field: 'scrq',
    component: 'Input',
  },
  {
    label: '有效期',
    field: 'yxrq',
    component: 'Input',
  },
  {
    label: '有效期至---->对应【检验报告书】中（有效期至）',
    field: 'yxqz',
    component: 'Input',
  },
  {
    label: '批准文号',
    field: 'pzwh',
    component: 'Input',
  },
  {
    label: '抽样执行标准---->对应【检验报告书】中（检验依据）(说明书标示)',
    field: 'zxbz',
    component: 'Input',
  },
  {
    label: '被抽样单位id',
    field: 'bcydwid',
    component: 'Input',
  },
  {
    label: '被抽样单位名称---->对应【检验报告书】中（供样单位）',
    field: 'bcydwmc',
    component: 'Input',
  },
  {
    label: '被抽样单位地址',
    field: 'bcydwdz',
    component: 'Input',
  },
  {
    label: '被抽样单位联系人',
    field: 'bcydwcylxr',
    component: 'Input',
  },
  {
    label: '被抽样单位电话',
    field: 'bcydwdh',
    component: 'Input',
  },
  {
    label: '被抽样单位邮编',
    field: 'yb',
    component: 'Input',
  },
  {
    label: '药品大类',
    field: 'ypdl',
    component: 'Input',
  },
  {
    label: '药品细类',
    field: 'ypxl',
    component: 'Input',
  },
  {
    label: '内包装---->对应【检验报告书】中（包装）',
    field: 'nbz',
    component: 'Input',
  },
  {
    label: '外包装情况',
    field: 'wbzqk',
    component: 'Input',
  },
  {
    label: '抽样地点',
    field: 'cydd',
    component: 'Input',
  },
  {
    label: '样品贮存温度(℃)',
    field: 'ypzcwd',
    component: 'Input',
  },
  {
    label: '样品贮存相对湿度(%)',
    field: 'ypzcxdsd',
    component: 'Input',
  },
  {
    label: '样品包装',
    field: 'ypbz',
    component: 'Input',
  },
  {
    label: '抽样数量---->对应【检验报告书】中（检品数量）',
    field: 'cysl',
    component: 'Input',
  },
  {
    label: '留样数量',
    field: 'lysl',
    component: 'Input',
  },
  {
    label: '抽样单位经手人id',
    field: 'cydwjsrqmid',
    component: 'Input',
  },
  {
    label: '抽样单位经手人签名---->对应【检验报告书】中（抽样人）'
,
    field: 'cydwjsrqm',
    component: 'Input',
  },
  {
    label: '被抽样单位经手人签名',
    field: 'bcydwjsrqm',
    component: 'Input',
  },
  {
    label: '新数据=0或空已交换的数据=1（由交换工具更新）',
    field: 'flagSjzx',
    component: 'Input',
  },
  {
    label: '送检日期',
    field: 'sjrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '药品原料',
    field: 'ypyl',
    component: 'Input',
  },
  {
    label: '药品制剂',
    field: 'ypzj',
    component: 'Input',
  },
  {
    label: '特殊药品',
    field: 'tsyp',
    component: 'Input',
  },
  {
    label: '抽样地点性质',
    field: 'cyddxz',
    component: 'Input',
  },
  {
    label: '被抽样单位所在省份',
    field: 'bcydwsssf',
    component: 'Input',
  },
  {
    label: '被抽样单位所在地市',
    field: 'bcydwssds',
    component: 'Input',
  },
  {
    label: '被抽样单位所在县',
    field: 'bcydwssqx',
    component: 'Input',
  },
  {
    label: '抽样说明',
    field: 'cysm',
    component: 'Input',
  },
  {
    label: '抽验级别',
    field: 'cyjb',
    component: 'Input',
  },
  {
    label: '抽样单位所属省份',
    field: 'cydwsssf',
    component: 'Input',
  },
  {
    label: '抽样单位所属地市',
    field: 'cydwssds',
    component: 'Input',
  },
  {
    label: '抽样单位所属县',
    field: 'cydwssx',
    component: 'Input',
  },
  {
    label: '年度',
    field: 'nd',
    component: 'Input',
  },
  {
    label: '质量受控代码',
    field: 'zlskdm',
    component: 'Input',
  },
  {
    label: '抽样单位联系电话',
    field: 'cydwlxdh',
    component: 'Input',
  },
  {
    label: '抽样单位联系人',
    field: 'cydwlxr',
    component: 'Input',
  },
  {
    label: '生产单位详细地址',
    field: 'scdwxxdz',
    component: 'Input',
  },
  {
    label: '检验单位所属省份',
    field: 'jydwsssf',
    component: 'Input',
  },
  {
    label: '检验单位所属地市',
    field: 'jydwssds',
    component: 'Input',
  },
  {
    label: '检验单位所属县',
    field: 'jydwssx',
    component: 'Input',
  },
  {
    label: '创建日期',
    field: 'createDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '修改该日期',
    field: 'updateDate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '效期',
    field: 'xq',
    component: 'Input',
  },
  {
    label: 'shxydm',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '药品标示贮藏条件',
    field: 'ypbscctj',
    component: 'Input',
  },
  {
    label: '药品单价',
    field: 'zfypdj',
    component: 'Input',
  },
  {
    label: '药品总价',
    field: 'zfypzj',
    component: 'Input',
  },
  {
    label: '结算方式',
    field: 'jsfs',
    component: 'Input',
  },
  {
    label: '支付单位',
    field: 'zfdw',
    component: 'Input',
  },
  {
    label: '支付单位联系人',
    field: 'zfdwlxr',
    component: 'Input',
  },
  {
    label: '通讯地址',
    field: 'txdz',
    component: 'Input',
  },
  {
    label: '支付金额',
    field: 'zfje',
    component: 'Input',
  },
  {
    label: '支付日期',
    field: 'zfrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '收款单位提供票据',
    field: 'skdwtgpj',
    component: 'Input',
  },
  {
    label: '收款单位联系人',
    field: 'skdwlxr',
    component: 'Input',
  },
  {
    label: '收款单位电话',
    field: 'skdwlxdh',
    component: 'Input',
  },
  {
    label: '其他说明',
    field: 'qtsm',
    component: 'Input',
  },
  {
    label: '新版抽样环节',
    field: 'newcyhj',
    component: 'Input',
  },
  {
    label: '新版抽样地点性质',
    field: 'newcyddxz',
    component: 'Input',
  },
  {
    label: '新版药品大类',
    field: 'newypdl',
    component: 'Input',
  },
  {
    label: '新版药品细类',
    field: 'newypxl',
    component: 'Input',
  },
  {
    label: '来源',
    field: 'ly',
    component: 'Input',
  },
  {
    label: '是否委托生产',
    field: 'sfwtsc',
    component: 'Input',
  },
  {
    label: '新版生产日期',
    field: 'newscrq',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: '支付单位联系电话',
    field: 'zfdwlxrdh',
    component: 'Input',
  },
  {
    label: '生产单位地址(删)'
,
    field: 'bsscdwdz',
    component: 'Input',
  },
  {
    label: 'bsccdwsfsc',
    field: 'bsccdwsfsc',
    component: 'Input',
  },
  {
    label: 'stfssds',
    field: 'stfssds',
    component: 'Input',
  },
  {
    label: 'stfssqx',
    field: 'stfssqx',
    component: 'Input',
  },
  {
    label: 'stfdwdz',
    field: 'stfdwdz',
    component: 'Input',
  },
  {
    label: 'zzlx',
    field: 'zzlx',
    component: 'Input',
  },
  {
    label: 'zzdm',
    field: 'zzdm',
    component: 'Input',
  },
  {
    label: 'ypbczt',
    field: 'ypbczt',
    component: 'Input',
  },
  {
    label: 'starttime',
    field: 'starttime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'endtime',
    field: 'endtime',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'zxrw',
    field: 'zxrw',
    component: 'Input',
  },
  {
    label: 'bcydwlb',
    field: 'bcydwlb',
    component: 'Input',
  },
  {
    label: 'dwxzxl',
    field: 'dwxzxl',
    component: 'Input',
  },
  {
    label: 'scpzhgjsl',
    field: 'scpzhgjsl',
    component: 'Input',
  },
  {
    label: 'scpzhgjsldw',
    field: 'scpzhgjsldw',
    component: 'Input',
  },
  {
    label: 'kcsl',
    field: 'kcsl',
    component: 'Input',
  },
  {
    label: 'kcsldw',
    field: 'kcsldw',
    component: 'Input',
  },
  {
    label: 'kcjz',
    field: 'kcjz',
    component: 'Input',
  },
  {
    label: 'uploadtype',
    field: 'uploadtype',
    component: 'Input',
  },
  {
    label: 'deleteFlag',
    field: 'deleteFlag',
    component: 'Input',
  },
  {
    label: 'dzzzFlag',
    field: 'dzzzFlag',
    component: 'Input',
  },
  {
    label: 'isupload',
    field: 'isupload',
    component: 'Input',
  },
  {
    label: 'syncQyda',
    field: 'syncQyda',
    component: 'Input',
  },
  {
    label: 'version',
    field: 'version',
    component: 'Input',
  },
];
