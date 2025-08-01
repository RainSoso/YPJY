<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="60%">
        <h2>【场地文件主要品种】</h2>
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
                <td class="text-blue font-600 text-right">商品名称</td>
                <td>{{ FormData.spm }}</td>
                
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">商品规格</td>
                <td colspan="3">{{ FormData.spgg }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">单位</td>
                <td>{{ FormData.dw }}</td>
                <td class="text-blue font-600 text-right">是否首营品种</td>
                <td>{{ FormData.sfsy }}</td>
                <!-- <td class="text-blue font-600 text-right">发证日期</td>
                <td>{{ FormData.fzrq && formatToDate1(FormData.fzrq) }}</td> -->
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产企业名称</td>
                <td>{{ FormData.scqymc }}</td>
                <td class="text-blue font-600 text-right">生产企业社会信用代码</td>
                <td>{{ FormData.scqydm }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">品种类别</td>
                <td>{{ FormData.jx }}</td>
                <td class="text-blue font-600 text-right">商品类别</td>
                <td>{{ FormData.lb }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">存储条件</td>
                <td>{{ FormData.cctj }}</td>
                <td class="text-blue font-600 text-right">状态</td>
                <td>{{ FormData.zt }}</td>
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
