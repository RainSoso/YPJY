<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="90%">
        <BasicForm @register="registerForm" />
        <h2 class="text-center mb-4 text-xl font-600" v-if="FormData.ggbh">药品委托储存配送企业相关信息（{{FormData.ggbh}}）</h2>
        <table class="my-table">
            <colgroup>
                <col class="w-30px"/>
                <col class="w-110px"/>
                <col class="w-110px"/>
                <col/>
                <col class="w-55px"/>
                <col/>
                <col class="w-110px"/>
                <col class="w-110px"/>
                <col/>
                <col/>
            </colgroup>
            <thead>
                <tr>
                    <th rowspan="2" class="text-center">序号</th>
                    <th colspan="3" class="text-center">委托企业信息</th>
                    <th rowspan="2" class="text-center">委托类型</th>
                    <th rowspan="2" class="text-center">委托品种范围</th>
                    <th colspan="4" class="text-center">受托企业信息</th>
                </tr>
                <tr>
                    <th class="text-center">企业名称</th>
                    <th class="text-center">许可证号</th>
                    <th class="text-center">注册地址</th>
                    <th class="text-center">企业名称</th>
                    <th class="text-center">许可证号</th>
                    <th class="text-center">注册地址</th>
                    <th class="text-center">仓库地址</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in Data" :key="idx" :class="['cursor-pointer',item.hasChanged == 'Y' ? 'bg-red-500/10' : '']" @click="openView(item)">
                    <td class="text-center">{{ idx + 1 }}</td>
                    <td class="text-center">{{ item.qymc }}</td>
                    <td class="text-center">{{ item.xkzh }}</td>
                    <td class="text-center">{{ item.zcdz }}</td>
                    <td class="text-center">{{ item.wtbgsx }}</td>
                    <td class="text-center">{{ item.wtpzfw }}</td>
                    <td class="text-center">{{ item.stfqymc }}</td>
                    <td class="text-center">{{ item.xkzstf }}</td>
                    <td class="text-center">{{ item.stfzcdz }}</td>
                    <td class="text-center">{{ item.stfckdz }}</td>
                </tr>
            </tbody>
        </table>
    </BasicModal>
    <wtbgBaseView @register="registerViewModal"></wtbgBaseView>
</template>

<script lang="ts" setup>
import { ref, computed, unref, nextTick } from 'vue';
import { BasicModal, useModalInner, useModal } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import wtbgBaseView from './wtbgBaseView.vue';
import { formSchema } from '../WtbgNotice.data';
import { saveOrUpdate } from '../WtbgNotice.api';
import { queryNotBase } from '../WtbgBase.api';
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const Data = ref([]);
const FormData = ref({})
const [registerViewModal, { openModal: openViewModal }] = useModal();
//表单配置
const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 110,
    schemas: formSchema,
    showActionButtonGroup: false,
});
//表单赋值
const [registerModal, { setModalProps, closeModal, redoModalHeight }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    if (data?.showFooter !== false) setModalProps({ confirmLoading: false, showCancelBtn: true, showOkBtn: true });
    else setModalProps({ confirmLoading: false, footer: null });
    queryNotBase({ ids: data.record.id, baseId: data.record.wtbgId }).then((res) => {
        Data.value = res;
        nextTick(() => {
            redoModalHeight();
        });
    });
    isUpdate.value = !!data?.isUpdate;
    //表单赋值
    await setFieldsValue({
        ...data.record,
    });
    FormData.value = data.record;
    setProps({ disabled: !data?.isUpdate });
});
//设置标题
const title = computed(() => (!unref(isUpdate) ? '查看' : '编辑'));
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
        await saveOrUpdate(values, isUpdate.value && values.id);
        //关闭弹窗
        closeModal();
        //刷新列表
        emit('success', { isUpdate: isUpdate.value, values });
    } finally {
        setModalProps({ confirmLoading: false });
    }
}
function openView(record) {
  openViewModal(true, { record });
}
</script>

<style lang="less" scoped></style>