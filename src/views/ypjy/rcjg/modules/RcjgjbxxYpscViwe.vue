<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【药品生产日常监管】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">表单名称</td>
                <td>{{ FormData.bdmc }}</td>
                <td class="text-blue font-600 text-right">监管类型</td>
                <td>{{ FormData.jglx }}</td>
                
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">社会信用代码</td>
                <td>{{ FormData.tyshxydm }}</td>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ FormData.qymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查时间</td>
                <td>{{ FormData.jcsj }}</td>
                <td class="text-blue font-600 text-right">检查部门</td>
                <td>{{ FormData.jcbm}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查人员</td>
                <td colspan="3">{{ FormData.jcry }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查内容</td>
                <td colspan="3">{{ FormData.jcnr }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">处理建议</td>
                <td colspan="3">{{ FormData.cljy }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查行为名称</td>
                <td>{{ FormData.jcxwmc }}</td>
                <td class="text-blue font-600 text-right">检查行为编号</td>
                <td>{{ FormData.jcxwbh}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">行政区划代码</td>
                <td>{{ FormData.xzqhdm }}</td>
            </tr>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
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

<style lang="less" scoped></style>
