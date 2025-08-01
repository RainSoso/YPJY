import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import { rules} from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';

export const columns: BasicColumn[] = [
    {
    title: '证书类型',
    dataIndex: 'type',
    customRender({ text,record }) {
      var str = '药品生产';
        if(text == '1') {
          str = '药品经营批发';
        } else if(text == '2') {
          str = '药品经营零售';
        }else if(text == '3') {
          str = '经营零售连锁门店';
        }else if(text == '4') {
          str = '经营零售连锁总部';
        }else if(text == '5') {
          str = '药品互联网药品信息';
        }else if(text == '6') {
          str = '网络销售第三方平台';
        }
        return str;
      }
   },
   {
    title: '证书编号',
    dataIndex: 'zsbh'
   },
   {
    title: '企业名称',
    dataIndex: 'qymc'
   },
   {
    title: '社会信用代码',
    dataIndex: 'shxydm'
   },
   
   {
    title: '发证日期',
    dataIndex: 'fzrq',
    customRender({ text,record }) {
      if(text) {
        text = text.substr(0,10);
      }
        return text;
      }
   },
   {
    title: '有效期至',
    dataIndex: 'yxqz',
    customRender({ text,record }) {
      if(text) {
        text = text.substr(0,10);
      }
        return text;
      }
   },
  //  {
  //   title: 'xzqhdm',
  //   dataIndex: 'xzqhdm'
  //  },
];

export const searchFormSchema: FormSchema[] = [
 {
    label: 'type',
    field: 'type',
    component: 'Input'
  },
 {
    label: 'qymc',
    field: 'qymc',
    component: 'Input'
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {label: '', field: 'id', component: 'Input', show: false},
  {
    label: 'type',
    field: 'type',
    component: 'Input',
  },
  {
    label: 'qymc',
    field: 'qymc',
    component: 'Input',
  },
  {
    label: 'shxydm',
    field: 'shxydm',
    component: 'Input',
  },
  {
    label: 'zsbh',
    field: 'zsbh',
    component: 'Input',
  },
  {
    label: 'fzrq',
    field: 'fzrq',
    component: 'Input',
  },
  {
    label: 'yxqz',
    field: 'yxqz',
    component: 'Input',
  },
  {
    label: 'xzqhdm',
    field: 'xzqhdm',
    component: 'Input',
  },
];
