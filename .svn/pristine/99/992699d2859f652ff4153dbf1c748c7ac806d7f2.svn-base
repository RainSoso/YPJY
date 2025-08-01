<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4">全省{{ zslxObj.label }}医药代表备案情况汇总表</h2>
    
        <div class="flex items-center justify-between mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
             </a-select>
               <a-radio-group v-model:value="zslx" :options="zslxArray" name="radioGroup" @change="() => loadData()" style="width: 30%"/>
             <div style="width: 50%"></div>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <table class="my-table !table-auto table-body">
            <thead>
                <tr class="text-center">
                    <th>辖区</th>
                    <th>{{ zslxObj.jc }}数</th>
                    <th>未填报{{ zslxObj.jc }}数</th>
                    <th>已填报{{ zslxObj.jc }}数</th>
                    <th>有签约医药代表的{{ zslxObj.jc }}数</th>
                    <th>签约医药代表数</th>
                    <th>已备案医药代表数</th>
                    <th>未备案医药代表数</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(item, idx) in Data" :key="idx">
                    <td class="text-center">
                        {{ getAreaName(item) }}
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toQyList({ fjqhdm: item.xzqhdm })">
                            {{ item.qys }}
                        </a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toQyList({ fjqhdm: item.xzqhdm, yydbBabz: 'N' })">
                            {{ item.qys - item.qysl }}
                        </a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toBaqkList({ fjqhdm: item.xzqhdm })">
                            {{ item.qysl || 0 }}
                        </a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toBaqkList({ fjqhdm: item.xzqhdm, hasYydb: 'Y' })">
                            {{ item.qyqysl || 0 }}
                        </a-button>
                    </td>
                    <td class="text-center">
                        {{ item.qydbsl || 0 }}
                    </td>
                    <td class="text-center">
                        {{ item.ybasl || 0 }}
                    </td>
                    <td class="text-center">
                        {{ item.wbgsl || 0 }}
                    </td>
                    <td class="text-center">
                        {{ item.bz }}
                    </td>
                </tr>
                <tr>
                    <td class="text-center">合计</td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toQyList()">{{ qys }}</a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toQyList({ yydbBabz: 'N' })">{{ wbzs }}</a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toBaqkList()"> {{ qy }}</a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toBaqkList({ hasYydb: 'Y' })">{{ qynum }}</a-button>
                    </td>
                    <td class="text-center">{{ qydbnum }}</td>
                    <td class="text-center">{{ ybanum }}</td>
                    <td class="text-center">{{ wbgnum }}</td>
                    <td class="text-center">备案率{{ Tools.numberFormat(Math.min(0 != qydbnum ? ybanum * 100 / qydbnum : 0, 100), 2) }}%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="zdjg-tsyp-jdjcArea">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const go = useGo();
const currentYear = ref(Tools.getCurrentYear() - 1);
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const bodyEl = ref<ElRef>(null);
const zslxArray = ref([{ label: '药品上市许可持有人', jc: '持有人', value: '201010' }, { label: '药品生产企业', jc: '生产企业', value: '6' }]);
const zslx = ref<string>('201010');
const zslxObj = computed<Partial<{ label: string, jc: string, value: string }>>(() => {
    let array = zslxArray.value.filter(item => zslx.value == item.value);
    return 0 < array.length ? array[0] : {};
});
const Data = ref([]);
const qy = ref(0); const qynum = ref(0); const qydbnum = ref(0); const ybanum = ref(0); const wbgnum = ref(0); const qys = ref(0); const wbzs = ref(0);
function loadData(params = { year: currentYear.value, isJc: false, zslx: zslx.value }) {
    defHttp.get({ url: '/ndbg/drugsBaqk/baqkcount', params: params }).then((res) => {
        Data.value = (res.list || []).map(i => { i.showZsDetail = false; return i; });
        qy.value = res.qy;
        qys.value = res.qyzs;
        wbzs.value = res.wbzs;
        qynum.value = res.qynum;
        qydbnum.value = res.qydbnum;
        ybanum.value = res.ybanum;
        wbgnum.value = res.wbgnum;
    });
};

function getAreaName(item) {
    return item ? item.xzqhdm === '429000' ? '汉江分局' : getTextByCode(item.xzqhdm).replace(/(市|土家族苗族自治州|州)$/g, '分局') : '';
}
function toQyList(query = {}) {
    Object.assign(query, { year: currentYear.value + 1, zslx: zslx.value });
    go({ path: zslx.value == '6' ? '/yqyd/ypsc' : '/yqyd/cyr', query });
}
function toBaqkList(query = {}) {
    Object.assign(query, { zsYear: currentYear.value, zslx: zslx.value });
    go({ path: '/ndbg/baqk', query });
}

function onExportXls() {
    Tools.downloadExcel(`全省${zslxObj.value.label}医药代表备案情况汇总表`, Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table')));
}

loadData();

</script>

<style lang="less" scoped>
.item {
    white-space: nowrap;
}

.table-body {
    border-collapse: initial;
}
</style>