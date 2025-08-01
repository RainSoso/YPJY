<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="停复产查看" @cancel="closeModal" width="900px">
        <table class="my-table">
            <colgroup>
                <col style="width:100px;" />
                <col />
                <col style="width:150px;" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <td class="text-blue font-600 text-right">企业名称</td>
                    <td>{{ record.qymc }}</td>
                    <td class="text-blue font-600 text-right">统一社会信用代码</td>
                    <td>{{ record.shxydm }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">操作类型</td>
                    <td>{{ getDictText('qylog_czlx',record.czlx) }}</td>
                    <template v-if="record.czlx === '1'">
                        <td class="text-blue font-600 text-right">复产检查</td>
                        <td>
                            <a-button type="link" @click="openJdjc(record)"> {{ record.label }}</a-button>
                        </td>
                    </template>
                    <td v-else colspan="2"></td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">附件</td>
                    <td colspan="3">
                        <MUpload :bisId="record.id" :disabled="true" :download="true" biz="qybz" category="停产" source="企业停复产" v-if="record.czlx === '0'"/>
                        <MUpload :bisId="record.id" :disabled="true" :download="true" biz="qybz" category="复产" source="企业停复产" v-if="record.czlx === '1'"/>
                    </td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">备注/说明</td>
                    <td colspan="3">{{ record.remark }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">备注人</td>
                    <td>{{ record.createByName }}<span v-if="record.createByOrgName">（{{ record.createByOrgName }}）</span></td>
                    <td class="text-blue font-600 text-right">备注时间</td>
                    <td>{{ record.createTime }}</td>
                </tr>
            </tbody>
        </table>
    </BasicModal>

    <TywrcjgxqDetils @register="registerModalJdjc"></TywrcjgxqDetils>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import {useModal} from '/@/components/Modal';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
import { getDictText } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import TywrcjgxqDetils from '/@/views/ypsczhjg/yw/rcjg/modules/TywrcjgxqDetils.vue';

const [registerModalJdjc, {openModal: openModalJdjc}] = useModal();

const record = ref({});

//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: false });
    record.value = data.record || {};
});

function openJdjc(record) {
    openModalJdjc(true, {
        record: { id: record.jdjcId },
        isUpdate: false
    });
}

defineExpose({ getDictText, formatToDate });
</script>

<style lang="less" scoped>
</style>