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
          <td>{{ Info.type == '01' ? '药品经营零售' : '连锁零售'   }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">法定代表人</td>
          <td>{{ Info.fddbr }}</td>
          <td class="text-blue font-600 text-right">企业负责人</td>
          <td>{{ Info.qyfzr }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">联系人</td>
          <td>{{ Info.fddbr }}</td>
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
          <td colspan="3" @click="goMap()">{{ Info.zcdz }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">仓库地址</td>
          <td colspan="3">{{ Info.ckdz }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">经营范围</td>
          <td colspan="3">{{ Info.fw }}</td>
        </tr>
        <tr>
          <td class="text-blue font-600 text-right">行政区划</td>
          <td colspan="3">{{ getAreaName(Info.xzqhdm) }}</td>
        </tr>
        <!-- <tr>
          <td class="text-blue font-600 text-right">企业标签</td>
          <td colspan="3">
            <MCategory :value="Info.tags" displayType="tags" itemClass="xl" />
          </td>
        </tr> -->
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
    <jydzmap ref="jydzmapRef" :qyxx="Info"></jydzmap>
  </PageWrapper>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed } from 'vue';
import { getDictText, getDictItemsByValue } from '/@/utils/dict/JDictSelectUtil';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { PageWrapper } from '/@/components/Page';
//import { list, queryJbxx, queryById } from './TJcQyJbxx.api';
import {queryByShxydm} from './Dtls.api';

import jydzmap from '/@/views/ypjy/cdwj/JydzMap.vue'
import building from './building.vue';

import { getTextByCode } from '/@/utils/area/areaDataUtil';
import MCategory from '/@/components/Custom/MCategory.vue';
import Tools from '/@/utils/tools';

import xkzsList from '/@/views/ypjy/xkzs/XkzsList.vue';



const jydzmapRef = ref<any>();
const route = useRoute();
const show = ref(false);
const { setTitle } = useTabs();
const Info = ref({ qymc: '' });
const Data = ref({ data: {} });
const qyid = ref(route.params?.qyid);
const qymc = ref(route.params?.qymc);
queryByShxydm({ shxydm: qyid.value }).then((res) => {
  debugger
  Info.value = res;
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
    title: '行政许可',
    component: xkzsList,
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
