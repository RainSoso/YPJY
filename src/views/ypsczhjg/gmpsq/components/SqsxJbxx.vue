<template>
    <div>
        <div class="panel-heading" style="margin-top:0;">
            <div class="panel">
                基本信息
                <div class="inline text-sm align-baseline" v-if="value.slbh">
                    （<span v-if="value.slbh">受理编号: {{ value.slbh }}</span>）
                </div>
            </div>
        </div>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:235px;" />
                <col />
                <col style="width:240px" />
                <col />
            </colgroup>
            <tr v-if="value.title">
                <td class="text-blue font-600 text-right">事项标题</td>
                <td colspan="3">{{ value.title }}</td>
            </tr>
            <tr v-if="value.sqxm">
                <td class="text-blue font-600 text-right">申请项目</td>
                <td colspan="3">{{ value.sqxm && getDictText('sqsx_xm', value.sqxm) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">申请检查单位名称</td>
                <td>
                    <a-input v-model:value="data.qymc" :maxlength="500" v-if="isFormModify" />
                    <a-button type="link" @click="openXzk(value.shxydm)" class="!px-0" v-else>{{ value.qymc }}</a-button>
                </td>
                <td class="text-blue font-600 text-right">申请检查单位社会信用代码</td>
                <td>
                    <a-input v-model:value="data.shxydm" :maxlength="120" v-if="isFormModify" />
                    <span v-else>{{ value.shxydm }}</span>
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">申请检查场地地址</td>
                <td colspan="3">
                    <a-input v-model:value="data.qydz" :maxlength="1000" v-if="isFormModify" />
                    <span v-else>{{ value.qydz }}</span>
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">申请检查范围/品种</td>
                <td colspan="3" class="whitespace-pre-wrap">
                    <div style="overflow:auto;" v-if="isFormModify">
                        <table style="width:100%;min-width:800px;table-layout:fixed;text-align:center;">
                            <colgroup>
                                <col style="width:110px;" />
                                <col />
                                <col style="width:210px;" />
                                <col style="width:170px;" />
                                <col style="width:160px;" />
                                <col style="width:50px;" />
                            </colgroup>
                            <tr v-for="(item, idx) in data.formItems" :key="idx">
                                <td class="text-blue font-600">检查范围/品种</td>
                                <td class="py-1"><a-input v-model:value="item.fw" :maxlength="128" /></td>
                                <td class="text-blue font-600">药品批准文号(原料药登记号)</td>
                                <td>
                                    <a-input v-model:value="item.wh" :disabled="!!item.sync" :required="!item.sync"
                                        :maxlength="32" placeholder="请填写药品批准文号" />
                                </td>
                                <td>
                                    <a-checkbox :checked="item.sync"
                                        @change="item.sync = !item.sync, item.sync && (item.wh = '')">与注册核查同步</a-checkbox>
                                </td>
                                <td>
                                    <a-button type="link" shape="circle" style="color:#ED6F6F;"
                                        v-if="idx < data.formItems.length - 1 || idx == 3 - 1"
                                        @click="data.formItems.splice(idx, 1)">
                                        <a-icon type="minus-circle" style="font-size:22px;" />
                                    </a-button>
                                    <a-button type="link" shape="circle" style="color:#1890ff;"
                                        v-if="idx >= data.formItems.length - 1 && idx < 3 - 1"
                                        @click="data.formItems.push({ fw: '', wh: '', sync: false })">
                                        <a-icon type="plus-circle" style="font-size:22px;" />
                                    </a-button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <template v-else>{{ value.jcpzfw }}</template>
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">申请检查生产车间</td>
                <td>
                    <a-input v-model:value="data.jccj" :maxlength="256" v-if="isFormModify" />
                    <span v-else>{{ value.jccj }}</span>
                </td>
                <td class="text-blue font-600 text-right">申请检查生产线</td>
                <td>
                    <a-input v-model:value="data.jccx" :maxlength="256" v-if="isFormModify" />
                    <span v-else>{{ value.jccx }}</span>
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">转办意见</td>
                <td colspan="3" class="whitespace-pre-wrap">
                    <a-textarea v-model:value="data.jcfqsy" :rows="4" :maxlength="1000" v-if="isFormModify" />
                    <template v-else>{{ value.jcfqsy }}</template>
                </td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">备注</td>
                <td colspan="3" class="whitespace-pre-wrap">
                    <a-textarea v-model:value="data.bz" :rows="2" :maxlength="1000" v-if="isFormModify" />
                    <template v-else>{{ value.bz }}</template>
                </td>
            </tr>
        </table>
        <div class="text-center mb-4" v-if="!readonly">
            <template v-if="!isFormModify">
                <a-button type="primary" @click="isFormModify = true">修改</a-button>
            </template>
            <template v-else>
                <a-button type="primary" @click="saveHandle()">保存</a-button>
                <a-button @click="isFormModify = false" v-if="value.id" class="ml-2">取消</a-button>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Form } from 'ant-design-vue';
import { propTypes } from '/@/utils/propTypes';
import { useMessage } from '/@/hooks/web/useMessage';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import Tools from '/@/utils/tools';
import { sqsxsaveOrUpdate } from '../SqsxSqsx.api';

const props = defineProps({
    value: propTypes.object.def({}),
    readonly: propTypes.bool.def(true)
});
const emit = defineEmits(['update', 'update:value', 'input', 'save']);

const { createMessage, createConfirm } = useMessage();

const data = ref({ qymc: '', shxydm: '', qydz: '', jccj: '', jccx: '', jcfqsy: '请你中心按照《药品生产监督管理办法》、GMP等法规要求，实施现场检查和技术审评。其综合评定意见，请及时报我处。', bz: '', jcpzfw: '', formItems: [] }),
    rules = ref({
        qymc: [{ required: true, message: '请输入申请检查单位名称' }],
        shxydm: [{ required: true, message: '请输入申请检查单位社会信用代码' }],
        qydz: [{ required: true, message: '请输入申请检查场地地址' }],
        formItems: [{
            async validator(rule, value) {
                if (!value || 1 > value.length) return Promise.reject('请填写申请检查范围/品种');
                for (let idx = 0; idx < value.length; idx++) {
                    let item = value[idx];
                    if (!item || !item.fw || !item.sync && !item.wh) return Promise.reject('第' + (idx + 1) + '个检查范围/品种请填写完整');
                }
                return Promise.resolve();
            }
        }],
        jccj: [{ required: true, message: '请输入申请检查生产车间' }],
        jccx: [{ required: true, message: '请输入申请检查生产线' }],
        jcfqsy: [{ required: true, message: '请输入转办意见' }]
    }),
    isSubmit = ref(false),
    isFormModify = ref(!props.readonly && !props.value.id);

watch(() => props.readonly, () => {
    if (props.readonly && isFormModify.value) isFormModify.value = false;
});
watch(() => props.value, () => {
    let obj = { formItems: [] }, jcpzfw = props.value.jcpzfw || '';
    Tools.deepMerge(obj, data.value, props.value);
    const dataArr = jcpzfw.split('\n').map(data => !data ? ['', ''] : data.split(';'));
    obj.formItems = dataArr.map(arr => ({ fw: arr[0] || '', wh: arr[1] || '', sync: !arr[1] }));
    data.value = obj;
}, { immediate: true, deep: true });

const formRef = Form.useForm(data, rules);

function saveHandle() {
    formRef.validate().then(() => {
        createConfirm({
            title: '提示', content: `您确认保存吗？`, iconType: 'warning',
            onOk: () => {
                let obj = { ...data.value, jcpzfw: data.value.formItems.map(item => `${item.fw}${item.wh ? ';' : ''}${item.wh}`).join('\n') };
                isSubmit.value = true;
                sqsxsaveOrUpdate(obj, true).then(res => {
                    if (res) {
                        obj.id = res.id;
                        updateValue(obj);
                        emit('save', obj);
                        isFormModify.value = false;
                        createMessage.success('保存成功');
                    }
                    isSubmit.value = false;
                }).catch(e => {
                    isSubmit.value = false;
                });
            }
        });
    }).catch(error => {
        createMessage.error(error.errorFields[0].errors[0]);
    });
}

function updateValue(data) {
    emit('update', data);
    emit('update:value', data);
    emit('input', data);
}

function openXzk() {

}
</script>
<style scoped>
.panel-heading {
    padding: 0px 0px 0px 15px;
    height: 42px;
    line-height: 42px;
    margin-top: 20px;
    background-image: none;
    background-color: #eee5de;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
</style>