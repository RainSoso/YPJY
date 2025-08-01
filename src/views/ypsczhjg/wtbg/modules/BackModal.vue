<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="40%">
        <BasicForm @register="registerForm" class="!pr-4" />
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { backFormSchema as formSchema } from '../WtbgBase.data';
import { saveOrUpdate } from '../WtbgBase.api';
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
//表单配置
const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
});
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
        //表单赋值
        await setFieldsValue({
            ...data.record,
        });
    }
});
//设置标题
const title = computed(() => (!unref(isUpdate) ? '新增' : '退回补正'));
//表单提交事件
async function handleSubmit() {
    let values;
    try {
        values = await validate();
    } catch (e) {
        return;
    }
    try {
        setModalProps({ confirmLoading: true });
        //提交表单
        await saveOrUpdate(values, isUpdate.value);
        //关闭弹窗
        closeModal();
        //刷新列表
        emit('success', { isUpdate: isUpdate.value, values });
    } finally {
        setModalProps({ confirmLoading: false });
    }
}
</script>

<style lang="less" scoped>

</style>