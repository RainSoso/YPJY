<template>
  <BasicTable @register="registerTable" class="my-basic-table">
    <template #cjqk="{ record }">
      <span v-if="record.cjcs > 0">今年已抽</span>
      <span v-else-if="record.cjcs3 > 0">近3年已抽</span>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <!-- 表单区域 -->
  <ViewModal @register="registerModal" @success="handleSuccess"></ViewModal>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useGo } from '/@/hooks/web/usePage';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { columns } from './JcPzZypfkl.data';
import { list } from './JcPzZypfkl.api';
import ViewModal from './components/JcPzZypfklModal.vue';

export default defineComponent({
  components: { BasicTable, TableAction,ViewModal },
  props: {
    shxydm: propTypes.string.def(''),
  },
  setup(props) {
    const go = useGo();
    const [registerModal, { openModal }] = useModal();
    //注册table数据
    const { tableContext } = useListPage({
      tableProps: {
        useSearchForm: false,
        showTableSetting: false,
        showIndexColumn: true,
        api: list,
        // immediate: props.act == 'ttymwh' && props.Ypzcscjy?.yptymc || !!props.Ypzcscjy?.shxydm,
        columns: columns,
        canResize: false,
        actionColumn: {
          width: 90,
          fixed: 'right'
        },
        beforeFetch(params) {
          params.column = '';
          params.order = 'asc';
          if (props.shxydm) params.shxydm = props.shxydm;
          return params;
        },
      }
    });
    const [registerTable, { reload }, { rowSelection }] = tableContext;
    
    function handleSuccess() {
      reload();
    }

    // watch(() => props.Ypzcscjy, () => {
    //   reload();
    // });

    return {
      formatToDate,
      filterDictTextByCache,
      registerTable,
      rowSelection,
      getTableAction(record) {
        return [{ label: '详情', onClick: () => openModal(true, { record }) }];
      },
      registerModal,
      openModal,
      handleSuccess
    };
  }
});
</script>