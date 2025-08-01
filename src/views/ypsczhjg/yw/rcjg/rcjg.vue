<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" class="my-basic-table">
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <!-- 表单区域 -->
  <TywrcjgxqDetils @register="registerModal" @success="handleSuccess"></TywrcjgxqDetils>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import TywrcjgxqDetils from '/@/views/ypsczhjg/yw/rcjg/modules/TywrcjgxqDetils.vue'
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { getColumns } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.data';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { list } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.api';

export default defineComponent({
  components: { BasicTable, TableAction, TywrcjgxqDetils },
  props: {
    shxydm: propTypes.string.def(''),
    pzwh: propTypes.string.def('') ,
    cyrshxydm: propTypes.string.def('')
  }, 
  setup(props) {
    //注册model
    const [registerModal, { openModal }] = useModal();
    const { tableContext } = useListPage({
      tableProps: {
        showIndexColumn: true,
        useSearchForm: false,
        showTableSetting: false,
        api: list,
        columns: getColumns(),
        immediate: !!props.shxydm||!!props.cyrshxydm,
        canResize: false,
        actionColumn: {
          width: 90,
          fixed: 'right'
        },
        beforeFetch(params) {
          params.delflag = '0';
          params.column = 'jcsj';
          if(props.shxydm)params.shxydm = props.shxydm || '';
          if(props.cyrshxydm){params.shxydm = props.cyrshxydm || ''} 
          params.order = 'desc';
          return params;
        },
      }
    });
    const [registerTable, { reload }, { rowSelection }] = tableContext;

    watch(() => props.shxydm, (value, oldVal) => {
      if (value != oldVal) reload();
    });

    function handleDetail(record: Recordable) {
      openModal(true, {
        record
      });
    }
    function handleSuccess() {
      reload();
    }

    return {
      rowSelection,
      registerTable,
      registerModal,
      getTableAction(record) {
        return [{
          label: '查看',
          onClick: handleDetail.bind(null, record),
        }];
      },
      handleSuccess

    };
  }
});
</script>
