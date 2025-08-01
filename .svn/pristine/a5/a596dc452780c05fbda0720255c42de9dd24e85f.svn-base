<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
          <template #tableTitle>
             <a-button v-if="code == '1'" type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
             <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
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
        <TableAction v-if="code == '2'" :actions="getTableActionChaKan(record)" />
        <TableAction v-else  :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <ZxpxModal @register="registerModal" @success="handleSuccess"></ZxpxModal>
  </div>
</template>

<script lang="ts" name="ypjy.zxpx-zxpx" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import ZxpxModal from './modules/ZxpxModal.vue'
  import {columns, searchFormSchema} from './Zxpx.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl,fabu,xiaxian} from './Zxpx.api';
  import { useRoute } from 'vue-router';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const route = useRoute();
  const code = ref(route.params.code)
  console.log("code--" +   code.value)
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '在线培训',
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
                params.code = code.value;
                return params;
              }
        },
        exportConfig: {
             name:"在线培训",
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
    if(record.zt == '1') {
      createMessage.warning('已发布的培训数据不可编辑!');
      return;
    }
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

   // 发布
   async function handleFabu(record) {
     await fabu({id: record.id}, reload);
   }

     // 下线
  async function handleXiaxian(record) {
     await xiaxian({id: record.id}, reload);
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

     function getTableActionChaKan(record){
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
             label: '发布',
             onClick: handleFabu.bind(null, record),
           },
           {
             label: '下线',
             onClick: handleXiaxian.bind(null, record),
           },
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