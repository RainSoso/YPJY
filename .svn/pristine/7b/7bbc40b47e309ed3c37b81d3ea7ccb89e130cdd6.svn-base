<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <!-- <template #tableTitle v-if="showTags">
          <MCategoryFilter v-model:value="currentTag" :forceTags="props.forceTags" pcode="A03" @change="fastFitler" />
        </template> -->

      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>

      <template #yppz="{ record }">
        <a-button type="link" class="!px-0" @click="toyppz(record, '-')">{{ record.yppz }}</a-button>
      </template>
      <template #rcjg="{ record }">
        <a-button type="link" @click="torcjg(record)">{{ record.jdjc }}</a-button>
      </template>
      <template #zfcf="{ record }">
        <a-button type="link" @click="tozfcf(record)">{{ record.zfcf }}</a-button>
      </template>
      <template #cy="{ record }">
        <a-button type="link" class="!px-0" @click="tocy(record, '-')">{{ record.cjy }}</a-button>
        /
        <a-button type="link" class="!px-0" @click="tocy(record, '2')" danger ghost>{{ record.cjyBhg }}</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="yqyd-qylist" setup>
import { ref, computed, unref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { useTabs } from '/@/hooks/web/useTabs';
import { columns, getSearchFormSchema } from './YpjyTjxx.data';
import { ypjyList, getImportUrl, getExportUrl } from './YpjyTjxx.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import MCategoryFilter from '/@/components/Custom/MCategoryFilter.vue';
import Tools from '/@/utils/tools';
const props = defineProps({
  lx: propTypes.string.def('11'),
});
const { setTitle } = useTabs();
const zslx = ref();
const route = useRoute();
console.log('route.params', route.params.year);
const xzqh = ref(route.params.xzqh);
const type = ref(route.params.type);
const ifZx = ref(route.params.ifZx);
const cjy = ref(route.params.iscjy);
const zfcf = ref(route.params.iszfcf);
const year = ref(route.params.year);
const isyppf = ref(route.params.isyppf);
const islszb = ref(route.params.islszb);
const xbwjc = ref(route.params.xbwjc);
const wjcqy = ref(route.params.wjcqy);
const jcbhg = ref(route.params.jcbhg);
const cybhg = ref(route.params.cybhg);
const ndzfcf = ref(route.params.ndzfcf);
if (route.params?.zslx) {
  zslx.value = route.params.zslx;
} else {
  zslx.value = props.lx;
}
const currentTag = ref({});
//注册table数据
const { prefixCls, tableContext, onExportXls } = useListPage({
  tableProps: {
    api: ypjyList,
    columns: columns || props.columns,
    canResize: false,
    showIndexColumn: true,
    formConfig: {
      labelWidth: 80,
      schemas: getSearchFormSchema(route.query?.year, zslx.value),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
      async resetFunc() {
        currentTag.value = '';
      }
    },
    actionColumn: {
      width: 90,
      fixed: 'right'
    },
    defSort: {
      column: '',
      order: 'desc'
    },
    beforeFetch(params) {
      if (Tools.getCurrentYear() == params.year) { params.isValid = 'Y' };
      params.zslx = zslx.value;
      params.type = type.value;
      params.xzqh = xzqh.value;
      params.ifZx = ifZx.value;
      params.iscjy = cjy.value;
      params.iszfcf = zfcf.value;
      params.isyppf = isyppf.value;
      params.islszb = islszb.value;
      params.xbwjc = xbwjc.value;
      params.wjcqy = wjcqy.value;
      params.jcbhg = jcbhg.value;
      params.cybhg = cybhg.value;
      params.ndzfcf = ndzfcf.value;
      params.year = year.value;
      if (params.year == undefined) params.year = Tools.getCurrentYear();
      //检查计划完成情况跳转
      if (route.query?.depart) params.depart = route.query.depart;
      if (route.query?.year) params.year = route.query.year;
      if (route.query?.zslx) params.zslx = route.query.zslx;
      if (route.query?.jhmc) params.jhmc = route.query.jhmc;
      //首页图形企业品种跳转
      if (route.query?.yppzmc) params.yppzmc = route.query.yppzmc;
      return params;
    }
  },
  exportConfig: {
    name: "药品经营企业",
    url: getExportUrl,
    params: { zt: '0', zslx: zslx.value, xzqh: xzqh.value, isyppf: isyppf.value, islszb: islszb.value }
  },
  importConfig: {
    url: getImportUrl
  },
})


const go = useGo();
//const [registerTable, { reload, getForm }] = tableContext;
const [registerTable, { reload }, { rowSelection, selectedRowKeys, getForm }] = tableContext

async function fastFitler(item) {
  let val = item.length ? item[0].code : '';
  await getForm().setFieldsValue({ tags: val ? '*,' + item[0].code + '*' : '' });
  reload();
}

/**
   * 操作栏
   */
function getTableAction(record) {
  return [{
    label: '详情',
    onClick: getGo.bind(null, record),
  }]
}
function getGo(record: Recordable) {
  go({ path: `/ypjy/cdwj/CdwjQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm, query: { year: record.year } });
}


function torcjg(record: Recordable) {
  go({ path: `/ypjy/rcjg/RcjgjbxxList/` + record.shxydm + '/' + record.year });
}

function tozfcf(record: Recordable) {
  go({ path: '/yw/zfcf/ypjy/' + record.shxydm, query: { year: record.year } });
}

function tocy(record: Recordable, jyjg) {
  go({ path: '/yw/ypcyjl/ypjy/' + record.shxydm + '/' + jyjg, query: { year: record.year } });
}
</script>
<style scoped></style>