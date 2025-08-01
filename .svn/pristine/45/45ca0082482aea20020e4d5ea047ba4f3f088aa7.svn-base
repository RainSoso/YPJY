<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4 !mb-0">{{ pageInfo.title }}</h2>
        <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <table class="my-table !table-auto">
            <thead>
                <tr class="text-center">
                    <th rowspan="3">姓名</th>
                    <th rowspan="3">总人次</th>
                    <th colspan="8">检查类型</th>
                </tr>
                <tr class="text-center">
                    <th rowspan="2">常规检查</th>
                    <th rowspan="2">专项检查</th>
                    <th rowspan="2">许可检查</th>
                    <th colspan="2">含GMP符合性检查</th>
                    <th rowspan="2">有因检查</th>
                    <th rowspan="2">药物警戒检查</th>
                    <th rowspan="2">其他检查</th>
                </tr>
                <tr class="text-center">
                    <th>上市前</th>
                    <th>上市后</th>
                </tr>
            </thead>
            <tbody id="table-body" v-if="Data && 0 < Data.length">
                <tr v-for="(item, idx) in Data" :key="idx" class="text-center">
                    <td>{{ item.userName }}</td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId })">{{ item.cyrc || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, jcxs: '0101' })">{{ item.jccs0101 || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, jcxs: '0201' })">{{ item.jccs0201 || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, jcxs: '9901' })">{{ item.jccs9901 || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, sfhgpgssq: '1' })">{{ item.jccsGmpSsq || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, sfhgpgssh: '1' })">{{ item.jccsGmpSsh || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, jcxs: '9902' })">{{ item.jccs9902 || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, jcxs: '9904' })">{{ item.jccs9904 || 0 }}</a-button></td>
                    <td><a-button type="link" class="!px-1" @click="toDetails({ jcrId: item.userId, jcxs: '9903' })">{{ item.jccs9903 || 0 }}</a-button></td>
                </tr>
            </tbody>
            <tfoot v-else>
                <tr>
                    <td colspan="10" class="text-center !p-4">暂无记录</td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-xcjcqk-@orgId-@year">
import { ref, computed, onBeforeMount, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import { omit } from 'lodash-es';
import { useLoading } from '/@/components/Loading';
import { useGo } from '/@/hooks/web/usePage';
import { useTabs } from '/@/hooks/web/useTabs';
import { defHttp } from '/@/utils/http/axios';
import { TableProps, default as Tools } from '/@/utils/tools';
import { getDictText, getCategoryText } from '/@/utils/dict/JDictSelectUtil';

const go = useGo();
const route = useRoute();
const { setTitle } = useTabs();
const pageInfo = computed(() => {
    let zslx = route.query?.zslx,
        zslxName = zslx && getDictText('qyTjxxZslx', zslx) || '';
    if (zslxName) zslxName += zslx == '7' ? '室' : ((zslx == '6' ? '' : '生产') + '企业');
    return {
        orgId: route.params?.orgId, orgName: route.query?.orgName || '', year: route.params?.year || route.query?.year || Tools.getCurrentYear()
        , title: `${route.query?.orgName || ''}${zslxName}${qyTagsName.value}监督检查工作量统计表`, zslxName
    };
});
const qyTagsName = ref('');
const currentYear = ref(parseInt(pageInfo.value.year + '', 10));
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const Data = ref([]);
const bodyEl = ref<ElRef>(null);
const [openLoading, closeLoading] = useLoading({ target: bodyEl, props: { tip: '加载中...', absolute: true } });
const reqParams = computed(() => {
    let params = { year: currentYear.value, orgId: pageInfo.value.orgId };
    if (route.query?.zslx) params.zslx = route.query?.zslx;
    if (route.query?.qyTags) params.qyTags = route.query?.qyTags;
    return params;
});
if (route.query?.qyTags) {
    getCategoryText(route.query?.qyTags).then(res => {
        qyTagsName.value = res;
        refresh();
    });
}

onBeforeMount(refresh);
onActivated(refresh);

function refresh() {
    setTitle(`${pageInfo.value.orgName}${pageInfo.value.zslxName}${qyTagsName.value}检查工作量统计(${currentYear.value})`);
}

function loadData(params = reqParams.value) {
    if (!params.orgId) return;
    openLoading();
    defHttp.get({ url: '/jc/yw/jdjc/ypscGzlByUser', params }).then((res) => {
        Data.value = (res || []);
        closeLoading();
    });
};

function onExportXls() {
    let array: Array<TableProps> = Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table'));
    if (!array || 1 > array.length) return;
    array[0].title = pageInfo.value.title;
    Tools.downloadExcel(array[0].title, array);
}

function toDetails(params = {}) {
    go({ path: '/jgyw/jdjc/jgjl', query: { ...omit(reqParams.value, 'orgId'), jcrOrgId: pageInfo.value.orgId, ...params } });
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.item {
    white-space: nowrap;
}
</style>