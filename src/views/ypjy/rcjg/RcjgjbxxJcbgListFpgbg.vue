<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" >
     <!--插槽:table标题-->
          <template #tableTitle>
             <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <RcjgjbxxModal @register="registerModal" @success="handleSuccess"></RcjgjbxxModal>
    <RcjgjbxxxxModal @register="rcjgjbxxxxModal" @success="handleSuccess"></RcjgjbxxxxModal>


  </div>
</template>

<script lang="ts" name="qyda.rcjgjbxx-rcjgjbxx" setup>
import { ref, computed, unref, watch } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import RcjgjbxxModal from './modules/RcjgjbxxYpscViwe.vue'
import RcjgjbxxxxModal from './modules/RcjgjbxxViwe.vue'


import { columns, searchFormSchema } from './Rcjgjbxx.data';
import { listFxpgbg, deleteOne, batchDelete, getImportUrl, getExportUrl, listMx } from './Rcjgjbxx.api';
import { useRoute } from 'vue-router';
import { useGo } from '/@/hooks/web/usePage';
import { propTypes } from '/@/utils/propTypes';

const props = defineProps({
  shxydm: propTypes.string
});

//注册model
const [registerModal, { openModal }] = useModal();
const [rcjgjbxxxxModal, { openModal: openModalRcjgjbxxxx }] = useModal();
const go = useGo();
const route = useRoute();
const type = ref(route.params.type)
const shxydm = route.params?.qyid;
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    showTableSetting: false,
    api: listFxpgbg,
    columns,
    canResize: false,
    formConfig: {
      labelWidth: 120,
      //schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
    },
    actionColumn: {
      width: 120,
    },
    beforeFetch(params) {
      //风险报告页面钻取进入
      if (route.query?.fxpgbg) params.fxpgbg = route.query.fxpgbg;
      if (route.query?.type) params.type = route.query.type;
      if (route.query?.xzqh) params.xzqh = route.query.xzqh;
      if (route.query?.clickType) params.clickType = route.query.clickType;
      if (route.query?.begin) params.begin = route.query.begin;
      if (route.query?.end) params.end = route.query.end;
      if (route.query?.shxydm) params.shxydm = route.query.shxydm;
      
      return params;
    },

  },
  exportConfig: {
    name: "日常监管基本信息",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

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
async function handleEdit(record: Recordable) {
  var data = await listMx({ ypyjjgid: record.id });
  record.mx = data;
  // if(record.code == '01' ) {
  //   openModal(true, {
  //    record,
  //    isUpdate: true,
  //    showFooter: true,
  //  });
  // } else {
  openModalRcjgjbxxxx(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
  // }
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