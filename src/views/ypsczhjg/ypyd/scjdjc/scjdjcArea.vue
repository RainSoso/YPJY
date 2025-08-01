<template>
  <div ref="bodyEl" class="bg-white m-4 p-4">
    <h2 class="text-center text-2xl font-600 p-4 !mb-0">药品生产监督检查覆盖总体情况</h2>
    <div class="text-right mb-4">
      <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
    <table class="my-table !table-auto">
      <colgroup>
        <col style="width: 100px" />
        <col />
      </colgroup>
      <thead>
        <tr class="text-center">
          <th rowspan="2" style="width: 10px">辖区</th>
          <th class="tableStyle"><a-button type="link" @click="toWorkloadPage({zslx:6})">药品生产企业</a-button></th>
          <th class="tableStyle"><a-button type="link" @click="toWorkloadPage({zslx:7})">医疗机构制剂室</a-button></th>
          <th class="tableStyle"><a-button type="link" @click="toWorkloadPage({zslx:201020})">药包材生产企业</a-button></th>
          <th class="tableStyle"><a-button type="link" @click="toWorkloadPage({zslx:201021})">药用辅料生产企业</a-button></th>
        </tr>
        <tr class="text-center">
          <td>覆盖率（企业数量/已检数量/未检数量/停产数）</td>
          <td>覆盖率（企业数量/已检数量/未检数量）</td>
          <td>覆盖率（企业数量/已检数量/未检数量）</td>
          <td>覆盖率（企业数量/已检数量/未检数量）</td>
        </tr>
      </thead>
      <colgroup>
        <col style="width: 100px" />
        <col />
      </colgroup>
      <tbody id="table-body">
        <tr v-for="(item, idx) in Data" :key="idx">
          <td class="text-center tableStyle">
            {{getAreaName(item.xzqhdm) }}
          </td>
          <td class="text-center tableStyle" :title="getAreaName(item.xzqhdm)+' | '+lbqyTitle[0]+' | '+'覆盖率（企业数量/已检数量/未检数量/停产数）'">
            <span v-if="item.ypscqyNum">{{ Tools.numberFormat(0 != item.ypscqyNum ? (item.ypscqyYjNum * 100) / item.ypscqyNum : 0, 2) }}%（</span>
            <span v-else>100%（</span>
            <a-button type="link" class="!px-1" @click="toPzListPage(item, '6', '0',item.ypscqyNum,'1')">{{ item.ypscqyNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '6', '1',item.ypscqyYjNum,'1')">{{ item.ypscqyYjNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '6', '11',isNull(item.ypscqyNum-item.ypscqyYjNum),'1')">{{ isNull(item.ypscqyNum-item.ypscqyYjNum) }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '6', '99',item.ypscqytcNum,'0')">{{ item.ypscqytcNum }}</a-button>
            ）
          </td>
          <td class="text-center tableStyle" :title="getAreaName(item.xzqhdm)+' | '+lbqyTitle[1]+' | '+'覆盖率（企业数量/已检数量/未检数量）'">
            <span v-if="item.yljgzjsNum"> {{ Tools.numberFormat(0 != item.yljgzjsNum ? (item.yljgzjsYjNum * 100) / item.yljgzjsNum : 0, 2) }}% （</span>
            <span v-else>100%（</span>
            <a-button type="link" class="!px-1" @click="toPzListPage(item, '7', '0',item.yljgzjsNum,'1')">{{ item.yljgzjsNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '7', '1',item.yljgzjsYjNum,'1')">{{ item.yljgzjsYjNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '7', '11',isNull(item.yljgzjsNum-item.yljgzjsYjNum),'1')">{{ isNull(item.yljgzjsNum-item.yljgzjsYjNum) }}</a-button>
            ）
          </td>
          <td class="text-center tableStyle" :title="getAreaName(item.xzqhdm)+' | '+lbqyTitle[2]+' | '+'覆盖率（企业数量/已检数量/未检数量）'"> 
            <span v-if="item.ybcNum">{{ Tools.numberFormat(0 != item.ybcNum ? (item.ybcYjNum * 100) / item.ybcNum : 0, 2) }}% （</span>
            <span v-else>100%（</span>
            <a-button type="link" class="!px-1" @click="toPzListPage(item, '201020', '0',item.ybcNum,'1')">{{ item.ybcNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '201020', '1',item.ybcYjNum,'1')">{{ item.ybcYjNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '201020', '11',isNull(item.ybcNum-item.ybcYjNum),'1')">{{ isNull(item.ybcNum-item.ybcYjNum) }}</a-button>
            ）
          </td>
          <td class="text-center tableStyle" :title="getAreaName(item.xzqhdm)+' | '+lbqyTitle[3]+' | '+'覆盖率（企业数量/已检数量/未检数量）'">
            <span v-if="item.yyflNum"> {{ Tools.numberFormat(0 != item.yyflNum ? (item.yyflYjNum * 100) / item.yyflNum : 0, 2) }}% （</span>
            <span v-else>100%（</span>
            <a-button type="link" class="!px-1" @click="toPzListPage(item, '201021', '0',item.yyflNum,'1')">{{ item.yyflNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '201021', '1',item.yyflYjNum,'1')">{{ item.yyflYjNum }}</a-button>
            / <a-button type="link" class="!px-1" @click="toPzListPage(item, '201021', '11',isNull(item.yyflNum-item.yyflYjNum),'1')">{{ isNull(item.yyflNum-item.yyflYjNum) }}</a-button>
            ）
            <div :class="item.showZsDetail ? '' : 'hidden'" class="inline">
              （<span>{{ item.scsl }}</span
              >/<span>{{ item.fhsl }}</span
              >/<span>{{ item.shsl }}</span
              >）
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-scjd">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const lbqyTitle=["药品生产企业","医疗机构制剂室","药包材生产企业","药用辅料生产企业"];
const go = useGo();
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const Data = ref([]);
const bodyEl = ref<ElRef>(null);
function loadData(params = { year: currentYear.value }) {
  defHttp.get({ url: '/jc/yw/jdjc/ypscjdByArea', params: params }).then((res) => {
    Data.value = (res || []).map((i) => {
      i.showZsDetail = false;
      return i;
    });
  });
}

function isNull(text){
    if(!text)return "0";
    return text;
}

function getAreaName(text) {
  return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|州|土家族苗族自治州)$/g, '分局');
}

function onExportXls(){
    Tools.downloadExcel('药品生产监督检查覆盖总体情况', Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table')));
}

function toPzListPage(item, zslx, isYj,num,sczk) {
  let qy = { year: currentYear.value, xzdm: item.xzqhdm, zslx:zslx, isYj: isYj,num:num,sczk:sczk };
    go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoQyDetail', query: qy });
}

function toWorkloadPage(query) {
    go({ path: '/jgyw/jdjc/xcjcqk', query });
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.item {
  white-space: nowrap;
}
.tableStyle {
  width: 100px;
}
</style>