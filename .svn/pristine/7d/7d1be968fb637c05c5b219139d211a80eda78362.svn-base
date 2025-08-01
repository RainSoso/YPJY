<template>
  <div ref="bodyEl" class="md:flex md:flex-wrap enter-y ml-4 mt-4 zdjg-jcpz">
    <div class="md:w-3/3 md:flex">
      <div class="md:w-1/5 pr-4 pb-4" v-for="(item) in headerBlock">
        <a-card :loading="loading">
          <div class="flex items-center">
            <a-icon size="50" :color="item.color || '#4599FF'" :icon="item.icon" />
            <div class="pl-4">
              <div class="title">{{ item.name }}</div>
              <div class="number cursor-pointer">
                <template v-for="(val, idx) in item.value" :key="idx">
                  <span v-if="0 < idx" class="text-2xl px-2">/</span>
                  <CountTo :startVal="0" :endVal="val" separator="" class="text-2xl" @click="goFl(item.name)" />
                </template>
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div class="md:w-3/3 pr-4 pb-4 -z-2">
      <a-card :loading="loading" class="-z-2">
        <div class="border-10 border-r-7 border-white" style="margin:-24px;">
          <div class="m-6px">
            <a-select v-model:value="currentYear" @change="() => loadData()">
              <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
          </div>
        </div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="抽检验情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="cjyChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="监督检查情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="jdjcChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="在产情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="zcChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="稽查执法情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="jczfChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="不良反应检测预警" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="BlfyChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="风险处置情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="FxczChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick, Ref, h } from 'vue';
import { Tooltip, Button } from 'ant-design-vue';
import { useLoading } from '/@/components/Loading';
import { CountTo } from '/@/components/CountTo/index';
import { useECharts } from '/@/hooks/web/useECharts';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import { BasicTable } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { getDictItemsByValue } from '/@/utils/dict/JDictSelectUtil';
import { columnRender } from '/@/utils/dict/dictUtils';
import { propTypes } from '/@/utils/propTypes';
import Tools from '/@/utils/tools';

