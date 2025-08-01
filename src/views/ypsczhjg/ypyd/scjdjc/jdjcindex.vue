<template>
  <div ref="bodyEl" class="md:flex md:flex-wrap enter-y ml-4 mt-4 jgyw-jdjc">
    <div class="title">
      <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
        <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
      </a-select>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="检查覆盖率" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="jdjcChartEl" :style="{ height: '200px', margin: '-1rem' }">
        </div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="检查完成率(%)" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="cfjgChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="工作量排名" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <jobrank :list="rankList" title="工作量(检查次数)排行榜" style="width: 600px; margin: 0 auto" :xmlx="'rcjg'"></jobrank>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="高风险事项" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <jobrank :list="qxList" :year="currentYear.toString()" title="高风险事项(缺陷依据)排行榜" style="width: 600px; margin: 0 auto"
          :xmlx="'qxyj'"></jobrank>
      </a-card>
    </div>
  </div>
</template>
    
<script lang="ts">
import { defineComponent, ref, computed, Ref, h } from 'vue';
import { useLoading } from '/@/components/Loading';
import { CountTo } from '/@/components/CountTo/index';
import { useECharts } from '/@/hooks/web/useECharts';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { getTextByCode } from '/@/utils/area/areaDataUtil';
import Tools from '/@/utils/tools';
import jobrank from '/@/views/ypsczhjg/jgyw/jczf/qyrank.vue'
export default defineComponent({
  name: 'jgyw-jdjc-chart',
  components: { CountTo, jobrank },
  setup() {
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
    const rankList = ref([]);
    const qxList = ref([]);
    const jdjcChartEl = ref<ElRef>(null),
      ajlyChartEl = ref<ElRef>(null),
      cfjgChartEl = ref<ElRef>(null),
      fbqkChartEl = ref<ElRef>(null);

    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };

    const { setOptions: setOptionsajdjcChart } = useECharts(jdjcChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsajlyChar } = useECharts(ajlyChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptioncfjgChart } = useECharts(cfjgChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsfbqkChart } = useECharts(fbqkChartEl as Ref<HTMLDivElement>);

    function loadData(params: any = { year: currentYear.value }, isFirst = false) {
      openLoading();

      defHttp.get({ url: '/yw/rcjg/jgjg/rcjgIndex', params: params }).then((res) => {
        rankList.value = res.jobnumtop;
        qxList.value = res.qxtop;
        setOptionsajdjcChart({
          tooltip: { trigger: 'item' },
          title: [{
            text: '— 检查覆盖率 —', textAlign: 'center', left: '25%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.jdjcmap?.wcs * 100.0 / res.jdjcmap.qyzs) + '%', textAlign: 'center', left: '24.66%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }]
          , series: [{
            type: 'pie', name: '完成检查企业', radius: ['30%', '50%'], center: ['25%', '42%'], label: { formatter: '{b} {c}' }
            , data: [{ name: '未完成总数', value: res.jdjcmap?.qyzs - res.jdjcmap?.wcs }, { name: '完成数', value: res.jdjcmap?.wcs }]
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.name == '完成数') {
              go({ path: '/yqyd/ypsc', query: { year: currentYear.value, xzqhdm: 420000, isYj: 1 } });
            } else {
              go({ path: '/yqyd/ypsc', query: { year: currentYear.value, xzqhdm: 420000, isYj: 11 } });
            }
          });
        });

        setOptionsajlyChar({
          tooltip: { trigger: 'item' },
          series: [{
            name: '案件来源分类', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
            label: { formatter: '{b} {c} 项' },
            data: (res.ajly || []).filter((item) => {
              return item.code != 'X'
            }),
            animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
              return Math.random() * 400;
            }
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            go({ path: '/jgyw/jczf', query: { tj: 'Y', ajly: params.data.code } });

          });
        });

        setOptioncfjgChart({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
          xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: getAreaName(res.wcldata?.xzqhdm) },
          yAxis: { type: 'value' },
          series: [
          {
            name: '完成率', stack: '企业数', type: 'bar', barMinHeight: 1, barWidth: 20, data:calculatePercentage(res.wcldata?.scqyYj,res.wcldata?.scqy) ,
          }
          ]
        }, true, (res) => {
          res.on('click', function (params) {

          });
        })

        setOptionsfbqkChart({
          tooltip: { trigger: 'item' },
          series: [{
            name: '案件地市分布情况', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
            label: { formatter: '{b} {c} 例' },
            data: (res.fbqk || []).filter((item) => {
              return item.code
            }),
            animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
              return Math.random() * 400;
            }
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            go({ path: '/jgyw/jczf', query: { tj: 'Y', xzqhdm: params.data.code } });

          });
        })

        closeLoading();
        loading.value = false
      });
    }

    function getAreaName(textArray) {
      const areaNames = [];
      textArray.forEach(text => {
        const areaName = text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|州|土家族苗族自治州)$/g, '分局');
        areaNames.push(areaName);
      });
      return areaNames;
    }

    function  calculatePercentage(arr1, arr2) {
    // 创建一个新数组用于存储百分比
    const percentageArray = [];

    // 遍历第一个数组，计算百分比并存入新数组
    for (let i = 0; i < arr1.length; i++) {
      const percentage = ((arr1[i] / arr2[i]) * 100).toFixed(2);
      percentageArray.push(percentage);
    }

    return percentageArray;
  }

    loadData(null, true);

    return {
      bodyEl, loading, jdjcChartEl, ajlyChartEl, cfjgChartEl, fbqkChartEl, rankList, qxList, currentYear, yearArray, loadData

    };
  }
});
</script>
    
<style lang="less">
.title {
  display: block;
  width: 100%;
  box-sizing: border-box;
}
</style>
    