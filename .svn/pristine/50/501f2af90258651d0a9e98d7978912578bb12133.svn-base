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
        <td class="text-blue font-600 text-right">有无需继续完成的工作</td>
        <td colspan="3">{{ Jbxx.sfwnr && filterDictTextByCache('SFBZ-1',Jbxx.sfwnr) || Jbxx.sfwnr}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">事项</td>
        <td colspan="3">{{ Jbxx.sx }}</td>
      </tr>
      <tr v-if="Jbxx.project == '按照药品批准证明文件和药品监督管理部门要求开展的上市后研究情况'">
        <td class="text-blue font-600 text-right">完成情况</td>
        <td colspan="3">{{ Jbxx.wcqk && filterDictTextByCache('nbbgYpsswcqk',Jbxx.wcqk) || Jbxx.wcqk}}</td>
      </tr>
      <tr v-if="Jbxx.project == '审批类变更概述'">
        <td class="text-blue font-600 text-right">批准时间</td>
        <td>{{ Jbxx.pzsj }}</td>
        <td class="text-blue font-600 text-right">药品补充批件编号</td>
        <td>{{ Jbxx.ypbcpjbh }}</td>
      </tr>
      <tr v-if="Jbxx.project == '审批类变更概述'">
        <td class="text-blue font-600 text-right">持续稳定性考察结论或阶段性考察结论</td>
        <td colspan="3">{{ Jbxx.cxxkcjlhjdxkcjl && filterDictTextByCache('ndbgYpsskhjl',Jbxx.cxxkcjlhjdxkcjl) || Jbxx.cxxkcjlhjdxkcjl}}</td>
      </tr>
      <tr v-if="Jbxx.project == '备案类变更概述'">
        <td class="text-blue font-600 text-right">备案公示时间</td>
        <td>{{ Jbxx.bagssj }}</td>
        <td class="text-blue font-600 text-right">备案号</td>
        <td>{{ Jbxx.bah }}</td>
      </tr>
      <tr v-if="Jbxx.project == '报告类变更概述'">
        <td class="text-blue font-600 text-right">是否按照相关指导原则的技术要求完成研究</td>
        <td colspan="3">{{ Jbxx.sfazxgzdyz && filterDictTextByCache('SFBZ-1',Jbxx.sfazxgzdyz) || Jbxx.sfazxgzdyz}}</td>
      </tr>
      <tr v-if="Jbxx.project == '报告类变更概述'">
        <td class="text-blue font-600 text-right">如否，说明理由</td>
        <td colspan="3">{{ Jbxx.smly }}</td>
      </tr>
      <tr v-if="Jbxx.jb">
        <td class="text-blue font-600 text-right">级别</td>
        <td colspan="3">{{ Jbxx.jb && filterDictTextByCache('ndbg_bgjb',Jbxx.jb) || Jbxx.jb }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">{{Jbxx.project.includes('变更')?'变更':'报告'}}主要内容</td>
        <td colspan="3">{{ Jbxx.zynr}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">附件</td>
        <td colspan="3" style="white-space:pre-wrap;">
          <MUpload :bisId="Jbxx.id || ''"  :category="Jbxx.project || ''" :disabled="true" />
         <!-- <uploader :fileId="Jbxx.id || ''" :attchType="Jbxx.project || ''" :readonly="true" /> -->
        </td>
      </tr>
    </table>
    <b style="color:red"  v-if="Jbxx.project == '按照药品批准证明文件和药品监督管理部门要求开展的上市后研究情况'">附件内容说明：
        简述上市后相关研究情况，如已完成并提交，提供相关受理号、批准证明文件。</b>
    <b style="color:red"  v-if="Jbxx.project == '审批类变更概述'">附件内容说明：
       简述审批类变更事项及相关的研究和验证结果情况，包括持续稳定性考察或阶段性考察研究数据和结论等。</b>
    <b style="color:red"  v-if="Jbxx.project == '备案类变更概述'">附件内容说明：
        简述备案类变更事项及相关的研究和验证结果情况。
   </b>
    <b style="color:red"  v-if="Jbxx.project == '报告类变更概述'">附件内容说明：
       简述报告类变更事项及相关的研究和验证结果情况。
   </b>
    <b style="color:red"  v-if="Jbxx.project == '需要报告的其他情形'">附件内容说明：
      简述其主要内容。
   </b>
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
// import uploader from '../../components/uploader.vue';
import MUpload from '/@/components/Form/src/jeecg/components/MUpload.vue';

const route = useRoute();
const formatToDate1 = formatToDate;
const Jbxx = ref({project:''});
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
