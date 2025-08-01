<template>
    <div class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4">辖区生物制品监管情况</h2>
        <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <table class="my-table !table-auto">
            <thead>
                <tr class="text-center">
                    <th rowspan="2">年度</th>
                    <th rowspan="2">辖区</th>
                    <th>监督检查</th>
                    <th>抽检验</th>
                    <th colspan="2">药品追溯</th>
                </tr>
                <tr class="text-center">
                    <th>完成率（应检/已检/未检）</th>
                    <th>完成率（应抽/已抽/未抽）</th>
                    <th>追溯率（应追溯/已追溯/未追溯）</th>
                    <th>扫码率（生产/发货/收货）</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(item, idx) in Data" :key="idx">
                    <td class="text-center">
                        {{ item.year }}
                    </td>
                    <td class="text-center">
                        {{ getAreaName(item.xzqhdm) }}
                    </td>
                    <td class="text-center">
                        {{ Tools.numberFormat(0 != item.pzNum ? item.jcNum * 100 / item.pzNum : 0, 2) }}%
                        （
                        <a-button type="link" class="!px-1" @click="toPzListPage(item)">{{ item.pzNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, '已检查', { jdjczt: '1' })">{{
                                item.jcNum
                        }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, '未检查', { jdjczt: '0' })">{{
                                item.pzNum - item.jcNum
                        }}</a-button>
                        ）
                    </td>
                    <td class="text-center">
                        {{ Tools.numberFormat(0 != item.pzNum ? item.cjyNum * 100 / item.pzNum : 0, 2) }}%
                        （
                        <a-button type="link" class="!px-1" @click="toPzListPage(item)">{{ item.pzNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, '已抽检验', { cjyzt: '1' })">{{
                                item.cjyNum
                        }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, '未抽检验', { cjyzt: '0' })">{{
                                item.pzNum - item.cjyNum
                        }}</a-button>
                        ）
                    </td>
                    <td class="text-center">
                        {{ Tools.numberFormat(0 != item.pzNum ? item.zsNum * 100 / item.pzNum : 0, 2) }}%
                        （
                        <a-button type="link" class="!px-1" @click="toPzListPage(item)">{{ item.pzNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, '已追溯', { zszt: '1' })">{{
                                item.zsNum
                        }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, '未追溯', { zszt: '0' })">{{
                                item.pzNum - item.zsNum
                        }}</a-button>
                        ）
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="item.showZsDetail=!item.showZsDetail">
                            {{ Tools.numberFormat(0 != item.fhsl ? item.shsl * 100 / item.fhsl : 0, 2) }}%
                        </a-button>
                        <div :class="item.showZsDetail?'':'hidden'" class="inline">
                            （<span>{{ item.scsl }}</span>/<span>{{ item.fhsl }}</span>/<span>{{ item.shsl }}</span>）
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="zdjg-tsyp-swzpArea">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const go = useGo();
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(()=>Tools.getYearArray(currentYear.value));
const Data = ref([]);

function loadData(params = { year: currentYear.value, isJc: 'swzp' }) {
    defHttp.get({ url: '/report/zdjg/jcpz/jdjcWcqkByArea', params: params }).then((res) => {
        Data.value = (res || []).map(i => { i.showZsDetail = false; return i; });
    });
};

function getAreaName(text) {
    return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|土家族苗族自治州)$/g, '分局');
}

function toPzListPage(item, tagTitle = '', query = {}) {
    go({ path: '/zdjg/swzp/pzxx', query: { scAreaCode: item.xzqhdm, year: currentYear.value, tagTitle: getAreaName(item.xzqhdm) + (tagTitle ? ' - ' + tagTitle : '') + ' - 生物制品', ...query } });
}

function onExportXls() {
    let link = document.createElement("a");
    link.href = 'data:application/vnd.ms-excel;charset=utf-8,\ufeff' + encodeURIComponent(function () {
        let header = ['年度', '辖区', '监督检查完成率（应检/已检/未检）', '抽检验完成率（应抽/已抽/未抽）', '药品追溯率（应追溯/已追溯/未追溯）', '扫码率'],
            body: string[] = [];
        document.getElementById('table-body')?.querySelectorAll('tr').forEach((tr: HTMLElement) => {
            let row: string[] = [];
            tr.querySelectorAll('td').forEach((td: HTMLElement) => {
                row.push(td.innerText || '');
            });
            body.push(row.join(','));
        });
        return header.join(',') + '\r\n' + body.join('\r\n');
    }());

    link.download = '辖区生物制品监管情况.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.item {
    white-space: nowrap;
}
</style>