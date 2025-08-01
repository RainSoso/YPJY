import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import moment from 'moment';

export const columns: BasicColumn[] = [{
  title: '批件号', width: 200, dataIndex: 'bh'
}, {
  title: '药品批准文号', width: 170, dataIndex: 'pzwh'
}, {
  title: '批准日期', width: 130, dataIndex: 'bdsj', format: 'date|YYYY-MM-DD'
}, {
  title: '内容', dataIndex: 'bzxx'
}];


export function getSearchFormSchema(year: number | string | null = null): FormSchema[] {
  let end, start: string = (end = moment(year ? year + '-01-01' : moment(new Date()).format('YYYY-01-01'), 'YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss');
  end = end.add(1, 'year').add(-1, 'day').format('YYYY-MM-DD HH:mm:ss');

  return [{
    label: '所属地市', field: 'xzqhdm', component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }, colProps: { xxl: { span: 5 } }
  },{
    label: '药品批准文号', field: 'pzwh', component: 'JInput'
  }, {
    label: '批准日期', field: 'bdsjRange', component: 'RangePicker', rangeFields: ['bdsj_begin', 'bdsj_end'] ,defaultValue:[start,end]
  }];
}
