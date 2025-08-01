<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="700">
        <table class="my-table">
            <colgroup>
                <col style="width:14em;" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">备案号</td>
                <td>{{ FormData.bah }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">中药配方颗粒名称</td>
                <td>{{ FormData.zypfklmc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产企业统一社会信用代码</td>
                <td>{{ FormData.shxydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产企业</td>
                <td>{{ FormData.scqy }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产地址</td>
                <td>{{ FormData.scdz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">规格</td>
                <td>{{ FormData.gg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">包装规格</td>
                <td>{{ FormData.bzgg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">保质期</td>
                <td>{{ FormData.bzq }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">备案时间</td>
                <td>{{ formatToDate1(FormData.basj) }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">备案省局</td>
                <td>{{ FormData.basj2 }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">执行的配方颗粒标准</td>
                <td>{{ FormData.zxdpfklbz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">饮片执行的炮制规范</td>
                <td>{{ FormData.ypzxdpzgf }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">不良反应监测信息</td>
                <td>{{ FormData.blfyjcxx }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">销售备案号</td>
                <td>{{ FormData.xsbah }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">销往省份</td>
                <td>{{ FormData.xwsf }}</td>
            </tr>
        </table>
    </BasicModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';

const formatToDate1 = formatToDate;
const FormData: Recordable = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    setModalProps({ title: '查看中药配方颗粒', confirmLoading: false, width: 600, footer: null });
});

function handleSubmit() {
    closeModal();
}
</script>