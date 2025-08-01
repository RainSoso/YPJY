<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【生产地址信息】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">药品批准文号/注册证号</td>
                <td>{{ route.query?.drugApproveNo }}</td>
                <td class="text-blue font-600 text-right">药品通用名称</td>
                <td>{{ route.query?.drugName  }}</td>
            </tr>
              <tr>
                <td class="text-blue font-600 text-right">执行标准</td>
                <td colspan="3">{{ FormData.zxbz }}</td>
            </tr>
            <tr>
                <td class="text-blue font-600 text-right">生产环节</td>
                <td colspan="3"><a-checkbox-group v-model:value="checkedList" :options="plainOptions" disabled/></td>
            </tr>
             <tr>
                <td class="text-blue font-600 text-right">其他环节</td>
                <td colspan="3">{{ FormData.schjOther }}</td>
            </tr>
         </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner} from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
const formatToDate1 = formatToDate;
const FormData = ref({});
const checkedList = ref ([]);
const plainOptions = [
  { label: '净制', value: '1' },
  { label: '切制', value: '2' },
  { label: '炮炙', value: '3' },
  { label: '其他', value: '4' },
];
import { useRoute } from 'vue-router';
const route = useRoute();
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    checkedList.value = FormData.value.schj.split(',');
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});


function handleSubmit() {
    //关闭弹窗
    closeModal();
}
</script>

<style lang="less" scoped>
</style>
