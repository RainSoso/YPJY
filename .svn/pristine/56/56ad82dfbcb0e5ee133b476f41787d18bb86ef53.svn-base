<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle>
       
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <YwZfcfAjjbxxViewModal @register="registerModal" @success="handleSuccess"></YwZfcfAjjbxxViewModal>
  </div>
</template>

<script lang="ts" name="jgyw-jczf" setup>
import { ref, computed, unref } from 'vue';
import { useTabs } from '/@/hooks/web/useTabs';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import { columns, getSearchFormSchema, simpleColumns } from './YwZfcfAjjbxx.data';
import YwZfcfAjjbxxViewModal from '/@/views/ypsczhjg/yw/zfcf/modules/YwZfcfAjjbxxViewModal.vue';
import { ypjyListFxpgbg, deleteOne, batchDelete, getImportUrl, getExportUrl } from './YwZfcfAjjbxx.api';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import { useRoute } from 'vue-router';
const { setTitle } = useTabs();
const route = useRoute();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'ZFCF',
    showIndexColumn: true,
    api: ypjyListFxpgbg,
    immediate: false,
    columns: simpleColumns,
    canResize: false,
    formConfig: {
      labelWidth: 80, autoAdvancedCol: 3,
      //schemas: getSearchFormSchema(!route.params?.nf && !route.params?.year && !route.query?.tj, route.query?.year),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    actionColumn: {
      width: 120,
    },
    beforeFetch(params) {
      debugger
      params.column = '';
      if (route.query?.fxpgbg) params.fxpgbg = route.query.fxpgbg;
      if (route.query?.type) params.type = route.query.type;
      if (route.query?.xzqh) params.xzqh = route.query.xzqh;
      if (route.query?.clickType) params.clickType = route.query.clickType;
      if (route.query?.begin) params.begin = route.query.begin;
      if (route.query?.end) params.end = route.query.end;
      if (route.query?.shxydm) params.shxydm = route.query.shxydm;
      return params; 
    },
  },
  exportConfig: {
    name: "ZFCF",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext

setTimeout(async () => {
  await getForm().submit();
}, 1);

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
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '查看',
      onClick: handleEdit.bind(null, record),
    }
  ]
}
/**
  * 下拉操作栏
  */
function getDropDownAction(record) {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    }, {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      }
    }
  ]
}
</script>
<style scoped></style>
