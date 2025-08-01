<template>
  <PageWrapper :title="年度报告" class="title-center" :contentStyle="{padding: '0 16px'}" contentBackground>
  <div class="text-black font-900 text-left my-4" style="font-size:120%">品种基本信息</div>    
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
        <td class="text-blue font-600 text-right">药品批准文号</td>
        <td>{{Info.drugApproveNo}}</td>
        <td class="text-blue font-600 text-right">药品名称</td>
        <td>{{Info.drugName}}</td>
      </tr>
     <tr>
        <td class="text-blue font-600 text-right">执行标准</td>
        <td colspan="3">{{Info.zxbz}}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">年度内是否生产</td>
        <td>{{Info.isProduct  && filterDictTextByCache('SFBZ-1',Info.isProduct ) || Info.isProduct}}</td>
        <td class="text-blue font-600 text-right">生产批次（批）</td>
        <td>{{Info.jkpc}}</td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">处方</td>
        <td colspan="3">{{Info.cf}}</td>
      </tr>
    </tbody>
  </table>
  </table>
  <div class="text-black font-900 text-left my-4" style="font-size:120%">生产地址信息</div>
  <wpzAddressInfoList></wpzAddressInfoList>
   <RiskManagementList></RiskManagementList>
     <b style="color:red">
   备注：<br>
1.以生产品种为单位填写，如同一品种分别执行不同标准，也应分别填写。<br>
2.生产地址列，应当如实填写该品种生产地址，并具体到生产车间和生产线；如同一品种在多个场地生产，应罗列所有生产地址；如同一品种分多环节多场地生产，如净制、切制、炮炙等，应填写所有生产地址，并明确各生产环节。
 </b>
  <div class="text-black font-900 text-left my-4" style="font-size:120%">生产销售情况</div>
  <wpzSaleInfoList></wpzSaleInfoList>
       <b style="color:red">
   备注：<br>
1.以生产品种为单位填写，如同一品种分别执行不同标准，也应分别填写。<br>
2.境内销量和出口销量列以千克（Kg）重量单位填写所有生产地址总的境内销量及出口销量。
 </b>
   <div class="text-black font-900 text-left my-4" style="font-size:120%">上市后研究及变更管理情况</div>
   <wpzResearchManageList></wpzResearchManageList>
          <b style="color:red">
   备注：<br>
1.中药饮片生产企业应当依法开展原料用中药材质量审核评估，评估内容应当包括下项目：主要的中药材生产企业或者供应商、种子种源鉴定、产地（具体到行政村）、种植养殖或者采集等情况（如种植年限、养殖月龄年龄或者野生采集的生长期）、加工情况（如产地加工、趁鲜切制是否符合相关要求等）、质量检验检测情况（含重金属、农药残留、真菌毒素等外源性有害物质检验监测），年度内采购量（千克（Kg））等。<br>
2.原料用中药材质量审核评估综述以中药饮片生产企业为单位，每年应当提交不少于生产品种数的10%，5年后应达到生产品种数的80%以上。<br>
3.炮制/生产工艺变更验证综述按实际情况填写，如年度内未发生变更，则可不提交。
 </b>
   </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { FormSchema, useForm, BasicForm } from '/@/components/Form'
import { JUploadModal } from '/@/components/Form/src/jeecg/components/JUpload'
import { propTypes } from '/@/utils/propTypes';
import { PageWrapper } from '/@/components/Page';
import { formatToDate } from '/@/utils/dateUtil';
import { filterDictTextByCache } from '/@/utils/dict/JDictSelectUtil';
import { useRoute } from 'vue-router';
import { queryById } from '/@/views/ypsczhjg/ndbg/report/DrugsBasicInfo.api';
import  wpzAddressInfoList from '/@/views/ypsczhjg/ndbg/address/wpzAddressInfoList.vue'
import  wpzSaleInfoList  from '/@/views/ypsczhjg/ndbg/sale/wpzSaleInfoList.vue'
import  wpzResearchManageList  from '/@/views/ypsczhjg/ndbg/sale/wpzResearchManageList.vue'
import { downloadByUrl } from '/@/utils/file/download';
import { getAppEnvConfig } from '/@/utils/env';
export default defineComponent({
  components:{PageWrapper,JUploadModal ,wpzAddressInfoList,wpzSaleInfoList, wpzResearchManageList,BasicForm},
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
      Info.value = res;
      hoder.value = res.holderInfo;
    }).catch(() => {
      console.log(arguments);
    });
    return {
      id,
      Info,
      hoder,
      formatToDate,
      filterDictTextByCache,
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
