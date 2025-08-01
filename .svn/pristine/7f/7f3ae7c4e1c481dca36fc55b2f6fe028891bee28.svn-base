<template>
   <div class="bg-white m-4 p-4">
      <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
        </div>
   <jobrank :list="rankList" title="工作量(检查次数)排行榜" style="width: 600px; margin: 0 auto" :xmlx="xmlx"></jobrank>
   </div>
</template>

<script lang="ts" name="yqyd-rank-@rank" setup>
import  jobrank  from '/@/views/ypsczhjg/jgyw/jczf/qyrank.vue';
import { ref , computed} from 'vue';
import { defHttp } from '/@/utils/http/axios';
import Tools from '/@/utils/tools';
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(()=>Tools.getYearArray(currentYear.value));
const xmlx = ref('rcjg')
const  rankList = ref([]);

function loadData(params = { year: currentYear.value }) {
defHttp.get({ url: '/yw/rcjg/jgjg/jobTop', params: params }).then((res) => {
   rankList.value = res;

})
}
loadData();
defineExpose({});
</script>