<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件GSP符合性检查】</h2>
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
                <td class="text-blue font-600 text-right">注册地址</td>
                <td>{{ FormData.zcdz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">仓库地址/经营地址</td>
                <td colspan="3">{{ FormData.ckdz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">经营范围/经营活动</td>
                <td colspan="3">{{ FormData.jyfw}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">检查日期</td>
                <td>{{ FormData.jcrq }}</td>
                <td class="text-blue font-600 text-right">检查结论</td>
                <td>{{ FormData.jcjl }}</td>
            </tr>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
const formatToDate1 = formatToDate;
const FormData = ref({});
const ZbData = ref([]);
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    //ZbData.value = data.record.mx.records || [];
    setModalProps({ confirmLoading: false, width: 1000, footer: null });

});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
