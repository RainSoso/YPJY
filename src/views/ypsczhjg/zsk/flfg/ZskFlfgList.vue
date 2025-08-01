<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" class="my-basic-table">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"
          v-if="hasPermission(['zsk:add'])"> 新增</a-button>
      </template>
      <template #ly="{ record }">
        <a-button type="link" @click="handleGoLy(record)">{{ record.ly }}</a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)">
          <template #fjBtn>
            <a-dropdown>
              <a-button type="link" size="small" @click.prevent>
                附件<Icon icon="mdi-light:chevron-down"></Icon>
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;" @click="handleDownloadByUrl(record)">下载</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click="toPreview(record)">预览</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </TableAction>
      </template>


    </BasicTable>
    <!-- 表单区域 -->
    <ZskFlfgModal @register="registerModal" @success="handleSuccess"></ZskFlfgModal>
  </div>

</template>

<script lang="ts" name="flfg-zskFlfg" setup>
import { ref, computed, unref, watch, defineEmits } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import ZskFlfgModal from './modules/ZskFlfgModal.vue';
import { columns, searchFormSchema } from './ZskFlfg.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, download } from './ZskFlfg.api';
import { useRoute } from 'vue-router';
import { useGo } from '/@/hooks/web/usePage';
import type { GlobConfig } from '/#/config';
import { Dropdown } from 'ant-design-vue';
import { getAppEnvConfig } from '/@/utils/env';
import { usePermission } from '/@/hooks/web/usePermission';
import { downloadByUrl } from '/@/utils/file/download';
import Tools from '/@/utils/tools';
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();

const emit = defineEmits(['success']);

const { hasPermission } = usePermission();
const go = useGo();
const props = defineProps({
  data: { require: true, type: Object },
})
// 当前选中的部门ID，可能会为空，代表未选择部门
const keyid = computed(() => props.data?.key)
//注册model
const [registerModal, { openModal }] = useModal();
//注册table数据
const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
  tableProps: {
    title: '法律法规',
    api: list,
    columns,
    showIndexColumn: true,
    canResize: false,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
      showAdvancedButton: true,
    },
    // 请求之前对参数做处理
    beforeFetch(params) {
      const str = keyid.value.split('-');
      params.mainCategory9 = str[0];
      params.category = str[1];
      params.column = 'sort';
      params.order = 'asc';
      return params;
    },
    actionColumn: {
      width: 220,
    },
  },
  exportConfig: {
    name: "法律法规",
    url: getExportUrl,
  },
  importConfig: {
    url: getImportUrl
  },
})

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext
watch(() => props.data, () => reload())
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

function LastStr(str) {
  let index = str.lastIndexOf("\/");
  str = str.substring(index + 1, str.length);
}


function handleDownloadByUrl(record: Recordable) {
  const str = record.fj.split(',')
  str.forEach((item, index) => {
    downloadByUrl({
      url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + item,
      target: '_self',
    });
  })
}

function toPreview(record: Recordable) {
  const item = record.fj;
  let url = Tools.getAppInnerUrl() + '/ypsc-api/sys/common/static/' + item;
  Tools.toPreview(url);
}
function handleGoLy(record: Recordable) {
  if (record.ly.slice(0, 4) == 'http') {
    window.open(record.ly, '_blank')
  }
}
/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteOne({ id: record.id }, () => {
    reload();
    emit('success');
  });
}
/**
 * 成功回调
 */
function handleSuccess() {
  reload();
  emit('success');
}


/**
   * 操作栏
   */
function getTableAction(record) {
  let array: any = [{
    label: '编辑', auth: 'zsk:edit', onClick: handleEdit.bind(null, record),
  }, {
    label: '删除', auth: 'zsk:delete',
    popConfirm: {
      title: '是否确认删除',
      confirm: handleDelete.bind(null, record),
    }
  }];
  if (record.fj) {
    array.splice(0, 0, { label: '附件', slot: 'fjBtn' });
  }
  if (record.ly) {
    array.splice(0, 0, { label: '来源', onClick: handleGoLy.bind(null, record) });
  }
  return array;
}
</script>
<style scoped>
</style>
