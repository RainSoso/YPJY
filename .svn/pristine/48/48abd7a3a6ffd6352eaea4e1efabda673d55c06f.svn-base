<template>
  <div ref="bodyEl" class="md:flex enter-y m-4 my-index">
    <div class="md:w-1/3 md:pr-2">
      <Card :loading="loading" :bodyStyle="{ height: '245px', padding: '1rem' }">
        <template #title>
          药品生产企业分类
          <a-select v-model:value="currentYear" @change="() => loadReportData()" class="float-right">
            <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
          </a-select>
        </template>
        <div ref="ypqyfl" :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }"></div>
      </Card>
      <Card title="国产药品品种分类" :loading="loading" :bodyStyle="{ height: '150px', padding: '1rem' }">
        <div ref="yppzlx" :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }"></div>
      </Card>
      <Card title="药品上市许可分类" :loading="loading" :bodyStyle="{ height: '150px', padding: '1rem' }">
        <div ref="xkfl" :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }"></div>
      </Card>
      <Card title="监督检查" :loading="loading" :bodyStyle="{ height: '200px', padding: '1rem' }">
        <div ref="jdjc" :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }"></div>
      </Card>
      <Card title="稽查执法" :loading="loading" :bodyStyle="{ height: '245px', padding: '1rem' }">
        <div ref="jczf" :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }"></div>
      </Card>
    </div>
    <div class="md:w-2/3 md:pl-2 md:flex flex-col">
      <div class="md:flex card-block mb-4">
        <template v-for="(item, idx) in dataBlock" :key="idx">
          <div :class="['md:w-1/' + dataBlock.length, 'color' + (idx + 1), 0 < idx ? 'ml-4' : '']">
            <ul>
              <li>
                <div class="title">{{ item.name }}</div>
                <div class="number cursor-pointer">
                  <CountTo :startVal="0" :endVal="item.value" @click="goypscqy(item.name)" class="text-xl" />
                </div>
              </li>
              <li>
                <div class="title">品种数量 / 批准文号 / 在产</div>
                <div class="number cursor-pointer">
                  <CountTo :startVal="0" :endVal="item.pz" separator="" class="text-xl" />
                  <span class="text-xl px-2 cursor-pointer">/</span>
                  <CountTo :startVal="0" :endVal="item.pzwh" @click="goPzwh(item.pzwh, item.name)" separator=""
                    class="text-xl" />
                  <span class="text-xl px-2 cursor-pointer">/</span>
                  <CountTo :startVal="0" :endVal="item.zcwh" @click="gozcwh(item.zcwh, item.name, item.pzwh)"
                    separator="" class="text-xl" />
                </div>
              </li>
            </ul>
          </div>
        </template>
      </div>
      <Card title="工作提醒" :loading="loading" :bodyStyle="{ height: '110px', padding: '10px 24px' }">
        <div class="md:flex items-center dbtx">
          <div class="item">
            <div class="title ">集采品种监管</div>
            <div class="number cursor-pointer">
              <span>
                <CountTo :startVal="0" :endVal="jcpzsl" class="text-2xl" @click="gojcpz()" />
              </span>
              <!-- <span class="sup">+5</span> -->
            </div>
          </div>
          <div class="item">
            <div class="title">年度报告</div>
            <div class="number cursor-pointer">
              <span>
                <CountTo :startVal="0" :endVal="nbcount" class="text-2xl" @click="gondbg()" />
              </span>
              <!-- <span class="sub">未提交10</span>
              <span class="sup">+5</span> -->
            </div>
          </div>
          <div class="item">
            <div class="title">近三月新核发</div>
            <div class="number cursor-pointer">
              <span>
                <CountTo :startVal="0" :endVal="backData.xzxkNum1" class="text-2xl" @click="goXzsp('hf', '3M')" />
              </span>
            </div>
          </div>
          <div class="item">
            <div class="title">近三月变更</div>
            <div class="number cursor-pointer">
              <span>
                <CountTo :startVal="0" :endVal="backData.xzxkNum3" class="text-2xl" @click="goXzsp('bg', '3M')" />
              </span>
            </div>
          </div>
          <div class="item">
            <div class="title">即将过期</div>
            <div class="number cursor-pointer">
              <span>
                <CountTo :startVal="0" :endVal="ypsczJjgq" class="text-2xl" @click="gojjgqzs()" />
              </span>
            </div>
          </div>
        </div>
      </Card>
      <Card :loading="loading" class="flex-1 map" :bodyStyle="{ height: '100%', padding: '1rem' }">
        <div class="flex flex-col" style="height:100%;margin:-1rem;">
          <!-- <div class="p-4 md:flex">
            <div class="map-card md:w-1/4 md:mr-4" v-for="(item, idx) in mapCardData" :key="idx">
              <div class="icon" :class="'icon-' + (idx + 1)"></div>
              <div>
                <div class="title">{{ item.name }}</div>
                <div class="number">
                  <CountTo :startVal="0" :endVal="item.value||0" :duration="1000" class="text-2xl" />
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="show-tips">
            <b>{{ selectedCity.name }}</b><br>
            <table>
              <tbody>
                <tr>
                  <td class="pr-2">药品生产企业</td>
                  <td class="text-right">{{ selectedCity.ypscqy }}</td>
                </tr>
                <tr>
                  <td class="pr-2">医疗机构制剂单位</td>
                  <td class="text-right">{{ selectedCity.yljgzj }}</td>
                </tr>
                <tr>
                  <td class="pr-2">药品品种</td>
                  <td class="text-right">{{ selectedCity.yppz }}</td>
                </tr>
                <tr>
                  <td class="pr-2">医疗机构制剂数量</td>
                  <td class="text-right">{{ selectedCity.zjsl }}</td>
                </tr>
              </tbody>
            </table>
          </div> -->
          <div ref="mapChart" class="flex-1 map-container"></div>
        </div>
      </Card>
      <div class="md:flex mt-4 fxjc">
        <div class="md:w-3/5 cjy">
          <Card title="抽检验" :loading="loading" :bodyStyle="{ height: '245px', position: 'relative' }">
            <div ref="cjyChart" :style="{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }"></div>
          </Card>
        </div>
        <div class="md:w-2/5 ml-4">
          <Card title="风险监测" :loading="loading" :bodyStyle="{ height: '245px' }">
            <CardGrid>
              <span class="flex flex-col items-center">
                <span>检查不合格</span>
                <span class="text-md mt-2 text-red cursor-pointer" @click="gojcbhg()">{{ backData.jdjcData?.jcbhg || 0
                }}</span>
              </span>
            </CardGrid>
            <CardGrid>
              <span class="flex flex-col items-center">
                <span>处罚信息</span>
                <span class="text-md mt-2 text-red cursor-pointer" @click="gocfxx()">{{ backData.jczfData?.jnTotal || 0
                }}</span>
              </span>
            </CardGrid>
            <CardGrid>
              <span class="flex flex-col items-center">
                <span>抽检不合格</span>
                <span class="text-md mt-2 text-red cursor-pointer" @click="gocjbhg()">
                  {{ (backData.cjyData?.ypsc?.cyBhg + backData.cjyData?.yljgzj?.cyBhg) || 0 }}
                </span>
              </span>
            </CardGrid>
            <CardGrid>
              <span class="flex flex-col items-center">
                <span>投诉举报</span>
                <span class="text-md mt-2 text-red">0</span>
              </span>
            </CardGrid>
            <CardGrid class="!w-full flex items-center justify-around !p-0">
              <div class="flex flex-col items-center !left-1/4">
                <span>重点品种企业追溯情况</span>
                <span class="text-md mt-2 text-red">
                  <span class="cursor-pointer" @click="go({path: '/yqyd/ypsc', query: {forceTags: 'A02A08A03|A02A08A05|A02A08A06|A02A08A07|A02A05A03|A02A05A04|A02A09A03', xzqhdm: selectedCity.code, zszt: '1,2',year:currentYear}})" title="已追溯企业数">{{ backData.zsData?.qyZsQty || 0 }}</span>
                  /
                  <span class="cursor-pointer" @click="go({path: '/yqyd/ypsc', query: {forceTags: 'A02A08A03|A02A08A05|A02A08A06|A02A08A07|A02A05A03|A02A05A04|A02A09A03', xzqhdm: selectedCity.code,year:currentYear}})" title="应追溯企业数">{{ backData.zsData?.qyQty || 0 }}</span>
                </span>
              </div>
              <div class="flex flex-col items-center !left-3/4">
                <span>重点品种追溯情况</span>
                <span class="text-md mt-2 text-red">
                  <span class="cursor-pointer" @click="go({path: '/ypyd/gcyppz', query: {forceTags: 'A02A08A03|A02A08A05|A02A08A06|A02A08A07|A02A05A03|A02A05A04|A02A09A03', xzqhdm: selectedCity.code || '420000', zszt: '1,2', year:currentYear}})" title="已追溯品种数">{{ backData.zsData?.pzZsQty || 0 }}</span>
                  /
                  <span class="cursor-pointer" @click="go({path: '/ypyd/gcyppz', query: {forceTags: 'A02A08A03|A02A08A05|A02A08A06|A02A08A07|A02A05A03|A02A05A04|A02A09A03', xzqhdm: selectedCity.code || '420000', year:currentYear}})" title="应追溯品种数">{{ backData.zsData?.pzQty || 0 }}</span>
                </span>
              </div>
            </CardGrid>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, Ref } from 'vue';
