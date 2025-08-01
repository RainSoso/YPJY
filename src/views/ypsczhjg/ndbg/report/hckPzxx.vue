<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <template #tableTitle>
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <DrugsBasicInfoModal @register="registerModal" @success="handleSuccess"></DrugsBasicInfoModal>
  </div>
</template>

<script lang="ts" name="ndbg-drugsBasicInfo" setup>
  import {ref, computed, unref,watch} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import DrugsBasicInfoModal from './modules/DrugsBasicInfoModal.vue'
  import {ckpzcolumns, getSearchFormSchema} from './ReportInfo.data';
  import {ckxxDrugs,list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './ReportInfo.api';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  //注册model
  const [registerModal, {openModal}] = useModal();
  const props = defineProps({
  data: { require: true, type: Object },
 })
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '品种报告信息',
            showIndexColumn:true,
            api: ckxxDrugs,
            columns:ckpzcolumns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: getSearchFormSchema(null),
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
             defSort: {
              column: 'yppzwh',
              order: 'asc'
             },
            beforeFetch(params){
            return params;
           }
        },
        exportConfig: {
             name:"品种报告信息",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext
   watch(() => props.data, () => reload())
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
           onClick: getGo.bind(null, record),
         },
       ]
     }

 const go = useGo();
 function getGo(record: Recordable) {
   if(record.flag=='1'){//代表无批号
    go({ path: '/zdjg/wpwh/detail', query: { id: record.id,drugName:record.yptymc,drugApproveNo:record.yppzwh,dosageType:record.dosageType,spec:record.specifications,qymc:props.data} });
   }else{
    go({ path: '/zdjg/pzbg/details', query: { id: record.id,drugName:record.yptymc,drugApproveNo:record.yppzwh,dosageType:record.dosageType,spec:record.specifications,qymc:props.data} });
   } 
}
</script>
<style scoped>

</style>