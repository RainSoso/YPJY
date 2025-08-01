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
      <template #form-advanceBefore>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <DrugsBaqkModal @register="registerModal" @success="handleSuccess"></DrugsBaqkModal>
  </div>
</template>

<script lang="ts" name="ndbg-drugsBaqk" setup>
import { ref, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage'
import DrugsBaqkModal from './modules/DrugsBaqkModal.vue'
import { columns, getSearchFormSchema } from './DrugsBaqk.data';
import { mapTableTotalSummary } from '/@/utils/common/compUtils';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import { useGo } from '/@/hooks/web/usePage';
import { list, exportXls, getImportUrl, getExportUrl } from './DrugsBaqk.api';
import { useRoute } from 'vue-router';

const route = useRoute();
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls } = useListPage({
  tableProps: {
    title: '年度报告_备案情况',
    api: list,
    columns,
    canResize: false,
    showIndexColumn: true,
    formConfig: {
      labelWidth: 80,
      schemas: getSearchFormSchema(route),
      autoSubmitOnEnter: true,
      showAdvancedButton: false,
    },
    beforeFetch(params) {
      if (route.query?.fjqhdm) params.fjqhdm = route.query.fjqhdm;
      if (route.query?.zsYear) params.zsYear = route.query.zsYear;
      if (route.query?.hasYydb) params.hasYydb = route.query.hasYydb;
      return params;
    },
    actionColumn: {
      width: 120,
    },
    defSort: {
      column: 'shxydm',
      order: 'asc'
    },
    showSummary: true,
    summaryFunc: onSummary,
  },
  exportConfig: {
    name: "医药代表备案情况",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },

})

const [registerTable, { reload, getForm }, { rowSelection, selectedRowKeys }] = tableContext
const go = useGo();
// const valueArr = ref([{label: "已填写",text: "已填写",title: "已填写",value: "1",color: "",displayType: ""},{label: "未填写",text: "未填写",title: "未填写",value: "0",color: "",displayType: ""}])
const tags = ref([]), currentTag = ref('');

getDictItems('baqkSftx').then((res) => {
  tags.value = res;
  if (tags.value) {
    fastFitler(tags.value[1]);
  }
});

async function fastFitler(item) {
  if (currentTag.value != item.value) {
    currentTag.value = item.value;
    await getForm().setFieldsValue({ sftx: item.value });
  } else {
    currentTag.value = '';
    await getForm().setFieldsValue({ sftx: '' });
  }
  reload();
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

function onSummary(tableData: Recordable[]) {
  const totals = mapTableTotalSummary(tableData, ['qyrs', 'bars']);
  return [
    totals,
  ];
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
      label: '详情',
      onClick: getGO.bind(null, record),
    }
  ]
}

function getGO(record: Recordable) {
  if ('1' == record.id) {
    go(`/yqyd/ypsc/TJcQyJbxxList/${encodeURIComponent(record.cyrmc || '')}` + '/' + record.shxydm);
  } else {
    handleEdit(record);
  }
}

</script>
<style scoped></style>