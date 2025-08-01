<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="600">
        <table class="my-table">
            <colgroup>
                <col style="width:10em;" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">登记号</td>
                <td>{{ FormData.djh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">药品名称</td>
                <td>{{ FormData.yptymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">药品标签</td>
                <td><MCategory :value="FormData.tags" displayType="tags" itemClass="xl" /></td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">统一社会信用代码</td>
                <td>{{ FormData.shxydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">企业名称</td>
                <td>{{ FormData.qymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">企业地址</td>
                <td>{{ FormData.qydz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">境外企业名称</td>
                <td>{{ FormData.jwqymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">境外企业地址</td>
                <td>{{ FormData.jwqydz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">来源</td>
                <td>{{ FormData.source }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">包装规格</td>
                <td>{{ FormData.bzgg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">登记日期</td>
                <td>{{ formatToDate1(FormData.djrq) }}</td>
            </tr>
        </table>
    </BasicModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import MCategory from '/@/components/Custom/MCategory.vue';

const formatToDate1 = formatToDate;
const FormData: Recordable = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    setModalProps({ title: '查看' + FormData.value.category, confirmLoading: false, width: 600, footer: null });
});

function handleSubmit() {
    closeModal();
}
</script>