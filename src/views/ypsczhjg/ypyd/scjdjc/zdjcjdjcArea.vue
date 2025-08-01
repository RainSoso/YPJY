<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4 !mb-0">湖北省药品生产监督检查任务完成情况表（重点检查）</h2>
        <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <table class="my-table !table-auto">
            <thead>
                <tr class="text-center">
                    <th rowspan="3" style="width: 80px;">责任单位</th>
                    <th colspan="9">药品GMP符合性检查</th>
                    <th colspan="8">专项检查</th>
                    <th colspan="4">有因检查</th>
                    <th colspan="2" rowspan="2">药物警戒检查</th>               
                </tr>
                <tr class="text-center">
                    <th colspan="3">疫苗</th>
                    <th colspan="2">生物制品（疫苗除外）</th>
                    <th colspan="2">高风险药品</th>
                    <th colspan="2">新冠治疗药</th>
                    <th colspan="2">中药饮片</th>
                    <th colspan="2">委托生产持有人</th>
                    <th colspan="2">麻精药品</th>
                    <th colspan="2">促产保供应急审批药品</th>
                    <th colspan="2">线索产生</th>
                    <th colspan="2">分派任务</th>
                </tr>
                <tr class="text-center">
                    <td>检查频次</td>
                    <td>品种数量</td>
                    <td>检查频次/品种检查数/品种未检数</td>
                    <td>企业数量</td>
                    <td>品种检查数/品种应检数/品种未检数</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
                    <td>企业数量</td>
                    <td>完成情况（已检/未检）</td>
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
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[0] +' | '+'检查频次' ">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','jc','0')">{{ item.jcpc }}</a-button> -->
                        /
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[0] +' | '+'品种数量' ">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'pz','ym','0')">{{ item.ymypNum }}</a-button> -->
                        /
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[0] +' | '+'检查频次/品种检查数' ">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'qyjcpc','jcpc','1')">{{ item.jcpc }}</a-button>
                        /  <a-button type="link" class="!px-1" @click="toPzListPage(item, 'pz','ym','1')">{{item.ympzYjNum}}</a-button>       -->
                        /
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[1] +' | '+'企业数量'">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','swzj','0')">{{item.swzjJcqy}}</a-button>    -->
                        /
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[1] +' | '+'品种检查数/品种应检数'">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'pz','swzj','1')">{{ item.swzjpzYjNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(item,'pz','swzj','0')">{{ item.swzjypNum }}</a-button> -->
                        /
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[2] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','gfxyp','0',item.gfxypJcqy,'高风险药品企业')">{{ item.gfxypJcqy }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[2] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','gfxyp','2',item.gfxypYjJcqy),'高风险药品'">{{ item.gfxypYjJcqy }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','gfxyp','22',item.gfxypJcqy-item.gfxypYjJcqy,'高风险药品')">{{ isNull(item.gfxypJcqy-item.gfxypYjJcqy) }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[3] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','xgzly','0',item.xgzlyJcqy,'新冠治疗药企业')">{{ item.xgzlyJcqy }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[3] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','xgzly','2',item.xgzlyYjJcqy,'新冠治疗药')">{{ item.xgzlyYjJcqy }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','xgzly','22',item.xgzlyJcqy-item.xgzlyYjJcqy,'新冠治疗药')">{{ isNull(item.xgzlyJcqy-item.xgzlyYjJcqy) }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[4] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','zyyp','0',item.zyypJcqy,'中药饮片企业')">{{ item.zyypJcqy }}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[4] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','zyyp','3',item.zyypYjJcqy,'中药饮片')">{{ item.zyypYjJcqy }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','zyyp','33',item.zyypJcqy-item.zyypYjJcqy,'中药饮片')">{{ isNull(item.zyypJcqy-item.zyypYjJcqy) }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[5] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','wtsccyr','0',item.wtsccyrJcqy,'委托生产持有人企业')">{{ item.wtsccyrJcqy }}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[5] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','wtsccyr','3',item.wtsccyrYjJcqy,'委托生产持有人')">{{ item.wtsccyrYjJcqy }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','wtsccyr','33',item.wtsccyrJcqy-item.wtsccyrYjJcqy,'委托生产持有人')">{{ isNull(item.wtsccyrJcqy-item.wtsccyrYjJcqy) }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[6] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','mjyp','0',item.mjypJcqy,'麻精药品企业')">{{ item.mjypJcqy }}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[6] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','mjyp','3',item.mjypYjJcqy,'麻精药品')">{{ item.mjypYjJcqy }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','mjyp','33',item.mjypJcqy-item.mjypYjJcqy,'麻精药品')">{{ isNull(item.mjypJcqy-item.mjypYjJcqy) }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[7] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','cyj','0',item.cyjJcqy,'促产保供应急审批药品企业')">{{ item.cyjJcqy }}</a-button>   
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[7] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','cyj','3',item.cyjYjJcqy,'促产保供应急审批药品')">{{ item.cyjYjJcqy}}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','cyj','33',item.cyjJcqy-item.cyjYjJcqy,'促产保供应急审批药品')">{{ isNull(item.cyjJcqy-item.cyjYjJcqy) }}</a-button>
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[8] +' | '+'企业数量'">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','xscs','0')">{{ item.xscsNum }}</a-button>   -->
                        {{ item.xscsJcqy }}
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[8] +' | '+'完成情况（已检/未检）'">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','xscs','1')">{{ item.xscsYjNum }}</a-button> -->
                        {{ item.xscsYjJcqy }}/{{ isNull(item.xscsJcqy-item.xscsYjJcqy) }}
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[9] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','fprw','0',item.fprwJcqy,'分派任务企业')">{{ item.fprwJcqy }}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[9] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','fprw','5',item.fprwYjJcqy,'分派任务')">{{ item.fprwYjJcqy }}</a-button>/
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','fprw','55',item.fprwJcqy-item.fprwYjJcqy,'分派任务')">{{isNull(item.fprwJcqy-item.fprwYjJcqy) }}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[10] +' | '+'企业数量'">  {{ item.ywjjJcqy }}</td>
                    <td class="text-center" :title="getAreaName(item.xzqhdm) +' | '+lbjcTitle[10] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(item,'qy','ywjj','4',item.ywjjYjJcqy,'药物警戒检查')">{{ item.ywjjYjJcqy }}</a-button>
                        /{{ isNull(item.ywjjJcqy-item.ywjjYjJcqy) }} 
                    </td>
                </tr>
                <tr class="text-center" v-if="shengJu.show">
                    <!-- <th rowspan="3">年度</th> -->
                    <td style="width: 80px;">省局检查中心</td>
                    <td :title="'省局检查中心' +' | '+lbjcTitle[0] +' | '+'检查频次'">{{shengJu.jcpc}}</td>
                    <td :title="'省局检查中心' +' | '+lbjcTitle[0] +' | '+'品种数量'">
                        <a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'pz','ymJcpz','0',shengJu.ymypNum,'疫苗企业')">{{ shengJu.ymypNum }}</a-button>
                    </td >
                    <td class="text-center" :title="'省局检查中心' +' | '+lbjcTitle[0] +' | '+'检查频次/品种检查数/品种未检数'">                     
                        <!-- <a-button type="link" class="!px-1" @click="toPzListPage(item,'qyjcpc','jcpc','1')">{{ shengJu.jcpc }}</a-button> -->
                        {{ shengJu.jcpc }}
                        / <a-button type="link" class="!px-1" @click="toPzListPage(shengJu, 'pz','ymJcpz','1',shengJu.ymypYjNum,'疫苗')">{{shengJu.ymypYjNum}}</a-button> 
                        /<a-button type="link" class="!px-1" @click="toPzListPage(shengJu, 'pz','ymJcpz','11',shengJu.ymypNum-shengJu.ymypYjNum,'疫苗')">{{isNull(shengJu.ymypNum-shengJu.ymypYjNum)  }} </a-button>   
                    </td>
                    <td class="text-center" :title="'省局检查中心' +' | '+lbjcTitle[1] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'qy','swzj','0',shengJu.swzjJcqy,'生物制品企业')">{{shengJu.swzjJcqy}}</a-button>     
                    </td>
                    <td class="text-center" :title="'省局检查中心' +' | '+lbjcTitle[1] +' | '+'品种检查数/品种应检数/品种未检数'">                     
                        <a-button  type="link" class="!px-1" @click="toPzListPage(shengJu,'pz','swzpJcpz','1',shengJu.swzjpzYjNum,'生物制品')">{{ shengJu.swzjpzYjNum }}</a-button>
                        / <a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'pz','swzpJcpz','0',shengJu.swzjypNum,'生物制品')">{{ shengJu.swzjypNum }}</a-button>
                        /<a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'pz','swzpJcpz','11',shengJu.swzjypNum-shengJu.swzjpzYjNum,'生物制品')">{{isNull(shengJu.swzjypNum-shengJu.swzjpzYjNum)  }}</a-button>
                    </td>
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td>/</td> 
                    <td class="text-center" :title="getAreaName(shengJu.xzqhdm) +' | '+lbjcTitle[9] +' | '+'企业数量'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'qy','fprw','0',shengJu.fprwJcqy,'分派任务')">{{ shengJu.fprwJcqy }}</a-button>  
                    </td>
                    <td class="text-center" :title="getAreaName(shengJu.xzqhdm) +' | '+lbjcTitle[9] +' | '+'完成情况（已检/未检）'">                     
                        <a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'qy','fprw','5',shengJu.fprwYjJcqy,'分派任务')">{{ shengJu.fprwYjJcqy }}</a-button>/
                        <a-button type="link" class="!px-1" @click="toPzListPage(shengJu,'qy','fprw','55',shengJu.fprwJcqy-shengJu.fprwYjJcqy,'分派任务')">{{isNull(shengJu.fprwJcqy-shengJu.fprwYjJcqy) }}</a-button>  
                    </td>
                    <td>/</td> 
                    <td>/</td>               
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-zdjc">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';
import { getTextByCode } from '/@/utils/area/areaDataUtil';

