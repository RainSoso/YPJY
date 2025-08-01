<template>
    <BasicModal v-bind="$attrs" @register="registerModal" :loading="false" @height-change="handleHeightChange"
        @cancel="dialogHandle(false)" @ok="dialogHandle(true)">
        <div class="flex min-h-300px overflow-hidden" :style="contentStyle">
            <div class="h-full w-1/4 min-w-200px max-w-400px border-r-1px border-light-800 my-tree">
                <a-spin :spinning="treeOpts.loading" class="h-full" wrapperClassName="h-full">
                    <BasicTree v-if="!treeOpts.treeReloading" title="部门列表" toolbar search showLine :checkStrictly="true"
                        :clickRowToExpand="false" :treeData="treeOpts.data" :selectedKeys="treeOpts.selectedKeys"
                        :expandedKeys="treeOpts.expandedKeys" :autoExpandParent="treeOpts.autoExpandParent"
                        @select="treeHandle.onSelect" @expand="treeHandle.onExpand" @search="treeHandle.onSearch" />
                </a-spin>
            </div>
            <div class="flex-1 h-full w-0">
                <BasicTable @register="registerTable" :rowSelection="rowSelection" class="my-table"
                    :scroll="{ x: true, y: contentHeight - 38 - 56 - 35 }"
                    :style="{ '--table-body-height': (contentHeight - 38 - 36 - 7) + 'px' }" />
            </div>
        </div>
        <template #insertFooter>
            <a-alert type="info" show-icon class="my-alert !py-4px !px-10px !absolute">
                <template #message>
                    <template v-if="selectedRowKeys.length > 0">
                        <span>已选中 {{ selectedRowKeys.length }} 位用户(可跨页)</span>
                        <a-divider type="vertical" />
                        <a @click="setSelectedRowKeys([])">清空</a>
                        <slot name="alertAfter" />
                    </template>
                    <template v-else>
                        <span>未选中任何用户</span>
                    </template>
                </template>
            </a-alert>
        </template>
    </BasicModal>
</template>
<script lang="ts">
import { CSSProperties, computed, defineComponent, nextTick, reactive, ref, unref, toRaw } from 'vue';
import { findDepartTreeList, findUserPageList } from '/@/api/common/api';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicTable } from '/@/components/Table';
import { BasicTree } from '/@/components/Tree';
import { propTypes } from '/@/utils/propTypes';
import { useListPage } from '/@/hooks/system/useListPage';

