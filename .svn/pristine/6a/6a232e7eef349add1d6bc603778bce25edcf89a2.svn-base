<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" >
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <YwFxyjQyModal @register="registerModal" @success="handleSuccess"></YwFxyjQyModal>
  </div>
</template>

<script lang="ts" name="fxyj-ywFxyjQy" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import YwFxyjQyModal from './modules/YwFxyjQyModal.vue'
  import {columns, searchFormSchema} from './YwFxyjQy.data';
  import {list} from './YwFxyjQy.api';
  import { propTypes } from '/@/utils/propTypes';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const isshow = computed(() =>
    route.path == '/jgyw/fxcz'
   );
  const props = defineProps({
    shxydm: { require: true, type: String }

  });
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            useSearchForm: isshow,
            showIndexColumn:true,
            showTableSetting: isshow,
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
             defSort: {
                column: 'ywQty',
                order: 'desc'
              },
             beforeFetch(params) {
              if(props.shxydm)  params.shxydm = props.shxydm;
              params.delFlag = '0';
              return params;
            }
        },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

  
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