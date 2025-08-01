<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined">新增</a-button>

        <a-button type="primary" :disabled="auditing.length < 1" @click="batchNotSettings">
          <Icon icon="ant-design:check-outlined" />
          批量确认
        </a-button>
        <a-button :disabled="selectedRowKeys.length < 1" @click="onExportXls">
          <Icon icon="ant-design:download-outlined" />
          批量导出
        </a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <BackModal @register="registerBackModal" @success="handleSuccess"></BackModal>
    <WtbgNoticeModal @register="registerNotModal" @success="handleSuccess"></WtbgNoticeModal>
    <wtbgBaseView @register="registerViewModal" @success="handleSuccess"></wtbgBaseView>

    <WtbgBaseModalAdd @register="registerModalAdd" @success="handleSuccess"></WtbgBaseModalAdd>
  </div>
</template>

<script lang="ts" name="wtbg-wtbgBase" setup>
import { computed } from 'vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import BackModal from './modules/BackModal.vue'
import WtbgNoticeModal from './modules/WtbgNoticeModal.vue';
import wtbgBaseView from './modules/wtbgBaseView.vue';
import { columns, searchFormSchema } from './WtbgBase.data';
import { list, getExportUrl } from './WtbgBase.api';
import { queryByWtbgId } from './WtbgNotice.api';

import WtbgBaseModalAdd from './modules/WtbgBaseModalAdd.vue'

//注册model
const [registerModalAdd, { openModal: openModalAdd }] = useModal();

const [registerBackModal, { openModal: openBackModal }] = useModal();
const [registerNotModal, { openModal: openNotModal }] = useModal();
const [registerViewModal, { openModal: openViewModal }] = useModal();
//注册table数据
const { tableContext, onExportXls } = useListPage({
  tableProps: {
    title: '委托报告',
    api: list,
    rowKey: 'id',
    columns,
    canResize: false,
    showIndexColumn: true,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    indexColumnProps: {
      width: 60
    },
    actionColumn: {
      width: 140,
      fixed: 'right'
    },
    defSort: {
      column: 'createdDate',
      order: 'desc'
    },
    beforeFetch(params, isExport) {
      if (params.hasChanged == 0) delete params.hasChanged;
      //   if (!isExport) selectedRowKeys.value = [];
    }
  }, exportConfig: {
    name: "药品委托销售储运报告",
    url: getExportUrl,
  },
});

const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext;

const auditing = computed(() => {
  return selectedRows.value.filter(item => item.state == 3).map(i => i.id);
});

function handleBack(record: Recordable) {
  openBackModal(true, {
    record: { ...record, state: 4 },
    isUpdate: true,
    showFooter: true,
  });
}

function handNotSettings(record) {
  openNotModal(true, { record: { wtbgId: record.id }, isUpdate: true, showFooter: true });
}

function batchNotSettings() {
  openNotModal(true, { record: { wtbgId: auditing.value.join(',') }, isUpdate: true, showFooter: true });
}

function openView(record: Recordable) {
  openViewModal(true, { record });
}

function handleGgDetail(record: Recordable) {
  queryByWtbgId({ id: record.ggId }).then(res => {
    openNotModal(true, {
      record: res || {},
      showFooter: false
    });
  })
}
/**
 * 成功回调
 */
function handleSuccess() {
  reload();
}
/**
   * 操作栏
   */
function getTableAction(record) {
  let array: any = [{ label: '查看', onClick: openView.bind(null, record) }];
  if (record.state == '3') {
    array.push({
      label: '确认',
      onClick: handNotSettings.bind(null, record)
    }, {
      label: '退回', onClick: handleBack.bind(null, record),
    });
  }
  if (record.state == '5' && record.ggId) {
    array.push({ label: '公告', onClick: handleGgDetail.bind(null, record) });
  }
  return array;
}

function handleAdd() {
  var id = getuuid();

  var record = {};
  record.id = id;
  openModalAdd(true, {
    record,
    isUpdate: false,
    showFooter: true,
  });
}
function getuuid() {
  var s = [];
  // 随机的id值从以下字符串中产生
  var uuidData = "0123456789abcdefghijklmnopqrstuvwxyz";
  var uuidDataLength = uuidData.length;
  //此处循环了36次，可以修改循环次数，循环次数决定生成id长度	
  for (var i = 0; i < 32; i++) {
    // 从uuidData中随机截取一个字符
    s[i] = uuidData.substr(Math.floor(Math.random() * uuidDataLength), 1);
  }
  var uuid = s.join("");
  return uuid;
}
</script>
<style scoped></style>