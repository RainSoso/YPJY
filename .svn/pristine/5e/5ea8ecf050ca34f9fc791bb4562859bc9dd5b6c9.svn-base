<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
  </div>
</template>

<script lang="ts" name="jgyw-jdjc-ndjh" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { columns, searchFormSchema } from './JcQyJdjc.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './JcQyJdjc.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';

const go = useGo();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '监督检查计划',
    showIndexColumn: true,
    rowKey: ({shxydm, year}) => shxydm + '-' + year,
    api: list,
    columns,
    canResize: false,
    formConfig: {
      labelWidth: 80, autoAdvancedCol: 4,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
    },
    actionColumn: {
      width: 70,
      fixed: 'right'
    },
    beforeFetch(params) {
      params.xzqhdm = getLikeValue(params.xzqhdm);
      params.column = '';
      return params;
    }
  },
  exportConfig: {
    name: "监督检查计划",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

/**
 * 详情
*/
function handleDetail(record: Recordable) {
  go({path: `/yw/rcjg/${encodeURIComponent(record.shxydm || '')}`, query: {year: record.year}});
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    }
  ]
}
</script>
<style scoped>
</style>
