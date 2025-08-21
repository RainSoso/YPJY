<script setup>
import * as echarts from 'echarts';
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';
const props = defineProps({
  viewData: {
    type: Object,
    default: () => ({
      b: 1,
      taskStorageData: {
        list: [],
        info: []
      },
    })
  }
})

// 委托储运监控
const taskStorageChartDOM = ref(null)
let taskStorageChart = null
let initTaskStorageChart = (option) => { }
const createTaskStorageOption = () => {
  const series = [{
    data: props.viewData.taskStorageData.list?.map(item => item.insideProvince) || [],
    type: 'bar',
    stack: 'a',
    name: '省内',
    itemStyle: {
      color: '#5DCD9BC0'
    },
    barWidth: 48 * props.viewData.b,
    label: {
      show: true,
      position: 'right',
      fontSize: 10 * props.viewData.b
    },
  },
  {
    data: props.viewData.taskStorageData.list?.map(item => item.outsideProvince) || [],
    type: 'bar',
    stack: 'a',
    name: '省外',
    itemStyle: {
      color: '#8587FFC0'
    },
    barWidth: 48 * props.viewData.b,
    label: {
      show: true,
      position: 'right',
      fontSize: 10 * props.viewData.b
    },
  },
  ];
  const stackInfo = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack;
      if (!stackName) {
        continue;
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: []
        };
      }
      const info = stackInfo[stackName];
      const data = series[j].data[i];
      if (data && data !== '-') {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i].stack];
    for (let j = 0; j < series[i].data.length; ++j) {
      const isEnd = info.stackEnd[j] === i;
      const topBorder = isEnd ? 8 * props.viewData.b : 0;
      const bottomBorder = isEnd ? 0 : 8 * props.viewData.b;
      data[j] = {
        value: data[j],
        itemStyle: {
          borderRadius: [topBorder, topBorder, bottomBorder, bottomBorder]
        }
      };
    }
  }
  const option = {
    title: {
      text: '委托运输概况',
      left: 0,
      textStyle: {
        fontSize: 14 * props.viewData.b,
        fontWeight: 'bold'
      }
    },
    xAxis: {
      type: 'category',
      data: props.viewData.taskStorageData.list?.map(item => item.name) || [],
      textStyle: {
        fontSize: 12 * props.viewData.b
      },
      axisTick: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: "dotted"
        }
      },
      textStyle: {
        fontSize: 12 * props.viewData.b
      }
    },
    legend: {
      icon: 'circle',
      top: 46 * props.viewData.b,
      textStyle: {
        fontSize: 12 * props.viewData.b
      }
    },
    series: series,
    grid: {
      left: 10 * props.viewData.b,      // 左边距
      right: 10 * props.viewData.b,      // 右边距
      top: 80 * props.viewData.b,        // 上边距
      bottom: 0,          // 下边距
      containLabel: true  // 是否包含坐标轴标签
    }
  };

  return option;
};
onMounted(() => {
  initTaskStorageChart = (option) => {
    if (taskStorageChart) {
      taskStorageChart.dispose(); // 销毁之前的实例
    }
    taskStorageChart = echarts.init(taskStorageChartDOM.value)

    taskStorageChart.setOption(option)
  }

  nextTick(() => {
    initTaskStorageChart(createTaskStorageOption())
  })
})
</script>
<template>
  <div class="row storeBox">
    <div ref="taskStorageChartDOM" class="storeBarChart"></div>
    <ul class="column taskStorageTable">
      <li v-for="item in (viewData.taskStorageData?.info || [])" class="row">
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
.row {
  display: flex;
  flex-direction: row;
  gap: 0.833334vw;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 0.833334vw;
}

.storeBox {
  flex: 1;
  gap: 2vw;

  &>.storeBarChart {
    width: 15vw;
    height: 100%;
  }

  &>.taskStorageTable {
    flex: 1;
    border: 0.052083vw solid #EAF0FC;
    gap: 0;
    margin: 0;

    &>.row {
      flex: 1;
      border-bottom: 1px solid #EAF0FC;
      padding: 0 0.625vw;
      justify-content: space-between;
      align-items: center;

      &>span {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-style: Regular;
        font-size: 0.729167vw;
        line-height: 1.145833vw;
        letter-spacing: 0%;
      }
    }

    &>.row:last-child {
      border-bottom: none;
    }

    &>.row:nth-child(2n) {
      background-color: #EAF0FC;
    }
  }
}
</style>