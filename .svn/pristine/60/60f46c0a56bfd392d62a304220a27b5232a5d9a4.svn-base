<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle v-if="showTags">
        <MCategoryFilter v-model:value="currentTag" pcode="A02" @change="fastFitler" />
      </template>
      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>
      <template #qymc="{ record }">
        <a-tag color="red" v-if="record.sczk == '0'">停产</a-tag>  {{ record.qymc }}
      </template>
      <template #yppz="{ record }">
        <a-button type="link" class="!px-0" @click="toyppz(record, '-')">{{ record.yppz }}</a-button>
        /
        <a-button type="link" class="!px-0" @click="toyppz(record, '1')">{{ record.yppzZc }}</a-button>
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
    <!-- 表单区域 -->
    <YwQySczkLogModal @register="registerModal" @success="handleSuccess"></YwQySczkLogModal>
  </div>
</template>

<script lang="ts" name="yqyd-ypsc" setup>
import { ref, nextTick, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import TJcQyTjxxModal from './modules/TJcQyTjxxModal.vue';
import { columns, getSearchFormSchema } from './TJcQyTjxx.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl,saveOrUpdate } from './TJcQyTjxx.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import MCategoryFilter from '/@/components/Custom/MCategoryFilter.vue';
import Tools from '/@/utils/tools';
import YwQySczkLogModal from '/@/views/ypsczhjg/yw/qysczklog/modules/YwQySczkLogModal.vue';
const route = useRoute();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls } = useListPage({
  tableProps: {
    api: list,
    columns,
    canResize: false,
    showIndexColumn: true,
    immediate: !route.query?.tags,
    formConfig: {
      labelWidth: 80,
      autoAdvancedCol: 4,
      schemas: getSearchFormSchema(route.query?.year, route.query?.qylx),
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

    beforeFetch(params) {
      if (route.params?.sj) {
        const str = route.params.sj.split(',');
        params.sj = str[0];
        params.csdm = str[1];
        delete params.zslx;
      } else {
        params.zslx = route.path?.endsWith('/yljgzjs') ? '7' : '6';
      }

      if (route.params?.ypqy) {
        const str = route.params.ypqy.split(',');
        params.ypqy = str[0];
        params.csdm = str[1];
      }

      if (route.params?.ypsfyc) {
        const str = route.params.ypsfyc.split(',');
        params.ypsfyc = str[0];
        params.csdm = str[1];
      }
      if (route.params?.gqzs) {
        const str = route.params.gqzs.split(',');
        params.gqzs = str[0];
        params.csdm = str[1];
      }
      if (route.params?.sjqy) {
        params.sjqy = route.params?.sjqy || '';
      }
      if (route.params?.jgqy) {
        params.jgqy = route.params?.jgqy || '';
      }

      // params.tssc=route.params?.tssc||'';
      // params.lx=route.params?.lx||'';
      // params.ypsfyc=route.params?.ypsfyc||'';
      if (route.params?.lx) {
        const str = route.params.lx.split(',');
        params.lx = str[0];
        params.csdm = str[1];
      }
      if (route.params?.tssc) {
        const str = route.params.tssc.split(',');
        params.tssc = str[0];
        params.csdm = str[1];
      }
      if (route.query?.xzqhdm) {
        params.xzqhdm = route.query?.xzqhdm;
      }
      params.column = '12';
      if (route.query?.isYj) {
        params.isYj = route.query.isYj;
        params.year = route.query.year;
      }
      if (route.query?.yydbBabz) params.yydbBabz = route.query.yydbBabz;
      if (route.query?.fjqhdm) params.fjqhdm = route.query.fjqhdm;
      params.xzqhdm = getLikeValue(params.xzqhdm);
      if (route.query?.yppzlx) {
        params.yppzlx = route.query.yppzlx;
        console.log(params);
      }
      if (Tools.getCurrentYear() == params.year) params.isValid = 'Y';
      if (route.query?.forceTags) params.forceTags = route.query.forceTags;
      if (route.query?.iszsgs) params.iszsgs = route.query.iszsgs;
      if (route.query?.scqyqh) params.scqyqh = route.query.scqyqh;
      if (route.query?.zszt) params.zszt = route.query.zszt;
      delete params.column;
      delete params.order;
      return params;
    },
  },
  exportConfig: {
    name: '药品生产企业',
    url: getExportUrl
  },
  importConfig: {
    url: getImportUrl,
  },
});
// ,tags:route.query?.tags
const currentTag = ref('');
const showTags = ref(route.query?.showTags != 'false');

const go = useGo();
const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext;

async function fastFitler(item) {
  let val = item.length ? item[0].code : '';
  await getForm().setFieldsValue({ tags: val ? '*,' + item[0].code + '*' : '' });
  reload();
}
nextTick(() => {
  if (route.query?.tags) {
    fastFitler([{ code: route.query?.tags }]);
  }
});
/**
 * 新增事件
 */
function handleAdd(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: false,
    showFooter: true,
  });
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
    saveOrUpdate(JSON.parse(JSON.stringify(record)),true);
    reload();
}
/**
 * 详情
 */
function handleDetail(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: false,
  });
}
/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteOne({ id: record.id }, reload);
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, reload);
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
  let stopOrStartLabel = '备注';
  let authValue = ['jc:qy:qytc:edit','jc:qy:qyfc:edit'];
  return [
    {
      label: '详情',
      onClick: getGo.bind(null, record),
    },
    {
      label: stopOrStartLabel,auth:authValue,
      onClick: handleAdd.bind(null,record),
    },
  ];
}

function getGo(record: Recordable) {
  //  go('ypsc/TJcQyJbxxList/${encodeURIComponent(record.id || '')}'+'/'+record.qyid)
  go({ path: `/yqyd/ypsc/TJcQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm, query: { forceTags: route.query.forceTags } });
}

function toyppz(record: Recordable, sczk) {
  go({ path: '/ypyd/gcyppz/' + record.shxydm + '/' + sczk, query: { year: record.year, forceTags: route.query.forceTags } });
}

function torcjg(record: Recordable) {
  go('/yw/rcjg/' + record.shxydm);
}

function tozfcf(record: Recordable) {
  go('/yw/zfcf/' + record.shxydm);
}

// function tocy(record: Recordable) {
//   go('/yw/ypcyjl/' + record.shxydm);
// }

function tocy(record: Recordable, jyjg) {
  go('/yw/ypcyjl/' + record.shxydm + '/' + jyjg);
}
</script>
<style scoped>
</style>
