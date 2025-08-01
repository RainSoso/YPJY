<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
          <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> 
          <a-dropdown v-if="selectedRowKeys.length > 0">
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchHandleDelete">
                    <Icon icon="ant-design:delete-outlined"></Icon>
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button>批量操作
                <Icon icon="mdi:chevron-down"></Icon>
              </a-button>
          </a-dropdown>-->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
      <!--省市区字段回显插槽-->
      <template #pcaSlot="{ text }">
        {{ getAreaTextByCode(text) }}
      </template>
      <template #fileSlot="{ text }">
        <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
        <a-button v-else :ghost="true" type="primary" preIcon="ant-design:download-outlined" size="small"
          @click="downloadFile(text)">下载</a-button>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <CpTaskModal @register="registerModal" @success="handleSuccess"></CpTaskModal>
  </div>
</template>

<script lang="ts" name="xtcz-cpTask" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import CpTaskModal from './components/CpTaskModal.vue'
import { columns, getSearchFormSchema } from './CpTask.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './CpTask.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useGo } from '/@/hooks/web/usePage';
const go = useGo();
const checkedKeys = ref<Array<string | number>>([]);
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'cp_task',
    showIndexColumn:true,
    api: list,
    columns,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: getSearchFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [
      ],
      fieldMapToTime: [
      ],
    },
    actionColumn: {
      width: 120,
      fixed: 'right'
    },
  },
  exportConfig: {
    name: "cp_task",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

/**
 * 详情
*/
function handleDetail(record: Recordable) {
  go({ path: '/rwcl/CpTaskDetail', query: { id: record.id, title: record.cpEvent.title } })
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
      label: '处理',
      onClick: handleDetail.bind(null, record),
    }
  ]
}



</script>

<style scoped></style>