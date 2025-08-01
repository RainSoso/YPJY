<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <TywrcjgxqDetils @register="registerModal" @success="handleSuccess"></TywrcjgxqDetils>
  </div>
</template>
  
<script lang="ts" name="yw.rcjg-rcjgList" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { getColumns } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.data';
import { list } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.api';
import TywrcjgxqDetils from '/@/views/ypsczhjg/yw/rcjg/modules/TywrcjgxqDetils.vue'
const props = defineProps({
  pzwh: propTypes.string.def('')    /* 批准文号 */
  , year: propTypes.oneOfType([propTypes.string, propTypes.number])  /* 年度 */
});
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    useSearchForm: false,
    showTableSetting: false,
    api: list,
    columns: getColumns(),
    canResize: false,
    actionColumn: {
      width: 80
    },
    defSort: {
      column: '',
      order: ''
    },
    beforeFetch(params) {
      if (props.pzwh) params.pzwh = props.pzwh;
      if (props.year) params.year = props.year;
      return params;
    }
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

function handleSuccess({ isUpdate, values }) {
  reload();
}

function handleDetail(record) {
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
  