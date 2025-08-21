<template>
  <div class="map-echarts-container">
    <div class="map-navigation" v-if="showNavigation">
      <span
        @click="toChinaMap"
        :style="mapIndex === 1 ? 'color: #00a0e9;' : ''"
        v-if="showChinaNavigation"
        >中国</span
      >
      <span
        class="title"
        :style="mapIndex === 2 ? 'color: #00a0e9;' : 'color: #000;'"
        @click="toProvinceMap"
      >
        {{ showChinaNavigation ? ">" : "" }}{{ provinceName }}
      </span>
      <span v-if="cityName" :style="mapIndex === 3 && districtCode === '' ? 'color: #00a0e9;' : 'color: #000;'" @click="toCityMap">
        > {{ cityName }}
      </span>
      <span v-if="districtName" :style="mapIndex === 3 && districtCode !== '' ? 'color: #00a0e9;' : ''">
        > {{ districtName }}
      </span>
    </div>
    <div id="equipmentMapEcharts" ref="mapRef"></div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  defineEmits,
  defineProps,
  onBeforeUnmount,
  defineExpose,
  nextTick,
} from "vue";
import * as echarts from "echarts/core";
import { getEquipmentMapOptions, changeBarData } from "./echartsOptions.js";
import chinaMap from "./china.json";
import { provinces } from "./mapData.js";
import { useMapStore } from "./mapStore";

const mapStore = useMapStore();

defineExpose({
  handleChangeBarData
})

// 节流函数
const throttle = (fn, delay) => {
  let timer = null;
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    const remaining = delay - (now - lastTime);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = Date.now();
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
};

// 模拟数据 - 省份数据
const mockProvinceData = [
  {
    stationAreaCode: "110000",
    stationAreaName: "北京",
    equipmentCount: 258,
    stationCount: 45,
    otherCount: 213,
    projectCount: 20,
    equipmentSum: 258,
    equipmentMaintainCount: 5,
    equipmentDeactivateCount: 2,
  },
  {
    stationAreaCode: "120000",
    stationAreaName: "天津",
    equipmentCount: 175,
    stationCount: 30,
    otherCount: 145,
    projectCount: 15,
    equipmentSum: 175,
    equipmentMaintainCount: 3,
    equipmentDeactivateCount: 1,
  },
  {
    stationAreaCode: "130000",
    stationAreaName: "河北",
    equipmentCount: 320,
    stationCount: 60,
    otherCount: 260,
    projectCount: 25,
    equipmentSum: 320,
    equipmentMaintainCount: 8,
    equipmentDeactivateCount: 4,
  },
  {
    stationAreaCode: "140000",
    stationAreaName: "山西",
    equipmentCount: 210,
    stationCount: 40,
    otherCount: 170,
    projectCount: 18,
    equipmentSum: 210,
    equipmentMaintainCount: 6,
    equipmentDeactivateCount: 3,
  },
  {
    stationAreaCode: "150000",
    stationAreaName: "内蒙古",
    equipmentCount: 185,
    stationCount: 35,
    otherCount: 150,
    projectCount: 16,
    equipmentSum: 185,
    equipmentMaintainCount: 4,
    equipmentDeactivateCount: 2,
  },
];

// 根据省份编码获取省份名称
const getProvinceNameByCode = (code) => {
  for (const key in provinces) {
    if (provinces[key] === code) {
      return key;
    }
  }
  return "";
};

/**
 * 更新当前点击的地图区域代码
 * 各组件监听区域代码加载对应数据
 * @param areaCode 地区代码
 */
const loadData = (areaCode, areaName) => {
  mapStore.updateCurrAreaCode(areaCode, areaName);
}

const props = defineProps({
  // 可选配置
  showNavigation: {
    type: Boolean,
    default: true,
  },
  initialMapData: {
    type: Array,
    default: () => [],
  },
  height: {
    type: String,
    default: "400px",
  },
});

const emit = defineEmits([
  "mapClick",
  "mapDataChange",
  "provinceChange",
  "cityChange",
]);

// 地图实例引用
const mapRef = ref(null);
let mapInstance = null;

// 数据状态
const mapIndex = ref(1); // 1为全国地图 2为省级地图 3为市级地图
const provinceCode = ref("");
const provinceName = ref("");
const cityCode = ref("");
const cityName = ref("");
const districtCode = ref("");
const districtName = ref("");
const provinceData = ref([]);
const mapPointData = ref([]);
const timeFn = ref(null);
const provinceLatLng = reactive({
  latitude: 0,
  longitude: 0,
});

// 是否显示中国导航
const showChinaNavigation = ref(false);

