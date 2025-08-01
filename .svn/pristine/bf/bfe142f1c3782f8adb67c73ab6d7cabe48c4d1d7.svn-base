<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="zqsbStart(1)" v-if="isZqsb==0||!isZqsb"> 周期申报</a-button>
        <a-button type="primary" @click="zqsbStart(0)" v-if="isZqsb==1"> 临时申报</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="outSbData('notKy')"> 导出省局申报</a-button>
        <!-- <a-button type="primary" preIcon="ant-design:export-outlined" @click="outSbData('ky')"> 导出省局申报(科研)</a-button> -->
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="outdata"> 导出年度一览表</a-button>  
        
        <!-- <a href="javascript:;" @click="downloadFile('tysb/tysbText.docx')" title="下载"><span style="font-size: 16px;">特殊药品申报功能操作说明</span></a> -->
        <a-dropdown v-if="selectedRowKeys.length > 0">
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
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <PYwTyjhsqModal @register="registerModal" @success="handleSuccess" width="1200px" :footer="null"></PYwTyjhsqModal>
    <SjtysbDetailsModal @register="registerDetailsModal" width="1200px"></sjtysbDetailsModal>
  </div>
</template>

<script lang="ts" name="yw-pYwTyjhsq" setup>
import { ref, computed, unref,watch } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import PYwTyjhsqModal from './components/PYwTyjhsqModal.vue';
import SjtysbDetailsModal from './components/sjtysbDetailsModal.vue';
import { columns, getSearchFormSchema } from './PYwTyjhsq.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './PYwTyjhsq.api';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import {getToken} from '/@/utils/auth/index';
import { defHttp } from '/@/utils/http/axios';
import { formatToDateTime } from '/@/utils/dateUtil';
const emit = defineEmits(['success']);
const keyid = computed(() => props.data?.key)
const para=ref({});
const isZqsb=ref();
const props = defineProps({
  data: { require: true, type: Object },
})
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
const checkedKeys = ref<Array<string | number>>([]);
//注册model
const [registerModal, { openModal }] = useModal();
const [registerDetailsModal, { openModal: openDetailsModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'p_yw_tyjhsq',
    showIndexColumn:true,
    api: list,
    columns,
    canResize: false,
    formConfig: {
      //labelWidth: 120,
      schemas: getSearchFormSchema(),
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [],
      fieldMapToTime: [],
    },
   
    actionColumn: {
      width: 180,
      fixed: 'right',
    },
    beforeFetch(params){
      const str = keyid.value.split('-');
      params.jhYear = str[0];
      params.sbState = str[1];
      params.qymc = str[2];
      if(str[3]){
        params.jhTitle = str[3];
      }
      para.value=params;
      defHttp.get({url:'/tysb/pYwTyjhsqRz/getIsZqsb' , params:{}}).then(res=>{
        isZqsb.value=res.isZqsb;
      });
      return params;
    }
  },
  
  exportConfig: {
    name: '特药生产（需用）计划表',
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess,
  },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;
watch(() => props.data, () => reload())

function outdata(){
  let p='?jhYear='+para.value.jhYear;
  if(para.value.sbState)p=p+"&sbState="+para.value.sbState;
  if(para.value.jhTitle)p=p+"&jhTitle="+para.value.jhTitle;
  if(para.value.qymc)p=p+"&qymc="+para.value.qymc;

  let url1=VITE_GLOB_DOMAIN_URL + '/yw/tysb/pYwTyjhsq/outdata'+p;
  let token = getToken()
	let xhr = new XMLHttpRequest()
  let time=formatToDateTime(new Date(),"YYYYMMDDHHmm");
	xhr.open('get', url1, true)
	xhr.responseType = 'blob'
	xhr.setRequestHeader('X-Access-Token', token)  // 将token添加到请求头
	xhr.onload = function(){
		if(this.status == 200){
			var blob = this.response;
			var aa = document.createElement('a');
			var url = window.URL.createObjectURL(blob);
			aa.href = url;
			aa.download = '特药申报计划年度一览表'+time+'.xlsx';
		}
		aa.click();
	}
	xhr.send()
}

function outSbData(text){
  let url1=VITE_GLOB_DOMAIN_URL + '/yw/tysb/pYwTyjhsq/outSbdata'+"?isky="+text;
  let token = getToken()
	let xhr = new XMLHttpRequest()
  let time=formatToDateTime(new Date(),"YYYYMMDDHHmm");
	xhr.open('get', url1, true)
	xhr.responseType = 'blob'
	xhr.setRequestHeader('X-Access-Token', token)  // 将token添加到请求头
	xhr.onload = function(){
		if(this.status == 200){
			var blob = this.response;
			var aa = document.createElement('a');
			var url = window.URL.createObjectURL(blob);
			aa.href = url;
			aa.download = '特药申报计划'+time+'.xlsx';
		}
		aa.click();
	}
	xhr.send()
}


function downloadFile(url) {
  downloadByUrl({
    url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + url,
    target: '_self',
  }); 
}

function zqsbStart(text) {
   defHttp.post({url:'/tysb/pYwTyjhsqRz/add' , params:{isZqsb:text}}).then(res=>{
    isZqsb.value=res.isZqsb;
   });
}

/**
 * 编辑事件
 */
function handleEdit(record: Recordable, sbState) {
  let a={
    record,
    isUpdate: true,
    showFooter: true,
  }
  if(sbState!=0){
    a.sbState=sbState;
  }
  openModal(true, a);
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteOne({ id: record.id }, handleSuccess);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, handleSuccess);
}
/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
  emit('success');
}
/**
 * 操作栏
 */
function getTableAction(record) {
  let array: any = [];
  let s=""
  let status=""
  if (record.sbState == "10") {
    s='计划申报'
    status="20"
  }
  if (record.sbState == "20") {
    s='计划批复'
    status="30"
  }
  if (record.sbState == "40") {
    s='追加申报'
    status="50"
  }
  if (record.sbState == "50") {
    s='追加批复'
    status="60"
  }
  if (record.sbState == 60 || record.sbState == 30) {
    s='编辑'
    status="0"
  }
  if (record.sbState == 80 || record.sbState == 90) {
    s='查看'
    status="0"
  }
  array.push({
        label: s,
        onClick: handleEdit.bind(null, record, status),
      },)

  array.push({
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    },)    
  return array    

  

  // if (record.sbState == 10) {
  //   return [
  //     {
  //       label: '计划申报',
  //       onClick: handleEdit.bind(null, record, 20),
  //     },
  //   ];
  // }
  // if (record.sbState == 20) {
  //   return [
  //     {
  //       label: '计划批复',
  //       onClick: handleEdit.bind(null, record, 30),
  //     },
  //   ];
  // }
  // if (record.sbState == 40) {
  //   return [
  //     {
  //       label: '追加申报',
  //       onClick: handleEdit.bind(null, record, 50),
  //     },
  //   ];
  // }
  // if (record.sbState == 50) {
  //   return [
  //     {
  //       label: '追加批复',
  //       onClick: handleEdit.bind(null, record, 60),
  //     },
  //   ];
  // }
  // if (record.sbState == 60 || record.sbState == 30) {
  //   return [
  //   {
  //     label: '编辑',
  //     onClick: handleEdit.bind(null, record,0),
  //   },
  //   ];
  // }
  
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
  return [
    
    {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    },
  ];
}
</script>

<style scoped></style>