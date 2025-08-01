<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <!-- <template #tableTitle> -->
             <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
             <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
             <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
             <a-dropdown v-if="selectedRowKeys.length > 0">
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
          <!-- </template> -->
         <template #scsl="{ record }">
          <span>title</span>   
      </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <wpzSaleInfoModal @register="registerModal" @success="handleSuccess"></wpzSaleInfoModal>
  </div>
</template>

<script lang="ts" name="ndbg-durgsSaleInfo" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import wpzSaleInfoModal from './modules/wpzSaleInfoModal.vue'
  import {columns,wpzcolumns, searchFormSchema} from './DurgsSaleInfo.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './DurgsSaleInfo.api';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            showIndexColumn:true,
            useSearchForm: false,
            showTableSetting: false,
            title: '',
            api: list,
            columns: wpzcolumns,
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
            beforeFetch(params){
            params.durgBasicInfoId=route.query?.id;  
            params.drugApproveNo=route.query?.drugApproveNo;
            params.drugName=route.query?.drugName;
            params.column = 'createDate';
            params.order = 'asc';
            return params;
           }
        },
        exportConfig: {
             name:"药品销售",
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
       record:{durgBasicInfoId:route.query?.id,drugApproveNo:route.query?.drugApproveNo,gg:route.query?.spec},
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
           onClick: handleEdit.bind(null, record),
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