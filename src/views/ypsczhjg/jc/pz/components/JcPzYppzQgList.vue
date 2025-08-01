<template>
  <BasicTable @register="registerTable" class="my-basic-table">
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <!-- 表单区域 -->
  <JcPzYppzQgDetils @register="registerModal" @success="handleSuccess"></JcPzYppzQgDetils>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useGo } from '/@/hooks/web/usePage';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { formatToDate } from '/@/utils/dateUtil';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { columns } from './../JcPzYppzQg.data';
import { list } from './../JcPzYppzQg.api';
import JcPzYppzQgDetils from './../JcPzYppzQgDetils.vue';
import { isArray } from 'xe-utils';

export default defineComponent({
  components: { BasicTable, TableAction, JcPzYppzQgDetils },
  props: {
    yptymc: propTypes.string.def(''),
    yppzwh: propTypes.string.def('')
  },
  setup(props) {
    const go = useGo();
    //注册model
    const [registerModal, { openModal }] = useModal();
    const { tableContext } = useListPage({
      tableProps: {
        useSearchForm: false,
        showTableSetting: false,
        showIndexColumn: true,
        api: list,
        immediate: !!props.yptymc,
        columns,
        canResize: false,
        actionColumn: {
          width: 90,
          fixed: 'right'
        },
        beforeFetch(params) {
          params.column = '';
          params.order = 'desc';
          params.yptymc = props.yptymc || '-1';
          if (props.yppzwh) params.yppzwh = '!' + props.yppzwh;
          if(isArray(params.dzszzxszzq)){
            params.dzszzxszzq=params.dzszzxszzq.toString()
          }
          return params;
        },
      }
    });
    const [registerTable, { reload }, { rowSelection }] = tableContext;

    watch(() => props.yptymc, () => {
      reload();
    });

    function handleDetail(record: Recordable) {
      if (record.dzszzxszzq == '湖北省') {
        go(`/ypyd/detail/${encodeURIComponent(record.yppzwh || '')}`);
      } else {
        openModal(true, {
          record
        });
      }
    }
    function handleSuccess({ isUpdate, values }) {
      reload();
    }

    return {
      formatToDate,
      getDictText,
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
