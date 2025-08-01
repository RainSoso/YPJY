<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <TywSsfaViewModal ref="TywSsfaViewRef" @jcqkHandleClose="jcqkHandleClose" :isShow="isShow" :jhid="jhid"
      :jsdwid="jsdwid">
    </TywSsfaViewModal>
  </div>
</template>

<script lang="ts" name="ypjy-tYwJcjhDept" setup>
import { ref, reactive, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import { ssjhColumns, searchFormSchema, superQuerySchema } from './TYwJcjhDept.data';
import { list, updateZt, deleteOne, batchDelete, getImportUrl, getExportUrl } from './TYwJcjhDept.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useUserStore } from '/@/store/modules/user';
import TywSsfaViewModal from './components/TywSsfaViewModal.vue'
import { useRoute } from 'vue-router';
const route = useRoute();
//计划查看弹窗
const isShow = ref(false);
const jhid = ref();
const jsdwid = ref();
const TywSsfaViewRef = ref();
const queryParam = reactive<any>({});
const userStore = useUserStore();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext } = useListPage({
  tableProps: {
    title: '检查计划单位',
    api: list,
    columns: ssjhColumns,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [
      ],
      fieldMapToTime: [
      ],
    },
    actionColumn: {
      width: 240,
      fixed: 'right'
    },
    beforeFetch: (params) => {
      if (route.query?.jhid) {
        params.jhid = route.query.jhid;
      }
      return Object.assign(params, queryParam);
    },
  },
})

const [registerTable, { reload }] = tableContext

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
      ifShow: record.zt == '1',
      label: '查看',
      onClick: handleView.bind(null, record),
    },
  ]
}
//查看实施方案
function handleView(record) {
  isShow.value = true;
  jhid.value = record.jhid;
  jsdwid.value = record.jsdw;
  TywSsfaViewRef.value.show();
}
//关闭实施方案制定
const jcqkHandleClose = (value) => {
  isShow.value = value;
};



</script>

<style lang="less" scoped>
:deep(.ant-picker),
:deep(.ant-input-number) {
  width: 100%;
}
</style>