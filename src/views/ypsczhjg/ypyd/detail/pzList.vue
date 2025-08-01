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
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useGo } from '/@/hooks/web/usePage';
import { propTypes } from '/@/utils/propTypes';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { getColumns } from './../gcyppz/JcPzYpzcscjy.data';
import { list } from './../gcyppz/JcPzYpzcscjy.api';

export default defineComponent({
  components: { BasicTable, TableAction },
  props: {
    Ypzcscjy: propTypes.object.def({}),
    forceTags: propTypes.string.def(''),
    isCyr: propTypes.bool.def(false),
    year: propTypes.string.def(''),
    act: propTypes.string.def('')
  },
  setup(props) {
    const go = useGo();
    //注册table数据
    const { tableContext } = useListPage({
      tableProps: {
        useSearchForm: false,
        showTableSetting: false,
        showIndexColumn: true,
        api: list,
        immediate: props.act == 'ttymwh' && props.Ypzcscjy?.yptymc || !!props.Ypzcscjy?.shxydm,
        columns: getColumns(),
        canResize: false,
        actionColumn: {
          width: 90,
          fixed: 'right'
        },
        beforeFetch(params) {
          params.column = '';
          params.order = 'desc';
          if (props.act == 'ttymwh') {
            params.yptymc = props.Ypzcscjy?.yptymc || '';
            params.yppzwh = '!' + props.Ypzcscjy?.yppzwh;
          } else {
            if (props.isCyr) params.cyrshxydm = props.Ypzcscjy?.shxydm || '';
            else params.shxydm = props.Ypzcscjy?.shxydm || '';
            if (props.Ypzcscjy?.yppzwh) params.yppzwh = '!' + props.Ypzcscjy?.yppzwh;
          }
          if (props.forceTags) params.forceTags = props.forceTags;
          if (props.year) params.year = props.year;
          return params;
        },
      }
    });
    const [registerTable, { reload }, { rowSelection }] = tableContext;
    function handleDetail(record: Recordable) {
      go(`/ypyd/detail/${encodeURIComponent(record.yppzwh || '')}`);
    }

    watch(() => props.Ypzcscjy, () => {
      reload();
    });

    return {
      formatToDate,
      filterDictTextByCache,
      registerTable,
      rowSelection,
      getTableAction(record) {
        return [{
          label: '详情',
          onClick: handleDetail.bind(null, record),
        }];
      }
    };
  }
});
</script>
