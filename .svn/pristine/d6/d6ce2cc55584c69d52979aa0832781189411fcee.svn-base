<script setup>
import * as echarts from 'echarts';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';
const go = useGo();
const year = new Date().getFullYear();

const props = defineProps({
  viewData: {
    type: Object,
    default: () => ({
      b: 1,
      showQylx: 'pf',
      czqyPfData: {},
      czqyLszbData: {}
    })
  }
});
// 持证企业分类
const pieChartDOM = ref(null);
let pieChart = null
let initChart = (option) => { }
const createOption = () => {
  const option = {
    title: {
      text: '企业分类',
      left: 0,
      textStyle: {
        fontSize: 16 * props.viewData.b,
        fontWeight: 'bold'
      }
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      // left: '50%',
      right: 0,
      top: 'center',
      icon: 'circle',
      itemWidth: 16 * props.viewData.b,
      itemHeight: 16 * props.viewData.b,
      itemGap: 14 * props.viewData.b,
      formatter: function (name) {
        // 找到对应的数据项
        const dataItem = option.series[0].data.find(item => item.name === name);
        // 使用富文本的表格布局实现右对齐
        return '{name|' + name + '}{value|' + dataItem.value + '}';
      },
      textStyle: {
        rich: {
          name: {
            fontSize: 14 * props.viewData.b,
            width: 130 * props.viewData.b,
            align: 'left',
          },
          value: {
            fontSize: 14 * props.viewData.b,
            align: 'right',
          }
        }
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '68%'],
        center: ['26%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5 * props.viewData.b,
          borderColor: '#fff',
          borderWidth: 2 * props.viewData.b,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 24 * props.viewData.b,
            fontWeight: 'bold',
            formatter: '{c}',
          }
        },
        labelLine: {
          show: false,
        },
        data: props.viewData.showQylx === 'pf' ?
          (props.viewData?.czqyPfData?.categoryList || []) :
          (props.viewData?.czqyLszbData?.categoryList || []),
      }
    ]
  }

  return option;
};

const barChartDOM = ref(null);
let barChart = null
let initBarChart = (option) => { }
const createBarOption = () => {
  const option = {
    title: {
      text: '药品追溯',
      left: 0,
      textStyle: {
        fontSize: 16 * props.viewData.b,
        fontWeight: 'bold',
      }
    },
    xAxis: {
      type: 'category',
      data: props.viewData.showQylx === 'pf' ? (
        props.viewData?.czqyPfData?.ypzsInfo?.map(item => item.name) || []
      ) : (
        props.viewData?.czqyLszbData?.ypzsInfo?.map(item => item.name) || []
      ),
      axisLabel: {
        fontSize: 14 * props.viewData.b,
        color: '#333',
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: "dotted",
        }
      },
      axisLabel: {
        fontSize: 12 * props.viewData.b,
        color: '#333',
      },
    },
    series: [
      {
        data: props.viewData.showQylx === 'pf' ? (
          props.viewData?.czqyPfData?.ypzsInfo?.map(item => item.value) || []
        ) : (
          props.viewData?.czqyLszbData?.ypzsInfo?.map(item => item.value) || []
        ),
        type: 'bar',
        barWidth: 40 * props.viewData.b,
        itemStyle: {
          borderRadius: 6 * props.viewData.b,
          color: function (params) {
            const gradientColors = [
              { start: '#FF9D2590', end: '#FFCD8B90' },
              { start: '#31C08090', end: '#98DFBE90' },
              { start: '#5088FF90', end: '#88BCFF90' }
            ];

            const colorSet = gradientColors[params.dataIndex % gradientColors.length];

            return {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: colorSet.start },
                { offset: 1, color: colorSet.end }
              ]
            };
          }
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 10 * props.viewData.b,
          color: '#333'
        },
      }
    ],
    grid: {
      left: 20 * props.viewData.b,      // 左边距
      right: 20 * props.viewData.b,     // 右边距
      top: 60 * props.viewData.b,       // 上边距
      bottom: 0,    // 下边距
      containLabel: true // 是否包含坐标轴标签
    }
  };

  return option;
};

