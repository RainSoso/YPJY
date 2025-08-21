<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';
const props = defineProps({
  viewData: {
    type: Object,
    default: () => ({
      licenseChangeList: [],
      b: 1
    })
  }
})

// 许可变更监控
const licenseBarChartDOM = ref(null)
let licenseBarChart = null
let initLicenseBarChart = (option) => { }
const createLicenseBarOption = () => {
  const option = {
    title: {
      text: '抽检验',
      left: 0,
      textStyle: {
        fontSize: 14 * props.viewData.b,
        fontWeight: 'bold'
      }
    },
    xAxis: {
      type: 'value',
      position: 'top',
      axisLabel: {
        fontSize: 12 * props.viewData.b,
        color: '#000'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dotted"
        }
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: props.viewData?.licenseChangeList?.map(item => item.name) || [],
      axisLabel: {
        fontSize: 12 * props.viewData.b,
        color: '#000'
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dotted"
        }
      },
    },
    series: [
      {
        data: props.viewData?.licenseChangeList?.map(item => item.value) || [],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: '#D6DBED66',  // 设置背景色
        },
        barWidth: 32 * props.viewData.b,
        itemStyle: {
          borderRadius: 8 * props.viewData.b,
          color: '#8979FFC0'
        },
        label: {
          show: true,
          position: 'right',
          fontSize: 10 * props.viewData.b,
          color: '#000'
        },
      }
    ],
    grid: {
      left: 30 * props.viewData.b,           // 左边距
      right: 30 * props.viewData.b,      // 右边距
      top: 40 * props.viewData.b,        // 上边距
      bottom: 0,          // 下边距
      containLabel: true  // 是否包含坐标轴标签
    }
  };

  return option;
};
onMounted(() => {
  initLicenseBarChart = (option) => {
    if (licenseBarChart) {
      licenseBarChart.dispose(); // 销毁之前的实例
    }
    licenseBarChart = echarts.init(licenseBarChartDOM.value)
    licenseBarChart.setOption(option)
  }


  nextTick(() => {
    initLicenseBarChart(createLicenseBarOption())
  })
})
</script>
<template>
  <div class="liceseBarChart" ref="licenseBarChartDOM"></div>
</template>
<style lang="less" scoped>
.liceseBarChart {
  flex: 1;
}
</style>