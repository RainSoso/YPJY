<template>
    <BasicTable @register="registerTable" :rowSelection="rowSelection" class="my-basic-table">
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
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { list } from './TYwCjyYpcyji.api';
import { propTypes } from '/@/utils/propTypes';
import { columns } from './TYwCjyYpcyji.data';
export default defineComponent({
    components: { BasicTable, TableAction },
    props: {
        QyJbxx: propTypes.object.def({})

    },
    setup(props) {
        console.log(props.QyJbxx);
        const { tableContext } = useListPage({
            tableProps: {
                useSearchForm: false,
                showTableSetting: false,
                api: list,
                columns,
                canResize: false,
                actionColumn: {
                    width: 90,
                    fixed: 'right'
                },
                beforeFetch(params) {
                    params.column = 'cyrq';
                    params.shxydm = props.QyJbxx.shxydm
                    params.order = 'desc';
                    return params;
                },
            }
        });
        const [registerTable, { reload }, { rowSelection }] = tableContext;

        const load = () => {

        };
        watch(() => props.Ypzcscjy, () => {
            load();
        });

        function handleDetail(record: Recordable) {
            openModal(true, {
                record,
                isUpdate: true,
                showFooter: true,
            });
        }
        function handleSuccess({ isUpdate, values }) {
            reload();
        }
        load();
        return {
            BasicTable,
            filterDictTextByCache,
            rowSelection,
            registerTable,
            getTableAction(record) {
                return [{
                    label: '查看',
                    onClick: handleDetail.bind(null, record),
                    // if(record.jyjg == '不合格'){
                    //    label: '核查处置情况',
                    //    onClick: handleDetail.bind(null, record),
                    // }
                }];
            }

        };
    }
});
</script>