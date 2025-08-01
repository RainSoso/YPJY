<template>
    <div v-bind="$attrs" class="ant-card-loading-content" v-if="loading">
        <a-row :gutter="8" v-for="item in innerData">
            <a-col v-for="span in item" :span="span">
                <div class="ant-card-loading-block"></div>
            </a-col>
        </a-row>
    </div>
    <template v-else>
        <slot />
    </template>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { propTypes } from '/@/utils/propTypes';

const props = defineProps({
    loading: propTypes.bool.def(true),
    maxLine: propTypes.number.def(0),
    data: propTypes.array.def([])
});
const innerData = computed(() => {
    let array = !!props.data?.length ? props.data : [[22], [8, 15], [6, 18], [13, 9], [4, 3, 16]];
    if (0 < props.maxLine && props.maxLine < array.length) array.splice(props.maxLine, array.length - props.maxLine);
    return array;
});
</script>