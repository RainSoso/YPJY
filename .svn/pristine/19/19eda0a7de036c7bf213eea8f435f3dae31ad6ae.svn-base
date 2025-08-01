<template>
  <div ref="bodyEl" class="md:flex md:flex-wrap enter-y ml-4 mt-4 jgyw-jczf">
    <!-- <div class="md:w-2/4 pb-4 pr-4">
      <a-select  ref="select" v-model:value="selectValueYear" style="width: 50%" @focus="focus" @change="handleChangeYear">
        <a-select-option v-for="(item, index) in yearOptions" :value="item">{{item}}</a-select-option>
      </a-select>
    </div> -->
    
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="案件来源分类" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <a-select allowClear="true" ref="select" v-model:value="selectValueYear" style="width: 15%" @focus="focus" @change="handleChangeYear">
          <a-select-option v-for="(item, index) in yearOptions" :value="item">{{item}}</a-select-option>
        </a-select>
        <div ref="ajlyChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="行政处罚类别分类" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="cfjgChartEl" :style="{ height: '230px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="违法行为数量分布情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="fbqkChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="案件数据大全" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="ajChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="被处罚企业处罚次数排行榜" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <qyrank :list="toplist" :year="selectValueYear" style="width: 600px; margin: 0 auto" :xmlx="xmlx"></qyrank>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="违法行为分析" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <qyrank :list="wfxwlist" :year="selectValueYear" style="width: 600px; margin: 0 auto" :xmlx="wfxw"></qyrank>
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
import qyrank from './qyrank.vue';
import Tools from '/@/utils/tools';

export default defineComponent({
  name: 'jgyw-jczf-chart',
  components: { CountTo, qyrank },
  setup() {
    const go = useGo();
    const loading = ref(true);
    const bodyEl = ref<ElRef>(null);
    const selectValueYear = ref();
    const currentYear1 = new Date().getFullYear();
    const yearOptions = ref([
      currentYear1,      
      currentYear1 - 1,  
      currentYear1 - 2
    ]);
    const [openLoading, closeLoading] = useLoading({
      target: bodyEl,
      props: {
        tip: '加载中...',
        absolute: true,
      },
    });
    const currentYear = ref(Tools.getCurrentYear());
    const xmlx = ref('jczf');
    const wfxw = ref('wfxw');
    const toplist = ref([]);
    const wfxwlist = ref([]);
    const ajChartEl = ref<ElRef>(null),
      ajlyChartEl = ref<ElRef>(null),
      cfjgChartEl = ref<ElRef>(null),
      //cfhjChartEl = ref<ElRef>(null),
      fbqkChartEl = ref<ElRef>(null);

    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };

    const { setOptions: setOptionsajChartEl } = useECharts(ajChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsajlyChar } = useECharts(ajlyChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptioncfjgChart } = useECharts(cfjgChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsfbqkChart } = useECharts(fbqkChartEl as Ref<HTMLDivElement>);
    //const { setOptions: setOptionscfhjChart } = useECharts(cfhjChartEl as Ref<HTMLDivElement>);

    function loadData(params: any = { year: currentYear.value }, isFirst = false) {
      openLoading();
      params = {year_ : selectValueYear.value};
      debugger
      defHttp.get({ url: '/yw/zfcf/ajjbxx/jczfIndex_ypjy', params: params }).then((res) => {
        toplist.value = res.cfqytop;
        wfxwlist.value = res.wfxw;
        setOptionsajChartEl({
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
              //go('/yw/syzf/' + params.name.slice(0, 4) + '/' + '0' + ',' + (''));
            } else if (params.name == "重大案件") {
              //go('/yw/syzf/' + params.name.slice(0, 4) + '/' + '1' + ',' + (''));
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
            // go({ path: '/jgyw/jczf', query: { tj: 'Y', ajly: params.data.code } });

          });
        });

        setOptioncfjgChart({
          tooltip: { trigger: 'item' },
          series: [{
            name: '处罚结果分类', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
            label: { formatter: '{b} {c} 项' },
            data: (res.cfjg || []).filter((item) => {
              return item.code
            }),
            animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
              return Math.random() * 400;
            }
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            //go({ path: '/jgyw/jczf', query: { tj: 'Y', lx: params.data.code } });

          });
        })

        // setOptionscfhjChart({
        //   tooltip: { trigger: 'item' },
        //   series: [{
        //     name: '违法环节分类', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
        //     label: { formatter: '{b} {c} 项' },
        //     data: (res.wfhj || []).filter((item) => {
        //       return item.code
        //     }),
        //     animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
        //       return Math.random() * 400;
        //     }
        //   }]
        // }, true, (res) => {
        //   res.on('click', function (params) {
        //     go({ path: '/jgyw/jczf', query: { tj: 'Y', wfhj: params.data.code } });

        //   });
        // })

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
            go({ path: '/jgyw/jyjczf', query: { tj: 'Y', xzqhdm: params.data.code,year:selectValueYear.value } });

          });
        })


        closeLoading();
        loading.value = false
      });
    }
    function handleChangeYear() {
      debugger
      loadData(null, true);
    }
    loadData(null, true);

    return {
      selectValueYear,handleChangeYear,currentYear1,yearOptions, bodyEl, loading, ajChartEl, ajlyChartEl, cfjgChartEl, fbqkChartEl, qyrank, xmlx, toplist, wfxwlist, wfxw, loadData

    };
  }
});
</script>

<style lang="less"></style>