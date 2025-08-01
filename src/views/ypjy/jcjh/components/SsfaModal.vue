<template>
  <a-modal v-model:visible="visible" destroyOnClose="true" title="实施方案" width="100%" wrap-class-name="full-modal" @cancel="handleCancel">
    <template #footer>
      <a-button v-show="current != 1" key="back" @click="handleNext">下一步</a-button>
      <a-button v-show="current == 1" key="back" @click="handlePrev">上一步</a-button>
      <a-button v-show="current == 1" key="back" @click="handleOK">确认</a-button>
    </template>
    <div style="margin: 15px;">
      <a-steps :current="current" size="small">
        <a-step>
          <template #title>选择检查对象</template>
        </a-step>
        <a-step title="制定方案" />
      </a-steps>
      <div class="steps-content" v-show="current == 0">
        <BasicTable @register="registerTable" :rowSelection="rowSelection">


          <!--字段回显插槽-->
          <template v-slot:bodyCell="{ column, record, index, text }">
          </template>
        </BasicTable>
      </div>
      <div class="steps-content" v-show="current == 1">
        <a-form ref="formRef" :model="formFa" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }"
          style="margin: 10px;">
          <a-form-item label="检查方式" name="jcfs">
            <JDictSelectTag v-model:value="formFa.jcfs" placeholder="请输入用户性别" dictCode="ypjy_jcfs" type="radioButton" />
          </a-form-item>
          <a-form-item label="计划检查时间" name="jcyf">
            <CustomMonthPicker ref="yfSelectRef" @changeSelect="yfChange" types="1"></CustomMonthPicker>
          </a-form-item>
          <a-form-item label="检查频次" name="jcpc">
            <a-input v-model:value="formFa.jcpc" :disabled="true" />
          </a-form-item>
          <a-form-item label="检查重点" name="jczd">
            <a-textarea v-model:value="formFa.jczd" :rows="3" />
          </a-form-item>
          <a-form-item label="检查范围" name="jcfw">
            <a-textarea v-model:value="formFa.jcfw" :rows="3" />
          </a-form-item>
          <a-form-item label="实施方案" name="fj">
            <JUpload v-model:value="formFa.fj" maxCount=1></JUpload>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, reactive, computed, unref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { message } from 'ant-design-vue';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import { useRoute } from 'vue-router';
import CustomMonthPicker from './CustomMonthPicker.vue'
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import JUpload from '/@/components/Form/src/jeecg/components/JUpload/JUpload.vue';
import { columns, searchFormSchema, superQuerySchema } from '../TYwJcjhSs.data';
import { list, saveOrUpdate } from '../TYwJcjhJcqk.api';
const formFa = ref({});
const formRef = ref();
const yfSelectRef = ref();
const route = useRoute();
const current = ref(0);
const jhid = ref(route.params?.jhid);
const props = defineProps({
  visible: Boolean,
  jhid: String,
  jsdwid: String,
  fj: String
});
const rules = ref({
  jcfs: [
    { required: true, message: '请选择检查方式！', trigger: 'blur' },
  ],
})
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
      formFa.value.fj = props.fj;
      return Object.assign(params, queryParam);
    },
  },
})

const [registerTable, { reload }, { rowSelection, selectedRows, selectedRowKeys }] = tableContext

function yfChange(val) {
  formFa.value.jcyf = val;
  formFa.value.jcpc = val.length;
}
/**
 * 批量删除事件
 */
function batchHandleDelete() {
  console.log('selectedRowKeys', selectedRowKeys.value);
}
/**
 * 成功回调
 */
function handleSuccess() {
  let fj = formFa.value.fj;
  (selectedRowKeys.value = []) && reload();
  formRef.value.resetFields();
  yfSelectRef.value.clear();
  current.value = "0";
  formFa.value.fj = fj
}

/**
   * 操作栏
   */
function getTableAction(record) {
  return [
    {
      label: '编辑',
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
        placement: 'topLeft',
      }
    }
  ]
}

//***************************带选择列表--end************************************** */
const emit = defineEmits(['childEvent']);
const handleCancel = () => {
  handleSuccess()
  emit('childEvent', false);
};
const onSubmit = () => {

}
/**
 * 值改变事件触发
 * @param key
 * @param value
 */
function handleFormChange(key, value) {
  formState[key] = value;
}
const handleNext = () => {
  current.value++;
}
const handlePrev = () => {
  current.value--;
}

const handleOK = () => {

  if (props.jhid) {
    formFa.value.jhid = props.jhid;
  }
  if (selectedRowKeys.value.length == 0) {
    message.warning("请选择检查企业！");
    return;
  }
  if (!formFa.value.jcfs) {
    message.warning("请选择检查方式！");
    return;
  }
  if (!formFa.value.jcyf) {
    message.warning("请选择检查月份！");
    return;
  }

  formFa.value.jcyf = formFa.value.jcyf.toString();
  formFa.value.keys = selectedRowKeys.value.toString();
  formFa.value.ssdwid = props.jsdwid;
  saveOrUpdate(formFa.value, false).then(() => {
    handleSuccess()
  });
}
</script>
<style scoped>
.steps-content {
  border-radius: 6px;
  min-height: 200px;
  text-align: center;
  padding-top: 10px;
}

:deep(.ant-form-item-control-input-content) {
  flex: auto;
  max-width: 100%;
  text-align: left !important;
}
</style>