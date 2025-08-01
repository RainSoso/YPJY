<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件召回药品】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">通用名称</td>
                <td>{{  FormData.tymc }}</td>
                <td class="text-blue font-600 text-right">规格</td>
                <td>{{ FormData.gg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">剂型</td>
                <td>{{ FormData.jx }}</td>
                <td class="text-blue font-600 text-right">批准文号</td>
                <td>{{ FormData.pzwh }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产批号</td>
                <td>{{ FormData.scph}}</td>
                <td class="text-blue font-600 text-right">生产企业/上市许可持有人</td>
                <td>{{ FormData.scqy}}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">召回原因</td>
                <td colspan="3">{{ FormData.zhyy }}</td>
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
