<template>
	<div class="ypsc-container" :style="`--header-height:${headerHeightRef}px;--footer-height:${footerHeightRef}px`">
		<div class="enter-y my-index lg:grid lg:grid-cols-3">
			<a-card class="lg:col-span-3 !p-0 data-overview">
				<template #title>
					<div class="relative">
						<div class="flex-1">
							<span>数据总览</span>
							<a-select v-model:value="currentYear" @change="() => loadReportData()" class="!ml-4"
								size="small">
								<a-select-option v-for="item in yearArray" :key="item" :value="item">
									{{ item }}年
								</a-select-option>
							</a-select>
						</div>
						<a-input placeholder="请输入您要查询的内容" class="absolute right-0 max-w-350px"
							style="top:50%;transform:translateY(-50%);">
							<template #addonAfter>
								<a-dropdown>
									<template #overlay>
										<a-menu>
											<a-menu-item key="1">企业查询</a-menu-item>
											<a-menu-item key="2">品种查询</a-menu-item>
											<a-menu-item key="3">处方查询</a-menu-item>
										</a-menu>
									</template>
									<a-button type="primary" @click="loadReportData()">
										企业查询
										<a-icon icon="ant-design:down-outlined" style="font-size:12px;" />
									</a-button>
								</a-dropdown>
							</template>
						</a-input>
					</div>
				</template>
				<Skeleton :loading="showSkeleton">
					<div class="item1 xl:grid xl:grid-cols-4">
						<div v-for="(item, idx) in dataOverview" :key="idx"
							:class="['sub-item text-light-50 rounded', item.class]">
							<div class="mb-6">
								<div>{{ item.title }}</div>
								<div></div>
							</div>
							<div class="flex justify-between">
								<div v-for="(s, sid) in item.children" :key="idx + '-' + sid" class="text-center"
									:class="[s.onClick ? 'cursor-pointer' : '']" :title="s.tips"
									@click="s.onClick && s.onClick.call(s, $event)">
									<CountTo :startVal="0" separator="" class="text-xl value" :endVal="s.value"
										v-if="Tools.isNumber(s.value)" />
									<CountTo :startVal="0" separator="" class="text-xl value" suffix="%"
										:endVal="parseFloat(s.value.replace(/[%]+$/g, ''))" :decimals="s.decimals"
										v-else-if="Tools.endsWith(s.value, '%')" />
									<div class="text-xl value" v-else>{{ s.value }}</div>
									<div>{{ s.title }}</div>
								</div>
							</div>
						</div>
					</div>
				</Skeleton>
			</a-card>
			<div class="lg:col-span-3 work-notice flex items-center bg-white">
				<a-icon icon="ant-design:bell-outlined" class="!text-xl !text-red-500" />
				<div class="ml-1">工作提醒：</div>
				<div class="flex-1 w-0">
					<Skeleton :loading="showSkeleton" :data="[[4, 3, 17]]">
						<Vue3Marquee :pauseOnHover="true" :pauseOnClick="true" :duration="15">
							您有<span class="text-red-500 px-1 text-xl font-600">0</span>条风险处置需要处理。
						</Vue3Marquee>
					</Skeleton>
				</div>
			</div>
			<div>
				<a-card title="药品注册变更情况" :loading="showSkeleton" class="h-300px body-full">
					<my-echarts :options="{
						tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 20, left: 20, right: 20 },
						xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ypzcbgqkData.category }, yAxis: { type: 'value' },
						series: ypzcbgqkData.series
					}" />
				</a-card>
				<a-card title="药品生产许可证变更情况" :loading="showSkeleton" class="h-300px body-full"
					:style="{ marginTop: 'var(--global-padding)' }">
					<my-echarts :options="{
						tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 20, left: 20, right: 20 },
						xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'] }, yAxis: { type: 'value' },
						series: [
							{ type: 'line', name: '基本信息变更', smooth: true, data: randomArray(6) }
							, { type: 'line', name: '生产地址及名称变更', smooth: true, data: randomArray(6) }
							, { type: 'line', name: '生产范围变更', smooth: true, data: randomArray(6) }
							, { type: 'line', name: '生产地址及范围变更(委托)', smooth: true, data: randomArray(6) }
							, { type: 'line', name: '生产地址及范围变更(受托)', smooth: true, data: randomArray(6) }
						]
					}" />
				</a-card>
			</div>
			<a-card :loading="showSkeleton" class="lg:col-span-2 body-full map" :style="{ backgroundColor: 'transparent' }">
				<my-echarts :options="{
					tooltip: {
						trigger: 'item', borderColor: 'rgba(254,122,35,.9)', backgroundColor: 'rgba(255,177,128,.9)', textStyle: { color: '#fff' },
						formatter(params) {
							if (!params.data) return;
							let array = ['<b>', params.name, '</b><br/><table>'];
							array.push('<tr><td class=\'pr-2\'>药品品种</td><td class=\'text-right\'>', params.data.pzQty || 0, '</td></tr>');
							array.push('<tr><td class=\'pr-2\'>药品文号</td><td class=\'text-right\'>', params.data.whQty || 0, '</td></tr>');
							array.push('<tr><td class=\'pr-2\'>药品上市许可持有人</td><td class=\'text-right\'>', params.data.cyrQty || 0, '</td></tr>');
							array.push('<tr><td class=\'pr-2\'>药品生产企业</td><td class=\'text-right\'>', params.data.scQty || 0, '</td></tr>');
							array.push('<tr><td class=\'pr-2\'>放射性药品生产企业</td><td class=\'text-right\'>', params.data.fsxScQty || 0, '</td></tr>');
							array.push('<tr><td class=\'pr-2\'>医疗机构制剂单位</td><td class=\'text-right\'>', params.data.zjQty || 0, '</td></tr>');
							array.push('</table>');
							return array.join('');
						}
					}, geo: [{
						map: '湖北省边框', aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '50%'], layoutSize: '190%', roam: false, silent: true, label: { show: false }
						, itemStyle: { areaColor: { type: 'radial', x: 0.77, y: 0.62, r: 1.2, colorStops: [{ offset: 0, color: 'rgba(102,166,255,1)' }, { offset: 1, color: 'rgba(0,85,204,1)' }], global: false }, borderWidth: 1, borderColor: '#fff' }
					}, {
						map: '湖北省', aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '50%'], layoutSize: '190%', roam: false, silent: true, emphasis: { label: { show: false } }
						, itemStyle: { borderWidth: 0, borderColor: 'transparent', shadowColor: '#8cd3ef', shadowOffsetY: 10, shadowBlur: 120, areaColor: 'transparent' }
					}, {
						map: '湖北省', zlevel: -1, aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '51%'], layoutSize: '190%', roam: false, silent: true
						, itemStyle: { borderWidth: 0, borderColor: 'rgba(58,149,253,0.8)', shadowColor: 'rgba(172, 122, 255,0.5)', shadowOffsetY: 5, shadowBlur: 15, areaColor: 'rgba(5,21,35,0.1)' }
					}, {
						map: '湖北省', zlevel: -2, aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '52%'], layoutSize: '190%', roam: false, silent: true
						, itemStyle: { borderWidth: 0, borderColor: 'rgba(58,149,253,0.6)', shadowColor: 'rgba(65, 214, 255,1)', shadowOffsetY: 5, shadowBlur: 15, areaColor: 'transpercent' }
					}, {
						map: '湖北省', zlevel: -3, aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '53%'], layoutSize: '190%', roam: false, silent: true
						, itemStyle: { borderWidth: 0, borderColor: 'rgba(58,149,253,0.4)', shadowColor: 'rgba(58,149,253,1)', shadowOffsetY: 15, shadowBlur: 10, areaColor: 'transpercent' }
					}, {
						map: '湖北省', zlevel: -4, aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '54%'], layoutSize: '190%', roam: false, silent: true
						, itemStyle: { borderWidth: 5, borderColor: 'rgba(5,9,57,0.8)', shadowColor: 'rgba(29, 111, 165,0.8)', shadowOffsetY: 15, shadowBlur: 10, areaColor: 'rgba(5,21,35,0.1)' }
					}]
					, series: [{
						type: 'map', map: '湖北省', aspectScale: 1, zoom: 0.7, layoutCenter: ['50%', '50%'], layoutSize: '190%', showLegendSymbol: true
						, label: { show: true, formatter: '{b}', color: '#fff', fontSize: '130%' }
						, itemStyle: {
							areaColor: 'transparent', borderType: [1, 2], borderWidth: 1, borderColor: '#fff'
						}, emphasis: {
							itemStyle: { show: false, color: '#fff', areaColor: 'rgba(255,215,0,1)', shadowColor: 'rgba(29, 111, 165,0.8)', shadowOffsetY: 6, shadowBlur: 10 }
						}, select: {
							itemStyle: { show: false, color: '#fff', areaColor: 'rgba(255,215,0,1)', shadowColor: 'rgba(29, 111, 165,0.8)', shadowOffsetY: 6, shadowBlur: 10 }
						},
						data: mapData
					}]
				}" @inited="mapRender" />
			</a-card>
			<a-card title="各类监管对象检查情况" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 40, left: 20, right: 20 },
					legend: { data: ['完成率', '覆盖率', '整改率'], bottom: 10 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['上市许可持有人', '药品生产企业', '医疗机构制剂室', '药包材生产企业', '药用辅料生产企业'] }, yAxis: { type: 'value' },
					series: [{ type: 'line', smooth: true, name: '完成率', data: randomArray(5) }
						, { type: 'line', smooth: true, name: '覆盖率', data: randomArray(5) }
						, { type: 'line', smooth: true, name: '整改率', data: randomArray(5) }
					]
				}" />
			</a-card>
			<a-card title="各单位监督检查情况" :loading="showSkeleton" class="lg:col-span-2 h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 40, left: 20, right: 20 },
					legend: { data: ['整改率'], bottom: 10 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['省局', '检查中心', '武汉分局', '黄石分局', '十堰分局', '宜昌分局', '襄阳分局', '鄂州分局', '荆门分局', '孝感分局', '荆州分局', '黄冈分局', '咸宁分局', '随州分局', '恩施分局', '汉江分局'] },
					yAxis: [{ type: 'value' }, { type: 'value', splitLine: { show: false } }],
					series: [{ type: 'bar', name: '常规检查', stack: '检查次数', barWidth: 10, data: randomArray(16) }
						, { type: 'bar', name: '专项检查', stack: '检查次数', data: randomArray(16) }
						, { type: 'bar', name: 'GMP符合性检查', stack: '检查次数', data: randomArray(16) }
						, { type: 'bar', name: '许可检查', stack: '检查次数', data: randomArray(16) }
						, { type: 'bar', name: '有因检查', stack: '检查次数', data: randomArray(16) }
						, { type: 'bar', name: '药物警戒检查', stack: '检查次数', data: randomArray(16) }
						, { type: 'bar', name: '其他检查', stack: '检查次数', data: randomArray(16) }
						, { type: 'bar', name: '总人次', barWidth: 3, data: randomArray(16, 100, 500) }
						, { type: 'line', smooth: true, name: '整改率', yAxisIndex: 1, data: randomArray(16) }
					]
				}" />
			</a-card>
			<a-card title="药品抽检验情况" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 40, left: 20, right: 20 }, legend: { data: ['国抽', '省外抽', '省内抽'], bottom: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['集采药品', '疫苗', '生物制品(除疫苗)', '儿童用药', '多组分生化药', '中药注射剂', '毒麻精放药品', '含兴奋剂药品', '高风险药品', '新冠治疗药'] }
					, yAxis: [{ type: 'value' }, { type: 'value', splitLine: { show: false } }],
					series: [
						{ type: 'line', smooth: true, name: '合格率', yAxisIndex: 1, data: randomArray(10) }
						, { type: 'line', smooth: true, name: '覆盖率', yAxisIndex: 1, data: randomArray(10) }
						, { type: 'bar', stack: '抽检批次', name: '国抽', barWidth: 15, data: randomArray(10) }
						, { type: 'bar', stack: '抽检批次', name: '省外抽', data: randomArray(10) }
						, { type: 'bar', stack: '抽检批次', name: '省内抽', data: randomArray(10) }
					]
				}" />
			</a-card>
			<a-card title="抽检验不合格批次" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 60, left: 30, right: 30 }, legend: { data: ['省内抽检', '国家抽检', '外省抽检'], bottom: 20 },
					xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, name: '省内抽检', data: randomArray(5) }
						, { type: 'line', smooth: true, name: '国家抽检', data: randomArray(5) }
						, { type: 'line', smooth: true, name: '外省抽检', data: randomArray(5) }
					]
				}" />
			</a-card>
			<a-card title="近期抽检验不合格的品种" :loading="showSkeleton" class="h-300px">
				<table class="my-table">
					<colgroup>
						<col>
						<col style="width:6em;">
						<col style="width:6em;">
					</colgroup>
					<thead>
						<tr class="text-center">
							<td>品种名称</td>
							<td>抽检次数</td>
							<td>不合格率</td>
						</tr>
					</thead>
					<tr class="text-center">
						<td>布洛芬片</td>
						<td>83</td>
						<td>65%</td>
					</tr>
					<tr class="text-center">
						<td>盐酸阿芬太尼注射液</td>
						<td>53</td>
						<td>63%</td>
					</tr>
					<tr class="text-center">
						<td>安乃近片</td>
						<td>44</td>
						<td>54%</td>
					</tr>
					<tr class="text-center">
						<td>福尔可定片</td>
						<td>31</td>
						<td>14%</td>
					</tr>
				</table>
			</a-card>
			<a-card title="各市州案件数量" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 40, left: 20, right: 20 }, legend: { data: ['一般案件', '简易程序'], bottom: 10 },
					xAxis: { type: 'category', axisLabel: { rotate: 45 }, data: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '天门', '潜江', '仙桃', '神农架'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, stack: '案件数', name: '一般案件', areaStyle: {}, data: randomArray(17) }
						, { type: 'line', smooth: true, stack: '案件数', name: '简易程序', areaStyle: {}, data: randomArray(17) }
					]
				}" />
			</a-card>
			<a-card title="案件来源分布" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'item' },
					series: [{
						name: '药品检查缺陷分布', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205, label: { formatter: '{b} {c}' },
						data: [{ name: '监督检查', value: 100 }, { name: '机构检测报告', value: 1 }, { name: '投诉、举报', value: 70 }, { name: '其他部门移送', value: 15 }, { name: '上级交办', value: 18 }, { name: '下级行政机构报请', value: 1 }]
					}]
				}" />
			</a-card>
			<a-card title="药品追溯覆盖情况" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 20, left: 20, right: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['集采药品', '疫苗', '生物制品(除疫苗)', '儿童用药', '多组分生化药', '中药注射剂', '毒麻精放药品', '含兴奋剂药品', '高风险药品', '新冠治疗药'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, name: '覆盖率', data: randomArray(10) }
					]
				}" />
			</a-card>
			<a-card title="各市州不良反应次数" :loading="showSkeleton" class="lg:col-span-2 h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 45 }, data: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '天门', '潜江', '仙桃', '神农架'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, name: '不良反应', areaStyle: {}, data: randomArray(17) }
					]
				}" />
			</a-card>
			<a-card title="各类不良反应次数" :loading="showSkeleton" class="h-300px body-full">
				<my-echarts :options="{
					tooltip: { trigger: 'item' },
					series: [{
						name: '各类不良反应次数', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205, label: { formatter: '{b} {c}' },
						data: [{ name: '毒性反应', value: 0 }, { name: '过敏反应', value: 0 }, { name: '药物依赖性反应', value: 0 }, { name: '拮抗反应', value: 0 }, { name: '药物相互作用', value: 0 }, { name: '累积作用反应', value: 0 }, { name: '药物运输反应', value: 0 }, { name: '假性反应', value: 0 }]
					}]
				}" />
			</a-card>
			<div class="lg:col-span-3 lg:grid lg:grid-cols-2" style="column-gap:var(--global-padding);">
				<a-card title="各市州投诉举报次数" :loading="showSkeleton" class="h-300px body-full">
					<my-echarts :options="{
						tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 40, left: 20, right: 20 },
						xAxis: { type: 'category', axisLabel: { rotate: 45 }, data: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '天门', '潜江', '仙桃', '神农架'] }, yAxis: { type: 'value' },
						series: [
							{ type: 'line', smooth: true, name: '发生次数', areaStyle: {}, data: randomArray(17) }
						]
					}" />
				</a-card>
				<a-card title="近期投诉举报较多的事由" :loading="showSkeleton" class="h-300px body-full">
					<my-echarts :options="{
						tooltip: { trigger: 'axis' }, grid: { containLabel: true, top: 30, bottom: 20, left: 30 },
						xAxis: { type: 'value' }, yAxis: [{ type: 'category', data: ['不符合药品生产质量管理规范', '销售本企业受托生产的或者他人生产的药品', '未取得《药品生产许可证》生产药品', '生产企业未按照规定建立药品不良反应报告和监测管理制度', '药品生产企业未对销售人员加强管理'] }],
						series: [
							{ type: 'bar', name: '发生次数', barWidth: 15, data: [9, 6, 6, 5, 5, 5, 5, 4, 4, 4] }
						]
					}" />
				</a-card>
			</div>
		</div>
		<div ref="loadingElem" class="fixed z-1 pointer-events-none" v-loading="loading" :style="loadingElemDomStyle">
		</div>
	</div>
