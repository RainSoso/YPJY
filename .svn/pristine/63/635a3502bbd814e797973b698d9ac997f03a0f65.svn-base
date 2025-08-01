<template>
    <div id="container" ref="chartRef"></div>
</template>
<script lang="ts" setup name="dashboard-homePage-my-highcharts">
import { ref, onMounted } from 'vue';
// import Highcharts from 'highcharts/highstock';
// import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsDrilldown from 'highcharts/modules/drilldown';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import Venn from 'highcharts/modules/venn';
import Tools from '/@/utils/tools';

const props = defineProps({
    options: {
        type: Object,
        default: {}
    }
});
const chartRef = ref<HTMLDivElement | null>(null);

// HighchartsMore(Highcharts);
// HighchartsDrilldown(Highcharts);
// Highcharts3D(Highcharts);
// Venn(Highcharts);

onMounted(() => {
    veenChart(props.options);
});

function veenChart(options) {
    let names = {}, getNames = (array) => {
        let res: Array<any> = [];
        array.forEach(item => {
            res.push(names[item] || item);
        });
        return res;
    };
    options.series[0].data.forEach((item) => {
        if (item.sets.length == 1) names[item.sets[0]] = item.name || item.sets[0];
        else if (1 < item.sets.length) item.name = item.value + '';
    });
    /*Highcharts.chart(chartRef.value, Tools.deepMerge({
        title: { text: '' },
        tooltip: {
            backgroundColor: '#F8F8F8', // 鼠标悬停 饼图提示 的 背景颜色
            // borderColor: 'red', // 鼠标悬停 饼图提示 的 边框颜色
            borderRadius: 10, // 鼠标悬停 饼图提示 的 边框圆角
            borderWidth: 1, //鼠标悬停 饼图提示 的 边框宽度
            shadow: false, // 是否显示阴影
            animation: true, // 鼠标划过 是否启用动画效果
            stickyTracking: false,
            style: { fontSize: '12px', fontWeight: 'blod', fontFamily: 'Courir new' },
            formatter() {
                let _this: any = this;
                return (
                    '<span style="color: ' + _this.point.color + '">标题：</span> ' + getNames(_this.point.sets).join(',') + '<br/>' +
                    '<span style="color: ' + _this.point.color + '">交集数据：</span> ' + _this.point.value
                );
            }
        },
        colors: ['#37A2DA', '#67E0E3', '#9FE6B8', '#FFDB5C', '#FF9F7F', '#F44A3D', '#E7BCF3', '#8B2D78'],
        credits: {
            enabled: false, // 禁用版权信息
        },
        // series: [
        //     {
        //         type: 'venn',
        //         data: [
        //             { sets: ['建筑结构隐患'], value: 523 },
        //             { sets: ['消防安全隐患'], value: 523 },
        //             { sets: ['综合整治隐患'], value: 523 },
        //             { sets: ['建筑结构隐患', '消防安全隐患'], value: 124, name: '124' },
        //             { sets: ['建筑结构隐患', '综合整治隐患'], value: 124, name: '124' },
        //             { sets: ['消防安全隐患', '综合整治隐患'], value: 124, name: '124' },
        //             { sets: ['消防安全隐患', '综合整治隐患', '建筑结构隐患'], value: 12, name: '12' },
        //         ],
        //     },
        // ]
    }, options));*/
}
</script>