const lbjcTitle=["疫苗","生物制品（疫苗除外）","高风险药品","新冠治疗药","中药饮片","委托生产持有人","麻精药品","促产保供应急审批药品","线索产生","分派任务","药物警戒检查"]; 
const go = useGo();
const bodyEl = ref<ElRef>(null);
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const Data = ref([]);
const shengJu=ref({
    jcpc:0,
    ymypNum:0,
    ymypYjNum:0,
    swzjJcqy:0,
    swzjypNum:0,
    swzjpzYjNum:0,
    xzqhdm:"420000",
    fprwJcqy:0,
    fprwYjJcqy:0,
    show:false
});

function loadData(params = { year: currentYear.value }) {
  defHttp.get({ url: '/jc/yw/jdjc/zdjcjdByArea', params: params }).then((res) => {
    Data.value = (res || []).map((i) => {
      i.showZsDetail = false;
      shengJu.value.jcpc=i.jcpc;
      shengJu.value.ymypNum+=i.ymypNum?i.ymypNum:0;
      shengJu.value.ymypYjNum+=i.ympzYjNum?i.ympzYjNum:0;
      shengJu.value.swzjJcqy+=i.swzjJcqy?i.swzjJcqy:0;
      shengJu.value.swzjypNum+=i.swzjypNum?i.swzjypNum:0;
      shengJu.value.swzjpzYjNum+=i.swzjpzYjNum?i.swzjpzYjNum:0
      shengJu.value.fprwJcqy+=i.fprwJcqy?i.fprwJcqy:0
      shengJu.value.fprwYjJcqy+=i.fprwYjJcqy?i.fprwYjJcqy:0
      shengJu.value.show=true 
      if(i.ywjjJcqy>0){
        i.ywjjJcqy= Math.ceil(i.ywjjJcqy/4)
        }else{
            i.ywjjJcqy
        }
      return i;
    });
    
  });
}

function isNull(text){
    if(!text)return "0";
    if(text<0)return "0";
    return text;
}

function getAreaName(text) {
  return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|州|土家族苗族自治州)$/g, '分局');
}

function toPzListPage(item, lx,yppz, isYj,num,title) {
    let zs="6"
    if(yppz=="ywjj")zs="201010"
    let qy = { year: currentYear.value, xzqhdm: item.xzqhdm,yppzlx:yppz, isYj: isYj,num:num, zslx:6, title:title };
    if (lx == 'qy') {
        go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoQyDetail', query: {year: currentYear.value,xzdm:item.xzqhdm,yppzlx:yppz,isYj: isYj,num:num, zslx:zs, title:title} });
    }  
    if (lx == 'pz') {
        go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoPzDetail', query: {year: currentYear.value,xzdm:item.xzqhdm,yppzlx:yppz,isYj: isYj,zslx:zs ,num:num,title:title} });
    } 
}

function onExportXls(){
    Tools.downloadExcel('湖北省药品生产监督检查任务完成情况表（重点检查）', Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table')));
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.item {
  white-space: nowrap;
}
</style>