import { Card } from 'ant-design-vue';
import { useECharts } from '/@/hooks/web/useECharts';
import { registerMap } from 'echarts';
import { CountTo } from '/@/components/CountTo/index';
import { defHttp } from '/@/utils/http/axios';
import { listCementByUser } from '/@/layouts/default/header/components/notify/notify.api';
import mapData from '/@/utils/map/420000.json';
import mapDataBorder from '/@/utils/map/420000_border.json';
import { useGo } from '/@/hooks/web/usePage';
import { useLoading } from '/@/components/Loading';
import Tools from '/@/utils/tools';

const go = useGo();
const CardGrid = Card.Grid;

const bodyEl = ref<ElRef>(null);
const [openLoading, closeLoading] = useLoading({
  target: bodyEl,
  props: {
    tip: '加载中...',
    absolute: true,
  },
});

const numberFormat = (val, len) => {
  if (isNaN(val)) val = 0;
  let v = Math.pow(10, len);
  return Math.round(val * v) / v;
};

const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(()=>Tools.getYearArray(currentYear.value));

const ypqyfl = ref<HTMLDivElement | null>(null);
const { setOptions: setOptionsYpqyfl } = useECharts(ypqyfl as Ref<HTMLDivElement>);
const yppzlx = ref<HTMLDivElement | null>(null);
const { setOptions: setOptionsYppzlx } = useECharts(yppzlx as Ref<HTMLDivElement>);
const xkfl = ref<HTMLDivElement | null>(null);
const { setOptions: setOptionsXkfl } = useECharts(xkfl as Ref<HTMLDivElement>);
const jdjc = ref<HTMLDivElement | null>(null);
const { setOptions: setOptionsJdjc } = useECharts(jdjc as Ref<HTMLDivElement>);
const jczf = ref<HTMLDivElement | null>(null);
const { setOptions: setOptionsJczf } = useECharts(jczf as Ref<HTMLDivElement>);
const mapChart = ref<HTMLDivElement | null>(null);
const dataBlock = ref([{ name: '药品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '医疗机构制剂单位', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '麻精药品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '生物制品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }]);
const mapCardData = ref([{ name: '药品生产企业', value: '' }, { name: '医疗机构制剂单位', value: '' }, { name: '药品品种', value: '' }, { name: '医疗机构制剂数量', value: '' }]);
const selectedCity = ref({});
const { setOptions: setOptionsMapChart } = useECharts(mapChart as Ref<HTMLDivElement>);
const cjyChart = ref<HTMLDivElement | null>(null);
const { setOptions: setOptionsCjy } = useECharts(cjyChart as Ref<HTMLDivElement>);

let tooltipFormatter = (units: Array<String> = [], showValue: boolean = true) => {
  return (params) => {
    if (!Array.isArray(params)) {
      let obj = Object.assign({}, params);
      obj.seriesName = params.name;
      obj.name = params.seriesName;
      params = [obj];
    }
    let html = ['<div style="margin:0;line-height:1;">'], clear = '<div style="clear:both;"></div>';
    if (0 < params.length) html.push('<div style="font-size:14px;color:#666;font-weight:400;">', params[0].name || '', '</div>');
    html.push('<div style="margin:10px 0 0;">');
    params.forEach((item, idx) => {
      html.push('<div style="margin:0;">\
              <div style="margin:'+ (0 < idx ? '10px 0 0' : '0') + ';">\
                <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:'+ item.color + ';"></span>\
                <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">'+ item.seriesName + '</span>\
                '+ (showValue && '<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">' + item.value + (idx < units.length ? '(' + units[idx] + ')' : '') + '</span>' || '') + '\
                <div style="clear:both"></div>\
              </div>\
              <div style="clear:both"></div>\
            </div>');
    });
    html.push('</div>', clear, '</div>');
    return html.join('');
  }
};

const loading = ref(true);
const msgTotal = ref(0), jcpzsl = ref(0), nbcount = ref(0), ypsczJjgq = ref(0);
// 获取系统消息
async function loadData() {
  try {
    let { anntMsgTotal } = await listCementByUser({ pageSize: 5 })
    msgTotal.value = anntMsgTotal;
  } catch (e) {
    console.warn('系统消息通知异常：', e)
  }
}
function goypscqy(name) {
  if (name == '药品生产企业') {
    go({ path: '/yqyd/ypqy/' + '6' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } })
  } else if (name == '麻精药品生产企业') {
    //go({ path: '/yqyd/tsypsc/' + 'ts' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
    go('/yqyd/ypsc?tabTitle=麻精药品生产企业&forceTags=A02A08A05|A02A08A06&xzqhdm='+(selectedCity.value.code || '420000')+'&year='+currentYear.value)
  } else if (name == '生物制品生产企业') {
    go({ path: '/yqyd/' + 'S' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } })
  } else if (name == '医疗机构制剂单位') {
    go({ path: '/yqyd/yljgzjs', query: { xzqhdm: selectedCity.value?.code || undefined, year: currentYear.value } });
  }
}
function gozcwh(zc, name, pzwh) {
  if (name == '药品生产企业') {
    go('/ypyd/gcyppz/' + '1' + ',' + (selectedCity.value.code || '420000'))
  } else if (name == '麻精药品生产企业') {
    //go('/ypyd/tsyp/' + pzwh + '/' + '1' + ',' + (selectedCity.value.code || '420000'))  
    go('/ypyd/gcyppz?tabTitle=麻精在产药品&sczk=1&forceTags=A02A08A05|A02A08A06&xzqhdm='+(selectedCity.value.code || '420000')+'&year='+currentYear.value)
  } else if (name == '生物制品生产企业') {
    go('/ypyd/yppzwh/' + pzwh + '/' + '1' + ',' + (selectedCity.value.code || '420000'))
  } else if (name == '医疗机构制剂单位') {
    go({ path: '/ypyd/yljgzj', query: { qyExists: true, qyXzqhdm: selectedCity.value?.code || undefined, sczk: 1 } });
  }
}
function goPzwh(pzwh, name) {
  if (name == '生物制品生产企业') {
    go('/ypyd/yppzwh/' + pzwh + ',' + (selectedCity.value.code || '420000'))
  } else if (name == '药品生产企业') {
    go('/ypyd/qypz/' + pzwh + ',' + (selectedCity.value.code || '420000'))
  } else if (name == '麻精药品生产企业') {
    //go('/ypyd/tsyp/' + pzwh + ',' + (selectedCity.value.code || '420000'))
    go('/ypyd/gcyppz?tabTitle=麻精药品批准文号&forceTags=A02A08A05|A02A08A06&xzqhdm='+(selectedCity.value.code || '420000')+'&year='+currentYear.value)
  } else if (name == '医疗机构制剂单位') {
    go({ path: '/ypyd/yljgzj', query: { qyExists: true, qyXzqhdm: selectedCity.value?.code || undefined } });
  }
}

function gojcbhg() {
  go({path: '/yw/jccs/' + '1' + '/' + '03' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}});
}
function gocjbhg() {
  go({path: '/yw/cjbhg/' + '2' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}})
}
function gojcpz() {
  go({path:'/ypyd/jcpz/' + 'j' + ',' + (selectedCity.value.code || ''),query: {year: currentYear.value}})
}
function gondbg() {
  go({ path: '/zdjg/ndbg', query: { xzqhdm: (selectedCity.value.code || ''), year: currentYear.value - 1 } });
}
function goXzsp(tab, dqRange) {
  go({ path: '/jgyw/xzxk/' + tab, query: { dqRange: dqRange, xzqhdm: (selectedCity.value.code || '') } });
}
function gojjgqzs() {
  go({ path: '/jgyw/xzxk/jjgqzs', query: { dqRange: '3M', code: (selectedCity.value.code || '') } });
}
function gocfxx() {
  go({ path: '/jgyw/jczf', query: { cfxx: 'j', year: currentYear.value } });
}
loadData();

