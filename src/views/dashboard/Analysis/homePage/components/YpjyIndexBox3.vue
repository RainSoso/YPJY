<script setup>
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';
import MapDemo from "../MapDemo/index.vue";
import { useMapStore, mapSelectMap } from "../MapDemo/mapStore";


const props = defineProps({
  viewData: {
    type: Object,
    default: () => ({
      mapInfo: {
        type: Array,
        default: []
      },
      // mapCurrentOption: {
      //   type: String,
      //   default: ''
      // },
    })
  }
})
const mapDemoRef = ref(null)
const mapStore = useMapStore();
const mapCurrentOption = computed(() => mapStore.currDataType)
// const mapSelectMap = {
//   '批发企业': 'wholesale',
//   '连锁总部': 'retailHead',
//   '特殊药品企业': 'special',
//   // '三方物流': 'thirdPartyLogistics',
// }
mapStore.updateCurrDataType(Object.keys(mapSelectMap)[0])
const getBarItemStyle = (item) => {
  // 找到最大值
  let max = 0
  props.viewData.mapInfo.forEach(el => {
    const current = el[mapSelectMap[mapCurrentOption.value]];
    if (current > max) max = current
  })

  // 计算百分比
  const percent
    = max === 0 ? 0 :
      (item[mapSelectMap[mapCurrentOption.value]] * 100 / max).toFixed(2)
  return {
    height: percent < 1.5 ? '1.5%' : percent + '%'
  }
}

function mapDataTypeChange(item) {
  mapStore.updateCurrDataType(item)
  mapDemoRef.value.handleChangeBarData()
}
</script>
<template>
  <!-- <ul class="box3">
    <li v-for="item in viewData.mapInfo" :class="`box3-${item.xzqhdm}`" :key="item.xzqhdm">
      <span class="map-bar-value" v-show="item[mapSelectMap[props.viewData.mapCurrentOption]] != 0">{{
        item[mapSelectMap[viewData.mapCurrentOption]] }}</span>
      <div class="map-bar" :style="getBarItemStyle(item)"></div>
    </li>
    <li class="map-select-box">
      <ul>
        <li class="row map-select-current">
          <span>{{ viewData.mapCurrentOption }}</span>
          <img src="/src/assets/images/vimg/drowdown.svg" class="map-select-icon" />
        </li>
        <li class="map-select-option" v-for="item in Object.keys(mapSelectMap)" :key="item"
          @click="viewData.mapCurrentOption = item"> {{ item
          }}</li>
      </ul>
    </li>
  </ul> -->
  <div class="map-container card-shadow" style="height: auto;">
    <ul class="box3-1">
    <li class="map-select-box">
      <ul>
        <li class="row map-select-current">
          <span>{{ mapCurrentOption }}</span>
          <img src="/src/assets/images/vimg/drowdown.svg" class="map-select-icon" />
        </li>
        <li class="map-select-option" v-for="item in Object.keys(mapSelectMap)" :key="item"
          @click="mapDataTypeChange(item)"> {{ item }}
        </li>
      </ul>
    </li>
  </ul>
    <MapDemo ref="mapDemoRef" :showNavigation="true"/>
  </div>
