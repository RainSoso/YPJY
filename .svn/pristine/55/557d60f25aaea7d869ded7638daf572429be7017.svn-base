<template>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
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
import { columns, pzcolumns } from './blfy.data';
import { useModal } from '/@/components/Modal';
import { propTypes } from '/@/utils/propTypes';
import { list } from '/@/views/ypsczhjg/yw/blfy/YwBlfyyj.api';

export default defineComponent({
    components: { BasicTable, TableAction },
    props: {
        shxydm: { require: true, type: String },
        pzwh: { require: true, type: String },
    },
    setup(props) {
        //注册model
        const [registerModal, { openModal }] = useModal();
        const { tableContext } = useListPage({
            tableProps: {
                hideCheckbox: true,
                api: list,
                showIndexColumn: true,
                ellipsis: true,
                canResize: true,
                useSearchForm: false,
                showActionColumn: false,
                showTableSetting: false,
                // dataSource: [{ cpmc: '丙硫氧嘧啶', pzwh: '国药准字202201', byfzzz: '国家药品不良反应监测数据库共收到丙硫氧嘧啶不良反应报告432例，其中严重不良反应报告99例，严重不良反应按系统分类排名前两位的依次是肝胆系统损害以及白细胞和网状内皮系统异常，合计占总例次数的71.5%。此外，还收到5例抗中性粒细胞抗体（ANCA）相关性血管炎的报告'
                // ,xgjy:'医务人员应及时告知患者可能出现的不良反应，患者服用丙硫氧嘧啶时需定期检查血常规、尿常规、肝生化指标及肾功能，若出现不良反应及时就医' }],
                columns: props.shxydm ? columns : pzcolumns,
                canResize: false,
                rowSelection: {
                    selections: false
                },
                actionColumn: {
                    width: 90,
                    fixed: 'right'
                },
                beforeFetch(params) {
                    if (props.shxydm) params.jyshxydm = props.shxydm
                    else params.shxydm = 'N';
                    if (props.pzwh) params.yppzwh = props.pzwh;
                    return params;
                },
                defSort: {
                    column: 'num',
                    order: 'desc'
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
