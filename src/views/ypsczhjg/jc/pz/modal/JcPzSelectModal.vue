<!--品种选择框-->
<template>
    <BasicModal v-bind="$attrs" @register="register" :title="modalTitle" width="70%" wrapClassName="j-user-select-modal"
        @ok="handleOk" destroyOnClose @visible-change="visibleChange">
        <BasicTable :columns="columns" :useSearchForm="true" :formConfig="formConfig" :api="getJcPzList"
            :searchInfo="searchInfo" :rowSelection="rowSelection" :indexColumnProps="indexColumnProps"
            v-bind="getBindValue"></BasicTable>
    </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import type { FormProps } from '/@/components/Form';
import { list as getJcPzList } from '/@/views/ypsczhjg/ypyd/gcyppz/JcPzYpzcscjy.api';
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import { useSelectBiz } from '/@/components/Form/src/jeecg/hooks/useSelectBiz';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { selectProps } from '/@/components/Form/src/jeecg/props/props';

export default defineComponent({
    name: 'PositionSelectModal',
    components: {
        BasicModal,
        BasicTable: createAsyncComponent(() => import('/@/components/Table/src/BasicTable.vue'), {
            loading: true,
        }),
    },
    props: {
        ...selectProps,
        //选择框标题
        modalTitle: {
            type: String,
            default: '药品品种选择',
        },
    },
    emits: ['register', 'getSelectResult'],
    setup(props, { emit }) {
        //注册弹框
        const [register, { closeModal }] = useModalInner(() => {
            rowSelection.selectedRowKeys.value = [];
        });
        const attrs = useAttrs();
        //表格配置
        const config = {
            canResize: false,
            bordered: true,
            size: 'small',
            rowKey: 'yppzwh',
            labelKey: 'yptymc',
            showIndexColumn: false,
            beforeFetch(params) {
                if (params.fw == '1') {
                    delete params.shxydm;
                    params.cyrshxydm = props.params.shxydm;
                } else {
                    params.shxydm = props.params.shxydm;
                }
                delete params.fw;
                return params;
            }
        };
        const getBindValue = Object.assign({}, unref(props), unref(attrs), config);
        const [{ rowSelection, visibleChange, indexColumnProps, getSelectResult }] = useSelectBiz(getJcPzList, getBindValue);
        const searchInfo = ref({ ...props.params });
        //查询form
        const formConfig: FormProps = {
            labelWidth: 110,
            showAdvancedButton: false,
            actionColOptions: { span: 6 },
            schemas: [{
                label: '药品批准文号', field: 'yppzwh', component: 'JInput', colProps: { span: 7 }
            }, {
                label: '药品通用名', field: 'yptymc', component: 'JInput', colProps: { span: 6 }
            }, {
                label: '范围', labelWidth: 80, field: 'fw', component: 'Select', defaultValue: '2',
                componentProps: {
                    allowClear: false,
                    options: [{ label: '注册品种', value: '1' }, { label: '生产品种', value: '2' }]
                }, colProps: { span: 5 }
            }]
        };
        //定义表格列
        const columns = [{
            title: '药品批准文号', dataIndex: 'yppzwh', width: 170
        }, {
            title: '药品通用名', dataIndex: 'yptymc'
        }, {
            title: '规格', dataIndex: 'ypgg'
        }, {
            title: '剂型', dataIndex: 'bzjx', width: 120
        }];
        function handleOk() {
            getSelectResult((options, values) => {
                emit('getSelectResult', options, values);
                closeModal();
            });
        }
        return {
            handleOk,
            getJcPzList,
            searchInfo,
            register,
            visibleChange,
            getBindValue,
            formConfig,
            indexColumnProps,
            columns,
            rowSelection
        };
    },
});
</script>

<style lang="less" scoped>

</style>
  