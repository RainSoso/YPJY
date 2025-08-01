<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="药品经营行政审批详情" @cancel="closeModal" width="900px">
        <table class="my-table">
            <colgroup>
                <col style="width:100px;" />
                <col />
                <col style="width:150px;" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <td class="text-blue font-600 text-right">证书编号</td>
                    <td>{{ record.zsbh }}</td>
                    <td class="text-blue font-600 text-right">证书类型</td>
                    <td>{{ record.type == '01' ? '药品经营批发' : '药品经营零售连锁总部'  }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">企业名称</td>
                    <td>{{ record.qymc }}</td>
                    <td class="text-blue font-600 text-right">统一社会信用代码</td>
                    <td>{{ record.shxydm }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">法定代表人</td>
                    <td>{{ record.fddbr }}</td>
                    <td class="text-blue font-600 text-right">企业负责人</td>
                    <td>{{ record.qyfzr }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">质量负责人</td>
                    <td >{{ record.zlfzr }}</td>
                    <td class="text-blue font-600 text-right">签发人</td>
                    <td >{{ record.qfr }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">发证机关</td>
                    <td>{{ record.fzjg }}</td>
                    <td class="text-blue font-600 text-right">发证日期</td>
                    <td>{{ record.fzrq }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">有效期至</td>
                    <td>{{ record.yxqz }}</td>
                    <td class="text-blue font-600 text-right">行政区划</td>
                    <td>{{ getTextByCode(record.xzqhdm) }}</td>
                </tr>
                <!-- <tr v-if="record.serviceType == '3'">
                    <td class="text-blue font-600 text-right">变更内容</td>
                    <td colspan="3" style="white-space:pre-wrap;">{{ record.zcdz }}</td>
                </tr> -->
                <tr>
                    <td class="text-blue font-600 text-right">注册地址</td>
                    <td colspan="3" style="white-space:pre-wrap;">{{ record.zcdz }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">仓库地址</td>
                    <td colspan="3" style="white-space:pre-wrap;">{{ record.ckdz }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">经营范围</td>
                    <td colspan="3" style="white-space:pre-wrap;">{{ record.fw }}</td>
                </tr>
            </tbody>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
const record = ref({});

//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: false });
    record.value = data.record || {};
});
</script>

<style lang="less" scoped>
</style>