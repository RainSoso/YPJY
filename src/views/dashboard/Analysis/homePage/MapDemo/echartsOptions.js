import * as echarts from 'echarts';
import { setFontSize } from "./echarts.ts";
import { useMapStore } from './mapStore'

/**
 * 
 * @param {*} outdata   数据
 * @param {*} jsonData 下钻地图JSON数据
 * @param {*} tooltipShow  //是否显示tooltip
 * @param {*} mapType //地图名称  （china，湖北，北京等）
 * @returns 
 */
export function getEquipmentMapOptions(outdata, jsonData, tooltipShow, mapType, mapPointData) {
  /*获取地图数据*/
  let mapFeatures = [];

  // 获取统一管理地图要素数据
  const mapStore = useMapStore()
  let barItem = {};
  // 添加模拟数据
  jsonData.features.forEach((v) => {
    let equipmentCount = 0;
    let obj;
    let areacode = v.properties.adcode;
    barItem = mapStore.getFeaturesCityData(String(areacode))
    if (barItem) {
      obj = {
        name: v.properties.name,
        code: v.properties.adcode,
        stationAreaName: v.properties.name,
        wholesale: barItem.wholesale,
        retailHead: barItem.retailHead,
        special: barItem.special,
      };
    } else {
      obj = {
        name: v.properties.name,
        code: v.properties.adcode,
        wholesale: 0,
        retailHead: 0,
        special: 0,
      };
    }
    
    const sumNum = barItem && barItem.value || 0;
    mapFeatures.push({
      ...obj,
      name: v.properties.name,
      code: v.properties.adcode,
      value: sumNum,
    });
  });

  let mapPointData1 = [];
  if (mapType != 'china') {
    mapPointData1 = filterData(jsonData.features);
  }
  
  // 过滤区域外的数据
  function filterData(jsonDataFeatures) {
    // 解析地图边界（手动计算）
    const regions = jsonDataFeatures.map(feature => {
      const coordinates = feature.geometry.coordinates;

      // 将多维数组展平成一个二维数组
      const flatCoordinates = coordinates.flat(Infinity);

      const lons = flatCoordinates.filter((_, index) => index % 2 === 0); // 经度
      const lats = flatCoordinates.filter((_, index) => index % 2 !== 0); // 纬度

      const minLon = Math.min(...lons);
      const maxLon = Math.max(...lons);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      return {
        minLon,
        maxLon,
        minLat,
        maxLat
      };
    });

    // 获取整个地图的最大边界
    const mapBounds = {
      minLon: Math.min(...regions.map(b => b.minLon)),
      maxLon: Math.max(...regions.map(b => b.maxLon)),
      minLat: Math.min(...regions.map(b => b.minLat)),
      maxLat: Math.max(...regions.map(b => b.maxLat))
    };
    // 标记点
    return [];
  }
  
  function getProvinceDome(params) {
    return `<div class="popupContainerDiv" style="z-index: 999999;">
              <div class="popupContainer" id="popupContainer">
                <div class="popupAddress" style="font-weight: bold">${ params?.name || '-' }</div>
                <div class="popupLine" style="height: 0px"></div>
                <div class="popupInfo">
                    <span class="equipmentTitle">药品</span>
                    <span class="equipmentNum" style="color: #035dff; font-weight: bold; margin-left: 10px">${ params.wholesale  || 0}</span>
                </div>
                <div class="popupInfo">
                    <span class="equipmentTitle">器械</span>
                    <span class="equipmentNum" style="color: #04bbef; font-weight: bold;margin-left: 10px">${ params.retailHead  || 0}</span>
                </div>
                <div class="popupInfo">
                    <span class="equipmentTitle">化妆品</span>
                    <span class="equipmentNum" style="color: #e1171d; font-weight: bold;margin-left: 10px">${ params.special  || 0}</span>
                </div>
              </div>
            </div>`;
  }
  
  /*function getDynamicColor(mapType, value) {
    const lightBlue = {
      areaColor: '#8dbeff', // 浅蓝色
      shadowColor: 'rgba(141, 190, 255, 0.8)',
      shadowBlur: setFontSize(0.3),
      shadowOffsetY: setFontSize(0.05)
    }
    const midBlue = {
      areaColor: '#56a3ff', // 中蓝色
      shadowColor: 'rgba(86, 163, 255, 0.8)',
      shadowBlur: setFontSize(0.4),
      shadowOffsetY: setFontSize(0.06)
    }
    const darkBlue = {
      areaColor: '#507eff', // 深蓝色
      shadowColor: 'rgba(80, 126, 255, 0.8)',
      shadowBlur: setFontSize(0.5),
      shadowOffsetY: setFontSize(0.07)
    }

    // 确保 value 为数字
    const numValue = Number(value) || 0;

    if (mapType === '湖北' || mapType === 'hubei') {
      // 省级判断逻辑 - 根据 hubeiCityBarData 的数据范围调整
      if (numValue >= 5000) {
        return darkBlue;
      } else if (numValue >= 3000) {
        return midBlue;
      } else {
        return lightBlue;
      }
    } else {
      // 市级判断逻辑 - 根据 wuhanDistrictBarData 的数据范围调整
      if (numValue >= 2000) {
        return darkBlue;
      } else if (numValue >= 1000) {
        return midBlue;
      } else {
        return lightBlue;
      }
    }
  }

  // 设置地图颜色
  mapFeatures.forEach((item) => {
    const style = getDynamicColor(mapType, item.value);
    item.itemStyle = {
      normal: {
        areaColor: style.areaColor,
        shadowColor: style.shadowColor,
        shadowBlur: style.shadowBlur,
      }
    };
  });*/

  // 根据地图层级 定义分段颜色
  let pieces = [];
  if (mapType === '湖北' || mapType === 'hubei') {
    // pieces = [{
    //   gt: 5000,
    //   label: "> 5000 家",
    //   color: "#507eff"
    // }, {
    //   gte: 3000,
    //   lte: 5000,
    //   label: "3000 - 5000 家",
    //   color: "#56a3ff"
    // }, {
    //   gt: 0,
    //   lt: 3000,
    //   label: "< 3000 家",
    //   color: "#8dbeff"
    // }, {
    //   value: 0,
    //   label: "无数据",
    //   color: "rgba(141,204,255,0.76)"
    // }];
    pieces = [{
      gt: 100,
      label: "> 100 家",
      color: "#507eff"
    }, {
      gte: 50,
      lte: 100,
      label: "50 - 100 家",
      color: "#56a3ff"
    }, {
      gt: 0,
      lt: 50,
      label: "< 50 家",
      color: "#8dbeff"
    }, {
      value: 0,
      label: "无数据",
      color: "rgba(141,204,255,0.76)"
    }];
  } else {
    pieces = [{
      gt: 1000,
      label: "> 1000 家",
      color: "#507eff"
    }, {
      gte: 500,
      lte: 1000,
      label: "500 - 1000 家",
      color: "#56a3ff"
    }, {
      gt: 0,
      lt: 500,
      label: "< 500 家",
      color: "#8dbeff"
    }, {
      value: 0,
      label: "无数据",
      color: "rgba(141,204,255,0.76)"
    }];
  }

  const barData = jsonData.features.map(item => {
    const mapFeature = mapFeatures.find(el => el.code === item.properties.adcode)
    return {
      ...mapFeature,
      coordinate: item.properties.center,
      value: mapFeature?.[mapStore.currDataTypeValue] || 0,
    }
  });
  return {
    backgroundColor: 'rgba(0,0,0,0)',
    tooltip: {
      show: !tooltipShow,
      backgroundColor: '#ffffff',
      borderColor: 'rgba(0,0,0,0)',
      formatter: function (params) {
        return getProvinceDome(params.data)
      },
    },
    visualMap: {
      min: 0,
      max: 50000,
      icon: "circle",
      align: 'left',
      right: 21,
      top: 25,
      showLabel: !0,
      text: [],
      pieces: pieces,
      show: !0
    },
    geo: {
      map: mapType,
      show: true,
      roam: false,
      aspectScale: 0.9,
      zoom: 1,
      label: {
        emphasis: {
          show: false
        }
      },
      layoutSize: "100%",
      itemStyle: {
        normal: {
          borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#ffffff' // 上边框颜色
          }, {
            offset: 1,
            color: '#ffffff' // 下边框颜色
          }], false),
          borderWidth: setFontSize(0.0625),
          shadowColor: '#2f4c9c', // 调亮阴影颜色，从偏黑调整为蓝色
          shadowOffsetY: setFontSize(0.75), // 略微增加偏移
          shadowBlur: setFontSize(0.25) // 增大阴影模糊度
        }
      }
    },
    series: [{
      type: 'map',
      map: mapType,
      aspectScale: 0.9,
      zoom: 1,
      formatter: function (params) {
        return getProvinceDome(params)
      },
      label: {
        normal: {
          show: true,
          color: 'rgb(255, 252, 244)', // 字体颜色
          fontSize: setFontSize(1), // 字体大小
        },
        emphasis: {
          show: true,
          color: 'rgb(190, 105, 49)', // 字体颜色
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#C6E5FF', // 默认色
          borderColor: 'rgb(255, 255, 255)',  // 边框颜色
          borderWidth: setFontSize(0.0625), 
        },
        emphasis: {
          areaColor: 'rgb(235, 210, 99)',
          shadowColor: 'rgba(235, 210, 99, 0.7)',
          // shadowBlur: setFontSize(1.5),
          // shadowOffsetY: setFontSize(0.3)
        }
      },
      data: mapFeatures,
      markPoint: {
        symbolSize: [40, 50],
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return ''
            }
          }
        },
        data: mapPointData1
      }
    },
    //地图图例（柱子）
    {
      type: 'custom',
      coordinateSystem: 'geo',
      zlevel: 10,
      renderItem: function (params, api) {
        const coord = api.coord([api.value(0), api.value(1)]);
        const value = api.value(2);
        // 根据地图级别动态调整柱子高度
        let height;
        if (mapType === '湖北' || mapType === 'hubei') {
          height = setFontSize(value / 50); // 省级
        } else {
          height = setFontSize(value / 10);  // 市级
        }
        const width = setFontSize(0.6875);
        return {
          type: 'group',
          children: [
            {
              type: 'rect',
              transition:  ['shape', 'style', 'x', 'y'],
                enterAnimation: {
                  duration: 1000,
                  easing: 'linear'
                },
                updateAnimation: {
                  duration: 1000,
                  easing: 'linear'
                },
              shape: {
                x: coord[0] - width / 2,
                y: coord[1],
                width: width,
                height: -height,
                r: 2
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#DDEDFF' },
                  { offset: 0.5, color: '#FFFFFF' },
                  { offset: 1, color: '#CDDDF5' }
                ]),
                shadowColor: 'rgba(0,0,0,0.08)',
                shadowBlur: 2,
                borderRadius: setFontSize(0.1875),
              },
              textContent: {
                style: {
                  text: value.toString(),
                  fontSize: setFontSize(1),
                }
              },
              textConfig: {
                position: 'top'
              }
            },
            // {
            //   type: 'text',
            //   style: {
            //     text: value.toString(),
            //     textAlign: 'center',
            //     textVerticalAlign: 'bottom',
            //     x: coord[0],
            //     y: coord[1] - height - 2,
            //     fill: '#000000B2',
            //     fontSize: setFontSize(1),
            //   }
            // }
          ]
        }
      },
      data: barData.map(item => [item.coordinate[0], item.coordinate[1], item.value])
    }
    ]
  };
}

