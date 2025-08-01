import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { getDictItemsByCode } from '/@/utils/dict';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { columnRender } from '/@/utils/dict/dictUtils';

let areaFilters = [];
getDictItemsByCode('sqsx_state').forEach(item => {
  if (0 > '1,2,5'.indexOf(item.value)) areaFilters.push(item);
  if (item.value == '4') {
    getDictItemsByCode('sqsx_currentstep').forEach(item => {
      areaFilters.push(item);
    });
  }
});

export const columns: BasicColumn[] = [{
  title: '编号', dataIndex: 'sqsxSqsx.bh', width: 140, customRender({record}) {
    return record?.tzsBh || record?.slbh || record?.bh;
}},{
  title: '申报编号', dataIndex: 'bh', width: 140, sorter: true ,defaultHidden: true
}, {
  title: '受理编号', dataIndex: 'slsj', width: 160,  customRender({record}) {
    return record.slbh;
  } ,sorter: true, defaultHidden: true
}, {
  title: '通知书编号', dataIndex: 'tzsBh', width: 160, sorter: true, defaultHidden: true
}, {
  title: '事项标题', dataIndex: 'title', sorter: true, slots: { customRender: 'title' }, ellipsis: false
}, {
  title: '申请企业名称', dataIndex: 'sqQymc', width: 300, sorter: true, defaultHidden: true
}, {
  title: '联系人', dataIndex: 'lxrmc', width: 70, sorter: true
}, {
  title: '联系人手机', dataIndex: 'lxrsjh', width: 110, sorter: true
}, {
  title: '提交时间', dataIndex: 'tjsj', width: 160, sorter: true, defaultHidden: true
}, {
  title: '状态', dataIndex: 'dqbz', width: 90,
  customRender: ({ text, record }) => columnRender(text ? 'sqsx_currentstep' : 'sqsx_state', text || record.state)
  , filters: areaFilters, filterMultiple: false
}];

export const dbcolumns: BasicColumn[] = [{
  title: '编号', dataIndex: 'sqsxSqsx.bh', width: 140, customRender({record}) {
    return record.sqsxSqsx?.slbh || record.sqsxSqsx?.bh;
  }
}, {
  title: '事项标题', dataIndex: 'sqsxSqsx.title', ellipsis: false
}, {
  title: '申请企业名称', dataIndex: 'sqsxSqsx.sqQymc', width: 300, defaultHidden: true
}, {
  title: '联系人', dataIndex: 'sqsxSqsx.lxrmc', width: 80
}, {
  title: '联系人手机', dataIndex: 'sqsxSqsx.lxrsjh', width: 120
}, {
  title: '提交时间', dataIndex: 'sqsxSqsx.tjsj', width: 160, defaultHidden: true
}];

export const jdzbcolumns: BasicColumn[] = [{
   title: "编号",
   dataIndex: "bh",
   width: 140,
   sorter: true
   }, {
   title: "事项标题",
   dataIndex: "title",
   sorter: true,
   slots: { customRender: "title" },
   ellipsis: false
   }, {
   title: "联系人",
   dataIndex: "lxrmc",
   width: 80,
   sorter: true
   }, {
   title: "联系人手机",
   dataIndex: "lxrsjh",
   width: 120,
   sorter: true
  }, {
    title: '状态', dataIndex: 'dqbz', width: 90,
    customRender: ({ text, record }) => columnRender(text ? 'sqsx_currentstep' : 'sqsx_state', text || record.state)
    , filters: areaFilters, filterMultiple: false
  }];
export const searchFormSchema: FormSchema[] = [
  {
    label: '', field: 'dqbzs', component: 'Input', show: false,
  },
 {
    label: '事项编号',
    field: 'bh1',
    component: 'Input'
  },
  {
    label: '企业名称',
    field: 'qymc1',
    component: 'Input'
  },
];

export const searchjdzbFormSchema: FormSchema[] = [
  {
    label: '', field: 'dqbzs', component: 'Input', show: false,
  },
 {
    label: '事项编号',
    field: 'bh1',
    component: 'Input'
  },
  {
    label: '标题',
    field: 'title',
    component: 'JInput'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  // {
  //   label: '申请项目(字典值)',
  //   field: 'sqxm',
  //   component: 'Input',
  // },
  {
    label: '申请检查单位名称',
    field: 'qymc',
    component: 'Input',
    required:true
  },
  {
    label: '申请企业社会信用代码',
    field: 'shxydm',
    component: 'Input',
    required:true
  },
  {
    label: '申请检查范围/品种',
    field: 'jcpzfw',
    component: 'Input',
    required:true
  },
  {
    label: '申请检查场地地址',
    field: 'qydz',
    component: 'Input',
    required:true
  },
  {
    label: '申请检查生产车间',
    field: 'jccj',
    component: 'Input',
    colProps: {
      span: 9,
    },
    required:true
  },
  {
    label: '申请检查生产线',
    field: 'jccx',
    component: 'Input',
    colProps: {
      span: 9,
    },
    required:true
  },
  {
    label: '转办意见',
    field: 'jcfqsy',
    component: 'InputTextArea',
    defaultValue:'请你中心按照《药品生产监督管理方法》,GMP等法规要求,实施现场检查和技术评审。其综合评定意见,请及时报我处。',
  },
];
