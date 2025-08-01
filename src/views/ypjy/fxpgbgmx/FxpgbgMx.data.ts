import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
  {
    title: '辖区',
    dataIndex: 'city',
    width: 20,
    //colSpan: 2,
   },
  {
    title: '企业类型',
    dataIndex: 'type',
    customRender({ text }) {
      var str = '批发企业';
      if (text == '02') {
        str = '零售连锁总部';
      }
      return str;
    },
     width: 20,
    // customCell: (_, index) =>{
    //   if (index === 4) {
    //     return { colSpan: 0 };
    //   }
    // }

   },
    
  //  {
  //   title: '区划代码',
  //   dataIndex: 'xzqhdm'
  //  },
   {
    title: '企业数量',
    dataIndex: 'qysl',
     width: 20,
    // customCell: (_, index) =>{
    //   if (index === 4) {
    //     return { colSpan: 0 };
    //   }
    // }
   },
   {
    title: '检查家次',
    dataIndex: 'jcjc',
    width: 20,
    slots: { customRender: 'jcjc' }
   },
   {
    title: '限期整改家次',
    dataIndex: 'xqzg',
    width: 20,
    slots: { customRender: 'xqzg' }
   },
   {
    title: '立案数',
    dataIndex: 'las',
    width: 20,
    slots: { customRender: 'las' }
   },
   {
    title: '结案数',
    dataIndex: 'jas',
    width: 20,
    slots: { customRender: 'jas' }
   },
   {
    title: '罚没款合计',
    dataIndex: 'fmkhj',
    width: 20,
   },
   {
    title: '吊销许可证家次',
    dataIndex: 'dxxkz',
    width: 20,
    slots: { customRender: 'dxxkz' }
   },
  
  //  {
  //   title: '移送公安机关家次',
  //   dataIndex: 'ysgajg'
  //  },
  //  {
  //   title: '通报卫健部门家次',
  //   dataIndex: 'tbwjw'
  //  },
];

export const columnsQy: BasicColumn[] = [
  // {
  //   title: '企业类型',
  //   dataIndex: 'type',
  //   customRender({ text }) {
  //     var str = '批发企业';
  //     if (text == '02') {
  //       str = '零售连锁总部';
  //     }
  //     return str;
  //   },
  //   width: 20

  //  },
   {
    title: '企业名称',
    dataIndex: 'qymc',
    width: 40
   
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm',
    width: 40
    
   },
   {
    title: '检查家次',
    dataIndex: 'jcjc',
    width: 20,
    slots: { customRender: 'jcjc' }
    
   },
   {
    title: '限期整改家次',
    dataIndex: 'xqzg',
    width: 20,
    slots: { customRender: 'xqzg' }
   },
   {
    title: '立案数',
    dataIndex: 'las',
    width: 20,
    slots: { customRender: 'las' }
   },
   {
    title: '结案数',
    dataIndex: 'jas',
    width: 20	,
    slots: { customRender: 'jas' }
   },
   {
    title: '罚没款合计',
    dataIndex: 'fmkhj',
    width: 20
   },
   {
    title: '吊销许可证家次',
    dataIndex: 'dxxkz',
    width: 20,
    slots: { customRender: 'dxxkz' }
   },

   {
    title: '抽检不合格',
    dataIndex: 'cjbhg',
    width: 20,
    slots: { customRender: 'cjbhg' }
   },
  
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '填报单位',
    field: 'xzqhdm',
    component: 'JDictSelectTag',
    componentProps: { dictCode: 'area_city', showChooseOption: false },
    colProps: { xxl: { span: 6 } }
  },
  {
    label: '时间段',
    field: 'sjd',
    component: 'RangePicker',//DatePicker
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rangeFields: ['begin', 'end']
  },
]; 

export const searchFormSchemaQy: FormSchema[] = [
 
  {
    label: '企业名称',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: '社会信用代码',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: '所属区县',
    field: 'xzqhdm',
    component: 'JAreaSelect',
    componentProps: {
      level: 3, province: '420000', hideProvince: true,
    }
  },
];

export const searchFormSchema1: FormSchema[] = [
  {
    label: '时间段',
    field: 'sjd',
    component: 'RangePicker',//DatePicker
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
    rangeFields: ['begin', 'end']
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: '检查情况统计表主键',
    field: 'rcjgTjid',
    component: 'Input',
  },
  {
    label: '企业类型',
    field: 'qylx',
    component: 'Input',
  },
  {
    label: '企业、机构数量',
    field: 'qysl',
    component: 'Input',
  },
  {
    label: '检查家次',
    field: 'jcjc',
    component: 'Input',
  },
  {
    label: '限期整改家次',
    field: 'xqzg',
    component: 'Input',
  },
  {
    label: '立案数',
    field: 'las',
    component: 'Input',
  },
  {
    label: '结案数',
    field: 'jas',
    component: 'Input',
  },
  {
    label: '罚没款合计',
    field: 'fmhj',
    component: 'Input',
  },
  {
    label: '吊销许可证家次',
    field: 'dxxkz',
    component: 'Input',
  },
  {
    label: '移送公安机关家次',
    field: 'ysgajg',
    component: 'Input',
  },
  {
    label: '通报卫健部门家次',
    field: 'tbwjw',
    component: 'Input',
  },
];
