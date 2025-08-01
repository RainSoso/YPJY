<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <JcPzZjpzDetils @register="registerModal" @success="handleSuccess"></JcPzZjpzDetils>
  </div>
</template>

<script lang="ts" name="pz-jcPzZjpz" setup>
  import {ref, computed, unref, watch} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import JcPzZjpzModal from './components/JcPzZjpzModal.vue'
  import {columns, searchFormSchema} from './JcPzZjpz.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './JcPzZjpz.api';
  import JcPzZjpzDetils from '/@/views/ypsczhjg/jc/pz/components/JcPzZjpzDetils.vue';
  //注册model
   const [registerModal, { openModal }] = useModal();
   const props = defineProps({
    shxydm: { require: true, type: Object },
   })

  //注册table数据
   const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
         tableProps:{
         useSearchForm: false,
         showIndexColumn: true,
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
                width: 80,
             },
         beforeFetch(params) {
          params.column = '';
          params.order = 'desc';
          params.shxydm=props.shxydm
          return params;
        },
        },
        exportConfig: {
             name:"基础_品种_制剂品种",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext
   watch(() => props.shxydm, () => reload())
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
             onClick: handleDetail.bind(null, record)
           }
       ]
     }
     /**
       * 下拉操作栏
       */
    function getDropDownAction(record){
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
<style scoped>

</style>
