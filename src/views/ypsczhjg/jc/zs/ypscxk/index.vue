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
    </BasicTable>
    <!-- 表单区域 -->
    <viewModal @register="registerModal"></viewModal>
  </div>
</template>

<script lang="ts" name="jc.zs-jcZsYpscXk" setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import viewModal from './modules/viewModal.vue'
import { columns, searchFormSchema } from './JcZsYpscXk.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './JcZsYpscXk.api';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
const route = useRoute();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '基础-证书-药品生产许可',
    showIndexColumn: true,
    api: list,
    columns,
    canResize: false,
    immediate: false,
    formConfig: {
      labelWidth: 80,
      autoAdvancedCol: 4,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    actionColumn: {
      width: 80,
      fixed: 'right'
    },
    beforeFetch(params) {
      params.column = 'yxqz';
      params.order = 'asc';
      if (route.query?.code) {
        params.xzqhdm = route.query?.code;
      }
      if (route.query?.gqzs) {
        params.gqzs = route.query?.gqzs;
      }
      params.xzqhdm = getLikeValue(params.xzqhdm);
      return params;
    }
  },
  exportConfig: {
    name: "基础-证书-药品生产许可",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext

onMounted(async () => {
  await getForm().setFieldsValue({ dqRange: route.query?.dqRange || '3M' });
  reload();
});

/**
 * 详情
*/
function handleDetail(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [{
    label: '详情',
    onClick: handleDetail.bind(null, record),
  }]
}
</script>
<style scoped>
</style>
