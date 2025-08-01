<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="证书详情" @cancel="closeModal" width="80%">
        <xzsp :shxydm="shxydm" :showTitle="false" />
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import xzsp from '/@/views/ypsczhjg/jc/xzsp.vue';

const shxydm = ref('');

//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    //await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: false });
    shxydm.value = data?.record?.shxydm;
});
</script>

<style lang="less" scoped>
</style>