<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle>
        <!-- <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
             <a-button  type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
             <j-upload-button  type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
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
</a-dropdown> -->
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <YwZfcfAjjbxxViewModal @register="registerModal" @success="handleSuccess"></YwZfcfAjjbxxViewModal>
  </div>
</template>

<script lang="ts" name="jgyw-jczf" setup>
import { ref, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import { columns, getSearchFormSchema, simpleColumns } from './YwZfcfAjjbxx.data';
import YwZfcfAjjbxxViewModal from '/@/views/ypsczhjg/yw/zfcf/modules/YwZfcfAjjbxxViewModal.vue';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './YwZfcfAjjbxx.api';
import { getLikeValue } from '/@/utils/area/areaDataUtil';

const { setTitle } = useTabs();
const route = useRoute();
if (route.query?.tagTitle) setTitle(route.query?.tagTitle + '');
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'ZFCF',
    showIndexColumn: true,
    api: list,
    immediate: false,
    columns: simpleColumns,
    canResize: false,
    formConfig: {
      labelWidth: 80, autoAdvancedCol: 3,
      schemas: getSearchFormSchema(!route.params?.nf && !route.params?.year && !route.query?.tj, route.query?.year),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    actionColumn: {
      width: 120,
    },
    beforeFetch(params) {
      if (route.query?.year) params.year = route.query.year;
      params.nf = route.params?.nf || '';
      params.zdsj = route.params?.zdsj || '';
      if (route.params?.lb) {
        params.lb = route.params.lb || '';
      }
      if (route.query.cfxx) {
        params.cfxx = route.query?.cfxx;
      }
      if (route.query.code) {
        params.ajssxzqh = route.query?.code;
      }
      if (route.params?.sfzd) {
        const str = route.params.sfzd.split(',');
        params.sfzd = str[0];
        params.csdm = str[1];
      }
      if (route.query?.xzqhdm) {
        params.csdm = route.query?.xzqhdm;
      }
      if (route.query?.cfyj) {
        params.cfyj = route.query?.cfyj;
      }
      if (route.query?.iszd) {
        params.iszd = route.query?.iszd;
      }
      params.ajssxzqh = getLikeValue(params.ajssxzqh)
      params.year = route.params?.year || route.query?.year || '';
      if (route.query?.xzqhdm) params.xzqhdm = route.query?.xzqhdm;
      params.delflag = '0';
      params.column = 'djsj';
      params.order = 'desc';
      params.shxydm = route.params?.shxydm || route.query?.shxydm || '';
      if (route.query?.jcTags) params.jcTags = route.query?.jcTags;
      if (route.query?.jcLevels) params.jcLevels = route.query?.jcLevels;
      if (route.query?.year) params.year = route.query?.year;
      if (route.query?.ajly) params.ajly = route.query?.ajly;
      if (route.query?.lx) params.lx = route.query?.lx;
      if (route.query?.wfhj) params.wfhj = route.query?.wfhj;
      if (route.query?.sfyssfjg) params.sfyssfjg = route.query?.sfyssfjg;
      if (route.query?.tags) params.tags = route.query?.tags;
      return params;
    },
  },
  exportConfig: {
    name: "ZFCF",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext

setTimeout(async () => {
  await getForm().submit();
}, 1);

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
  await deleteOne({ id: record.id }, reload);
}
/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDelete({ ids: selectedRowKeys.value }, reload);
}
/**
 * 成功回调
 */
function handleSuccess({ isUpdate, values }) {
  reload();
}
/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '查看',
      onClick: handleEdit.bind(null, record),
    }
  ]
}
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
      }
    }
  ]
}
</script>
<style scoped></style>