export function changeBarData(chart) {
  // 
  // const barData = jsonData.features.map(item => {
  //   const mapFeature = mapFeatures.find(el => el.code === item.properties.adcode)
  //   return {
  //     ...mapFeature,
  //     coordinate: item.properties.center,
  //     value: mapFeature?.[mapStore.currDataTypeValue] || 0,
  //   }
  // });
  // console.log('[ chart.getOptions() ] >', chart.getOption())
  // const series = chart.getOption().series
  // series[1].data = barData.map(item => [item.coordinate[0], item.coordinate[1], 100])
  // chart.setOption({
  //   series: series
  // })
}

// 设备报修数据      stateData数据，   maxNum全部数据最大值，用来设置背景颜色
export function getEquipmentRepairOptions(stateData, maxNum) {
  return {
    tooltip: {},
    legend: {
      show: true,
      top: '10%',
      right: '3%',
      itemWidth: 30, // 图例标记的图形宽度。
      //   itemGap: 20, // 图例每项之间的间隔。
      itemHeight: 10, //  图例标记的图形高度。
      textStyle: {
        color: '#fff',
        fontSize: setFontSize(0.875),
        padding: [0, 8, 0, 8]
      }
    },
    grid: {
      top: '35%',
      left: '6%',
      right: '3%',
      bottom: '20%',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: stateData.xAxisData,
      axisLabel: {
        fontSize: setFontSize(0.875),
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: 400,
        color: '#CEF9FF',
        formatter: '{value}月'

      }
    },
    yAxis: {
      type: 'value',
      name: '',
      nameTextStyle: {
        fontSize: setFontSize(1),
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: 400,
        color: '#CEF9FF',

      },
      axisLabel: {
        fontSize: setFontSize(1),
        fontFamily: 'PingFangSC, PingFang SC',
        fontWeight: 400,
        color: '#CEF9FF'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.3)',
          width: setFontSize(0.0625),
          type: 'solid'
        }
      }
    },
    series: [{
        name: '报修数',
        data: stateData.bxData,
        type: 'line',
        symbol: 'circle',
        smooth: true,
        itemStyle: {
          normal: {
            color: 'rgba(219, 50, 51, 0.9)',
            lineStyle: {
              color: 'rgba(219, 50, 51, 0.9)',
              width: setFontSize(0.0625)
            },

          }
        },
        areaStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(219, 50, 51, 0.9)'
              }, {
                  offset: 0.8,
                  color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: setFontSize(0.625)
          }
      },
      },
      {
        name: '维修数',
        data: stateData.wxData,
        type: 'line',
        symbol: 'circle',
        smooth: true,
        itemStyle: {
          normal: {
            color: 'rgba(137, 189, 27, 0.9)',
            lineStyle: {
              color: 'rgba(137, 189, 27, 0.9)',
              width: setFontSize(0.0625)
            },

          }
        },
        markArea: {
          itemStyle: {
            color: "rgba(255,255,255,0.03)",
          },
          data: [
            [{
                yAxis: 0,
              },
              {
                yAxis: maxNum,
              },
            ],
          ],
        },
        areaStyle: {
          normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(137, 189, 27, 0.9)'
              }, {
                  offset: 0.8,
                  color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: setFontSize(0.625)
          }
      },
   
      }
    ]
  }

}