</template>
<style lang="less" scoped>
.map-container {
  position: relative;
  border-radius: 1.5rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url("/src/assets/images/ypjy/map-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 0;
}
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

.view {
  width: 100vw;
  min-height: 52.5vw;
  padding: 1.25vw;
  background-color: #e5e7eb;
  box-sizing: border-box;
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

.box3 {
  flex: 1;
  border-radius: 1.25vw;
  background-color: #fff;
  background-image: url('/src/assets/images/vimg/map.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: relative;
  margin: 0;

  &>[class ^="box3-42"] {
    width: 0.625vw;
    height: 5vw;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  &>.box3-420100 {
    left: 34.5vw;
    bottom: 11.5vw;
  }

  &>.box3-420200 {
    left: 38.5vw;
    bottom: 7.5vw;
  }

  &>.box3-420300 {
    left: 13.5vw;
    bottom: 23.5vw;
  }

  &>.box3-420500 {
    left: 16.5vw;
    bottom: 12.5vw;
  }

  &>.box3-420600 {
    left: 21.5vw;
    bottom: 20.5vw;
  }

  &>.box3-420700 {
    left: 37vw;
    bottom: 10.5vw;
  }

  &>.box3-420800 {
    left: 24.5vw;
    bottom: 14.5vw;
  }

  &>.box3-420900 {
    left: 31vw;
    bottom: 14.5vw;
  }

  &>.box3-421000 {
    left: 23.5vw;
    bottom: 7.5vw;
  }

  &>.box3-421100 {
    left: 40.5vw;
    bottom: 11.5vw;
  }

  &>.box3-421200 {
    left: 33.5vw;
    bottom: 5.5vw;
  }

  &>.box3-421300 {
    left: 29vw;
    bottom: 19.5vw;
  }

  &>.box3-422800 {
    left: 6.5vw;
    bottom: 9.5vw;
  }


  &>.box3-429004 {
    left: 29.5vw;
    bottom: 9.5vw;
  }

  &>.box3-429005 {
    left: 25.5vw;
    bottom: 10vw;
  }

  &>.box3-429006 {
    left: 27.5vw;
    bottom: 11.5vw;
  }

  &>.box3-429021 {
    left: 12.5vw;
    bottom: 17.5vw;
  }

  .map-bar {
    width: 100%;
    background: linear-gradient(to top, #DDEDFF 0%, #FFFFFF 26.44%, #CDDDF5 100%);
    border-radius: 0.15625vw;
    transform-origin: bottom;
    transition: height 0.5s ease;
  }

  .map-bar-value {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: Regular;
    font-size: 0.520833vw;
    line-height: 100%;
    letter-spacing: 0%;
    margin-bottom: 0.5vw;
  }

  .map-select-box {
    position: absolute;
    left: 0.2vw;
    top: 0.7vw;
    height: 1.5vw;
    overflow: hidden;
    transition: all 0.5s ease;


    .map-select-current {
      width: 7vw;
      height: 1.5vw;
      padding: 0 0.3vw;
      justify-content: space-between;
      align-items: center;
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-style: Bold;
      font-size: 0.833333vw;
      line-height: 1.25vw;
      letter-spacing: 0%;
    }

    .map-select-icon {
      width: 0.46875vw;
      height: 0.3125vw;
      transform: origin(center center);
      transition: all 0.3s ease-in-out;
    }


    &:hover .map-select-icon {
      transform: rotate(-180deg);
    }

    &:hover {
      height: 7.5vw;
    }

    .map-select-option {
      width: 7vw;
      height: 1.5vw;
      padding: 0 0.3vw;
      // 文字不换行
      white-space: nowrap;
      cursor: pointer;

      font-family: Source Han Sans CN;
      font-weight: 400;
      font-style: Regular;
      font-size: 0.729167vw;
      line-height: 1.145833vw;
      letter-spacing: 0%;


      &:hover {
        background-color: #CDDDF5;
      }
    }
  }
}
.box3-1 {
  flex: 1;
  border-radius: 1.25vw;
  position: relative;
  margin: 0;
  z-index: 999;

  &>[class ^="box3-42"] {
    width: 0.625vw;
    height: 5vw;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  &>.box3-420100 {
    left: 34.5vw;
    bottom: 11.5vw;
  }

  &>.box3-420200 {
    left: 38.5vw;
    bottom: 7.5vw;
  }

  &>.box3-420300 {
    left: 13.5vw;
    bottom: 23.5vw;
  }

  &>.box3-420500 {
    left: 16.5vw;
    bottom: 12.5vw;
  }

  &>.box3-420600 {
    left: 21.5vw;
    bottom: 20.5vw;
  }

  &>.box3-420700 {
    left: 37vw;
    bottom: 10.5vw;
  }

  &>.box3-420800 {
    left: 24.5vw;
    bottom: 14.5vw;
  }

  &>.box3-420900 {
    left: 31vw;
    bottom: 14.5vw;
  }

  &>.box3-421000 {
    left: 23.5vw;
    bottom: 7.5vw;
  }

  &>.box3-421100 {
    left: 40.5vw;
    bottom: 11.5vw;
  }

  &>.box3-421200 {
    left: 33.5vw;
    bottom: 5.5vw;
  }

  &>.box3-421300 {
    left: 29vw;
    bottom: 19.5vw;
  }

  &>.box3-422800 {
    left: 6.5vw;
    bottom: 9.5vw;
  }


  &>.box3-429004 {
    left: 29.5vw;
    bottom: 9.5vw;
  }

  &>.box3-429005 {
    left: 25.5vw;
    bottom: 10vw;
  }

  &>.box3-429006 {
    left: 27.5vw;
    bottom: 11.5vw;
  }

  &>.box3-429021 {
    left: 12.5vw;
    bottom: 17.5vw;
  }

  .map-bar {
    width: 100%;
    background: linear-gradient(to top, #DDEDFF 0%, #FFFFFF 26.44%, #CDDDF5 100%);
    border-radius: 0.15625vw;
    transform-origin: bottom;
    transition: height 0.5s ease;
  }

  .map-bar-value {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: Regular;
    font-size: 0.520833vw;
    line-height: 100%;
    letter-spacing: 0%;
    margin-bottom: 0.5vw;
  }

  .map-select-box {
    position: absolute;
    left: 1.2vw;
    top: 3vw;
    height: 1.5vw;
    overflow: hidden;
    transition: all 0.5s ease;


    .map-select-current {
      width: 7vw;
      height: 1.5vw;
      padding: 0 0.3vw;
      justify-content: space-between;
      align-items: center;
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-style: Bold;
      font-size: 0.833333vw;
      line-height: 1.25vw;
      letter-spacing: 0%;
    }

    .map-select-icon {
      width: 0.46875vw;
      height: 0.3125vw;
      transform: origin(center center);
      transition: all 0.3s ease-in-out;
    }


    &:hover .map-select-icon {
      transform: rotate(-180deg);
    }

    &:hover {
      height: 7.5vw;
    }

    .map-select-option {
      width: 7vw;
      height: 1.5vw;
      padding: 0 0.3vw;
      // 文字不换行
      white-space: nowrap;
      cursor: pointer;

      font-family: Source Han Sans CN;
      font-weight: 400;
      font-style: Regular;
      font-size: 0.729167vw;
      line-height: 1.145833vw;
      letter-spacing: 0%;


      &:hover {
        background-color: #CDDDF5;
      }
    }
  }
}
</style>
