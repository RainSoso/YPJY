<template>
    <BasicTable @register="registerTable" class="my-basic-table">
        <!--操作栏-->
        <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" />
        </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ypcyjlview @register="registerModal" @success="handleSuccess"></ypcyjlview>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { useModal } from '/@/components/Modal';
import ypcyjlview from '/@/views/ypsczhjg/yw/ypcyjl/ypcyjlview.vue';
import { list,qyxqYpcjyList } from '/@/views/ypsczhjg/yw/ypcyjl/TYwCjyYpcyji.api';
import { propTypes } from '/@/utils/propTypes';
import { columns } from '/@/views/ypsczhjg/yw/ypcyjl/TYwCjyYpcyji.data';
import { useGo } from '/@/hooks/web/usePage';
import { useRoute } from 'vue-router';
import { ref, computed, unref, watch } from 'vue';

export default defineComponent({
    components: { BasicTable, TableAction, ypcyjlview },
    props: {
        QyJbxx: propTypes.object.def({}),
        shxydm: propTypes.string.def(''),
        pzwh: propTypes.object.def({})
    },
    setup(props) {
        //注册model
        const route = useRoute();
        const type = ref(route.params.type)
        const shxydm = route.params?.qyid;
        const [registerModal, { openModal }] = useModal();
        const { tableContext } = useListPage({
            tableProps: {
                useSearchForm: false,
                showTableSetting: false,
                showIndexColumn: true,
                api: qyxqYpcjyList,
                columns,
                immediate: !!props.QyJbxx,
                canResize: false,
                actionColumn: {
                    width: 90,
                    fixed: 'right'
                },
                beforeFetch(params) {
                    //params.column = 'cyrq';
                    params.column = 'jyjg,cyrq';
                    debugger
                    // if (props.QyJbxx?.shxydm) {
                    //     params.zzdm = props.QyJbxx.shxydm || '';
                    // } else {
                    //     params.zzdm = props.shxydm || '';
                    //     params.pzwh = props.pzwh || '';
                    // }    
                   params.zzdm = shxydm;
                    params.order='desc';
                    return params;
                },
            }
        });
        const [registerTable, { reload }, { rowSelection }] = tableContext;

        watch([props.QyJbxx, props.shxydm, props.pzwh], (value, oldVal) => {
            if (value != oldVal) reload();
        });

        function handleDetail(record: Recordable) {
            openModal(true, {
                record
            });
        }
        function handleSuccess({ isUpdate, values }) {
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
