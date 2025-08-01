<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="注册信息详情" @cancel="closeModal" width="900px">
        <table class="my-table">
            <colgroup>
                <col style="width:120px;" />
                <col />
                <col style="width:150px;" />
                <col />
            </colgroup>
            <tbody>
                <tr>
                    <td class="text-blue font-600 text-right">药品批准文号</td>
                    <td colspan="3">{{ record.pzwh }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">批件号</td>
                    <td colspan="3">{{ record.bh }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">批准日期</td>
                    <td colspan="3">{{ record.bdsj && formatToDate1(record.bdsj) }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">内容</td>
                    <td colspan="3">{{ record.bzxx }}</td>
                </tr>
                <tr>
                    <td class="text-blue font-600 text-right">业务类型</td>
                    <td colspan="3">{{ record.ywlx }}</td>
                </tr>
            </tbody>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';

const record = ref({});
const formatToDate1 = formatToDate;
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: false });
    record.value = data.record || {};
});
</script>

<style lang="less" scoped>
</style>