<template>
  <a-modal v-model:visible="isShow" title="检查计划" width="100%" wrap-class-name="full-modal" @cancel="handleCancel"
    destroyOnClose=true>
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!-- <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
        <!-- <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
      </template>
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>

  </a-modal>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, unref, defineExpose, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { columns, searchFormSchema, superQuerySchema } from '../TYwJcjhSs.data';
import { list, getImportUrl, getExportUrl } from '../TYwJcjhJcqk.api';
import { } from 'vue';
const props = defineProps({
  isShow: Boolean,
  jhid: String,
  jsdwid: String,
  fj: String
});
const emit = defineEmits(['jcqkHandleClose']);
function handleCancel() {
  handleSuccess()
  emit('jcqkHandleClose', false);
}
function show() {
  // props.isShow = true;
  nextTick(() => {
    reload();
  });

}
defineExpose({
  show,
})
function handleSuccess() {
}
//----------------------------------列表------------------------------
//***************************带选择列表--start************************************** */
const queryParam = reactive<any>({});
const checkedKeys = ref<Array<string | number>>([]);
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '检查计划实施方案',
    api: list,
    columns,
    size: 'small',
    showActionColumn: false,
    canResize: false,
    striped: true,//斑马纹设置
    rowKey: "shxydm",
    formConfig: {
      //labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
      fieldMapToNumber: [
      ],
      fieldMapToTime: [
      ],
    },
    actionColumn: {
      width: 120,
      fixed: 'right'
    },
    beforeFetch: (params) => {
      params.jhid = props.jhid;
      params.ssdwid = props.jsdwid;
      params.isView = '1';
      return Object.assign(params, queryParam);
    },
  },
  exportConfig: {
    name: "检查计划实施方案",
    url: getExportUrl,
    params: queryParam,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})

const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext

</script>
<style scoped></style>