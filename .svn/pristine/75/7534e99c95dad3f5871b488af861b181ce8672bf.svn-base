<template>
    <div ref="bodyEl" class="enter-y my-index">
        <div class="lg:w-full">
            <div class="md:grid xl:grid-cols-4 md:grid-cols-2 md:gap-16px card-block">
                <template v-for="(item, idx) in dataBlock" :key="idx">
                    <div :class="['color' + (idx % 4 + 1)]">
                        <ul>
                            <li>
                                <div class="title">{{ item.name }}</div>
                                <div class="number cursor-pointer">
                                    <CountTo :startVal="0" :endVal="item.value" class="text-xl" />
                                </div>
                            </li>
                            <li>
                                <div class="title">({{/(持有人|集采)/ig.test(item.name)?'注册':'生产'}}) 品种数量 / 批准文号<span v-if="item.zcwh != undefined"> / 在产</span></div>
                                <div class="number cursor-pointer">
                                    <CountTo :startVal="0" :endVal="item.pz" separator="" class="text-xl" />
                                    <span class="text-xl px-2 cursor-pointer">/</span>
                                    <CountTo :startVal="0" :endVal="item.pzwh" separator="" class="text-xl" />
                                    <span class="text-xl px-2 cursor-pointer" v-if="item.zcwh != undefined">/</span>
                                    <CountTo :startVal="0" :endVal="item.zcwh" v-if="item.zcwh != undefined" separator="" class="text-xl" />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="color2" v-if="idx==3">
                        <ul>
                            <li>
                                <div class="title">国产药品</div>
                                <div class="number cursor-pointer">
                                    <CountTo :startVal="0" :endVal="7158" class="text-xl" />
                                </div>
                            </li>
                            <li>
                                <div class="title">品种数量 / 自产 / 省外受托 / 省外委托</div>
                                <div class="number cursor-pointer">
                                    <CountTo :startVal="0" :endVal="2435" separator="" class="text-xl" />
                                    <span class="text-xl px-2 cursor-pointer">/</span>
                                    <CountTo :startVal="0" :endVal="6627" separator="" class="text-xl" />
                                    <span class="text-xl px-2 cursor-pointer">/</span>
                                    <CountTo :startVal="0" :endVal="244" separator="" class="text-xl" />
                                    <span class="text-xl px-2 cursor-pointer">/</span>
                                    <CountTo :startVal="0" :endVal="68" separator="" class="text-xl" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </template>
                <div class="color3">
                    <ul class="grid grid-cols-2">
                        <li>
                            <div class="title">药品生产许可办件总数</div>
                            <div class="number cursor-pointer">
                                <CountTo :startVal="0" :endVal="153" class="text-xl" />
                            </div>
                        </li>
                        <li>
                            <div class="title">药品生产监督检查总次数</div>
                            <div class="number cursor-pointer">
                                <CountTo :startVal="0" :endVal="321" class="text-xl" />
                            </div>
                        </li>
                        <li>
                            <div class="title">药品抽检验总次数</div>
                            <div class="number cursor-pointer">
                                <CountTo :startVal="0" :endVal="1222" class="text-xl" />
                            </div>
                        </li>
                        <li>
                            <div class="title">药品稽查执法次数</div>
                            <div class="number cursor-pointer">
                                <CountTo :startVal="0" :endVal="10" class="text-xl" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul class="w-full -ml-2">
                        <li>
                            <div>
                                <a-input-search placeholder="请输入社会信用代码或企业名称" enter-button="企业查询" size="large"/>
                            </div>
                            <div class="my-1">
                                <a-input-search placeholder="请输入批准文号或通用名称" enter-button="品种查询" size="large"/>
                            </div>
                            <div>
                                <a-input-search placeholder="请输入处方内容" enter-button="处方查询" size="large"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="lg:w-1/3">
            <Card title="集采药品全覆盖情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
                <my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
                    tooltip: { trigger: 'axis', formatter: tooltipFormatter() },grid:{containLabel:true,top:30,bottom:60,left:30,right:30},legend:{data:['品种总数','已检查品种','已抽样品种','已追溯品种'],bottom:20},
                    xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023'] }, yAxis: { type: 'value' },
                    series: [{ type: 'line', smooth: true, name: '品种总数', data: randomArray(5) }
                        ,{ type: 'line', smooth: true, name: '已检查品种', data: randomArray(5) }
                        ,{ type: 'line', smooth: true, name: '已抽样品种', data: randomArray(5) }
                        ,{ type: 'line', smooth: true, name: '已追溯品种', data: randomArray(5) }
                    ]}"/>
            </Card>
        </div>
        <div class="lg:w-1/3">
            <Card title="药品生产许可事项统计" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
                <my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
                    tooltip: { trigger: 'axis', formatter: tooltipFormatter() },grid:{containLabel:true,top:30,bottom:30,left:30,right:30},
                    xAxis: { type: 'category', axisLabel:{rotate:30}, data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'] }, yAxis: { type: 'value' },
                    series: [
                         { type: 'bar', name: '基本信息变更', barWidth: 10, data: randomArray(6) }
                        ,{ type: 'bar', name: '生产地址及名称变更', data: randomArray(6) }
                        ,{ type: 'bar', name: '生产范围变更', data: randomArray(6) }
                        ,{ type: 'bar', name: '生产地址及范围变更(委托)', data: randomArray(6) }
                        ,{ type: 'bar', name: '生产地址及范围变更(受托)', data: randomArray(6) }
                    ]}"/>
            </Card>
        </div>
        <div class="lg:w-1/3">
            <Card title="抽检验不合格情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
                <my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
                    tooltip: { trigger: 'axis', formatter: tooltipFormatter() },grid:{containLabel:true,top:30,bottom:60,left:30,right:30},legend:{data:['省内抽检','国家抽检','外省抽检'],bottom:20},
                    xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023'] }, yAxis: { type: 'value' },
                    series: [
                        { type: 'line', smooth: true, name: '省内抽检', data: randomArray(5) }
                        ,{ type: 'line', smooth: true, name: '国家抽检', data: randomArray(5) }
                        ,{ type: 'line', smooth: true, name: '外省抽检', data: randomArray(5) }
                    ]}"/>
            </Card>
        </div>
        <div class="lg:w-1/3 fxjc">
            <Card title="风险监测" :loading="loading" class="h-300px">
                <CardGrid>
                    <span class="flex flex-col items-center">
                        <span>检查不合格</span>
                        <span class="text-md mt-2 text-red cursor-pointer" @click="gojcbhg()">{{
                            backData.jdjcData?.jcbhg || 0
                        }}</span>
                    </span>
                </CardGrid>
                <CardGrid>
                    <span class="flex flex-col items-center">
                        <span>处罚信息</span>
                        <span class="text-md mt-2 text-red cursor-pointer" @click="gocfxx()">{{
                            backData.jczfData?.jnTotal || 0
                        }}</span>
                    </span>
                </CardGrid>
                <CardGrid>
                    <span class="flex flex-col items-center">
                        <span>抽检不合格</span>
                        <span class="text-md mt-2 text-red cursor-pointer" @click="gocjbhg()">
                            {{ (backData.cjyData?.ypsc?.cyBhg + backData.cjyData?.yljgzj?.cyBhg) || 0 }}
                        </span>
                    </span>
                </CardGrid>
                <CardGrid>
                    <span class="flex flex-col items-center">
                        <span>投诉举报</span>
                        <span class="text-md mt-2 text-red">0</span>
                    </span>
                </CardGrid>
                <CardGrid>
                    <span class="flex flex-col items-center">
                        <span>不良反应监测</span>
                        <span class="text-md mt-2 text-red">0</span>
                    </span>
                </CardGrid>
                <CardGrid>
                    <span class="flex flex-col items-center">
                        <span>风险提示</span>
                        <span class="text-md mt-2 text-red">0</span>
                    </span>
                </CardGrid>
            </Card>
        </div>
        <div class="lg:w-1/3">
            <Card title="近期变更较多的企业" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
                <my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
                    tooltip: { trigger: 'axis', formatter: tooltipFormatter(['次']) },grid:{containLabel:true,top:20,bottom:20,left:30},
                    xAxis: { type: 'value' }, yAxis: [{ type: 'category', data: ['宜昌人福药业有限责任公司','远大医药（中国）有限公司','葵花药业集团（襄阳）隆中有限公司','中美华世通生物医药科技（武汉）股份有限公司','远大生命科学（武汉）有限公司','武汉启瑞药业有限公司','朗天药业（湖北）有限公司','宜昌东阳光长江药业股份有限公司','湖北四环制药有限公司','武汉九珑人福药业有限责任公司'] }],
                    series: [
                        { type: 'bar', name: '发生次数', data: [9,6,6,5,5,5,5,4,4,4] }
                    ]}"/>
            </Card>
        </div>
        <div class="lg:w-1/3">
            <Card title="近期变更较多的品种" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
                <my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
                    tooltip: { trigger: 'axis', formatter: tooltipFormatter(['次']) },grid:{containLabel:true,top:20,bottom:20,left:30},
                    xAxis: { type: 'value' }, yAxis: [{ type: 'category', data: ['国药准字H20053964','国药准字H20053949','国药准字H20053973','国药准字H20053979','国药准字H20053946','国药准字Z20053844','国药准字H20054612','国药准字H22026208','国药准字Z20070034','国药准字H19999269'] }],
                    series: [
                        { type: 'bar', name: '发生次数', data: [9,6,6,5,5,5,5,4,4,4] }
                    ]}"/>
            </Card>
        </div>
    </div>