onMounted(() => {
  initChart = (option) => {
    if (pieChart) {
      pieChart.dispose(); // 销毁之前的实例
    }
    pieChart = echarts.init(pieChartDOM.value)

    pieChart.setOption(option)
  }

  initBarChart = (option) => {
    if (barChart) {
      barChart.dispose(); // 销毁之前的实例
    }
    barChart = echarts.init(barChartDOM.value)

    barChart.setOption(option)
  }
})

watch(() => props.viewData.showQylx, (val) => {
  initChart(createOption())
  initBarChart(createBarOption())
})

watch(() => [props.viewData.czqyPfData.categoryList,
props.viewData.czqyLszbData.categoryList],
  ([pfData, lszbData]) => {
    // 检查数据是否已加载
    if ((props.viewData.showQylx === 'pf' && pfData) ||
      (props.viewData.showQylx === 'lszb' && lszbData)) {
      nextTick(() => {
        initChart(createOption());
      });
    }
  }
);

watch(() => [props.viewData.czqyPfData.ypzsInfo,
props.viewData.czqyLszbData.ypzsInfo],
  ([pfData, lszbData]) => {
    // 检查数据是否已加载
    if ((props.viewData.showQylx === 'pf' && pfData) ||
      (props.viewData.showQylx === 'lszb' && lszbData)) {
      nextTick(() => {
        initBarChart(createBarOption());
      });
    }
  }
)

const nav = type => {
  if (type === 4) {
    // 抽检不合格
    go({ path: `/ypjy/homePage/cybhg/${props.viewData.showQylx === 'pf' ? '11' : '18'}/${year - 1}/${props.viewData.areaCode}/cybhg` });
  } else if (type === 5) {
    // 执法处罚
    go({ path: `/ypjy/homePage/ndzfcf/${props.viewData.showQylx === 'pf' ? '11' : '18'}/${year - 1}/${props.viewData.areaCode}/cybhg` });
  }
}
</script>

<template>
  <div class="box2 column">
    <div class="row box-header">
      <span class="title">持证企业</span>
      <div class="row header-box">
        <span :class="`header-left ${viewData.showQylx === 'pf' ? 'header-active' : ''}`"
          @click="viewData.showQylx = 'pf'">批发企业</span>
        <span :class="`header-right ${viewData.showQylx === 'lszb' ? 'header-active' : ''}`"
          @click="viewData.showQylx = 'lszb'">连锁总部企业</span>
      </div>
    </div>
    <div class="row box2-content">
      <div class="qyfl" ref="pieChartDOM"></div>
      <div class="jcqk column">
        <span class="jcqk-title">检查情况</span>
        <div class="row">
          <img src="/src/assets/images/vimg/check-icon1.svg" alt="">
          <div class="column">
            <div class="row" @click="nav(1)">
              <span class="jcqk-item">检查次数</span>
              <span class="jcqk-item">{{ viewData.showQylx === 'pf' ?
                (viewData?.czqyPfData?.checkInfo?.checkNum || 0) : (viewData?.czqyLszbData?.checkInfo?.checkNum ||
                  0) }}家</span>
            </div>
            <div class="row" @click="nav(2)">
              <span class="jcqk-item">检查不合格</span>
              <span class="jcqk-item">{{ viewData.showQylx === 'pf' ?
                (viewData?.czqyPfData?.checkInfo?.checkUnqualified || 0) :
                (viewData?.czqyLszbData?.checkInfo?.checkUnqualified || 0) }}家</span>
            </div>
            <div class="row" @click="nav(3)">
              <span class="jcqk-item">检查企业</span>
              <span class="jcqk-item">{{ viewData.showQylx === 'pf' ?
                (viewData?.czqyPfData?.checkInfo?.checkEnterprise || 0) :
                (viewData?.czqyLszbData?.checkInfo?.checkEnterprise || 0) }}家</span>
            </div>
          </div>
        </div>
        <div class="row">
          <img src="/src/assets/images/vimg/check-icon2.svg" alt="">
          <div class="column">
            <div class="row" @click="nav(4)">
              <span class="jcqk-item">抽检不合格</span>
              <span class="jcqk-item">{{ viewData.showQylx === 'pf' ?
                (viewData?.czqyPfData?.checkInfo?.checkSpotUnqualified || 0) :
                (viewData?.czqyLszbData?.checkInfo?.checkSpotUnqualified || 0) }}家</span>
            </div>
            <div class="row" @click="nav(5)">
              <span class="jcqk-item">执法处罚</span>
              <span class="jcqk-item">{{ viewData.showQylx === 'pf' ?
                (viewData?.czqyPfData?.checkInfo?.checkPunishment || 0) :
                (viewData?.czqyLszbData?.checkInfo?.checkPunishment || 0) }}家</span>
            </div>
            <div class="row" @click="nav(6)">
              <span class="jcqk-item">许可即将过期</span>
              <span class="jcqk-item">{{ viewData.showQylx === 'pf' ?
                (viewData?.czqyPfData?.checkInfo?.checkExpire || 0) :
                (viewData?.czqyLszbData?.checkInfo?.checkExpire || 0) }}家</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ypzs" ref="barChartDOM"></div>
    </div>
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