</template>
<script lang="ts" name="dashboard-analysis" setup>
import { ref, computed, watch, nextTick, CSSProperties } from 'vue';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useLayoutHeight } from '/@/layouts/default/content/useContentViewHeight';
import { defHttp } from '/@/utils/http/axios';
import { CountTo } from '/@/components/CountTo/index';
import Skeleton from '/@/views/dashboard/Analysis/components/Skeleton.vue';
import { Vue3Marquee } from 'vue3-marquee';
import { registerMap } from 'echarts';
import myEcharts from '/@/views/dashboard/homePage/components/my-echarts.vue';
import mapRegionData from '/@/utils/map/420000.json';
import mapRegionDataBorder from '/@/utils/map/420000_border.json';
import { useGo } from '/@/hooks/web/usePage';
import Tools from '/@/utils/tools';

const loadingElem = ref<ElRef>(null);
const { getMenuType } = useMenuSetting();
const { headerHeightRef, footerHeightRef } = useLayoutHeight();
const loadingElemDomStyle = ref<CSSProperties>({});
watch([() => getMenuType.value, () => loadingElem.value], () => {
	nextTick(() => {
		let rect = loadingElem.value?.parentElement?.parentElement?.getClientRects()[0];
		loadingElemDomStyle.value = rect && { top: headerHeightRef.value + 'px', left: rect.left + 'px', bottom: footerHeightRef.value + 'px', right: 0 + 'px' } || {};
	});
}, { immediate: true });

