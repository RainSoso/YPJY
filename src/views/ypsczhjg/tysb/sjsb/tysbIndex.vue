<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="7" :lg="9" :md="10"  >
      <a-card :bordered="false" style="height:100%;" :bodyStyle="{ padding: '10px' }">
        <tysbStateTree ref="leftTree" @select="onTreeSelect" />
      </a-card>
    </a-col>
    <a-col :xl="17" :lg="15" :md="14"  >
      <a-card :bordered="false" style="height: 100%;" :bodyStyle="{ padding: '0 5px' }">
        <sjtysbList :data="tysbData" @success="onSuccess" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="jgyw-flfg">
import { ref, provide, unref } from 'vue'
import { useDesign } from '/@/hooks/web/useDesign'
import tysbStateTree from './tysbStateTree.vue'
import sjtysbList from './sjtysbList.vue'

const { prefixCls } = useDesign('depart-manage')
provide('prefixCls', prefixCls)

const tysbData = ref({});
const leftTree = ref<any>(null);


function onTreeSelect(data) {
  tysbData.value = data;
}
function onSuccess() {
  leftTree.value.loadDepartTreeData();
}
</script>

<style lang="less">
</style>
