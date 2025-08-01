<template>
    <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
        <h2>【审核信息】</h2>
        <table class="my-table mb-2">
            <colgroup>
                <col style="width:20%" />
                <col />
                <col style="width:30%" />
                <col />
            </colgroup>
            <tr>
                <td class="text-blue font-600 text-right">内容</td>
                <td colspan="3">{{ FormData.content || '' }}</td>
            </tr>
             <tr>
                <td class="text-blue font-600 text-right">审核人</td>
                <td colspan="3">{{ FormData.createBy || '' }}</td>
            </tr> 
            <tr>
                <td class="text-blue font-600 text-right">审核日期</td>
                <td colspan="3">{{ formatToDate1(FormData.createTime) || '' }}</td>
            </tr>            
             <tr>
	         <td class="text-blue font-600 text-right">附件</td>
                 <td colspan="3" style="white-space:pre-wrap;">
              <div v-for="(item, idx) in attach(FormData.fj)" :key="idx">
               <a-button type="link" @click="toDownload(item)">下载</a-button>
             </div>
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
import uploader from '../../components/uploader.vue';
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
function attach(item) {
  let array: any = [];
  (item || '').split(';').forEach(str => {
    if (str) {
      str = str.split(',');
      array.push([str[0], str[1]]);
    }
  });;
  return array;
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
