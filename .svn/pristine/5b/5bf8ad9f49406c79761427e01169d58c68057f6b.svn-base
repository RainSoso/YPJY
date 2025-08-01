<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="900px" destroyOnClose>
    <table class="my-table">
        <colgroup>
          <col style="width:20%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tr>
          <td class="text-blue font-600 text-right">标题</td>
          <td colspan="3">{{ Info.titile }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">摘要</td>
          <td colspan="3">{{Info.msgAbstract}}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">发布时间</td>
          <td >{{Info.sendTime}}</td>
          <td class="text-blue font-600 text-right">截止时间</td>
          <td >{{Info.endTime}}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">优先级</td>
          <td>{{ Info.priority == 'H' ? '高' : (Info.priority == 'M' ? '中' : '低') }}</td>
          <td class="text-blue font-600 text-right">接收用户</td>
          <td>{{ Info.msgType == 'ALL' ? '全体用户' : (Info.msgType == 'USER' ? '指定用户' : '单位') }}</td>
        </tr>
        
      </table>
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  //import { formSchemaDetail } from './notice.data';
  import { formSchemaDetail } from '/@/views/system/notice/notice.data';
  import { saveOrUpdate } from '/@/views/system/notice/notice.api';
  //import { saveOrUpdate } from './notice.api';
  const Info = ref({});
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { setProps,resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchemaDetail,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    Info.value = data.record;

    debugger
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      if (data.record.userIds) {
        data.record.userIds = data.record.userIds.substring(0, data.record.userIds.length - 1);
      }
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      // 隐藏底部时禁用整个表单
      setProps({ disabled: true })
    }
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '公告详情信息'));
  //表单提交事件
  async function handleSubmit(v) {
    //关闭弹窗
    closeModal();
    // try {
    //   let values = await validate();
    //   setModalProps({ confirmLoading: true });
    //   //提交表单
    //   values.userIds += ',';
    //   await saveOrUpdate(values, isUpdate.value);
      
    //   //刷新列表
    //   emit('success');
    // } finally {
    //   setModalProps({ confirmLoading: false });
    // }
  }
</script>
