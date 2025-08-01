<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <!-- <template #tableTitle>
          </template> -->
       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <YwFxyjPzModal @register="registerModal" @success="handleSuccess"></YwFxyjPzModal>
  </div>
</template>

<script lang="ts" name="fxyj-ywFxyjPz" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import YwFxyjPzModal from './modules/YwFxyjPzModal.vue'
  import {columns, searchFormSchema} from './YwFxyjPz.data';
  import {list} from './YwFxyjPz.api';
  import { propTypes } from '/@/utils/propTypes';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const isshow = computed(() =>
    route.path == '/jgyw/fxcz' || route.query?.tags
   );
  const props = defineProps({
    pzwh: { type: String },

  });

  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext} = useListPage({
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
              width: 90,
             },
             defSort: {
                column: 'ywQty',
                order: 'desc'
              },
             beforeFetch(params) {
              if(props.pzwh)  params.yppzwh = props.pzwh;
              if(route.query?.tags) params.pzbq= route.query.tags;
              if(route.query?.year) params.year = route.query.year;
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