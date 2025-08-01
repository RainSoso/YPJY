<template>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection" class="my-basic-table">
        <!--操作栏-->
        <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" />
        </template>
    </BasicTable>
    <!-- 表单区域 -->
    <!-- <TywrcjgxqDetils @register="registerModal" @success="handleSuccess"></TywrcjgxqDetils> -->
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
// import TywrcjgxqDetils from '/@/views/ypsczhjg/yw/rcjg/modules/TywrcjgxqDetils.vue'
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { columns } from './ndbg.data';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
// import { list } from '/@/views/ypsczhjg/yw/rcjg/TYwRcjgJgjg.api';

export default defineComponent({
    components: { BasicTable, TableAction },
    props: {
    },
    setup(props) {
        //注册model
        const [registerModal, { openModal }] = useModal();
        const { tableContext } = useListPage({
            tableProps: {
                showIndexColumn: true,
                hideCheckbox: true,
                useSearchForm: false,
                showTableSetting: false,
                // dataSource: [{}],
                columns: columns,
                canResize: false,
                rowSelection: {
                    selections: false
                },
                actionColumn: {
                    width: 90,
                    fixed: 'right'
                },
                beforeFetch(params) {
                    return params;
                },
            }
        });
        const [registerTable, { reload }, { rowSelection }] = tableContext;

        watch(() => {

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
