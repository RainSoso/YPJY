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
    <SczkLogViewModel @register="registerViewModal" @success="handleSuccess"></SczkLogViewModel>
  </div>
</template>

<script lang="ts" name="qysczk-ywQySczkLog" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import {columns, searchFormSchema} from './YwQySczkLog.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './YwQySczkLog.api';
  import SczkLogViewModel from '/@/views/ypsczhjg/yw/qysczklog/modules/SczkLogViewModel.vue';
  const props = defineProps({
   shxydm: { require: true, type: String },
  })
  //注册model
  const [registerViewModal,{openModal:openViewModel}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            hideCheckbox: true,
            showIndexColumn:true,
            ellipsis: true,
            useSearchForm: false,
            // showActionColumn: false,
            showTableSetting: false,
            api: list,
            columns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: searchFormSchema,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 60,
             },
             beforeFetch(params){
             params.shxydm=props.shxydm;
             return params;
           }
        },
        exportConfig: {
             name:"企业停复产日志",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

   /**
    * 编辑事件
    */
  function handleEdit(record: Recordable) {
    openViewModel(true, {
       record,
       isUpdate: true,
       showFooter: true,
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
           label: '查看',
           onClick: handleEdit.bind(null, record),
           width:80
         }
       ]
     }
</script>
<style scoped>

</style>