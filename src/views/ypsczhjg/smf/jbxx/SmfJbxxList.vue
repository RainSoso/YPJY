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
    <SmfJbxxModal @register="registerModal" @success="handleSuccess"></SmfJbxxModal>
  </div>
</template>

<script lang="ts" name="smf-smfJbxx" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import SmfJbxxModal from './modules/SmfJbxxModal.vue'
  import {columns, searchFormSchema} from './SmfJbxx.data';
  import {list} from './SmfJbxx.api';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const go = useGo();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext} = useListPage({
       tableProps:{
            title: 'SMF企业基本信息',
            showIndexColumn:true,
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
        }
   })

   const [registerTable, {reload},{ selectedRowKeys }] = tableContext


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

   

 function getGo(record: Recordable) {
    go({ path: '/smf/jbxx/details', query: { id: record.id } });  
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
          label:'查看',
          onClick: getGo.bind(null,record),
         },
         {
           label: '审核',
           onClick: handleEdit.bind(null, record),
         }
       ]
     }

</script>
<style scoped>

</style>