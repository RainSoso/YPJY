<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" :rowSelection="rowSelection">
     <!--插槽:table标题-->
          <template #tableTitle>
             <a-button v-if="code == '2'" type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
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
       <!--操作栏-->
      <template   #action="{ record }">
        <TableAction v-if="code == '2'" :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
        <TableAction  v-if="code == '1'"  :actions="getDropDownAction1(record)"/>
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <FxpgbgModal @register="registerModal" @success="handleSuccess"></FxpgbgModal>
  </div>
</template>

<script lang="ts" name="ypjy.Fxpgbg-fxpgbg" setup>
  import {ref, computed, unref} from 'vue';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import FxpgbgModal from './modules/FxpgbgModal.vue'
  import {columns, searchFormSchema,searchFormSchemaMe} from './Fxpgbg.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl,getDepart,getUpdateScorce,shangbao,huitui} from './Fxpgbg.api';
  import { defHttp } from '/@/utils/http/axios';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const code = ref(route.params.code)
const { createMessage } = useMessage();
  //注册model
  const [registerModal, {openModal}] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            title: '风险评估报告',
            api: list,
            columns,
            canResize:false,
            formConfig: {
                labelWidth: 100,
               schemas: code.value == '1' ? searchFormSchema : searchFormSchemaMe,
               autoSubmitOnEnter:true,
               showAdvancedButton:true,
             },
            actionColumn: {
                width: 120,
             },
             beforeFetch(params) {
                params.code = code.value;
                //params.xzqhdm = getLikeValue(route.query.xzqhdm || params.xzqhdm);
                // if (route.query?.code) params.code = route.query?.code;
                return params;
              }
        },
        exportConfig: {
             name:"风险评估报告",
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
    async function handleAdd() {
      var  dept = await getDepart();
      openModal(true, {
        dept,
        isUpdate: false,
        showFooter: true,
      });
   }
   /**
    * 编辑事件
    */
    async function handleEdit(record: Recordable) {
    //查询子表数据进行赋值操作。
    // if(record.zt == '1') { //已发布的不能编辑
    //   createMessage.warning('已上报的风险评估报告不可编辑!');
    //   return;
    // }
    let param = {id:record.id};
    var  dept = await getUpdateScorce(param);
     openModal(true, {
      dept,
       isUpdate: true,
       showFooter: true,
     });
   }
   /**
    * 详情
   */
   async function handleDetail(record: Recordable) {
    let param = {id:record.id};
    var  dept = await getUpdateScorce(param);
     openModal(true, {
       dept,
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
   //风险评估报告上报
   async function handleShangBao(record) {
    if(record.zt == '0') {
      await shangbao({id: record.id}, reload)
    } else {
      createMessage.warning('已上报的报告不需要重复上报！');
    }
    
   }

   //风险评估报告上报
   async function handleHuitui(record) {
   
      await huitui({id: record.id}, reload)
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
           },
          //  {
          //    label: '上报',
          //    popConfirm: {
          //      title: '是否确认上报(上报后不可编辑)',
          //      confirm: handleShangBao.bind(null, record),
          //    }
          //  }, 
           {
             label: '删除',
             popConfirm: {
               title: '是否确认删除',
               confirm: handleDelete.bind(null, record),
             }
           }
      ]
    }
    //报告管理
    function getDropDownAction1(record){
      return [
           {
             label: '详情',
             onClick: handleDetail.bind(null, record),
           },
          //  {
          //    label: '回退',
          //    popConfirm: {
          //      title: '是否确认回退',
          //      confirm: handleHuitui.bind(null, record),
          //    }
          //  }
      ]
    }
</script>
<style scoped>

</style>