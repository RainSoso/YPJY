import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { array } from 'vue-types';

export function getDateLabel(serviceType: number): string {
  return "发证日期";
  //return serviceType == 1 ? '核发时间' : (serviceType == 3 ? '变更时间' : (serviceType == 4 ? '注销时间' : '公告时间'));
}

export function getColumns(serviceType: number): BasicColumn[] {
  let array: BasicColumn[] = [{
    title: '证书编号', dataIndex: 'zsbh', width: 110
  }, {
    title: '企业名称', dataIndex: 'qymc'
  }, 
  {
    title: '法定代表人', dataIndex: 'fddbr'
  }, 
  {
    title: '发证日期', dataIndex: 'fzrq',
    customRender({ text }) {
      text = text.substr(0,10);
      return text;
    }
  }, 
  {
    title: '有效期至', dataIndex: 'yxqz',
    customRender({ text }) {
      text = text.substr(0,10);
      return text;
    }
  }, 
  {
    title: '证书类型', dataIndex: 'type',
    customRender({ text }) {
      var str = '药品经营批发';
      if(text == '02') {
        str = '药品经营零售连锁总部';
      }
      return str;
    }
  }, 
  {
    title: '状态', dataIndex: 'status',
    customRender({ text }) {
      var str = '有效';
      if(text == '1') {
        str = '无效';
      }
      return str;
    }
  },
  //  {
  //   title: getDateLabel(serviceType), dataIndex: 'ggTime', format: 'date|YYYY-MM-DD', width: 110
  // }
];
  if (3 == serviceType) {
    array.push({
      title: '即将到期天数', dataIndex: 'dqts', width: 110, format(text) {
        return text + ' 天'
      },
    });
  }
  return array;
}

export function getSearchFormSchema(serviceType: number): FormSchema[] {
  let array: FormSchema[] = [{
    label: getDateLabel(serviceType), field: 'ggTimeRange', component: 'RangePicker', rangeFields: ['begin', 'end'], colProps: { xxl: { span: 5 } }
  }, {
    label: '所属区县',
    field: 'xzqhdm',
    component: 'JAreaSelect',
    componentProps: {
      level: 3, province: '420000', hideProvince: true, 
    },
  },
   {
    label: '企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }];
  if (3 == serviceType) {
    array.push({label: '到期范围', field: 'dqRange', component: 'Select', componentProps: {
      options: [{ value: '1M', label: '一个月内' }, { value: '3M', label: '三个月内' }, { value: '6M', label: '六个月内' }, { value: '1Y', label: '一年内' }]
    }
    , colProps: { xxl: { span: 4 } }})
  }
  return array;
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  {
    label: '', field: 'id', component: 'Input', show: false
  }, {
    label: '审批来源0窗口申请,1网上申请,2信函,3电报,4电传,5传真,6邮件,7电子数据交换,8其他', field: 'xzspSource', component: 'Input',
  }, {
    label: '企业主键', field: 'entId', component: 'Input',
  }, {
    label: '统一社会信用代码', field: 'shxydm', component: 'Input',
  }, {
    label: '企业名称', field: 'entName', component: 'Input',
  }, {
    label: '企业地址', field: 'entAddr', component: 'Input',
  }, {
    label: '企业联系电话', field: 'entTel', component: 'Input',
  }, {
    label: '法定代表人', field: 'fddbr', component: 'Input',
  }, {
    label: '联系人', field: 'lxr', component: 'Input',
  }, {
    label: '联系人电话', field: 'lxrTel', component: 'Input',
  }, {
    label: '受理类型(受理类型表)', field: 'acceptType', component: 'Input',
  }, {
    label: '受理类型名称(受理类型表)', field: 'acceptTypeName', component: 'Input',
  }, {
    label: '受理编号(回执表)', field: 'acceptNo', component: 'Input',
  }, {
    label: '申请项目编号(审批项目表)', field: 'serviceId', component: 'Input',
  }, {
    label: '申请项目名称(审批项目表)', field: 'serviceName', component: 'Input',
  }, {
    label: '申请项目类型，1核发、2换证、3变更、4注销、5补证', field: 'serviceType', component: 'Input',
  }, {
    label: '事项编号(审批项目表)', field: 'itemId', component: 'Input',
  }, {
    label: '事项子项编号(审批项目表)', field: 'itemSubId', component: 'Input',
  }, {
    label: '告知方式0不告知1网上告知2短信告知3邮件告知', field: 'tellType', component: 'Input',
  }, {
    label: '公告时间', field: 'ggTime', component: 'DatePicker', componentProps: { showTime: true, valueFormat: 'YYYY-MM-DD hh:mm:ss', },
  }, {
    label: '证书类型(来自XZSP_SERVICE.FJLX)', field: 'zslx', component: 'Input',
  }, {
    label: '证书编号', field: 'zsbh', component: 'Input',
  }, {
    label: '变更内容', field: 'bgnr', component: 'Input',
  },
];
