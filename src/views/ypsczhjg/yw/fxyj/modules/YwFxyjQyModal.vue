<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ FormData.shxydm }}</td>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ FormData.qymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">风险类型</td>
                <td>{{ FormData.fxlx }}</td>
                <td class="text-blue font-600 text-right">年份</td>
                <td>{{ FormData.year }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">风险内容</td>
                <td colspan="3">{{ FormData.fxnr }}</td>
            </tr>
             <tr>
                <td class="text-blue font-600 text-right">风险级别</td>
                <td>{{ FormData.fxjb }}</td>
                <td class="text-blue font-600 text-right">发生次数</td>
                <td>{{ FormData.ywQty }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">备注</td>
                <td colspan="3">{{ FormData.remarks }}</td>
            </tr>
        </table>

    </BasicModal>
</template>

<script lang="ts" setup>
import { ref , defineComponent, reactive, toRefs} from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import {BasicForm, useForm} from '/@/components/Form/index';
import { useRoute } from 'vue-router';
const route = useRoute();
const formatToDate1 = formatToDate;
const FormData = ref({});

const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped>
</style>
