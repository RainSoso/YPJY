<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
     <!--插槽:table标题-->
          <template #tableTitle>
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <TsjbComplaintInfoModal @register="registerModal" @success="handleSuccess"></TsjbComplaintInfoModal>
  </div>
</template>

<script lang="ts" name="tsjb-tsjbComplaintInfo" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import TsjbComplaintInfoModal from './modules/TsjbComplaintInfoModal.vue'
  import {columns, searchFormSchema} from './TsjbComplaintInfo.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './TsjbComplaintInfo.api';

  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '投诉举报信息',
            api: list,
            showIndexColumn: true,
            columns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: searchFormSchema,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
             defSort: {
                column: 'lrsj',
                order: 'desc'
              },
        },
        exportConfig: {
             name:"投诉举报信息",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

   
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
     await deleteOne({id: record.id}, reload);
   }
   /**
    * 批量删除事件
    */
   async function batchHandleDelete() {
     await batchDelete({ids: selectedRowKeys.value}, reload);
   }
   /**
    * 成功回调
    */
   function handleSuccess({isUpdate, values}) {
      reload();
   }
   /**
      * 操作栏
      */
   function getTableAction(record){
       return [
         {
           label: '详情',
           onClick: handleDetail.bind(null, record),
         }
       ]
     }
</script>
<style scoped>

</style>