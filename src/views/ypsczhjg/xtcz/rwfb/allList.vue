<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <CpEventModal @register="registerModal" @success="handleSuccess"></CpEventModal>
  </div>
</template>

<script lang="ts" name="xtcz-cpEvent" setup>
import { ref, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { omit } from 'lodash-es';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import CpEventModal from './components/CpEventModal.vue';
import { columns, getSearchFormSchema } from './CpEvent.data';
import { allList, deleteOne, batchDelete, getImportUrl, getExportUrl, getExportWordUrl, batchSend } from './CpEvent.api';
import { message } from 'ant-design-vue';
import { defHttp } from '/@/utils/http/axios';
import { JSelectDept } from '/@/components/Form';
import { useGo } from '/@/hooks/web/usePage';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
import Tools from '/@/utils/tools';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';

const route = useRoute();
const go = useGo();
const params = ref({ qyTags: [] });
const importPara = ref({ file: { file: {} } });
const visible = ref(false);
const addModel = ref(false);
const category = ref("");
const onImportModel = ref(false);
const isFxcz = computed(() => 0 <= route.path.indexOf('/fxcz/'));
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
//注册model
const [registerModal, { openModal }] = useModal();
const [registerQyModal, { openModal: openQyModal }] = useModal();

//注册table数据
const { prefixCls, tableContext, onImportXls, onExportXls: onExporWord } = useListPage({
  tableProps: {
    title: 'cp_event',
    showIndexColumn: true,
    api: allList,
    columns,
    canResize: false,
    formConfig: {
      labelWidth: 80,
      schemas: [
        {
          label: "标题",
          field: 'title',
          component: 'Input',
          colProps: { span: 6 },
        },
        {
          label: "状态",
          field: 'state',
          component: 'JDictSelectTag',
          componentProps: { dictCode: 'xtcz_state', showChooseOption: false }
          , colProps: { xxl: { span: 4 } },
        },
      ],
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [],
      fieldMapToTime: [],
    },
    actionColumn: {
      width: 150,
      fixed: 'right',
    },
    beforeFetch(params) {
      params.category = '0';
      return params;
    },
  },
  exportConfig: {
    name: "cp_gcfxcz",
    url: getExportWordUrl,
  },
  importConfig: {
    url() {
      let url = getImportUrl + '';
      return url + (0 > url.indexOf('?') ? '?' : '&') + Tools.toUrlParams({ ...omit(importPara.value, 'file') });
    },
    success: handleSuccess
  },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
    showFooter: true,
  });
}

/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}

function toTaskDetail(record) {
  go({ path: '/rwfb/allDetail', query: { id: record.id } });
}
/**
 * 操作栏
 */
function getTableAction(record) {
  let array: any = [];
  array.push({
    label: '查看',
    onClick: toTaskDetail.bind(null, record),
  });
  return array;
}
</script>

<style scoped></style>