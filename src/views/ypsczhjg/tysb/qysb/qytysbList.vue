<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 计划申报</a-button>
        <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined"></Icon>
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down"></Icon>
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small" @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <PYwTyjhsqModal @register="registerModal" @success="handleSuccess" width="1200px"></PYwTyjhsqModal>
    <QytysbDetailsModal @register="registerDetailsModal"  width="1200px"></qytysbDetailsModal>
  </div>
</template>

<script lang="ts" name="yw-pYwTyjhsq" setup>
import { ref, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import PYwTyjhsqModal from './components/PYwTyjhsqModal.vue';
import QytysbDetailsModal from './components/QytysbDetailsModal.vue';
import { columns, getSearchFormSchema } from './PYwTyjhsq.data';
import { list,getId, deleteOne, batchDelete, getImportUrl, getExportUrl } from './PYwTyjhsq.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { message } from 'ant-design-vue';
import { buildUUID } from '/@/utils/uuid';


const checkedKeys = ref<Array<string | number>>([]);
//注册model
const [registerModal, { openModal }] = useModal();
const [registerDetailsModal, { openModal: openDetailsModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'p_yw_tyjhsq',
    showIndexColumn:true,
    api: list,
    columns,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: getSearchFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [],
      fieldMapToTime: [],
    },
    actionColumn: {
      width: 180,
      fixed: 'right',
    },
  },
  exportConfig: {
    name: 'p_yw_tyjhsq',
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess,
  },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

/**
 * 新增事件
 */
function handleAdd() {
  openModal(true, {
    isUpdate: false,
    showFooter: true,
    id:buildUUID(),
    sbState:0
  }); 
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable,sbState) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
    sbState: sbState,
  });
}
/**
 * 详情
 */
function handleDetail(record: Recordable) {
  openDetailsModal(true, {
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
  if (record.sbState ==30) {
    return [
      {
        label: '追加申报',
        onClick: handleEdit.bind(null, record,40),
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }else{
    return [ 
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
    ];
  }
}
/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
  return [
    {
      label: '编辑',
      onClick: handleEdit.bind(null, record,null),
    },
    {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    },
  ];
}
</script>

<style scoped>
</style>