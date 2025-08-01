<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">

    </BasicTable>
  </div>
</template>

<script lang="ts" name="jc.pz-jcPzJcxx" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { columns, searchFormSchema } from '../jcxx/JcPzJcxx.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from '../jcxx/JcPzJcxx.api';

const props = defineProps({
  pzwh: propTypes.string.def('')    /* 批准文号 */
  , year: propTypes.oneOfType([propTypes.string, propTypes.number])  /* 年度 */
});

//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    showIndexColumn: true,
    useSearchForm: false,
    showTableSetting: false,
    api: list,
    columns,
    canResize: false,
    actionColumn: {
      defaultHidden: true
    },
    beforeFetch(params) {
      if (props.pzwh) params.pzwh = props.pzwh;
      if (props.year) params.year = props.year;
      params.column = 'addDate';
      params.order = 'desc';
      return params;
    }
  },
  exportConfig: {
    name: "基础-品种-集采信息",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

</script>
<style scoped>
</style>
