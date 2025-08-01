<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>【上市后研究及变更管理情况】</h2>
    <table class="my-table mb-2">
      <colgroup>
                <col style="width:15%" />
                <col />
                <col style="width:15%" />
                <col />
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">项目</td>
        <td colspan="3">{{ Jbxx.project && filterDictTextByCache('ndbgYppzProject',Jbxx.project) || Jbxx.project }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否有内容</td>
        <td colspan="3">{{ Jbxx.sfwnr  && filterDictTextByCache('SFBZ-1',Jbxx.sfwnr ) || Jbxx.sfwnr}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">附件</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <MUpload :bisId="Jbxx.id || ''"  :category="filterDictTextByCache('ndbgYppzProject',Jbxx.project) || Jbxx.project" :disabled="true" />
        <!-- <uploader :fileId="Jbxx.id || ''" :attchType="filterDictTextByCache('ndbgYppzProject',Jbxx.project) || Jbxx.project" :readonly="true" /> -->
        </td>
      </tr>
    </table>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { queryById } from '/@/views/ypsczhjg/ndbg/sale/MarketResearchManage.api';
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import { useRoute } from 'vue-router';
// import uploader from '/@/views/ypsczhjg/ndbg/components/uploader.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';
const route = useRoute();
const formatToDate1 = formatToDate;
const Jbxx = ref({});
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
  //重置表单
  await queryById({ id: data.record.id }).then((res) => {
     Jbxx.value=res;
    setModalProps({ confirmLoading: false, width: '50%', footer: null });
  });
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
