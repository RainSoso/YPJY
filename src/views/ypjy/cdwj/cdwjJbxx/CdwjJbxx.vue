<template>
  <div>
    <a-row :gutter="10">
      <a-col :span="10">
        <table class="my-table mb-3">
          <colgroup>
            <col style="width:20%" />
            <col />
            <col style="width:15%" />
            <col />
          </colgroup>
          <tr>
            <td class="text-blue font-600 text-right">年度</td>
            <td colspan="3">{{ jbxx.nd }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">场地文件编码</td>
            <td colspan="3">{{ jbxx.wjbm }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">企业社会信用代码</td>
            <td colspan="3">{{ jbxx.shxydm }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">企业名称</td>
            <td colspan="3">{{ jbxx.qymc }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">注册地址</td>
            <td colspan="3">{{ jbxx.zcdz }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">经营地址</td>
            <td colspan="3">{{ jbxx.jydz }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">仓库地址</td>
            <td colspan="3">{{ jbxx.ckdz }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">联系人</td>
            <td colspan="3">{{ jbxx.lxr }}</td>
          </tr>
          <tr>
            <td class="text-blue font-600 text-right">联系电话</td>
            <td colspan="3">{{ jbxx.lxdh }}</td>
          </tr>
        </table>
      </a-col>
      <a-col :span="14">
        <!-- <a-input v-model="searchKey" placeholder="如初次定位不准确，请手动搜索!" style="margin-bottom: 10px;">
          <template #append>
            <a-button :icon="Search" @click="mapSearch()" />
          </template>
</a-input> -->
        <div ref="mapRef" id="mapDiv"></div>
      </a-col>
    </a-row>
  </div>

</template>
<script lang="ts" setup>
import { onUpdated, toRefs, ref, defineProps, onMounted, nextTick } from "vue";
import { propTypes } from '/@/utils/propTypes';
import { getCdwjJbxx } from './CdwjJbxx.api';
const props = defineProps({
  shxydm: propTypes.string,
  nd: propTypes.string
});
const isShow = ref(false);
const mapRef = ref(null);

const jbxx = ref({});
getCdwjJbxxByShxydm();

async function getCdwjJbxxByShxydm() {
  var data = await getCdwjJbxx({ shxydm: props.shxydm,nd:props.nd  });
  debugger
  jbxx.value = data.data;
  init();
}
const init = () => {
  var map = null;
  var marker = null;
  var T = window.T;
  map = new T.Map("mapDiv", {
    projection: 'EPSG:4326'
  });
  if (jbxx?.value.jydzLon) {
    map.centerAndZoom(new T.LngLat(jbxx?.value.jydzLon, jbxx?.value.jydzLat), 12);
    var point = new T.LngLat(jbxx?.value.jydzLon, jbxx?.value.jydzLat);
    marker = new T.Marker(point);// 创建标注
    map.addOverLay(marker);
    var markerInfoWin = new T.InfoWindow(jbxx?.value.jydz);
    marker.addEventListener("click", function () {
      marker.openInfoWindow(markerInfoWin);
    });// 将标注添加到地图中
  } else {
    //如果为空则默认省局
    map.centerAndZoom(new T.LngLat('114.331261', '30.561092'), 12);
  }
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
};
</script>
<style scoped>
#mapDiv {
  width: 100%;
  height: 70vh;
}
</style>