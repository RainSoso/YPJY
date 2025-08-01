<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <template #tableTitle>
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <ndbgShxxView @register="registerModal" @success="handleSuccess"></ndbgShxxView>
  </div>
</template>

<script lang="ts" name="ndbg-ndbgshxx" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import ndbgShxxView from './modules/ndbgShxxView.vue'
  import {columns, searchFormSchema} from './Ndbgshxx.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './Ndbgshxx.api';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '年度报告-审核信息',
            showIndexColumn:true,
            api: list,
            columns,
            canResize:false,
            useSearchForm:false,
            formConfig: {
               labelWidth: 120,        
               schemas: searchFormSchema,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
            beforeFetch(params){
            params.reportId = route.query?.id;
            return params;
           }
        },
        exportConfig: {
             name:"年度报告-审核信息",
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
           onClick: handleDetail.bind(null, record),
         }        
       ]
     }
</script>
<style scoped>

</style>