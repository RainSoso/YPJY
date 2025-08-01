<template>
    <div>
        <!--引用表格-->
        <BasicTable @register="registerTable" class="my-basic-table">
            <!--插槽:table标题-->
            <template #tableTitle></template>
            <template #form-advanceBefore>
                <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
        </BasicTable>

        <TywrcjgxqDetils @register="registerModal" @success="handleSuccess"></TywrcjgxqDetils>
    </div>
</template>
  
<script lang="ts" name="jgyw-jdjc-jgjl" setup>
import { ref, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import { getSearchFormSchema } from '../TYwRcjgJgjg.data';
import TywrcjgxqDetils from '../modules/TywrcjgxqDetils.vue';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from '../TYwRcjgJgjg.api';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import { propTypes } from '/@/utils/propTypes';

const props = defineProps({
    sfgmp: propTypes.string.def(''),
  gmpssh: propTypes.string.def(''),
  columns: propTypes.array.def(undefined),
  getSearchFormSchema: propTypes.array.def(undefined),
});
const { setTitle } = useTabs();
const route = useRoute();
if (route.query?.tagTitle) setTitle(route.query?.tagTitle + '');
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
        title: 'RCJG',
        showIndexColumn: true,
        api: list,
        immediate: false,
        columns:props.columns,
        canResize: false,
        formConfig: {
            labelWidth: 80,
            schemas:getSearchFormSchema(route.query?.year),
            autoSubmitOnEnter: true,
            showAdvancedButton: false,
        },
        actionColumn: {
            width: 80,
            fixed: 'right'
        },
        beforeFetch(params) {
            console.log(params)
            if(params.gmpzt == '1'){
                console.log(3333)
               params.sfhgpgssq = '1'
            }else if ('0' == params.gmpzt){
                params.sfhgpgssh = '1'
            }else if('N' == params.gmpzt){
                params.sfgmp ='0';
            }
            params.jccs = route.params?.jccs || '';
            params.jb = route.query?.jb || '';
            if (route.params?.sfhg) {
                const str = route.params.sfhg?.split(',');
                params.sfhg = str[0];
                params.csdm = str[1];
            }
            if (route.query?.xzqhdm) { params.csdm = route.query.xzqhdm }
            params.delflag = '0';
            params.column = 'jcsj';
            params.shxydm = route.params?.shxydm || '' || route.query?.shxydm;
            params.xzqhdm = getLikeValue(params.xzqhdm);
            if (params.jcxs) params.jcxs = '*' + params.jcxs + '*'
            if (route.query?.jcTags) params.jcTags = route.query?.jcTags;
            if (route.query?.jcLevels) params.jcLevels = route.query?.jcLevels;
            if (route.query?.year) params.year = route.query?.year;
            if (route.query?.jcjggb) params.jcjggb = route.query?.jcjggb;
            if (props.sfgmp) params.sfgmp = '1';
            params.order = 'desc';
            return params;
        },
    },
    exportConfig: {
        name: "GMP符合性检查记录",
        url: getExportUrl,
    },
    importConfig: {
        url: getImportUrl
    },
})

const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext

setTimeout(async () => {
    await getForm().submit();
}, 1);

/**
 * 新增事件
 */
function handleAdd() {
    openModal(true, {
        isUpdate: false,
        showFooter: true,
    });
}
/**
 * 编辑事件
 */
function handleEdit(record: Recordable) {
    openModal(true, {
        record,
        isUpdate: true,
        showFooter: true,
    });
}
/**
 * 详情
*/
function handleDetail(record: Recordable) {
    openModal(true, {
        record,
        isUpdate: true,
        showFooter: false,
    });
}
/**
 * 删除事件
 */
async function handleDelete(record) {
    await deleteOne({ id: record.id }, reload);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, reload);
}
/**
 * 成功回调
 */
function handleSuccess({ isUpdate, values }) {
    reload();
}
/**
   * 操作栏
   */
function getTableAction(record) {
    return [
        {
            label: '查看',
            onClick: handleEdit.bind(null, record),
        }
    ]
}
/**
  * 下拉操作栏
  */
function getDropDownAction(record) {
    return [
        {
            label: '详情',
            onClick: handleDetail.bind(null, record),
        }, {
            label: '删除',
            popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
            }
        }
    ]
}
</script>
<style scoped></style>
  