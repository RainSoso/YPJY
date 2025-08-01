<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable">
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
       <!--操作栏-->
      <!-- <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template> -->
    </BasicTable>

    <!-- 表单区域 -->
    <FxpgbgMxModal @register="registerModal" @success="handleSuccess"></FxpgbgMxModal>
  </div>
</template>

<script lang="ts" name="ypjy.FxpgbgMx-fxpgbgMx" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import FxpgbgMxModal from './modules/FxpgbgMxModal.vue'
  import {columns, searchFormSchema,searchFormSchema1} from './FxpgbgMx.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './FxpgbgMx.api';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  import { useGo } from '/@/hooks/web/usePage';
  const go = useGo();
  const code = ref(route.params.code);
  const begin_ = ref('');
  const end_ = ref('');
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '风险评估报告明细',
            api: list,
            columns,
            pagination: false,
            showActionColumn: false,
            formConfig: {
               labelWidth: 120,
               schemas: code.value == '1' ? searchFormSchema : searchFormSchema1,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
             beforeFetch(params) {
                params.code = code.value;
                begin_.value = params.begin;
                end_.value = params.end;
                //params.xzqhdm = getLikeValue(route.query.xzqhdm || params.xzqhdm);
                // if (route.query?.code) params.code = route.query?.code;
                return params;
              }
        },
        exportConfig: {
             name:"风险评估报告明细",
             url: getExportUrl,
             params: {
              code : code.value
             }
           },
           importConfig: {
             url: getImportUrl
           },
   })

   const [registerTable, {reload},{  selectedRowKeys }] = tableContext

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

    function tojcjc(record) {
      var param = { fxpgbg:'1', type: record.type ,xzqh : record.xzqhdm,clickType: 'jcjc',begin: begin_.value,end: end_.value}
      if(record.jcjc != 0) {
        go({ path: '/rcjg/jcbgglFxpgbg', query: param });
      }
      
    }

    function toxqzg(record) {
      var param = { fxpgbg:'1', type: record.type ,xzqh : record.xzqhdm,clickType: 'xqzg',begin: begin_.value,end: end_.value}
      if(record.xqzg != 0) {
        go({ path: '/rcjg/jcbgglFxpgbg', query: param });
      }
    }

    function tolas(record) {
      var param = { fxpgbg:'1', type: record.type ,xzqh : record.xzqhdm,clickType: 'las',begin: begin_.value,end: end_.value}
      if(record.las != 0) {
        go({ path: '/zfcf/zfcfFxpgbg', query: param });
      }
    }

    function tojas(record) {
      var param = { fxpgbg:'1', type: record.type ,xzqh : record.xzqhdm,clickType: 'jas',begin: begin_.value,end: end_.value}
      if(record.jas != 0) {
        go({ path: '/zfcf/zfcfFxpgbg', query: param });
      }
    }

    function todxxkz(record) {
      var param = { fxpgbg:'1', type: record.type ,xzqh : record.xzqhdm,clickType: 'dxxkz',begin: begin_.value,end: end_.value}
      if(record.dxxkz != 0) {
        go({ path: '/zfcf/zfcfFxpgbg', query: param });
      }
    }
</script>
<style scoped>

</style>