// 初始化地图
const initMapEchrts = (jsonData = chinaMap, mapType = "china") => {
  if (!mapRef.value) return;

  const dom = mapRef.value;

  // 注册地图
  echarts.registerMap(mapType, { geoJson: jsonData });

  // 如果已存在实例，先销毁
  if (mapInstance) {
    mapInstance.dispose();
  }

  // 创建新实例
  mapInstance = echarts.init(dom);

  // 应用canvas样式
  const canvasElement = dom.querySelector("canvas");
  if (canvasElement) {
    canvasElement.style.position = "absolute";
    canvasElement.style.left = "-69px";
    canvasElement.style.top = "-13px";
    canvasElement.style.width = "861px";
    canvasElement.style.height = "465px";
    canvasElement.style.userSelect = "none";
    canvasElement.style.webkitTapHighlightColor = "rgba(0, 0, 0, 0)";
    canvasElement.style.padding = "0px";
    canvasElement.style.margin = "0px";
    canvasElement.style.borderWidth = "0px";
  }

  // 设置配置项
  const option = getEquipmentMapOptions(
    provinceData.value,
    jsonData,
    true,
    mapType,
    mapIndex.value > 2 ? mapPointData.value : []
  );

  console.log(option, 'option');

  mapInstance.setOption(option);

  // 解绑点击和双击事件
  mapInstance.off("click");

  // 单击事件
  mapInstance.on("click", function (params) {
    // 将点击事件传递给父组件
    emit("mapClick", params);

    if (params.componentType === "series") {
      clearTimeout(timeFn.value);

      // 由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
      timeFn.value = setTimeout(async function () {
        let name = params.name; // 地区name
        let jsonData = null;

        // 省级
        if (mapIndex.value === 1) {
          provinceCode.value = provinces[name];
          provinceName.value = name;

          // 获取省份经纬度
          const province = chinaMap.features.find(
            (item) => item.properties.adcode === provinceCode.value
          );
          if (province) {
            provinceLatLng.latitude = province.properties.center[1];
            provinceLatLng.longitude = province.properties.center[0];
          }

          emit("provinceChange", {
            name: provinceName.value,
            code: provinceCode.value,
            lat: provinceLatLng.latitude,
            lng: provinceLatLng.longitude,
          });

          // 动态导入省级地图数据
          try {
            jsonData = await import(
              `./province/${provinceCode.value}.json`
            );
          } catch (error) {
            console.error("加载省级地图数据失败", error);
            return;
          }
        } else if (mapIndex.value === 2) {
          // 直辖市不能再下钻
          const provinceList = ["北京", "重庆", "天津", "上海"];
          if (provinceList.includes(provinceName.value)) return;

          // 市级
          cityCode.value = params.data.code;
          cityName.value = name;
          let areaCode = String(cityCode.value).substring(0, 4)
          loadData(areaCode, name)
          // 动态导入市级地图数据
          try {
            jsonData = await import(
              `./city/${provinceCode.value}/${cityCode.value}.json`
            );
          } catch (error) {
            console.error("加载市级地图数据失败", error);
            return;
          }
        } else if (mapIndex.value === 3) {
          // 区县
          districtCode.value = params.data.code;
          districtName.value = name;

          loadData(districtCode.value, name)
        }
        if (!jsonData) return;

        // 使用模拟点位数据
        mapPointData.value = [];

        mapIndex.value += 1;

        // 重新初始化地图
        nextTick(() => {
          initMapEchrts(jsonData, name);
        });
      }, 250);
    }
  });

  // 移除旧的监听器
  window.removeEventListener("resize", throttledResize);
  // 添加节流后的窗口大小变化监听器
  window.addEventListener("resize", throttledResize);
};

// 处理窗口大小变化
const handleResize = () => {
  if (!mapInstance) return;

  // 重新初始化当前层级的地图，确保 setFontSize 能基于新的窗口大小计算
  if (mapIndex.value === 1) {
    // 中国地图
    initMapEchrts(chinaMap, "china");
  } else if (mapIndex.value === 2 && provinceName.value) {
    // 省级地图
    import(`./province/${provinceCode.value}.json`)
      .then((jsonData) => {
        initMapEchrts(jsonData, provinceName.value);
      })
      .catch((error) => {
        console.error("重新加载省级地图数据失败", error);
        mapInstance.resize(); // 如果加载失败，至少调整大小
      });
  } else if (mapIndex.value === 3 && cityName.value) {
    // 市级地图
    import(`./city/${provinceCode.value}/${cityCode.value}.json`)
      .then((jsonData) => {
        initMapEchrts(jsonData, cityName.value);
      })
      .catch((error) => {
        console.error("重新加载市级地图数据失败", error);
        mapInstance.resize(); // 如果加载失败，至少调整大小
      });
  } else {
    // 兜底处理，至少调整大小
    mapInstance.resize();
  }
};

// 使用节流包装 handleResize 函数，防止频繁触发，设置300ms的延迟
const throttledResize = throttle(handleResize, 300);

// 返回中国地图
const toChinaMap = () => {
  mapIndex.value = 1;
  provinceName.value = "";
  cityName.value = "";
  provinceCode.value = "";
  mapPointData.value = [];
  showChinaNavigation.value = true; // 显示中国导航

  nextTick(() => {
    initMapEchrts(chinaMap, "china");
  });
};

