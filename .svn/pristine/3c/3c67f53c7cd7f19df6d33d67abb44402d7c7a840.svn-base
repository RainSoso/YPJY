<template>
  <a-modal v-model:visible="isShow" :forceRender="true" :destroyOnClose="true" title="企业地图" width="90%">
    <div ref="mapRef" id="mapDiv"></div>
    <template #footer>
      <a-button @click="isShow = false">关闭</a-button>
    </template>
  </a-modal>

</template>
<script lang="ts" setup>
import { onUpdated, toRefs, ref, defineProps, onMounted, nextTick } from "vue";
const props = defineProps({
  qyxx: {},
})
const isShow = ref(false);
const mapRef = ref(null);
const { qyxx } = toRefs(props)
const init = () => {
  var map = null;
  var marker = null;
  var T = window.T;
  map = new T.Map("mapDiv", {
    projection: 'EPSG:4326'
  });
  map.centerAndZoom(new T.LngLat(qyxx?.value.jydzLng, qyxx?.value.jydzLat), 12);
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Firefox") > -1) {
    //火狐浏览器不支持 需重新滚动事件
    map.disableScrollWheelZoom();
    mapRef.value?.addEventListener("DOMMouseScroll", e => {
      e.preventDefault();
      e.detail > 0 ? map.zoomOut() : map.zoomIn();
    });
  } else {
    map.enableScrollWheelZoom();
  }
  //允许鼠标滚轮缩放地图
  //允许双击地图放大
  map.enableDoubleClickZoom();
  map.enableDrag();
  var point = new T.LngLat(qyxx?.value.jydzLng, qyxx?.value.jydzLat);
  marker = new T.Marker(point);// 创建标注
  map.addOverLay(marker);
  var markerInfoWin = new T.InfoWindow(qyxx?.value.jydz);
  marker.addEventListener("click", function () {
    marker.openInfoWindow(markerInfoWin);
  });// 将标注添加到地图中

};
onUpdated(() => {
  nextTick(() => {
    init();
  })
});

const handelClick = (res) => {
  isShow.value = true;
}

defineExpose({
  handelClick,
});
</script>
<style scoped>
#mapDiv {
  width: 100%;
  height: 70vh;
}
</style>