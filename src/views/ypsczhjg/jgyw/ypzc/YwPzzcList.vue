<template>
  <div>
   <BasicTable @register="registerTable">
     <!--插槽:table标题-->
          <template #tableTitle>
          </template>
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>
    <YwPzzcModal @register="registerModal" @success="handleSuccess"></YwPzzcModal>
  </div>
</template>

<script lang="ts" name="yw-ywPzzc" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import YwPzzcModal from './modules/YwPzzcModal.vue'
  import {columns, getSearchFormSchema} from './YwPzzc.data';
  import {list} from './YwPzzc.api';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext} = useListPage({
       tableProps:{
            title: '业务_药品注册表',
            showIndexColumn: true,
            canResize: false,
            api: list,
            columns,
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
             column: 'bdsj',
             order: 'desc',
           },
           beforeFetch(params){
            params.qxdm = route.query?.xzqhdm;
            params.zcbs = route.query?.zcbs;
            params.cx = route.query?.cx;
            return params;
           }
        },
   })

   const [registerTable, {reload},{}] = tableContext


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
           onClick: handleEdit.bind(null, record),
         }
       ]
     }

</script>
<style scoped>

</style>