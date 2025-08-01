<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4 !mb-0">药品生产监督检查任务完成情况(重点品种生产企业)</h2>
        <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <table class="my-table !table-auto">
            <thead>
                <tr class="text-center">
                    <!-- <th rowspan="2">年度</th> -->
                    <th rowspan="2" style="width: 80px;">辖区</th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A09A03'})">集采品种</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A05'})">生物制品</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A09A06'})">儿童用药</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A03A03'})">多组分生化药</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A04A03'})">中药注射剂</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A05'})">麻醉药品</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A06A03'})">第一类精神药品</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A06A04'})">第二类精神药品</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A04'})">药品类易制毒</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A07'})">放射性药品</a-button></th>
                    <th colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A03'})">医疗用毒性药品</a-button></th>
                </tr>
                <tr class="text-center">
                    <td>企业数量</td>
                    <td>完成情况(已完成/品种数/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/品种数/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                    <td>企业数量</td>
                    <td>完成情况(已完成/未完成)</td>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr v-for="(item, idx) in Data" :key="idx">
                    <!-- <td class="text-center">
                        {{ item.year }}
                    </td> -->
                    <td class="text-center">
                        {{ getAreaName(item.xzqhdm) }}
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[0]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','jc','0',item.jcNum,'集采品种企业')">{{ item.jcNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[0]+' | '+'完成情况(已完成/品种数/未完成)'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qyjcyp','jcyp','1',item.jcypYjNum,'集采品种')">{{ item.jcypYjNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, 'qyjcyp','jcyp','0',item.jcypNum,'集采品种')">{{item.jcypNum}}</a-button> 
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item, 'qyjcyp','jcyp','11',item.jcypNum-item.jcypYjNum,'集采品种')">{{isNull(item.jcypNum-item.jcypYjNum)}} </a-button>     
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[1]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','swzp','0',item.swzpNum,'生物制品企业')">{{ item.swzpNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[1]+' | '+'完成情况（(已完成/品种数/未完成)'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qyswzjyp','swzpyp','1',item.swzpypYjNum,'生物制品')">{{ item.swzpypYjNum }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qyswzjyp','swzpyp','0',item.swzpypNum,'生物制品')">{{item.swzpypNum}}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qyswzjyp','swzpyp','11',item.swzpypNum-item.swzpypYjNum,'生物制品')">{{isNull(item.swzpypNum-item.swzpypYjNum)}} </a-button> 
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[2]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','etyy','0',item.etyyNum,'儿童用药企业')">{{ item.etyyNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[2]+' | '+'完成情况(已完成/未完成)'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','etyy','1',item.etyyYjNum,'儿童用药')">{{ item.etyyYjNum }} </a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','etyy','11',item.etyyNum-item.etyyYjNum,'儿童用药')">{{isNull(item.etyyNum-item.etyyYjNum)}} </a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[3]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','dzfsh','0',item.dzfshNum,'多组分生化药企业')">{{ item.dzfshNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[3]+' | '+'完成情况(已完成/未完成)'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','dzfsh','1',item.dzfshYjNum,'多组分生化药')">{{ item.dzfshYjNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','dzfsh','11',item.dzfshNum-item.dzfshYjNum,'多组分生化药')">{{isNull(item.dzfshNum-item.dzfshYjNum)}}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[4]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','zyzsj','0',item.zyzsjNum,'中药注射剂企业')">{{ item.zyzsjNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[4]+' | '+'完成情况(已完成/未完成)'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','zyzsj','1',item.zyzsjYjNum,'中药注射剂')">{{ item.zyzsjYjNum }}</a-button> 
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','zyzsj','11',item.zyzsjNum-item.zyzsjYjNum,'中药注射剂')"> {{isNull(item.zyzsjNum-item.zyzsjYjNum)}}</a-button> 
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[5]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','mzyp','0',item.mzypNum,'麻醉药品企业')">{{ item.mzypNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[5]+' | '+'完成情况(已完成/未完成)'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','mzyp','1',item.mzypYjNum,'麻醉药品')">{{ item.mzypYjNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','mzyp','11',item.mzypNum-item.mzypYjNum,'麻醉药品')">{{isNull(item.mzypNum-item.mzypYjNum)}}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[6]+' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','yijsyp','0',item.yijsypNum,'第一类精神药品企业')">{{ item.yijsypNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[6]+' | '+'完成情况(已完成/未完成)'">                    
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','yijsyp','1',item.yijsypYjNum,'第一类精神药品')">{{ item.yijsypYjNum }}</a-button> 
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','yijsyp','11',item.yijsypNum-item.yijsypYjNum,'第一类精神药品')">{{isNull(item.yijsypNum-item.yijsypYjNum)}} </a-button> 
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[7]+' | '+'企业数量'">                 
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','erjsyp','0',item.erjsypNum,'第二类精神药品企业')">{{ item.erjsypNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[7]+' | '+'完成情况(已完成/未完成)'">                   
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','erjsyp','1',item.erjsypYjNum,'第二类精神药品')">{{ item.erjsypYjNum }}</a-button> 
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','erjsyp','11',item.erjsypNum-item.erjsypYjNum,'第二类精神药品')">{{isNull(item.erjsypNum-item.erjsypYjNum)}}</a-button>   
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[8]+' | '+'企业数量'">              
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ypyzd','0',item.ypyzdNum,'药品类易制毒企业')">{{ item.ypyzdNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[8]+' | '+'完成情况(已完成/未完成)'">                  
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ypyzd','1',item.ypyzdYjNum,'药品类易制毒')">{{ item.ypyzdYjNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ypyzd','11',item.ypyzdNum-item.ypyzdYjNum,'药品类易制毒')">{{isNull(item.ypyzdNum-item.ypyzdYjNum)}}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[9]+' | '+'企业数量'">                 
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','fsxyp','0',item.fsxypNum,'放射性药品企业')">{{ item.fsxypNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[9]+' | '+'完成情况(已完成/未完成)'">                  
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','fsxyp','1',item.fsxypYjNum,'放射性药品')">{{ item.fsxypYjNum }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','fsxyp','11',item.fsxypNum-item.fsxypYjNum,'放射性药品')">{{isNull(item.fsxypNum-item.fsxypYjNum)}}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[10]+' | '+'企业数量'">               
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ylydxyp','0',item.ylydxypNum,'医疗用毒性药品企业')">{{ item.ylydxypNum }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm)+' | '+lbpzTitle[10]+' | '+'完成情况(已完成/未完成)'">               
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ylydxyp','1',item.ylydxypYjNum,'医疗用毒性药品')">{{ item.ylydxypYjNum }}</a-button> 
                        /  <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ylydxyp','11',item.ylydxypNum-item.ylydxypYjNum,'医疗用毒性药品')">{{isNull(item.ylydxypNum-item.ylydxypYjNum)}}</a-button> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-zdpz">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const lbpzTitle=["集采品种","生物制品","儿童用药","多组分生化药","中药注射剂","麻醉药品","第一类精神药品","第二类精神药品","药品类易制毒","放射性药品","儿医疗用毒性药品童用药"];
