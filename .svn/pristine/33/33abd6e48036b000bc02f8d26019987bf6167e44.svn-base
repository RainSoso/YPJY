<template>
  <div class="bg-white m-1 overflow-hidden">
    <a-spin :spinning="loading">
      <!--组织机构树-->
      <BasicTree ref="treeRef" v-if="!treeReloading" title="特药申报状态" toolbar showLine :checkStrictly="true"
        :clickRowToExpand="false" :treeData="treeData" :selectedKeys="selectedKeys" :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent" @select="onSelect" @expand="onExpand">
        <template #headerTitle>
          计划年度：
          <a-select v-model:value="params.jhYear" :options="yearArray" :placeholder="currentYear" style="width: 100px">    
          </a-select>
          <a-button type="primary" @click="onSearch" >查询</a-button>
        </template>
        <template #title="{ title, qty }">
          <span>{{ title }}</span>
          <span v-if="qty && 0 < qty" style="color:red;">（{{ qty }}）</span>
        </template>
      </BasicTree>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { inject, nextTick, ref, unref,  computed } from 'vue'
import { useMessage } from '/@/hooks/web/useMessage'
import { BasicTree, TreeActionType } from '/@/components/Tree'
import { queryTree } from './PYwTyjhsq.api';
import Tools from '/@/utils/tools';

const yearArray = computed(() => Tools.getYearArrayOptions(currentYear.value));
const currentYear = ref(setJhYear());

const prefixCls = inject('prefixCls')
const emit = defineEmits(['select'])
const { createMessage } = useMessage()
const params=ref({})

let loading = ref<boolean>(false)
const treeRef = ref<Nullable<TreeActionType>>(null);
// 树列表数据
let treeData = ref<any[]>([])
// 当前展开的项
let expandedKeys = ref<any[]>([])
// 当前选中的项
let selectedKeys = ref<any[]>([])
// 是否自动展开父级
let autoExpandParent = ref<boolean>(true)

// 树组件重新加载
let treeReloading = ref<boolean>(false)


// 加载部门信息
function loadDepartTreeData() {
  loading.value = true
  treeData.value = []
  if(!params.value.jhYear){
    params.value.jhYear=setJhYear()
  }
  queryTree(params.value).then(res => {
    if (Array.isArray(res)) {
      treeData.value = res
      autoExpandParentNode()
    }
  }).finally(() => loading.value = false)
}

loadDepartTreeData()

// 自动展开父节点，只展开一级
function autoExpandParentNode() {
  let keys: Array<any> = [], datas = [];
  treeData.value.forEach((item, index) => {
    if (1 > keys.length && item.children && item.children.length > 0) {
      keys.push(item.key);
      datas.push(item);
    }
  })
  if (keys.length > 0) {
    reloadTree()
    expandedKeys.value = keys
    unref(treeRef)?.setSelectedKeys([keys[0]]);
    setSelectedKey(keys[0], datas[0]);
  }
}

// 重新加载树组件，防止无法默认展开数据
async function reloadTree() {
  await nextTick()
  treeReloading.value = true
  await nextTick()
  treeReloading.value = false
}

/**
 * 设置当前选中的行
 */
function setSelectedKey(key: string, data?: object) {
  selectedKeys.value = [key]
  if (data) {
    emit('select', data)
  }
}

/**
 * 默认查询时间
 */
 function setJhYear() {
  let year=Tools.getCurrentYear();
  let now=new Date();
  let month=now.getMonth();
  if(month>=9){
    return year+1
  }else{
    return year
  }
}

// 搜索事件
function onSearch(value: string,data?: object) {
  loadDepartTreeData()
  emit('select', data)
}


// 树选择事件
function onSelect(selKeys, event) {
  if (selKeys.length > 0 && selectedKeys.value[0] !== selKeys[0]) {
    setSelectedKey(selKeys[0], event.selectedNodes[0].props)
  } else {
    // 这样可以防止用户取消选择
    setSelectedKey(selectedKeys.value[0])
  }
}

// 树展开事件
function onExpand(keys) {
  expandedKeys.value = keys
  autoExpandParent.value = false
}

defineExpose({
  loadDepartTreeData,
})
</script>
