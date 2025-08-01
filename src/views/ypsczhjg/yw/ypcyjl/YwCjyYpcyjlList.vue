<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
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
    <ypcyjlview @register="registerModal" @success="handleSuccess"></ypcyjlview>
  </div>
</template>

<script lang="ts" name="jgyw-ypcj" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import ypcyjlview from '/@/views/ypsczhjg/yw/ypcyjl/ypcyjlview.vue';
import { columns, getSearchFormSchema } from './TYwCjyYpcyji.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl } from './TYwCjyYpcyji.api';
import { getLikeValue } from '/@/utils/area/areaDataUtil';

const { setTitle } = useTabs();
const route = useRoute();
if (route.query?.tagTitle) setTitle(route.query?.tagTitle + '');
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: 'CJY',
    api: list,
    immediate: false,
    showIndexColumn: true,
    columns,
    canResize: false,
    formConfig: {
      labelWidth: 80, autoAdvancedCol: 4, schemas: getSearchFormSchema(route.query?.year),
      autoSubmitOnEnter: true, showAdvancedButton: false,
    },
    actionColumn: {
      width: 120,
    },
    beforeFetch(params) {
      params.column = 'cyrq';
      if (route.params?.sfhg) {
        const str = route.params.sfhg.split(',');
        params.sfhg = str[0];
        params.csdm = str[1];
      }
      if (route.query?.bcydwssqx) params.bcydwssqx = route.query.bcydwssqx;
      if (route.query?.xmdl) params.xmdl = route.query.xmdl;
      if (route.query?.jyjg) params.jyjg = route.query?.jyjg;
      if (route.query?.jcTags) params.jcTags = route.query?.jcTags;
      if (route.query?.jcLevels) params.jcLevels = route.query?.jcLevels;
      if (route.query?.year) params.year = route.query?.year;
      if (route.query?.xcyhj) params.xcyhj = route.query?.xcyhj;
      if (route.query?.tags) params.tags = route.query?.tags;
      params.bcydwssqx = getLikeValue(params.bcydwssqx)
      //params.zzdm = route.params?.shxydm || '';
      if (route.params?.shxydm) params.zzdm = route.params?.shxydm;
      if (route.query?.shxydm) params.zzdm = route.query.shxydm;

      debugger
      params.jyjg = route.params?.jyjg != '-' && route.params?.jyjg || params.jyjg || '';
      params.pzwh = route.query?.pzwh || undefined;
      if (route.query?.year) params.year = route.query?.year;
      params.order = 'desc';
      return params;
    },
  },
  exportConfig: {
    name: "药品抽检",
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
