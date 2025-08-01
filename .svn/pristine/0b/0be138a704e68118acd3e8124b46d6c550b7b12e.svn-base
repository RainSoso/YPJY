<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件不合格药品】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">批准文号</td>
                <td>{{ FormData.pzwh }}</td>
                <td class="text-blue font-600 text-right">通用名称</td>
                <td>{{ FormData.tymc }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">发现日期</td>
                <td>{{ FormData.rq }}</td>
                <td class="text-blue font-600 text-right">数量</td>
                <td>{{ FormData.sl }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">规格</td>
                <td colspan="3">{{ FormData.gg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产批号</td>
                <td>{{ FormData.scph }}</td>
                <td class="text-blue font-600 text-right">单位</td>
                <td>{{ FormData.dw }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">上市许可持有人</td>
                <td>{{ FormData.scqy }}</td>
                <td class="text-blue font-600 text-right">所属门店(连锁总部录入)</td>
                <td>{{ FormData.ssmd }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">不合格原因</td>
                <td colspan="3">{{ FormData.bhgyy }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">处理意见</td>
                <td>{{ FormData.clyj }}</td>
                <td class="text-blue font-600 text-right">处理情况</td>
                <td>{{ FormData.clqk }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">经办人</td>
                <td colspan="3">{{ FormData.jbr }}</td>
            </tr>

<!-- <td class="text-blue font-600 text-right">发证日期</td>
                <td>{{ FormData.fzrq && formatToDate1(FormData.fzrq) }}</td> -->
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
    debugger
    FormData.value = data.item || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });

});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped></style>
