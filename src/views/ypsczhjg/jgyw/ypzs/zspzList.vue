<template>
    <div>
        <BasicTable @register="registerTable" class="my-basic-table">
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
            <template #tableTitle>
                <h2 class="text-lg pl-2">
                    <span>{{ route.query.tabTitle }}</span>
                    <span v-if="route.query.recordNum">（共{{ route.query.recordNum }}项）</span>
                </h2>
            </template>
        </BasicTable>
    </div>
</template>

<script lang="ts" name="jgyw-ypzs-zsqk" setup>
import { createVNode } from 'vue';
import { useRoute } from 'vue-router';
import { Button } from 'ant-design-vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { BasicTable, BasicColumn, FormSchema, TableAction } from '/@/components/Table';
import { useListPage } from '/@/hooks/system/useListPage';
import Tools from '/@/utils/tools';
import { columnRender } from '/@/utils/dict/dictUtils';

const go = useGo();
const route = useRoute();
const { tableContext } = useListPage({
    tableProps: {
        showIndexColumn: true,
        showTableSetting: true,
        rowKey: 'yppzwh',
        api(params) {
            return defHttp.get({ url: '/jc/pz/yppz/list', params });
        },
        columns: ((lx): BasicColumn[] => {
            let res: Array<BasicColumn> = [{
                dataIndex: 'yppzwh', title: '药品批准文号', width: 280, align: 'center'
              
            }, {
                dataIndex: 'yptymc', title: '药品通用名', width: 200
            }, {
                dataIndex: 'jx', title: '剂型', width: 180
            }, {
                dataIndex: 'zszt', title: '追溯状态', width: 100 ,customRender: ({ text, record }) => columnRender('yppzZszt', text, null, ({ item }) => {
                if (item.value === '1' || item.value === '2') {
                Tools.goToZsPreview(record.yppzwh, item.value);
                }
              })
            }, {
                dataIndex: 'sczk', title: '生产状态', width: 100 ,customRender: ({ text }) => columnRender('yppzSczk', text)
            }, {dataIndex: 'cyrmc', title: '药品持有人', width: 300, align: 'center', customRender({ record }) {
                    return { props: { rowSpan: record.cyrRowSpan }, children: record.cyrmc };
           }}
        ];
            return res;
        })(route.query.lx),
        formConfig: {
            labelWidth: 80,
            schemas: ((lx): FormSchema[] => {
                return [{
                    field: 'yptymc', label: '药品通用名', component: 'JInput'
                },{field: 'cyrmc', label: '药品持有人', component: 'JInput'}];
            })(route.query.lx),
            autoSubmitOnEnter: true,
            showAdvancedButton: false,
        },
        actionColumn: { width: 70 },
        defSort: { column: 'cyrshxydm,yppzwh', order: 'asc' },
        afterFetch(data) {
            Tools.calcRowSpan(data, (item) => item.cyrmc, 'cyrRowSpan');
            return data;
        },
        beforeFetch(params) {
            if (route.query?.fjqhdm) params.xzqhdm = route.query.fjqhdm;
            if (route.query?.zszt) params.zszt = route.query.zszt;
            if (route.query?.tags) params.tags = '*,' + route.query.tags + '*';
            if (route.query?.pzfw) params.pzfw = route.query.pzfw == '201010'?'1':'6';
            return params;
        }
    }
});

const [registerTable] = tableContext;

function toPzDetial(record) {
    go(`/ypyd/detail/${encodeURIComponent(record.yppzwh || '')}`);
}

function getTableAction(record) {
    return [{
        label: '详情', onClick: toPzDetial.bind(null, record)
    }]
}
</script>

<style lang="less" scoped>
:deep {
    .qyxx {
        text-indent: -4em;
        padding-left: 4em;
    }

    .qyxx-btn {
        padding: 0;
        height: unset;
        white-space: unset;
        border-width: 0;
        text-align: left;
        vertical-align: top;
    }
}
</style>