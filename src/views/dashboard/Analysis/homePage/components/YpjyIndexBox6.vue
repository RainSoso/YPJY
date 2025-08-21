<script setup>
import { ref, onMounted, reactive, nextTick, watch, computed } from 'vue';
const props = defineProps({
  viewData: {
    type: Object,
    default: () => ({
      showTaskQylx: 'pf',
      taskPfList: [],
      taskZbList: []
    })
  }
})

const taskList = computed(() => {
  return props.viewData.showTaskQylx === 'pf' ? (props.viewData.taskPfList || []) : (props.viewData.taskZbList || [])
})
</script>
<template>
  <div class="column box6">
    <div class="row box-header">
      <span class="title">任务检查台</span>
      <div class="row header-box">
        <span :class="`header-left ${viewData.showTaskQylx === 'pf' ? 'header-active' : ''}`"
          @click="viewData.showTaskQylx = 'pf'">批发企业</span>
        <span :class="`header-right ${viewData.showTaskQylx === 'lszb' ? 'header-active' : ''}`"
          @click="viewData.showTaskQylx = 'lszb'">连锁总部企业</span>
      </div>
    </div>

    <div class="column task-content">
      <div v-for="item in taskList" class="column">
        <div class="row">
          <div class="item-title-left">
            <span class="main-title">{{ item.mainTitle }}</span>
            <span class="sub-title">{{ item.subTitle }}</span>
          </div>
          <div class="item-title-right row">
            <div class="row" v-if="item.waitNum">
              <img src="/src/assets/images/vimg/time.svg" alt="">
              <span class="item-title-text">待检数 {{ item.waitNum }}</span>
            </div>
            <div class="row" v-if="item.expireNum">
              <img src="/src/assets/images/vimg/danger.svg" alt="">
              <span class="item-title-text">{{ item.expireTitle ? item.expireTitle : '超期' }} <span
                  style="color: #991B1B">{{ item.expireNum }}家</span></span>
            </div>
          </div>
        </div>
        <div class="row progress-box">
          <span class="item-title-text">进度</span>
          <div class="progress">
            <div :style="{ width: item.progress + '%' }" class="progress-line"></div>
          </div>
          <div class="progress-last">
            <span class="item-title-text">{{ item.progress }}%</span>
          </div>
        </div>
      </div>
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

.task-content {
  flex: 1;
  // gap: 0;
  justify-content: space-between;

  &>.column {
    gap: 0.3125vw;
  }

  .item-title-text {
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: Regular;
    font-size: 0.729167vw;
    line-height: 1.145833vw;
    letter-spacing: 0%;
  }

  &>.column>.row {
    justify-content: space-between;

    .main-title {
      font-family: Source Han Sans CN;
      font-weight: 700;
      font-style: Bold;
      font-size: 0.833333vw;
      line-height: 1.25vw;
      letter-spacing: 0%;
    }

    .sub-title {
      font-family: Source Han Sans CN;
      font-weight: 400;
      font-style: Regular;
      font-size: 0.729167vw;
      line-height: 1.25vw;
      letter-spacing: 0%;
      color: #94969B;
    }

    .item-title-right {
      width: 12vw;
      gap: 0;
      justify-content: space-between;

      img {
        width: 0.625vw;
        height: 0.625vw;
      }

      &>.row {
        gap: 0.416667vw;
        align-items: center;
      }
    }
  }

  .progress-box {
    gap: 0;
    align-items: center;

    &>.progress-last {
      width: 2.5vw;
      overflow: hidden;
    }

    &>.progress {
      flex: 1;
      background-color: #e5e7eb;
      border-radius: 0.3125vw;
      height: 0.625vw;
      margin: 0 0.3125vw;
      overflow: hidden;

      .progress-line {
        height: 100%;
        border-radius: 0.3125vw;
        background-image: linear-gradient(to right, #88BCFF 0%, #5088ff 100%);

        transition: all 0.8s ease-in-out;
      }
    }
  }
}
</style>