export default defineComponent({
  name: 'zdjg-jcpz-chart',
  components: { CountTo, BasicTable },
  props:{
     tagTitle: String,
     Tags: String,
  },
  setup(props) {
    const go = useGo();
    const loading = ref(true);
    const bodyEl = ref<ElRef>(null);
    const [openLoading, closeLoading] = useLoading({
      target: bodyEl,
      props: {
        tip: '加载中...',
        absolute: true,
      },
    });
    const currentYear = ref(Tools.getCurrentYear());
    const yearArray = computed(() => Tools.getYearArray(currentYear.value));
    const cjyChartEl = ref<ElRef>(null),
    jdjcChartEl = ref<ElRef>(null),
    zcChartEl = ref<ElRef>(null),
    jczfChartEl = ref<ElRef>(null),
    BlfyChartEl = ref<ElRef>(null),
    FxczChartEl = ref<ElRef>(null);
    const pzpath = ref('');
    const qypath = ref('');
    const tags = ref(props.Tags);
    const data = ref({}), headerBlock = ref([{
      name: '品种数量 / 批准文号', color: '#10b981',
      icon: 'ant-design:book-outlined',
      value: [0, 0]
    }, {
      name: '涉及企业', color: '#8b5cf6',
      icon: 'ant-design:hdd-outlined',
      value: [0]
    }, {
      name: '抽检验', color: '#0ea5e9',
      icon: 'ant-design:plus-circle-outlined',
      value: [0]
    }, {
      name: '监督检查', color: '#f59e0b',
      icon: 'ant-design:edit-outlined',
      value: [0]
    }, {
      name: '稽查执法', color: '#f43f5e',
      icon: 'ant-design:profile-outlined',
      value: [0]
    }]);
  
    if('A02A08' == tags.value){
       pzpath.value = '/zdjg/tsyp/tsypxx';
       qypath.value =  '/zdjg/tsyp/qyxx';
    }else if('A02A09A04' == tags.value){
       qypath.value = '/zdjg/wjzj';
       pzpath.value = '/zdjg/wjzjpz';
    } else if ('A02A04' == tags.value){
       qypath.value = '/zdjg/zyzj';
       pzpath.value = '/zdjg/zyzj/zjzjxx';
    }else if ('A02A09' == tags.value){
       qypath.value = '/zdjg/qtyp';
       pzpath.value = '/zdjg/qtyp/pzxx';
    }else {
       pzpath.value = '/zdjg/swzp/pzxx';
       qypath.value = '/zdjg/swzp';
     
    }
    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };
    function goFl(name) {
      if (name == headerBlock.value[0].name) {
          go({ path: pzpath.value, query: { year: currentYear.value,cyr:'Y' } });
      } else if (name == '涉及企业') {
          go({ path: qypath.value, query: { showTags: 'false', year: currentYear.value } });
      } else if (name == '抽检验') {
        go({ path: '/jgyw/ypcj', query: { year: currentYear.value, tags:tags.value} });
      } else if (name == '监督检查') {
        go({ path: '/jgyw/jdjc/jgjl', query: { year: currentYear.value,tags:tags.value } });
      } else if (name == '稽查执法') {
        go({ path: '/jgyw/jczf', query: { year: currentYear.value,tags:tags.value } });
      }

    }
    function getItemFromTree(array: [], value) {
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (item.value == value) {
          return item;
        } else if (value?.startsWith(item.value) && item.children) {
          return getItemFromTree(item.children, value);
        }
      }
    }

    const { setOptions: setOptionsCjyChart } = useECharts(cjyChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsJdjcChart } = useECharts(jdjcChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsZcChart } = useECharts(zcChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsJczfChart } = useECharts(jczfChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsBlfyChart } = useECharts(BlfyChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsFxczChart } = useECharts(FxczChartEl as Ref<HTMLDivElement>);
      
    function loadData(params: any = { year: currentYear.value,pzTags:tags.value }, isFirst = false) {
      openLoading();

      defHttp.get({ url: '/report/zdjg/jcpz', params:{year: currentYear.value,pzTags:tags.value} }).then((res) => {
        data.value = res;
        headerBlock.value[0].value = [res.jcpzsl, res.jcwhsl];
        headerBlock.value[1].value = [res.jcqysl];
        headerBlock.value[2].value = [res.cjyData?.cyCs];
        headerBlock.value[3].value = [res.jdjcData?.jdjcTotal];
        headerBlock.value[4].value = [res.jczfData?.jnTotal];
 
        setOptionsCjyChart({
          tooltip: { trigger: 'item' },
          title: [{
            text: '— 完成率 —', textAlign: 'center', left: '25%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.cjyData?.cyPz * 100.0 / res.jcwhsl) + '%', textAlign: 'center', left: '24.66%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: '— 合格率 —', textAlign: 'center', left: '70%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.cjyData?.cyPzHg * 100.0 / res.cjyData?.cyPz) + '%', textAlign: 'center', left: '69.33%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }]
          , series: [{
            type: 'pie', name: '完成率', radius: ['30%', '50%'], center: ['25%', '42%'], label: { formatter: '{b} {c}' }
            , data: [{ name: '未完成品种', value: res.jcwhsl - res.cjyData?.cyPz }, { name: '完成品种', value: res.cjyData?.cyPz }]
          }, {
            type: 'pie', name: '抽检合格率', radius: ['30%', '50%'], center: ['70%', '42%'], label: { formatter: '{b} {c}' }
            , data: [{ name: '不合格品种', value: res.cjyData?.cyPzBhg }, { name: '合格品种', value: res.cjyData?.cyPzHg }]
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.name == '完成品种') {
              go({ path: '/ypyd/cyyp/1', query: { showTags: 'false', year: currentYear.value,pzbq:tags.value,cyr:'Y' } })
            } else if (params.name == '未完成品种') {
              go({ path: '/ypyd/cyyp/2', query: { showTags: 'false', year: currentYear.value,pzbq:tags.value,cyr:'Y' } })
            } else if (params.name == '合格品种') {
              go({ path: '/ypyd/cyyp/3', query: { showTags: 'false', showJnCjqk: 'true', year: currentYear.value,pzbq:tags.value,cyr:'Y' } })
            } else if (params.name == '不合格品种') {
              go({ path: '/ypyd/cyyp/4', query: { showTags: 'false', showJnCjqk: 'true', year: currentYear.value,pzbq:tags.value,cyr:'Y' } })
            }
          });
        });

        setOptionsJdjcChart({
          tooltip: { trigger: 'item' },
          title: [{
            text: '— 覆盖率 —', textAlign: 'center', left: '25%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.jdjcData?.qyCount * 100.0 / res.jcqysl) + '%', textAlign: 'center', left: '24.66%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: '— 综合评定结论 —', textAlign: 'center', left: '70%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(0 != res.jdjcData?.qyCount ? res.jdjcData?.qyHg * 100.0 / res.jdjcData?.qyCount : 0) + '%', textAlign: 'center', left: '69.33%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }]
          , series: [{
            type: 'pie', name: '完成率', radius: ['30%', '50%'], center: ['25%', '42%'], label: { formatter: '{b} {c}' }
            , data: [{ name: '未完成企业', value: res.jcqysl - res.jdjcData?.qyCount }, { name: '已完成企业', value: res.jdjcData?.qyCount }]
          }, {
            type: 'pie', name: '合格率', radius: ['30%', '50%'], center: ['70%', '42%'], label: { formatter: '{b} {c}' }
            , data: [{ name: '不符合要求', value: res.jdjcData?.num03 }, { name: '基本符合要求', value: res.jdjcData?.num02 }, { name: '符合要求', value: res.jdjcData?.num01 }]
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.name == '已完成企业') {
              go({ path: qypath.value, query: { showTags: 'false', year: currentYear.value,jgqy:'1',pzbq:tags.value } })
            } else if (params.name == '未完成企业') {
              go({ path: qypath.value, query: { showTags: 'false', year: currentYear.value,jgqy:'2',pzbq:tags.value } })
            } else if (params.name == '不符合要求') {
              go({ path: qypath.value, query: { showTags: 'false', year: currentYear.value,jgqy:'03',pzbq:tags.value } })
            } else if (params.name == '基本符合要求') {
              go({ path: qypath.value, query: { showTags: 'false', year: currentYear.value,jgqy:'02',pzbq:tags.value } })
            } else if (params.name == '符合要求') {
              go({ path: qypath.value, query: { showTags: 'false', year: currentYear.value,jgqy:'01',pzbq:tags.value } })
            }
          });
        });

        setOptionsZcChart({
          tooltip: { trigger: 'item' },
          title: [{
            text: '— 在产率 —', textAlign: 'center', left: '25%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.zcPz * 100.0 / res.jcwhsl) + '%', textAlign: 'center', left: '24.66%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: '— 追溯率 —', textAlign: 'center', left: '70%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.zsPz * 100.0 / res.jcwhsl) + '%', textAlign: 'center', left: '69.33%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }]
          , series: [{
            type: 'pie', name: '在产率', radius: ['30%', '50%'], center: ['25%', '42%'], label: { formatter: '{b} {c}' }
            , color: ["#37A2DA", "#ffd85c", "#ff9f7f"]
            , data: [{ name: '未填报品种', value: res.jcwhsl - res.tcPz - res.zcPz }, { name: '停产品种', value: res.tcPz }, { name: '在产品种', value: res.zcPz }]
          }, {
            type: 'pie', name: '追溯率', radius: ['30%', '50%'], center: ['70%', '42%'], label: { formatter: '{b} {c}' }
            , color: ["#37A2DA", "#ffd85c", "#ff9f7f"]
            , data: [{ name: '不可追溯品种', value: res.jcwhsl - res.zsPz }, { name: '可追溯品种', value: res.zsPz }]
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.name == '在产品种') {
              go({ path: pzpath.value, query: { showTags: 'false', year: currentYear.value,sczk:'1',cyr:'Y' } })
            } else if (params.name == '停产品种') {
              go({ path: pzpath.value, query: { showTags: 'false', year: currentYear.value,sczk:'0',cyr:'Y' } })
            } else if (params.name == '未填报品种') {
              go({ path: pzpath.value, query: { showTags: 'false', year: currentYear.value,sczk:'9',cyr:'Y' } })
            } else if (params.name == '可追溯品种') {
              go({ path: pzpath.value, query: { showTags: 'false', year: currentYear.value,sfzs:'1',pzbq:tags.value,cyr:'Y'}});
            } else if (params.name == '不可追溯品种') {
              go({ path: pzpath.value, query: { showTags: 'false', year: currentYear.value,sfzs:'0',pzbq:tags.value,cyr:'Y'}});
            }
          });
        });

        setOptionsJczfChart({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
          xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: res.jczfData?.category },
          yAxis: { type: 'value' },
          series: [{
            name: '一般案件', stack: '案件数量', type: 'bar', barWidth: 20, data: res.jczfData?.ybAj,
          }, {
            name: '重大案件', stack: '案件数量', type: 'bar', barWidth: 20, data: res.jczfData?.zdAj,
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.seriesName == "一般案件") {
              go({ path: '/jgyw/jczf', query: {tags:tags.value,zdsj:'0', year:params.name.slice(0, 4)} });
            } else if (params.seriesName == "重大案件") {
              go({ path: '/jgyw/jczf', query: {tags:tags.value,zdsj:'1',year:params.name.slice(0, 4)} });
            }

          });
        });

        setOptionsBlfyChart({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
          xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: res.jczfData?.category },
          yAxis: { type: 'value' },
          series: [{
            name: '不良反应', stack: '品种数量', type: 'bar', barWidth: 20, data: res.blfyData?.jnTotal,
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.seriesName == "不良反应") {
              go({ path: '/fxyj/pz', query: {tags:tags.value,year:params.name.slice(0, 4)} });
            }
          });
        });

        setOptionsFxczChart({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
          xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: res.fxczData?.category },
          yAxis: { type: 'value' },
          series: [{
            name: '风险处置', stack: '风险数量', type: 'bar', barWidth: 20, data: res.fxczData?.fxTotal,
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.seriesName == "风险处置") {
              go({ path: '/xtcz/rwfb/CpEventList', query: {tags:tags.value,year:params.name.slice(0, 4)} });
            }
          });
        });

        closeLoading();
        loading.value = false
      });
    }

    loadData(null, true,tags.value);

    return {
      bodyEl, loading, cjyChartEl, jdjcChartEl, zcChartEl,FxczChartEl, jczfChartEl,BlfyChartEl, data, headerBlock, goFl
      , currentYear, yearArray, loadData
    };
  }
});
</script>

<style lang="less">
.zdjg-jcpz {

  .ant-card {
    .ant-card-head-wrapper {
      &::before {
        content: ' ';
        display: block;
        background-color: #1890FF;
        height: 18px;
        width: 6px;
        margin-right: 9px;
      }

      .ant-card-head-title {
        padding: 14px 0;
      }
    }
  }

  .my-table {
    tbody {
      tr {
        background-color: unset;

        td {
          position: relative;

          &:hover:before {
            content: ' ';
            position: absolute;
            left: 0;
            right: 0;
            top: -9999px;
            bottom: -9999px;
            background-color: rgba(224, 242, 254, 1);
            z-index: -1;
          }
        }
      }
    }
  }
}
</style>
