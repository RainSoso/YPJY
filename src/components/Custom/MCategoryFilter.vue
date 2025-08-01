<template>
    <div class="flex items-start">
        <a-space :wrap="true" v-if="0 < selected.length">
            <a-tag v-for="(item, idx) in selected" :key="item.key" class="xl cursor-pointer" :color="item.color"
                @click="onClose(idx)">
                {{ item.title }}
                <a-icon icon="ant-design:close-outlined" />
            </a-tag>
        </a-space>
        <div class="leading-7" v-else>点击标签过滤</div>
        <div class="mx-2 leading-7">|</div>
        <a-space :wrap="true">
            <a-tag v-for="item in dataArray" :key="item.key" class="xl cursor-pointer" :color="item.color"
                @click="onClick(item)">
                {{ item.title }}
                <a-icon icon="ant-design:plus-square-outlined" v-if="!item.leaf" />
                <a-icon icon="ant-design:check-circle-outlined" v-else-if="item.code == currentTag" />
            </a-tag>
        </a-space>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { loadTreeData } from '/@/api/common/api';
import { isArray, isFunction } from '/@/utils/is';
import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
    name: 'MCategoryFilter',
    props: {
        value: propTypes.oneOfType([propTypes.string, propTypes.array]),
        pcode: propTypes.string.def(''),
        condition: propTypes.string.def(''),
        forceTags: propTypes.oneOfType([propTypes.string, propTypes.array])
    },
    emits: ['update:value', 'change'],
    setup(props, { emit }) {
        const selected = ref<any[]>([]);
        const dataArray = ref<any[]>([]);
        const currentTag = ref('');
        const cache = {};

        watch([() => props.value, () => props.pcode, () => props.condition], () => {
            let val = isArray(props.value) && 0 < props.value.length ? props.value[0] : props.value;
            if (!val) {
                selected.value = [];
                currentTag.value = '';
            }
        }, { immediate: true });
        watch(() => selected.value, () => {
            if (0 < selected.value.length) loadData(selected.value[selected.value.length - 1]);
            else loadRoot();
            tiggerChange();
        }, { deep: true });
        watch(() => props.forceTags, () => {
            selected.value = [];
            currentTag.value = '';
            loadRoot();
        });

        loadRoot();

        function loadRoot(cb: any = null) {
            loadData({ code: !props.pcode ? '0' : props.pcode }, cb);
        }

        function loadData(parent, cb: any = null) {
            let key = parent.code + ':' + props.condition, filter = (array) => {
                let limits = isArray(props.forceTags) ? props.forceTags : (props.forceTags && [props.forceTags] || []);
                if (1 > limits.length) return array;
                return array.filter(item => {
                    for (let i = 0; i < limits.length; i++) {
                        if (limits[i].startsWith(item.code || '') || (item.code || '').startsWith(limits[i])) return true;
                    }
                    return false;
                });
            };
            if (cache[key]) {
                dataArray.value = filter(cache[key]);
                isFunction(cb) && cb(cache[key]);
            } else {
                loadTreeData({
                    pcode: parent.code, condition: props.condition,
                }).then((res) => {
                    dataArray.value = filter(res);
                    cache[key] = res;
                    isFunction(cb) && cb(dataArray.value);
                });
            }
        }

        function tiggerChange(item: any = null) {
            if (!item && 0 < selected.value.length) item = selected.value[selected.value.length - 1];
            emit('change', item && [item] || []);
            emit('update:value', item && item.code || '');
        }

        return {
            selected,
            dataArray,
            currentTag,
            onClick(item) {
                if (!item.leaf) {
                    selected.value.push(item);
                    currentTag.value = '';
                    tiggerChange(item);
                } else {
                    if (item.code != currentTag.value) {
                        currentTag.value = item.code;
                        tiggerChange(item);
                    } else {
                        currentTag.value = '';
                        tiggerChange();
                    }
                }
            },
            onClose(idx) {
                if (1 > selected.value.length) return;
                selected.value.splice(idx, selected.value.length - idx);
            }
        };
    }
});
</script>

<style scoped>
:deep(.ant-tag) {
    display: flex;
    align-items: center;
}

:deep(.ant-tag .app-iconify) {
    margin-left: 3px;
}
</style>