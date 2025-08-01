<template>
  <div>
    <!--引用表格-->
   <BasicTable @register="registerTable" class="my-basic-table">
     <!--插槽:table标题-->
          <template #tableTitle>
          <a-space :wrap="true">
          <a-tag v-for="(item, idx) in tags" class="xl cursor-pointer" :color="item.color" :key="idx"
            @click="fastFitler(item)">
            <template #icon>
              <check-circle-outlined v-if="currentTag == item.value" />
            </template>{{ item.text }}
          </a-tag>
        </a-space>
       </template>
        <template #shsl="{ record }">
        <div>
        <a-button type="link" @click="getShxx(record)">{{ record.shsl }}</a-button>
        </div>
       </template>

       <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <ReportInfoModal @register="registerModal" @success="handleSuccess"></ReportInfoModal>
    <NdbgshxxModal @register="registerShModal" @success="handleSuccess"></NdbgshxxModal>
  </div>
</template>

<script lang="ts" name="zdjg-ndbg1" setup>
  import {ref, computed, unref ,watch, onMounted} from 'vue';
  import { useRoute } from 'vue-router';
  import {BasicTable, useTable, TableAction} from '/@/components/Table';
  import { CheckCircleOutlined } from '@ant-design/icons-vue';
  import {useModal} from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage'
  import ReportInfoModal from './modules/ReportInfoModal.vue'
  import NdbgshxxModal   from '/@/views/ypsczhjg/ndbg/shxx/modules/NdbgshxxModal.vue'
  import {columns, getSearchFormSchema} from './ReportInfo.data';
  import {list, deleteOne, batchDelete, getImportUrl,getExportUrl} from './ReportInfo.api';
  import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
  import { useGo } from '/@/hooks/web/usePage';
  const route = useRoute();
  //注册model
  const [registerModal, {openModal}] = useModal();
  const [registerShModal, { openModal: openShxxModal }] = useModal();
  //注册table数据
  const { prefixCls,tableContext,onExportXls,onImportXls } = useListPage({
       tableProps:{
            showIndexColumn:true,
            title: '企业年报',
            api: list,
            columns,
            canResize:false,
            // immediate: false,
            formConfig: {
               labelWidth: 80,
               schemas: getSearchFormSchema(route.query?.year),
               autoSubmitOnEnter:true,
               showAdvancedButton:false,
               async resetFunc() {
                 currentTag.value = '';
               }   
             },
            actionColumn: {
                width: 190,
             },
             defSort: {
              column: 'createDate,shxydm',
              order: 'asc'
             },
            beforeFetch(params){             
            if(route.query?.xzqhdm) params.xzqhdm= route.query?.xzqhdm;
            return params;
           }
        },
        exportConfig: {
             name:"企业年报",
             url: getExportUrl,
           },
           importConfig: {
             url: getImportUrl
           },
   })

const [registerTable, {reload, getForm},{ rowSelection, selectedRowKeys }] = tableContext;

const tags = ref([]), currentTag = ref('');
getDictItems('ypscQynbState').then((res) => {
  tags.value = res;
  if(tags.value){
     fastFitler(tags.value[1]);
  } 
}); 

async function fastFitler(item) {
  if (currentTag.value != item.value) {
    currentTag.value = item.value;
    await getForm().setFieldsValue({ state: item.value });
  } else {
    currentTag.value = '';
    await getForm().setFieldsValue({ state: '' });
  }
  reload();
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

  function handShxxSettings(record) {
    openShxxModal(true, { record:{reportId:record.id} });
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
function getTableAction(record) {
  let array: any = [{
    label: '查看', onClick: getGo.bind(null, record)
  }];
  if (record.state == '1' || record.state == '3') {
    array.push({ label: '退回', onClick: handleEdit.bind(null, record) });
    array.push({ label: '审核信息', onClick: handShxxSettings.bind(null, record) });
  }
  return array;
}
 const go = useGo();
 function getGo(record: Recordable) {
  if (record.state == '9') {
    getGoXq(record);
  } else {
    go({ path: '/zdjg/ndbg/details', query: { id: record.id } });
  }
}
 function getShxx(record: Recordable) {
  go({ path: '/ndbg/shxx', query: { id: record.id,shxydm:record.shxydm } });
}

function getGoXq(record: Recordable) {
  go(`/yqyd/ypsc/TJcQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm);
}
</script>
<style scoped>

</style>