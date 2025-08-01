<template>
  <a-result status="500" title="该功能建设中..." sub-title="">
    <template #extra>
      <a-button type="primary" @click="redo">刷新</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRedo } from '/@/hooks/web/usePage';

export default defineComponent({
  setup() {
    const redo = useRedo();
    return {
      redo
    };
  }
});
</script>
