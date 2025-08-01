<template>
  <div>
    <BasicTable @register="registerTable" class="my-basic-table">
      <template #yppz="{ record }">
        <a-button type="link" class="!px-0" @click="toYppz(record)">{{ record.yppz }}</a-button>
      </template>
      <template #rcjg="{ record }">
        <a-button type="link" @click="toJdjc(record)">{{ record.jdjc }}</a-button>
      </template>
      <template #zfcf="{ record }">
        <a-button type="link" @click="toZfcf(record)">{{ record.zfcf }}</a-button>
      </template>
      <template #cy="{ record }">
        <a-button type="link" class="!px-0" @click="toCjy(record, '-')">{{ record.cjy }}</a-button>
        /
        <a-button type="link" class="!px-0" @click="toCjy(record, '2')" danger ghost>{{ record.cjyBhg }}</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="yqyd-ybc" setup>
import { BasicTable, TableAction, BasicColumn } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { useTabs } from '/@/hooks/web/useTabs';
import { useRoute } from 'vue-router';
import { columns, getSearchFormSchema } from '/@/views/ypsczhjg/jc/TJcQyTjxx.data';
import { list } from '/@/views/ypsczhjg/jc/TJcQyTjxx.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import Tools from '/@/utils/tools';

const props = defineProps({
  zslx: propTypes.string.def('201020'),
});

const go = useGo();
const route = useRoute();
const { setTitle } = useTabs();
if (route.query?.tagTitle) setTitle(route.query?.tagTitle + '');

const { tableContext } = useListPage({
  tableProps: {
    api: list,
    showIndexColumn: true,
    columns: filterColumns(columns),
    canResize: false,
    formConfig: {
      labelWidth: 80,
      schemas: getSearchFormSchema(route.query?.year),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    actionColumn: { width: 90, fixed: 'right' },
    defSort: { column: '', order: 'desc' },
    beforeFetch(params) {
      params.zslx = props.zslx;
      if (route.query?.isYj) {
        params.isYj = route.query.isYj;
        params.year = route.query.year;
        params.xzqhdm = route.query.xzqhdm;
      }
      params.xzqhdm = getLikeValue(params.xzqhdm);
      // if (Tools.getCurrentYear() == params.year) params.isValid = 'Y';
      if (params.ypscqylx == '0') delete params.ypscqylx;
      return params;
    },
  },
});
const [registerTable] = tableContext;

function filterColumns(columns: BasicColumn[]): BasicColumn[] {
  // columns.forEach((item) => {
  //     if (item.dataIndex == 'yppz') item.title = getDictText('qyTjxxZslx', props.zslx) + '品种';
  // });
  return [
    {
      title: '统一社会信用代码',
      dataIndex: 'shxydm',
      width: 200,
      sorter: true,
      defaultHidden: true,
    },
    {
      title: '企业名称',
      dataIndex: 'qymc',
      width: 300,
      sorter: true,
    },
    {
      title: '所属地市',
      dataIndex: 'xzqhdm',
      format: 'areaCode',
      width: 110,
      sorter: true,
    },
    {
      title: getDictText('qyTjxxZslx', props.zslx) + '品种',
      dataIndex: 'yppz',
      width: 130,
      slots: { customRender: 'yppz' },
      sorter: true,
    },
    {
      title: '监督检查',
      dataIndex: 'rcjg',
      width: 70,
      slots: { customRender: 'rcjg' },
    },
    {
      title: '稽查执法',
      dataIndex: 'zfcf',
      width: 70,
      sorter: true,
      slots: { customRender: 'zfcf' },
    },
    {
      title: '抽检总数/不合格数量',
      dataIndex: 'cy',
      width: 130,
      slots: { customRender: 'cy' },
    },
    {
      title: '信用评级',
      dataIndex: 'xypj',
      width: 70,
      sorter: true,
    },
  ];
}
function getTableAction(record) {
  return [
    {
      label: '详情',
      onClick() {
        go({ path: '/yqyd/ybc/view/' + encodeURIComponent(record.shxydm || ''), query: { zslx: props.zslx } });
      },
    },
  ];
}
function toYppz(record: Recordable) {
  let type = 'ybc';
  if (record.zslx == '201021') type = 'yyfl';
  else if (record.zslx == '201022') type = 'yly';
  go({ path: '/ypyd/' + type, query: { shxydm: record.shxydm } });
}
function toJdjc(record: Recordable) {
  go('/yw/rcjg/' + record.shxydm);
}
function toZfcf(record: Recordable) {
  go('/yw/zfcf/' + record.shxydm);
}
function toCjy(record: Recordable, jyjg) {
  go('/yw/ypcyjl/' + record.shxydm + '/' + jyjg);
}
</script>