const go = useGo();
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const Data = ref([]);
const bodyEl = ref<ElRef>(null);

function loadData(params = { year: currentYear.value }) {
  defHttp.get({ url: '/jc/yw/jdjc/zdpzscqyByArea', params: params }).then((res) => {
    Data.value = (res || []).map((i) => {
      i.showZsDetail = false;
      return i;
    });
  });
}

function getAreaName(text) {
  return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|州|土家族苗族自治州)$/g, '分局');
}

function isNull(text){
    if(!text)return "0";
    return text;
}

function toPzListPage(item, lx,yppz, isYj,num,title) {
  let qy = { year: currentYear.value, xzqhdm: item.xzqhdm, yppzlx:yppz, isYj: isYj };
  if (lx == 'qy') {
    go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoQyDetail', query: {year: currentYear.value,xzdm:item.xzqhdm,yppzlx:yppz,isYj: isYj,num:num, zslx:6, title:title} });
  }
  if (lx == 'qyjcyp') {
    go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoPzDetail', query: {year: currentYear.value, xzdm:item.xzqhdm, yppzlx:yppz,zslx:6, isYj: isYj ,num:num,title:title} });
  } 
  if (lx == 'qyswzjyp') {
    go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoPzDetail', query: {year: currentYear.value, xzdm:item.xzqhdm, yppzlx:yppz,zslx:6, isYj: isYj ,num:num,title:title} });
    // go({ path: '/ypyd/gcyppz', query: qy });
  } 
}

function toWorkloadPage(query) {
    go({ path: '/jgyw/jdjc/xcjcqk', query });
}

function onExportXls(){
    Tools.downloadExcel('药品生产监督检查任务完成情况(重点品种生产企业)', Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table')));
}


loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.my-table th {
    :deep(.ant-btn) {
        padding: 0;
        white-space: unset;
    }
}

.item {
    white-space: nowrap;
}
</style>