import { h } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { Button } from 'ant-design-vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import moment from 'moment';

export function getColumns(zslx = null, go: Function | null = null): BasicColumn[] {
  return [
    {
      title: '企业名称', dataIndex: 'qymc', customRender({ record: row }) {
        let path = '';
        const obj = {
          children: row.qymc,
          props: {} as any,
        };

        if (row.rowSpan) {
          obj.props.rowSpan = parseInt(row.rowSpan, 10);
        }

        if (zslx == '6') path = `/yqyd/ypsc/TJcQyJbxxList/${encodeURIComponent(row.qymc || '')}/${encodeURIComponent(row.shxydm || '')}`;
        else if (zslx == '201010') path = `/yqyd/ypsc/TJcQyJbxxList/${encodeURIComponent(row.qymc || '')}/${encodeURIComponent(row.shxydm || '')}?isCyr=true`;
        else if (zslx == '7') path = `/yqyd/yljgzjs/detail/${encodeURIComponent(row.qymc || '')}/${encodeURIComponent(row.shxydm || '')}?isCyr=true`;
        else if (zslx == '201020' || zslx == '201021' || zslx == '201022') path = `/yqyd/ybc/view/${encodeURIComponent(row.shxydm || '')}?zslx=${zslx}`;
        return path ? h(Button, {
          type: 'link', onclick() {
            go && go(path);
          }
        }, () => h('span', {}, obj)) : obj;  
      }
    },
    {
      title: '检查形式', dataIndex: 'jcxs_dictText', width: 140
    }, {
      title: '含GMP符合性检查', dataIndex: 'sfgmp', width: 140, customRender({ record: row }) {
        if (row.sfhgpgssq == '1') return '上市前';
        if (row.sfhgpgssh == '1') return '上市后';
        return row.sfgmp_dictText
      }
    }, {
      title: '检查单位', dataIndex: 'jcdwmc', defaultHidden: true
    }, {
      title: '检查人', dataIndex: 'jcr', width: 140
    }, {
      title: '检查时间', dataIndex: 'jcsj', format: 'date|YYYY-MM-DD', width: 100
    }, {
      title: '综合评定结论', dataIndex: 'zhpdjl_dictText', width: 110
    }, {
      title: '缺陷数量', dataIndex: 'qxsl', width: 175, customRender({ record: row }) {
        return h('div', { style: { display: 'inline-flex', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', margin: '0 4px' } }, [
          h('div', { style: { width: '50%' } }, ['严重：', row.yzqxsl]),
          h('div', { style: { width: '50%' } }, ['主要：', row.zyqxsl]),
          h('div', { style: { width: '50%' } }, ['一般：', row.ybqxsl]),
          h('div', { style: { width: '50%' } }, ['未定义：', row.wdyqxsl])
        ]);
      }
    }, {
      title: '整改报告', dataIndex: 'localZgbg', width: 90, customRender({ record }) {
        return h('div', {}, record.localZgbg ? '已上传' : '');
      }
    }]
}

export const recolumns: BasicColumn[] = [{
  title: '检查形式', dataIndex: 'jcxs_dictText', width: 140
}, {
  title: '含GMP符合性检查', dataIndex: 'sfgmp_dictText', width: 140
}, {
  title: '企业名称', dataIndex: 'qymc'
}, {
  title: '检查单位', dataIndex: 'jcdwmc', defaultHidden: true
}, {
  title: '检查人', dataIndex: 'jcr', width: 140
}, {
  title: '检查时间', dataIndex: 'jcsj', format: 'date|YYYY-MM-DD', width: 100
}, {
  title: '综合评定结论', dataIndex: 'zhpdjl_dictText', width: 110
}, {
  title: '缺陷数量', dataIndex: 'qxsl', width: 175, customRender({ record: row }) {
    return h('div', { style: { display: 'inline-flex', alignItems: 'center', textAlign: 'left', flexWrap: 'wrap', margin: '0 4px' } }, [
      h('div', { style: { width: '50%' } }, ['严重：', row.yzqxsl]),
      h('div', { style: { width: '50%' } }, ['主要：', row.zyqxsl]),
      h('div', { style: { width: '50%' } }, ['一般：', row.ybqxsl]),
      h('div', { style: { width: '50%' } }, ['未定义：', row.wdyqxsl])
    ]);
  }
}, {
  title: '整改报告', dataIndex: 'localZgbg', width: 90, customRender({ record }) {
    return h('div', {}, record.localZgbg ? '已上传' : '');
  }
}, { title: '详情', dataIndex: 'operation', slots: { customRender: 'operation' }, width: 45 }];

export function getSearchFormSchema(year: number | string | null = null, jcxs: string | null = null, route: RouteLocationNormalizedLoaded | null = null): FormSchema[] {
  let end, start: string = (end = moment(year ? year + '-01-01' : moment(new Date()).format('YYYY-01-01'), 'YYYY-MM-DD')).format('YYYY-MM-DD HH:mm:ss');
  end = end.add(1, 'year').add(-1, 'day').format('YYYY-MM-DD HH:mm:ss');

  return [{
    label: '检查单位', field: 'jcdwzzjgdm', component: 'JDictSelectTag', componentProps: { dictCode: 'rcjgJcdw', stringToNumber: false }, colProps: { xxl: { span: 4 } }
  }, {
    label: '企业名称', field: 'qymc', component: 'JInput', colProps: { xxl: { span: 5 } }
  }, {
    label: '检查形式', field: 'jcxs', component: 'JDictSelectTag'
    , componentProps: { dictCode: 'jdjcJcxs', stringToNumber: false }
    , colProps: { xxl: { span: 4 } }, defaultValue: jcxs
  }, {
    label: '综合评定结论', labelWidth: 110, field: 'zhpdjl', component: 'JDictSelectTag',
    componentProps: { dictCode: 'jdjcZhpdjl', stringToNumber: false }
    , colProps: { xxl: { span: 5 } }, defaultValue: route?.query?.zhpdjl
  }, {
    label: '所属地市', field: 'xzqhdm',
    component: 'JDictSelectTag', componentProps: { dictCode: 'area_city' }
    , colProps: { xxl: { span: 4 } }, defaultValue: route?.query?.xzqhdm
  }, {
    label: '检查时间', field: 'jcsjRange', component: 'RangePicker', defaultValue: [start, end], rangeFields: ['jcsj_begin', 'jcsj_end']
    , colProps: { xxl: { span: 5 } }
  }, {
    label: '整改情况', field: 'zgqk', component: 'Select', componentProps: {
      options: [{ label: '未上传整改报告', value: '0' }, { label: '已上传整改报告', value: '1' }]
    }, colProps: { xxl: { span: 4 } }
  }, {
    label: '含GMP符合性检查', labelWidth: 140, field: 'gmpzt', component: 'Select', componentProps: {
      options: [{ label: '上市前', value: '1' }, { label: '上市后', value: '2' }]
    }, colProps: { xxl: { span: 4 } }
  }];
}

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '监管编号',
    field: 'jgbh',
    component: 'Input',
  },
  {
    label: '监管任务编号',
    field: 'jcrwbh',
    component: 'Input',
  },
  {
    label: 'jcrwfjbh',
    field: 'jcrwfjbh',
    component: 'Input',
  },
  {
    label: '监管表单编号',
    field: 'jgbdbh',
    component: 'Input',
  },
  {
    label: '监管表单名称',
    field: 'jgbdmc',
    component: 'Input',
  },
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
    label: '检查人',
    field: 'jcr',
    component: 'Input',
  },
  {
    label: '检查时间',
    field: 'jcsj',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '得分',
    field: 'df',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'bz',
    component: 'Input',
  },
  {
    label: '检查单位名称',
    field: 'jcdwmc',
    component: 'Input',
  },
  {
    label: '检查单位',
    field: 'jcdwzzjgdm',
    component: 'Input',
  },
  {
    label: 'jglbbh',
    field: 'jglbbh',
    component: 'Input',
  },
  {
    label: '检查结果',

    field: 'jcjg',
    component: 'Input',
  },
  {
    label: 'ywbldwxzqhdm',
    field: 'ywbldwxzqhdm',
    component: 'Input',
  },
  {
    label: 'jcgzlx',
    field: 'jcgzlx',
    component: 'Input',
  },
  {
    label: 'lrrbh',
    field: 'lrrbh',
    component: 'Input',
  },
  {
    label: 'lrrxm',
    field: 'lrrxm',
    component: 'Input',
  },
  {
    label: 'jcrIds',
    field: 'jcrIds',
    component: 'Input',
  },
  {
    label: 'sjlydate',
    field: 'sjlydate',
    component: 'DatePicker',
    componentProps: {
      showTime: true,
      valueFormat: 'YYYY-MM-DD hh:mm:ss',
    },
  },
  {
    label: 'yjzd1',
    field: 'yjzd1',
    component: 'Input',
  },
  {
    label: 'yjzd2',
    field: 'yjzd2',
    component: 'Input',
  },
  {
    label: 'flagSjzx',
    field: 'flagSjzx',
    component: 'Input',
  },
  {
    label: 'delflag',
    field: 'delflag',
    component: 'Input',
  },
  {
    label: 'sjly',
    field: 'sjly',
    component: 'Input',
  },
  {
    label: 'hgsjdj',
    field: 'hgsjdj',
    component: 'Input',
  },
  {
    label: 'ezsjdj',
    field: 'ezsjdj',
    component: 'Input',
  },
  {
    label: 'syncSpyj',
    field: 'syncSpyj',
    component: 'Input',
  },
];
