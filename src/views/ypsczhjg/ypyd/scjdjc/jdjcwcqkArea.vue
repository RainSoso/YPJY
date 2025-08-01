<template>
    <div ref="bodyEl" class="bg-white m-4 p-4">
        <h2 class="flex items-center justify-center text-center text-2xl font-600 p-4 !mb-0">
            湖北省药品生产监督检查任务完成情况表
                （
            <div class="text-left" v-if="userArea!='420000'">{{getAreaName(currentArea)}}</div>
            <div class="mx-1" v-else>
                <a-select v-model:value="currentArea" @change="() => loadData()" class="float-left" style="width: 160px;">
                    <a-select-option v-for="item in areaArray" :key="item" :value="item">{{getAreaName(item)}}</a-select-option>
                </a-select>
            </div>
                ）
        </h2>
        <div class="text-right mb-4">
            <a-select v-model:value="currentYear" @change="() => loadData()" class="float-left">
                <a-select-option v-for="item in yearArray" :key="item" :value="item">{{ item }}年</a-select-option>
            </a-select>
            <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        </div>
        <table class="my-table !table-auto">
            <thead>
                <tr class="text-center">
                    <th rowspan="2" colspan="3">类别</th>
                    <th colspan="4" style="width: 1100px;" >涉及企业</th>
                    <th colspan="4" style="width: 1100px;" >涉及品种</th>                
                </tr>
                <tr class="text-center">
                    <td>应检查（停产）</td>
                    <td>已检查</td>
                    <td>未检查</td>
                    <td>完成率</td>
                    <td>数量</td>
                    <td>已检查</td>
                    <td>未检查</td>
                    <td>完成率</td>
                </tr>
            </thead>
            <tbody id="table-body">
                <tr class="text-center" v-if="currentArea!='420010'">
                    <th rowspan="4">检查覆盖总体情况</th>
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({zslx:6})">药品生产企业</a-button></td>
                    <td :title="lbqyTitle[0] +' | '+ qyTitle[0]">
                        <a-button type="link" class="!px-1" @click="scqyToListPage('6', '0',isNull(Data.scqy - Data.scqytc),'1')">{{ isNull(Data.scqy - Data.scqytc) }} </a-button>
                        <a-button type="link" class="!px-1" @click="scqyToListPage('6', '99',Data.scqytc,'0')" danger v-if="Data.scqytc>0" title="停产企业">({{ Data.scqytc }})</a-button>
                    </td>
                    <td :title="lbqyTitle[0] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="scqyToListPage('6', '1',Data.scqyYj,'1')">{{ Data.scqyYj }}</a-button></td>
                    <td :title="lbqyTitle[0] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="scqyToListPage('6', '11',(Data.scqyWj),'1')">{{ Data.scqyWj }}</a-button></td>
                    <td :title="lbqyTitle[0] +' | '+ qyTitle[3]"><span v-if="Data.scqy">{{ Tools.numberFormat(0 != Data.scqy ? (Data.scqyYj * 100) / (Data.scqy - Data.scqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({zslx:7})">医疗机构制剂室</a-button></td>
                    <td :title="lbqyTitle[1] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="scqyToListPage('7', '0',Data.yljgzjs,'1')">{{ Data.yljgzjs }}</a-button></td>
                    <td :title="lbqyTitle[1] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="scqyToListPage('7', '1',Data.yljgzjsYj,'1')">{{ Data.yljgzjsYj }} </a-button></td>
                    <td :title="lbqyTitle[1] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="scqyToListPage('7', '11',Data.yljgzjsWj,'1')">{{ Data.yljgzjsWj }}</a-button></td>
                    <td :title="lbqyTitle[1] +' | '+ qyTitle[3]"><span v-if="Data.yljgzjs">{{ Tools.numberFormat(0 != Data.yljgzjs ? (Data.yljgzjsYj * 100) / Data.yljgzjs : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({zslx:201020})">药包材生产企业</a-button></td>
                    <td :title="lbqyTitle[2] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="scqyToListPage('201020', '0',Data.ybc,'1')">{{ Data.ybc }}</a-button></td>
                    <td :title="lbqyTitle[2] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="scqyToListPage('201020', '1',Data.ybcYj,'1')">{{ Data.ybcYj }} </a-button></td>
                    <td :title="lbqyTitle[2] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="scqyToListPage('201020', '11',Data.ybcWj,'1')">{{ Data.ybcWj }}</a-button></td>
                    <td :title="lbqyTitle[2] +' | '+ qyTitle[3]"><span v-if="Data.ybc">{{ Tools.numberFormat(0 != Data.ybc ? (Data.ybcYj * 100) / Data.ybc : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({zslx:201021})">药用辅料生产企业</a-button></td>
                    <td :title="lbqyTitle[3] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="scqyToListPage('201021', '0',Data.yyfl,'1')">{{ Data.yyfl }}</a-button></td>
                    <td :title="lbqyTitle[3] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="scqyToListPage('201021', '1',Data.yyflYj,'1')">{{ Data.yyflYj }} </a-button></td>
                    <td :title="lbqyTitle[3] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="scqyToListPage('201021', '11',Data.yyflWj,'1')">{{ Data.yyflWj }}</a-button></td>
                    <td :title="lbqyTitle[3] +' | '+ qyTitle[3]"><span v-if="Data.yyfl">{{Tools.numberFormat(0 != Data.yyfl ? (Data.yyflYj * 100) / Data.yyfl : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <th rowspan="11">重点品种检查情况</th>
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A09A03'})">集采品种</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','jc','0',Data.jc,'重点品种检查情况')">{{ Data.jc }}</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','jc','1',Data.jcYj,'重点品种检查情况')">{{ Data.jcYj }}</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','jc','11',Data.jcWj,'重点品种检查情况')">{{ Data.jcWj }}</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ qyTitle[3]"><span v-if="Data.jc">{{ Tools.numberFormat(0 != Data.jc ? (Data.jcYj * 100) / Data.jc : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[0] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','jcyp','0',Data.jcpz,'重点品种检查情况')">{{Data.jcpz }}</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','jcyp','1',Data.jcpzYj,'重点品种检查情况')">{{Data.jcpzYj }}</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','jcyp','11',Data.jcpzWj,'重点品种检查情况')">{{Data.jcpzWj }}</a-button></td>
                    <td :title="lbpzTitle[0] +' | '+ pzTitle[3]"><span v-if="Data.jcpz">{{ Tools.numberFormat(0 != Data.jcpz ? (Data.jcpzYj * 100) / Data.jcpz : 0, 2) }}%</span><span v-else>100%</span></td>
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A05'})">生物制品</a-button></td>
                    <td :title="lbpzTitle[1] +' | '+ qyTitle[0]">
                       <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','swzp','0',isNull(Data.swzp - Data.swzptc),'重点品种检查情况','1','1')">{{ isNull(Data.swzp - Data.swzptc) }}</a-button>
                       <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','swzp','99',Data.swzptc,'重点品种检查情况','0')" danger v-if="Data.swzptc>0">({{ Data.swzptc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[1] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','swzp','1',Data.swzpYj,'重点品种检查情况','1','1')">{{ Data.swzpYj }}</a-button></td>
                    <td :title="lbpzTitle[1] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','swzp','11',Data.swzpWj,'重点品种检查情况','1','1')">{{ Data.swzpWj }}</a-button></td>
                    <td :title="lbpzTitle[1] +' | '+ qyTitle[3]"><span v-if="Data.swzp">{{ Tools.numberFormat(0 != Data.swzp ? (Data.swzpYj * 100) / (Data.swzp - Data.swzptc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[1] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','swzpyp','0',Data.swzppz,'重点品种检查情况')">{{Data.swzppz }}</a-button></td>
                    <td :title="lbpzTitle[1] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','swzpyp','1',Data.swzppzYj,'重点品种检查情况')">{{Data.swzppzYj }}</a-button></td>
                    <td :title="lbpzTitle[1] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','swzpyp','11',Data.swzppzWj ,'重点品种检查情况')">{{Data.swzppzWj }}</a-button></td>
                    <td :title="lbpzTitle[1] +' | '+ pzTitle[3]"><span v-if="Data.swzppz">{{ Tools.numberFormat(0 != Data.swzppz ? (Data.swzppzYj * 100) / Data.swzppz : 0, 2) }}%</span><span v-else>100%</span></td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A09A06'})">儿童用药</a-button></td>
                    <td :title="lbpzTitle[2] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','etyy','0',isNull(Data.etyy - Data.etyytc),'重点品种检查情况','1','1')">{{ isNull(Data.etyy - Data.etyytc) }}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','etyy','99',Data.etyytc,'重点品种检查情况','0','0')" danger v-if="Data.etyytc>0">({{ Data.etyytc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[2] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','etyy','1',Data.etyyYj,'重点品种检查情况','1','1')">{{ Data.etyyYj }}</a-button></td>
                    <td :title="lbpzTitle[2] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','etyy','11',Data.etyyWj,'重点品种检查情况','1','1')">{{ Data.etyyWj }}</a-button></td>
                    <td :title="lbpzTitle[2] +' | '+ qyTitle[3]"><span v-if="Data.etyy">{{ Tools.numberFormat(0 != Data.etyy ? (Data.etyyYj * 100) / (Data.etyy - Data.etyytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[2] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','etyyyp','0',Data.etyypz ,'重点品种检查情况')">{{ Data.etyypz }}</a-button></td>
                    <td :title="lbpzTitle[2] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','etyyyp','1',Data.etyypzYj,'重点品种检查情况')">{{ Data.etyypzYj }}</a-button></td>
                    <td :title="lbpzTitle[2] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','etyyyp','11',Data.etyypzWj,'重点品种检查情况')">{{ Data.etyypzWj }}</a-button></td>
                    <td :title="lbpzTitle[2] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A03A03'})">多组分生化药</a-button></td>
                    <td :title="lbpzTitle[3] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','dzfsh','0',isNull(Data.dzfshy - Data.dzfshytc),'重点品种检查情况','1','1')">{{ isNull(Data.dzfshy - Data.dzfshytc) }}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','dzfsh','99',Data.dzfshytc,'重点品种检查情况','0','0')" danger v-if="Data.dzfshytc>0">({{ Data.dzfshytc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[3] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','dzfsh','1',Data.dzfshyYj,'重点品种检查情况','1','1')">{{ Data.dzfshyYj }}</a-button></td>
                    <td :title="lbpzTitle[3] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','dzfsh','11',Data.dzfshyWj,'重点品种检查情况','1','1')">{{ Data.dzfshyWj }}</a-button></td>
                    <td :title="lbpzTitle[3] +' | '+ qyTitle[3]"><span v-if="Data.dzfshy">{{ Tools.numberFormat(0 != Data.dzfshy ? (Data.dzfshyYj * 100) / (Data.dzfshy - Data.dzfshytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[3] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','dzfshyyp','0',Data.dzfshypz,'重点品种检查情况')">{{ Data.dzfshypz }}</a-button></td>
                    <td :title="lbpzTitle[3] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','dzfshyyp','1',Data.dzfshypzYj,'重点品种检查情况')">{{ Data.dzfshypzYj }}</a-button></td>
                    <td :title="lbpzTitle[3] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','dzfshyyp','11',Data.dzfshypzWj,'重点品种检查情况')">{{ Data.dzfshypzWj }}</a-button></td>
                    <td :title="lbpzTitle[3] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A04A03'})">中药注射剂</a-button></td>
                    <td :title="lbpzTitle[4] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','zyzsj','0',isNull(Data.zyzsj - Data.zyzsjtc),'重点品种检查情况','1','1')">{{ isNull(Data.zyzsj - Data.zyzsjtc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','zyzsj','99',Data.zyzsjtc,'重点品种检查情况','0','0')" danger v-if="Data.zyzsjtc>0">({{ Data.zyzsjtc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[4] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','zyzsj','1',Data.zyzsjYj,'重点品种检查情况','1','1')">{{ Data.zyzsjYj }}</a-button></td>
                    <td :title="lbpzTitle[4] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','zyzsj','11',Data.zyzsjWj,'重点品种检查情况','1','1')">{{ Data.zyzsjWj }}</a-button></td>
                    <td :title="lbpzTitle[4] +' | '+ qyTitle[3]"><span v-if="Data.zyzsj">{{ Tools.numberFormat(0 != Data.zyzsj ? (Data.zyzsjYj * 100) / (Data.zyzsj - Data.zyzsjtc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[4] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','zyzsjyp','0', Data.zyzsjpz,'重点品种检查情况')">{{ Data.zyzsjpz }}</a-button></td>
                    <td :title="lbpzTitle[4] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','zyzsjyp','1',Data.zyzsjpzYj,'重点品种检查情况')">{{ Data.zyzsjpzYj }}</a-button></td>
                    <td :title="lbpzTitle[4] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','zyzsjyp','11',Data.zyzsjpzWj,'重点品种检查情况')">{{ Data.zyzsjpzWj }}</a-button></td>
                    <td :title="lbpzTitle[4] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A05'})">麻醉药品</a-button></td>
                    <td :title="lbpzTitle[5] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','mzyp','0',isNull(Data.mzyp - Data.mzyptc),'重点品种检查情况','1','1')">{{ isNull(Data.mzyp - Data.mzyptc) }}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','mzyp','99',Data.mzyptc,'重点品种检查情况','0','0')" danger v-if="Data.mzyptc>0">({{ Data.mzyptc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[5] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','mzyp','1',Data.mzypYj,'重点品种检查情况','1','1')">{{ Data.mzypYj }}</a-button></td>
                    <td :title="lbpzTitle[5] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','mzyp','11',Data.mzypWj,'重点品种检查情况','1','1')">{{ Data.mzypWj }}</a-button></td>
                    <td :title="lbpzTitle[5] +' | '+ qyTitle[3]"><span v-if="Data.mzyp">{{ Tools.numberFormat(0 != Data.mzyp ? (Data.mzypYj * 100) / (Data.mzyp - Data.mzyptc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[5] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','mzypyp','0',Data.mzyppz,'重点品种检查情况')">{{ Data.mzyppz }}</a-button></td>
                    <td :title="lbpzTitle[5] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','mzypyp','1',Data.mzyppzYj,'重点品种检查情况')">{{ Data.mzyppzYj }}</a-button></td>
                    <td :title="lbpzTitle[5] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','mzypyp','11',Data.mzyppzWj,'重点品种检查情况')">{{ Data.mzyppzWj }}</a-button></td>
                    <td :title="lbpzTitle[5] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A06A03'})">第一类精神药品</a-button></td>
                    <td :title="lbpzTitle[6] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','yijsyp','0',isNull(Data.dyljsyp - Data.dyljsyptc),'重点品种检查情况','1','1')">{{ isNull(Data.dyljsyp - Data.dyljsyptc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','yijsyp','99',Data.dyljsyptc,'重点品种检查情况','0','0')" danger v-if="Data.dyljsyptc>0">({{ Data.dyljsyptc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[6] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','yijsyp','1',Data.dyljsypYj,'重点品种检查情况','1','1')">{{ Data.dyljsypYj }}</a-button></td>
                    <td :title="lbpzTitle[6] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','yijsyp','11',Data.dyljsypWj,'重点品种检查情况','1','1')">{{ Data.dyljsypWj }}</a-button></td>
                    <td :title="lbpzTitle[6] +' | '+ qyTitle[3]"><span v-if="Data.dyljsyp">{{ Tools.numberFormat(0 != Data.dyljsyp ? (Data.dyljsypYj * 100) / (Data.dyljsyp - Data.dyljsyptc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[6] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','dyljsypyp','0',Data.dyljsyppz,'重点品种检查情况')">{{ Data.dyljsyppz }}</a-button></td>
                    <td :title="lbpzTitle[6] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','dyljsypyp','1',Data.dyljsyppzYj,'重点品种检查情况')">{{ Data.dyljsyppzYj }}</a-button></td>
                    <td :title="lbpzTitle[6] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','dyljsypyp','11',Data.dyljsyppzWj ,'重点品种检查情况')">{{ Data.dyljsyppzWj }}</a-button></td>
                    <td :title="lbpzTitle[6] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A06A04'})">第二类精神药品</a-button></td>
                    <td :title="lbpzTitle[7] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','erjsyp','0',isNull(Data.deljsyp - Data.deljsyptc),'重点品种检查情况','1','1')">{{ isNull(Data.deljsyp - Data.deljsyptc) }}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','erjsyp','99',Data.deljsyptc,'重点品种检查情况','0','0')" danger v-if="Data.deljsyptc>0">({{ Data.deljsyptc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[7] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','erjsyp','1',Data.deljsypYj ,'重点品种检查情况','1','1')">{{ Data.deljsypYj }}</a-button></td>
                    <td :title="lbpzTitle[7] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','erjsyp','11',Data.deljsypWj ,'重点品种检查情况','1','1')">{{ Data.deljsypWj }}</a-button></td>
                    <td :title="lbpzTitle[7] +' | '+ qyTitle[3]"><span v-if="Data.deljsyp">{{ Tools.numberFormat(0 != Data.deljsyp ? (Data.deljsypYj * 100) / (Data.deljsyp - Data.deljsyptc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[7] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','deljsypyp','0',Data.deljsyppz,'重点品种检查情况')">{{ Data.deljsyppz }}</a-button></td>
                    <td :title="lbpzTitle[7] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','deljsypyp','1',Data.deljsyppzYj,'重点品种检查情况')">{{ Data.deljsyppzYj }}</a-button></td>
                    <td :title="lbpzTitle[7] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','deljsypyp','11',Data.deljsyppzWj ,'重点品种检查情况')">{{ Data.deljsyppzWj }}</a-button></td>
                    <td :title="lbpzTitle[7] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A04'})">药品类易制毒</a-button></td>
                    <td :title="lbpzTitle[8] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ypyzd','0',isNull(Data.yplyzd - Data.yplyzdtc),'重点品种检查情况','1','1')">{{ isNull(Data.yplyzd - Data.yplyzdtc) }}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ypyzd','99',Data.yplyzdtc,'重点品种检查情况','0','0')" danger v-if="Data.yplyzdtc>0">({{ Data.yplyzdtc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[8] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ypyzd','1',Data.yplyzdYj,'重点品种检查情况','1','1')">{{ Data.yplyzdYj }}</a-button></td>
                    <td :title="lbpzTitle[8] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ypyzd','11',Data.yplyzdWj,'重点品种检查情况','1','1')">{{ Data.yplyzdWj }}</a-button></td>
                    <td :title="lbpzTitle[8] +' | '+ qyTitle[3]"><span v-if="Data.yplyzd">{{ Tools.numberFormat(0 != Data.yplyzd ? (Data.yplyzdYj * 100) / (Data.yplyzd - Data.yplyzdtc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[8] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','yplyzdyp','0',Data.yplyzdpz ,'重点品种检查情况')">{{ Data.yplyzdpz }}</a-button></td>
                    <td :title="lbpzTitle[8] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','yplyzdyp','1',Data.yplyzdpzYj,'重点品种检查情况')">{{ Data.yplyzdpzYj }}</a-button></td>
                    <td :title="lbpzTitle[8] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','yplyzdyp','11',Data.yplyzdpzWj,'重点品种检查情况')">{{ Data.yplyzdpzWj }}</a-button></td>
                    <td :title="lbpzTitle[8] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A07'})">放射性药品</a-button></td>
                    <td :title="lbpzTitle[9] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','fsxyp','0',isNull(Data.fsxyp - Data.fsxyptc),'重点品种检查情况','1','1')">{{ isNull(Data.fsxyp - Data.fsxyptc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','fsxyp','99',Data.fsxyptc,'重点品种检查情况','0','0')" danger v-if="Data.fsxyptc>0">({{ Data.fsxyptc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[9] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','fsxyp','1',Data.fsxypYj,'重点品种检查情况','1','1')">{{ Data.fsxypYj }}</a-button></td>
                    <td :title="lbpzTitle[9] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','fsxyp','11',Data.fsxypWj,'重点品种检查情况','1','1')">{{ Data.fsxypWj }}</a-button></td>
                    <td :title="lbpzTitle[9] +' | '+ qyTitle[3]"><span v-if="Data.fsxyp">{{ Tools.numberFormat(0 != Data.fsxyp ? (Data.fsxypYj * 100) /(Data.fsxyp - Data.fsxyptc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[9] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','fsxypyp','0',Data.fsxyppz,'重点品种检查情况')">{{ Data.fsxyppz }}</a-button></td>
                    <td :title="lbpzTitle[9] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','fsxypyp','1', Data.fsxyppzYj,'重点品种检查情况')">{{ Data.fsxyppzYj }}</a-button></td>
                    <td :title="lbpzTitle[9] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','fsxypyp','11',Data.fsxyppzWj,'重点品种检查情况')">{{ Data.fsxyppzWj }}</a-button></td>
                    <td :title="lbpzTitle[9] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2"><a-button type="link" @click="toWorkloadPage({qyTags:'A02A08A03'})">医疗用毒性药品</a-button></td>
                    <td :title="lbpzTitle[10] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ylydxyp','0',isNull(Data.ylydxyp - Data.ylydxyptc),'重点品种检查情况','1','1')">{{ isNull(Data.ylydxyp - Data.ylydxyptc) }}</a-button>
                        <a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ylydxyp','99',Data.ylydxyptc,'重点品种检查情况','0','0')" danger v-if="Data.ylydxyptc>0">({{ Data.ylydxyptc }})</a-button>
                    </td>
                    <td :title="lbpzTitle[10] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ylydxyp','1',Data.ylydxypYj,'重点品种检查情况','1','1')">{{ Data.ylydxypYj }}</a-button></td>
                    <td :title="lbpzTitle[10] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('qy','ylydxyp','11',Data.ylydxypWj,'重点品种检查情况','1','1')">{{ Data.ylydxypWj }}</a-button></td>
                    <td :title="lbpzTitle[10] +' | '+ qyTitle[3]"><span v-if="Data.ylydxyp">{{ Tools.numberFormat(0 != Data.ylydxyp ? (Data.ylydxypYj * 100) / (Data.ylydxyp - Data.ylydxyptc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbpzTitle[10] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ylydxypyp','0',Data.ylydxyppz ,'重点品种检查情况')">{{ Data.ylydxyppz }}</a-button></td>
                    <td :title="lbpzTitle[10] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ylydxypyp','1',Data.ylydxyppzYj,'重点品种检查情况')">{{ Data.ylydxyppzYj }}</a-button></td>
                    <td :title="lbpzTitle[10] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ylydxypyp','11',Data.ylydxyppzWj,'重点品种检查情况')">{{ Data.ylydxyppzWj }}</a-button></td>
                    <td :title="lbpzTitle[10] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" >
                    <th :rowspan="currentArea!='420010'?11:4">重点检查类别情况</th>
                    <td :rowspan="currentArea!='420010'?4:2">药品GMP符合性检查</td>
                    <td>疫苗</td>
                    <td :title="lbjcTitle[0] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','ym','02',isNull(Data.ymJcqy - Data.ymJcqytc),'重点检查类别情况','1')">{{ isNull(Data.ymJcqy - Data.ymJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','ym','99',Data.ymJcqytc,'重点检查类别情况','0')" danger v-if="Data.ymJcqytc>0">({{Data.ymJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[0] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','ym','2',Data.ymYjJcqy,'重点检查类别情况','1')">{{Data.ymYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[0] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','ym','22',Data.ymWYjJcqy,'重点检查类别情况','1')" v-if="Data.ymJcqy">{{ Data.ymWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[0] +' | '+ qyTitle[3]"><span v-if="Data.ymJcqy">{{Tools.numberFormat(0 != Data.ymJcqy ? (Data.ymYjJcqy * 100) / (Data.ymJcqy - Data.ymJcqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[0] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ymJcpz','0',Data.ymJcpz,'重点检查类别情况','gmp')">{{ Data.ymJcpz }}</a-button></td>
                    <td :title="lbjcTitle[0] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ymJcpz','1',Data.ymYjJcpz,'重点检查类别情况','gmp')">{{ Data.ymYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[0] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ymJcpz','11',Data.ymWjJcpz,'重点检查类别情况','gmp')">{{ Data.ymWjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[0] +' | '+ pzTitle[3]">/</td>
                </tr>
                <tr class="text-center" >
                    <td>生物制品（疫苗除外）</td>
                    <td :title="lbjcTitle[1] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','swzj','02',isNull(Data.swzjJcqy - Data.swzjJcqytc),'重点检查类别情况','1')">{{ isNull(Data.swzjJcqy - Data.swzjJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','swzj','99',Data.swzjJcqytc,'重点检查类别情况','0')" danger v-if="Data.swzjJcqytc>0">({{Data.swzjJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[1] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','swzj','2',Data.swzjYjJcqy,'重点检查类别情况','1')">{{Data.swzjYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[1] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','swzj','22',Data.swzjWYjJcqy,'重点检查类别情况','1')" v-if="Data.swzjJcqy">{{ Data.swzjWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[1] +' | '+ qyTitle[3]"><span v-if="Data.swzjJcqy">{{Tools.numberFormat(0 != Data.swzjJcqy ? (Data.swzjYjJcqy * 100) / (Data.swzjJcqy - Data.swzjJcqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[1] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','swzpJcpz','0',Data.swzpJcpz,'重点检查类别情况','gmp')">{{ Data.swzpJcpz }}</a-button></td>
                    <td :title="lbjcTitle[1] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','swzpJcpz','1',Data.swzpYjJcpz,'重点检查类别情况','gmp')">{{ Data.swzpYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[1] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','swzpJcpz','11',Data.swzpWjJcpz,'重点检查类别情况','gmp')">{{ Data.swzpWjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[1] +' | '+ pzTitle[3]"><span v-if="Data.swzpJcpz">{{Tools.numberFormat(0 != Data.swzpJcpz ? (Data.swzpYjJcpz * 100) / Data.swzpJcpz : 0, 2) }}%</span><span v-else>100%</span></td>                     
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td>高风险药品</td>
                    <td :title="lbjcTitle[2] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','gfxyp','02',isNull(Data.gfxypJcqy - Data.gfxypJcqytc),'重点检查类别情况','1')">{{isNull(Data.gfxypJcqy - Data.gfxypJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','gfxyp','99',Data.gfxypJcqytc,'重点检查类别情况','0')" danger v-if="Data.gfxypJcqytc>0">({{Data.gfxypJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[2] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','gfxyp','2',Data.gfxypYjJcqy,'重点检查类别情况','1')">{{Data.gfxypYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[2] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','gfxyp','22',Data.gfxypWYjJcqy,'重点检查类别情况','1')" v-if="Data.gfxypJcqy">{{ Data.gfxypWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[2] +' | '+ qyTitle[3]"><span v-if="Data.gfxypJcqy">{{Tools.numberFormat(0 != Data.gfxypJcqy ? (Data.gfxypYjJcqy * 100) / (Data.gfxypJcqy - Data.gfxypJcqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[2] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','gfxypJcpz','0',Data.gfxypJcpz,'重点检查类别情况','gmp')">{{ Data.gfxypJcpz }}</a-button></td>
                    <td :title="lbjcTitle[2] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','gfxypJcpz','1',Data.gfxypYjJcpz,'重点检查类别情况','gmp')">{{ Data.gfxypYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[2] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','gfxypJcpz','11',Data.gfxypWjJcpz,'重点检查类别情况','gmp')">{{ Data.gfxypWjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[2] +' | '+ pzTitle[3]"><span v-if="Data.gfxypJcpz">{{Tools.numberFormat(0 != Data.gfxypJcpz ? (Data.gfxypYjJcpz * 100) / Data.gfxypJcpz : 0, 2) }}%</span><span v-else>100%</span></td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td>新冠治疗药</td>
                    <td :title="lbjcTitle[3] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','xgzly','02',isNull(Data.xgzlyJcqy - Data.xgzlyJcqytc),'重点检查类别情况','1')">{{isNull(Data.xgzlyJcqy - Data.xgzlyJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','xgzly','99',Data.xgzlyJcqytc,'重点检查类别情况','0')" danger v-if="Data.xgzlyJcqytc>0">({{Data.xgzlyJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[3] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','xgzly','2',Data.xgzlyYjJcqy,'重点检查类别情况','1')">{{Data.xgzlyYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[3] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','xgzly','22',Data.xgzlyWYjJcqy,'重点检查类别情况','1')" v-if="Data.xgzlyJcqy">{{ Data.xgzlyWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[3] +' | '+ qyTitle[3]"><span v-if="Data.xgzlyJcqy">{{Tools.numberFormat(0 != Data.xgzlyJcqy ? (Data.xgzlyYjJcqy * 100) / (Data.xgzlyJcqy - Data.xgzlyJcqytc)  : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[3] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','xgzlyJcpz','0',Data.xgzlyJcpz,'重点检查类别情况','gmp')">{{ Data.xgzlyJcpz }}</a-button></td>
                    <td :title="lbjcTitle[3] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','xgzlyJcpz','1',Data.xgzlyYjJcpz,'重点检查类别情况','gmp')">{{ Data.xgzlyYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[3] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','xgzlyJcpz','11',Data.xgzlyWjJcpz,'重点检查类别情况','gmp')">{{ Data.xgzlyWjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[3] +' | '+ pzTitle[3]"><span v-if="Data.xgzlyJcpz">{{Tools.numberFormat(0 != Data.xgzlyJcpz ? (Data.xgzlyYjJcpz * 100) / Data.xgzlyJcpz : 0, 2) }}%</span><span v-else>100%</span></td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td rowspan="4">专项检查</td>
                    <td>中药饮片</td>
                    <td :title="lbjcTitle[4] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','zyyp','03',isNull(Data.zyypJcqy - Data.zyypJcqytc),'重点检查类别情况','1')">{{isNull(Data.zyypJcqy - Data.zyypJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','zyyp','99',Data.zyypJcqytc,'重点检查类别情况','0')" danger v-if="Data.zyypJcqytc>0">({{Data.zyypJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[4] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','zyyp','3',Data.zyypYjJcqy,'重点检查类别情况','1')">{{Data.zyypYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[4] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','zyyp','33',Data.zyypWYjJcqy,'重点检查类别情况','1')" v-if="Data.zyypJcqy">{{ Data.zyypWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[4] +' | '+ qyTitle[3]"><span v-if="Data.zyypJcqy">{{ Tools.numberFormat(0 != Data.zyypJcqy ? (Data.zyypYjJcqy * 100) / (Data.zyypJcqy - Data.zyypJcqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[4] +' | '+ pzTitle[0]">/</td>
                    <td :title="lbjcTitle[4] +' | '+ pzTitle[1]">/</td>
                    <td :title="lbjcTitle[4] +' | '+ pzTitle[2]">/</td>
                    <td :title="lbjcTitle[4] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td>委托生产持有人</td>
                    <td :title="lbjcTitle[5] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','wtsccyr','03',isNull(Data.wtsccyrJcqy - Data.wtsccyrJcqytc),'重点检查类别情况','1')">{{ isNull(Data.wtsccyrJcqy - Data.wtsccyrJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','wtsccyr','99',Data.wtsccyrJcqytc,'重点检查类别情况','0')" danger v-if="Data.wtsccyrJcqytc>0">({{Data.wtsccyrJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[5] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','wtsccyr','3',Data.wtsccyrYjJcqy,'重点检查类别情况','1')">{{Data.wtsccyrYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[5] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','wtsccyr','33',Data.wtsccyrWYjJcqy,'重点检查类别情况','1')" v-if="Data.wtsccyrJcqy">{{ Data.wtsccyrWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[5] +' | '+ qyTitle[3]"><span v-if="Data.wtsccyrJcqy">{{ Tools.numberFormat(0 != Data.wtsccyrJcqy ? (Data.wtsccyrYjJcqy * 100) / (Data.wtsccyrJcqy - Data.wtsccyrJcqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[5] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','wtsccyrJcpz','0',Data.wtsccyrJcpz,'重点检查类别情况','zx')">{{ Data.wtsccyrJcpz }}</a-button></td>
                    <td :title="lbjcTitle[5] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','wtsccyrJcpz','1', Data.wtsccyrYjJcpz,'重点检查类别情况','zx')">{{ Data.wtsccyrYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[5] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','wtsccyrJcpz','11',Data.wtsccyrWjJcpz,'重点检查类别情况','zx')">{{ Data.wtsccyrWjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[5] +' | '+ pzTitle[3]"><span v-if="Data.wtsccyrJcpz">{{Tools.numberFormat(0 != Data.wtsccyrJcpz ? (Data.wtsccyrYjJcpz * 100) / Data.wtsccyrJcpz : 0, 2) }}%</span><span v-else>100%</span></td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td>麻精药品</td>
                    <td :title="lbjcTitle[6] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','mjyp','03',isNull(Data.mjypJcqy - Data.mjypJcqytc),'重点检查类别情况','1')">{{ isNull(Data.mjypJcqy - Data.mjypJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','mjyp','99',Data.mjypJcqytc,'重点检查类别情况','0')" danger v-if="Data.mjypJcqytc>0">({{Data.mjypJcqytc}})</a-button>
                    </td>
                    <td :title="lbjcTitle[6] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','mjyp','3',Data.mjypYjJcqy,'重点检查类别情况','1')">{{Data.mjypYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[6] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','mjyp','33',Data.mjypWYjJcqy,'重点检查类别情况','1')" v-if="Data.mjypJcqy">{{ Data.mjypWYjJcqy }}</a-button></td>
                    <td :title="lbjcTitle[6] +' | '+ qyTitle[3]"><span v-if="Data.mjypJcqy">{{ Tools.numberFormat(0 != Data.mjypJcqy ? (Data.mjypYjJcqy * 100) / (Data.mjypJcqy - Data.mjypJcqytc) : 0, 2) }}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[6] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','mjypJcpz','0',Data.mjypJcpz,'重点检查类别情况','zx')">{{ Data.mjypJcpz }}</a-button></td>
                    <td :title="lbjcTitle[6] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','mjypJcpz','1',Data.mjypYjJcpz,'重点检查类别情况','zx')">{{ Data.mjypYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[6] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','mjypJcpz','11',Data.mjypWjJcpz,'重点检查类别情况','zx')">{{ Data.mjypWjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[6] +' | '+ pzTitle[3]"><span v-if="Data.mjypJcpz">{{Tools.numberFormat(0 != Data.mjypJcpz ? (Data.mjypYjJcpz * 100) / Data.mjypJcpz : 0, 2) }}%</span><span v-else>100%</span></td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td>促产保供应急审批药品</td>
                    <td :title="lbjcTitle[7] +' | '+ qyTitle[0]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','cyj','03',isNull(Data.cyjJcqy - Data.cyjJcqytc),'重点检查类别情况','1')">{{isNull(Data.cyjJcqy - Data.cyjJcqytc)}}</a-button>
                        <a-button type="link" class="!px-1" @click="jdjcToListPage('qy','cyj','99',Data.cyjJcqytc,'重点检查类别情况','0')" danger v-if="Data.cyjJcqytc>0">{{Data.cyjJcqytc}}</a-button>
                    </td>
                    <td :title="lbjcTitle[7] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','cyj','3',isNull(Data.cyjYjJcqy),'重点检查类别情况','1')">{{isNull(Data.cyjYjJcqy)}}</a-button></td>
                    <td :title="lbjcTitle[7] +' | '+ qyTitle[2]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','cyj','33',isNull(Data.cyjWYjJcqy),'重点检查类别情况','1')">{{isNull( Data.cyjWYjJcqy )}}</a-button></td>
                    <td :title="lbjcTitle[7] +' | '+ qyTitle[3]"><span v-if="Data.cyjJcqy">{{isNull(Tools.numberFormat(0 != Data.cyjJcqy ? (Data.cyjYjJcqy * 100) / (Data.cyjJcqy - Data.cyjJcqytc) : 0, 2) )}}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[7] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','cyjJcpz','0', isNull(Data.cyjJcpz),'重点检查类别情况','zx')">{{ isNull(Data.cyjJcpz)}}</a-button></td>
                    <td :title="lbjcTitle[7] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','cyjJcpz','1',isNull(Data.cyjYjJcpz),'重点检查类别情况','zx')">{{ isNull(Data.cyjYjJcpz)}}</a-button></td>
                    <td :title="lbjcTitle[7] +' | '+ pzTitle[2]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','cyjJcpz','11',isNull(Data.cyjWjJcpz),'重点检查类别情况','zx')">{{isNull(Data.cyjWjJcpz)}}</a-button></td>
                    <td :title="lbjcTitle[7] +' | '+ pzTitle[3]"><span v-if="Data.cyjJcpz">{{isNull(Tools.numberFormat(0 != Data.cyjJcpz ? (Data.cyjYjJcpz * 100) / Data.cyjJcpz : 0, 2)) }}%</span><span v-else>100%</span></td>                 
                </tr>
                <tr class="text-center">
                    <td rowspan="2">有因检查</td>
                    <td>线索产生</td>
                    <td :title="lbjcTitle[8] +' | '+ qyTitle[0]">/</td>
                    <td :title="lbjcTitle[8] +' | '+ qyTitle[1]">{{Data.xscsJcqy}}</td>
                    <td :title="lbjcTitle[8] +' | '+ qyTitle[2]">/</td>
                    <td :title="lbjcTitle[8] +' | '+ qyTitle[3]">/</td>
                    <td :title="lbjcTitle[8] +' | '+ pzTitle[0]">0</td>
                    <td :title="lbjcTitle[8] +' | '+ pzTitle[1]">0</td>
                    <td :title="lbjcTitle[8] +' | '+ pzTitle[2]">/</td>
                    <td :title="lbjcTitle[8] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center">
                    <td>分派任务</td>
                    <td :title="lbjcTitle[9] +' | '+ qyTitle[0]">/</td>
                    <td :title="lbjcTitle[9] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','fprw','5',Data.fprwYjJcqy,'重点检查类别情况')">{{Data.fprwYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[9] +' | '+ qyTitle[2]">/</td>
                    <td :title="lbjcTitle[9] +' | '+ qyTitle[3]">/</td>
                    <td :title="lbjcTitle[9] +' | '+ pzTitle[0]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','fprwJcpz','0',Data.fprwJcpz,'重点检查类别情况','yy')">{{ Data.fprwJcpz }}</a-button></td>
                    <td :title="lbjcTitle[9] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','fprwJcpz','1',Data.fprwYjJcpz,'重点检查类别情况','yy')">{{ Data.fprwYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[9] +' | '+ pzTitle[2]">/</td>
                    <td :title="lbjcTitle[9] +' | '+ pzTitle[3]">/</td>                 
                </tr>
                <tr class="text-center" v-if="currentArea!='420010'">
                    <td colspan="2">药物警戒检查</td>
                    <td :title="lbjcTitle[10] +' | '+ qyTitle[0]">{{Data.ywjjJcqy}}</td>
                    <td :title="lbjcTitle[10] +' | '+ qyTitle[1]"><a-button type="link" class="!px-1" @click="jdjcToListPage('qy','ywjj','4',Data.ywjjYjJcqy,'重点检查类别情况')">{{Data.ywjjYjJcqy}}</a-button></td>
                    <td :title="lbjcTitle[10] +' | '+ qyTitle[2]">{{isNull(Data.ywjjJcqy -Data.ywjjYjJcqy) }}</td>
                    <td :title="lbjcTitle[10] +' | '+ qyTitle[3]"><span v-if="Data.ywjjJcqy">{{ isNull(Tools.numberFormat(0 != Data.ywjjJcqy ? (Data.ywjjYjJcqy * 100) / Data.ywjjJcqy : 0, 2))}}%</span><span v-else>100%</span></td>
                    <td :title="lbjcTitle[10] +' | '+ pzTitle[0]">/</td>
                    <td :title="lbjcTitle[10] +' | '+ pzTitle[1]"><a-button type="link" class="!px-1" @click="zdpzToListPage('pz','ywjjJcpz','1',Data.ywjjYjJcpz,'重点检查类别情况','ywjj')">{{ Data.ywjjYjJcpz }}</a-button></td>
                    <td :title="lbjcTitle[10] +' | '+ pzTitle[2]">/</td>
                    <td :title="lbjcTitle[10] +' | '+ pzTitle[3]"><span v-if="Data.ywjjJcpz">{{isNull(Tools.numberFormat(0 != Data.ywjjJcpz ? (Data.ywjjYjJcpz * 100) / Data.ywjjJcpz : 0, 2)) }}%</span><span v-else>100%</span></td>                 
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup name="jgyw-jdjc-wcqk">
import { ref, computed } from 'vue';
import { defHttp } from '/@/utils/http/axios';
import { useGo } from '/@/hooks/web/usePage';
import { default as Tools, TableProps } from '/@/utils/tools';
import { getTextByCode} from '/@/utils/area/areaDataUtil';
const go = useGo();
const currentYear = ref(Tools.getCurrentYear());
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const areaArray=ref([]);
const currentArea=ref();
const userArea=ref();
const Data = ref([]);
const bodyEl = ref<ElRef>(null);
const qyTitle=["企业应检查","企业已检查","企业未检查","企业检查覆盖率"];
const pzTitle=["品种应检查","品种已检查","品种未检查","品种检查覆盖率"];
const lbqyTitle=["药品生产企业","医疗机构制剂室","药包材生产企业","药用辅料生产企业"];
const lbpzTitle=["集采品种","生物制品","儿童用药","多组分生化药","中药注射剂","麻醉药品","第一类精神药品","第二类精神药品","药品类易制毒","放射性药品","儿医疗用毒性药品童用药"];
const lbjcTitle=["疫苗","生物制品（疫苗除外）","高风险药品","新冠治疗药","中药饮片","委托生产持有人","麻精药品","促产保供应急审批药品","线索产生","分派任务","药物警戒检查"];       

function loadData(params = { year: currentYear.value,area:currentArea.value }) {
    if(currentArea.value=='420010'){
        params.area='420000'
    }
    defHttp.get({ url: '/jc/yw/jdjc/arealist', params: params }).then((res) => {
        areaArray.value=res.xzqhdm;
        areaArray.value.push('420010')
        userArea.value=res.userXzqhdm;
        if(!currentArea.value){
            currentArea.value=res.userXzqhdm;
        } 
        if(!params.area)params.area=res.userXzqhdm;
        defHttp.get({ url: '/jc/yw/jdjc/jdjcArea', params: params }).then((res) => {            
            Data.value=res;
            if(Data.value.ywjjJcqy>0){
                Data.value.ywjjJcqy= Math.ceil(Data.value.ywjjJcqy/4)
            }else{
                Data.value.ywjjJcqy=0
            }
            
        })
    });
}


function isNull(text){
    if(!text)return "0";
    if(text<0)return "0";
    return text;
}

function getAreaName(text) {
    if(text==='420010')return "省局检查中心"
    return text === '429000' ? '汉江分局' : getTextByCode(text).replace(/(市|州|土家族苗族自治州)$/g, '分局');
}

function jdjcToListPage( lx,yppz,isYj,num,title,sczk) {
    let zs="6"
    if(yppz=="ywjj")zs="201010"    
    let qy = { year: currentYear.value, xzdm: currentArea.value,yppzlx:yppz,zslx:zs,sczk:sczk,isYj: isYj,num:num,title:title};
    if (lx == 'qy') {
        qy.showYpmc=false; 
        go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoQyDetail', query: qy });
    }  
    if (lx == 'pz') {
        go({ path: '/ypyd/gcyppz', query: qy });
    } 
}

function scqyToListPage(zslx, isYj,num,sczk) {
    let qy = { year: currentYear.value, xzdm: currentArea.value, zslx:zslx, isYj: isYj,num:num, sczk:sczk,title:"企业检查覆盖总体情况" };
    go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoQyDetail', query: qy });
}

function zdpzToListPage(lx,yppz, isYj,num,title,jclx,sczk) {
    let qy = { year: currentYear.value, xzdm: currentArea.value, yppzlx:yppz,zslx:6, isYj: isYj ,num:num,title:title,sczk:sczk,jclx:jclx};
    if (lx == 'qy') {
        qy.showYpmc=true;
        go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoQyDetail', query: qy });
    }
    if (lx == 'pz') {
        go({ path: '/ypsczhjg/ypyd/scjdjc/detail/infoPzDetail', query: qy });
    } 
}

function toWorkloadPage(query) {
    go({ path: '/jgyw/jdjc/xcjcqk', query });
}

function onExportXls() {
    let array: Array<TableProps> = Tools.getTableData(bodyEl.value?.querySelectorAll('.my-table'));
    if (!array || 1 > array.length) return;
    array[0].title = '湖北省药品生产监督检查任务完成情况表（' + getAreaName(currentArea.value) + '）';
    Tools.downloadExcel(array[0].title, array);
}

loadData();

defineExpose({});
</script>

<style lang="less" scoped>
.item {
  white-space: nowrap;
}
</style>