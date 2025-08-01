<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>

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
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <TYwJcjhModal @register="registerModal" @success="handleSuccess"></TYwJcjhModal>
  </div>
</template>

<script lang="ts" name="ypjy-tYwJcjh" setup>
import { ref, reactive, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import TYwJcjhModal from './components/TYwJcjhModal.vue'
import { columns, searchFormSchema, superQuerySchema } from './TYwJcjh.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, updateZt } from './TYwJcjh.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useUserStore } from '/@/store/modules/user';
import { useGo } from '/@/hooks/web/usePage';
const go = useGo();
const queryParam = reactive<any>({});
const checkedKeys = ref<Array<string | number>>([]);
const userStore = useUserStore();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '检查计划',
    api: list,
    columns,
    canResize: false,
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
      width: 240,
      fixed: 'right'
    },
    beforeFetch: (params) => {
      return Object.assign(params, queryParam);
    },
  },
  exportConfig: {
    name: "检查计划",
    url: getExportUrl,
    params: queryParam,
  },
  importConfig: {
    url: getImportUrl,
    success: handleSuccess
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext

// 高级查询配置
const superQueryConfig = reactive(superQuerySchema);

/**
 * 高级查询事件
 */
function handleSuperQuery(params) {
  Object.keys(params).map((k) => {
    queryParam[k] = params[k];
  });
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
}
/**
   * 操作栏
   */
function getTableAction(record) {
  var act = [{
    label: '详情',
    onClick: handleDetail.bind(null, record),
  }, {
    label: '实施计划查看',
    ifShow: record.zt == '1',
    onClick: handleView.bind(null, record),
  }, {
    label: '编辑',
    ifShow: record.zt == '0',
    onClick: handleEdit.bind(null, record),
  }, {
    label: '发布',
    ifShow: record.zt === '0',
    popConfirm: {
      title: '确定发布吗?',
      confirm: handleFb.bind(null, record),
    },
  }]
  return act;
}
/**
   * 下拉操作栏
   */
function getDropDownAction(record) {
  return [

    {
      label: '删除',
      ifShow: record.zt == '0',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'topLeft',
      }
    }
  ]
}
async function handleFb(record) {
  record.zt = '1';
  await updateZt(record, handleSuccess);
}

function handleView(record) {
  go({ path: '/jcjh/ssjhList', query: { jhid: record.id } });
}
</script>

<style lang="less" scoped>
:deep(.ant-picker),
:deep(.ant-input-number) {
  width: 100%;
}
</style>./ts/TYwJcjh.api./ts/TYwJcjh.data