const loading = ref(true), showSkeleton = ref(true);
const currentYear = ref(Tools.getCurrentYear());
const selectedCity = ref<Partial<{ code, name, dataIndex }>>({});
const yearArray = computed(() => Tools.getYearArray(currentYear.value));
const data = ref<Partial<{ dataOverview: { pz: Recordable, qy: Recordable, jdjc: Recordable }, mapData: Recordable, ypzcbgqk: Array<Recordable> }>>({});
const dataOverview = computed<Array<Partial<Recordable>>>(() => {
	let { pz, qy, jdjc } = data.value?.dataOverview || { pz: {}, qy: {}, jdjc: {} }, ypscqyClick = (tags?, qylx?) => {
		return function () {
			toPage({ path: '/yqyd/ypsc', query: { year: currentYear.value, xzqhdm: selectedCity.value.code, forceTags: tags, qylx, tabTitle: this.title } });
		};
	};
	return [{
		title: '上市许可持有', class: 'bg-sky-400', children: [{ title: '药品品种', value: pz.pzQty }, {
			title: '批准文号', value: pz.whQty, onClick() {
				toPage({ path: '/ypyd/gcyppz', query: { xzqhdm: selectedCity.value.code } });
			}
		}, {
			title: '药品上市许可持有人', value: qy.cyrQty, onClick() {
				toPage({ path: '/yqyd/cyr', query: { year: currentYear.value, xzqhdm: selectedCity.value.code } });
			}
		}]
	}, {
		title: '药品生产', class: 'bg-green-400', children: [{ title: '药品生产企业', value: qy.scQty, onClick: ypscqyClick('!A02A08A07') }, { title: '放射性药品生产企业', value: qy.fsxScQty, onClick: ypscqyClick('A02A08A07') }, {
			title: '制剂单位', value: qy.zjQty, onClick() {
				toPage({ path: '/yqyd/yljgzjs', query: { year: currentYear.value, xzqhdm: selectedCity.value.code } });
			}
		}]
	}, {
		title: '监督检查', class: 'bg-yellow-400', children: [{ title: '检查企业数', value: jdjc.yjcQyQty }, {
			title: '覆盖率', value: Tools.calcPercent(qy.scQty + qy.fsxScQty + qy.zjQty, jdjc.yjcQyQty)
		}, {
			title: '检查总数', value: jdjc.jcjlQty, onClick() {
				toPage({ path: '/jgyw/jdjc/jgjl', query: { year: currentYear.value, xzqhdm: selectedCity.value.code } });
			}
		}, {
			title: '不符合率', value: Tools.calcPercent(jdjc.jcjlQty, jdjc.bfhQty), decimals: 2, tips: jdjc.bfhQty || 0, onClick() {
				toPage({ path: '/jgyw/jdjc/jgjl', query: { year: currentYear.value, xzqhdm: selectedCity.value.code, zhpdjl: '03' } });
			}
		}]
	}, {
		title: '抽检验', class: 'bg-rose-400', children: [{ title: '省内文号数', value: 534 }, { title: '覆盖率', value: '35%' }, { title: '抽检总数', value: 534 }, { title: '不合格数', value: 10 }]
	}, {
		title: '稽查执法', class: 'bg-yellow-400', children: [{ title: '涉及企业数', value: 11 }, { title: '总次数', value: 12 }]
	}, {
		title: '药品追溯', class: 'bg-purple-400', children: [{ title: '已接入企业数', value: 156 }, { title: '已接入文号数', value: 350 }]
	}, {
		title: '不良反应', class: 'bg-sky-400', children: [{ title: '涉及企业数', value: 11 }, { title: '涉及文号数', value: 26 }, { title: '总次数', value: 12 }]
	}, {
		title: '投诉举报', class: 'bg-green-400', children: [{ title: '涉及企业数', value: 11 }, { title: '总次数', value: 12 }]
	}]
});
const mapData = ref<Array<any>>([]);

