<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4 !mb-0">{{ pageInfo.title }}</h2>
        <div class="flex items-center justify-between mb-4">
            <a-radio-group v-model:value="zslx" :options="zslxArray" name="radioGroup" @change="() => loadData()" />
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls" class="hidden"> 导出</a-button>
        </div>
        <table class="my-table !table-auto table-body">
            <thead>
                <tr class="text-center">
                    <th rowspan="3">辖区</th>
                    <th rowspan="3">集采药品</th>
                    <th colspan="2">生物制品</th>
                    <th colspan="5">特殊药品</th>
                </tr>
                <tr class="text-center">
                    <th rowspan="2">疫苗</th>
                    <th rowspan="2">血液制品</th>
                    <th rowspan="2">麻醉药品</th>
                    <th colspan="2">精神药品</th>
                    <th rowspan="2">放射性药品</th>
                    <th rowspan="2">医疗用毒性药品</th>
                </tr>
                <tr class="text-center">
                    <th>第一类精神药品</th>
                    <th>第二类精神药品</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(item, idx) in Data.data || []" :key="idx" class="text-center">
                    <td>{{ getAreaName(item) }}</td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A09A03',item.JCPZ)">
                            {{ item.JCPZ || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A09A03',item.kzsJCPZ)">
                           {{item.kzsJCPZ || 0}} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A09A03',item.wzsjcpz)">
                            {{item.wzsjcpz || 0}}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A05A03',item.ym)">
                            {{ item.ym || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A05A03',item.kzsym)">
                           {{ item.kzsym || 0}} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A05A03',item.wzsym)">
                            {{ item.wzsym || 0}}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A05A04',item.xyzp)">
                            {{ item.xyzp || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A05A04',item.kzsxyzp)">
                           {{ item.kzsxyzp || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A05A04',item.wzsxyzp)">
                            {{ item.wzsxyzp || 0}}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A05',item.mz)">
                            {{ item.mz || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A05',item.kzsmz)">
                           {{ item.kzsmz || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A05',item.wzsmz)">
                            {{ item.wzsmz || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A06A03',item.dyl)">
                            {{ item.dyl || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A06A03',item.kzsdyl)">
                           {{ item.kzsdyl || 0}} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A06A03',item.wzsdyl)">
                            {{ item.wzsdyl || 0}}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A06A04',item.del)">
                            {{ item.del || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A06A04',item.kzsdel)">
                           {{ item.kzsdel || 0}} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A06A04',item.wzsdel)">
                            {{ item.wzsdel || 0}}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A07',item.fsx)">
                            {{ item.fsx || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A07',item.kzsfsx)">
                           {{ item.kzsfsx || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A07', item.wzsfsx)">
                            {{ item.wzsfsx || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A03',item.yly)">
                            {{ item.yly || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A03',item.kzsyly)">
                           {{ item.kzsyly || 0 }} 
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A03',item.wzsyly)">
                            {{ item.wzsyly || 0 }}
                        </a-button>
                    </td>
                </tr>
                <tr class="text-center">
                    <td>合计</td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A09A03',Data.total?.jcnum)">
                            {{ Data.total?.jcnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A09A03',Data.total?.kzsjcnum)">
                            {{ Data.total?.kzsjcnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A09A03',Data.total?.wzsjcnum)">
                            {{ Data.total?.wzsjcnum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A05A03',Data.total?.ymnum)">
                            {{ Data.total?.ymnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A05A03',Data.total?.kzsymnum)">
                            {{ Data.total?.kzsymnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A05A03',Data.total?.wzsymnum)">
                            {{ Data.total?.wzsymnum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A05A04',Data.total?.xyzpnum)">
                            {{ Data.total?.xyzpnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A05A04',Data.total?.kzsxyzpnum)">
                            {{ Data.total?.kzsxyzpnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A05A04',Data.total?.wzsxyzpnum)">
                            {{ Data.total?.wzsxyzpnum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A05',Data.total?.mznum)">
                            {{ Data.total?.mznum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A05',Data.total?.kzsmznum)">
                            {{ Data.total?.kzsmznum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A05',Data.total?.wzsmznum)">
                            {{ Data.total?.wzsmznum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A06A03',Data.total?.dylnum)">
                            {{ Data.total?.dylnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A06A03',Data.total?.kzsdylnum)">
                            {{ Data.total?.kzsdylnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A06A03',Data.total?.wzsdylnum)">
                            {{ Data.total?.wzsdylnum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A06A04',Data.total?.delnum )">
                            {{ Data.total?.delnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A06A04',Data.total?.kzsdelnum )">
                            {{ Data.total?.kzsdelnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A06A04',Data.total?.wzsdelnum)">
                            {{ Data.total?.wzsdelnum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A07',Data.total?.fsxnum)">
                            {{ Data.total?.fsxnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A07',Data.total?.kzsfsxnum)">
                            {{ Data.total?.kzsfsxnum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A07',Data.total?.wzsfsxnum)">
                            {{ Data.total?.wzsfsxnum || 0 }}
                        </a-button>
                    </td>
                    <td>
                        <a-button type="link" class="!px-1" @click="toDetailPage($event, item,null,'A02A08A03',Data.total?.ylynum)">
                            {{ Data.total?.ylynum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'1,2','A02A08A03',Data.total?.kzsylynum)">
                            {{ Data.total?.kzsylynum || 0 }}
                        </a-button>
                        / <a-button type="link" class="!px-1" @click="toDetailPage($event, item,'0','A02A08A03',Data.total?.wzsylynum)">
                            {{ Data.total?.wzsylynum || 0 }}
                        </a-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-2 font-600">
            注：单元格内容为品种文号数/已追溯文号数/未追溯文号数
        </div>
    </div>
</template>

<script lang="ts" setup name="jgyw-ypzs-qktj">
import { computed, ref } from 'vue';
import { useLoading } from '/@/components/Loading';
import { useGo } from '/@/hooks/web/usePage';
import { defHttp } from '/@/utils/http/axios';
import { TableProps, default as Tools } from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const go = useGo();
const pageInfo = computed(() => {
    return {
        title: `药品追溯情况统计表`
    };
});
const currentYear = ref(Tools.getCurrentYear());
const Data = ref({ data: [], total: {} });
const bodyEl = ref<ElRef>(null);
const zslxArray = ref([{ label: '药品上市许可持有人', jc: '持有人', value: '201010' }, { label: '药品生产企业', jc: '生产企业', value: '6' }]);
const zslx = ref<string>('201010');
const [openLoading, closeLoading] = useLoading({ target: bodyEl, props: { tip: '加载中...', absolute: true } });

function getAreaName(item) {
    return item ? item.areaCode === '429000' ? '汉江分局' : getTextByCode(item.areaCode).replace(/(市|土家族苗族自治州|州)$/g, '分局') : '';
}

function loadData(params = {zslx: zslx.value}) {
    openLoading();
    defHttp.get({ url: '/report/ypzs/pzZsReport', params }).then((res) => {
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

function toDetailPage(e, item = null,zszt,tags,num) {
    let $td = Tools.getParentElem(e, 'td'), column = Tools.indexOf(Tools.getParentElem(e, 'tr').children, $td), params,
        tabTitle = ['', '集采药品', '疫苗', '血液制品', '麻醉药品', '第一类精神药品', '第二类精神药品', '放射性药品', '医疗用毒性药品'][column];
    if (item) tabTitle = getAreaName(item) + '辖区内' + tabTitle;
    else tabTitle = '全省' + tabTitle;
    params = { path: '/jgyw/ypzs/zsqk', query: { tabTitle, zszt:zszt,tags:tags,pzfw:zslx.value,recordNum: num, ...(item ? { fjqhdm: item.areaCode } : {}) } };
    go(params);
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.table-body {
    border-collapse: initial;
}
</style>