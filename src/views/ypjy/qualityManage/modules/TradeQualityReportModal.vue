<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="70%">
        <!-- <BasicForm @register="registerForm"/> -->
        <h2>详情</h2>
        <table class="my-table mb-2" style="width: 100%;">
            <colgroup>
                <col style="width:20%" />
                <col style="width:30%" />
                <col style="width:20%" />
                <col style="width:30%" />
            </colgroup>
            <tbody>
                <tr>
                    <td class="text-blue font-600 text-right">公司名称</td>
                    <td>{{ FormData.firmName }}</td>
                    <td class="text-blue font-600 text-right">文件类型</td>
                    <td>{{ FormData.type }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">社会信用代码</td>
                    <td>{{ FormData.socialCode }}</td>
                    <td class="text-blue font-600 text-right">报告年份</td>
                    <td>{{ FormData.reportYear }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">联系人</td>
                    <td>{{ FormData.createUser }}</td>
                    <td class="text-blue font-600 text-right">联系方式</td>
                    <td>{{ FormData.phoneNumber }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">备注</td>
                    <td colspan="3">{{ FormData.note }}</td>
                </tr>
                <tr>
                    <td colspan="4" class="text-center">
                        <MUpload :bisId="FormData.id" :disabled="true" />
                    </td>
                </tr>
            </tbody>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from '../TradeQualityReport.data';
import { saveOrUpdate } from '../TradeQualityReport.api';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
//表单配置
const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
});

const FormData = ref({});
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    console.log(data.record);

    FormData.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 900, footer: null });


});

//表单提交事件
async function handleSubmit(v) {
    try {
        let values = await validate();
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

<style lang="less" scoped></style>