registerMap('湖北省', mapRegionData);
registerMap('湖北省边框', mapRegionDataBorder);

function mapRender(chart) {
	chart.on('click', (res) => {
		let data = res.data;
		selectedCity.value = !selectedCity.value?.name || selectedCity.value.name != data.name ? data : {};
		Tools.throttle(() => {
			loadReportData({ areaCode: selectedCity.value.code || '' }, false);
		});
	});
}

const ypzcbgqkData = computed(() => {
	let category: Array<String> = [], series: Array<Recordable> = [], cache = {};
	if (data.value?.ypzcbgqk) {
		for (let key in data.value.ypzcbgqk) {
			category.push(key);
			(data.value.ypzcbgqk[key] || []).forEach(item => {
				if (!item.ywlx) return;
				let obj = cache[item.ywlx];
				if (!obj) {
					cache[item.ywlx] = obj = { type: 'bar', name: item.ywlx, data: [] };
					series.push(obj);
				}
				obj.data.push(item.value || 0);
			});
		}
	}
	return { category, series };
});

function loadReportData(params = {}, isFirst = true) {
	loading.value = true;
	defHttp.get({ url: '/report/homePage/v202309', params: { year: currentYear.value, isRefreshCache: true, ...params } }).then((res) => {
		data.value = res;
		if (isFirst) {
			let array: any[] = [];
			mapRegionData.features.forEach((item, idx) => {
				let obj = { name: item.properties.name, code: item.properties.adcode, dataIndex: idx, ...(res.mapData || {})[item.properties.adcode] };
				obj.value = (obj.scQty || 0) + (obj.fsxScQty || 0);
				array.push(obj);
			});
			mapData.value = array;
		}
		loading.value = showSkeleton.value = false;
	});
}

