<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
     <!--插槽:table标题-->
          <template #tableTitle>
             <!-- <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
          </template>
          <template #jcjc="{ record }">
            <a-button type="link" @click="tojcjc(record)">{{ record.jcjc }}</a-button>
          </template>
          <template #xqzg="{ record }">
            <a-button type="link" @click="toxqzg(record)">{{ record.xqzg }}</a-button>
          </template>
          <template #las="{ record }">
            <a-button type="link" @click="tolas(record)">{{ record.las }}</a-button>
          </template>
          <template #jas="{ record }">
            <a-button type="link" @click="tojas(record)">{{ record.jas }}</a-button>
          </template>
          <template #dxxkz="{ record }">
            <a-button type="link" @click="todxxkz(record)">{{ record.dxxkz }}</a-button>
          </template>
          <template #cjbhg="{ record }">
            <a-button type="link" @click="tocjbhg(record)">{{ record.cjbhg }}</a-button>
          </template>
    </BasicTable>
    <!-- 表单区域 -->
    <FxpgbgMxModal @register="registerModal" @success="handleSuccess"></FxpgbgMxModal>
  </div>
</template>

<script lang="ts" name="ypjy.FxpgbgMx-fxpgbgM-QY" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import FxpgbgMxModal from './modules/FxpgbgMxModal.vue'
  import {columnsQy,columns, searchFormSchemaQy} from './FxpgbgMx.data';
  import {lselectPageFxbgQyst, deleteOne, batchDelete, getImportUrl,getExportUrl} from './FxpgbgMx.api';
  import { useRoute } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '风险评估报告明细',
            api: lselectPageFxbgQyst,
            columns: columnsQy,
            canResize:false,
            showActionColumn: false,
            formConfig: {
               labelWidth: 120,
               schemas: searchFormSchemaQy,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
            
        },
        exportConfig: {
             name:"风险评估报告明细",
             url: getExportUrl,
            //  params: {
            //   code : code.value
            //  }
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, { reload }, {  selectedRowKeys }] = tableContext

   function tojcjc(record) {
      var param = { fxpgbg:'2', shxydm: record.shxydm }
      if(record.jcjc != 0) {
        go({ path: '/rcjg/jcbgglFxpgbg', query: param });
      }
      
    }

    function toxqzg(record) {
      var param = { fxpgbg:'2', shxydm: record.shxydm,clickType : '3' }
      if(record.xqzg != 0) {
        go({ path: '/rcjg/jcbgglFxpgbg', query: param });
      }
    }

    function tolas(record) {
      var param = { fxpgbg:'2', shxydm: record.shxydm ,clickType:'las'}
      if(record.las != 0) {
        go({ path: '/zfcf/zfcfFxpgbg', query: param });
      }
    }

    function tojas(record) {
      var param = { fxpgbg:'2', shxydm: record.shxydm,clickType:'jas' }
      if(record.jas != 0) {
        go({ path: '/zfcf/zfcfFxpgbg', query: param });
      }
    }

    function todxxkz(record) {
      var param = { fxpgbg:'2', shxydm: record.shxydm,clickType:'dxxkz'  }
      if(record.dxxkz != 0) {
        go({ path: '/zfcf/zfcfFxpgbg', query: param });
      }
    }
    function tocjbhg(record) {
      var param = { fxpgbg:'2', shxydm: record.shxydm,jyjg:'2'  }
      if(record.cjbhg != 0) {
        go({ path: '/jgyw/jyypcj', query: param });
      }
    }
    

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
</script>
<style scoped>

</style>