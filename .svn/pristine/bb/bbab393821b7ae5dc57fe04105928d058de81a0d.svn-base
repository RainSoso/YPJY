<template>
    <div>
        <!--引用表格-->
        <BasicTable @register="registerTable">
            <!--操作栏-->
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
        </BasicTable>

        <!-- 表单区域 -->
        <viewModal @register="registerModal"></viewModal>
        <xzspViewModal @register="xzspRegisterModal"></xzspViewModal>
    </div>
</template>

<script lang="ts" name="yw-xk-xzsp" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import { propTypes } from '/@/utils/propTypes';
import { BasicTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import viewModal from '/@/views/ypsczhjg/jc/zs/ypscxk/modules/viewModal.vue';
import xzspViewModal from './modules/viewModal.vue';
import { getColumns, getSearchFormSchema } from './xzsp.data';
import { list, getImportUrl, getExportUrl } from './xzsp.api';
import { getLikeValue } from '/@/utils/area/areaDataUtil';

const props = defineProps({
    serviceType: propTypes.string
});

const route = useRoute();

//注册model
const [registerModal, { openModal }] = useModal();
const [xzspRegisterModal, { openModal: xzspOpenModal }] = useModal();
//注册table数据
const { tableContext } = useListPage({
    tableProps: {
        api: list, columns: getColumns(props.serviceType), canResize: false, immediate: false,
        showIndexColumn: true,
        beforeFetch(params) {
            debugger
            if (props.serviceType != undefined) {
                params.serviceType = props.serviceType;
            }
            params.column = 'fzrq';
            params.xzqhdm = getLikeValue(params.xzqhdm);
            return params;
        },
        formConfig: {
            labelWidth: 80, autoAdvancedCol: 4, schemas: getSearchFormSchema(props.serviceType)
            , autoSubmitOnEnter: true, showAdvancedButton: false,
        },
        actionColumn: { width: 80, defaultHidden: props.serviceType == 4 }
    },
    exportConfig: { name: "业务-许可-行政审批", url: getExportUrl },
    importConfig: { url: getImportUrl }
})

const [registerTable, { reload, getForm }] = tableContext;

onMounted(async () => {
    let start, end;
    if (route.query.dqRange == '3M') {
        end = dayjs(new Date());
        start = end.add(-3, 'M').format('YYYY-MM-DD');
        end = end.format('YYYY-MM-DD');
    } else {
        start = dayjs(new Date()).format('YYYY-01-01');
        end = dayjs(new Date()).format('YYYY-MM-DD')
    }
    await getForm().setFieldsValue({ dqRange: route.query?.dqRange || '3M', xzqhdm: route.query.xzqhdm, ggTimeRange: start && [start, end] || undefined });
    getForm().submit();
});

function handleDetail(record: Recordable) {
    xzspOpenModal(true, {
        record, isUpdate: true, showFooter: true
    });
}

function getTableAction(record) {
    return [{
        label: '详情',
        onClick: handleDetail.bind(null, record),
    }]
}
</script>
<style lang="less" scoped>
</style>