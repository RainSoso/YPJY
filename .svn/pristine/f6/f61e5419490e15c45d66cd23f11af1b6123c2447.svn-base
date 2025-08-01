<template>
    <div>
        <!--引用表格-->
        <BasicTable @register="registerTable" class="my-basic-table">
            <!--插槽:table标题-->
            <template #tableTitle v-if="showTags">
                <MCategoryFilter v-model:value="currentTag" :forceTags="props.forceTags" pcode="A04"
                    @change="fastFitler" />
            </template>
            <template #form-advanceBefore>
                <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
            </template>

            <template #yppz="{ record }">
                <a-button type="link" class="!px-0" @click="toyppz(record, '-')">{{ record.yppz }}</a-button>
            </template>
            <template #rcjg="{ record }">
                <a-button type="link" @click="torcjg(record)">{{ record.jdjc }}</a-button>
            </template>
            <template #zfcf="{ record }">
                <a-button type="link" @click="tozfcf(record)">{{ record.zfcf }}</a-button>
            </template>
            <template #cy="{ record }">
                <a-button type="link" class="!px-0" @click="tocy(record, '-')">{{ record.cjy }}</a-button>
                /
                <a-button type="link" class="!px-0" @click="tocy(record, '2')" danger ghost>{{ record.cjyBhg
                    }}</a-button>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
        </BasicTable>
    </div>
</template>

<script lang="ts" name="yqyd-qylist" setup>
import { ref, computed, unref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { useTabs } from '/@/hooks/web/useTabs';
import { columns, getSearchFormSchema } from './YpjyTjxx.data';
import { ypjyList, getImportUrl, getExportUrl } from './YpjyTjxx.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import MCategoryFilter from '/@/components/Custom/MCategoryFilter.vue';
import Tools from '/@/utils/tools';

const props = defineProps({
    zslx: propTypes.string.def('18'),
    isjcgfx: propTypes.string.def(),
    columns: propTypes.array.def(undefined),
    forceTags: propTypes.array.def([])
});
const { setTitle } = useTabs();
const route = useRoute();
if (route.query?.tagTitle) setTitle(route.query?.tagTitle + '');
//注册table数据
const { prefixCls, tableContext, onExportXls } = useListPage({
    tableProps: {
        api: ypjyList,
        columns: columns || props.columns,
        canResize: false,
        showIndexColumn: true,
        formConfig: {
            labelWidth: 80,
            schemas: getSearchFormSchema(route.query?.year),
            autoSubmitOnEnter: true,
            showAdvancedButton: false,
            async resetFunc() {
                currentTag.value = '';
            }
        },
        actionColumn: {
            width: 90,
            fixed: 'right'
        },
        defSort: {
            column: '',
            order: 'desc'
        },
        beforeFetch(params) {
            if (route.params?.sj) {
                const str = route.params.sj.split(',');
                params.sj = str[0];
                params.csdm = str[1];
                delete params.zslx;
            } else {
                params.zslx = route.path?.endsWith('/yljgzjs') ? '7' : props.zslx;
                params.isjcgfx = props.isjcgfx || route.query.isjcgfx;
            }

            if (route.params?.ypqy) {
                const str = route.params.ypqy.split(',');
                params.ypqy = str[0];
                params.csdm = str[1];
            }

            if (route.params?.ypsfyc) {
                const str = route.params.ypsfyc.split(',');
                params.ypsfyc = str[0];
                params.csdm = str[1];
            }
            if (route.params?.gqzs) {
                const str = route.params.gqzs.split(',');
                params.gqzs = str[0];
                params.csdm = str[1];
            }
            if (route.params?.sjqy) {
                params.sjqy = route.params?.sjqy || '';
            }
            if (route.params?.jgqy) {
                params.jgqy = route.params?.jgqy || '';
            }
            params.xzqhdm = getLikeValue(params.xzqhdm);
            params.forceTags = unref(queryForceTags);
            if (route.query?.jcTags) params.jcTags = route.query?.jcTags;
            if (route.query?.jcLevels) params.jcLevels = route.query?.jcLevels;
            if (Tools.getCurrentYear() == params.year) params.isValid = 'Y';
            return params;
        }
    },
    exportConfig: {
        name: "药品经营企业",
        url: getExportUrl,
        params: { zt: '0', zslx: props.zslx, jgqy: route.params?.jgqy, forceTags: props.forceTags.join(','), jcTags: route.query?.jcTags, jcLevels: route.query?.jcLevels, isjcgfx: props.isjcgfx || route.query.isjcgfx }
    },
    importConfig: {
        url: getImportUrl
    },
})

const queryForceTags = computed(() => {
    return props.forceTags.join('|');
}), currentTag = ref('');
const showTags = ref(route.query?.showTags != 'false');

const go = useGo();
const [registerTable, { reload, getForm }] = tableContext;

async function fastFitler(item) {
    let val = item.length ? item[0].code : '';
    await getForm().setFieldsValue({ tags: val ? '*,' + item[0].code + '*' : '' });
    reload();
}

/**
   * 操作栏
   */
function getTableAction(record) {
    return [{
        label: '详情',
        onClick: getGo.bind(null, record),
    }]
}
function getGo(record: Recordable) {
    go({ path: `/ypjy/cdwj/CdwjQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm, query: { forceTags: unref(queryForceTags), year: record.year } });
}
function toyppz(record: Recordable, sczk) {
    go({ path: '/ypyd/gcyppz/' + record.shxydm + '/' + sczk, query: { forceTags: unref(queryForceTags), year: record.year } });
}

function torcjg(record: Recordable) {
    go({ path: '/yw/rcjg/' + record.shxydm, query: { year: record.year } });
}

function tozfcf(record: Recordable) {
    go({ path: '/yw/zfcf/' + record.shxydm, query: { year: record.year } });
}

function tocy(record: Recordable, jyjg) {
    go({ path: '/yw/ypcyjl/' + record.shxydm + '/' + jyjg, query: { year: record.year } });
}
</script>
<style scoped></style>