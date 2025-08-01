<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
          <template #tableTitle>
             
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <XkzsModal @register="registerModal" @success="handleSuccess"></XkzsModal>
    <HlwypxxView @register="registerModalHlw" @success="handleSuccess"></HlwypxxView>
    <WlxsdsfptView @register="registerModalDsfpt" @success="handleSuccess"></WlxsdsfptView>

    
  </div>
</template>

<script lang="ts" name="ypjy.xkzs-xkzs" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import XkzsModal from './modules/XkzsModal.vue'
  import HlwypxxView from './modules/HlwypxxView.vue'
  import WlxsdsfptView from './modules/WlxsdsfptView.vue'
  
  import {columns, searchFormSchema} from './Xkzs.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl,listByType} from './Xkzs.api';
  import { useRoute } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  import { propTypes } from '/@/utils/propTypes';
  const go = useGo();
  const route = useRoute();
  const type = ref(route.params.type)
  const shxydm = route.params?.qyid;
  //注册model
  const [registerModal, {openModal}] = useModal();
  const [registerModalHlw, {openModal: openModalHlw}] = useModal();
  const [  registerModalDsfpt, {openModal: openModalDsfpt}] = useModal();

  
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            useSearchForm: true,
            showTableSetting: false,
            api: list,
            columns,
            canResize:false,
            useSearchForm: false,
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
                params.shxydm = shxydm;
                return params;
              },
        },
        exportConfig: {
             name:"1",
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
   async function handleDetail(record: Recordable) {
    //根据证书类型和社会信用代码查询具体的表信息
    var data = await  listByType({id: record.id,type: record.type});
    data.type = record.type;
    debugger
    if(record.type == '5') {
      openModalHlw(true, {
        data,
        isUpdate: true,
        showFooter: false,
      });
    } else if(record.type == '6') {
      openModalDsfpt(true, {
        data,
        isUpdate: true,
        showFooter: false,
     });
    } else {
      openModal(true, {
      data,
       isUpdate: true,
       showFooter: false,
     });
    }
    
     
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
           onClick: handleDetail.bind(null, record),
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