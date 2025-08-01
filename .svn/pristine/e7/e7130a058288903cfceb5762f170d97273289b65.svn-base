<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="查看" @ok="handleSubmit" width="1200">
      <table class="my-table">
        <colgroup>
        <col style="width:18%" />
       <col />
       <col style="width:15%" />
       <col />
     </colgroup>
     <tbody v-if="FormData.zsbh">
      <tr>
        <td class="text-blue font-600 text-right">证书编号</td>
        <td>{{ FormData.zsbh }}</td>
        <td class="text-blue font-600 text-right">企业名称</td>
        <td>{{ FormData.qymc }}</td>
       </tr>
       <tr>
        <td class="text-blue font-600 text-right">统一社会信用代码</td>
        <td>{{ FormData.shxydm }}</td>
        <td class="text-blue font-600 text-right">注册地址</td>
        <td>{{ FormData.zcdz }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产地址和生产范围</td>
        <td colspan="3">
          {{ FormData.scfw }}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产地址和生产范围副本</td>
        <td class="my-undefined" colspan="3">
          {{ FormData.scfwFb }}
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">法定代表人</td>
        <td>{{ FormData.fddbr }} </td>
        <td class="text-blue font-600 text-right">企业负责人</td>
        <td>{{ FormData.qyfzr }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">质量负责人</td>
        <td>{{ FormData.zlsqr }} </td>
        <td class="text-blue font-600 text-right">质量受权人</td>
        <td>{{ FormData.zlsqr }} </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">生产负责人</td>
        <td>{{ FormData.scfzr }} </td>
        <td class="text-blue font-600 text-right">分类码</td>
        <td>{{ FormData.fl }} </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">发证日期</td>
        <td>{{ FormData.fzrq }} </td>
        <td class="text-blue font-600 text-right">有效截止日期</td>
        <td>{{ FormData.yxqz }}</td>
      </tr>
       <tr>
        <td class="text-blue font-600 text-right">监督检查机构</td>
        <td>{{ FormData.rcjgjgmc }} </td>
        <td class="text-blue font-600 text-right">发证机关</td>
        <td>{{ FormData.fzjg }}</td>
       </tr>
       <tr>
        <td class="text-blue font-600 text-right">签发人</td>
        <td class="my-undefined" colspan="3">{{ FormData.qfr }}</td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">自行生产</td>
        <td colspan="3">
          <table class="my-table">
            <tr>
              <td class="text- font-600 text-center" width="50px"> 序号</td>
              <td class="text- font-600 text-center">生产地址 </td>
              <td class="text- font-600 text-center">车间 </td>
              <td class="text- font-600 text-center">生产线 </td>
              <td class="text- font-600 text-center" width="150px">生产范围</td>
            </tr>
            <tbody>
              <tr align="center" v-for="(item, idx) in Data.zcList" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td>{{ item.addrdetail }}</td>
                <td>{{ item.workshop }}</td>
                <td>{{ item.preparation }}</td>
                <td>{{ item.productionscope }}</td>
              </tr>
              <tr v-if="!Data.zcList || 1 > Data.zcList.length">
                <td colspan="5" align="center">暂无</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">委托生产</td>
        <td colspan="3">
          <div style="overflow:auto;">
            <table class="my-table">
              <tr>
                <td class="text- font-600 text-center" width="50px"> 序号</td>
                <td class="text- font-600 text-center" width="13%">受托企业 </td>
                <td class="text- font-600 text-center" width="10%">生产地址 </td>
                <td class="text- font-600 text-center" width="10%">车间 </td>
                <td class="text- font-600 text-center" width="10%">生产线 </td>
                <td class="text- font-600 text-center" width="8%">剂型 </td>
                <td class="text- font-600 text-center" width="4%">类别</td>
                <td class="text- font-600 text-center" width="10%">药品通用名 </td>
                <td class="text- font-600 text-center" width="9%">药品批准文号 </td>
                <td class="text- font-600 text-center" width="90px">规格</td>
                <td class="text- font-600 text-center" width="8%">委托有效期 </td>
              </tr>
              <tr v-for="(item, idx) in Data.wtList" :key="idx">
                <td class="text-center">{{ idx + 1 }}</td>
                <td class="text-center">{{ item.refcompname }}</td>
                <td class="text-center">{{ item.refcompaddr }}</td>
                <td class="text-center">{{ item.workshop }}</td>
                <td class="text-center">{{ item.preparation }}</td>
                <td class="text-center">{{ item.drugdose }}</td>
                <td class="text-center" v-if="item.drugtype == '2'">非原料药</td>
                <td class="text-center" v-else-if="item.drugtype == '3'">暂无品种信息</td>
                <td v-else></td>
                <td class="text-center">{{ item.drugname }}</td>
                <td class="text-center">{{ item.regnumb }}</td>
                <td class="text-center">{{ item.spec }}</td>
                <td class="text-center">{{ formatToDate1(item.entrustvalidate) }}</td>
              </tr>
              <tr v-if="!Data.wtList || 1 > Data.wtList.length">
                <td colspan="11" align="center">暂无</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">受托生产</td>
        <td colspan="3">
          <div style="overflow:auto;">
            <table class="my-table">
              <tr>
                <td class="text- font-600 text-center" width="50px"> 序号</td>
                <td class="text- font-600 text-center" width="12%">委托企业 </td>
                <td class="text- font-600 text-center" width="10%">注册地址 </td>
                <td class="text- font-600 text-center" width="10%">生产地址 </td>
                <td class="text- font-600 text-center" width="8%">车间 </td>
                <td class="text- font-600 text-center" width="10%">生产线 </td>
                <td class="text- font-600 text-center" width="6%">剂型 </td>
                <td class="text- font-600 text-center" width="4%">类别</td>
                <td class="text- font-600 text-center" width="10%">药品通用名 </td>
                <td class="text- font-600 text-center" width="9%">药品批准文号 </td>
                <td class="text- font-600 text-center" width="4%">规格</td>
                <td class="text- font-600 text-center" width="8%">委托有效期 </td>
              </tr>
              <tr v-for="(item, idx) in Data.stList" :key="idx">
                <td class="text-center">{{ idx + 1 }}</td>
                <td class="text-center">{{ item.refcompname }}</td>
                <td class="text-center">{{ item.refcompaddr }}</td>
                <td class="text-center">{{ item.addrdetail }}</td>
                <td class="text-center">{{ item.workshop }}</td>
                <td class="text-center">{{ item.preparation }}</td>
                <td class="text-center">{{ item.drugdose }}</td>
                <td class="text-center" v-if="item.drugtype == '2'">非原料药</td>
                <td class="text-center" v-else-if="item.drugtype == '3'">暂无品种信息</td>
                <td v-else></td>
                <td class="text-center">{{ item.drugname }}</td>
                <td class="text-center">{{ item.regnumb }}</td>
                <td class="text-center">{{ item.spec }}</td>
                <td class="text-center">{{ formatToDate1(item.entrustvalidate) }}</td>
              </tr>
              <tr v-if="!Data.stList || 1 > Data.stList.length">
                <td colspan="12" align="center">暂无</td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
      <tr>
        <td class="text-blue font-600 text-right">通过境外药品GMP认证（检查）情况</td>
        <td colspan="3">
          <table class="my-table">
            <tr>
              <td class="text- font-600 text-center" width="50px"> 序号</td>
              <td class="text- font-600 text-center" width="12%">认证（检查）名称 </td>
              <td class="text- font-600 text-center" width="15%">认证（检查）范围 </td>
              <td class="text- font-600 text-center" width="15%">通过认证（检查）时间 </td>
              <td class="text- font-600 text-center" width="15%">认证（检查）机构名称</td>
              <td class="text- font-600 text-center" width="15%">国家（地区、组织）名称 </td>
              <td class="text- font-600 text-center" width="12%">涉及品种名称 </td>
              <td class="text- font-600 text-center" width="10%">备注</td>
            </tr>
            <tr v-for="(item, idx) in Data.gmpList" :key="idx">
              <td class="text-center">{{ idx + 1 }}</td>
              <td class="text-center">{{ item.authname }}</td>
              <td class="text-center">{{ item.authrange }}</td>
              <td class="text-center">{{ item.passauthdate }}</td>
              <td class="text-center">{{ item.authorg }}</td>
              <td class="text-center">{{ item.countryname }}</td>
              <td class="text-center">{{ item.varietyname }}</td>
              <td class="text-center">{{ item.remark }}</td>
            </tr>
            <tr v-if="!Data.gmpList || 1 > Data.gmpList.length">
              <td colspan="8" align="center">暂无</td>
            </tr>
          </table>
        </td>
        </tr>
      </tbody> 
      </table>
     
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { formatToDate } from '/@/utils/dateUtil';
import { queryYpScXkZ } from '/@/views/ypsczhjg/jc/TJcZsYpscXk.api';

const formatToDate1 = formatToDate;
const FormData: Recordable = ref({});
const Data = ref({});
const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    queryYpScXkZ({ id: data }).then((res) => {
        FormData.value = res.data || {};
        Data.value = res || {};
     });
   setModalProps({ title: '查看', confirmLoading: false, width: 1200,minHeight:800, footer: null });
});

function handleSubmit() {
  closeModal();
}
</script>