.title {
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-style: Bold;
  font-size: 1.041667vw;
  line-height: 1.354167vw;
  letter-spacing: 0%;
  vertical-align: middle;
}

.box-header {
  height: 1.354167vw;
  gap: 0;
  justify-content: space-between;
  align-items: flex-start;

  .header-box {
    // width: 8.958333vw;
    height: 1.25vw;
    gap: 0;

    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: Regular;
    font-size: 0.729167vw;
    line-height: 1.145833vw;
    vertical-align: middle;

    cursor: pointer;

    .header-left {
      border-width: 0.052083vw 0 0.052083vw 0.052083vw;
      padding: 0 0.416667vw;
      border-style: solid;
      border-color: #4E84FE;
      color: #4E84FE;
    }

    .header-right {
      border-width: 0.052083vw 0.052083vw 0.052083vw 0;
      padding: 0 0.416667vw;
      border-style: solid;
      border-color: #4E84FE;
      color: #4E84FE;
    }

    .header-active {
      background-color: #4E84FE;
      color: #fff;
    }
  }
}

.box2 {
  width: 51vw;
  height: 18.5vw;
  border-radius: 1.25vw;
  background-color: #fff;
  padding: 0.833333vw;

  .box2-content {
    flex: 1;

    .qyfl {
      width: 20vw;
    }

    .jcqk {
      flex: 1;

      .jcqk-title {
        font-family: Source Han Sans CN;
        font-weight: 700;
        font-style: Bold;
        font-size: 0.833333vw;
        line-height: 1.25vw;
        letter-spacing: 0%;
      }

      &>.row {
        img {
          width: 1.666667vw;
          height: 1.666667vw;
        }

        &>.column {
          flex: 1;
          gap: 0;

          &>.row {
            gap: 0;
            justify-content: space-between;
            border: 0.052083vw solid #EAF0FC;
            margin-top: -0.052083vw;
            padding: 0.416667vw;

            .jcqk-item {
              font-family: Source Han Sans CN;
              font-weight: 400;
              font-style: Regular;
              font-size: 0.729167vw;
              line-height: 1.145833vw;
              letter-spacing: 0%;
              vertical-align: middle;
            }

            &>span:first-child {
              color: #6C7176;
            }
          }
        }
      }
    }

    .ypzs {
      flex: 1;
    }
  }
}
</style>