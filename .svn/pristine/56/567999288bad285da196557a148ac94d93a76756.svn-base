<template>
  <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="fromTitle" width="75%" @ok="handleSubmit">
    <div class="pl-4 pr-8">
      <div>
        <a-row>
          <a-col span="8">
            <a-form-item label="事项分类" :labelCol="{ style: { width: '100px' } }"
              :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
              <JDictSelectTag v-model:value="category" placeholder="请选择" dictCode="xtcz_sxfl" :showChooseOption="false">
              </JDictSelectTag>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <div v-if="category != '2'">
        <a-row>
          <a-col span="10">
            <a-form-item label="事项标题" :labelCol="{ style: { width: '100px' } }"
              :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
              <a-input v-model:value="title" placeholder="请输入事项标题" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="主体内容" :labelCol="{ style: { width: '100px' } }"
              :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
              <a-textarea v-model:value="content" placeholder="请输入主体内容" />
            </a-form-item>
          </a-col>
        </a-row>
      </div>
      <BasicForm @register="registerForm" />

      <div v-if="category != '2' && category">
        <a-row>
          <h1 style="padding-top: 5px;">反馈信息：</h1>
          <a-form-item label="名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 10 }"
            style="margin-left: 8px;width: 240px;">
            <a-input v-model:value="eventItem.name" />
          </a-form-item>
          <a-form-item label="类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
            style="margin-left: 8px;width: 220px;">
            <JDictSelectTag v-model:value="eventItem.widgetType" placeholder="请选择" dictCode="xtcz_widgetType"
              :showChooseOption="false"> </JDictSelectTag>
          </a-form-item>
          <a-form-item label="是否必填" :label-col="{ span: 14 }" :wrapper-col="{ span: 10 }">
            <a-radio-group v-model:value="eventItem.required">
              <a-radio value="0">是</a-radio>
              <a-radio value="1">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-button type="primary" @click="openFkAdd" preIcon="ant-design:plus-outlined"> 添加反馈信息</a-button>
        </a-row>
        <div style="width: 990px; padding-left: 80px;" v-if="eventItems.length > 0">
          <a-table :columns="columns" :data-source="eventItems" bordered>
            <template #action="{ record }">
              <span><a @click="deleteOne(record)">删除</a></span>
            </template>
          </a-table>
        </div>
      </div>
      <div v-if="category == '2'">
        <div>
          <h3>国抽药品检验信息:
            <a-button type="primary" @click="selectPz" style=" margin-top: 5px"> 品种选择</a-button>
          </h3>
        </div>
        <table class="my-table">
          <tr class="text-green font-600 text-center">
            <td colspan="4">基本信息</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">计划名称</td>
            <td colspan="3">
              <a-input v-model:value="gcfxcz.jhmc" placeholder="请输入计划名称" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">品种名称</td>
            <td>
              <a-input v-model:value="gcfxcz.pzmc" placeholder="请输入品种名称" />
            </td>
            <td class="text-blue font-600 text-right">药品通用名称</td>
            <td>
              <a-input v-model:value="gcfxcz.yptymc" placeholder="请输入药品通用名称" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">标示生产企业名称</td>
            <td>
              <a-input v-model:value="gcfxcz.bsscqymc" placeholder="请输入标示生产企业名称" />
            </td>
            <td class="text-blue font-600 text-right">生产企业所在省份</td>
            <td>
              <a-input v-model:value="gcfxcz.scqyszsf" placeholder="请输入生产企业所在省份" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">涉及的样品批号</td>
            <td>
              <a-input v-model:value="gcfxcz.sjypph" placeholder="请输入涉及的样品批号" />
            </td>
            <td class="text-blue font-600 text-right">涉及样品批数</td>
            <td>
              <a-input v-model:value="gcfxcz.sjypps" placeholder="请输入涉及样品批数" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">药品批准文号</td>
            <td>
              <a-input v-model:value="gcfxcz.yppzwh" placeholder="请输入药品批准文号" />
            </td>
            <td class="text-blue font-600 text-right">风险类别</td>
            <td>
              <a-input v-model:value="gcfxcz.fxllb" placeholder="请输入风险类别" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">研究结果描述及原因分析</td>
            <td colspan="3">
              <a-textarea v-model:value="gcfxcz.jgfx" placeholder="请输入研究结果描述及原因分析" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">检验单位</td>
            <td >
              <a-input v-model:value="gcfxcz.jydw" placeholder="请输入检验单位" />
            </td>
            <td class="text-blue font-600 text-right">检验单位电话</td>
            <td >
              <a-input v-model:value="gcfxcz.jydwdh" placeholder="请输入检验单位电话" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">国家局处理情况</td>
            <td colspan="3">
              <a-input v-model:value="gcfxcz.gjjclqk" placeholder="请输入国家局处理情况" />
            </td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">备注</td>
            <td colspan="3">
              <a-textarea v-model:value="gcfxcz.bz" placeholder="请输入备注" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </BasicModal>
  <selectScpzModal @register="registerScpzModal" @getSelectResult="getPzSelectResult"></selectScpzModal>
</template>
  
