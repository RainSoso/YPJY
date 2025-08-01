<template>
  <div>
    <a-alert message="企业法人公共信用综合评价" type="info" />
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <TYwXyxxModal @register="registerModal" @success="handleSuccess"></TYwXyxxModal>
  </div>
</template>

<script lang="ts" name="ypjy-tYwXyxx" setup>
import { ref, reactive, computed, unref, watch } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import TYwXyxxModal from './components/TYwXyxxModal.vue'
import { columns, searchFormSchema, superQuerySchema } from './TYwXyxx.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './TYwXyxx.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useUserStore } from '/@/store/modules/user';
import { propTypes } from '/@/utils/propTypes';
const queryParam = reactive<any>({});
const props = defineProps({
  shxydm: propTypes.string.def('')
});

const checkedKeys = ref<Array<string | number>>([]);
const userStore = useUserStore();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    useSearchForm: false,
    showTableSetting: false,

    api: list,
    columns,
    immediate: !!props.shxydm,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
    },
    actionColumn: {
      width: 120,
    },
    beforeFetch: (params) => {
      params.column = 'fbrq';
      params.shxydm = props.shxydm || '';
      return params;
    },
  },
  exportConfig: {
    name: "企业法人公共信用综合评价",
    url: getExportUrl,
    params: queryParam,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})
watch(() => props.shxydm, (value, oldVal) => {
  if (value != oldVal) reload();
});
const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

// 高级查询配置
const superQueryConfig = reactive(superQuerySchema);


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
  await deleteOne({ id: record.id }, handleSuccess);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
}
/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      // label: '编辑',
      // onClick: handleEdit.bind(null, record),
      label: '详情',
      onClick: handleDetail.bind(null, record),
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
        placement: 'topLeft',
      }
    }
  ]
}


</script>

<style lang="less" scoped>
:deep(.ant-picker),
:deep(.ant-input-number) {
  width: 100%;
}
</style>