// 返回省级地图
const toProvinceMap = () => {
  if (!provinceName.value) return;

  provinceCode.value = provinces[provinceName.value];
  showChinaNavigation.value = false; // 隐藏中国导航

  // 动态导入省级地图数据
  import(`./province/${provinceCode.value}.json`)
    .then((jsonData) => {
      if (!jsonData) return;
      cityName.value = "";
      cityCode.value = "";
      districtName.value = "";
      districtCode.value = "";
      mapIndex.value = 2;

      loadData("","")
      nextTick(() => {
        initMapEchrts(jsonData, provinceName.value);
      });
    })
    .catch((error) => {
      console.error("加载省级地图数据失败", error);
    });
};

const toCityMap = () => {
  if (!cityCode.value || !cityName.value) return;
  showChinaNavigation.value = false;
  // 动态导入市级地图数据
  import(`./city/${provinceCode.value}/${cityCode.value}.json`)
      .then((jsonData) => {
        if (!jsonData) return;
        districtName.value = "";
        districtCode.value = "";
        mapIndex.value = 3;
        let areaCode = String(cityCode.value).substring(0, 4)
        loadData(areaCode, cityName.value);
        nextTick(() => {
          initMapEchrts(jsonData, cityName.value);
        });
      })
      .catch((error) => {
        console.error("加载市级地图数据失败", error);
      });
}

function handleChangeBarData() {
  // 设置配置项
  // 重新初始化当前层级的地图，确保 setFontSize 能基于新的窗口大小计算
  if (mapIndex.value === 1) {
    // 中国地图
      const option = getEquipmentMapOptions(
        provinceData.value,
        chinaMap,
        true,
        'china',
        mapIndex.value > 2 ? mapPointData.value : []
      );
      mapInstance.setOption(option);
  } else if (mapIndex.value === 2 && provinceName.value) {
    // 省级地图
    import(`./province/${provinceCode.value}.json`)
      .then((jsonData) => {
        const option = getEquipmentMapOptions(
          provinceData.value,
          jsonData,
          true,
          provinceName.value,
          mapIndex.value > 2 ? mapPointData.value : []
        );

        mapInstance.setOption(option);
      })
      .catch((error) => {
        console.error("重新加载省级地图数据失败", error);
        mapInstance.resize(); // 如果加载失败，至少调整大小
      });
  } else if (mapIndex.value === 3 && cityName.value) {
    // 市级地图
    import(`./city/${provinceCode.value}/${cityCode.value}.json`)
      .then((jsonData) => {
        const option = getEquipmentMapOptions(
          provinceData.value,
          jsonData,
          true,
          cityName.value,
          mapIndex.value > 2 ? mapPointData.value : []
        );

        mapInstance.setOption(option);
      })
      .catch((error) => {
        console.error("重新加载市级地图数据失败", error);
        mapInstance.resize(); // 如果加载失败，至少调整大小
      });
  }
}

onMounted(async () => {
  // 修改地图初始化逻辑，默认从湖北省开始下钻
  provinceCode.value = "420000"; // 湖北省代码
  provinceName.value = "湖北"; // 湖北省名称
  mapIndex.value = 2; // 设置为省级地图
  showChinaNavigation.value = false; // 不显示中国导航

  // 获取省份经纬度（如果需要）
  const province = chinaMap.features.find(
      (item) => item.properties.adcode === provinceCode.value
  );
  if (province) {
    provinceLatLng.latitude = province.properties.center[1];
    provinceLatLng.longitude = province.properties.center[0];
  }

  // 通知父组件省份变化
  emit("provinceChange", {
    name: provinceName.value,
    code: provinceCode.value,
    lat: provinceLatLng.latitude,
    lng: provinceLatLng.longitude,
  });

  //加载地图展示的要素数据
  await mapStore.fetchMapData();

  // 动态导入湖北省地图数据
  import(`./province/${provinceCode.value}.json`)
      .then((jsonData) => {
        nextTick(() => {
          initMapEchrts(jsonData, provinceName.value);
        });
      })
      .catch((error) => {
        console.error("加载湖北省地图数据失败，回退到全国地图", error);
        // 如果加载失败，则回退到全国地图
        initMapEchrts();
      });
});

onBeforeUnmount(() => {
  // 清理事件监听器
  window.removeEventListener("resize", throttledResize);

  // 销毁地图实例
  if (mapInstance) {
    mapInstance.dispose();
    mapInstance = null;
  }
});
</script>

<style scoped>
.map-echarts-container {
  width: 100%;
  /* height: v-bind("props.height"); */
  height: 100%;
  position: relative;

  .map-navigation {
    position: absolute;
    top: 0.625rem;
    left: 1.25rem;
    z-index: 10;
    font-size: 1rem;
    color: #ffffff;

    span {
      cursor: pointer;
      display: inline-block;
      margin-right: 0.5rem;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  #equipmentMapEcharts {
    width: 100%;
    height: 100%;
  }
}
</style>
