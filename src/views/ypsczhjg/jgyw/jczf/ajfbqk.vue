<template>
    <div class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4">案件地市分布情况</h2>
        <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
        </div>
        <table class="my-table !table-auto">
            <thead>
                <tr class="text-center">
                    <th>年度</th>
                    <th>辖区</th>
                    <th>处罚总次数</th>
                    <th>较大（重大）案件数</th>
                    <th>一般案件数</th>
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
                        <a-button type="link" class="!px-1" @click="toListPage(item, '0')"> {{ item.jczfnum
                            }}</a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toListPage(item, 'Y')"> {{ item.zdAj }}</a-button>
                    </td>
                    <td class="text-center">
                        <a-button type="link" class="!px-1" @click="toListPage(item, 'N')">{{ item.jczfnum - item.zdAj
                            }}</a-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="zdjg-jcpz-jdjcArea">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const go = useGo();
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const Data = ref([]);

function loadData(params = { year: currentYear.value }) {
    defHttp.get({ url: '/jy/zfcf/ajjbxx/ajfbqk', params: params }).then((res) => {
        Data.value = (res || []).map(i => { i.showZsDetail = false; return i; });
    });
};

function getAreaName(text) {
    return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|土家族苗族自治州)$/g, '分局');
}

function toListPage(item, iszd) {
    go({ path: '/jczf/dqqk', query: { year: item.year, xzqhdm: item.xzqhdm, iszd: iszd } });
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.item {
    white-space: nowrap;
}
</style>