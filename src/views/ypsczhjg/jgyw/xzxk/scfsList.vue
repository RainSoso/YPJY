<template>
    <div>
        <BasicTable @register="registerTable" class="my-basic-table">
            <template #action="{ record }">
                <TableAction :actions="getTableAction(record)" />
            </template>
            <template #tableTitle>
                <h2 class="text-lg pl-2">
                    <span>{{ route.query.tabTitle }}</span>
                    <span v-if="route.query.recordNum">（共{{ route.query.recordNum }}家）</span>
                </h2>
            </template>
        </BasicTable>
        <YpscxkSffsModel @register="registerModal"></YpscxkSffsModel>
    </div>
</template>

<script lang="ts" name="jgyw-xzxk-scfs" setup>
import { createVNode } from 'vue';
import { useRoute } from 'vue-router';
import { Button } from 'ant-design-vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { BasicTable, BasicColumn, FormSchema, TableAction } from '/@/components/Table';
import { useModal } from '/@/components/Modal';
import { useListPage } from '/@/hooks/system/useListPage';
import Tools from '/@/utils/tools';
import YpscxkSffsModel from '/@/views/ypsczhjg/jgyw/xzxk/modules/YpscxkSffsModel.vue';

const go = useGo();
const route = useRoute();
const [registerModal, { openModal }] = useModal();
const { tableContext } = useListPage({
    tableProps: {
        showIndexColumn: true,
        showTableSetting: true,
        rowKey: 'compositeId',
        api(params) {
            return defHttp.get({ url: '/jc/zs/ypscxk/scfsList', params });
        },
        columns: ((lx): BasicColumn[] => {
            let onClick = (record) => () => toQyDetial({ shxydm: record.zsShxydm, qymc: record.zsQymc, record }),
                onClickRef = (record) => () => toQyDetial({ shxydm: record.refCompId, qymc: record.refQymc, record }),
                res: Array<BasicColumn> = [{
                    dataIndex: 'zsQymcaddrDetail', title: '生产地址', align: 'left', customRender({ record }) {
                        return { props: { rowSpan: record.dzRowSpan }, children: record.proType == '2' ? record.refCompAddr : record.addrDetail };
                    }
                }, {
                    dataIndex: 'workshop', title: '车间', width: 180
                }, {
                    dataIndex: 'preparation', title: '生产线', width: 180
                }];
            if (0 <= ',1,2,9,10,11,'.indexOf(',' + lx + ',')) {
                res.splice(0, 0, {
                    dataIndex: 'zsQymc', title: (0 <= ',1,2,'.indexOf(',' + lx + ',') ? '企业名称/' : '') + '受托企业', customRender({ record }) {
                        return { props: { rowSpan: record.zsQyRowSpan }, children: createVNode(Button, { type: 'link', class: 'qyxx-btn', onClick: onClick(record) }, () => record.zsQymc || '') };
                    }
                }, {
                    dataIndex: 'refQymc', title: '委托企业', customRender({ record }) {
                        return { props: { rowSpan: record.qyRowSpan }, children: /^42+/.test(record.refXzqhdm) ? createVNode(Button, { type: 'link', class: 'qyxx-btn', onClick: onClickRef(record) }, () => record.refQymc || '') : record.refQymc }
                    }
                });
            }
            if (0 <= ',3,'.indexOf(',' + lx + ',')) {
                res.splice(0, 0, {
                    dataIndex: 'zsQymc', title: '企业名称', customRender({ record }) {
                        return { props: { rowSpan: record.zsQyRowSpan }, children: createVNode(Button, { type: 'link', class: 'qyxx-btn', onClick: onClick(record) }, () => record.zsQymc || '') };
                    }
                });
            }
            if (0 <= ',4,5,6,7,8,'.indexOf(',' + lx + ',')) {
                res.splice(0, 0, {
                    dataIndex: 'zsQymc', title: '委托企业', customRender({ record }) {
                        return { props: { rowSpan: record.zsQyRowSpan }, children: createVNode(Button, { type: 'link', class: 'qyxx-btn', onClick: onClick(record) }, () => record.zsQymc || '') };
                    }
                }, {
                    dataIndex: 'refQymc', title: '受托企业', customRender({ record }) {
                        return { props: { rowSpan: record.qyRowSpan }, children: /^42+/.test(record.refXzqhdm) ? createVNode(Button, { type: 'link', class: 'qyxx-btn', onClick: onClickRef(record) }, () => record.refQymc || '') : record.refQymc }
                    }
                });
            }
            if (0 <= ',1,2,3,'.indexOf(',' + lx + ',')) {
                res.push({
                    dataIndex: 'productionScope', title: '生产范围', width: 180, customRender({ text, record }) {
                        return record.proType == '1' ? text : record.drugName;
                    }
                });
            }
            if (0 <= ',5,6,7,8,9,10,11,'.indexOf(',' + lx + ',')) {
                res.push({
                    dataIndex: 'drugName', title: '药品通用名称', width: 180
                });
            }
            return res;
        })(route.query.lx),
        formConfig: {
            labelWidth: 80,
            schemas: ((lx): FormSchema[] => {
                if (0 <= ',1,2,'.indexOf(',' + lx + ',')) {
                    return [{
                        field: 'zsQymc', label: '企业名称/受托企业', labelWidth: 140, component: 'Input'
                    }, {
                        field: 'refQymc', label: '委托企业', component: 'Input'
                    }];
                } else if (0 <= ',5,6,7,8,'.indexOf(',' + lx + ',')) {
                    return [{
                        field: 'zsQymc', label: '委托企业', component: 'Input'
                    }, {
                        field: 'refQymc', label: '受托企业', component: 'Input'
                    }];
                } else if (0 <= ',9,10,11,'.indexOf(',' + lx + ',')) {
                    return [{
                        field: 'refQymc', label: '委托企业', component: 'Input'
                    }, {
                        field: 'zsQymc', label: '受托企业', component: 'Input'
                    }];
                }
                return [{
                    field: 'zsQymc', label: '企业名称', component: 'Input'
                }];
            })(route.query.lx),
            autoSubmitOnEnter: true,
            showAdvancedButton: false,
        },
        actionColumn: { width: 70 },
        defSort: { column: 'zsQymc,refQymc,addrdetail,protype,num', order: 'asc' },
        afterFetch(data) {
            Tools.calcRowSpan(data, (item) => item.zsQymc + (item.proType != '1' ? ',' + item.refQymc : ''), 'qyRowSpan');
            Tools.calcRowSpan(data, (item) => item.zsQymc + '', 'zsQyRowSpan');
            Tools.calcRowSpan(data, (item) => item.zsQymc + (item.proType != '1' ? ',' + item.refQymc : '') + (item.proType == '2' ? ',' + item.refCompAddr : item.addrDetail), 'dzRowSpan');
            return data;
        },
        beforeFetch(params) {
            if (route.query?.lx) params.lx = route.query.lx;
            if (route.query?.fjqhdm) params.fjqhdm = route.query.fjqhdm;
            if (route.query?.refXzqhdm) params.refXzqhdm = route.query.refXzqhdm;
            return params;
        }
    }
});

const [registerTable] = tableContext;

function toQyDetial(record) {
    go({ path: `/yqyd/ypsc/TJcQyJbxxList/${record.qymc}/${record.shxydm}` })
}

function handleDetail(record: Recordable) {
    openModal(true, {
        record, isUpdate: false, showFooter: false
    });
}

function getTableAction(record) {
    return [{
        label: '详情', onClick: handleDetail.bind(null, record)
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