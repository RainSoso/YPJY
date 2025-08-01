<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
      </template>
      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" class="mr-2"> 导出</a-button>
      </template>
      <template #pzwh="{ record }">
        <a-button type="link" @click="topzwh(record)">{{ record.pzwh }}</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <JcxxModel @register="registerModal" @success="handleSuccess"></JcxxModel>
  </div>
</template>

<script lang="ts" name="jc.pz-jcPzJcxx" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import JcxxModel from '/@/views/ypsczhjg/jc/pz/jcxx/JcxxModal.vue'
import { recolumns, getSearchFormSchema } from './JcPzJcxx.data';
import { list, deleteOne, getExportUrl, getImportUrl } from './JcPzJcxx.api';
import { usePermission } from '/@/hooks/web/usePermission';
import { createLocalStorage } from '/@/utils/cache';
import { useGo } from '/@/hooks/web/usePage';

const localStorage = createLocalStorage({ prefixKey: 'jc-pz-jcxx_' });
//注册model
const [registerModal, { openModal }] = useModal();
const { hasPermission } = usePermission();
const go = useGo();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '基础集采信息',
    api: list,
    columns: recolumns,
    showIndexColumn: true,
    canResize: false,
    formConfig: {
      labelWidth: 80,
      schemas: getSearchFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    actionColumn: {
      width: 150,
    },
    defSort: {
      column: 'cyrmc,pzwh',
      order: 'desc,asc'
    },
    beforeFetch(params) {
      return params;
    }
  },
  exportConfig: {
    name: "集采中选信息",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    record: localStorage.get('lastAddJxcc') || {},
    isUpdate: false,
    showFooter: true,
  });
}
/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
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

function topzwh(record: Recordable){
  go(`/ypyd/detail/${encodeURIComponent(record.pzwh || '')}`);
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record),
    }, {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      }
    }]
}
</script>
<style scoped>

</style>