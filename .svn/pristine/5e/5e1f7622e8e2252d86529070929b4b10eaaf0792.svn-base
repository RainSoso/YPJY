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
          <BasicTable @register="registerTable">
            <template #qxColumnHeader>
              缺陷数<br />（严重/主要/一般）
            </template>
          </BasicTable>
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
import Tools from '/@/utils/tools';

export default defineComponent({
  name: 'zdjg-jcpz-chart',
  components: { CountTo, BasicTable },
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
    const currentArea = ref({ code: '420000', name: '湖北省' });
    const currentYear = ref(Tools.getCurrentYear());
    const yearArray = computed(() => Tools.getYearArray(currentYear.value));
    const cjyChartEl = ref<ElRef>(null),
      jdjcChartEl = ref<ElRef>(null),
      zcChartEl = ref<ElRef>(null),
      jczfChartEl = ref<ElRef>(null),
      BlfyChartEl = ref<ElRef>(null),
      FxczChartEl = ref<ElRef>(null);
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

    const pzTableTags: any = ref([]);
    getDictItems('yppzTags').then((res) => {
      pzTableTags.value = [{ text: '合计', value: 'Total', class: 'font-bold' }, ...res.filter(item => item.value != 'A02A09A03')];
    });
    const JbArray: any = ref([]);
    const expandedRowKeys: any = ref([]);
    const { tableContext } = useListPage({
      tableProps: {
        showTableSetting: false, useSearchForm: false, showActionColumn: false, canResize: false
        , api: (params) => defHttp.get({ url: '/report/zdjg/jcpz/jcxx', params }), rowKey: 'id'
        , immediate: true, pagination: false, beforeFetch(params) {
          params.year = currentYear.value;
          return params;
        }, afterFetch(data) {
          if (!JbArray.value.length) JbArray.value = data.map(item => {
            return { text: item.category + '(' + item.pz + ')', value: item.id, children: [] }
          });
          expandedRowKeys.value = [];
          return data;
        }, getPopupContainer: () => bodyEl.value
        , columns: [{
          dataIndex: 'category', title: '集采级别', align: 'left', width: '30%', customRender({ record }) {
            let array = getDictItemsByValue('yppzTags', record.tagValue);
            return record.tagValue && array.length ? columnRender('yppzTags', record.tagValue) : h('span', {}, record.category);
          }, filters: JbArray
        }, {
          dataIndex: 'pz', title: '品种数量', customRender({ record }) {
            return h(Tooltip, {
              title: record.pzText, placement: 'right', destroyTooltipOnHide: true, getPopupContainer() {
                return bodyEl.value;
              }
            }, () => h('div', { style: 'margin:-12px -8px;padding:12px 8px;' }, record.pz));
          }
        }, {
          dataIndex: 'wh', title: '批准文号数量', customRender({ record }) {
            return record.levels ? h(Button, {
              type: 'link', onClick() {
                go({ path: '/ypyd/jcpz/j', query: { year: currentYear.value, levels: record.levels, tags: record.tagValue, pzfw: 1, tagTitle: '集采品种 - ' + record.levels + (record.tagValue ? ' - ' + record.category : '') } });
              }
            }, () => record.wh) : record.wh;
          }
        }, {
          dataIndex: 'qy', title: '涉及企业数', customRender({ record }) {
            return record.levels ? h(Button, {
              type: 'link', onClick() {
                go({ path: '/yqyd/jgqy/-', query: { year: currentYear.value, showTags: 'false', jcLevels: record.levels, jgqy: '-', jcTags: record.tagValue, tagTitle: '集采企业 - ' + record.levels + (record.tagValue ? ' - ' + record.category : '') } });
              }
            }, () => record.qy) : record.qy;
          }
        }, {
          dataIndex: 'cjy', title: '抽检验', customRender({ record }) {
            return record.levels ? h(Button, {
              type: 'link', onClick() {
                go({ path: '/yw/cjbhg/3', query: { year: currentYear.value, jcLevels: record.levels, jcTags: record.tagValue, year: currentYear.value, tagTitle: '集采抽检验 - ' + record.levels + (record.tagValue ? ' - ' + record.category : '') } });
              }
            }, () => record.cjy) : record.cjy;
          }
        }, {
          dataIndex: 'jdjc', title: '监督检查', customRender({ record }) {
            return record.levels ? h(Button, {
              type: 'link', onClick() {
                go({ path: '/yw/jccs/2/-', query: { year: currentYear.value, jcLevels: record.levels, jcTags: record.tagValue, year: currentYear.value, tagTitle: '集采监督检查 - ' + record.levels + (record.tagValue ? ' - ' + record.category : '') } });
              }
            }, () => record.jdjc) : record.jdjc;
          }
        }, {
          dataIndex: 'yzQxs', width: 150, slots: { title: 'qxColumnHeader' }, customRender({ record }) {
            if (record.isLoading) return '';
            if (!record.levels) return (record.yzQxs || 0) + ' / ' + (record.zyQxs || 0) + ' / ' + (record.ybQxs || 0);
            function toPage(level) {
              go({ path: '/yw/jccs/2/-', query: { year: currentYear.value, jcLevels: record.levels, jcTags: record.tagValue, year: currentYear.value, jb: level, tagTitle: '集采监督检查 - ' + record.levels + (record.tagValue ? ' - ' + record.category : '') } });
            }
            return h('span', {}, [h(Button, {
              type: 'link', class: '!px-1', onClick() { toPage(0); }
            }, () => record.yzQxs || 0), '/', h(Button, {
              type: 'link', class: '!px-1', onClick() { toPage(1); }
            }, () => record.zyQxs || 0), '/', h(Button, {
              type: 'link', class: '!px-1', onClick() { toPage(2); }
            }, () => record.ybQxs || 0)]);
          }
        }, {
          dataIndex: 'jczf', title: '稽查执法', customRender({ record }) {
            return record.levels ? h(Button, {
              type: 'link', onClick() {
                go({ path: '/yw/jczf/' + data.value.jczfData?.year, query: { jcLevels: record.levels, jcTags: record.tagValue, year: currentYear.value, tagTitle: '集采稽查执法 - ' + record.levels + (record.tagValue ? ' - ' + record.category : '') } });
              }
            }, () => record.jczf) : record.jczf;
          }
        }],
        expandedRowKeys,
        async onExpand(expanded, record) {
          if (expanded) {
            expandedRowKeys.value.push(record.id);
            if (record.children.length > 0 && !!record.children[0].isLoading) {
              let params = record.type ? { parentKey: record.type + '#' + record.category } : { parentKey: record.id };
              params.year = currentYear.value;
              let result = await defHttp.get({ url: '/report/zdjg/jcpz/jcxx', params });
              if (result && result.length > 0) {
                record.children = result.filter((item) => {
                  if (item.tagValue != 'A02A09A03') {
                    return 0 < item.wh + item.qy;
                  }
                });
                let node = getItemFromTree(JbArray.value, record.id);
                if (node) {
                  let array = record.children.map(item => {
                    let obj = { text: item.category + '(' + item.pz + ')', value: item.id };
                    if (item.children) obj.children = [];
                    return obj;
                  });
                  array.splice(0, 0, { text: (record.type ? '限' : '') + record.category + '', value: record.id });
                  node.children = array;
                }
              } else {
                record.children = null;
                record.hasChild = '0';
              }
            }
          } else {
            let keyIndex = expandedRowKeys.value.indexOf(record.id);
            if (keyIndex >= 0) {
              expandedRowKeys.value.splice(keyIndex, 1);
            }
          }
        }
      }
    });
    const [registerTable, { reload }] = tableContext;

    const numberFormat = (val, len = 0) => {
      if (isNaN(val)) val = 0;
      let v = Math.pow(10, len);
      return Math.round(val * v) / v;
    };
    function goFl(name) {
      if (name == headerBlock.value[0].name) {
        go({ path: '/ypyd/jcpz/j', query: { year: currentYear.value, pzfw: 1, xzqhdm: currentArea.value.code } });
      } else if (name == '涉及企业') {
        go({ path: '/yqyd/jgqy/-', query: { showTags: 'false', year: currentYear.value } });
      } else if (name == '抽检验') {
        go({ path: '/yw/cjbhg/3', query: { year: currentYear.value } });
      } else if (name == '监督检查') {
        go({ path: '/yw/jccs/2/-', query: { year: currentYear.value } });
      } else if (name == '稽查执法') {
        go({ path: '/yw/jczf/' + data.value.jczfData?.year, query: { year: currentYear.value } });
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
      
    function loadData(params: any = { year: currentYear.value }, isFirst = false) {
      openLoading();

      if (!isFirst) reload();

      defHttp.get({ url: '/report/zdjg/jcpz', params: params }).then((res) => {
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
              go({ path: '/ypyd/cyyp/1', query: { showTags: 'false', showJnCjqk: 'true', year: currentYear.value } })
            } else if (params.name == '未完成品种') {
              go({ path: '/ypyd/cyyp/2', query: { showTags: 'false', year: currentYear.value } })
            } else if (params.name == '合格品种') {
              go({ path: '/ypyd/cyyp/3', query: { showTags: 'false', showJnCjqk: 'true', year: currentYear.value } })
            } else if (params.name == '不合格品种') {
              go({ path: '/ypyd/cyyp/4', query: { showTags: 'false', showJnCjqk: 'true', year: currentYear.value } })
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
              go({ path: '/yqyd/jgqy/1', query: { showTags: 'false', year: currentYear.value } })
            } else if (params.name == '未完成企业') {
              go({ path: '/yqyd/jgqy/2', query: { showTags: 'false', year: currentYear.value } })
            } else if (params.name == '不符合要求') {
              go({ path: '/yqyd/jgqy/03', query: { showTags: 'false', year: currentYear.value } })
            } else if (params.name == '基本符合要求') {
              go({ path: '/yqyd/jgqy/02', query: { showTags: 'false', year: currentYear.value } })
            } else if (params.name == '符合要求') {
              go({ path: '/yqyd/jgqy/01', query: { showTags: 'false', year: currentYear.value } })
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
              go({ path: '/ypyd/jczcpz/' + '1', query: { showTags: 'false', isCyr: 'true', year: currentYear.value } })
            } else if (params.name == '停产品种') {
              go({ path: '/ypyd/jczcpz/' + '0', query: { showTags: 'false', isCyr: 'true', year: currentYear.value } })
            } else if (params.name == '未填报品种') {
              go({ path: '/ypyd/jczcpz/' + '9', query: { showTags: 'false', isCyr: 'true', year: currentYear.value } })
            } else if (params.name == '可追溯品种') {
              go({ path: '/ypyd/zspz/' + '1', query: { showTags: 'false', isCyr: 'true', year: currentYear.value } });
            } else if (params.name == '不可追溯品种') {
              go({ path: '/ypyd/zspz/' + '0', query: { showTags: 'false', isCyr: 'true', year: currentYear.value } });
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
              go({ path: '/yw/jczfqk/' + params.name.slice(0, 4) + '/' + '0', query: {} });
            } else if (params.seriesName == "重大案件") {
              go({ path: '/yw/jczfqk/' + params.name.slice(0, 4) + '/' + '1', query: {} });
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
              go({ path: '/fxyj/pz', query: {tags:'A02A09A03',year:params.name.slice(0, 4)}});
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
              go({ path: '/xtcz/rwfb/CpEventList', query: {tags:'A02A09A03',year:params.name.slice(0, 4)} });
            }
          });
        });

        closeLoading();
        loading.value = false
      });
    }

    loadData(null, true);

    return {
      bodyEl, loading, cjyChartEl, jdjcChartEl, zcChartEl,FxczChartEl, jczfChartEl,BlfyChartEl, data, headerBlock, goFl, pzTableTags
      , currentYear, yearArray, loadData
      , registerTable
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
