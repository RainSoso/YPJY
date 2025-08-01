<template>
    <div>
        <BasicTable @register="registerTable" class="my-basic-table">
            <template #tableTitle v-if="showTags">
                <MCategoryFilter v-model:value="currentTag" :forceTags="props.forceTags" pcode="A02" @change="fastFitler" />
            </template>

            <template #yppz="{ record }">
                <a-button type="link" class="!px-0" @click="toyppz(record, '-')">{{ record.yppz }}</a-button>
                /
                <a-button type="link" class="!px-0" @click="toyppz(record, '1')">{{ record.yppzZc }}</a-button>
            </template>
            <template #rcjg="{ record }">
                <a-button type="link" @click="torcjg(record)">{{ record.jdjc }}</a-button>
            </template>
            <template #zfcf="{ record }">
                <a-button type="link" @click="tozfcf(record)">{{ record.zfcf }}</a-button>
            </template>
            <template #qymc="{ record }">
                 <a-tag color="red" v-if="record.sczk == '0'">停产</a-tag>  {{ record.qymc }}
             </template>
            <template #cy="{ record }">
                <a-button type="link" class="!px-0" @click="tocy(record, '-')">{{ record.cjy }}</a-button>
                /
                <a-button type="link" class="!px-0" @click="tocy(record, '2')" danger ghost>{{ record.cjyBhg }}
                </a-button>
            </template>
            <!--操作栏-->
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
        </BasicTable>
    </div>
</template>

<script lang="ts" name="yqyd-cyr" setup>
import { ref, computed, unref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { CheckCircleOutlined } from '@ant-design/icons-vue';
import { BasicTable, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import { propTypes } from '/@/utils/propTypes';
import { useTabs } from '/@/hooks/web/useTabs';
import { columns, getSearchFormSchema } from '/@/views/ypsczhjg/jc/TJcQyTjxx.data';
import { list, getImportUrl, getExportUrl } from '/@/views/ypsczhjg/jc/TJcQyTjxx.api';
import { useGo } from '/@/hooks/web/usePage';
import { getLikeValue } from '/@/utils/area/areaDataUtil';
import { getDictItems } from '/@/utils/dict/JDictSelectUtil';
import MCategoryFilter from '/@/components/Custom/MCategoryFilter.vue';
import Tools from '/@/utils/tools';

const props = defineProps({
    zslx: propTypes.string.def('6'),
    forceTags: propTypes.array.def([])
});

const { setTitle } = useTabs();
const route = useRoute();
if (route.query?.tagTitle) setTitle(route.query?.tagTitle + '');
//注册table数据
const { prefixCls, tableContext, onExportXls } = useListPage({
    tableProps: {
        api: list,
        columns,
        canResize: false,
        showIndexColumn: true,
        formConfig: {
            labelWidth: 80,
            schemas: getSearchFormSchema(route.query?.year),
            autoSubmitOnEnter: true,
            showAdvancedButton: false,
            autoAdvancedCol: 4,
            async resetFunc() {
                currentTag.value = '';
            }
        },
        actionColumn: {
            width: 90,
            fixed: 'right'
        },

        beforeFetch(params) {
            if (route.query?.jgqy) {
                params.jgqy = route.query?.jgqy || '';
            }
            if (route.query?.jcTags) params.jcTags = route.query?.jcTags;
            if (route.query?.jcLevels) params.jcLevels = route.query?.jcLevels;
            if (route.query?.xzqhdm){
                params.xzqhdm = route.query?.xzqhdm;
                params.year=route.query?.year;
            }
            if (route.query?.yydbBabz) params.yydbBabz = route.query.yydbBabz;
            if (route.query?.fjqhdm) params.fjqhdm = route.query.fjqhdm;
            params.zslx = '201010';
            params.xzqhdm = getLikeValue(params.xzqhdm);
            params.forceTags = unref(queryForceTags);
            if (Tools.getCurrentYear() == params.year) params.isValid = 'Y';
            delete params.column;
            delete params.order;
            return params;
        }
    },
    exportConfig: {
        name: "药品上市许可持有人",
        url: getExportUrl,
        params: { zslx: '201010' }
    },
    importConfig: {
        url: getImportUrl
    },
})

const queryForceTags = computed(() => {
    return currentTag.value || props.forceTags.join('|');
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
    go({ path: `/yqyd/ypsc/TJcQyJbxxList/${encodeURIComponent(record.qymc || '')}` + '/' + record.shxydm, query: { forceTags: unref(queryForceTags), isCyr: true } });
}
function toyppz(record: Recordable, sczk) {
    go({ path: '/ypyd/gcyppz/' + record.shxydm + '/' + sczk, query: { forceTags: unref(queryForceTags), isCyr: true } });
}

function torcjg(record: Recordable) {
    go('/yw/rcjg/' + record.shxydm);
}

function tozfcf(record: Recordable) {
    go('/yw/zfcf/' + record.shxydm);
}

function tocy(record: Recordable, jyjg) {
    go('/yw/ypcyjl/' + record.shxydm + '/' + jyjg);
}
</script>
<style scoped>

</style>
