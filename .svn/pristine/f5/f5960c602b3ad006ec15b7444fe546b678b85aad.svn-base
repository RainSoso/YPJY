<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
     <!--插槽:table标题-->
          <template #tableTitle>
             <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <JcPzZypfklModal @register="registerModal" @success="handleSuccess"></JcPzZypfklModal>
  </div>
</template>

<script lang="ts" name="pz-jcPzZypfkl" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import JcPzZypfklModal from './components/JcPzZypfklModal.vue'
  import {columns,searchFormSchema} from './JcPzZypfkl.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './JcPzZypfkl.api';

  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '中药配方颗粒',
            showIndexColumn: true,
            api: list,
            columns,
            canResize:false,
            formConfig: {
               labelWidth: 100,
               schemas: searchFormSchema,
               autoSubmitOnEnter:true,
               autoAdvancedCol: 4,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
             defSort: {
             column: 'basj',
             order: 'desc'
            },
        },
        exportConfig: {
             name:"中药配方颗粒",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

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