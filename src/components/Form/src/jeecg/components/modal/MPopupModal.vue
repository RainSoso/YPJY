<template>
    <div>
        <BasicModal v-bind="$attrs" :title="modalTitle" @register="register" @ok="handleOk" destroyOnClose
            wrapClassName="m-popup-modal" @visible-change="visibleChange">
            <BasicTable v-bind="getBindValue.tableProps" :rowSelection="rowSelection" class="my-basic-table">
            </BasicTable>
        </BasicModal>
    </div>
</template>
<script lang="ts">
import { defineComponent, unref, computed } from 'vue';
import { BasicTableProps } from '/@/components/Table';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { useSelectBiz } from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { selectProps } from '/@/components/Form/src/jeecg/props/props';
import Tools from '/@/utils/tools';

export default defineComponent({
    name: 'MPopupModal',
    components: {
        BasicModal,
        BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), { loading: true }),
    },
    inheritAttrs: false,
    props: {
        ...selectProps,
        tableProps: Object as PropType<BasicTableProps>,
        modalTitle: {
            type: String,
            default: '选择',
        }
    },
    emits: ['register', 'getSelectResult'],
    setup(props, { emit }) {
        const [register, { closeModal }] = useModalInner();
        const attrs = useAttrs();
        const getBindValue = computed(() => {
            return Tools.deepMerge({
                tableProps: {
                    useSearchForm: true,
                    bordered: true,
                    size: 'small',
                    formConfig: {
                        labelWidth: 80,
                        rowProps: { gutter: 8 },
                        autoSubmitOnEnter: true,
                        showAdvancedButton: false,
                        actionColOptions: {
                            xs: 24, sm: 12, md: 12, lg: 8, xl: 8, xxl: 6,
                            style: { textAlign: 'left' },
                        }
                    },
                    showIndexColumn: true,
                    indexColumnProps: {
                        with: 80
                    },
                    onRowDbClick(record) {
                        checkedKeys.value = [record[getBindValue.value.rowKey]];
                        selectRows.value = [record];
                        handleOk();
                    }
                },
            }, unref(props), unref(attrs), {
                tableProps: { rowKey: props.rowKey, canResize: false, showTableSetting: false, immediate: true }
            });
        });

        const [{ rowSelection, visibleChange, getSelectResult, handleDeleteSelected, checkedKeys, selectRows }] = useSelectBiz(getBindValue.value.tableProps.api, getBindValue.value);

        function handleOk() {
            getSelectResult((options, values) => {
                //回传选项和已选择的值
                emit('getSelectResult', options, values);
                //关闭弹窗
                closeModal();
            });
        }

        return {
            register,
            getBindValue,
            rowSelection,
            visibleChange,
            handleOk,

            selectRows,
            handleDeleteSelected
        };
    }
});
</script>

<style lang="less">
.m-popup-modal .scroll-container .scrollbar__wrap {
    margin-bottom: 0 !important;
}
</style>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-basic-table';

:deep(.ant-form) {
    margin: -10px -10px 0 !important;
    padding: 0 !important;
}

:deep(.ant-table-wrapper) {
    margin: 0 -10px -10px;
    padding: 0 !important;
}
</style>