//安装地点所在省份统计
export function getEquipmentInstallProvinceOptions(data, dataZoomEndValue = 3) {
  var color1 = {
    x: 0, y: 0, x2: 0, y2: 1, type: 'linear', global: false,
    colorStops: [
        { offset: 0, color: '#1C98CD' },
        { offset: 1, color: 'rgba(61,187,255,.16)' },
    ],
};

var color2 = {
    x: 0, y: 0, x2: 0, y2: 1, type: 'linear', global: false,
    colorStops: [
        { offset: 0, color: '#E7AB47' },
        { offset: 1, color: 'rgba(255,164,41,.16)' },
    ],
};
  return {
    grid: {
      top: '20%',
      left: '20%',
      right: '0%',
      bottom: '20%',
    },
    // dataZoom: [
    //   //Y轴滑动条
    //   {
    //     type: 'slider', //滑动条
    //     show: false, //开启
    //     yAxisIndex: [0],
    //     // left: '93%', //滑动条位置
    //     right: '93%',
    //     startValue: 0, //初始化时，滑动条宽度开始标度
    //     endValue: dataZoomEndValue,
    //     width: '0',
    //     fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
    //         offset: 0,
    //         color: '#47ACE7',
    //       },
    //       {
    //         offset: 1,
    //         color: '#47ACE7',
    //       },
    //     ]),
    //     // handleIcon:'image://https://csdnimg.cn/medal/qixiebiaobing4@240.png',
    //     borderColor: 'transparent',
    //     backgroundColor: 'white', //两边未选中的滑动条区域的颜色
    //     showDataShadow: false, //是否显示数据阴影 默认auto
    //     showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
    //   },
    //   {
    //     type: 'inside',
    //     yAxisIndex: 0,
    //     zoomOnMouseWheel: false, //滚轮是否触发缩放
    //     moveOnMouseMove: true, //鼠标滚轮触发滚动
    //     moveOnMouseWheel: true,
    //   },
    // ],
    dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
      type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
      start: 0,      // 左边在 0% 的位置。
      end: 30,        // 右边在 30% 的位置。
      show: false, 
  }], 
    tooltip: {
      trigger: 'axis',
      textStyle: {
        // 提示框浮层的文本样式。
        color: '#fff',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 14,
      },
      axisPointer: {
        type: 'shadow',
      },
      extraCssText: 'color:#fff;border:1px solid #eee;background:rgba(11,56,109,0.8);box-shadow:rgb(132, 255, 255) 0px 0px 10px inset;',
    },
    legend: {
      data: data.name,
      right: '80',
      top: '20',
      icon: "circle",
      textStyle: {
        //文字样式
        color: '#fff',
        fontSize: '12',
      },
    },
    xAxis: {
      type: 'category',
      splitLine: {
        show: false,
        lineStyle: {
          color: '#666',
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      axisLine: {
        
        lineStyle: {
          color: '#fff',
        },
      },
      axisLabel: {
        // rotate: 45, // 旋转标签，防止重叠
        // 也可以使用formatter来实现更复杂的换行逻辑
        formatter: function(value) {
            // 如果需要，可以在这里实现更复杂的文本处理逻辑
            //切割前两位 除了内蒙古和黑龙江
            if (value.includes('内蒙古') || value.includes('黑龙江') ) {
              return value.substring(0, 3)
            }
            return value.substring(0, 2); // 简单的换行，实际中可以根据需要调整
        }
    },
      data: data.areaName,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
     
      axisLabel: {
        textStyle: {
          color: '#fff',
          fontSize: 12,
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#ddd',
        },
      },
    },
    series: [{
        name: '台站',
        type: 'bar',
        data: data.tzData,
        itemStyle: {
          emphasis: {
            // barBorderRadius: [20, 20, 20, 20],
          },
          normal: {
            // barBorderRadius: [20, 20, 20, 20],
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [{
                  offset: 0,
                  color: '#08E7DE', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#00759A', // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.data == 0 ? '' : params.data
            },
            position: 'insideTop',
            offset: [-2, 1.5],
            textStyle: {
              color: '#fff',
              fontSize: 10,
            },
          },
        },
      },
      {
        name: '其他地点',
        textStyle: {
          // 提示框浮层的文本样式。
          color: '#fff',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 14,
        },
        type: 'bar',
        barGap: '10%',
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderColor: '#fff',
          padding: 0,
          emphasis: {
            // barBorderRadius: [20, 20, 20, 20],
          },
          normal: {
            // barBorderRadius: [20, 20, 20, 20],
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [{
                  offset: 0,
                  color: '#08E7DE', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#460071', // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        label: {
          normal: {
            show: true,
            lineHeight: 12,
            formatter: function (params) {
              return params.data == 0 ? '' : params.data
            },
            position: 'insideTop',
            textStyle: {
              color: '#fff',
              fontSize: 12,
            },
          },
        },
        z: -10,
        data: data.qtData,
      },
    ],
    barCategoryGap: '40%',
  };

}


//设备型号数量统计
export function getEquipmentModelEcharts(chartData,dataZoomEndValue = 8) {
  //纵向树状图
  return  {
    title: {
      top: '0',
      left: '8px',
      textStyle: {
        color: '#304156',
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    dataZoom: [
      //Y轴滑动条
      {
        type: 'slider', //滑动条
        show: false, //开启
        yAxisIndex: [0],
        left: '93%', //滑动条位置
        startValue: 0, //初始化时，滑动条宽度开始标度
        endValue: dataZoomEndValue,
        width: '0',
        fillerColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: '#47ACE7',
          },
          {
            offset: 1,
            color: '#47ACE7',
          },
        ]),
        // handleIcon:'image://https://csdnimg.cn/medal/qixiebiaobing4@240.png',
        borderColor: 'transparent',
        backgroundColor: 'white', //两边未选中的滑动条区域的颜色
        showDataShadow: false, //是否显示数据阴影 默认auto
        showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
      },
      {
        type: 'inside',
        yAxisIndex: 0,
        zoomOnMouseWheel: false, //滚轮是否触发缩放
        moveOnMouseMove: true, //鼠标滚轮触发滚动
        moveOnMouseWheel: true,
      },
    ],
    tooltip: {
      // trigger: 'axis',
      formatter: (params) => {
        let data = params.data
        return data.name + ' ' + data.value
      },
    },
 
    color: '#0073EE',
    grid: {
      top: '40px',
      left: '3%',
      right: '20%',
      bottom: '0',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      // data: chartData.seriesData,
      showMaxLabel: false,
      axisTick: {
        show: false,
      },
      axisLine: {
       
        show: false,
        lineStyle: {
          color: '#EBEBEB'
        }
      },
      axisLabel: {
        show: false,
        color: '#CEF9FF'
      },
      splitLine: {
        show: false,
       
      },
    }, 
    yAxis: {
      splitLine: {
        show: false,
      },
      type: 'category',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#EBEBEB'
        }
      },
      axisLabel: {
        color: '#CEF9FF',
        fontSize: 16,
      },
      splitNumber: 3,
      data: chartData.xaxisData,
    },
    series:
      [{
        name: "",
        type: "bar",
        barWidth: '15%', // 设置柱的宽度
        barGap: '5%',
        // label: {
        //     formatter: function (params) {
        //       console.log(params,'///////')
        //       // return params.data == 0 ? '' : params.data
        //     },
        //   position: 'insideRight',
        //   offset: [-2, 1.5],
        //   borderWidth: 5,
        //   borderRadius: 4,
        //   // fontSize: 14,
        //   color: '#fff',
        //   normal: {
            
        //   }
        // },
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return params.value == 0 ? '' : params.value
            },
            position: 'right',
            offset: [2, 1.5],
            textStyle: {
              color: '#fff',
              fontSize: 16,
            },
          },
        },
        itemStyle: {
          color: 'rgba(0,0,0,0)',
          borderColor: '#fff',
          padding: 0,
          emphasis: {
            barBorderRadius: [20, 20, 20, 20],
          },
          normal: {
            barBorderRadius: [20, 20, 20, 20],
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              [{
                  offset: 0,
                  color: '#00A0FD', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#B0DD5B', // 100% 处的颜色
                },
              ],
              false
            ),
          },
        },
        data: chartData.seriesData
      }]



 
  };

}
