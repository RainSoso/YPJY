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
import { queryJbxx } from '../jc/TJcQyJbxx.api';
import building from './../ypyd/building.vue';
import rcjg from '/@/views/ypsczhjg/yw/rcjg/rcjg.vue';
import ypcj from '/@/views/ypsczhjg/yw/ypcyjl/ypcj.vue';
import zfcfList from '/@/views/ypsczhjg/yw/zfcf/zfcfList.vue';
import ndbg from '/@/views/ypsczhjg/jc/ndbg.vue';
import xyxx from '/@/views/ypsczhjg/jc/xyxx.vue';
import blfy from '/@/views/ypsczhjg/jc/blfy.vue';
import fxcjg from '/@/views/ypsczhjg/jc/fxcjg.vue';
import zjpzList from '/@/views/ypsczhjg/jc/pz/zjpzList.vue';
import ylzjxk from '/@/views/ypsczhjg/jc/zs/ylzjxk.vue';
import MCategory from '/@/components/Custom/MCategory.vue';

export default defineComponent({
  name: 'yqyd-yljgzjs-detail-@qymc-@qyid',
  components: { PageWrapper, rcjg, building, ypcj, zfcfList, ndbg, xyxx, blfy, fxcjg, zjpzList, ylzjxk },
  setup() {
    const route = useRoute();
    const { setTitle } = useTabs();
    const Info = ref({ qymc: '' });
    const Data = ref({ data: {} });
    const qyid = ref(route.params?.qyid);
    const qymc = ref(route.params?.qymc);


    queryJbxx({ id: qyid.value }).then((res) => {
      Info.value = res.data;
      Data.value = res;
    }).catch(() => {
      console.log(arguments);
    });



    setTitle(`企业详情：${qymc.value}`);

    const Shxydm = computed(() => {
      return Info.value.shxydm;
    });
    console.log(Shxydm.value)

    const tabs = computed(() => {
      return [{
        title: '制剂品种（' + (Data.value.zjpzCount || 0) + '）',
        component: 'zjpzList',
        props: { shxydm: route.params?.qyid }
      }, {
        title: '行政许可',
        component: 'ylzjxk',
        props: { shxydm: Shxydm.value }
      }, {
        title: '监督检查（' + (Data.value.rcjgCount || 0) + '）',
        component: 'rcjg',
        props: { shxydm: Shxydm.value }
      }, {
        title: '非现场监管',
        component: 'fxcjg'
      }, {
        title: '药品抽检（' + (Data.value.cjyCount || 0) + '）',
        component: 'ypcj',
        props: { QyJbxx: Info.value }
      }, {
        title: '稽查执法（' + (Data.value.zfcfCount || 0) + '）',
        component: 'zfcfList',
        props: { shxydm: Shxydm.value }
      }, {
        title: '不良反应监测（0）',
        component: 'blfy'
      }, {
        title: '信用评级',
        component: 'xyxx'
      }];
    });

    return {
      qyid,
      tabs,
      Info,
      qymc,
      getDictText,
      getDictItemsByValue
    };
  }
});
</script>