const backData = ref({});
function loadReportData(params = {}, isFirst = true) {
  openLoading();

  defHttp.get({ url: '/report/homePage', params: { year: currentYear.value, ...params} }).then((res) => {
    backData.value = res;
    dataBlock.value = res.dataBlock || [];
    jcpzsl.value = res.jcpzsl || 0;
    nbcount.value = res.nbcount || 0;
    ypsczJjgq.value = res.ypsczJjgq || 0;

    let ypscqyTotal = 0 < dataBlock.value.length ? dataBlock.value[0].value : 0,
      zjqyTotal = 1 < dataBlock.value.length ? dataBlock.value[1].value : 0;

    setOptionsYpqyfl({
      tooltip: { trigger: 'item', formatter: tooltipFormatter(['家']) },
      series: [{
        name: '药品生产企业分类', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205,
        label: { formatter: '{b} {c} 家' },
        data: (res.ypqyfl || []).filter((item) => {
          return item.code != 'X'
        }),
        animationType: 'scale', animationEasing: 'exponentialInOut', animationDelay: function () {
          return Math.random() * 400;
        }
      }]
    }, true, (res) => {
      if (!isFirst) return;
      res.on('click', { seriesName: '药品生产企业分类' }, function (params) {
        if (params.data.tags) {
          go({ path: '/yqyd/ypsc', query: { tags: 'A02A04A04', xzqhdm: selectedCity.value.code || '', year: currentYear.value } });
        } else if (params.data.name == '麻精药品') {
          go('/yqyd/ypsc?tabTitle=麻精药品生产企业&forceTags=A02A08A05|A02A08A06&xzqhdm='+(selectedCity.value.code || '420000')+'&year='+currentYear.value)
          // go({ path: '/yqyd/tsypsc/ts' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
        } else {
          go({ path: '/yqyd/' + params.data.code + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
        }
      });
    });
    let yppzlx = res.yppzlx || { pz2: 0, pz4: 0, pz3: 0, pz9: 0, total: 0 }, yppzlxData = (name, code) => {
      let val = yppzlx['pz' + code] || 0, rate = yppzlx.total ? val * 100 / yppzlx.total : 0, showName = numberFormat(rate, 0) + '%';
      showName = val;
      return [{ value: rate, name: 50 <= rate ? showName : name, itemStyle: { borderRadius: 5 }, orgValue: val }, { value: 100 - rate, name: 50 > rate ? showName : name, orgValue: val }];
    };
    setOptionsYppzlx({
      tooltip: {
        show: true, trigger: 'item', formatter: ((cb) => {
          return (params) => {
            let obj = Object.assign({}, params);
            Object.assign(obj, { name: params.seriesName, color: '#5FB4FE', value: params.data.orgValue });
            return cb(obj);
          }
        })(tooltipFormatter([]))
      },
      title: [{
        text: '化学药品', textAlign: 'center', left: '12.5%', bottom: '10%', textStyle: { fontSize: 14, fontWeight: 'normal' }
      }, {
        text: '中药', textAlign: 'center', left: '37.5%', bottom: '10%', textStyle: { fontSize: 14, fontWeight: 'normal' }
      }, {
        text: '生物制品', textAlign: 'center', left: '62.5%', bottom: '10%', textStyle: { fontSize: 14, fontWeight: 'normal' }
      }, {
        text: '无菌制剂', textAlign: 'center', left: '87.5%', bottom: '10%', textStyle: { fontSize: 14, fontWeight: 'normal' }
      }],
      series: [{
        name: '化学药品', type: 'pie', radius: ['40%', '50%'], center: ['12.5%', '40%'], avoidLabelOverlap: false,
        color: ['#5FB4FE', '#EFEFEF'],
        emphasis: { disabled: true, scale: false }, label: { show: true, position: 'center' },
        data: yppzlxData('化学药品', 2)
      }, {
        name: '中药', type: 'pie', radius: ['40%', '50%'], center: ['37.5%', '40%'], avoidLabelOverlap: false,
        color: ['#5FB4FE', '#EFEFEF'],
        emphasis: { disabled: true, scale: false }, label: { show: true, position: 'center' },
        data: yppzlxData('中药', 4)
      }, {
        name: '生物制品', type: 'pie', radius: ['40%', '50%'], center: ['62.5%', '40%'], avoidLabelOverlap: false,
        color: ['#5FB4FE', '#EFEFEF'],
        emphasis: { disabled: true, scale: false }, label: { show: true, position: 'center' },
        data: yppzlxData('生物制品', 3)
      }, {
        name: '无菌制剂', type: 'pie', radius: ['40%', '50%'], center: ['87.5%', '40%'], avoidLabelOverlap: false,
        color: ['#FA9F81', '#EFEFEF'],
        emphasis: { disabled: true, scale: false }, label: { show: true, position: 'center' },
        data: yppzlxData('无菌制剂', 9)
      }]
    }, true, (res) => {
      if (!isFirst) return;

      res.on('click', { seriesName: '生物制品' }, function (params) {
        go('/ypyd/yppzwh/' + '3' + ',' + (selectedCity.value.code || '420000'))
      });
      res.on('click', { seriesName: '化学药品' }, function (params) {
        go('/ypyd/ypfl/' + '2' + ',' + (selectedCity.value.code || '420000'))
      });
      res.on('click', { seriesName: '中药' }, function (params) {
        go('/ypyd/ypfl/' + '4' + ',' + (selectedCity.value.code || '420000'))
      });
      res.on('click', { seriesName: '无菌制剂' }, function (params) {
        go('/ypyd/tsyp/' + 'zj' + ',' + (selectedCity.value.code || '420000'))
      });
    });
    setOptionsXkfl({
      tooltip: { trigger: 'item', formatter: tooltipFormatter(['家']) },
      series: [{
        name: '药品上市许可分类', type: 'pie', radius: ['30%', '60%'], center: ['50%', '52%'], startAngle: 205, avoidLabelOverlap: false,
        label: { formatter: '{b} {c} 家' },
        itemStyle: { borderRadius: 5, borderColor: '#fff', borderWidth: 1 },
        data: res.scfs || [],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 400;
        }
      }]
    }, true, (res) => {
      if (!isFirst) return;

      res.on('click', { seriesName: '药品上市许可分类' }, function (params) {
        if (params.data.name == '自产(A类)') {
          go({ path: '/yqyd/' + 'A' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
        } else if (params.data.name == '委托(B类)') {
          go({ path: '/yqyd/' + 'B' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
        } else if (params.data.name == '受托(C类)') {
          go({ path: '/yqyd/' + 'C' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
        } else if (params.data.name == '原料药(D类)') {
          go({ path: '/yqyd/' + 'D' + ',' + (selectedCity.value.code || ''), query: { year: currentYear.value } });
        }
      });
    });
    setOptionsJdjc({
      tooltip: { trigger: 'item', formatter: tooltipFormatter([], false) },
      series: [{
        name: '监督检查', type: 'pie', radius: ['30%', '80%'], center: ['50%', '50%'], avoidLabelOverlap: false,
        color: ['#5FB4FE', '#B8E1FC', '#FBCEB3', '#BAF1D9'],
        itemStyle: { borderRadius: 15, borderColor: '#fff', borderWidth: 20 },
        data: [{ value: 25, name: '涉及主体 ' + (res.jdjcData?.jdjcQyTotal || 0) + ' 家' },
        { value: 25, name: '需整改企业 ' + (res.jdjcData?.jcbhg || 0) + ' 家' },
        { value: 25, name: '覆盖率 ' + (ypscqyTotal && numberFormat((res.jdjcData?.jdjcQyTotal || 0) / ypscqyTotal * 100, 0) || 0) + ' %' },
        { value: 25, name: '检查次数 ' + (res.jdjcData?.jdjcTotal || 0) + ' 次' }],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 400;
        }
      }]
    }, true, (res) => {
      if (!isFirst) return;

      res.on('click', { seriesName: '监督检查' }, function (params) {
        if (params.dataIndex == 3) {
          go({path: '/yw/jccs/' + '1' + '/' + '1' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}});
        } else if (params.dataIndex == 1) {
          gojcbhg();
        } else if (params.dataIndex == 0) {
          go({path: '/yqyd/sjzt/' + '2' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}})
        }
      });
    });
    setOptionsJczf({
      tooltip: { trigger: 'axis', formatter: tooltipFormatter(['件', '件']) }, grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
      xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: res.jczfData?.category },
      yAxis: { type: 'value' },
      series: [{
        name: '一般案件', stack: '案件数量', type: 'bar', barWidth: 20, data: res.jczfData?.ybAj,
      }, {
        name: '重大案件', stack: '案件数量', type: 'bar', barWidth: 20, data: res.jczfData?.zdAj,
      }]
    }, true, (res) => {
      if (!isFirst) return;

      res.on('click', function (params) {
        if (params.seriesName == "一般案件") {
          go('/yw/syzf/' + params.name.slice(0, 4) + '/' + '0' + ',' + (selectedCity.value.code || ''));
        } else if (params.name == "重大案件") {
          go('/yw/syzf/' + params.name.slice(0, 4) + '/' + '1' + ',' + (selectedCity.value.code || ''));
        }

      });
    });
    let ypYcj: Array<number> = [], ypWcj: Array<number> = [], ypWcl: Array<number> = [], ypHgl: Array<number> = [];
    let zjYcj: Array<number> = [], zjWcj: Array<number> = [], zjWcl: Array<number> = [], zjHgl: Array<number> = [];
    for (var i = 0; i < 5; i++) {
      ypYcj.push(Math.round(Math.random() * 90) + 10);
      ypWcj.push(Math.round(Math.random() * 10));
      ypWcl.push(Math.round(ypYcj[i] / (ypYcj[i] + ypWcj[i]) * 10000) / 100);
      ypHgl.push(Math.round((Math.random() * 0.1 + 0.9) * 10000) / 100);
      zjYcj.push(Math.round(Math.random() * 90) + 10);
      zjWcj.push(Math.round(Math.random() * 10));
      zjWcl.push(Math.round(zjYcj[i] / (zjYcj[i] + zjWcj[i]) * 10000) / 100);
      zjHgl.push(Math.round((Math.random() * 0.1 + 0.9) * 10000) / 100);
    }
    setOptionsCjy({
      tooltip: { trigger: 'axis', formatter: tooltipFormatter(['家', '家', '%', '%', '家', '家', '%', '%']) },
      grid: { containLabel: true, top: 50, bottom: 10, left: 20, right: 30 },
      xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: res.cjyData?.category },
      yAxis: [{ type: 'value' }, { type: 'value', position: 'right' }],
      series: [{
        name: '未抽检企业', stack: '抽检企业', type: 'bar', barWidth: 20, data: [ypscqyTotal - res.cjyData?.ypsc?.cyQy, zjqyTotal - res.cjyData?.yljgzj?.cyQy],
      }, {
        name: '已抽检企业', stack: '抽检企业', type: 'bar', barWidth: 20, data: [res.cjyData?.ypsc?.cyQy, res.cjyData?.yljgzj?.cyQy],
      }, {
        name: '抽检完成率', type: 'line', data: [numberFormat(res.cjyData?.ypsc?.cyQy / ypscqyTotal * 100.0, 2), numberFormat(res.cjyData?.yljgzj?.cyQy / zjqyTotal * 100.0, 2)], yAxisIndex: 1
      }, {
        name: '抽检合格率', type: 'line', data: [numberFormat(res.cjyData?.ypsc?.cyHg / res.cjyData?.ypsc?.cyCs * 100.0, 2), numberFormat(res.cjyData?.yljgzj?.cyHg / res.cjyData?.yljgzj?.cyCs * 100.0, 2)], yAxisIndex: 1
      }]
    }, true, (res) => {
      if (!isFirst) return;

      res.on('click', function (params) {
        if (params.name == '药品生产' && params.seriesName == "已抽检企业") {
          go({path: '/yqyd/cyqy/' + '1' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}})
        } else if (params.name == '医疗机构制剂' && params.seriesName == "已抽检企业") {
          go({path: '/yqyd/ylzj/' + '1' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}})
        } else if (params.name == '药品生产' && params.seriesName == "未抽检企业") {
          go({path: '/yqyd/cyqy/' + '2' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}})
        } else if (params.name == '医疗机构制剂' && params.seriesName == "未抽检企业") {
          go({path: '/yqyd/ylzj/' + '2' + ',' + (selectedCity.value.code || ''), query: {year: currentYear.value}})
        }
      });
    });

    if (isFirst) {
      registerMap('湖北省', mapData);
      registerMap('湖北省边框', mapDataBorder);
      let data = [];
      mapData.features.forEach((item, idx) => {
        let val = res.mapData[item.properties.adcode] || {}, obj = { name: item.properties.name, code: item.properties.adcode, dataIndex: idx, value: val.ypscqy || 0 };
        obj.ypscqy = obj.value;
        obj.yljgzj = val.yljgzj || 0;
        obj.yppz = val.yppz || 0;
        obj.zjsl = val.zjsl || 0;
        data.push(obj);
      });
      setOptionsMapChart({
        tooltip: {
          trigger: 'item', borderColor: 'rgba(254,122,35,.9)', backgroundColor: 'rgba(255,177,128,.9)', textStyle: { color: '#fff' },
          formatter(params, ticket, cb) {
            if (!params.data) return;
            let array = ['<b>', params.name, '</b><br/><table>'];
            mapCardData.value.forEach((d, idx) => {
              array.push('<tr><td class="pr-2">', d.name, '</td><td class="text-right">');
              if (idx == 0) array.push(params.data.ypscqy);
              if (idx == 1) array.push(params.data.yljgzj);
              if (idx == 2) array.push(params.data.yppz);
              if (idx == 3) array.push(params.data.zjsl);
              array.push('</td></tr>');
            });
            array.push('</table>');
            return array.join('');
          }
        }, grid: { top: 0, left: 0, bottom: 0, right: 0 },
        geo: {
          type: 'map3D', map: '湖北省边框', roam: false,
          label: { show: false },
          itemStyle: {
            areaColor: {
              type: 'linear', x: 0, y: 0, x2: 0.8, y2: 1.5,
              colorStops: [{ offset: 0, color: '#4290e9' }, { offset: 0.5, color: '#7ab6fc' }, { offset: 1, color: '#4699fa' }], global: false
            },
            shadowColor: '#B3D9FF', shadowOffsetX: 0, shadowOffsetY: 10, borderWidth: 0
          },
          emphasis: { label: { show: false }, itemStyle: { opacity: 1, areaColor: '#FFB180' } }
        },
        series: [{
          type: 'map', map: '湖北省边框', roam: false,
          label: { show: false },
          itemStyle: {
            areaColor: {
              type: 'radial', x: 0.5, y: 0.5, r: 2,
              colorStops: [{ offset: 0, color: 'rgba(0,0,0,0)' }, { offset: 1, color: 'rgba(0,0,0,.5)' }]
            }, borderWidth: 2, borderColor: '#fff'
          },
          emphasis: { label: { show: false }, itemStyle: { areaColor: 'rgba(255,255,255,0)' } },
          select: { label: { show: false }, itemStyle: { areaColor: 'rgba(255,255,255,0)' } }
        }, {
          type: 'map', map: '湖北省', roam: false, zlevel: 2,
          label: { show: true, color: '#fff' },
          itemStyle: { areaColor: 'rgba(0,0,0,0)', borderType: [1, 2], borderWidth: 1, borderColor: '#fff' },
          emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#FFB180' } },
          select: { label: { color: '#fff' }, itemStyle: { areaColor: '#FFB180' } },
          data: data
        }]
      }, true, (res) => {
        if (selectedCity.value.dataIndex != undefined) res?.dispatchAction({ type: 'select', seriesIndex: 1, dataIndex: selectedCity.value.dataIndex });
        if (!isFirst) return;

        res.on('click', (res) => {
          let data = res.data;
          if (!selectedCity.value.name || selectedCity.value.name != data.name) {
            selectedCity.value = data;
          } else {
            selectedCity.value = {};
          }

          Tools.throttle(() => {
            loadReportData({ areaCode: selectedCity.value.code || '' }, false);
          });
        });

        //res?.dispatchAction({ type: 'select', seriesIndex: 1, dataIndex: 0 });
      });
    }

    loading.value = false;
    closeLoading();
  });
}

