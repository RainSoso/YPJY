<template>
    <div ref="chartRef"></div>
</template>
<script lang="ts" setup name="dashboard-homePage-my-echarts">
import { Ref, onMounted, ref, watch } from 'vue';
import { useECharts } from '/@/hooks/web/useECharts';

const props = defineProps({
    options: {
        type: Object,
        default: {}
    }
});
const emit = defineEmits(['inited', 'callback']);
const isFirst = ref(true);

const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

function realod(options) {
    setOptions(options, true, (chart) => {
        if (isFirst.value) {
            emit('inited', chart);
            isFirst.value = false;
        }
        emit('callback', chart);
    });
}

onMounted(() => {
    realod(props.options);
});
watch(() => props.options, () => {
    realod(props.options);
});
</script>