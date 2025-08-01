<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" >
     <!--插槽:table标题-->
          <template #tableTitle>
             <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button> -->
             <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
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
          <template #cou="{ record }">
            <a-button type="link" @click="tojcry(record)">{{ record.cou }}</a-button>
          </template>
          <template #one="{ record }">
            <a-button type="link" @click="tojcryOne(record)">{{ record.one }}</a-button>
          </template>
          <template #two="{ record }">
            <a-button type="link" @click="tojcryTwo(record)">{{ record.two }}</a-button>
          </template>
          <template #zero="{ record }">
            <a-button type="link" @click="tojcryZero(record)">{{ record.zero }}</a-button>
          </template>
       <!--操作栏-->
      <!-- <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template> -->
    </BasicTable>

    <!-- 表单区域 -->
    <JcxtjModal @register="registerModal" @success="handleSuccess"></JcxtjModal>
  </div>
</template>

<script lang="ts" name="ypjy.rcjg-jcxtj" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import JcxtjModal from './modules/JcxtjModal.vue'
  import {columns, searchFormSchema} from './Jcxtj.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './Jcxtj.api';
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '监管人员检查项统计',
            api: list,
            columns,
            canResize:false,
            showActionColumn: false,
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
              params.column = 'cou';
              }
        },
        exportConfig: {
             name:"监管人员检查项统计",
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
           label: '编辑',
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

    function tojcry(record) {
      go({ path: `/ypjy/rcjg/RcjgjbxxListJcry/` + record.jcry + '/all' } );

    }
    function tojcryOne(record) {
      go({ path: `/ypjy/rcjg/RcjgjbxxListJcry/` + record.jcry + '/1' } );

    }
    function tojcryTwo(record) {
      go({ path: `/ypjy/rcjg/RcjgjbxxListJcry/` + record.jcry + '/2' } );

    }
    function tojcryZero(record) {
      go({ path: `/ypjy/rcjg/RcjgjbxxListJcry/` + record.jcry + '/0' } );

    }

</script>
<style scoped>

</style>