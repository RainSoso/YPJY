<template>
  <yppzList :forceTags="forceTags" :showTags="false" :tagTitle="(route.query?.tagTitle || '') + ''" :showJcmx="true" />
</template>
<script lang="ts" name="zdjg-swzp" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import yppzList from '/@/views/ypsczhjg/jc/components/yppz-list.vue';

const route = useRoute();
const forceTags = ref(['A02A09A03']);

</script>
<style scoped>
</style>
