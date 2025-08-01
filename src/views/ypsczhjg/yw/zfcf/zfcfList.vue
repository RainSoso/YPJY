<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" class="my-basic-table">
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>

  <!-- 表单区域 -->
  <YwZfcfAjjbxxViewModal @register="registerModal" @success="handleSuccess"></YwZfcfAjjbxxViewModal>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import YwZfcfAjjbxxViewModal from '/@/views/ypsczhjg/yw/zfcf/modules/YwZfcfAjjbxxViewModal.vue'
import { simpleColumns } from '/@/views/ypsczhjg/yw/zfcf/YwZfcfAjjbxx.data';
import { list } from '/@/views/ypsczhjg/yw/zfcf/YwZfcfAjjbxx.api';

export default defineComponent({
  components: { BasicTable, TableAction, YwZfcfAjjbxxViewModal },
  props: {
    shxydm: propTypes.string.def('')
  },
  setup(props) {
    //注册model
    const [registerModal, { openModal }] = useModal();
    //注册table数据
    const { tableContext } = useListPage({
      tableProps: {
        useSearchForm: false,
        showTableSetting: false,
        showIndexColumn: true,
        api: list,
        immediate: !!props.shxydm,
        columns: simpleColumns,
        canResize: false,
        actionColumn: {
          width: 90,
          fixed: 'right'
        },
        beforeFetch(params) {
          params.column = 'djsj';
          params.order = 'desc';
          params.shxydm = props.shxydm || '';
          return params;
        },
      }
    });
    const [registerTable, { reload }, { rowSelection }] = tableContext;
    function handleSuccess() {

    }
    function handleDetail(record: Recordable) {
      openModal(true, {
        record
      });
    }

    watch(() => props.shxydm, (value, oldVal) => {
      if (value != oldVal) reload();
    });

    return {
      registerTable,
      rowSelection,
      registerModal,
      getTableAction(record) {
        return [{
          label: '详情',
          onClick: handleDetail.bind(null, record),
        }];
      },
      handleSuccess
    };
  }
});
</script>
