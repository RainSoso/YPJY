<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
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
    <DsfptModal @register="registerModal" @success="handleSuccess"></DsfptModal>
  </div>
</template>

<script lang="ts" name="ypjy.dsfpt-dsfpt" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import DsfptModal from './modules/DsfptModal.vue'
  import {columns, searchFormSchema} from './Dsfpt.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './Dsfpt.api';
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const xzqh = ref(route.params.xzqh);
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '药品网络销售第三方平台',
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
                width: 120,
             },
             beforeFetch(params) {
              params.xzqh = xzqh.value;
             }
        },
        exportConfig: {
             name:"药品网络销售第三方平台",
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
   function getGo(record: Recordable) {
        go({ path: `/ypjy/dsfpt/DsfptQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm });
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