loadReportData();
</script>

<style lang="less" scoped>
:deep(.ant-card) {
  .ant-card-loading-content {
    margin: -1rem;
    padding: 1rem;
  }
}

.my-index {
  .ant-card+.ant-card {
    margin-top: 1rem;
  }

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

  .card-block {
    .color1 {
      color: #56A782;
      background-image: url(/@/assets/images/card_bg1.png);
    }

    .color2 {
      color: #B98947;
      background-image: url(/@/assets/images/card_bg2.png);
    }

    .color3 {
      color: #5C91BD;
      background-image: url(/@/assets/images/card_bg3.png);
    }

    .color4 {
      color: #B67447;
      background-image: url(/@/assets/images/card_bg4.png);
    }

    &>div {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: right bottom;
      position: relative;

      &::before {
        display: block;
        content: ' ';
        padding-top: 126px;
      }

      &>ul {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);

        .title {
          font-weight: 400;
        }

        .number {
          font-weight: 600;
          color: rgba(0, 0, 0, .85);
        }
      }
    }
  }

  .dbtx {
    >.item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 91px;

      .title {
        font-weight: 400;
        margin-bottom: 5px;
      }

      .number {
        position: relative;
        font-weight: 600;
        font-size: 24px;

        .sup {
          position: absolute;
          top: -5px;
          margin-left: 5px;
          font-size: 14px;
          color: #D41639;
        }

        .sub {
          position: absolute;
          bottom: 0;
          margin-left: 5px;
          font-size: 12px;
          font-weight: normal;
          color: #C0C5CA;
        }
      }
    }
  }

  .map {
    background-image: url(/@/assets/images/map_bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;

    .map-card {
      display: flex;
      align-items: center;
      align-content: center;

      .icon {
        width: 64px;
        height: 64px;
        margin-right: 15px;
        background-repeat: no-repeat;
        background-size: cover;
      }

      .icon-1 {
        background-image: url(/@/assets/images/map-icon1.png);
      }

      .icon-2 {
        background-image: url(/@/assets/images/map-icon2.png);
      }

      .icon-3 {
        background-image: url(/@/assets/images/map-icon3.png);
      }

      .icon-4 {
        background-image: url(/@/assets/images/map-icon4.png);
      }

      .icon+div {
        flex: 1;

        .title {}

        .number {
          font-size: 18px;
          color: #1890FF;
        }
      }
    }

    .show-tips {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 10px;
      white-space: nowrap;
      color: rgb(255, 255, 255);
      background-color: rgba(255, 177, 128, 0.8);
      border: 1px solid rgba(254, 122, 35, 0.8);
      border-radius: 4px;
    }

    .map-container {}
  }

  .fxjc {
    .ant-card-grid {
      width: 50%;
      height: 33.333%;
      position: relative;

      &>span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .cjy {
    .my-table {
      border-width: 0;

      &>tr,
      &>tbody>tr {
        background-color: #F4FAFF;
      }

      &>tr:nth-child(2n),
      &>tbody>tr:nth-child(2n) {
        background-color: #EBF6FF;
      }

      td,
      th {
        border-width: 0;
      }
    }
  }
}
</style>
