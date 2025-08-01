<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

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
  import { propTypes } from '/@/utils/propTypes';

  const route = useRoute();
  const go = useGo();
  //注册model
  const [registerModal, {openModal}] = useModal();

  const props = defineProps({
    shxydm: { require: true, type: String }

  });

  //注册table数据
  const { prefixCls,tableContext} = useListPage({
       tableProps:{
            showIndexColumn:true,
            useSearchForm: false,
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
                width: 120,
             },
            beforeFetch(params){
            params.shxydm=props.shxydm || route.params.qyid;
            return params;
           }
        }
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

   

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
         }
       ]
     }

</script>
<style scoped>

</style>