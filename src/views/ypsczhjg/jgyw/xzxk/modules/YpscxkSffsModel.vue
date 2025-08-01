<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :title="'查看' + getProTypeName(FormData.proType) + '信息'"
        width="1000">
        <table class="my-table mb-2">
            <colgroup>
                <col :style="[FormData.isGmp == '1' ? { width: '170px' } : { width: '140px' }]" />
                <col />
                <col style="width:170px;" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">许可证编号</td>
                <td>{{ FormData.zsbh }}</td>
                <td class="text-blue font-600 text-right">许可证持有企业</td>
                <td>{{ FormData.zsQymc }}</td>
            </tr>
            <template v-if="FormData.proType == '2'">
                <tr>
                    <td class="text-blue font-600 text-right">委托企业名称</td>
                    <td>{{ FormData.zsQymc }}</td>
                    <td class="text-blue font-600 text-right">委托企业社会信用代码</td>
                    <td>{{ FormData.zsShxydm }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">受托企业名称</td>
                    <td>{{ FormData.refCompName }}</td>
                    <td class="text-blue font-600 text-right">受托企业社会信用代码</td>
                    <td>{{ FormData.refCompId }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">生产地址</td>
                    <td colspan="3">{{ FormData.refCompAddr }}</td>
                </tr>
            </template>
            <template v-if="FormData.proType == '3'">
                <tr>
                    <td class="text-blue font-600 text-right">委托企业名称</td>
                    <td>{{ FormData.refCompName }}</td>
                    <td class="text-blue font-600 text-right">委托企业社会信用代码</td>
                    <td>{{ FormData.refCompId }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">委托企业地址</td>
                    <td colspan="3">{{ FormData.refCompAddr }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">受托企业名称</td>
                    <td>{{ FormData.zsQymc }}</td>
                    <td class="text-blue font-600 text-right">受托企业社会信用代码</td>
                    <td>{{ FormData.zsShxydm }}</td>
                </tr>
            </template>
            <tr v-if="FormData.proType != '2'">
                <td class="text-blue font-600 text-right">生产地址</td>
                <td colspan="3">{{ FormData.addrDetail }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">车间</td>
                <td colspan="3">{{ FormData.workshop }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产线</td>
                <td colspan="3">{{ FormData.preparation }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产线(条)</td>
                <td>{{ FormData.preparationNumber }}</td>
                <td class="text-blue font-600 text-right">年生产能力</td>
                <td>
                    {{ FormData.throughput }}
                    <span v-if="FormData.calculationUnit">（计算单位：{{ FormData.calculationUnit }}）</span>
                </td>
            </tr>
            <template v-if="FormData.proType == '1'">
                <tr>
                    <td class="text-blue font-600 text-right">生产范围(正本)</td>
                    <td colspan="3">{{ FormData.productionScope }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">生产范围(副本)</td>
                    <td colspan="3">{{ FormData.productionScopeF }}</td>
                </tr>
            </template>
            <template v-if="FormData.proType != '1'">
                <tr>
                    <td class="text-blue font-600 text-right">药品通用名称</td>
                    <td colspan="3">
                        <span v-if="FormData.drugType">【{{ getDrugtypeName(FormData.drugType) }}】</span>
                        {{ FormData.drugName }}
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">批准文号/登记号</td>
                    <td>{{ FormData.regNumb }}</td>
                    <td class="text-blue font-600 text-right">相关药品编码</td>
                    <td>{{ FormData.corDrugId }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">药品剂型</td>
                    <td>{{ FormData.drugDose }}</td>
                    <td class="text-blue font-600 text-right">药品规格</td>
                    <td>{{ FormData.spec }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">委托有效期</td>
                    <td colspan="3">{{ FormData.entrustValidate }}</td>
                </tr>
            </template>
            <tr v-if="FormData.isGmp == '1'">
                <td class="text-blue font-600 text-right">药品GMP证书编号</td>
                <td colspan="3">{{ FormData.getGmpCertificate }}</td>
            </tr>
            <tr v-if="FormData.isGmp == '1'">
                <td class="text-blue font-600 text-right">药品GMP证书认证范围</td>
                <td colspan="3">{{ FormData.gmpRzScope }}</td>
            </tr>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';

const FormData = ref<Recordable>({});
const [registerModal, { setModalProps }] = useModalInner((data) => {
    FormData.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function getProTypeName(val) {
    if (val == '1') return '自产';
    else if (val == '2') return '委托';
    else if (val == '3') return '受托';
    return val;
}
function getDrugtypeName(val) {
    if (val == '1') return '原料药';
    else if (val == '2') return '非原料药';
    else if (val == '3') return '暂无品种批准信息';
    return val;
}

defineExpose({ filterDictTextByCache });
</script>

<style lang="less" scoped></style>
