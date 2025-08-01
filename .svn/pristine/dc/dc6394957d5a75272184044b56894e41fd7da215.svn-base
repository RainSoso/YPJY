<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="备注企业" @ok="handleSubmit" width="40%">
        <BasicForm @register="registerForm" />
        <div class="pl-20px flex">
            <div class="text-red">注：</div>
            <ol class="list-decimal pl-4">
                <li v-if="czlxField == '0'">请在备注/说明中填写企业停产原因以及停产时间。</li>
                <li v-if="czlxField == '0'">备注企业停产后，将在监督检查相关统计页中不纳入应检数量。</li>
                <li v-if="czlxField == '1'">请在附件中上传企业复产申请报告。</li>
                <li>附件中可以上传相关附件内容。</li>
                <li>停产/复产可以多次备注，已停产企业备注停产时不会发生变化，只有在产企业备注停产时才会标记企业停产，复产类似。</li>
            </ol>
        </div>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { getformSchema, czlxField } from '../YwQySczkLog.data';
import { fcqyzk, tcqyzk } from '../YwQySczkLog.api';
import { buildUUID } from '/@/utils/uuid';
import { usePermission } from '/@/hooks/web/usePermission';
const { hasPermission } = usePermission();
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const permission = { hasTc: hasPermission('jc:qy:qytc:edit'), hasFc: hasPermission('jc:qy:qyfc:edit') };
//表单配置
const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: getformSchema(permission),
    showActionButtonGroup: false,
});

//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    //表单赋值
    await setFieldsValue(
        Object.assign({}, data.record, { id: buildUUID(), czlx: data.record.sczk === '1' ? permission.hasTc ? '0' : '1' : (permission.hasFc ? '1' : '0') })
    );
});

//表单提交事件
async function handleSubmit(v) {
    try {
        let values = await validate();
        setModalProps({ confirmLoading: true });
        if (values.czlx == '1') {
            //提交表单
            await fcqyzk(values);
        } else {
            await tcqyzk(values);
        }

        //关闭弹窗
        closeModal();
        //刷新列表
        emit('success', { isUpdate: isUpdate.value, values });
    } finally {
        setModalProps({ confirmLoading: false });
    }
}
</script>

<style lang="less" scoped></style>