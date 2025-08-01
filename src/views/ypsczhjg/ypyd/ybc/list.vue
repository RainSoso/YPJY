<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #tableTitle v-if="!props.showOnlyPage">
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <ViewModal @register="registerModal" @success="handleSuccess"></ViewModal>
    <InfoViewModal @register="registerInfoModal" @success="handleSuccess"></InfoViewModal>
  </div>
</template>
<script lang="ts" name="ypyd-ybc" setup>
import { useRoute } from 'vue-router';
import { BasicTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { list, getExportUrl } from './list.api';
import { getColumns, getSearchFormSchema } from './list.data';
import ViewModal from './modules/view.vue';
import InfoViewModal from './modules/infoView.vue';
import { getLikeValue } from '/@/utils/area/areaDataUtil';

const props = defineProps({
  showOnlyPage: propTypes.bool.def(false),
  category: propTypes.string.def('药包材'),
  shxydm: propTypes.string.def(''),
});

const route = useRoute();

const [registerModal, { openModal }] = useModal();
const [registerInfoModal, {openModal:openInfoModal }] = useModal();
const { tableContext, onExportXls } = useListPage({
  tableProps: {
    api: list,
    showIndexColumn: true,
    columns: getColumns(!props.category),
    canResize: false,
    showTableSetting: !props.showOnlyPage,
    useSearchForm: !props.showOnlyPage,
    formConfig: {
      labelWidth: 80,
      schemas: getSearchFormSchema(!props.category),
      autoSubmitOnEnter: true,
      autoAdvancedCol: 4,
      showAdvancedButton: true,
    },
    actionColumn: { width: 110 },
    defSort: { column: 'djrq', order: 'desc' },
    beforeFetch(params) {
      params.category = props.category;
      if (route.params?.shxydm) params.shxydm = route.params.shxydm;
      else if (route.query?.shxydm) params.shxydm = route.query.shxydm;
      return params;
    },
  },
  exportConfig: { name: props.category + '品种', url: getExportUrl, params: { category: props.category } },
});

const [registerTable, { reload }] = tableContext;

function handleSuccess() {
  reload();
}
function getTableAction(record) {
  return [{ label: '编辑', auth: 'jc:pz:bcyfl:edit:' + props.category, onClick: () => openInfoModal(true, { record,isUpdate: true,showFooter: true, }) },{ label: '详情', onClick: () => openModal(true, { record }) }];
}
</script>