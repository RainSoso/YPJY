<template>
  <div class="rank">
    <h4 class="title">{{ title }}</h4>
    <ul class="list" :style="{ height: height ? `${height}px` : 'auto', overflow: 'auto' }">
      <li  :key="index" v-for="(item, index) in list">
        <span :class="index < 3 ? 'active' : null">{{ index + 1 }}</span>
        <span @click="goxx(item,xmlx,year)" class="number cursor-pointer" >{{ item.qymc }}</span>
        <span @click="goxx(item,xmlx,year)" class="number cursor-pointer">{{ item.num }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useGo } from '/@/hooks/web/usePage';

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
      year: {
        type: String,
        default: '',
      },
      height: {
        type: Number,
        default: null,
      },
      xmlx:{
        type: String,
        default: '',
      },
    },
    setup() {
    const go = useGo();
    function goxx(item,lx,year){
      debugger
      if(lx == 'jdjc'){
        go({ path: '/rcjg/jcbggl', query: { shxydm:item.shxydm,jcjg_:'bhg',year_:year }});
      }else if(lx == 'jczf'){
        go({ path: '/jgyw/jczf', query: {tj:'Y', shxydm:item.shxydm } });
      }else if('qxyj' == lx){
        go({ path: '/jgyw/jdjc/jgjl', query: {year:year,qxyj:item.code}});
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
