<template>
  <div ref="bodyEl" class="bg-white m-4 p-4">
    <h2 class="text-center text-2xl font-600 p-4 !mb-0">专项监督检查情况统计表</h2>
    <div class="text-right mb-4">
      <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
        <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
      </a-select>
      <a-select v-model:value="currentLb" @change="() => loadData()" class="float-left">
        <a-select-option key="1" value="11">药品经营批发企业</a-select-option>
        <a-select-option key="2" value="18">药品经营连锁总部企业</a-select-option>
      </a-select>
      <a-select v-model:value="currentJcfs" @change="() => loadData()" class="float-left">
        <a-select-option  v-for="item1 of zxjcJhmcs"  :index="index" :key="item1" :value="item1.name">{{item1.name}}
        </a-select-option>
      </a-select>
      <!-- <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button> -->
    </div>
    <table class="my-table !table-auto">
      <thead>
        <tr class="text-center">
          <th rowspan="2">辖区</th>
          <th rowspan="1" colspan="9">{{ currentLb == '11' ? '药品经营批发企业' : '药品经营连锁总部企业' }}</th>
        </tr>
        <tr class="text-center">
          <th rowspan="1">企业数量</th>
          <th rowspan="1">计划数量</th>
          <th rowspan="1">已检数量</th>
          <th rowspan="1">未检查</th>
          <th rowspan="1">基本符合规定</th>
          <th rowspan="1">立即整改</th>
          <th rowspan="1">限期整改</th>
          <th rowspan="1">现场处罚</th>
          <th rowspan="1">拟立案处罚</th>
        </tr>
      </thead>
      <tbody id="table-body">
        <tr class="text-center" v-for="(value, key) in wcqks">
          <td> {{ value.depart_name }}</td>
          <td><a-button type="link" class="!px-1">{{ value.qyzs }}</a-button> </td>
          <td><a-button @click="jhsClick(value)" type="link" class="!px-1">{{ value.jhs }}</a-button> </td>
          <td><a-button @click="jhsClick(value)" type="link" class="!px-1">{{ value.yjc }}</a-button> </td>
          <td><a-button @click="jhsClick(value)" type="link" class="!px-1">{{ value.jhs - value.yjc }}</a-button> </td>
          <td><a-button @click="jbfhClick(value,1)" type="link" class="!px-1">{{ value.jbfh }}</a-button> </td>
          <td><a-button @click="ljzgClick(value,2)" type="link" class="!px-1">{{ value.ljzg }}</a-button> </td>
          <td><a-button @click="xqzgClick(value,3)" type="link" class="!px-1">{{ value.xqzg }}</a-button> </td>
          <td><a-button @click="xccfClick(value,4)" type="link" class="!px-1">{{ value.xccf }}</a-button> </td>
          <td><a-button @click="lacnClick(value,5)" type="link" class="!px-1">{{ value.lacn }}</a-button> </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-xcjcqk">
import { computed, ref, onBeforeMount, onActivated, onMounted,watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLoading } from '/@/components/Loading';
import { useGo } from '/@/hooks/web/usePage';
import { useTabs } from '/@/hooks/web/useTabs';
import { defHttp } from '/@/utils/http/axios';
import { TableProps, default as Tools } from '/@/utils/tools';
import { getDictText, getCategoryText } from '/@/utils/dict/JDictSelectUtil';
import { listWcqk ,getJhmcByZxjc} from './TYwJcjhJcqk.api';
const go = useGo();
const route = useRoute();
const { setTitle } = useTabs();
const currentLb = ref('11');
const currentJcfs = ref('');
//计划名称专项检查
const zxjcJhmcs = ref([]);
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const wcqks = ref([]);
const countInfo = ref({});
const bodyEl = ref<ElRef>(null);
const [openLoading, closeLoading] = useLoading({ target: bodyEl, props: { tip: '加载中...', absolute: true } });
const reqParams = computed(() => {
  let params = { year: currentYear.value };
  params.zslx = currentLb.value;
  params.jhmc = currentJcfs.value
  return params;
});
watch(currentJcfs => {
  loadData();
});
onMounted(() => {
  loadData();
});
loadJhmc();
function loadJhmc() {
    getJhmcByZxjc(reqParams.value).then((res) => {
    zxjcJhmcs.value = res;
    if(res.length > 0) {
      currentJcfs.value = res[0].name
    }
  })
}

function jhsClick(value) {
  
  var par = reqParams.value;
  par.depart = value.depart_name;
  debugger
  if(value.jhs != 0) {
    if(par.zslx == '11') {
      go({ path: '/yqyd/11', query: par });
    }  else {
      go({ path: '/yqyd/18', query: par });
    }
    
  }
}
function jbfhClick(value,jcjl) {
  var par = reqParams.value;
  par.depart = value.depart_name;
  par.jcjl = jcjl;
  if(value.jbfh != 0 && par.depart != '合计') {
    go({ path: '/rcjg/jcbgglJhwcqk', query: par });
  }
}
function ljzgClick(value,jcjl) {
  var par = reqParams.value;
  par.depart = value.depart_name;
  par.jcjl = jcjl;
  if(value.ljzg != 0 && par.depart != '合计') {
    go({ path: '/rcjg/jcbgglJhwcqk', query: par });
  }
}
function xqzgClick(value,jcjl) {
  var par = reqParams.value;
  par.depart = value.depart_name;
  par.jcjl = jcjl;
  if(value.xqzg != 0 && par.depart != '合计') {
    go({ path: '/rcjg/jcbgglJhwcqk', query: par });
  }
}
function xccfClick(value,jcjl) {
  var par = reqParams.value;
  par.depart = value.depart_name;
  par.jcjl = jcjl;
  if(value.xccf != 0  && par.depart != '合计') {
    go({ path: '/rcjg/jcbgglJhwcqk', query: par });
  }
}
function lacnClick(value,jcjl) {
  var par = reqParams.value;
  par.depart = value.depart_name;
  par.jcjl = jcjl;
  if(value.lacn != 0  && par.depart != '合计') {
    go({ path: '/rcjg/jcbgglJhwcqk', query: par });
  }
}

function loadData() {
  listWcqk(reqParams.value).then((res) => {
    //if(res.length > 0) {
      wcqks.value = res;
    //}
   
  })
}



function onExportXls() {
  let array: Array<TableProps> = Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table'));
  if (!array || 1 > array.length) return;
  array[0].title = pageInfo.value.title;
  Tools.downloadExcel(array[0].title, array);
}



defineExpose({});
</script>

<style lang="less" scoped>
.item {
  white-space: nowrap;
}
</style>