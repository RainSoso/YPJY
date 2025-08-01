<template>
  <PageWrapper :title="年度报告" class="title-center" :contentStyle="{padding: '0 16px'}" contentBackground>
  <div class="text-black font-900 text-left my-4" style="font-size:120%">接受境外委托加工情况</div>    
   <table class="my-table">
        <colgroup>
          <col style="width:80%" />
          <col />
          <col style="width:50%" />
          <col />
        </colgroup>   
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:20%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">药品通用名称</td>
        <td colspan="3">{{Info.durgName}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">剂型</td>
        <td>{{Info.durgType}}</td>
        <td class="text-blue font-600 text-right">规格</td>
        <td>{{Info.specifications}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托方所在国家/地区</td>
        <td>{{Info.countryOrAddress}}</td>
        <td class="text-blue font-600 text-right">委托方（持有人）名称</td>
        <td>{{Info.entrustName}}</td>
      </tr>
    </tbody>
  </table>
  </table>
  <div class="text-black font-900 text-left my-4" style="font-size:120%">生产地址信息</div>
  <DrugsJinwaiAddressList :data="eid"></DrugsJinwaiAddressList>
  <b style="color:red">
    备注：<br>
   1.此表仅由境内生产企业填写。<br>
   2.接受境外委托，系指持有境外其它国家（地区）药品上市许可的持有人，委托境内药品生产企业生产药品的行为。<br>
   3.数量单位以“万支/万瓶/万片/万粒/万袋…”计。
  </b>
  <div class="text-black font-600 text-left my-5" style="font-size:120%">药品上市许可持有人(中药饮片生产企业)</div>
  <table class="my-table" style="table-layout: fixed">
    <colgroup>
      <col style="width:10%" />
      <col />
      <col style="width:20%" />
      <col />
    </colgroup>
    <tbody>
      <tr>
        <td class="text-blue font-600 text-right">持有人名称</td>
        <td colspan="3" align="left">
          {{hoder.ypssxkcyrmc}}
        </td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">药品生产许可证编号</td>
        <td colspan="3" align="left">
          {{hoder.ypscxkzbh}}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">注册地址</td>
        <td colspan="3" align="left">
          {{hoder.ssxkcyrdz}}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">企业法定代表人</td>
        <td>{{hoder.fddbr}}</td>
        <td class="text-blue font-600 text-right">统一社会信用代码(组织机构代码)</td>
        <td>{{hoder.tyshxydm}}</td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">企业负责人</td>
        <td>{{hoder.qyfzr}}</td>
        <td class="text-blue font-600 text-right">生产负责人</td>
        <td>{{hoder.scfzr}}</td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">质量负责人</td>
        <td>{{hoder.zlfzr}}</td>
        <td class="text-blue font-600 text-right">质量授权人</td>
        <td>{{hoder.zlsqr}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">警戒负责人</td>
        <td>{{hoder.ywjjfzr}}</td>
        <td class="text-blue font-600 text-right">企业联系人</td>
        <td>{{hoder.qylxr}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">联系人电话</td>
        <td>{{hoder.lxrsj}}</td>
        <td class="text-blue font-600 text-right">联系人座机</td>
        <td>{{hoder.lxrzj}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">联系人邮箱</td>
        <td colspan="3">{{hoder.lxryx}}</td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">许可变更事项概述</td>
        <td colspan="3" align="left">
         {{hoder.xksxbggs}}
       </td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">登记事项变更概述</td>
        <td colspan="3" align="left">
         {{hoder.djsxbggs}}
       </td>
      </tr>
    </tbody>
  </table>
   </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { FormSchema, useForm, BasicForm } from '/@/components/Form'
import { JUploadModal } from '/@/components/Form/src/jeecg/components/JUpload'
import { propTypes } from '/@/utils/propTypes';
import { PageWrapper } from '/@/components/Page';
import { formatToDate } from '/@/utils/dateUtil';
import { useRoute } from 'vue-router';
import { queryById } from '../EntrustedProcessing.api';
import { downloadByUrl } from '/@/utils/file/download';
import DrugsJinwaiAddressList from '../DrugsJinwaiAddressList.vue'
import { getAppEnvConfig } from '/@/utils/env';
export default defineComponent({
  components:{PageWrapper,JUploadModal,DrugsJinwaiAddressList,BasicForm},
  setup() {
       const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
       const route = useRoute();
       const uploadModalValue = ref('')
       const Info = ref({});
       const hoder = ref({});     
       const eid = computed(() => {
       return Info.value.id;
    });
      const Data = ref({ data: {} });
      const id = ref(route.query?.id);  
      queryById({ id: id.value }).then((res) => {
      Info.value = res.data;
      hoder.value = res.holderInfo;
    }).catch(() => {
      console.log(arguments);
    });
    return {
      id,
      Info,
      hoder,
      eid,
      formatToDate,
      uploadModalValue,
    };
  }
});
</script>
<style>
#components-table-demo-size h4 {
  margin-bottom: 16px;
}
</style>
