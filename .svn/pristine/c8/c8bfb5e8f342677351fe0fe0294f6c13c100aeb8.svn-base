<template>
    <div>
        <JSelectBiz @handleOpen="handleOpen" :loading="loadingEcho" v-bind="attrs"></JSelectBiz>
        <MPopupModal @register="regModal" @getSelectResult="setValue" v-bind="getBindValue" />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, reactive, watch, provide, unref } from 'vue';
import { BasicTableProps } from '/@/components/Table';
import { propTypes } from '/@/utils/propTypes';
import { useModal } from '/@/components/Modal';
import { useAttrs } from '/@/hooks/core/useAttrs';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';
import JSelectBiz from './base/JSelectBiz.vue';
import MPopupModal from './modal/MPopupModal.vue';
import { isArray, isNullOrUnDef } from '/@/utils/is';
import Tools from '/@/utils/tools';

export default defineComponent({
    name: 'JPopup',
    components: {
        JSelectBiz,
        MPopupModal
    },
    inheritAttrs: false,
    props: {
        value: propTypes.oneOfType([propTypes.string, propTypes.array]),/* 回传后台的值 */
        //回传value字段名
        rowKey: propTypes.string.def('id'),
        //生产value字段值的方法
        rowKeyFun: propTypes.func,
        //回传文本字段名
        labelKey: propTypes.oneOfType([propTypes.string.def('name'), propTypes.func]),
        width: propTypes.oneOfType([propTypes.number, propTypes.string]).def(1200),
        isRadioSelection: propTypes.bool.def(true),

        modalTitle: propTypes.string.def(''),
        tableProps: Object as PropType<BasicTableProps>
    },
    emits: ['change'],
    setup(props) {
        const emitData = ref<any[]>([[], false]);
        //注册model
        const [regModal, { openModal }] = useModal();
        //表单值
        const [state] = useRuleFormItem(props, 'value', 'change', emitData);
        //下拉框选项值
        const selectOptions = ref([]);
        //下拉框选中值
        let selectValues = reactive({
            value: [],
            change: false
        });
        // 是否正在加载回显数据
        const loadingEcho = ref<boolean>(false);
        //下发 selectOptions,xxxBiz组件接收
        provide('selectOptions', selectOptions);
        //下发 selectValues,xxxBiz组件接收
        provide('selectValues', selectValues);
        //下发 loadingEcho,xxxBiz组件接收
        provide('loadingEcho', loadingEcho);

        const attrs = useAttrs();

        watch(() => props.value, () => {
            emitData.value = [[], false];
            let value = props.value;
            if (!isArray(value) && value != 'null' && value != 'undefined') {
                value = isNullOrUnDef(value) ? '' : (value + '');
                if (value) state.value = value.split(',');
                else selectValues.value = [];
            } else if (isArray(value)) {
                selectValues.value = value as Array<never>;
            }
        });

        watch(selectValues, () => {
            if (selectValues) {
                if (selectValues.change) {
                    emitData.value[1] = true;
                    state.value = selectValues.value;
                }
                let str = ',' + selectValues.value.join(',') + ',';
                selectOptions.value = selectOptions.value.filter(item => 0 <= str.indexOf(',' + item.value + ','));
                if (selectValues.change) selectValues.change = false;
            }
        });

        function handleOpen() {
            openModal(true);
        }

        function setValue(options, values) {
            emitData.value = [options, true];
            selectOptions.value = options;
            state.value = values;
        }

        const getBindValue = Tools.deepMerge({}, unref(props), unref(attrs));

        return {
            attrs,
            getBindValue,
            loadingEcho,

            regModal,
            handleOpen,
            setValue
        };
    }
});
</script>

<style lang="less" scoped></style>