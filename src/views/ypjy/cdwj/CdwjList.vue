<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
          <template #tableTitle>
             <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
             <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
             <!-- <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getChakan(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <CdwjModal @register="registerModal" @success="handleSuccess"></CdwjModal>
  </div>
</template>

<script lang="ts" name="ypjy.cdwj-cdwj" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import CdwjModal from './modules/CdwjModal.vue'
  import {columns, searchFormSchema} from './Cdwj.data';
  import {smfList, deleteOne, batchDelete, getImportUrl,getExportUrl} from './Cdwj.api';
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();
  import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '场地文件',
            api: smfList,
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
        },
        exportConfig: {
             name:"场地文件",
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
    if(record.zt == '2') {
      openModal(true, {
       record,
       isUpdate: true,
       showFooter: true,
     });
    } else {
      createMessage.warning('只能审核提交的报告数据');
    }
     
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
           label: '编辑',
           onClick: handleEdit.bind(null, record),
         }
       ]
     }

     function getChakan(record){
       return [
         {
           label: '查看',
           onClick: getGo.bind(null, record),
         },
         {
           label: '审核',
           onClick: handleEdit.bind(null, record),
         }
       ]
     }
     function getGo(record: Recordable) {
        go({ path: '/smf/cdwjJbxx/smfList', query: { id: record.shxydm,nd: record.nd } });
        //这个市跳转企业详情的
        //go({ path: `/ypjy/cdwj/CdwjQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm });
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