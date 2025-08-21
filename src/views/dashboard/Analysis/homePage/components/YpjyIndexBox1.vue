<template>
  <div class="box1 column">
    <span class="title">持证企业</span>
    <div class="row czqyBox">
      <div v-for="item in viewData.czqyList" class="column czqyBoxItem" @click="nav(item)">
        <img :src="item.url" alt="" class="czqyBoxItemImg">
        <span class="czqyBoxItemName">{{ item.name }}</span>
        <span class="czqyBoxItemNum">{{ item.num }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGo } from '/@/hooks/web/usePage';
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';
const go = useGo();
const year = new Date().getFullYear();
const props = defineProps({
  viewData: {
    type: Object,
    default: () => ({
      czqyList: [],
      areaCode: ''
    })
  }
});

const nav = ({ code }) => {
  console.log(code);
  if (code === 'pfzs') {
    // 批发
    go({ path: `/ypjy/homePage/yppf/yppf/` + year + '/' + props.viewData.areaCode });
  } else if (code === 'lszb') {
    // 连锁总部
    go({ path: `/ypjy/homePage/lszb/lszb/` + year + '/' + props.viewData.areaCode });
  } else if (code === 'lsmd') {
    go({ path: `/ypjy/dtls/2/` + props.viewData.areaCode });
  } else if (code === 'lsdt') {
    // 连锁门店
    go({ path: `/ypjy/dtls/1/` + props.viewData.areaCode });
  } else if (code = 'sfpt') {
    go({ path: `/ypjy/dsfpt/` + props.viewData.areaCode });
  }
}
</script>
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

.box1 {
  width: 51vw;
  height: 10.25vw;
  border-radius: 1.25vw;
  background-color: #fff;
  padding: 0.833333vw;

  .czqyBox {
    gap: 0;
    flex: 1;

    .czqyBoxItem {
      padding: 0 0.833333vw;
      flex: 1;
      gap: 0.416667vw;

      .czqyBoxItemImg {
        width: 2.5vw;
        height: 2.5vw;
      }

      .czqyBoxItemName {
        font-family: Source Han Sans CN;
        font-weight: 400;
        font-style: Regular;
        font-size: 0.9375vw;
        line-height: 1.354167vw;
        letter-spacing: 0%;
        vertical-align: middle;
        text-transform: capitalize;
      }

      .czqyBoxItemNum {
        font-family: Source Han Sans CN;
        font-weight: 700;
        font-style: Bold;
        font-size: 1.25vw;
        line-height: 1.354167vw;
        letter-spacing: 0%;
        vertical-align: middle;
      }
    }
  }
}
</style>