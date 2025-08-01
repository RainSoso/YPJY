<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="40%">
    <h2>【风险管理情况】</h2>  
    <table class="my-table mb-2">
      <colgroup>
        <template v-for="(item, idx) in TableStyle.cols" :key="idx">
          <col :style="item.style || ''" />
        </template>
      </colgroup>
      <tr>
        <td class="text-blue font-600 text-right">药品批准文号/注册证号</td>
        <td>{{ route.query?.drugApproveNo }}</td>
        <td class="text-blue font-600 text-right">药品通用名称</td>
        <td>{{ route.query?.drugName }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">规格</td>
        <td colspan="3">{{ Jbxx.gg }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">项目</td>
        <td colspan="3">{{ Jbxx.project }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">是否有内容</td>
        <td colspan="3">{{ Jbxx.isContent && filterDictTextByCache('SFBZ-1',Jbxx.isContent) || Jbxx.isContent}}</td>       
      </tr>
      <tr v-if="Jbxx.project == '药品上市后风险管理计划'">
        <td class="text-blue font-600 text-right">是否已按规定制定药品上市后风险管理计划</td>
        <td colspan="3">{{ Jbxx.isRiskPlan && filterDictTextByCache('SFBZ-1',Jbxx.isRiskPlan) || Jbxx.isRiskPlan }}</td>
      </tr>
      <tr v-if="Jbxx.project == '不符合药品标准的产品批次调查处理情况'">
        <td class="text-blue font-600 text-right">企业是否发现已上市产品不符合药品标准</td>
        <td>{{ Jbxx.isAccordWithStandard && filterDictTextByCache('SFBZ-1',Jbxx.isAccordWithStandard) || Jbxx.isAccordWithStandard}}</td>
        <td class="text-blue font-600 text-right">是否有药品监管部门通报不符合药品标准的情况</td>
        <td>{{ Jbxx.isSuperviseStandard && filterDictTextByCache('SFBZ-1',Jbxx.isSuperviseStandard) || Jbxx.isSuperviseStandard }}</td>
      </tr>
      <tr v-if="Jbxx.project == '因质量问题或者其他安全隐患导致的退货情况'">
        <td class="text-blue font-600 text-right">是否发生退货</td>
        <td colspan="3">{{ Jbxx.isReturn && filterDictTextByCache('SFBZ-1',Jbxx.isReturn) || Jbxx.isReturn }}</td>
      </tr>
      <tr v-if="Jbxx.project == '因质量问题或者其他安全隐患导致的召回情况'">
        <td class="text-blue font-600 text-right">是否发生召回</td>
        <td colspan="3">{{ Jbxx.isRecall && filterDictTextByCache('SFBZ-1',Jbxx.isRecall) || Jbxx.isRecall}}</td>
      </tr>
      <tr v-if="Jbxx.project == '因质量问题或者其他安全隐患导致的召回情况'">
        <td class="text-blue font-600 text-right">召回等级</td>
        <td colspan="3">{{ Jbxx.recallGrade && filterDictTextByCache('ndbgRiskzhdj',Jbxx.recallGrade) || Jbxx.recallGrade}}</td>
      </tr>
      <tr v-if="Jbxx.project == '通过相应上市前的药品生产质量管理规范符合性检查的商业规模批次产品，上市后开展的风险控制情况'">
        <td class="text-blue font-600 text-right">企业是否有上市前的GMP符合性检查的商业规模批次上市情况</td>
        <td colspan="3">{{ Jbxx.isGmp && filterDictTextByCache('SFBZ-1',Jbxx.isGmp) || Jbxx.isGmp}}</td>
      </tr>
      <tr v-if="Jbxx.project == '药品上市后风险管理计划'">
        <td class="text-blue font-600 text-right">如否，说明理由</td>
        <td colspan="3">{{ Jbxx.isNoPlanReason }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">附件</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <MUpload :bisId="Jbxx.id || ''" :disabled="true" :download="true" :category="Jbxx.project || ''" />
       <!-- <uploader :fileId="Jbxx.id || ''" :attchType="Jbxx.project || ''" :readonly="true" /> -->
        </td>
      </tr>
    </table>
     <b style="color:red"  v-if="Jbxx.project == '药品上市后风险管理计划'">附件内容说明：
        简述药品上市后风险管理计划制定及实施情况。</b>
      <b style="color:red"  v-if="Jbxx.project == '不符合药品标准的产品批次调查处理情况'">附件内容说明：
      简述批号、数量、原因及该批产品后续处置（如销毁等）等情况。
    </b>
    <b style="color:red"  v-if="Jbxx.project == '因质量问题或者其他安全隐患导致的退货情况'">附件内容说明：
      简述批号、数量、原因及采取的风险控制措施等情况。
    </b>
    <b style="color:red"  v-if="Jbxx.project == '因质量问题或者其他安全隐患导致的召回情况'">附件内容说明：
     简述批号、数量、原因及该批产品后续处置（如销毁等）等情况。
    </b>
    <b style="color:red"  v-if="Jbxx.project == '通过相应上市前的药品生产质量管理规范符合性检查的商业规模批次产品，上市后开展的风险控制情况'">附件内容说明：
      简述批号、数量、放行审核、风险控制等情况。
    </b>
    <b style="color:red"  v-if="Jbxx.project == '需要报告的其他情况'">附件内容说明：
      简述具体内容。
    </b>
  </BasicModal>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { queryById } from '/@/views/ypsczhjg/ndbg/risk/RiskManagement.api'
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
import { useRoute } from 'vue-router';
// import uploader from '/@/views/ypsczhjg/ndbg/components/uploader.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';

const route = useRoute();
const formatToDate1 = formatToDate;
const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
const Jbxx = ref({});
const TableStyle = ref({
  cols: [{ style: 'width:190px' }, {}, { style: 'width:190px' }, {}]
});
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
