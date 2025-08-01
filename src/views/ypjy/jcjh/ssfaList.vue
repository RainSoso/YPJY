<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!-- <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button> -->
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
      <!--字段回显插槽-->
      <template v-slot:bodyCell="{ column, record, index, text }">
      </template>
    </BasicTable>
    <!-- 制定实施方案 -->
    <SsfaModal :visible="open" @childEvent="handleChildEvent" :jhid="jhid" :jsdwid="jsdwid" :fj="fj"></SsfaModal>
    <!--查看实施方案-->
    <TywSsfaViewModal @jcqkHandleClose="jcqkHandleClose" :isShow="isShow" :jsdwid="jsdwid" :jhid="jhid" :fj="fj">
    </TywSsfaViewModal>
  </div>
</template>

<script lang="ts" name="ypjy-tYwJcjhDept" setup>
import { ref, reactive, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import { columns, searchFormSchema, superQuerySchema } from './TYwJcjhDept.data';
import { list, updateZt, deleteOne, batchDelete, getImportUrl, getExportUrl } from './TYwJcjhDept.api';
import { downloadFile } from '/@/utils/common/renderUtils';
import { useUserStore } from '/@/store/modules/user';
import SsfaModal from './components/SsfaModal.vue';
import TywSsfaViewModal from './components/TywSsfaViewModal.vue';
import Tools from '/@/utils/tools';
const open = ref(false);
//计划查看弹窗
const isShow = ref(false);
const ssfaViewRef = ref();
const jhid = ref();
const jsdwid = ref();
const fj = ref();
const queryParam = reactive<any>({});
const checkedKeys = ref<Array<string | number>>([]);
const userStore = useUserStore();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '检查计划单位',
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
    name: "检查计划单位",
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
  return [
    {
      label: '添加实施方案',
      ifShow: record.zt == '0',
      onClick: handleSsfa.bind(null, record),
    },
    {
      label: '报送',
      ifShow: record.zt == '0',
      popConfirm: {
        title: '是否确认上报计划',
        confirm: handleBs.bind(null, record),
        placement: 'topLeft',
      }
    },
    {
      label: '查看',
      ifShow: record.zt == '1',
      onClick: handleView.bind(null, record),
    },
    {
      label: '附件',
      ifShow: record.zt == '1' && record.fj != null,
      onClick: handlefjView.bind(null, record),
    },
  ]
}
//查看实施方案
function handleView(record) {
  isShow.value = true;
  jhid.value = record.jhid;
  jsdwid.value = record.jsdw;
}
function handlefjView(record) {
  let url = Tools.getFileAccessHttpUrl(record.fj, true);
  Tools.toPreview(url);
}
//关闭实施方案制定
const jcqkHandleClose = (value) => {
  isShow.value = value;
};
//实施方案上报
function handleBs(recode) {
  recode.zt = '1';
  updateZt(recode);
}
//添加实施方案制定
function handleSsfa(record) {
  open.value = true;
  jhid.value = record.jhid;
  jsdwid.value = record.jsdw;
  fj.value = record.fj;
}
//关闭实施方案制定
const handleChildEvent = (value) => {
  open.value = value;
};
/**
   * 下拉操作栏
   */
function getDropDownAction(record) {
  return [
    {
      label: '详情',
      onClick: handleDetail.bind(null, record),
    }, {
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
        placement: 'topLeft',
      }
    }
  ]
}


</script>

<style lang="less" scoped>
:deep(.ant-picker),
:deep(.ant-input-number) {
  width: 100%;
}
</style>