<template>
  <PageWrapper :title="Title" class="title-center">
    <template #extra>
      <!-- <a-button type="primary" danger> 禁用账号 </a-button>
      <a-button type="primary"> 修改密码 </a-button> -->
    </template>
    <template #headerContent>
      <table class="my-table">
        <colgroup>
          <col style="width:20%;" />
          <col />
          <col style="width:20%;" />
          <col />
        </colgroup>
        <tr>
          <td class="text-blue font-600 text-right">批准文号</td>
          <td>{{ Ypzcscjy.yppzwh }}</td>
          <td class="text-blue font-600 text-right">药品通用名</td>
          <td>{{ Ypzcscjy.yptymc }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">产品类别</td>
          <td>{{ Ypzcscjy.ypfl && getDictText('YPPZLX-1', Ypzcscjy.ypfl) || Ypzcscjy.ypfl }}</td>
          <td class="text-blue font-600 text-right">剂型</td>
          <td>{{ Ypzcscjy.jx }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">规格</td>
          <td>{{ Ypzcscjy.ypgg }}</td>
          <td class="text-blue font-600 text-right">批准日期</td>
          <td>{{ Ypzcscjy.pzrq && formatToDate(Ypzcscjy.pzrq) }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">药品上市许可持有人</td>
          <td class="my-undefined">{{ Ypzcscjy.cyrmc }}</td>
          <td class="text-blue font-600 text-right">药品上市许可持有人地址</td>
          <td class="my-undefined">{{ Ypzcscjy.cyrdz }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">生产企业</td>
          <td>{{ Ypzcscjy.ypscqymc }}</td>
          <td class="text-blue font-600 text-right">生产企业地址</td>
          <td>{{ Ypzcscjy.scdz }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">标签</td>
          <td colspan="3" class="my-undefined">
            <MCategory :value="Ypzcscjy.tags" displayType="tags" itemClass="xl" />
          </td>
        </tr>
      </table>
    </template>
    <template #footer>
      <a-tabs default-active-key="0" type="line">
        <template v-for="(item, idx) in tabs" :key="idx">
          <a-tab-pane :tab="item.title">
            <div style="padding-bottom:16px;">
              <component :is="item.component" v-if="item.component" v-bind="item.props" />
              <template v-else>{{ item.title }}[{{ idx }}]</template>
            </div>
          </a-tab-pane>
        </template>
      </a-tabs>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { PageWrapper } from '/@/components/Page';
import { formatToDate } from '/@/utils/dateUtil';
import { getDictText, getDictItemsByValue } from '/@/utils/dict/JDictSelectUtil';
import Tools from '/@/utils/tools';
import building from './../building.vue';
import jbxx from './jbxx.vue';
import pzList from './pzList.vue';
import qgpzList from '/@/views/ypsczhjg/jc/pz/components/JcPzYppzQgList.vue';
import zfcfList from '/@/views/ypsczhjg/yw/zfcf/zfcfList.vue';
import rcjg from '/@/views/ypsczhjg/yw/rcjg/rcjg.vue';
import ypcj from '/@/views/ypsczhjg/yw/ypcyjl/ypcj.vue';
import { queryById } from './../gcyppz/JcPzYpzcscjy.api';
import cfgy from '/@/views/ypsczhjg/ypyd/cfgy.vue';
import yppj from '/@/views/ypsczhjg/ypyd/yppj.vue';
import ypzs from '/@/views/ypsczhjg/ypyd/ypzs.vue';
import blfy from '/@/views/ypsczhjg/jc/blfy.vue';
import nbxx from '/@/views/ypsczhjg/ndbg/report/DrugsBasicDetails.vue';
import MCategory from '/@/components/Custom/MCategory.vue';
import nbpzviewList from '/@/views/ypsczhjg/ndbg/report/pzviewList.vue';
import ywFxyjPzList  from '/@/views/ypsczhjg/yw/fxyj/YwFxyjPzList.vue';

export default defineComponent({
  name: 'ypyd-detail-@code',
  components: { PageWrapper, building, jbxx, pzList, zfcfList, rcjg, ypcj, cfgy, yppj, ypzs, qgpzList, blfy, nbxx, MCategory,nbpzviewList,ywFxyjPzList },
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();
    const code = ref(route.params?.code);
    setTitle(`品种详情：${code.value}`);
    const Data = ref({ data: {} });
    const Ypzcscjy = ref({});
    const Title = computed(() => {
      return code.value + (Ypzcscjy.value.yptymc && (' - ' + Ypzcscjy.value.yptymc) || '');
    });
    const Shxydm = computed(() => {
      return Ypzcscjy.value.shxydm;
    });
    const CyrShxydm = computed(() => {
      return Ypzcscjy.value.cyrshxydm;
    });
    const Yppzwh = computed(() => {
      return Ypzcscjy.value.yppzwh;
    });
    const tabs = computed(() => {
      return [{
        title: '基本信息',
        component: 'jbxx',
        props: { Ypzcscjy: Ypzcscjy.value }
      }, {
        title: '年报信息',
        component: 'nbpzviewList',
        props: { data: Data.value.ndbgpzxx }
      }, {
        title: '处方工艺',
        component: 'cfgy',
        props: { Ypzcscjy: Ypzcscjy.value }
      }, {
        title: '同企业文号（' + (Data.value.tqywhCount || 0) + '）',
        component: 'pzList',
        props: { Ypzcscjy: Ypzcscjy.value, act: 'tqywh' }
      }, {
        title: '同通用名文号（' + (Data.value.ttymwhCount || 0) + '）',
        component: 'qgpzList',
        props: { yptymc: Ypzcscjy.value.yptymc, yppzwh: Ypzcscjy.value.yppzwh }
      }, {
        title: '监督检查（' + (Data.value.rcjgCount || 0) + '）',
        component: 'rcjg',
        props: { shxydm: Shxydm.value }
      }, {
        title: '持有人监督检查（' + (Data.value.rcjgcyrCount || 0) + '）',
        component: 'rcjg',
        props: { cyrshxydm: CyrShxydm.value }
      }, {
        title: '抽检信息（' + (Data.value.cjyCount || 0) + '）',
        component: 'ypcj',
        props: { shxydm: '', pzwh: Yppzwh.value }
      }, {
        title: '稽查执法（' + (Data.value.zfcfCount || 0) + '）',
        component: 'zfcfList',
        props: { shxydm: Shxydm.value }
      }, {
        title: '不良反应监测',
        component: 'blfy',
        props: { pzwh: Yppzwh.value }
      }, {
        title: '产品风险提示',
        component: Tools.isThirdTesting() ? 'ywFxyjPzList' : 'building',
        props: { pzwh: Yppzwh.value }
      }];
    });

    queryById({ id: code.value }).then((res) => {
      Data.value = res || {};
      Ypzcscjy.value = Data.value.data || {};
    });

    return {
      formatToDate,
      getDictText,
      getDictItemsByValue,
      code,
      Title,
      tabs,
      Ypzcscjy
    };
  }
});
</script>
