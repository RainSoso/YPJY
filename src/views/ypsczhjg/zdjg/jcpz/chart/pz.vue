<template>
    <div class="bg-white m-4 p-4">
        <h2 class="text-center text-2xl font-600 p-4">本省生产药品中，集采中选的高风险品种、重点品种数量概况</h2>
        <div class="pb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
        </div>
        <table class="my-table !table-auto">
            <colgroup>
                <col style="width:200px;" />
                <col />
                <col />
                <col style="width:210px;"/>
                <col style="width:190px;"/>
            </colgroup>
            <thead>
                <tr class="text-center">
                    <th colspan="3">品种情况</th>
                    <th rowspan="2">生产环节监督检查完成情况</th>
                    <th rowspan="2">检验工作情况</th>
                </tr>
                <tr class="text-center">
                    <th>类别</th>
                    <th>品种</th>
                    <th>文号</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in projectArray" :key="idx">
                    <td class="text-right">
                        <span v-if="!isVNode(item.title)">{{ item.title }}</span>
                        <component :is="item.title" v-else />
                    </td>
                    <td class="align-top">
                        <div class="font-600 text-lg text-center">
                            <a-button type="link" class="!text-lg" @click="() => item.showPzDetails = !item.showPzDetails">
                                {{ Data[item.pzs] }}
                            </a-button>
                        </div>
                        <div class="more-info" :class="[item.showPzDetails && 'show' || '']">
                            <span class="item" v-for="(str, idx) in item.pzValue">{{ str }}{{ idx + 1 < item.pzValue.length
                                ? '、' : '。' }}</span>
                        </div>
                    </td>
                    <td class="align-top">
                        <div class="font-600 text-lg text-center">
                            <a-button type="link" class="!text-lg" @click="() => item.showWhDetails = !item.showWhDetails">
                                {{ Data[item.whs] }}
                            </a-button>
                        </div>
                        <div class="more-info" :class="[item.showWhDetails && 'show' || '']">
                            <span class="item cursor-pointer" @click="toPzwhDetial(str)"
                                v-for="(str, idx) in item.whValue">{{ str }}{{ idx + 1 < item.whValue.length ? '、' : '。'
                                }}</span>
                        </div>
                    </td>
                    <td v-if="idx == 0" :rowspan="projectArray.length" class="text-center">
                        <div>检查家次:<Button type="link" @click="gojdjc('0')">{{ Data.jcjc || 0  }}</Button></div>
                        <div>责令整改家次:<Button type="link" @click="gojdjc('02')">{{ Data.zlzgjc || 0  }}</Button></div>
                        <div>责令停产停业企业数:<Button type="link" @click="goqy()">{{ Data.zltycount || 0  }}</Button></div>
                        <div>查处违法违规案件数:<Button type="link" @click="gojczf('1')">{{ Data.wgcount || 0  }}</Button></div>
                        <div>移送公安部门案件数:<Button type="link" @click="gojczf('2')">{{ Data.sfjgcount || 0  }}</Button></div>
                        <div>严重缺陷数:<Button type="link" @click="goYzQx('0')">{{ Data.yzQxs || 0 }} / {{ Data.yzJls }}</Button></div>
                        <div>主要缺陷数:<Button type="link" @click="goYzQx('1')">{{ Data.zyQxs || 0 }} / {{ Data.zyJls }}</Button></div>
                        <div>一般缺陷数:<Button type="link" @click="goYzQx('2')">{{ Data.ybQxs || 0 }} / {{ Data.ybJls }}</Button></div>
                        <div>(要写明按照药品品种档案中的核准工艺组织生产的检查情况。)</div>
                    </td>
                    <td v-if="idx == 0" :rowspan="projectArray.length" class="text-center">
                        <div>
                            <div>生产环节检验批次数</div>
                            <Button type="link" @click="gocjy('1,A1')">{{ Data.sccount || 0 }}</Button>
                        </div>
                        <div>
                            <div>流通使用环节检验批次数</div>
                            <Button type="link" @click="gocjy('2,A2,3,A3')">{{ Data.ltsycount || 0 }}</Button>
                        </div>
                        <div>
                            <div>不合格批次数</div>
                            <Button type="link" @click="gocjy('2')">{{ Data.cjybhg || 0 }}</Button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="zdjg-jcpz-chart-pz">
