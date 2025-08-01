<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="24" :md="24" style="margin-bottom: 10px">
      <DepartLeftTree ref="leftTree" @select="onTreeSelect" />
    </a-col>
    <a-col :xl="18" :lg="24" :md="24" style="margin-bottom: 10px">
      <div style="height: 100%; background-color: white">
        <!--引用表格-->
        <BasicTable @register="registerTable">
          <template #post="{ text }">
            {{ (text || '').split(',').map((t) => (positionInfo[t] ? positionInfo[t] : t)).join(',') }}
          </template>
          <template #tableTitle v-if="!props.readonly">
            <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"
              v-if="isMange && hasPermission('uias:contacts:add')">新增</a-button>
            <j-upload-button type="primary" @click="onImportXls" preIcon="ant-design:import-outlined"
              v-if="isMange && hasPermission('uias:contacts:import')">导入</j-upload-button>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls">导出</a-button>
          </template>
          <template #action="{ record }">
            <TableAction :actions="getTableAction(record)" />
          </template>
        </BasicTable>
        <UiasMalllistUserModal @register="registerModal" @success="handleSuccess"></UiasMalllistUserModal>
      </div>
    </a-col>
  </a-row>
</template>
  
<script lang="ts" setup>
import { provide, ref, computed } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { useDesign } from '/@/hooks/web/useDesign';
import DepartLeftTree from '/@/views/system/address/components/DepartLeftTree.vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import { usePermission } from '/@/hooks/web/usePermission';
import Tools from '/@/utils/tools';
import { columns, searchFormSchema } from './UiasMalllistUser.data';
import { list, deleteOne, positionList, getImportUrl, getExportUrl } from './UiasMalllistUser.api';
import UiasMalllistUserModal from './modules/UiasMalllistUserModal.vue';

const props = defineProps({
  readonly: propTypes.bool.def(false)
});

const isMange = computed(() => !props.readonly && (Tools.hasPermission('uias:contacts:allData') || Tools.isSysAdmin() || Tools.isSubOrg(orgCode.value)))
  , isMangeEdit = computed(() => isMange.value && Tools.hasPermission('uias:contacts:edit'))
  , isMangeDelete = computed(() => isMange.value && Tools.hasPermission('uias:contacts:delete'))
  , tableColumns = computed(() => {
    if (!props.readonly) return columns;
    let array = [...columns];
    array.pop();
    return array;
  });

const { hasPermission } = usePermission();
const { prefixCls } = useDesign('address-list');
provide('prefixCls', prefixCls);
const [registerModal, { openModal }] = useModal();
// 给子组件定义一个ref变量
const leftTree = ref();

// 当前选中的部门code
const orgCode = ref('');
const positionInfo = ref({});

// 列表页面公共参数、方法
const { tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    api: list, immediate: false, columns: tableColumns, rowKey: 'id', showIndexColumn: true, canResize: false, showTableSetting: false,
    formConfig: {
      labelWidth: 60, schemas: searchFormSchema, autoSubmitOnEnter: true, showAdvancedButton: true
    },
    actionColumn: { width: 150, ifShow: () => !!isMangeEdit.value || !!isMangeDelete.value },
    pagination: { pageSize: 15, pageSizeOptions: ['10', '15', '50', '80', '100'] },
    beforeFetch(params) {
      params.orgCode = orgCode.value + '*';
    }, defSort: {
      column: 'departPid,departOrder,orgCode,sort,id',
      order: 'asc'
    }
  },
  exportConfig: { name: "通讯录", url: getExportUrl, params() { return { orgCode: orgCode.value + '*', column: 'departPid,departOrder,orgCode,sort,id', order: 'asc' } } },
  importConfig: { url: getImportUrl }
});
//注册table数据
const [registerTable, { reload }] = tableContext;

function handleAdd() {
  openModal(true, {
    record: { orgCode: orgCode.value },
    isUpdate: false,
    showFooter: true,
  });
}
async function handleDelete(record) {
  await deleteOne({ id: record.id }, reload);
}

function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true,
    showFooter: true,
  });
}

function handleSuccess({ isUpdate, values }) {
  reload();
}

function getTableAction(record) {
  console.log(isMangeEdit.value, isMangeDelete.value)
  let array: any = [];
  if (isMangeEdit.value) array.push({ label: '编辑', onClick: handleEdit.bind(null, record) });
  if (isMangeDelete.value) array.push({
    label: '删除', popConfirm: {
      title: '确定删除吗?', confirm: handleDelete.bind(null, record),
    }
  });
  return array;
}
// 左侧树选择后触发
function onTreeSelect(data) {
  Tools.debounce(() => {
    orgCode.value = data.orgCode;
    reload({ page: 1 });
  }, 10);
}

// 查询职务信息
async function queryPositionInfo() {
  const result = await positionList({ pageSize: 99999 });
  if (result) {
    let obj = {};
    result.records.forEach((position) => {
      obj[position['code']] = position['name'];
    });
    positionInfo.value = obj;
  }
};
queryPositionInfo();
</script>
  
<style lang="less" scoped>
@import '/@/views/system/address/index.less';
</style>
  