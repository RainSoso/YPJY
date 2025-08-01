<template>
  <div ref="bodyEl" class="md:flex md:flex-wrap enter-y ml-4 mt-4 jgyw-jczf">
    <div class="md:w-4/4 pb-4 pr-4">
      <a-card title="行政许可分布" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="xzxkfb" :style="{ height: '370px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <!-- <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="许可状态统计" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="xkzttj" :style="{ height: '510px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="即将到期证书" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <qyrank :list="toplist" style="width: 500px; margin: 0 auto" :xmlx="xmlx"></qyrank>
      </a-card>
    </div> -->
    <div class="md:w-4/4 pb-4 pr-4">
      <a-card title="近12月许可状态趋势" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="hefaBgZhux" :style="{ height: '410px', margin: '-1rem' }"></div>
      </a-card>
    </div>

    <!-- <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="案件地市分布情况" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="fbqkChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/4 pb-4 pr-4">
      <a-card title="案件数据大全" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="ajChartEl" :style="{ height: '200px', margin: '-1rem' }"></div>
      </a-card>
    </div> -->
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
  // components: { CountTo, },
  components: { CountTo, qyrank },
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
    const xmlx = ref('jdjc');
    const toplist = ref([]);
    const ajChartEl = ref<ElRef>(null),
      ajlyChartEl = ref<ElRef>(null),
      cfjgChartEl = ref<ElRef>(null),
      cfhjChartEl = ref<ElRef>(null),
      fbqkChartEl = ref<ElRef>(null);
    const xzxkfb = ref<ElRef>(null);//  柱状体
    const xkzttj = ref<ElRef>(null);//许可状态统计
    const jcxtj = ref<ElRef>(null);//检查项统计
    const hefaBgZhux = ref<ElRef>(null);//核发变更注销
    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };


    const { setOptions: setOptionsXzxkfb } = useECharts(xzxkfb as Ref<HTMLDivElement>);//行政许可分布

    const { setOptions: setOptionsHefaBgZhux } = useECharts(hefaBgZhux as Ref<HTMLDivElement>);//核发变更注销

    const { setOptions: setOptionsXkzttj } = useECharts(xkzttj as Ref<HTMLDivElement>);
    const { setOptions: setOptionsJcxtj } = useECharts(jcxtj as Ref<HTMLDivElement>);

    function setOptionsXzxkfbFunction() {
      openLoading();
      var params = {}
      defHttp.get({ url: '/ypjy.xzsp/xzsp/zttj1', params: params }).then((res) => {
        setOptionsXzxkfb({
          tooltip: { trigger: 'axis' },

          xAxis: {
            type: 'category', data: res.city,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
          yAxis: { type: 'value' },
          series: [{
            name: '药品经营批发', type: 'bar', data: res.cjqk?.ypjypfs,
          }, {
            name: '药品经营零售连锁总部', type: 'bar', data: res.cjqk?.lszbs,
          }]
        });
      });
      closeLoading();
      loading.value = false
    }
    //监管次数前10
    function getJgcsbhgFunction() {
      var params = {};
      defHttp.get({ url: '/ypjy.xzsp/xzsp/getJjgqTop', params: params }).then((res) => {
        debugger
        toplist.value = res;
      });
    }

    function xkzttjFunction() {
      openLoading();
      var params = {}
      defHttp.get({ url: '/ypjy.xzsp/xzsp/zttj2', params: params }).then((res) => {
        setOptionsXkzttj({
          title: {
            text: '',
            subtext: '',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '证书',
              type: 'pie',
              radius: '50%',
              data: [
                { value: res.m1, name: '有效' },
                { value: res.m2, name: '已注销' },
                { value: res.m3, name: '30天内过期' }

              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        closeLoading();
        loading.value = false
      });

    }
    //变更 合法 注销
    function hefaBgZhuxFunction() {
      openLoading();
      var params = {}
      defHttp.get({ url: '/ypjy.xzsp/xzsp/getXkywlx', params: params }).then((res) => {
        setOptionsHefaBgZhux({
          title: {
            //text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['核发', '换发', '变更', '注销']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,
            // data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            data: res.xAxis
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '核发',
              type: 'bar',
              // stack: 'Total',
              //data: ['10','15','16','17','18','19','20','21','22','23','24','25']
              data: res.hefaArr,
              emphasis: {
                focus: 'series'
              }
            },
            {
              name: '换发',
              type: 'line',
              // stack: 'Total',
              // data: ['101','115','126','127','118','191','201','211','212','123','241','251']
              data: res.huanfaArr,
              emphasis: {
                focus: 'series'
              }
            },
            {
              name: '变更',
              type: 'line',
              //stack: 'Total',
              //data: ['120','135','116','171','182','192','202','212','223','232','242','252']
              data: res.bgArr,
              emphasis: {
                focus: 'series'
              }
            },
            {
              name: '注销',
              type: 'line',
              //stack: 'Total',
              // data: ['130','145','156','127','185','192','203','221','212','223','234','245']
              data: res.zxArr,
              emphasis: {
                focus: 'series'
              }
            },

          ]
        });
      });
    }
    //loadData(null, true);
    setOptionsXzxkfbFunction();

    getJgcsbhgFunction();
    xkzttjFunction();
    hefaBgZhuxFunction();
    return {
      bodyEl, loading, ajChartEl, ajlyChartEl, cfjgChartEl, qyrank, fbqkChartEl, xzxkfb, xkzttj, xkzttjFunction, cfhjChartEl, jcxtj, xmlx, toplist, setOptionsXzxkfbFunction, getJgcsbhgFunction
      , hefaBgZhuxFunction, hefaBgZhux
    };
  }
});
</script>

<style lang="less"></style>