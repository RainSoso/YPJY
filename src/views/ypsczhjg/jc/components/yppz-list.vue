<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle v-if="props.showTags">
        <MCategoryFilter v-model:value="currentTag" :forceTags="props.forceTags" pcode="A02" @change="fastFitler" />
      </template>
      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" v-if="props.showExport"> 导出 </a-button>
      </template>

      <template #cjqk="{ record }">
        <span v-if="record.cjcs > 0">今年已抽</span>
        <span v-else-if="record.cjcs3 > 0">近3年已抽</span>
      </template>
      <template #cjNum="{ record }">
        <a-button type="link" class="!px-2" @click="expandRow(record)">{{ record.cjNum || 0 }}</a-button>
      </template>

      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>

      <template #jdjcNum="{ record }">
        <a-button type="link" class="!px-2" @click="expandRow(record)">{{ record.jdjcNum || 0 }}</a-button>
      </template>
      <!--子表格-->
      <template #expandedRowRender="{ record }">
        <div style="margin: -12px -8px" v-if="props.showJcmx">
          <jcxxList :pzwh="record.yppzwh" :year="record.year" />
        </div>
        <div style="margin: -12px -8px" v-if="props.showJdjc">
          <rcjgList :pzwh="record.yppzwh" :year="record.year" />
        </div>
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="ypyd-gcyppz" setup>
import { ref, computed, unref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { BasicTable, TableAction, FormSchema, BasicColumn } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { useTabs } from '/@/hooks/web/useTabs';
import { useGo } from '/@/hooks/web/usePage';
import { getColumns, getSearchFormSchema } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.data';
import { list, getImportUrl, getExportUrl } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.api';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import jcxxList from '/@/views/ypsczhjg/jc/pz/components/jcxx-list.vue';
import rcjgList from '/@/views/ypsczhjg/yw/rcjg/rcjg-list.vue';
import MCategoryFilter from '/@/components/Custom/MCategoryFilter.vue';

const props = defineProps({
  tagTitle: propTypes.string.def('') /* 页签标题 */,
  searchFormSchema: propTypes.array.def(undefined),
  columns: propTypes.array.def(undefined),
  forceTags: propTypes.array.def([]) /* 强制过滤标签 */,
  showTags: propTypes.bool.def(true) /* 是否显示标签 */,
  showJcmx: propTypes.bool.def(false) /* 是否显示集采明细 */,
  showJdjc: propTypes.bool.def(false) /* 是否显示监督检查次数 */,
  showExport: propTypes.bool.def(true) /* 是否显示导出按钮 */,
});

const { setTitle } = useTabs();
const go = useGo();
const route = useRoute();
const expandedRowKeys = ref<string[]>([]);

watch(
  () => props.tagTitle,
  () => {
    if (props.tagTitle) setTitle(props.tagTitle);
  },
  { immediate: true }
);

//注册table数据
const { tableContext, onExportXls } = useListPage({
  tableProps: {
    showIndexColumn: true,
    rowKey: 'yppzwh',
    api: list,
    columns: props.columns || getColumns(props.showJcmx),
    canResize: false,
    expandRowByClick: props.showJcmx,
    expandIcon() {},
    expandIconAsCell: false,
    expandedRowKeys,
    formConfig: {
      labelWidth: 90,
      schemas: props.searchFormSchema || getSearchFormSchema(route),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
      async resetFunc() {
        currentTag.value = '';
      },
    },
    actionColumn: {
      width: 90,
      fixed: 'right',
    },
    defSort: {
      column: !props.showJcmx ? (!props.showJdjc ? '' : 'jdjcNum desc,cyrshxydm,shxydm') : 'cjNum',
      order: !props.showJcmx ? (!props.showJdjc ? 'desc' : 'asc') : 'desc',
    },
    beforeFetch(params) {
      params.pzzt = '1';
      if (route.params?.cy) {
        params.cy = route.params.cy;
      }
      if (route.params?.tz) {
        params.tz = route.params.tz;
      }
      if (route.params?.sfzcpz) {
        params.sfzcpz = route.params.sfzcpz;
      }
      if (route.params?.sfzs || route.query?.sfzs) {
        params.sfzs = route.params.sfzs || route.query?.sfzs || '' ;
      }
      if (route.params.zc != null) {
        params.sczk = '1';
      } else {
        params.sczk = (route.params?.sczk != '-' && route.params?.sczk) || params.sczk || undefined;
      }
      if (route.params.pzwh != null) {
        const str = route.params.pzwh.split(',');
        params.ypfl = '3';
        params.xzqhdm = str[1];
      }
      if (route.params?.tsyp) {
        const str = route.params.tsyp.split(',');
        params.tsyp = str[0];
        params.xzqhdm = str[1];
      }
      if (route.params?.qz) {
        const str = route.params.qz.split(',');
        params.qz = str[0];
        params.xzqhdm = str[1];
      }
      if (route.params?.ypfl) {
        const str = route.params.ypfl.split(',');
        params.ypfl = str[0];
        params.xzqhdm = str[1];
      }
      if (route.params?.jc) {
        // params.tags = '*,A02A09A03,*';
        const str = route.params.jc.split(',');
        if (null != str[1]) {
          params.xzqhdm = str[1];
        }
      }
      if (route.query?.xzqhdm) {
        params.xzqhdm = route.query.xzqhdm;
      }
      params.wh = route.params?.wh || '';
      params.forceTags = unref(queryForceTags);
      if (props.showJcmx) params.showJcmx = props.showJcmx;
      else if (props.showJdjc) params.showJdjc = props.showJdjc;
      if (route.query?.tags) params.tags = '*,' + route.query?.tags + '*';
      if (route.query?.levels) params.levels = route.query?.levels;
      if (route.query?.scAreaCode) params.scAreaCode = route.query?.scAreaCode;
      if (route.query?.jdjczt) params.jdjczt = route.query?.jdjczt;
      if (route.query?.cjyzt) params.cjyzt = route.query?.cjyzt;
      if (route.query?.zszt) params.zszt = route.query?.zszt;
      if (route.query?.year) params.year = route.query?.year;
      if (route.query?.pzbq) params.pzbq = route.query.pzbq;
      if (route.query?.sczk) params.sczk = route.query.sczk;
      if (route.qfr?.cyr) params.cyr = route.query.cyr;
      params.levels = route.query?.levels;
      params.delFlag = 0;
      params.shxydm = route.params?.shxydm || params.shxydm || undefined;
      if (route.query?.yppzlx) {
        (params.year = route.query.year), (params.xzqhdm = route.query.xzqhdm), (params.yppzlx = route.query.yppzlx), (params.isYj = route.query.isYj),(params.pzfw = "1");
      }
      return params;
    },
  },
  exportConfig: {
    name: '国产药品品种',
    url: getExportUrl,
    params: {
      jc: route.params?.jc,
      levels: route.query?.levels,
      tags: route.query?.tags,
      forceTags: props.forceTags.join('|'),
      scAreaCode: route.query?.scAreaCode,
      jdjczt: route.query?.jdjczt,
      cjyzt: route.query?.cjyzt,
      zszt: route.query?.zszt,
      year: route.query?.year,

    },
  },
  importConfig: {
    url: getImportUrl,
  },
});

const [registerTable, { reload, getForm, expandAll }, { rowSelection, selectedRowKeys }] = tableContext;

const currentTag = ref(''),
  queryForceTags = computed(() => {
    return route.query?.forceTags || props.forceTags.join('|');
  });
async function fastFitler(item) {
  let val = item.length ? item[0].code : '';
  await getForm().setFieldsValue({ tags: val ? '*,' + item[0].code + '*' : '' });
  reload();
}

function expandRow(record) {
  let idx = expandedRowKeys.value.indexOf(record.yppzwh);
  if (0 > idx) expandedRowKeys.value.push(record.yppzwh);
  else expandedRowKeys.value.splice(idx, 1);
}

/**
 * 详情
 */
function handleDetail(record: Recordable) {
  go(`/ypyd/detail/${encodeURIComponent(record.yppzwh || '')}`);
}
/**
 * 成功回调
 */
function handleSuccess({ isUpdate, values }) {
  reload();
}
/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    },
  ];
}
</script>
<style scoped>
</style>
