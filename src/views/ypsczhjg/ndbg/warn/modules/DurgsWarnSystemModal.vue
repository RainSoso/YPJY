<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【药物警戒体系建设及运行情况】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:20%" />
                <col />
                <col style="width:30%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">项目</td>
                <td colspan="3">{{ FormData.project && filterDictTextByCache('ndbgYwjjProject', FormData.project) || FormData.project }}</td>
            </tr>
              <tr>
                <td class="text-blue font-600 text-right">{{FormData.project == '1' ? '是否委托开展药物警戒活动' : '是否有内容'}}</td>
                <td colspan="3">{{ FormData.isContent && filterDictTextByCache('SFBZ-1', FormData.isContent) || FormData.isContent }}</td>
            </tr> 
             <tr>
                <td class="text-blue font-600 text-right">附件</td>
                <td colspan="3" style="white-space:pre-wrap;">
                    <MUpload :bisId="FormData.id || ''" :disabled="true" :download="true" :category="FormData.project && filterDictTextByCache('ndbgYwjjProject', FormData.project) || ''" />
                </td>
            </tr>
        </table>
        <b style="color:red"  v-if="FormData.project == '1'">附件内容说明：
        简述药物警戒体系建设情况，包括体系文件及更新、药物警戒机构、人员资源等。</b>
         <b style="color:red"  v-if="FormData.project == '2'">附件内容说明：
        简述药物警戒工作开展情况，包括对疑似药品不良反应信息的收集和报告，对风险信号的识别评估、风险沟通等情况。</b>
         <b style="color:red"  v-if="FormData.project == '3'">附件内容说明：
        简述相关情况</b>
    </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { formatToDate } from '/@/utils/dateUtil';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
// import uploader from '../../components/uploader.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
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