<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from '../CpEvent.data';
import { saveOrUpdate } from '../CpEvent.api';
import JDictSelectTag from '/@/components/Form/src/jeecg/components/JDictSelectTag.vue';
import { filterDictTextByCache, getDictItems } from '/@/utils/dict/JDictSelectUtil';
import { message } from 'ant-design-vue';
import { useModal } from '/@/components/Modal';
import selectScpzModal from './selectScpzModal.vue';
const columns = [
  {
    title: '名称',
    align: "center",
    dataIndex: 'name'
  },
  {
    title: '类型',
    align: "center",
    dataIndex: 'widgetType',
    customRender: function (text) {
      return filterDictTextByCache("xtcz_widgetType", text.text)
    }
  },
  {
    title: '是否必填',
    align: "center",
    dataIndex: 'required',
    customRender: function (text) {
      if (text.text == '0') return "是";
      if (text.text == '1') return "否";
    }
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];
const visible = ref<boolean>(false);
const eventItem = ref({});
const eventItems = ref([]);
const category = ref("");
const gcfxcz = ref({});
const zgcsAwarry = ref([]);
const zgcs = ref([]);
const title = ref("");
const content = ref("");
const [registerScpzModal, { openModal: openPzModal }] = useModal();
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const params = ref({});
//表单配置
const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
  labelWidth: 100,
  schemas: formSchema,
  showActionButtonGroup: false,
});
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  await resetFields();
  params.value = {};
  eventItems.value = [];
  category.value = "0";
  gcfxcz.value = {};
  zgcs.value = [];
  title.value = "";
  content.value = "";
  zgcsAwarry.value = await getDictItems("xtcz_zgcs");
  setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
  isUpdate.value = !!data?.isUpdate;
  if (unref(isUpdate)) {
    //表单赋值
    await setFieldsValue({
      ...data.record,
    });
    let formdata = JSON.parse(JSON.stringify(data));
    params.value.state = formdata.record.state;
    eventItems.value = formdata.record.eventItems;
    category.value = formdata.record.category;
    title.value = formdata.record.title;
    content.value = formdata.record.content;
    gcfxcz.value = formdata.record.gcfxcz;
    if (gcfxcz.value.zqzgcs) {
      zgcs.value = gcfxcz.value.zqzgcs.split(",");
    }
  }
  // 隐藏底部时禁用整个表单
  setProps({ disabled: !data?.showFooter });
});
//设置标题
const fromTitle = computed(() => (!unref(isUpdate) ? '草稿' : '编辑'));
//表单提交事件
async function handleSubmit(v) {
  try {
    if (!category) {
      message.info("事项分类不能为空");
      return;
    }
    let values = await validate();
    if (category.value != '2') {
      if (!title.value) {
        message.info("事项标题不能为空");
        return
      }
      if (!content.value) {
        message.info("事项内容不能为空");
        return
      }
      values.title = unref(title.value);
      values.content = unref(content.value);
      values.eventItems = unref(eventItems.value);
    } else {
      let zqzgcs = ""
      zgcs.value.forEach(el => {
        if (zqzgcs == "") {
          zqzgcs += el
        } else {
          zqzgcs += "," + el
        }
      });
      gcfxcz.value.zqzgcs = zqzgcs;
      values.gcfxcz = unref(gcfxcz.value);
      if (category.value != '2') {
        values.title = unref(title.value);
        values.content = unref(content.value);
      } else {
        if (!values.gcfxcz.jhmc) {
          message.info("基础信息中计划名称不能为空")
          return;
        }
        if (!values.gcfxcz.yptymc) {
          message.info("基础信息中药品通用名称不能为空")
          return;
        }
        if (!values.gcfxcz.bsscqymc) {
          message.info("基础信息中标识生产企业名称不能为空")
          return;
        }
        values.title = values.gcfxcz.jhmc
        values.content = values.gcfxcz.jhmc + " - " + values.gcfxcz.yptymc + " - " + values.gcfxcz.bsscqymc;
      }
    }
    values.category = unref(category.value);

    setModalProps({ confirmLoading: true });
    //提交表单
    await saveOrUpdate(values, isUpdate.value);
    //关闭弹窗
    closeModal();
    //刷新列表
    emit('success');
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

function deleteOne(record) {
  let arr = [];
  for (let i = 0; i < eventItems.value.length; i++) {
    if (eventItems.value[i].name != record.name) {
      arr.push(eventItems.value[i])
    }
  }
  eventItems.value = arr;
}
function openFkAdd() {
  if (eventItem.value.name && eventItem.value.widgetType) {
    eventItems.value.push(eventItem.value)
  } else {
    message.info("反馈信息名字或类型不能为空")
  }
  visible.value = false;
  eventItem.value = {};
}
function selectPz(){
      openPzModal(true, {
        showFooter: true,
      });
}
function getPzSelectResult(text){
  let a=gcfxcz.value;
  a.pzmc=text.ypspmc
  a.yptymc=text.yptymc
  a.bsscqymc=text.ypscqymc
  a.scqyszsf=text.areaCode.split(0,1)=="42"?"湖北":"";
  a.yppzwh=text.yppzwh
  a.shxydm=text.shxydm
  a.xzqhdm=text.areaCode
}
</script>
  
<style lang="less" scoped>
/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-calendar-picker) {
  width: 100%;
}
</style>