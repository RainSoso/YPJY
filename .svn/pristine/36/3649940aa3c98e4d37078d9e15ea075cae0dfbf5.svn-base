<template>
  <a-select v-model:value="value" style="width: 100%" mode="multiple" placeholder="请选择" @change="change"
    :options="formattedMonths.map(item => ({ value: item }))">
    <template #dropdownRender="{ menuNode: menu }">
      <div class="select-time" style="padding: 4px 8px; cursor: pointer" @mousedown="e => e.preventDefault()">
        <Icon icon="ant-design:double-left-outlined" color="#d7d7d7" @click="handleLeftButtonClick"></Icon>
        <div>{{ currentYear }}</div>
        <Icon icon="ant-design:double-right-outlined" color="#d7d7d7" @click="handleRightButtonClick"></Icon>
      </div>
      <a-divider style="margin: 4px 0" />
      <v-nodes :vnodes="menu" />
    </template>
  </a-select>
</template>
<script>
import { PlusOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, computed } from 'vue';
import { Icon } from '/@/components/Icon';
import dayjs from 'dayjs';
let index = 0;
export default defineComponent({
  props: {
    types: {
      type: String,
      required: true,
      default: 1
    },
  },
  components: {
    PlusOutlined,
    Icon,
    VNodes: (_, { attrs, }) => {
      return attrs.vnodes;
    },
  },
  setup (options, { emit }) {
    // 使用 ref 创建响应式变量
    let currentYear = ref(dayjs().format('YYYY'));
    const formattedMonths = computed(() => {
      let monthNames = null
      if (options.types == 1) {
        monthNames = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      }
      return monthNames.map(month => `${currentYear.value}-${month}`);
    });
    const addItem = () => {
      console.log('addItem');
      items.value.push(`New item ${index++}`);
    };
    const value = ref([]);
    // 左切换按钮点击事件处理程序
    function handleLeftButtonClick () {
      currentYear.value = dayjs(currentYear.value).subtract(1, 'year').format('YYYY');
    }
    // 右切换按钮点击事件处理程序
    function handleRightButtonClick () {
      currentYear.value = dayjs(currentYear.value).add(1, 'year').format('YYYY');
    }
    function change (e) {
      console.log(e)
      emit('changeSelect', e)
    }
    function clear (e) {
      value.value = [];
    }
    return {
      value,
      formattedMonths,
      currentYear,
      handleLeftButtonClick,
      handleRightButtonClick,
      change,
      clear
    };
  },
});
</script>

<style lang="less">
.select-time {
  display: flex;
  padding: 3px 5px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
</style>
