<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4 !mb-0">
            <span>{{ pageInfo.title }}</span>
        </h2>
        <div class="absolute right-8 top-12">
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" class="hidden"> 导出</a-button>
        </div>
        <table class="my-table !table-auto table-body outline">
            <thead style="position:sticky;top:var(--header-height);z-index:1;">
                <tr class="text-center">
                    <th rowspan="2">省份</th>
                    <th colspan="3">委托省外</th>
                    <th colspan="3">受托省外</th>
                </tr>
                <tr class="text-center">
                    <th>本省企业（家）</th>
                    <th>外省企业（家）</th>
                    <th>委托品种数（个）</th>
                    <th>外省企业（家）</th>
                    <th>本省企业（家）</th>
                    <th>受托品种数（个）</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(item, idx) in Data.data || []" :key="idx" class="text-center">
                    <td>{{ getAreaName(item) }}</td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.sn_wt || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.sw_st || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.wt_pz || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.sw_wt || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.sn_st || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item)">
                            {{ item.st_pz || 0 }}
                        </a-button>
                    </td>
                </tr>
                <tr class="text-center">
                    <td>合计</td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.sn_wt || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.sw_st || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.wt_pz || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.sw_wt || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.sn_st || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage">
                            {{ Data.total?.st_pz || 0 }}
                        </a-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="jgyw-xzxk-wtswqk">
import { computed, ref } from 'vue';
import { useLoading } from '/@/components/Loading';
import { useGo } from '/@/hooks/web/usePage';
import { defHttp } from '/@/utils/http/axios';
import { TableProps, default as Tools } from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const go = useGo();
const pageInfo = computed(() => {
    return {
        title: `药品生产企业委托/受托省外生产情况统计表`
    };
});
const Data = ref({ data: [], total: {} });
const bodyEl = ref<ElRef>(null);
const [openLoading, closeLoading] = useLoading({ target: bodyEl, props: { tip: '加载中...', absolute: true } });

function getAreaName(item) {
    return getTextByCode(item.areaCode);
}

function loadData(params = {}) {
    openLoading();
    defHttp.get({ url: '/jc/zs/ypscxk/queryWtswqk', params }).then((res) => {
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
        areaName = item ? getAreaName(item) : '省外', local = '湖北省',
        tabTitle = ['', local + '委托' + areaName + '生产的企业', areaName + '受托' + local + '生产的企业', local + '委托' + areaName + '生产的品种'
            , areaName + '委托' + local + '生产的企业', local + '受托' + areaName + '生产的企业', local + '受托' + areaName + '生产的品种'][column];
    params = { path: '/jgyw/xzxk/scfs', query: { lx: column > 3 ? 10 : 7, tabTitle, recordNum: $td.innerText, ...(item ? { refXzqhdm: item.areaCode } : {}) } };
    go(params);
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped></style>