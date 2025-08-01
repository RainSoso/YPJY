<template>
    <BasicModal v-bind="$attrs" @register="registerModal" destroyOnClose :title="title" :width="800" @ok="handleSubmit">
        <BasicForm @register="registerForm" />
        <div>
            <a-row>
                <a-col span="10">
                    <a-form-item label="事项标题" :labelCol="{ style: { width: '100px' } }"
                        :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
                        <a-input v-model:value="params.sxTitle" placeholder="请输入事项标题" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="主体内容" :labelCol="{ style: { width: '100px' } }"
                        :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
                        <a-textarea v-model:value="params.contents" placeholder="请输入主体内容" />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="选择批复企业" :labelCol="{ style: { width: '100px' } }"
                        :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
                        <a-select v-model:value="qyInfo" label-in-value style="width: 220px" :options="qylist">
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-form-item label="批复文件" :labelCol="{ style: { width: '100px' } }"
                        :wrapperCol="{ style: { width: 'calc(100% - 100px)' } }">
                        <MUpload :bisId="params.id || uuid" :download="true" :maxCount="10" :maxSize="1024 * 1024 * 10"
                            :source="'tysb'" />
                    </a-form-item>
                </a-col>
            </a-row>
        </div>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { formSchema } from '../PYwTyjhsbSxcl.data';
import { saveOrUpdate, getUUID, getSbqy } from '../PYwTyjhsbSxcl.api';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
import { message } from 'ant-design-vue';
// Emits声明
const emit = defineEmits(['register', 'success']);
const isUpdate = ref(true);
const params = ref({});
const uuid = ref("");
const qylist = ref([]);
const qyInfo=ref({});
//表单配置
const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    //labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { span: 24 }
});
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    params.value = {};
    qyInfo.value={};
    getUUID().then((res => {
        uuid.value = res.uuid;
    }));
    getSbqy().then((res => {
        qylist.value=res
    }));

    setModalProps({ confirmLoading: false, showCancelBtn: !!data?.showFooter, showOkBtn: !!data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
        //表单赋值
        await setFieldsValue({
            ...data.record,
        });
        let formdata = JSON.parse(JSON.stringify(data.record));
        params.value=formdata;
        console.log(params.value)
        console.log(params.value.qymc&&params.value.shxydm)
        if(params.value.qymc&&params.value.shxydm){
            console.log(qyInfo)
            qyInfo.value={label:params.value.qymc,value:params.value.shxydm,key:params.value.shxydm};
        }
           
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter })
});
//设置标题
const title = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
//表单提交事件
async function handleSubmit(v) {
    try {
        let values = await validate();
        if (!params.value.id) {
            params.value.id = unref(uuid.value);
            params.value.state = "0";
        }
        if(!qyInfo.value){
            message.info("批复企业不能为空");
            return;
        }else{
            console.log(qyInfo)
            params.value.qymc=unref(qyInfo.value.label)
            params.value.shxydm=unref(qyInfo.value.value)
        }
        let formdata = unref(params.value);
        values = formdata;

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
</script>

<style lang="less" scoped>
/** 时间和数字输入框样式 */
:deep(.ant-input-number) {
    width: 100%
}

:deep(.ant-calendar-picker) {
    width: 100%
}
</style>