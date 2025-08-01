<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
          <template #tableTitle>
             <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
             <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
             <!-- <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
             <!-- <a-dropdown v-if="selectedRowKeys.length > 0">
                 <template #overlay>
                    <a-menu>
                      <a-menu-item key="1" @click="batchHandleDelete">
                        <Icon icon="ant-design:delete-outlined"></Icon>
                        删除
                      </a-menu-item>
                    </a-menu>
                  </template>
                  <a-button>批量操作
                    <Icon icon="mdi:chevron-down"></Icon>
                  </a-button>
            </a-dropdown> -->
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <WtbgNoticeModal @register="registerNotModal" @success="handleSuccess"></WtbgNoticeModal>

  </div>
</template>

<script lang="ts" name="wtbgNotice-wtbgNotice" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import WtbgNoticeModal from './modules/WtbgNoticeModal.vue'
  import {columns, searchFormSchema} from './WtbgNotice.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl,queryByWtbgId} from './WtbgNotice.api';

  //注册model
  const [registerNotModal, { openModal: openNotModal }] = useModal();

  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '药品委托报告公告',
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
              params.column = 'ggsj';
               return params;
            }
        },
        exportConfig: {
             name:"药品委托报告公告",
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
    //  openModal(true, {
    //    record,
    //    isUpdate: true,
    //    showFooter: false,
    //  });
    queryByWtbgId({ id: record.id }).then(res => {
    openNotModal(true, {
      record: res || {},
      showFooter: false
    });
  })
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