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
          <td class="text-blue font-600 text-right">注册地址/住所</td>
          <td>{{ Info.zcdz }}</td>
          <td class="text-blue font-600 text-right">生产地址</td>
          <td>{{ Info.scdz }}</td>
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
  </PageWrapper>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { getDictText, getDictItemsByValue } from '/@/utils/dict/JDictSelectUtil';
import { useRoute } from 'vue-router';
import { useTabs } from '/@/hooks/web/useTabs';
import { PageWrapper } from '/@/components/Page';
import { list, queryJbxx, queryById } from './TJcQyJbxx.api';
import smf from './smf.vue';
import xzsp from './xzsp.vue';
import building from './../ypyd/building.vue';
import rcjg from '/@/views/ypsczhjg/yw/rcjg/rcjg.vue';
import ypcj from '/@/views/ypsczhjg/yw/ypcyjl/ypcj.vue';
import zfcfList from '/@/views/ypsczhjg/yw/zfcf/zfcfList.vue';
// import ndbg from '/@/views/ypsczhjg/jc/ndbg.vue';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import xyxx from '/@/views/ypsczhjg/jc/xyxx.vue';
import blfy from '/@/views/ypsczhjg/jc/blfy.vue';
import fxcjg from '/@/views/ypsczhjg/jc/fxcjg.vue';
import pzList from '/@/views/ypsczhjg/ypyd/detail/pzList.vue';
import ndbg from '/@/views/ypsczhjg/ndbg/report/ReportNbInfoList.vue';
import MCategory from '/@/components/Custom/MCategory.vue';
import YwQySczkLogList from '/@/views/ypsczhjg/yw/qysczklog/YwQySczkLogList.vue';
import ylypzList from '/@/views/ypsczhjg/ypyd/detail/ylypzList.vue';
import zypfkl from '/@/views/ypsczhjg/jc/pz/zypfklList.vue';
import Tools from '/@/utils/tools';
import viewlist from '/@/views/ypsczhjg/smf/jbxx/smfViewList.vue';
import ywFxyjQyList from '/@/views/ypsczhjg/yw/fxyj/YwFxyjQyList.vue';

export default defineComponent({
  name: 'yqyd-ypsc-TJcQyJbxxList-@qymc-@qyid',
  components: { PageWrapper, smf, xzsp, rcjg, building, ypcj, zfcfList, ndbg, xyxx, blfy, fxcjg, pzList, MCategory, YwQySczkLogList,ylypzList,zypfkl
    ,viewlist, ywFxyjQyList},
  setup() {
    const route = useRoute();
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
        title: '药品生产场地管理文件(SMF)',
        component: Tools.isThirdTesting() ? 'viewlist' : 'smf',
        props: { shxydm: Shxydm.value, QyJbxx: Info.value }
      })
      array.push({
        title: '年度报告（' + (Data.value.ndbgCount || 0) + '）',
        component: 'ndbg',
        props: { shxydm: Shxydm.value }
      })
      array.push({
        title: (route.query?.isCyr == 'true' ? '持有' : '生产') + '药品批准文号' + '（' + (Data.value.yppzCount || 0) + '）',
        component: 'pzList',
        props: { Ypzcscjy: { shxydm: Shxydm.value }, forceTags: route.query?.forceTags || '', isCyr: route.query?.isCyr == 'true', year: route.query?.year || '' }
      })
      if(Data.value.ylypzCount>0){
        array.push({
          title: '原辅包品种' + '（' + (Data.value.ylypzCount || 0) + '）',
          component: 'ylypzList',
          props: { shxydm:  Shxydm.value }
        })
      }
      if(Data.value.zypfklCount>0){
        array.push({
          title: '中药配方颗粒' + '（' + (Data.value.zypfklCount || 0) + '）',
          component: 'zypfkl',
          props: { shxydm:  Shxydm.value }
        })
      }
      array.push({
        title: '行政许可',
        component: 'xzsp',
        props: { shxydm: Shxydm.value }
      })
      array.push({
        title: '监督检查（' + (Data.value.rcjgCount || 0) + '）',
        component: 'rcjg',
        props: { shxydm: Shxydm.value }
      })
      array.push({
        title: '非现场监管',
        component: 'fxcjg'
      })
      array.push({
        title: '药品抽检（' + (Data.value.cjyCount || 0) + '）',
        component: 'ypcj',
        props: { QyJbxx: Info.value }
      })
      array.push({
        title: '稽查执法（' + (Data.value.zfcfCount || 0) + '）',
        component: 'zfcfList',
        props: { shxydm: Shxydm.value }
      })
      array.push({
        title: '不良反应监测',
        component: 'blfy',
        props: { shxydm: Shxydm.value }
      })
      array.push({
        title: '信用评级',
        component: Tools.isThirdTesting() ? 'ywFxyjQyList' : 'building',
        props: { shxydm: Shxydm.value }
      })
      array.push({
        title: '停复产记录',
        component: 'YwQySczkLogList',
        props: { shxydm: Shxydm.value }
      })
      return array;
    });

    function getAreaName(text) {
      return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|土家族苗族自治州)$/g, '分局');
    }
    return {
      qyid,
      tabs,
      Info,
      qymc,
      getDictText,
      getAreaName,
      getDictItemsByValue
    };
  }
});
</script>