export default defineComponent({
    components: { BasicModal, BasicTree, BasicTable },
    props: {
        multiple: propTypes.bool.def(true),
        forceOrgIds: propTypes.string
    },
    emits: ['register', 'result'],
    setup(props, { emit, attrs }) {
        const contentHeight = ref(0);
        const forceParams = computed(() => {
            return {
                forceOrgIds: props.forceOrgIds || ''
            };
        });
        const treeOpts = reactive<{ loading: boolean, treeReloading: boolean, autoExpandParent: boolean, data: any[], selectedKeys: any[], expandedKeys: any[] }>({
            loading: false, treeReloading: false, autoExpandParent: true, data: [], selectedKeys: [], expandedKeys: []
        });
        const tableOpts = reactive({ scroll: { x: true, y: 300 } });
        const contentStyle = computed((): CSSProperties => {
            return {
                height: contentHeight.value + 'px'
            };
        });
        const [registerModal, { closeModal }] = useModalInner(() => {
            treeHandle.loadData();
            setSelectedRowKeys([]);
        });

        const { tableContext, createMessage } = useListPage({
            tableProps: {
                api: findUserPageList,
                immediate: false,
                rowKey: 'id',
                columns: [{
                    title: '用户账号', dataIndex: 'username', width: 150
                }, {
                    title: '用户名称', dataIndex: 'realname', width: 180
                }, {
                    title: '部门', dataIndex: 'orgCodeTxt', width: 300
                }, {
                    title: '性别', dataIndex: 'sex_dictText', width: 80,
                }, {
                    title: '手机号', dataIndex: 'phone', width: 120,
                }],
                beforeFetch(params) {
                    params.showOrgName = true;
                    if (0 < treeOpts.selectedKeys.length) params.departId = treeOpts.selectedKeys[0];
                    return { ...params, ...unref(forceParams) };
                },
                striped: true,
                useSearchForm: true,
                formConfig: {
                    labelWidth: 80,
                    schemas: [{
                        field: 'realname', label: '用户名称', component: 'Input', colProps: { span: 10 },
                    }],
                    autoSubmitOnEnter: true,
                },
                showActionColumn: false,
                showTableSetting: false,
                bordered: true,
                showIndexColumn: true,
                canResize: false,
                rowSelection: {
                    type: props.multiple ? 'checkbox' : 'radio'
                },
                customRow(record, _) {
                    return {
                        onClick() {
                            let array = unref(selectedRowKeys), idx = array.indexOf(record.id);
                            if (0 > idx) {
                                if (props.multiple) array.push(record.id);
                                else array = [record.id];
                            } else array.splice(idx, 1);
                            setSelectedRowKeys(array);
                        }
                    };
                }
            }
        });

        const [registerTable, { reload, setSelectedRowKeys }, { rowSelection, selectedRowKeys, selectedRows }] = tableContext

        function handleHeightChange(height, maxHeight, isFullScreen) {
            contentHeight.value = Math.max(isFullScreen ? height : maxHeight, 300);
        }
        function dialogHandle(fromOk) {
            if (fromOk) {
                if (1 > selectedRowKeys.value.length) {
                    createMessage.warning('请至少选择一位用户!', 1);
                    return;
                }
            }
            emit('result', fromOk, toRaw(selectedRowKeys.value), toRaw(selectedRows.value));
            closeModal();
        }
        const listHandle = {
            reload() {
                reload();
            }
        };
        const treeHandle = {
            loadData() {
                treeOpts.loading = true;
                treeOpts.data = [];
                findDepartTreeList({ ...unref(forceParams) }, { isTransformResponse: false }).then((res) => {
                    if (res.success) {
                        if (Array.isArray(res.result)) {
                            treeOpts.data = res.result;
                            treeHandle.autoExpandParentNode();
                        }
                    } else {
                        createMessage.warning(res.message);
                    }
                }).finally(() => treeOpts.loading = false);
            },
            autoExpandParentNode() {
                let keys: Array<any> = [];
                treeOpts.data.forEach((item, index) => {
                    if (item.children && item.children.length > 0) {
                        keys.push(item.key);
                    }
                    if (index === 0) treeHandle.setSelectedKey(item.id, item);
                });
                if (keys.length > 0) {
                    treeHandle.reloadTree();
                    treeOpts.expandedKeys = keys;
                }
            },
            async reloadTree() {
                await nextTick();
                treeOpts.treeReloading = true;
                await nextTick();
                treeOpts.treeReloading = false;
            },
            setSelectedKey(key: string, _?: object) {
                treeOpts.selectedKeys = [key];
                listHandle.reload();
            },
            onSelect(selKeys, event) {
                if (selKeys.length > 0 && treeOpts.selectedKeys[0] !== selKeys[0]) {
                    treeHandle.setSelectedKey(selKeys[0], event.selectedNodes[0].props);
                } else {
                    treeHandle.setSelectedKey(treeOpts.selectedKeys[0]);
                }
            },
            onExpand(keys) {
                treeOpts.expandedKeys = keys;
                treeOpts.autoExpandParent = false;
            },
            onSearch(value: string) {
                if (value) {
                    treeOpts.loading = true;
                    findDepartTreeList({ keyword: value, myDeptSearch: '1', ...unref(forceParams) }).then((result) => {
                        if (Array.isArray(result)) {
                            treeOpts.data = result;
                        } else {
                            createMessage.warning('未查询到部门信息');
                            treeOpts.data = [];
                        }
                    }).finally(() => treeOpts.loading = false);
                } else {
                    treeHandle.loadData();
                }
            }
        };

        attrs.visible && setTimeout(() => treeHandle.loadData(), 100);

        return {
            contentHeight,
            contentStyle,
            registerModal,
            handleHeightChange,
            dialogHandle,
            treeOpts,
            treeHandle,
            tableOpts,
            registerTable,
            rowSelection,
            setSelectedRowKeys,
            selectedRowKeys
        };
    }
});
</script>
<style lang="less" scoped>
.my-tree {
    :deep(.ant-spin-container) {
        height: 100%;
    }

    :deep(.scroll-container) {
        margin-left: 10px;
        width: unset;
    }
}

.my-table {
    padding: 0;

    :deep(.ant-form) {
        padding: 6px 6px 0;
        margin: 0;

        .ant-form-item {
            margin-bottom: 6px !important;
        }
    }

    :deep(.ant-table-wrapper) {
        padding-top: 0;

        .ant-table-body {
            height: var(--table-body-height) !important;

            .ant-table-fixed {
                width: 100% !important;
            }
        }

        .ant-pagination {
            margin-top: 6px;

            .ant-pagination-options-size-changer.ant-select {
                margin-right: 0;
            }

            .ant-pagination-options-quick-jumper {
                margin-left: 8px;
            }
        }
    }
}

.my-alert {
    border-color: transparent;
    background-color: transparent;
}
</style>