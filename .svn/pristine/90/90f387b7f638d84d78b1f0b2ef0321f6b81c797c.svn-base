<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="5" :lg="8" :md="10" :sm="24" style="flex: 1;">
      <a-card :bordered="false" style="height:100%;" :bodyStyle="{ padding: '10px' }">
        <FlfgTree ref="leftTree" @select="onTreeSelect" />
      </a-card>
    </a-col>
    <a-col :xl="19" :lg="16" :md="14" :sm="24" style="flex: 1;">
      <a-card :bordered="false" style="height: 100%;" :bodyStyle="{ padding: '0 5px' }">
        <ZskFlfgList :data="flfgData" @success="onSuccess" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="jgyw-flfg">
import { ref, provide, unref } from 'vue'
import { useDesign } from '/@/hooks/web/useDesign'
import FlfgTree from './FlfgTree.vue'
import ZskFlfgList from './ZskFlfgList.vue'

const { prefixCls } = useDesign('depart-manage')
provide('prefixCls', prefixCls)

const flfgData = ref({});
const leftTree = ref<any>(null);

function onTreeSelect(data) {
  flfgData.value = data;
}
function onSuccess() {
  leftTree.value.loadDepartTreeData();
}
</script>

<style lang="less">
</style>
