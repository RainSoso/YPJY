<template>
  <div ref="bodyEl" class="md:flex md:flex-wrap enter-y ml-4 mt-4 jgyw-jczf">
    <div class="md:w-1/5 pb-5 pr-5">
      <a-card title="监督检查" style="height: 100%" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <!-- <div ref="jdjc" :style="{ height: '270px', margin: '-1rem' }"></div> -->
        <a-select  ref="select" v-model:value="selectValue" style="width: 50%" @focus="focus" @change="handleChange">
          <a-select-option value="all">全部</a-select-option>
          <a-select-option value="11">批发</a-select-option>
          <a-select-option value="18">连锁总部</a-select-option>
        </a-select>
        <a-select allowClear="true"  ref="select" v-model:value="selectValueYear" style="width: 50%" @focus="focus" @change="handleChangeYear">
          <a-select-option v-for="(item, index) in yearOptions" :value="item">{{item}}</a-select-option>
        </a-select>
        <div style="{ height: '270px', margin: '-1rem' }">
          <div style="margin-left: 30px;margin-top: 25px"><span class="top_icon top_jia"></span>&nbsp&nbsp检查户数<span
              style="color:#6d72c4">{{ jchsj }}</span>家</div>
          <div style="margin-left: 30px;margin-top: 25px"><span class="top_icon top_jchc"></span>&nbsp&nbsp检查户次<span
              style="color:#6d72c4">{{ jchc }}</span>次</div>
          <div style="margin-left: 30px;margin-top: 25px"><span class="top_icon top_jgfgl"></span>&nbsp&nbsp监管覆盖率<span
              style="color:#6d72c4">{{ a }}%</span></div>
          <div style="margin-left: 30px;margin-top: 25px"><span class="top_icon top_jghgl"></span>&nbsp&nbsp检查合格率<span
              style="color:#6d72c4">{{ b }}%</span></div>
        </div>
      </a-card>
    </div>
    <div class="md:w-2/5 pb-5 pr-5">
      <a-card title="监督年度结果统计" style="height: 100%" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="jdjc" :style="{ height: '270px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-2/5 pb-5 pr-5">
      <a-card title="检查结果分类" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div ref="jcjgfl" :style="{ height: '270px', margin: '-1rem' }"></div>
      </a-card>
    </div>
    <div class="md:w-3/5 pb-4 pr-4">
      <a-card title="检查情况统计" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <div style="display: flex; flex-direction:columnl;">
          <div ref="jcxtj" :style="{ height: '470px', width: '50%', margin: '-1rem' }"> </div>
          <div ref="zxjcxtj" :style="{ height: '470px', width: '50%', margin: '-1rem' }"> </div>
        </div>
      </a-card>
    </div>
    <div class="md:w-2/5 pb-4 pr-4">
      <a-card title="被监管不合格次数排行榜" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <qyrank :list="toplist" :year="selectValueYear" style="width: 100%; margin: 0 auto" :xmlx="xmlx"></qyrank>
      </a-card>
    </div>
    <div class=" pb-4 pr-4">
      <a-card title="专项检查监管高风险事项" :loading="loading" :bodyStyle="{ padding: '1rem' }">
        <table class="my-table mb-2">
          <tr>
            <td colspan="1" class="text-black font-600">检查事项</td>
            <td class="text-black font-600" colspan="2">检查内容</td>
            <td style="width: 227px;" class="text-black font-600" colspan="1">检查次数</td>
          </tr>
          <tr v-for="(item, index) in jggfxs">
            <!---->
            
            <td class="text-blue font-600 text-right">{{ item.title }}</td>
            <td colspan="3">
              <table class="my-table mb-2">
                <!-- <tr v-if="index === 0">
                  <td class="text-black" colspan="3">检查内容</td>
                  <td class="text-black" colspan="1">检查次数</td>
                </tr> -->
                <tr v-for="(item1, index) in item.jcnrs">
                  <td colspan="3">{{ item1.jcnr }}</td>
                  <td>{{ item1.num }}件</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
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
  //components: { CountTo, qyrank },
  components: { CountTo, qyrank },
  setup() {
    const jchsj = ref(0), jchc = ref(0), a = ref(0), b = ref(0);
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
    const jdjc = ref<ElRef>(null);//监督检查  柱状体
    const jcjgfl = ref<ElRef>(null);
    const jcxtj = ref<ElRef>(null);//检查项统计
    const zxjcxtj = ref<ElRef>(null);//专项检查统计
    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };
    const selectValue = ref('all');

    const activeKey = ref('1');
    const { setOptions: setOptionsJdjc } = useECharts(jdjc as Ref<HTMLDivElement>);
    const { setOptions: setOptionsJcjgfl } = useECharts(jcjgfl as Ref<HTMLDivElement>);
    const { setOptions: setOptionsJcxtj } = useECharts(jcxtj as Ref<HTMLDivElement>);
    const { setOptions: setOptionsZxjcxtj } = useECharts(zxjcxtj as Ref<HTMLDivElement>);
    
    const currentYear1 = new Date().getFullYear();
    const yearOptions = ref([
      currentYear1,      
      currentYear1 - 1,  
      currentYear1 - 2
    ]);
    const selectValueYear = ref();
    //监管高风险事项
    const jggfxs = ref([]);
    function functionJggfxsx(type) {
      openLoading();
      var params = { type: selectValue.value,year: selectValueYear.value };
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/getJggfxsx', params: params }).then((res) => {
        jggfxs.value = res;
      });
      closeLoading();
      loading.value = false
    };

    function jcjgflFunction(type) {
      var params = { type: type }
      openLoading();
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/jcjgfb', params: params }).then((res) => {
        setOptionsJcjgfl({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 100, bottom: 10, left: 20, right: 30 },
          legend: {
            // data: ['2022', '2023','2024'],
            data: [res.key0[0], res.key1[0], res.key2[0]],
            left: 'right'
          },
          radar: {
            // shape: 'circle',
            indicator: [
              { name: '基本符合规定' },
              { name: '立即整改' },
              { name: '限期整改' },
              { name: '现场处罚' },
              { name: '拟立案处理' }
            ],

            radius: 100,
            axisName: {
              color: 'rgb(227, 240, 255)',
              backgroundColor: '#666',
              borderRadius: 10,
              padding: [1, 1]
            },
            triggerEvent: true,
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: [res.key0[1], res.key0[2], res.key0[3], res.key0[4], res.key0[5]],
                  name: res.key0[0],
                  // name: '2024',
                  // value: [100,200,500,300,50],
                  label: {
                    show: true,
                    formatter: function (params: any) {
                      return params.value as string + '次';
                    }
                  },
                  areaStyle: {
                    color: 'rgba(255, 228, 52, 0.6)'
                  }
                },
                {
                  value: [res.key1[1], res.key1[2], res.key1[3], res.key1[4], res.key1[5]],
                  name: res.key1[0],
                  // value: [100,200,500,300,50],
                  // name: '2023', 

                  label: {
                    show: true,
                    formatter: function (params: any) {
                      return params.value as string + '次';
                    }
                  },
                  areaStyle: {
                    color: '#DA70D6'
                  }
                },
                {
                  value: [res.key2[1], res.key2[2], res.key2[3], res.key2[4], res.key2[5]],
                  name: res.key2[0],
                  // value: [100,200,500,300,50],
                  // name: '2022', 
                  label: {
                    show: true,
                    formatter: function (params: any) {
                      return params.value as string + '次';
                    }
                  },
                  areaStyle: {
                    color: '#00FFFF'
                  }
                }
              ]
            }
          ]
        }, true, (res) => {
          res.on('click', function (params) {
            var a = params.event.topTarget.__dimIdx;
            var nd = params.name;
            var param = { zslx: type ,nd : nd,jcjl: a+1}
            go({ path: '/rcjg/jcbgglTz', query: param });
          });
        });
      });
      closeLoading();
      loading.value = false
    }
    function getHgAndBheByNd(type) {
      openLoading();
      var params = { type: type }
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/getHgAndBheByNd', params: params }).then((res) => {
        setOptionsJdjc({
          tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
          xAxis: {
            type: 'category', axisLabel: { rotate: 30 },
            data: res.nd
          },
          yAxis: { type: 'value' },
          series: [{
            name: '合格', stack: '数量', type: 'bar', barWidth: 20,
            data: res.hg,
          }, {
            name: '不合格', stack: '数量', type: 'bar', barWidth: 20,
            data: res.bhg,
          }]
        });
      });
      closeLoading();
      loading.value = false
    }

    function jcxtjFunction(type) {
      openLoading();
      var params = { type: selectValue.value,year: selectValueYear.value };
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/getJcxmtj', params: params }).then((res) => {
        setOptionsJcxtj({
          title: {
            text: '年度检查计划完成情况',
            triggerEvent: true,
            top: '5%',
            left: 'center',
            textStyle: {
              fontfamily: 'Source Han Sans CN',
              fontsize: '20px',
              fontweight: '300',
              lineheight: '24px',
              textalign: 'left',
              color: '#000000',
            },
          },
          tooltip: {
            trigger: 'item',
            //formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            top: '15%',
            itemGap: 15,
            textStyle: {
              fontfamily: 'Source Han Sans CN',
              fontsize: '18px',
              fontweight: '400',
              lineheight: '24px',
              textalign: 'left',
              color: '#000000',
            },
            formatter: function (name) {
              switch (name) {
                case '检查完成率':
                  return name + res.jcwclv  + '%';
                case '检查覆盖率':
                  return name + res.jcfglv  + '%';
                case '年度任务数':
                  return name + res.ndjcpc;
                case '年度完成数':
                  return name + res.ndyjc;
                default:
                  return name;
              }
            }
          },
          series: [
            {
              name: '百分比',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ["50%", "60%"],
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              data: [
                { value: res.jcwclv , name: '检查完成率' },
                { value: res.jcfglv , name: '检查覆盖率', selected: true },
                // { value: 100, name: '检查完成率' },
                // { value: 200, name: '检查覆盖率',selected: true  },
                //{ value: 679, name: 'c', selected: true }
              ],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%'
              },
            },
            {
              name: '统计',
              type: 'pie',
              radius: ['45%', '60%'],
              center: ["50%", "60%"],
              labelLine: {
                length: 30
              },
              label: {
                show: false,
                position: 'center'
              },
              data: [
                { value: res.ndjcpc, name: '年度任务数' },
                { value: res.ndyjc, name: '年度完成数' },
              ]
            }
          ]
        }, true, (res) => {
          res.on('click', function (params) {
            var param = {};
            if (params.componentType === 'title') {
               go({ path: '/jcjh/jhwcqk', query: param });
            }
           
           
          });
        });
      });
    }
    function zxjcxtjFunction(type) {
      openLoading();
      var params = { type: selectValue.value,year: selectValueYear.value };
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/getJcxmtj', params: params }).then((res) => {
        setOptionsZxjcxtj({
          title: {
            text: '专项检查计划完成情况',
            triggerEvent: true,
            top: '5%',
            left: 'center',
            textStyle: {
              fontfamily: 'Source Han Sans CN',
              fontsize: '20px',
              fontweight: '300',
              lineheight: '24px',
              textalign: 'left',
              color: '#000000',
            },
          },
          tooltip: {
            trigger: 'item',
            //formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            top: '15%',
            itemGap: 15,
            textStyle: {
              fontfamily: 'Source Han Sans CN',
              fontsize: '18px',
              fontweight: '400',
              lineheight: '24px',
              textalign: 'left',
              color: '#000000',
            },
            formatter: function (name) {
              switch (name) {
                case '检查完成率':
                  return name + res.zxjcwclv + '%';
                case '检查覆盖率':
                  return name + res.zxjcfgl + '%';
                case '专项任务数':
                  return name + res.zxjcpc;
                case '专项完成数':
                  return name + res.zxyjc;
                default:
                  return name;
              }
            }
          },
          series: [
            {
              name: '百分比',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],
              center: ["50%", "60%"],
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              data: [
                { value: res.zxjcwclv, name: '检查完成率' },
                { value: res.zxjcfgl , name: '检查覆盖率', selected: true },
                // { value: 100, name: '检查完成率' },
                // { value: 200, name: '检查覆盖率',selected: true  },
                //{ value: 679, name: 'c', selected: true }
              ],
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%'
              },
            },
            {
              name: '统计',
              type: 'pie',
              radius: ['45%', '60%'],
              center: ["50%", "60%"],
              labelLine: {
                length: 30
              },
              label: {
                show: false,
                position: 'center'
              },
              data: [
                { value: res.zxjcpc, name: '专项任务数' },
                { value: res.zxyjc, name: '专项完成数' },
              ]
            }
          ]
        }, true, (res) => {
          res.on('click', function (params) {
            var param = {};
            if (params.componentType === 'title') {
               go({ path: '/jcjh/zxjcqktj', query: param });
            }
          });
        });
      });
    }
    //监管次数前10
    function getJgcsbhgFunction(type,year) {
      var params = { type: selectValue.value,year: selectValueYear.value };
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/getJgcsbhg', params: params }).then((res) => {
        toplist.value = res;
      });
    }
    function getRcjgTjFunc(type) {
      var params = { type: selectValue.value,year: selectValueYear.value };
      defHttp.get({ url: '/qyda.rcjgjbxx/rcjgjbxx/getRcjgTj', params: params }).then((res) => {
        jchsj.value = res.jchsj;
        jchc.value = res.jchc;
        a.value = res.a;
        b.value = res.b;
      });
    }

    //重新加载数据
    function handleChange(v) {
      getHgAndBheByNd(v);
      jcjgflFunction(v);
      jcxtjFunction(v);
      zxjcxtjFunction(v);
      getJgcsbhgFunction(v);
      getRcjgTjFunc(v);
      functionJggfxsx(v);
      closeLoading();
      loading.value = false
    }
    function handleChangeYear(v) {
      getRcjgTjFunc();
      getJgcsbhgFunction();
      zxjcxtjFunction();
      jcxtjFunction();
      functionJggfxsx();
    }
    getHgAndBheByNd('all');
    jcjgflFunction('all');
    jcxtjFunction('all');
    zxjcxtjFunction('all');
    getJgcsbhgFunction('all');
    getRcjgTjFunc('all');
    functionJggfxsx('all');
    return {
      bodyEl, loading, handleChange, ajChartEl, selectValue, ajlyChartEl, cfjgChartEl, fbqkChartEl, cfhjChartEl, qyrank, jdjc, getHgAndBheByNd, zxjcxtj, jcxtj, jcxtjFunction, zxjcxtjFunction, jcjgflFunction, jcjgfl, xmlx, toplist, getJgcsbhgFunction
      , jchsj, jchc, a, b, getRcjgTjFunc, functionJggfxsx, jggfxs,yearOptions,selectValueYear,handleChangeYear
    };
  }
});
</script>

<style lang="less">
.top_icon {
  width: 20px;
  height: 20px;
  // margin-top: 16px;
  background-repeat: no-repeat;
  background-size: cover;
  // margin-left: 30px;margin-top: 8px;
  display: inline-block;
}

.top_jia {
  background-image: url(/@/assets/images/jia.png);
}

.top_jghgl {
  background-image: url(/@/assets/images/jghgl.png);
}

.top_jgfgl {
  background-image: url(/@/assets/images/jgfgl.png);
}

.top_jchc {
  background-image: url(/@/assets/images/jchc.png);
}
</style>