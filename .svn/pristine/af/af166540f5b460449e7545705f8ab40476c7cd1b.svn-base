<template>
    <a-tree-select allowClear labelInValue style="width:100%" :disabled="disabled"
        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }" :placeholder="placeholder"
        :replace-fields="{ value: 'code' }" :loadData="asyncLoadTreeData" :value="treeValue" :treeData="treeData"
        :multiple="multiple" @change="onChange">
    </a-tree-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { loadTreeData, getCategoryItemByCode } from '/@/api/common/api';
import { useRuleFormItem } from '/@/hooks/component/useFormItem';
import { isArray } from '/@/utils/is';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
    name: 'MCategorySelect',
    props: {
        value: propTypes.oneOfType([propTypes.string, propTypes.array]),
        placeholder: propTypes.string.def('请选择'),
        disabled: propTypes.bool.def(false),
        condition: propTypes.string.def(''),
        multiple: propTypes.bool.def(false),
        loadTriggleChange: propTypes.bool.def(false),
        pcode: propTypes.string.def(''),
        back: propTypes.string.def('')
    },
    emits: ['options-change', 'change'],
    setup(props, { emit }) {
        const emitData = ref<any[]>([]);
        const treeData = ref<any[]>([]);
        const treeValue: any = ref([]);
        const [state] = useRuleFormItem(props, 'value', 'change', emitData);

        watch(() => props.value, () => {
            loadItemByCode();
        }, { deep: true });
        watch(() => props.pcode, () => {
            loadRoot();
        }, { deep: true, immediate: true });

        function loadRoot() {
            let param = {
                pcode: !props.pcode ? '0' : props.pcode,
                condition: props.condition,
            };
            loadTreeData(param).then((res) => {
                for (let i of res) {
                    i.value = i.key;
                    if (i.leaf == false) {
                        i.isLeaf = false;
                    } else if (i.leaf == true) {
                        i.isLeaf = true;
                    }
                }
                treeData.value = res;
            });
        }

        function loadItemByCode() {
            if (!props.value || props.value == '0' || 1 > props.value.length) {
                treeValue.value = [];
            } else {
                let val = isArray(props.value) ? props.value.join(',') : props.value;
                getCategoryItemByCode({ codes: val }).then((res) => {
                    let values = val.split(',');
                    treeValue.value = res.map((item, index) => ({
                        key: values[index],
                        value: values[index],
                        label: item.name,
                    }));
                    onLoadTriggleChange(res[0].name);
                });
            }
        }

        function onLoadTriggleChange(text) {
            //只有单选才会触发
            if (!props.multiple && props.loadTriggleChange) {
                backValue(props.value, text);
            }
        }

        function backValue(value, label) {
            let obj = {};
            if (props.back) {
                obj[props.back] = label;
            }
            emit('change', value, obj);
        }

        function asyncLoadTreeData(treeNode) {
            let dataRef = treeNode.dataRef;
            return new Promise((resolve) => {
                if (treeNode.children.length > 0) {
                    resolve(null);
                    return;
                }
                let pid = dataRef.key;
                let param = {
                    pid: pid,
                    condition: props.condition,
                };
                loadTreeData(param).then((res) => {
                    if (res) {
                        for (let i of res) {
                            i.value = i.key;
                            if (i.leaf == false) {
                                i.isLeaf = false;
                            } else if (i.leaf == true) {
                                i.isLeaf = true;
                            }
                        }
                        addChildren(pid, res, treeData.value);
                        resolve(null);
                    }
                });
            });
        }

        function addChildren(pid, children, treeArray) {
            if (treeArray && treeArray.length > 0) {
                for (let item of treeArray) {
                    if (item.key == pid) {
                        if (!children || children.length == 0) {
                            item.isLeaf = true;
                        } else {
                            item.children = children;
                        }
                        break;
                    } else {
                        addChildren(pid, children, item.children);
                    }
                }
            }
        }

        function onChange(value) {
            if (!value) {
                emit('change', '');
                treeValue.value = '';
            } else if (isArray(value)) {
                let labels: Array<string> = [];
                let values = value.map((item) => {
                    labels.push(item.label);
                    return item.value;
                });
                backValue(values.join(','), labels.join(','));
                treeValue.value = value;
            } else {
                backValue(value.value, value.label);
                treeValue.value = value;
            }
        }

        return {
            state,
            onChange,
            treeData,
            treeValue,
            asyncLoadTreeData
        };
    }
});
</script>