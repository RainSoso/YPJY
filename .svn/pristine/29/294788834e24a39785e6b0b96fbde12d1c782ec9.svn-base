<template>

    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <!-- <template #tableTitle>
          </template> -->
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <ReportInfoModal @register="registerModal" @success="handleSuccess"></ReportInfoModal>

</template>

<script lang="ts" name="ndbg-reportInfo" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import ReportInfoModal from './modules/ReportInfoModal.vue'
  import {columns, getSearchFormSchema} from './ReportInfo.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './ReportInfo.api';
  import { useGo } from '/@/hooks/web/usePage';

  //注册model
  const [registerModal, {openModal}] = useModal();
  const props = defineProps({
   shxydm: { require: true, type: Object },
  })
  console.log(props.shxydm);
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
           showIndexColumn:true,
           useSearchForm: false,
           showTableSetting: false,
            api: list,
            columns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: getSearchFormSchema(),
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
            beforeFetch(params){
            params.shxydm=props.shxydm;
            params.column = 'createDate';
            params.order = 'asc';
            return params;
           }
        },
        exportConfig: {
             name:"企业年报",
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
           label: '查看',
           onClick: getGo.bind(null, record),
         },
        //  {
        //   label: '审核',
        //   onClick: handleDetail.bind(null, record),
        // },

       ]
     }
     /**
       * 下拉操作栏
       */
    // function getDropDownAction(record){
    //   return [
    //        {
    //          label: '详情',
    //          onClick: handleDetail.bind(null, record),
    //        }, {
    //          label: '删除',
    //          popConfirm: {
    //            title: '是否确认删除',
    //            confirm: handleDelete.bind(null, record),
    //          }
    //        }
    //   ]
    // }
 const go = useGo();
 function getGo(record: Recordable) {
  go({ path: '/zdjg/ndbg/details', query: { id: record.id } });
}
</script>
<style scoped>

</style>