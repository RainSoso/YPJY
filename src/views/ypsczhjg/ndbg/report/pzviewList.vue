<template>

    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <!-- <template #tableTitle>
          </template> -->
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <ReportInfoModal @register="registerModal" @success="handleSuccess"></ReportInfoModal>

</template>

<script lang="ts" name="ndbg-reportInfo" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import ReportInfoModal from './modules/ReportInfoModal.vue'
  import {columns, getSearchFormSchema} from './ReportInfo.data';
  import { useGo } from '/@/hooks/web/usePage';
  import { propTypes } from "/@/utils/propTypes";

  //注册model
  const [registerModal, {openModal}] = useModal();
  const props = defineProps({
   data: propTypes.array.def([]),
  })
  console.log(props.data);
  //注册table数据
  const { prefixCls,tableContext } = useListPage({
       tableProps:{
           showIndexColumn:true,
           useSearchForm: false,
           showTableSetting: false,
           dataSource:props.data,
            columns,
            canResize:false,
            formConfig: {
               labelWidth: 120,
               schemas: getSearchFormSchema(),
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
            beforeFetch(params){
            params.column = 'createDate';
            params.order = 'asc';
            return params;
           }
        },
   })

   const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

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
         },
       ]
     }
 const go = useGo();
 function getGo(record: Recordable) {
  go({ path: '/zdjg/pzbg/details', query: { id: record.id,drugName:record.drugName,drugApproveNo:record.drugApproveNo,dosageType:record.dosageType,spec:record.specifications,qymc:record.qymc} });
}
</script>
<style scoped>

</style>