</template>
<script lang="ts" setup name="dashboard-homePage">
import { ref, computed, Ref, createVNode } from 'vue';
import { Card } from 'ant-design-vue';
import { notification } from 'ant-design-vue';
import { useECharts } from '/@/hooks/web/useECharts';
import { registerMap } from 'echarts';
import { CountTo } from '/@/components/CountTo/index';
import mapData from '/@/utils/map/420000.json';
import mapDataBorder from '/@/utils/map/420000_border.json';
import { useLoading } from '/@/components/Loading';
import Tools from '/@/utils/tools';
import myEcharts from './components/my-echarts.vue';

const CardGrid = Card.Grid;

const bodyEl = ref<ElRef>(null);
const [openLoading, closeLoading] = useLoading({
    target: bodyEl,
    props: {
        tip: '加载中...',
        absolute: true,
    },
});

const numberFormat = (val, len) => {
    if (isNaN(val)) val = 0;
    let v = Math.pow(10, len);
    return Math.round(val * v) / v;
};

const mapChart = ref<HTMLDivElement | null>(null);
const dataBlock = ref([{ name: '药品生产企业(含放射性)', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '医疗机构制剂单位', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '特殊药品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '生物制品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, {}, { name: '集采药品上市许可持有人', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '原辅包生产企业', value: 0, pz: 0, pzwh: 0 }, { name: '中药配方颗粒生产企业', value: 0, pz: 0, pzwh: 0 }]);
const mapCardData = ref([{ name: '药品生产企业', value: '' }, { name: '医疗机构制剂单位', value: '' }, { name: '药品品种', value: '' }, { name: '医疗机构制剂数量', value: '' }]);
const selectedCity = ref({});
const { setOptions: setOptionsMapChart } = useECharts(mapChart as Ref<HTMLDivElement>);

const titleObj = {
    '第二十七条':'第二十七条　与药品生产、质量有关的所有人员都应当经过培训，培训的内容应当与岗位的要求相适应。除进行本规范理论和实践的培训外，还应当有相关法规、相应岗位的职责、技能的培训，并定期评估培训的实际效果。',
    '第一百五十九条':'第一百五十九条　与本规范有关的每项活动均应当有记录，以保证产品生产、质量控制和质量保证等活动可以追溯。记录应当留有填写数据的足够空格。记录应当及时填写，内容真实，字迹清晰、易读，不易擦除。',
    '第一百七十五条 （六）':'第一百七十五条　批生产记录的内容应当包括：（六）相关生产操作或活动、工艺参数及控制范围，以及所用主要生产设备的编号；',
    '第一百五十条':'第一百五十条　文件是质量保证系统的基本要素。企业必须有内容正确的书面质量标准、生产处方和工艺规程、操作规程以及记录等文件。',
    '第四十八条':'第四十八条　应当根据药品品种、生产操作要求及外部环境状况等配置空调净化系统，使生产区有效通风，并有温度、湿度控制和空气净化过滤，保证药品的生产环境符合要求。洁净区与非洁净区之间、不同级别洁净区之间的压差应当不低于10帕斯卡。必要时，相同洁净度级别的不同功能区域（操作间）之间也应当保持适当的压差梯度。口服液体和固体制剂、腔道用药（含直肠用药）、表皮外用药品等非无菌制剂生产的暴露工序区域及其直接接触药品的包装材料最终处理的暴露工序区域，应当参照“无菌药品”附录中D级洁净区的要求设置，企业可根据产品的标准和特性',
    '第二百二十三条 （六）':'第二百二十三条　物料和不同生产阶段产品的检验应当至少符合以下要求：（六）检验记录应当至少包括以下内容：1.产品或物料的名称、剂型、规格、批号或供货批号，必要时注明供应商和生产商（如不同）的名称或来源；2.依据的质量标准和检验操作规程；3.检验所用的仪器或设备的型号和编号；4.检验所用的试液和培养基的配制批号、对照品或标准品的来源和批号；5.检验所用动物的相关信息；6.检验过程，包括对照品溶液的配制、各项具体的检验操作、必要的环境温湿度；7.检验结果，包括观察情况、计算和图谱或曲线图，以及依据的检验报告编号；8.检验日期；9.检验人员的签名和日期；10.检验、计算复核人员',
    '第二百五十条':'第二百五十条　任何偏离生产工艺、物料平衡限度、质量标准、检验方法、操作规程等的情况均应当有记录，并立即报告主管人员及质量管理部门，应当有清楚的说明，重大偏差应当由质量管理部门会同其他部门进行彻底调查，并有调查报告。偏差调查报告应当由质量管理部门的指定人员审核并签字。企业还应当采取预防措施有效防止类似偏差的再次发生。',
    '第八十七条':'第八十七条　生产设备应当有明显的状态标识，标明设备编号和内容物（如名称、规格、批号）；没有内容物的应当标明清洁状态。',
    '第一百七十条 （二）':'第一百七十条　制剂的工艺规程的内容至少应当包括：（二）生产操作要求：1.对生产场所和所用设备的说明（如操作间的位置和编号、洁净度级别、必要的温湿度要求、设备型号和编号等）；2.关键设备的准备（如清洗、组装、校准、灭菌等）所采用的方法或相应操作规程编号；3.详细的生产步骤和工艺参数说明（如物料的核对、预处理、加入物料的顺序、混合时间、温度等）；4.所有中间控制方法及标准；5.预期的最终产量限度，必要时，还应当说明中间产品的产量限度，以及物料平衡的计算方法和限度；6.待包装产品的贮存要求，包括容器、标签及特殊贮存条件；7.需要说明的注意事项。',
    '第五十八条':'第五十八条　仓储区的设计和建造应当确保良好的仓储条件，并有通风和照明设施。仓储区应当能够满足物料或产品的贮存条件（如温湿度、避光）和安全贮存的要求，并进行检查和监控。'
};
let tooltipFormatter = (units: Array<String> = [], showValue: boolean = true) => {
    return (params) => {
        if (!Array.isArray(params)) {
            let obj = Object.assign({}, params);
            obj.seriesName = params.name;
            obj.name = params.seriesName;
            params = [obj];
        }
        let html = ['<div style="margin:0;line-height:1;">'], clear = '<div style="clear:both;"></div>';
        if (0 < params.length) {
            let name = params[0].name || '';
            html.push('<div style="font-size:14px;color:#666;font-weight:400;max-width:40em;white-space:normal;line-height:1.5;">', titleObj[name] || name, '</div>');
        }
        html.push('<div style="margin:10px 0 0;">');
        params.forEach((item, idx) => {
            html.push('<div style="margin:0;">\
                <div style="margin:'+ (0 < idx ? '10px 0 0' : '0') + ';">\
                  <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:'+ item.color + ';"></span>\
                  <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">'+ item.seriesName + '</span>\
                  '+ (showValue && '<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">' + item.value + (idx < units.length ? '(' + units[idx] + ')' : '') + '</span>' || '') + '\
                  <div style="clear:both"></div>\
                </div>\
                <div style="clear:both"></div>\
              </div>');
        });
        html.push('</div>', clear, '</div>');
        return html.join('');
    }
};
const randomArray = (num, start = 1, end = 100) => {
    let array: any = [];
    for (let idx = 0; idx < num; idx++) {
        array.push(Math.round(Math.random() * (end - start)) + start);
    }
    return array;
}

const loading = ref(true);
const  jcpzsl = ref(0), nbcount = ref(0), ypsczJjgq = ref(0);

const backData = ref({});
function loadReportData(params = {}, isFirst = true) {
    openLoading();

    setTimeout(() => {

        notification.open({
            message: '工作提醒',
            description: createVNode('ul', {class:'list-decimal pl-2rem m-0'},[
                  createVNode('li',{class:'whitespace-nowrap'},['您有',createVNode('span',{class:'text-red-500 px-1'},'0'),'条风险处置需要处理。'])
                , createVNode('li',{class:'whitespace-nowrap'},['您有',createVNode('span',{class:'text-red-500 px-1'},'0'),'条协同处置需要处理。'])
                , createVNode('li',{class:'whitespace-nowrap'},['当前有',createVNode('span',{class:'text-red-500 px-1'},'0'),'家企业未填写药品生产企业年报。'])
                , createVNode('li',{class:'whitespace-nowrap'},['当前有',createVNode('span',{class:'text-red-500 px-1'},'0'),'即将到期的药品生产许可证。'])
                , createVNode('li',{class:'whitespace-nowrap'},['当前有',createVNode('span',{class:'text-red-500 px-1'},'0'),'个集采药品未达到监管全覆盖。'])
                , createVNode('li',{class:'whitespace-nowrap'},['当前有',createVNode('span',{class:'text-red-500 px-1'},'0'),'次集采或特药专项检查未绑定品种。'])
                , createVNode('li',{class:'whitespace-nowrap'},['当前有',createVNode('span',{class:'text-red-500 px-1'},'0'),'次检查未上传整改报告。'])
            ]),
            placement: 'bottomRight',
            style: {margin:'0 -24px -24px 0'}
            //, duration: 0
        });

        let res = {"scfs":[{"name":"自产(A类)","value":273},{"name":"委托(B类)","value":100},{"name":"受托(C类)","value":60},{"name":"原料药(D类)","value":104}],"cjyData":{"category":["药品生产","医疗机构制剂"],"yljgzj":{"cyQy":6,"cyBhg":0,"cyCs":19,"cyHg":19},"ypsc":{"cyQy":110,"cyBhg":2,"cyCs":2536,"cyHg":2534}},"ypsczJjgq":2,"mapData":{"420100":{"zjsl":448,"areaCode":"420100","ypscqy":113,"yppz":2557,"yljgzj":17},"420200":{"zjsl":77,"areaCode":"420200","ypscqy":23,"yppz":427,"yljgzj":3},"420300":{"zjsl":190,"areaCode":"420300","ypscqy":19,"yppz":224,"yljgzj":7},"420500":{"zjsl":39,"areaCode":"420500","ypscqy":26,"yppz":683,"yljgzj":3},"420600":{"zjsl":130,"areaCode":"420600","ypscqy":20,"yppz":415,"yljgzj":8},"420700":{"zjsl":74,"areaCode":"420700","ypscqy":17,"yppz":272,"yljgzj":2},"420800":{"zjsl":108,"areaCode":"420800","ypscqy":18,"yppz":167,"yljgzj":5},"420900":{"zjsl":11,"areaCode":"420900","ypscqy":27,"yppz":476,"yljgzj":3},"421000":{"zjsl":198,"areaCode":"421000","ypscqy":26,"yppz":289,"yljgzj":7},"421100":{"zjsl":124,"areaCode":"421100","ypscqy":38,"yppz":369,"yljgzj":6},"421200":{"zjsl":34,"areaCode":"421200","ypscqy":16,"yppz":41,"yljgzj":4},"421300":{"zjsl":95,"areaCode":"421300","ypscqy":7,"yppz":231,"yljgzj":4},"422800":{"zjsl":70,"areaCode":"422800","ypscqy":10,"yppz":88,"yljgzj":3},"429004":{"zjsl":87,"areaCode":"429004","ypscqy":6,"yppz":322,"yljgzj":4},"429005":{"zjsl":10,"areaCode":"429005","ypscqy":5,"yppz":157,"yljgzj":1},"429006":{"zjsl":58,"areaCode":"429006","ypscqy":12,"yppz":179,"yljgzj":3},"429021":{"areaCode":"429021","ypscqy":1}},"xzxkNum3":131,"xzxkNum1":9,"yppzlx":{"total":6897,"pz3":103,"pz2":4400,"pz4":2394,"pz9":1873},"nbcount":349,"jcpzsl":193,"dataBlock":[{"zcwh":2033,"name":"药品生产企业(含放射性)","pz":2361,"value":384,"pzwh":6897},{"zcwh":1753,"name":"医疗机构制剂单位","pz":1240,"value":80,"pzwh":1753},{"zcwh":163,"name":"特殊药品生产企业","pz":189,"value":92,"pzwh":415},{"zcwh":19,"name":"生物制品生产企业","pz":49,"value":7,"pzwh":99}],"ypqyfl":[{"code":"H","name":"化学药","value":217},{"code":"Z","name":"中成药","value":124},{"code":"S","name":"生物制品","value":7},{"code":"T","name":"特殊药品","value":92},{"code":"Y","name":"中药饮片","value":84},{"code":"Q","name":"医用气体","value":47},{"code":"X","name":"其它","value":7},{"name":"中药配方颗粒","value":6,"tags":"A02A04A04"}],"jdjcData":{"jdjcTotal":360,"jdjcQyTotal":201,"jcbhg":1},"jczfData":{"ybAj":[9,16,20,3,8],"zdAj":[0,0,0,0,0],"category":["2019年","2020年","2021年","2022年","2023年"],"jnTotal":8}}

        backData.value = res;
        dataBlock.value = [...res.dataBlock, { name: '药品上市许可持有人', value: 245, pz: 2361, pzwh: 6897, zcwh: 2033 }, { name: '集采药品上市许可持有人', value: 49, pz: 125, pzwh: 193, zcwh: 167 }, { name: '原辅包生产企业', value: 161, pz: 669, pzwh: 1112 }, { name: '中药配方颗粒生产企业', value: 8, pz: 530, pzwh: 1884 }];
        jcpzsl.value = res.jcpzsl || 0;
        nbcount.value = res.nbcount || 0;
        ypsczJjgq.value = res.ypsczJjgq || 0;
        
        let ypYcj: Array<number> = [], ypWcj: Array<number> = [], ypWcl: Array<number> = [], ypHgl: Array<number> = [];
        let zjYcj: Array<number> = [], zjWcj: Array<number> = [], zjWcl: Array<number> = [], zjHgl: Array<number> = [];
        for (var i = 0; i < 5; i++) {
            ypYcj.push(Math.round(Math.random() * 90) + 10);
            ypWcj.push(Math.round(Math.random() * 10));
            ypWcl.push(Math.round(ypYcj[i] / (ypYcj[i] + ypWcj[i]) * 10000) / 100);
            ypHgl.push(Math.round((Math.random() * 0.1 + 0.9) * 10000) / 100);
            zjYcj.push(Math.round(Math.random() * 90) + 10);
            zjWcj.push(Math.round(Math.random() * 10));
            zjWcl.push(Math.round(zjYcj[i] / (zjYcj[i] + zjWcj[i]) * 10000) / 100);
            zjHgl.push(Math.round((Math.random() * 0.1 + 0.9) * 10000) / 100);
        }

        if (isFirst) {
            registerMap('湖北省', mapData);
            registerMap('湖北省边框', mapDataBorder);
            let data = [];
            mapData.features.forEach((item, idx) => {
                let val = res.mapData[item.properties.adcode] || {}, obj = { name: item.properties.name, code: item.properties.adcode, dataIndex: idx, value: val.ypscqy || 0 };
                obj.ypscqy = obj.value;
                obj.yljgzj = val.yljgzj || 0;
                obj.yppz = val.yppz || 0;
                obj.zjsl = val.zjsl || 0;
                data.push(obj);
            });
            setOptionsMapChart({
                tooltip: {
                    trigger: 'item', borderColor: 'rgba(254,122,35,.9)', backgroundColor: 'rgba(255,177,128,.9)', textStyle: { color: '#fff' },
                    formatter(params, ticket, cb) {
                        if (!params.data) return;
                        let array = ['<b>', params.name, '</b><br/><table>'];
                        mapCardData.value.forEach((d, idx) => {
                            array.push('<tr><td class="pr-2">', d.name, '</td><td class="text-right">');
                            if (idx == 0) array.push(params.data.ypscqy);
                            if (idx == 1) array.push(params.data.yljgzj);
                            if (idx == 2) array.push(params.data.yppz);
                            if (idx == 3) array.push(params.data.zjsl);
                            array.push('</td></tr>');
                        });
                        array.push('</table>');
                        return array.join('');
                    }
                }, grid: { top: 0, left: 0, bottom: 0, right: 0 },
                geo: {
                    type: 'map3D', map: '湖北省边框', roam: false,
                    label: { show: false },
                    itemStyle: {
                        areaColor: {
                            type: 'linear', x: 0, y: 0, x2: 0.8, y2: 1.5,
                            colorStops: [{ offset: 0, color: '#4290e9' }, { offset: 0.5, color: '#7ab6fc' }, { offset: 1, color: '#4699fa' }], global: false
                        },
                        shadowColor: '#B3D9FF', shadowOffsetX: 0, shadowOffsetY: 10, borderWidth: 0
                    },
                    emphasis: { label: { show: false }, itemStyle: { opacity: 1, areaColor: '#FFB180' } }
                },
                series: [{
                    type: 'map', map: '湖北省边框', roam: false,
                    label: { show: false },
                    itemStyle: {
                        areaColor: {
                            type: 'radial', x: 0.5, y: 0.5, r: 2,
                            colorStops: [{ offset: 0, color: 'rgba(0,0,0,0)' }, { offset: 1, color: 'rgba(0,0,0,.5)' }]
                        }, borderWidth: 2, borderColor: '#fff'
                    },
                    emphasis: { label: { show: false }, itemStyle: { areaColor: 'rgba(255,255,255,0)' } },
                    select: { label: { show: false }, itemStyle: { areaColor: 'rgba(255,255,255,0)' } }
                }, {
                    type: 'map', map: '湖北省', roam: false, zlevel: 2,
                    label: { show: true, color: '#fff' },
                    itemStyle: { areaColor: 'rgba(0,0,0,0)', borderType: [1, 2], borderWidth: 1, borderColor: '#fff' },
                    emphasis: { label: { color: '#fff' }, itemStyle: { areaColor: '#FFB180' } },
                    select: { label: { color: '#fff' }, itemStyle: { areaColor: '#FFB180' } },
                    data: data
                }]
            }, true, (res) => {
                if (selectedCity.value.dataIndex != undefined) res?.dispatchAction({ type: 'select', seriesIndex: 1, dataIndex: selectedCity.value.dataIndex });
                if (!isFirst) return;
            });
        }

        loading.value = false;
        closeLoading();
    }, 500);
}

loadReportData();
</script>
  
<style lang="less" scoped>
:deep(.ant-card) {
    &{
        display:flex;
        flex-direction:column;
    }
    .ant-card-head-wrapper {
        &::before {
            content: ' ';
            display: block;
            background-color: #1890FF;
            height: 18px;
            width: 6px;
            margin-right: 9px;
        }

        .ant-card-head-title {
            padding: 11px 0;
        }
    }
    .ant-card-body {
        flex: 1;
        height: 0;
    }
    .ant-card-loading-content {
        margin: -1rem;
        padding: 1rem;
    }
}

.my-index {
    display: flex;
    flex-wrap: wrap;
    row-gap: 16px;
    margin: 16px 8px;

    & > div {
        padding: 0 8px;
    }

    .ant-card+.ant-card {
        margin-top: 1rem;
    }

    .ant-card {
        .ant-card-head-wrapper {
            &::before {
                content: ' ';
                display: block;
                background-color: #1890FF;
                height: 18px;
                width: 6px;
                margin-right: 9px;
            }

            .ant-card-head-title {
                padding: 14px 0;
            }
        }
    }

    .card-block {
        .color1 {
            color: #56A782;
            background-image: url(/@/assets/images/card_bg1.png);
        }

        .color2 {
            color: #B98947;
            background-image: url(/@/assets/images/card_bg2.png);
        }

        .color3 {
            color: #5C91BD;
            background-image: url(/@/assets/images/card_bg3.png);
        }

        .color4 {
            color: #B67447;
            background-image: url(/@/assets/images/card_bg4.png);
        }

        &>div {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: right bottom;
            position: relative;

            &::before {
                display: block;
                content: ' ';
                padding-top: 126px;
            }

            &>ul {
                position: absolute;
                left: 10px;
                top: 50%;
                transform: translateY(-50%);

                .title {
                    font-weight: 400;
                }

                .number {
                    font-weight: 600;
                    color: rgba(0, 0, 0, .85);
                }
            }
        }
    }

    .dbtx {
        >.item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 200px;
            height: 91px;

            .title {
                font-weight: 400;
                margin-bottom: 5px;
            }

            .number {
                position: relative;
                font-weight: 600;
                font-size: 24px;

                .sup {
                    position: absolute;
                    top: -5px;
                    margin-left: 5px;
                    font-size: 14px;
                    color: #D41639;
                }

                .sub {
                    position: absolute;
                    bottom: 0;
                    margin-left: 5px;
                    font-size: 12px;
                    font-weight: normal;
                    color: #C0C5CA;
                }
            }
        }
    }

    .map {
        background-image: url(/@/assets/images/map_bg.png);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center bottom;

        .map-card {
            display: flex;
            align-items: center;
            align-content: center;

            .icon {
                width: 64px;
                height: 64px;
                margin-right: 15px;
                background-repeat: no-repeat;
                background-size: cover;
            }

            .icon-1 {
                background-image: url(/@/assets/images/map-icon1.png);
            }

            .icon-2 {
                background-image: url(/@/assets/images/map-icon2.png);
            }

            .icon-3 {
                background-image: url(/@/assets/images/map-icon3.png);
            }

            .icon-4 {
                background-image: url(/@/assets/images/map-icon4.png);
            }

            .icon+div {
                flex: 1;

                .title {}

                .number {
                    font-size: 18px;
                    color: #1890FF;
                }
            }
        }

        .show-tips {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 10px;
            white-space: nowrap;
            color: rgb(255, 255, 255);
            background-color: rgba(255, 177, 128, 0.8);
            border: 1px solid rgba(254, 122, 35, 0.8);
            border-radius: 4px;
        }

        .map-container {}
    }

    .fxjc {
        .ant-card-grid {
            width: 50%;
            height: 33.333%;
            position: relative;

            &>* {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }

    .cjy {
        .my-table {
            border-width: 0;

            &>tr,
            &>tbody>tr {
                background-color: #F4FAFF;
            }

            &>tr:nth-child(2n),
            &>tbody>tr:nth-child(2n) {
                background-color: #EBF6FF;
            }

            td,
            th {
                border-width: 0;
            }
        }
    }
}
</style>