<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【检查情况】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:20%" />
                <col />
                <col style="width:20%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">监管机构名称</td>
                <td colspan="3">{{ FormData.superviseName }}</td>
            </tr>
              <tr>
                <td class="text-blue font-600 text-right">检查时间</td>
                <td>{{ FormData.checkTime && formatToDate1(FormData.checkTime) }} ~ {{FormData.checkTime2 && formatToDate1(FormData.checkTime2)}}</td>
                <td class="text-blue font-600 text-right">检查类型</td>
                <td>{{ FormData.checkType && filterDictTextByCache('jwjcJclx',FormData.checkType) || FormData.checkType}}</td>
            </tr>
              <tr>
               <td class="text-blue font-600 text-right">检查范围</td>
               <td colspan="3">{{ FormData.checkRange }}</td>
            </tr> 
             <tr>
               <td class="text-blue font-600 text-right">缺陷及整改情况</td>
               <td colspan="3">{{ FormData.defectsAndRectification }}</td>
            </tr>
            <tr>
               <td class="text-blue font-600 text-right">检查结果处置情况</td>
               <td colspan="3">{{ FormData.checkResult && filterDictTextByCache('ndbgJwjcJcjg',FormData.checkResult) || FormData.checkResult}}</td>
            </tr>
            <tr v-if="FormData.checkResult == '6'">
              <td class="text-blue font-600 text-right">其他处置结果情况</td>
              <td colspan="3">{{ FormData.jgjcqkQt }}</td>
            </tr>
            <tr>
               <td class="text-blue font-600 text-right">附件</td>
               <td colspan="3" style="white-space:pre-wrap;">
                  <MUpload :bisId="FormData.id || ''"  category="接受境外药品监管机构检查情况" :disabled="true" />
                 <!-- <uploader :fileId="FormData.id || ''" attchType="接受境外药品监管机构检查情况" :readonly="true" />  -->
                 </td>
            </tr>
        </table>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
// import uploader from '../../components/uploader.vue';
const formatToDate1 = formatToDate;
const FormData = ref({});
import { useRoute } from 'vue-router';
const route = useRoute();
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    FormData.value = data.record || {};
    setModalProps({ confirmLoading: false, width: 1000, footer: null });
});
function handleSubmit() {
    //关闭弹窗
    closeModal();
}
function toDownload(item) {
  downloadByUrl({
    url: VITE_GLOB_DOMAIN_URL + '/sys/common/static/' + item+ "?filename=" + item,
    fileName: item,
    target: '_blank',
  });
}
</script>

<style lang="less" scoped>
</style>
