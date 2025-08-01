<template>
  <div ref="bodyEl" class="md:flex md:flex-wrap enter-y ml-4 mt-4 jgyw-jdjc">
    <div class="md:w-4/4 pb-4 pr-4">
      <a-card :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="cjqkChartEl" :style="{ height: '300px', margin: '-1rem' }">
        </div>
        <template #title>
          药品监督抽检情况
          <a-select v-model:value="currentYear" @change="() => loadData()" class="float-right">
            <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
          </a-select>
        </template>
      </a-card>
    </div>
    <div class="md:w-1/3 pb-4 pr-4">
      <a-card title="不符合标准规定项目情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="bfhxmChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-1/3 pb-4 pr-4">
      <a-card title="药品经营企业抽验覆盖率" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="cjfgChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <!-- <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="药品类别分类质量情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="yplbflEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div> -->
    <div class="md:w-1/3 pb-4 pr-4">
      <a-card title="抽验不合格率较高品种情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="bhglflEl" :style="{ height: '200px', margin: '-1rem' }"></div>
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

export default defineComponent({
  name: 'jgyw-cjy-chart',
  components: { CountTo },
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
    const cjqkChartEl = ref<ElRef>(null),
      bfhxmChartEl = ref<ElRef>(null),
      cjfgChartEl = ref<ElRef>(null),
      bhglflEl = ref<ElRef>(null);
    // yplbflEl = ref<ElRef>(null);

    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };

    const { setOptions: setOptionsacjqkChart } = useECharts(cjqkChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsbfhxmChart } = useECharts(bfhxmChartEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionscjfgChart } = useECharts(cjfgChartEl as Ref<HTMLDivElement>);
    //const { setOptions: setOptionsyplbflChart } = useECharts(yplbflEl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsbhglflElChart } = useECharts(bhglflEl as Ref<HTMLDivElement>);

    function cyjIndex_ypjy1(params) {
      defHttp.get({ url: '/yw/cjy/ypcyjl/cyjIndex_ypjy1', params: params }).then((res) => {
        setOptionsacjqkChart({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
          xAxis: {
            type: 'category', axisLabel: { rotate: 30 }, data: res.cjqk?.city, axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: { type: 'value' },
          series: [{
            name: '抽检合格', stack: '案件数量', type: 'bar', barMinHeight: 1, barWidth: 20, data: res.cjqk?.hgs,
          }, {
            name: '抽检不合格', stack: '案件数量', type: 'bar', barMinHeight: 1, barWidth: 20, data: res.cjqk?.bhgs,
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            var sfhg = params.seriesName;
            var sfhg_ = sfhg == '抽检合格' ? '1' : '2';
            var xzqhname = textCode1(params.name);
            var year = currentYear.value;
            go({ path: '/jgyw/jyypcj', query: { jyjg: sfhg_, bcydwssqx: xzqhname, year: year } });
            // go({ path: '/ypyd/gcyppz', query: {wfhj: params.seriesName =='抽检合格'?'1':'2',xzqhdm:textCode(params.name)}});
          });
        });
      })
    }
    function cyjIndex_ypjy2(params) {
      defHttp.get({ url: '/yw/cjy/ypcyjl/cyjIndex_ypjy2', params: params }).then((res) => {
        setOptionsbfhxmChart({
          tooltip: { trigger: 'item' },
          series: [{
            name: '不符合标准规定项目情况', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
            label: { formatter: '{b} {c} 项' },
            data: (res.bfhgdxm || []).filter((item) => {
              return item.code != 'X'
            }),
            animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
              return Math.random() * 400;
            }
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            //go({ path: '/jgyw/jyypcj', query: { jyjg: '2', xmdl: params.data.code } });

          });
        })
      });

    }

    function cyjIndex_ypjy3(params) {
      defHttp.get({ url: '/yw/cjy/ypcyjl/cyjIndex_ypjy3', params: params }).then((res) => {
        setOptionscjfgChart({
          tooltip: { trigger: 'item' },
          title: [{
            text: '— 覆盖率 —', textAlign: 'center', left: '50%', bottom: '5%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }, {
            text: numberFormat(res.ypjyqycys * 100.0 / res.ypjyqyzs) + '%', textAlign: 'center', left: '49.66%', top: '36%', textStyle: { fontSize: 14, fontWeight: 'normal' }
          }]
          , series: [{
            type: 'pie', name: '完成率', radius: ['30%', '50%'], center: ['50%', '42%'], label: { formatter: '{b} {c}' }
            , data: [{ name: '未完成抽检', value: res.ypjyqyzs - res.ypjyqycys }, { name: '完成抽检', value: res.ypjyqycys }]
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            if (params.name == '未完成抽检') {
              //go({ path: '/ypyd/gcyppz', query: {tj:'Y', wfhj: '4' }})
            } else if (params.name == '完成抽检') {
              // go({ path: '/ypyd/gcyppz', query: {tj:'Y', wfhj: '3' }})
            }
          });
        })

      });
    }

    // function cyjIndex_ypjy4(params) {
    //   defHttp.get({ url: '/yw/cjy/ypcyjl/cyjIndex_ypjy4', params: params }).then((res) => {
    //     setOptionsyplbflChart({
    //       tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
    //       xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: res.cjyData?.category },
    //       yAxis: { type: 'value' },
    //       series: [{
    //         name: '抽检合格', stack: '案件数量', type: 'bar', barMinHeight: 1, barWidth: 20, data: res.cjyData?.hg,
    //       }, {
    //         name: '抽检不合格', stack: '案件数量', type: 'bar', barMinHeight: 1, barWidth: 20, data: res.cjyData?.bhg,
    //       }]
    //     }, true, (res) => {
    //       res.on('click', function (params) {
    //         console.log(params)
    //         if (params.name == "化学药品") {
    //         } else if (params.name == "辅料") {
    //         } else if (params.name == "中药") {
    //         } else if (params.name == "生物制品") {
    //         }
    //       });
    //     })
    //   });
    // }

    function cyjIndex_ypjy5(params) {
      defHttp.get({ url: '/yw/cjy/ypcyjl/cyjIndex_ypjy5', params: params }).then((res) => {
        setOptionsbhglflElChart({
          tooltip: { trigger: 'item' },
          series: [{
            name: '不符合标准规定项目情况', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
            label: { formatter: '{b} {c} 项' },
            data: (res.bhgpzqk || []).filter((item) => {
              return item.code != 'X'
            }),
            animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
              return Math.random() * 400;
            }
          }]
        }, true, (res) => {
          res.on('click', function (params) {
            //   go({ path: '/ypyd/ypfl/'+params.data.code, query: {wfhj: '2'} });

          });
        })
      });
    }
    function loadData(params: any = { year: currentYear.value }, isFirst = false) {
      debugger
      openLoading();
      var params = {};
      params.year = currentYear.value;
      cyjIndex_ypjy1(params);
      cyjIndex_ypjy2(params);
      cyjIndex_ypjy3(params);
      // cyjIndex_ypjy4(params);
      cyjIndex_ypjy5(params);
      closeLoading();
      loading.value = false
    }

    function getAreaName(textArray) {
      const areaNames = [];
      textArray.forEach(text => {
        const areaName = text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|土家族苗族自治州)$/g, '分局');
        areaNames.push(areaName);
      });
      return areaNames;
    }

    function textCode1(text) {
      var code = '0';
      if (text == "神农架林区") {
        code = '429021';
      } else if ("天门市" == text) {
        code = '429006';
      } else if ("咸宁市" == text) {
        code = '421200';
      } else if ("武汉市" == text) {
        code = '420100';
      } else if ("潜江市" == text) {
        code = '429005';
      } else if ("黄冈市" == text) {
        code = '421100';
      } else if ("仙桃市" == text) {
        code = '429004';
      } else if ("荆州市" == text) {
        code = '421000';
      } else if ("恩施自治州" == text) {
        code = '422800';
      } else if ("宜昌市" == text) {
        code = '420500';
      } else if ("十堰市" == text) {
        code = '420300';
      } else if ("随州市" == text) {
        code = '421300';
      } else if ("黄石市" == text) {
        code = '420200';
      } else if ("孝感市" == text) {
        code = '420900';
      } else if ("荆门市" == text) {
        code = '420800';
      } else if ("鄂州市" == text) {
        code = '420700';
      } else if ("襄阳市" == text) {
        code = '420600';
      }
      return code;
    }


    function textCode(text) {
      let code = 0;
      if (text == "武汉分局") {
        code = 420100
      } else if ("黄石分局" == text) {
        code = 420200
      } else if ("十堰分局" == text) {
        code = 420300
      } else if ("宜昌分局" == text) {
        code = 420500
      } else if ("襄阳分局" == text) {
        code = 420600
      } else if ("鄂州分局" == text) {
        code = 420700
      } else if ("荆门分局" == text) {
        code = 420800
      } else if ("孝感分局" == text) {
        code = 420900
      } else if ("荆州分局" == text) {
        code = 421000
      } else if ("黄冈分局" == text) {
        code = 421100
      } else if ("咸宁分局" == text) {
        code = 421200
      } else if ("随州分局" == text) {
        code = 421300
      } else if ("恩施分局" == text) {
        code = 422800
      } else if ("汉江分局" == text) {
        code = 429000
      }
      return code;
    }
    loadData(null, true);

    return {
      bodyEl, loading, cjqkChartEl, bfhxmChartEl, cjfgChartEl, bhglflEl, currentYear, yearArray, loadData, cyjIndex_ypjy1, cyjIndex_ypjy2, cyjIndex_ypjy3, cyjIndex_ypjy5

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