import { ref, computed, isVNode, createVNode } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { Button } from 'ant-design-vue';
import Tools from '/@/utils/tools';

const go = useGo();
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const projectArray = ref([{
    title: '国家组织集采中选品种', pzs: 'pzsGc', pz: 'pzGc', whs: 'whsGc', wh: 'whGc', showPzDetails: false, showWhDetails: false, pzValue: '', whValue: ''
}, {
    title: '无菌药品品种', pzs: 'pzsWj', pz: 'pzWj', whs: 'whsWj', wh: 'whWj', showPzDetails: false, showWhDetails: false, pzValue: '', whValue: ''
}, {
    title: '多组分生化药品品种', pzs: 'pzsDf', pz: 'pzDf', whs: 'whsDf', wh: 'whDf', showPzDetails: false, showWhDetails: false, pzValue: '', whValue: ''
}, {
    title: '儿童用药品种', pzs: 'pzsEt', pz: 'pzEt', whs: 'whsEt', wh: 'whEt', showPzDetails: false, showWhDetails: false, pzValue: '', whValue: ''
}, {
    title: createVNode('div', {}, [createVNode('span', {}, '各层级集采中选的其他高风险或重点品种'), createVNode('br'), createVNode('span', {}, '（例如麻醉药品、第一类精神药品、放射性药品、医疗用毒性药品、血液制品等）')]), pzs: 'pzsQt', pz: 'pzQt', whs: 'whsQt', wh: 'whQt', showPzDetails: false, showWhDetails: false, pzValue: '', whValue: ''
}]);
const Data = ref({});

function loadData(params = { year: currentYear.value }) {
    defHttp.get({ url: '/report/zdjg/jcpz/pztj', params: params }).then((res) => {
        Data.value = res[0] || {};
        projectArray.value.forEach((item) => {
            item.pzValue = (Data.value[item.pz] || '无').split('、');
            item.whValue = (Data.value[item.wh] || '无').split('、');
        });
    });
};
function toPzwhDetial(yppzwh) {
    go(`/ypyd/detail/${encodeURIComponent(yppzwh || '')}`);
}
function goYzQx(jb) {
    go({ path: '/jgyw/jdjc/jgjl', query: { jb: jb, year: currentYear.value } });
}
function gojdjc(lb){
    if('0' == lb){
        go({ path:'/yw/jccs/2/-', query: { year: currentYear.value}})
    }else if('02' == lb){
        go({ path:'/yw/jccs/2/-', query: { year: currentYear.value,jcjggb:lb}})
    } 
}
function goqy(){
    go({ path: '/yqyd/jgqy/-', query: { showTags: 'false', year: currentYear.value ,isjcgfx: '2'} })
}
function gojczf(lx){
    if('1'==lx){
        go({ path:'/yw/jczf/'+'1',query: { year: currentYear.value, wfhj: '1'}});
    }else{
        go({ path:'/yw/jczf/'+'1',query: { year: currentYear.value, sfyssfjg: '1'}})
    } 
}
function gocjy(hj){
    if('2'==hj){
        go({path: '/yw/cjbhg/3', query: { year: currentYear.value,jyjg:hj}});
    }else{
        go({path: '/yw/cjbhg/3', query: { year: currentYear.value,xcyhj:hj}});
    }
    
    
}

loadData();

defineExpose({ isVNode });
</script>

<style lang="less" scoped>
.more-info {
    height: 0;
    overflow: hidden;

    &.show {
        height: unset;
        overflow: unset;
    }

    .item {
        white-space: nowrap;
    }
}
</style>