<template>
  <div>
    <!--引用表格-->
   <!-- <BasicTable @register="registerTable" :rowSelection="rowSelection"> -->
     <!--插槽:table标题-->
          <!-- <template #tableTitle>
             
          </template> -->
       <!--操作栏-->
      <!-- <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
      </template>
    </BasicTable> -->

    <!-- 表单区域 -->
    <!-- <CdwjRyModal @register="registerModal" @success="handleSuccess"></CdwjRyModal>
    <CdwjRyViewModal @register="registerModalView" @success="handleSuccess"></CdwjRyViewModal> -->
  </div>
</template>

<script lang="ts" name="ypjy.cdwj-cdwjRy" setup>
//   import {ref, computed, unref} from 'vue';
//   import {BasicTable, useTable, TableAction} from '/@/components/Table';
//   import {useModal} from '/@/components/Modal';
//   import { useListPage } from '/@/hooks/system/useListPage'
//   import CdwjRyModal from './modules/CdwjRyModal.vue'
//   //import CdwjRyViewModal from './modules/CdwjRyViewModal.vue'

//   import {columns, searchFormSchema} from './CdwjRy.data';
//   import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './CdwjRy.api';

//   //注册model
//   const [registerModal, {openModal}] = useModal();
//   const [registerModalView, {openModal: openModalView}] = useModal();
//   const props = defineProps({
//     data: { require: true, type: String },
//   })
  
// console.log(props.data);
//   //注册table数据
//   const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
//        tableProps:{
//             title: '场地文件人员',
//             api: list,
//             columns,
//             canResize:false,
//             formConfig: {
//                labelWidth: 120,
//                schemas: searchFormSchema,
//                autoSubmitOnEnter:true,
//                showAdvancedButton:true,
//              },
//             actionColumn: {
//                 width: 120,
//              },
//         },
//         exportConfig: {
//              name:"场地文件人员",
//              url: getExportUrl,
//            },
//            importConfig: {
//              url: getImportUrl
//            },
//    })

//    const [registerTable, {reload},{ rowSelection, selectedRowKeys }] = tableContext

//    /**
//     * 新增事件
//     */
//    function handleAdd() {
//      openModal(true, {
//        isUpdate: false,
//        showFooter: true,
//      });
//    }
//    /**
//     * 编辑事件
//     */
//   function handleEdit(record: Recordable) {
//      openModal(true, {
//        record,
//        isUpdate: true,
//        showFooter: true,
//      });
//    }
//    /**
//     * 详情
//    */
//   function handleDetail(record: Recordable) {
//     openModalView(true, {
//        record,
//        isUpdate: true,
//        showFooter: false,
//      });
//    }
//    /**
//     * 删除事件
//     */
//    async function handleDelete(record) {
//      await deleteOne({id: record.id}, reload);
//    }
//    /**
//     * 批量删除事件
//     */
//    async function batchHandleDelete() {
//      await batchDelete({ids: selectedRowKeys.value}, reload);
//    }
//    /**
//     * 成功回调
//     */
//    function handleSuccess({isUpdate, values}) {
//       reload();
//    }
//    /**
//       * 操作栏
//       */
//    function getTableAction(record){
//        return [
//          {
//            label: '编辑',
//            onClick: handleEdit.bind(null, record),
//          }
//        ]
//      }
//      /**
//        * 下拉操作栏
//        */
//     function getDropDownAction(record){
//       return [
//            {
//              label: '详情',
//              onClick: handleDetail.bind(null, record),
//            }, {
//              label: '删除',
//              popConfirm: {
//                title: '是否确认删除',
//                confirm: handleDelete.bind(null, record),
//              }
//            }
//       ]
//     }
</script>
<style scoped>

</style>