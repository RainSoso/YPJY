<template>
  <PageWrapper :title="qymc" class="title-center" contentBackground>
    <template #headerContent>
      <table class="my-table">
        <colgroup>
          <col style="width:20%" />
          <col />
          <col style="width:20%" />
          <col />
        </colgroup>
        <tr>
          <td class="text-blue font-600 text-right">社会信用代码</td>
          <td>{{ Info.shxydm }}</td>
          <td class="text-blue font-600 text-right">企业类型</td>
          <td>{{ Info.qylx && getDictText('QYLXDM-1', Info.qylx) || Info.qylx }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">法定代表人</td>
          <td>{{ Info.fddbr }}</td>
          <td class="text-blue font-600 text-right">企业负责人</td>
          <td>{{ Info.fzrxm }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">联系人</td>
          <td>{{ Info.lxr }}</td>
          <td class="text-blue font-600 text-right">联系电话（座机）</td>
          <td>{{ Info.lxdh }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">联系电话（手机）</td>
          <td>{{ Info.sjhm }}</td>
          <td class="text-blue font-600 text-right">电子邮箱</td>
          <td>{{ Info.dzyx }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">经营地址</td>
          <td colspan="3">{{ Info.zcdz }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">仓库地址</td>
          <td colspan="3">{{ Info.ckdz }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">经营范围</td>
          <td colspan="3">{{ Info.jyfw }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">行政区划</td>
          <td colspan="3">{{ getAreaName(Info.xzqhdm) }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">企业标签</td>
          <td colspan="3">
            <MCategory :value="Info.tags" displayType="tags" itemClass="xl" />
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
    <!-- <jydzmap ref="jydzmapRef" :qyxx="Info"></jydzmap> -->
  </PageWrapper>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed } from 'vue';
import { getDictText, getDictItemsByValue } from '/@/utils/dict/JDictSelectUtil';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { PageWrapper } from '/@/components/Page';
import { list, queryJbxx, queryById } from './TJcQyJbxx.api';
//import smfList from './smfList.vue';
import smfList from '/@/views/ypjy/cdwj/cdwjJbxx/CdwjList.vue';
// import jydzmap from './JydzMap.vue'
import xzsp from './xzsp.vue';
import xyxx from '/@/views/ypjy/xyxx/TYwXyxxList.vue';
// import rcjg from '/@/views/ypsczhjg/yw/rcjg/rcjg.vue';
import rcjg from '/@/views/ypjy/rcjg/RcjgjbxxList.vue';

import ypcj from '/@/views/ypsczhjg/yw/ypcyjl/ypcj.vue';
import zfcfList from '/@/views/ypsczhjg/yw/zfcf/zfcfList.vue';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import blfy from '/@/views/ypsczhjg/jc/blfy.vue';
//import fxcjg from '/@/views/ypsczhjg/jc/fxcjg.vue';
import fxcjg from '/@/views/ypjy/fxcjg/FxcjgList.vue';

import MCategory from '/@/components/Custom/MCategory.vue';
import Tools from '/@/utils/tools';
import viewlist from '/@/views/ypsczhjg/smf/jbxx/smfViewList.vue';
import ywFxyjQyList from '/@/views/ypsczhjg/yw/fxyj/YwFxyjQyList.vue';

import xkzsList from '/@/views/ypjy/xkzs/XkzsList.vue';



const jydzmapRef = ref<any>();
const route = useRoute();
const show = ref(false);
const { setTitle } = useTabs();
const Info = ref({ qymc: '' });
const Data = ref({ data: {} });
const qyid = ref(route.params?.qyid);
const qymc = ref(route.params?.qymc);
queryJbxx({ id: qyid.value, forceTags: route.query?.forceTags || '', isCyr: route.query?.isCyr, year: route.query?.year || '' }).then((res) => {
  Info.value = res.data;
  Data.value = res;
}).catch(() => {
  console.log(arguments);
});
setTitle(`企业详情：${qymc.value}`);
const Shxydm = computed(() => {
  return Info.value.shxydm;
});
const tabs = computed(() => {
  var array = new Array();
  array.push({
    title: '药品经营场地管理文件(SMF)',
    //component: Tools.isThirdTesting() ? viewlist : smfList,
    component: smfList,
    props: { shxydm: Shxydm.value, QyJbxx: Info.value }
  })
  array.push({
    title: '行政许可（' + (Data.value.xzxkCount || 0) + '）',
    component: xkzsList,
    props: { shxydm: Shxydm.value }
  })
  array.push({
    title: '监督检查（' + (Data.value.rcjgCount || 0) + '）',
    component: rcjg,
    props: { shxydm: Shxydm.value }
  })
  array.push({
    title: '非现场监管（' + (Data.value.fxcjgCount || 0) + '）',
    component: fxcjg,
    props: { shxydm: Shxydm.value }
  })
  array.push({
    title: '药品抽检（' + (Data.value.cjyCount || 0) + '）',
    component: ypcj,
    props: { QyJbxx: Info.value }
  })
  array.push({
    title: '稽查执法（' + (Data.value.zfcfCount || 0) + '）',
    component: zfcfList,
    props: { shxydm: Shxydm.value }
  })
  array.push({
    title: '不良反应监测（' + (Data.value.blfyCount || 0) + '）',
    component: blfy,
    props: { shxydm: Shxydm.value }
  })
  array.push({
    title: '信用评级（' + (Data.value.xypjCount || 0) + '）',
    component: xyxx,
    props: { shxydm: Shxydm.value }
  })
  return array;
});

function getAreaName(text) {
  return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|土家族苗族自治州)$/g, '分局');
}
function goMap() {
  jydzmapRef.value.handelClick(Data.value);
}


</script>
