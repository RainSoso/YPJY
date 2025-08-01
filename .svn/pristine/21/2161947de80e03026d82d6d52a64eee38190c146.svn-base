<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="openAdd" preIcon="ant-design:plus-outlined"> 任务发起</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="batchHandleSend">
                <Icon icon="ant-design:mail-outlined"></Icon>
                发送
              </a-menu-item>
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
      <template #htmlSlot="{ text }">
        <div v-html="text"></div>
      </template>
    </BasicTable>
    <!-- 表单区域 -->
    <CpEventModal @register="registerModal" @success="handleSuccess"></CpEventModal>
    <selectQyModal @register="registerQyModal" @getSelectResult="getSelectResult"></selectQyModal>

    <a-modal v-model:visible="addModel" title="新增事项" @ok="goAdd()" width="400px">
      <div style="padding-top: 40px;">
        <a-form>
          <a-row>
            <a-col span="16">
              <a-form-item label="事项分类" :labelCol="{ style: { width: '100px' } }"
                :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
                <JDictSelectTag v-model:value="category" placeholder="请选择" dictCode="xtcz_sxfl"
                  :showChooseOption="false">
                </JDictSelectTag>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>

    <a-modal v-model:visible="onImportModel" title="完善导入信息" @ok="onImportHandleOk()" width="800px">
      <div style="padding-top: 40px;">
        <a-form>
          <!-- <a-row>
            <a-col>
              <a-form-item label="标题" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                <a-input v-model:value="importPara.title" placeholder="请输入标题" />
              </a-form-item>
            </a-col>
          </a-row> -->
          <a-row>
            <a-col>
              <a-form-item label="截止时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                <a-date-picker v-model:value="importPara.jzsj" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="通告附件" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                <j-upload v-model:value="importPara.fj" text="上传" :multiple="false" :maxCount="1" :bizPath="'xtcz'"
                  @change="changeFile"></j-upload>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              <a-form-item label="导入文件" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
                <j-upload-button preIcon="ant-design:upload-outlined"
                  @click="onFxczhImportFile">选择风险处置函导入文件</j-upload-button>
                <span style="padding-left: 5px;">{{ importPara.file.file.name ? importPara.file.file.name :
                  "（请上传.xls文件）"
                  }}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-modal>

  </div>
</template>

<script lang="ts" name="xtcz-cpEvent" setup>
import { ref, computed, unref } from 'vue';
import { omit } from 'lodash-es';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import CpEventModal from './components/CpEventModal.vue';
import { columns, getSearchFormSchema } from './CpEvent.data';
import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, getExportWordUrl, batchSend } from './CpEvent.api';
import selectQyModal from './components/selectQyModal.vue';
import { message } from 'ant-design-vue';
import { defHttp } from '/@/utils/http/axios';
import { JSelectDept } from '/@/components/Form';
import { useGo } from '/@/hooks/web/usePage';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
import Tools from '/@/utils/tools';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const go = useGo();
const isRefresh = ref(route.query.isRefresh);
const params = ref({ qyTags: [] });
const importPara = ref({ file: { file: {} } });
const visible = ref(false);
const addModel = ref(false);
const category = ref("");
const onImportModel = ref(false);
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
//注册model
const [registerModal, { openModal }] = useModal();
const [registerQyModal, { openModal: openQyModal }] = useModal();

//注册table数据
const { prefixCls, tableContext, onImportXls, onExportXls: onExporWord } = useListPage({
  tableProps: {
    title: 'cp_event',
    showIndexColumn: true,
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
      width: 150,
      fixed: 'right',
    },
  },
  exportConfig: {
    name: "cp_gcfxcz",
    url: getExportWordUrl,
  },
  importConfig: {
    url() {
      let url = getImportUrl + '';
      return url + (0 > url.indexOf('?') ? '?' : '&') + Tools.toUrlParams({ ...omit(importPara.value, 'file') });
    },
    success: handleSuccess
  },
});

const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

function selectQy() {
  openQyModal(true, {
    showFooter: true,
  });
}

function getTags(tes) {
  params.value.qyTags = tes

}

function openAdd() {
  // category.value = "";
  // addModel.value = true;
  go('/rwfb/CpEventDetail?category=0')
}

function goAdd() {
  if (category.value) {
    go('/rwfb/CpEventDetail?category=' + category.value)
    addModel.value = false;
  } else {
    return message.info("事项分类不能为空！")
  }
}

function getSelectResult(text) {
  let a = []
  let b = []
  if (text) {
    text.value.forEach((item) => {
      a.push(item.shxydm)
      b.push(item.qymc)
    })
    params.value.qyShxydm = a.toString();
    params.value.qymc = b.toString();
  }
}

function openChiose(record) {
  params.value = { qyTags: [] };
  visible.value = true;
  params.value = unref(record);
}

function handleOk() {
  if (!params.value.chushi && !params.value.qyShxydm && !params.value.qyTags) {
    return message.info("未选择接收目标")
  }
  params.value.state = 10;
  defHttp.post({ url: "/xtcz/cpEvent/addTo", params: params.value });
  visible.value = false;
}

function openOnImportModel() {
  onImportModel.value = true;
  importPara.value = { file: { file: {} } }
}

function onImportHandleOk() {
  if (!importPara.value.file.file.name) {
    return message.info("导入数据文件不能为空！")
  }
  onImportXls(importPara.value.file);
  onImportModel.value = false;
}

function changeFile(t) {
  importPara.value.fj = t;
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


function downloadFile(url) {
  downloadByUrl({
    url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + url,
    target: '_self',
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
 * 批量发送事件
 */
async function batchHandleSend() {
  await batchSend({ ids: selectedRowKeys.value }, handleSuccess);
}
/**
 * 成功回调
 */
function handleSuccess() {
  (selectedRowKeys.value = []) && reload();
}

function toTaskDetail(record) {
  go({ path: '/rwfb/CpEventDetail', query: { id: record.id } });
}
/**
 * 操作栏
 */
function getTableAction(record) {
  let array: any = [];
  array.push({
    label: '处理',
    onClick: toTaskDetail.bind(null, record),
  });
  if (record.state < 10) {
    array.push({
      label: '删除',
      popConfirm: {
        title: '是否确认删除',
        confirm: handleDelete.bind(null, record),
      },
    });
  }
  //array.splice(0, 0, { label: '发送', onClick: openChiose.bind(null, record), });
  return array;
}

function onFxczhImportFile(file) {
  console.log(file)
  if (file.file.name) {
    let s = file.file.name;
    let a = s.split(".")
    if (a[a.length - 1] == "xls") {
      importPara.value.file = file;
    } else {
      message.info("请上传正确的文件！")
    }
  } else {
    message.info("文件上传失败！")
  }
}
</script>

<style scoped></style>