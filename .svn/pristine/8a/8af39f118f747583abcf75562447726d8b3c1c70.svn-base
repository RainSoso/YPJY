<template>
   <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="70%">
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{  FormData.qymc }}</td>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ FormData.shxydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">标题</td>
                <td>{{  FormData.title }}</td>
                <td class="text-blue font-600 text-right">日期</td>
                <td>{{ FormData.tbrq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">附件</td>
                <td colspan="3">
                    <MUpload :bisId="bisid" :disabled="true" :download="true"
                        category="baxx" source="ypjyBaxx"/>
                </td>
            </tr>
            <tr v-if="!showFooter_">
                <td class="text-blue font-600 text-right">状态</td>
                <td>
                    {{ getDictText("ypjy_baxx_zt", FormData.zt) }}
                </td>
            </tr>
            <tr v-if="showFooter_">
                <td class="text-blue font-600 text-right">流转状态</td>
                <td >    
                    <a-radio-group v-model:value="form.zt" button-style="solid">
                        <a-radio-button value="2">通过</a-radio-button>
                        <a-radio-button value="3">退回</a-radio-button>
                    </a-radio-group>
                </td>
            </tr>
            <tr v-if="showFooter_">
                <td class="text-blue font-600 text-right">审核意见</td>
                <td colspan="3">
                    <a-textarea v-model:value="form.shyj" />
                </td>
            </tr>
            <tr v-if="!showFooter_">
                <td class="text-blue font-600 text-right">审核意见</td>
                <td colspan="3">
                    {{FormData.shyj}}
                </td>
            </tr>
        </table>
        
     </BasicModal>
</template>

<script lang="ts" setup>
    import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
    import {ref, computed, unref} from 'vue';
    import {BasicModal, useModalInner} from '/@/components/Modal';
    import {BasicForm, useForm} from '/@/components/Form/index';
    import {formSchema} from '../Baxx.data';
    import {saveOrUpdate} from '../Baxx.api';
    import { getDictText } from '/@/utils/dict/JDictSelectUtil';
    // Emits声明
    const form = ref({id:'',zt:'',shyj:''});
    const emit = defineEmits(['register','success']);
    const isUpdate = ref(true);
    //表单配置
    const [registerForm, {resetFields, setFieldsValue, validate}] = useForm({
        labelWidth: 150,
        schemas: formSchema,
        showActionButtonGroup: false,
    });
    const bisid = ref('');
    const FormData = ref({});
    const showFooter_ = ref(true);
    //表单赋值
    const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
        FormData.value = data.record || {};
        bisid.value= data.record.id;
        form.value.id = data.record.id;
        form.value.zt = '2';
        form.value.shyj = '';
        showFooter_.value = data?.showFooter;
        //重置表单
        await resetFields();
        setModalProps({confirmLoading: false,showCancelBtn:data?.showFooter,showOkBtn:data?.showFooter});
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
            //表单赋值
            await setFieldsValue({
                ...data.record,
            });
        }
    });
    //设置标题
    const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
    //表单提交事件
    async function handleSubmit(v) {
        try {
            //let values = await validate();
            let values = form.value;
            setModalProps({confirmLoading: true});
            //提交表单
            await saveOrUpdate(values, isUpdate.value);
            //关闭弹窗
            closeModal();
            //刷新列表
            emit('success', {isUpdate: isUpdate.value, values});
        } finally {
            setModalProps({confirmLoading: false});
        }
    }
</script>

<style lang="less" scoped>

</style>