loadReportData();

const go = useGo();
function toPage(link) {
	link && go(link);
}




const randomArray = (num, start = 1, end = 100) => {
	let array: any = [];
	for (let idx = 0; idx < num; idx++) {
		array.push(Math.round(Math.random() * (end - start)) + start);
	}
	return array;
}
</script>
<style lang="less" scoped>
@global-padding: 1rem;

.ypsc-container {
	--global-padding: @global-padding;
	background-image: url(/@/assets/images/ypsc/bg.png);
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-color: #fafafa;
	background-position: bottom;
	min-height: calc(100vh - var(--header-height));
	padding: @global-padding @global-padding (@global-padding*4);

	.my-index {
		align-items: stretch;
		row-gap: @global-padding;
		column-gap: @global-padding;

		:deep(.ant-card) {
			display: flex;
			flex-direction: column;
			border-width: 0;
			border-radius: 0.25rem;

			.ant-card-head {
				padding: 0 @global-padding;
				min-height: unset;
				border-bottom-width: 0;

				.ant-card-head-title {
					padding: (@global-padding * 0.7) 0 0;
					overflow: unset;
				}
			}

			.ant-card-body {
				flex: 1;
				padding: @global-padding;
				height: 0;
			}

			.ant-card-loading-content {
				margin: -@global-padding;
				padding: @global-padding;
			}

			&.body-full>.ant-card-body>div {
				margin: -@global-padding;
				height: calc(100% + (@global-padding * 2));
			}
		}

		.data-overview {
			:deep(.ant-card-head) {
				.ant-input-group-wrapper {
					.ant-input+.ant-input-group-addon {
						padding: 0;
						border-width: 0;

						.ant-btn {
							height: unset;
							border-top-left-radius: 0;
							border-bottom-left-radius: 0;
						}
					}
				}
			}

			.item1 {
				row-gap: @global-padding;
				column-gap: @global-padding;

				.sub-item {
					padding: 0.5rem 0.75rem;
				}
			}

			.item {
				--value-color: #3b82f6;
				--title: '';
				padding: @global-padding;
				grid-template-columns: minmax(350px, 30%) 1fr;
				row-gap: @global-padding;
				column-gap: @global-padding;
				background-color: #f0f6ff;
				color: #70a3f7;
				border-radius: 0.25rem;
				background-image: url(/@/assets/images/ypsc/item-1.png);
				background-repeat: no-repeat;
				background-position: right bottom;
				background-size: auto 160px;
				position: relative;

				&>.title {
					position: absolute;
					right: 5px;
					bottom: 0;
					font-size: 33px;
					font-weight: 600;
				}

				&+.item {
					margin-top: @global-padding;
				}

				&:nth-child(even) {
					--value-color: #fa8527;
					background-color: #fff3e9;
					color: #fea157;
					background-image: url(/@/assets/images/ypsc/item-2.png);
				}

				.sub-item {
					margin-top: @global-padding;

					>.title {
						margin-right: @global-padding;
						padding: 0.4rem 0.25rem;
						width: 2.75rem;
						line-height: 1.1;
						color: #fff;
						background-color: var(--value-color);
						text-align: center;
						border-radius: 0.25rem;
					}

					.content {
						column-gap: @global-padding;
					}

					.details {
						>.title {
							font-size: 13px;
						}

						.value {
							color: var(--value-color);
							font-weight: bolder;
							font-size: 24px;
						}
					}
				}
			}
		}

		.work-notice {
			padding: @global-padding;
			border-radius: 0.25rem;
		}
	}
}

@media (min-width: 992px) {
	.lg\:flex-2 {
		flex: 2 1 0%;
	}
}
</style>