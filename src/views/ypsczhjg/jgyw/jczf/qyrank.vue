<template>
  <div class="rank">
    <h4 class="title">{{ title }}</h4>
    <ul class="list" :style="{ height: height ? `${height}px` : 'auto', overflow: 'auto' }">
      <li :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span @click="goxx(item, xmlx, year)" class="number cursor-pointer" :title="item.name">{{ item.name.length > 30 ? item.name.substr(0, 25) + '......' : item.name }}</span>
        <span @click="goxx(item, xmlx, year)" class="number cursor-pointer">{{ item.total }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useGo } from '/@/hooks/web/usePage';
import { stubString } from 'lodash-es';

export default defineComponent({
  name: 'qyrank',
  props: {
    title: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    year: {
      type: String,
      default: '',
    },
    xmlx: {
      type: String,
      default: '',
    },
  },
  setup() {
    const go = useGo();
    function goxx(item, lx, year) {
      if (lx == 'rcjg') {
        go({ path: '/jgyw/jdjc/jgjl', query: { year: item.year, jcr: item.name } });
      } else if (lx == 'jczf') {
        go({ path: '/jgyw/jyjczf', query: { tj: 'Y', shxydm: item.shxydm,year: year} });
      } else if ('qxyj' == lx) {
        go({ path: '/jgyw/jdjc/jgjl', query: { year: year, qxyj: item.code } });
      } else if (lx == 'wfxw') {
        go({ path: '/jgyw/jyjczf', query: { tj: 'Y', cfyj: item.name } });
      }

    }

    return {
      goxx
    };



  }
});
</script>

<style lang="less" scoped>
.rank {
  padding: 0 32px 32px 72px;

  .list {
    margin: 25px 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;

    li {
      margin-top: 16px;

      span {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 22px;



        &:first-child {
          background-color: #f5f5f5;
          border-radius: 20px;
          display: inline-block;
          font-size: 12px;
          font-weight: 600;
          margin-right: 24px;
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
        }

        &.active {
          background-color: #314659;
          color: #fff;
        }

        &:last-child {
          float: right;
        }
      }
    }
  }
}

.mobile .rank {
  padding: 0 32px 32px 32px;
}
</style>
