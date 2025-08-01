<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4 !mb-0">{{ pageInfo.title }}</h2>
        <div class="absolute right-8 top-12">
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" class="hidden"> 导出</a-button>
        </div>
        <table class="my-table !table-auto table-body outline">
            <thead style="position:sticky;top:var(--header-height);z-index:1;">
                <tr class="text-center">
                    <th rowspan="2">辖区</th>
                    <th colspan="3">辖区内有产线的企业</th>
                    <th colspan="2">辖区内注册的企业</th>
                    <th colspan="3">委托情况</th>
                    <th colspan="3">受托情况</th>
                </tr>
                <tr class="text-center">
                    <th>企业总数</th>
                    <th>辖区外注册</th>
                    <th>纯自产</th>
                    <th>企业总数</th>
                    <th>纯委托</th>
                    <th>企业总数</th>
                    <th>委托省外</th>
                    <th>委托省内</th>
                    <th>企业总数</th>
                    <th>受托省外</th>
                    <th>受托省内</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(item, idx) in Data.data || []" :key="idx" class="text-center">
                    <td>{{ getAreaName(item) }}</td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.scQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.ydzcQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.wwtstQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.zcQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.cwtQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.wtQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.wtSwQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.wtSnQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.stQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.stSwQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.stSnQys || 0 }}
                        </a-button>
                    </td>
                </tr>
                <tr class="text-center">
                    <td>合计</td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.scQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.ydzcQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.wwtstQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.zcQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.cwtQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.wtQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.wtSwQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.wtSnQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.stQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.stSwQys || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.stSnQys || 0 }}
                        </a-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-2 font-600">
            注：有产线的企业指药品生产许可证中含有自产及受托地址在省内的企业，注册的企业指省内注册的药品生产企业。
        </div>
    </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-xcjcqk">
import { computed, ref } from 'vue';
import { useLoading } from '/@/components/Loading';
import { useGo } from '/@/hooks/web/usePage';
import { defHttp } from '/@/utils/http/axios';
import { TableProps, default as Tools } from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const go = useGo();
const pageInfo = computed(() => {
    return {
        title: `药品生产企业委托及归属情况统计表`
    };
});
const currentYear = ref(Tools.getCurrentYear());
const Data = ref({ data: [], total: {} });
const bodyEl = ref<ElRef>(null);
const [openLoading, closeLoading] = useLoading({ target: bodyEl, props: { tip: '加载中...', absolute: true } });

function getAreaName(item) {
    return item ? item.areaCode === '429000' ? '汉江分局' : getTextByCode(item.areaCode).replace(/(市|土家族苗族自治州|州)$/g, '分局') : '';
}

function loadData(params = {}) {
    openLoading();
    defHttp.get({ url: '/jc/zs/ypscxk/queryXkzQygs', params }).then((res) => {
        if (res) Data.value = res;
        closeLoading();
    });
};

function onExportXls() {
    let array: Array<TableProps> = Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table'));
    if (!array || 1 > array.length) return;
    array[0].title = pageInfo.value.title;
    Tools.downloadExcel(array[0].title, array);
}

function toDetailPage(e, item = null) {
    let $td = Tools.getParentElem(e, 'td'), column = Tools.indexOf(Tools.getParentElem(e, 'tr').children, $td), params,
        tabTitle = ['', '有产线的企业', '有产线，辖区外注册的企业', '纯自产的企业', '注册企业', '纯委托的企业', '委托生产的企业', '委托省外生产的企业', '委托省内生产的企业', '受托生产的企业', '受托省外生产的企业', '受托省内生产的企业'][column];
    if (item) tabTitle = getAreaName(item) + '辖区内' + tabTitle;
    else tabTitle = '全省' + tabTitle;
    if (column == 4) {
        params = { path: '/yqyd/ypsc', query: { zslx: 6, year: currentYear.value, tabTitle, ...(item ? { fjqhdm: item.areaCode } : {}) } };
    } else {
        params = { path: '/jgyw/xzxk/scfs', query: { lx: column, tabTitle, recordNum: $td.innerText, ...(item ? { fjqhdm: item.areaCode } : {}) } };
    }
    go(params);
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
</style>