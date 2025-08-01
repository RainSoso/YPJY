<template>
  <PageWrapper class="title-center" :contentStyle="{padding: '0 16px'}" contentBackground>
  <div class="text-black font-600 text-left my-5" style="font-size:120% ">品种基本信息({{dataDrugName}})</div>
 <DrugsGgInfoList :durgBasicInfoId="durgBasicInfoId"></DrugsGgInfoList>
 <b style="color:red">
   备注：<br>
  1. 若一个文号内有多个规格，应当按规格分别罗列。<br>
  2. 如果有商品名，则需填写商品名，没有则填“无”，下同。<br>
  3. 管理属性包括：国家基本药物、国家集采中选药品、通过一致性评价、短缺药品（国家短缺药品清单和国家临床必需易短缺药品重点监测清单所列药品）、儿童用药、OTC(非处方药)、特殊药品（麻醉药品、精神药品、医疗用毒性药品、放射性药品、药品类易制毒化学品）。<br>
  4. 对于进口产品，仅填写进口批次数量。<br>
 </b>
 <div class="text-black font-600 text-left my-5" style="font-size:120% ">生产地址信息</div>
 <ProductAddressInfoList :drugApproveNo="drugApproveNo" :durgsBasicInfoId="durgsBasicInfoId" :drugName="dataDrugName"></ProductAddressInfoList>
  <b style="color:red">
   备注：<br>
  1.若一个文号内有多个规格，应当按规格分别罗列。<br>
  2.一个品种有多个生产地址或多个受托生产企业的，应当分别填写；分包装产品应当填写分包装企业。<br>
  3.生产地址填写具体到生产车间、生产线。国内生产场地应当与药品生产许可证有关信息一致，国外生产场地应当与注册资料保持一致。
 </b>
 <div class="text-black font-600 text-left my-5" style="font-size:120% ">生产销售情况</div>
 <DurgsSaleInfoList :drugApproveNo="drugApproveNo" :durgBasicInfoId="durgBasicInfoId"></DurgsSaleInfoList>
   <b style="color:red">
   备注：<br>
   1.如产品销售涉及多个出口国，需分别填写每个出口国销售数量。<br>
   2.如果是境外药品上市许可持有人，仅填写在中国境内的进口数量与销售数量。<br>
   3.生产数量、销售数量分别为该品种上报年度内的所有生产地址所生产、销售的总数量；数量单位以“万支/万瓶/万片/万粒/万袋…”计。
 </b>
 <div class="text-black font-600 text-left my-5" style="font-size:120% ">上市后研究及变更管理情况</div>
 <MarketResearchManageList :durgBasicInfoId="durgBasicInfoId" :drugName="dataDrugName"></MarketResearchManageList>
    <b style="color:red">
   备注：<br>
   1.上述内容相关批件号、备案号信息，填报主体可通过药品业务应用系统（企业端）进行查询。<br>
   2.对变更的界定应当严格遵照《药品注册管理办法》《药品上市后变更管理办法（试行）》《已上市化学药品药学变更研究技术指导原则（试行）》《已上市中药药学变更研究技术指导原则（试行）》等要求。
 </b>
 <div class="text-black font-600 text-left my-5" style="font-size:120% ">风险管理情况</div>
 <RiskManagementList :durgBasicInfoId="durgBasicInfoId" :drugName="dataDrugName"></RiskManagementList>
     <b style="color:red">
   备注：<br>
   1.境外上市许可持有人，仅需填报在中国境内上市的相关情况。<br>
   2.其它安全隐患包括聚集性不良反应/事件、国家药品监督管理局发布的安全风险警示等。
 </b>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { FormSchema, useForm, BasicForm } from '/@/components/Form'
import { JUploadModal } from '/@/components/Form/src/jeecg/components/JUpload'
import { propTypes } from '/@/utils/propTypes';
import { PageWrapper } from '/@/components/Page';
import { queryById } from './ReportInfo.api';
import { formatToDate } from '/@/utils/dateUtil';
import { useRoute } from 'vue-router';
import DrugsGgInfoList from './DrugsGgInfoList.vue';
import ProductAddressInfoList   from '/@/views/ypsczhjg/ndbg/address/ProductAddressInfoList.vue'
import DurgsSaleInfoList from  '/@/views/ypsczhjg/ndbg/sale/DurgsSaleInfoList.vue'
import MarketResearchManageList  from '/@/views/ypsczhjg/ndbg/sale/MarketResearchManageList.vue'
import RiskManagementList   from '/@/views/ypsczhjg/ndbg/risk/RiskManagementList.vue'
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
export default defineComponent({
  components:{PageWrapper,JUploadModal,DrugsGgInfoList,ProductAddressInfoList,DurgsSaleInfoList,MarketResearchManageList,RiskManagementList,BasicForm},
  props:{
    durgBasicInfoId: propTypes.string.def(''),
    durgsBasicInfoId: propTypes.string.def(''),
    drugApproveNo: propTypes.string.def(''),
    drugName: propTypes.string.def('')
  },
  setup(props) {
       const { VITE_GLOB_DOMAIN_URL } = getAppEnvConfig();
       const route = useRoute();
       const uploadModalValue = ref('')
       const Info = ref({});
       const hoder = ref({});
       const Data = ref({ data: {} });
       const id = ref(route.query?.id);
       const dataDrugName = computed(() => {
        return !props.drugName ? route.query?.drugName + '' : props.drugName
       });

    //   queryById({ id: id.value }).then((res) => {
    //   Info.value = res.data;
    //   hoder.value = res.holderInfo;
    //   Data.value = res;
    // }).catch(() => {
    //   console.log(arguments);
    // });
    return {
      id,
      Info,
      dataDrugName,
      hoder,
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
