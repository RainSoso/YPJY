<template>
	<div ref="bodyEl" class="enter-y my-index">
		<div class="absolute left-2 right-2 z-1 bg-yellow-100 rounded-lg bg-opacity-80">
			<div class="p-2">
				提示：跑马灯试的信息提示。
			</div>
		</div>
		<Card class="lg:w-full !p-0 !mx-8px h-207px" :loading="loading" :bodyStyle="{ padding: '16px' }">
			<template #title>
				<div class="relative">
					<div class="flex-1">总体概况</div>
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
								<a-button type="primary">
									企业查询
									<a-icon icon="ant-design:down-outlined" style="font-size:12px;" />
								</a-button>
							</a-dropdown>
						</template>
					</a-input>
				</div>
			</template>
			<div class="lg:w-full">
				<div class="md:grid 2xl:grid-cols-5 xl:grid-cols-3 md:grid-cols-2 md:gap-16px card-block">
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
									<div class="title">({{ /(持有人|集采)/ig.test(item.name) ? '注册' : '生产' }}) 品种数 / 文号数<span
											v-if="item.zcwh != undefined"> / 在产文号数</span></div>
									<div class="number cursor-pointer">
										<CountTo :startVal="0" :endVal="item.pz" separator="" class="text-xl" />
										<span class="text-xl px-2 cursor-pointer">/</span>
										<CountTo :startVal="0" :endVal="item.pzwh" separator="" class="text-xl" />
										<span class="text-xl px-2 cursor-pointer" v-if="item.zcwh != undefined">/</span>
										<CountTo :startVal="0" :endVal="item.zcwh" v-if="item.zcwh != undefined"
											separator="" class="text-xl" />
									</div>
								</li>
							</ul>
						</div>
					</template>
				</div>
			</div>
		</Card>
		<Card title="工作提醒" class="lg:w-full !p-0 !mx-8px !mt-0" :loading="loading" :bodyStyle="{ padding: '16px' }">
			<div class="md:grid 2xl:grid-cols-7 xl:grid-cols-3 md:grid-cols-2 md:gap-16px dbtx">
				<div class="item">
					<div class="title ">风险处置/协同处置</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="0" class="text-2xl" />
						</span>
					</div>
				</div>
				<div class="item">
					<div class="title">未填年报企业</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="0" class="text-2xl" />
						</span>
					</div>
				</div>
				<div class="item">
					<div class="title">即将到期生产证</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="ypsczJjgq" class="text-2xl" />
						</span>
					</div>
				</div>
				<div class="item">
					<div class="title">未全覆盖集采品种</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="0" class="text-2xl" />
						</span>
					</div>
				</div>
				<div class="item">
					<div class="title">专项检查未绑定品种</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="0" class="text-2xl" />
						</span>
					</div>
				</div>
				<div class="item">
					<div class="title">未上传整改报告</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="0" class="text-2xl" />
						</span>
					</div>
				</div>
				<div class="item">
					<div class="title ">风险提示</div>
					<div class="number cursor-pointer">
						<span>
							<CountTo :startVal="0" :endVal="0" class="text-2xl" />
						</span>
					</div>
				</div>
			</div>
		</Card>
		<div class="lg:w-1/3">
			<Card title="重点药品数量统计" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 }, legend: { data: ['批准文号', '品种', '上市许可持有人'], bottom: 10 },
					xAxis: { type: 'value' }, yAxis: [{ type: 'category', data: ['集采药品', '疫苗', '生物制品(除疫苗)', '儿童用药', '多组分生化药', '中药注射剂', '毒麻精放药品', '含兴奋剂药品', '高风险药品', '新冠治疗药'].reverse() }],
					series: [
						{ type: 'bar', stack: '数量', name: '批准文号', data: randomArray(10) }
						, { type: 'bar', stack: '数量', name: '品种', data: randomArray(10) }
						, { type: 'bar', stack: '数量', name: '上市许可持有人', data: randomArray(10) }
					]
				}" />
			</Card>
			<Card title="重点药品变更情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 20, bottom: 20, left: 20, right: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['2023-02', '2023-03', '2023-04', '2023-05', '2023-06', '2023-07'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'bar', name: '登记事项变更', data: randomArray(6) }
						, { type: 'bar', name: '持有人主体变更', data: randomArray(6) }
						, { type: 'bar', name: '生产场地变更', data: randomArray(6) }
						, { type: 'bar', name: '药品处方变更', data: randomArray(6) }
						, { type: 'bar', name: '生产工艺变更', data: randomArray(6) }
						, { type: 'bar', name: '质量标准变更', data: randomArray(6) }
						, { type: 'bar', name: '药品说明书和标签变更', data: randomArray(6) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-2/3">
			<Card :loading="loading" class="h-616px map" :bodyStyle="{ padding: '1rem' }">
				<div ref="mapChart" class="map-container" :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }"></div>
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="药品生产许可证分类" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-highcharts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					series: [{
						type: 'venn', data: [
							{ sets: ['A'], value: 273, name: '自产(A类)' }
							, { sets: ['B'], value: 104, name: '委托(B类)' }
							, { sets: ['C'], value: 60, name: '受托(C类)' }
							, { sets: ['D'], value: 104, name: '原料药(D类)' }
							, { sets: ['A', 'B'], value: 56 }
							, { sets: ['A', 'C'], value: 58 }
							, { sets: ['A', 'D'], value: 46 }
							, { sets: ['A', 'B', 'C'], value: 20 }
							, { sets: ['A', 'B', 'D'], value: 15 }
							, { sets: ['A', 'C', 'D'], value: 15 }
							, { sets: ['B', 'C'], value: 20 }
							, { sets: ['B', 'D'], value: 21 }
							, { sets: ['B', 'C', 'D'], value: 4 }
							, { sets: ['C', 'D'], value: 15 }
							, { sets: ['A', 'B', 'C', 'D'], value: 4 }
						]
					}]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="药品生产许可证变更情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 20, bottom: 20, left: 20, right: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'bar', name: '基本信息变更', barWidth: 10, data: randomArray(6) }
						, { type: 'bar', name: '生产地址及名称变更', data: randomArray(6) }
						, { type: 'bar', name: '生产范围变更', data: randomArray(6) }
						, { type: 'bar', name: '生产地址及范围变更(委托)', data: randomArray(6) }
						, { type: 'bar', name: '生产地址及范围变更(受托)', data: randomArray(6) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="近期变更较多的企业" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter(['次']) }, grid: { containLabel: true, top: 20, bottom: 20, left: 30 },
					xAxis: { type: 'value' }, yAxis: [{ type: 'category', data: ['宜昌人福药业有限责任公司', '远大医药（中国）有限公司', '葵花药业集团（襄阳）隆中有限公司', '中美华世通生物医药科技（武汉）股份有限公司', '远大生命科学（武汉）有限公司', '武汉启瑞药业有限公司', '朗天药业（湖北）有限公司', '宜昌东阳光长江药业股份有限公司', '湖北四环制药有限公司', '武汉九珑人福药业有限责任公司'] }],
					series: [
						{ type: 'bar', name: '发生次数', data: [9, 6, 6, 5, 5, 5, 5, 4, 4, 4] }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="监督检查完成情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter(['%', '%']) }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 }, legend: { data: ['完成率', '覆盖率'], bottom: 10 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['集采药品', '疫苗', '生物制品(除疫苗)', '儿童用药', '多组分生化药', '中药注射剂', '毒麻精放药品', '含兴奋剂药品', '高风险药品', '新冠治疗药'] }, yAxis: { type: 'value' },
					series: [{ type: 'line', smooth: true, name: '完成率', data: randomArray(10) }
						, { type: 'line', smooth: true, name: '覆盖率', data: randomArray(10) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="各单位监督检查次数" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['省局', '检查中心', '武汉分局', '黄石分局', '十堰分局', '宜昌分局', '襄阳分局', '鄂州分局', '荆门分局', '孝感分局', '荆州分局', '黄冈分局', '咸宁分局', '随州分局', '恩施分局', '汉江分局'] }, yAxis: { type: 'value' },
					series: [{ type: 'line', smooth: true, name: '常规检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
						, { type: 'line', smooth: true, name: '专项检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
						, { type: 'line', smooth: true, name: 'GMP符合性检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
						, { type: 'line', smooth: true, name: '许可检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
						, { type: 'line', smooth: true, name: '有因检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
						, { type: 'line', smooth: true, name: '药物警戒检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
						, { type: 'line', smooth: true, name: '其他检查', stack: '检查次数', areaStyle: {}, data: randomArray(16) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="药品检查缺陷分布" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'item', formatter: tooltipFormatter() },
					series: [{
						name: '药品检查缺陷分布', type: 'pie', radius: '60%', center: ['50%', '50%'], startAngle: 205, label: { formatter: '{b} {c}' },
						data: [{ name: '严重缺陷', value: 0 }, { name: '主要缺陷', value: 70 }, { name: '一般缺陷', value: 1529 }, { name: '未定义缺陷', value: 18 }]
					}]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="药品抽检验情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter(['%', '%']) }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 }, legend: { data: ['国抽', '省外抽', '省内抽'], bottom: 20 },
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
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="抽检验不合格批次" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 30, bottom: 60, left: 30, right: 30 }, legend: { data: ['省内抽检', '国家抽检', '外省抽检'], bottom: 20 },
					xAxis: { type: 'category', data: ['2019', '2020', '2021', '2022', '2023'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, name: '省内抽检', data: randomArray(5) }
						, { type: 'line', smooth: true, name: '国家抽检', data: randomArray(5) }
						, { type: 'line', smooth: true, name: '外省抽检', data: randomArray(5) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="近期抽检验不合格的品种" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
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
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="药品追溯覆盖情况" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter(['%']) }, grid: { containLabel: true, top: 20, bottom: 20, left: 20, right: 20 },
					xAxis: { type: 'category', axisLabel: { rotate: 30 }, data: ['集采药品', '疫苗', '生物制品(除疫苗)', '儿童用药', '多组分生化药', '中药注射剂', '毒麻精放药品', '含兴奋剂药品', '高风险药品', '新冠治疗药'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, name: '覆盖率', data: randomArray(10) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="各市州案件数量" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 }, legend: { data: ['一般案件', '简易程序'], bottom: 10 },
					xAxis: { type: 'category', axisLabel: { rotate: 45 }, data: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '天门', '潜江', '仙桃', '神农架'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, stack: '案件数', name: '一般案件', areaStyle: {}, data: randomArray(17) }
						, { type: 'line', smooth: true, stack: '案件数', name: '简易程序', areaStyle: {}, data: randomArray(17) }
					]
				}" />
			</Card>
		</div>
		<div class="lg:w-1/3">
			<Card title="各市州不良反应及投诉举报次数" :loading="loading" class="h-300px" :bodyStyle="{ padding: '1rem' }">
				<my-echarts :style="{ height: 'calc(100% + 2rem)', margin: '-1rem' }" :options="{
					tooltip: { trigger: 'axis', formatter: tooltipFormatter() }, grid: { containLabel: true, top: 20, bottom: 40, left: 20, right: 20 }, legend: { data: ['不良反应', '投诉举报'], bottom: 10 },
					xAxis: { type: 'category', axisLabel: { rotate: 45 }, data: ['武汉', '黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州', '恩施', '天门', '潜江', '仙桃', '神农架'] }, yAxis: { type: 'value' },
					series: [
						{ type: 'line', smooth: true, name: '不良反应', areaStyle: {}, data: randomArray(17) }
						, { type: 'line', smooth: true, name: '投诉举报', areaStyle: {}, data: randomArray(17) }
					]
				}" />
			</Card>
		</div>
	</div>
</template>
<script lang="ts" setup name="dashboard-homePage5">
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
import myHighcharts from './components/my-highcharts.vue';

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
const dataBlock = ref([{}, { name: '药品生产企业(含放射性)', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '医疗机构制剂单位', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '特殊药品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }, { name: '生物制品生产企业', value: 0, pz: 0, pzwh: 0, zcwh: 0 }]);
const mapCardData = ref([{ name: '药品生产企业', value: '' }, { name: '医疗机构制剂单位', value: '' }, { name: '药品品种', value: '' }, { name: '医疗机构制剂数量', value: '' }]);
const selectedCity = ref({});
const { setOptions: setOptionsMapChart } = useECharts(mapChart as Ref<HTMLDivElement>);

const titleObj = {
	'第二十七条': '第二十七条　与药品生产、质量有关的所有人员都应当经过培训，培训的内容应当与岗位的要求相适应。除进行本规范理论和实践的培训外，还应当有相关法规、相应岗位的职责、技能的培训，并定期评估培训的实际效果。',
	'第一百五十九条': '第一百五十九条　与本规范有关的每项活动均应当有记录，以保证产品生产、质量控制和质量保证等活动可以追溯。记录应当留有填写数据的足够空格。记录应当及时填写，内容真实，字迹清晰、易读，不易擦除。',
	'第一百七十五条 （六）': '第一百七十五条　批生产记录的内容应当包括：（六）相关生产操作或活动、工艺参数及控制范围，以及所用主要生产设备的编号；',
	'第一百五十条': '第一百五十条　文件是质量保证系统的基本要素。企业必须有内容正确的书面质量标准、生产处方和工艺规程、操作规程以及记录等文件。',
	'第四十八条': '第四十八条　应当根据药品品种、生产操作要求及外部环境状况等配置空调净化系统，使生产区有效通风，并有温度、湿度控制和空气净化过滤，保证药品的生产环境符合要求。洁净区与非洁净区之间、不同级别洁净区之间的压差应当不低于10帕斯卡。必要时，相同洁净度级别的不同功能区域（操作间）之间也应当保持适当的压差梯度。口服液体和固体制剂、腔道用药（含直肠用药）、表皮外用药品等非无菌制剂生产的暴露工序区域及其直接接触药品的包装材料最终处理的暴露工序区域，应当参照“无菌药品”附录中D级洁净区的要求设置，企业可根据产品的标准和特性',
	'第二百二十三条 （六）': '第二百二十三条　物料和不同生产阶段产品的检验应当至少符合以下要求：（六）检验记录应当至少包括以下内容：1.产品或物料的名称、剂型、规格、批号或供货批号，必要时注明供应商和生产商（如不同）的名称或来源；2.依据的质量标准和检验操作规程；3.检验所用的仪器或设备的型号和编号；4.检验所用的试液和培养基的配制批号、对照品或标准品的来源和批号；5.检验所用动物的相关信息；6.检验过程，包括对照品溶液的配制、各项具体的检验操作、必要的环境温湿度；7.检验结果，包括观察情况、计算和图谱或曲线图，以及依据的检验报告编号；8.检验日期；9.检验人员的签名和日期；10.检验、计算复核人员',
	'第二百五十条': '第二百五十条　任何偏离生产工艺、物料平衡限度、质量标准、检验方法、操作规程等的情况均应当有记录，并立即报告主管人员及质量管理部门，应当有清楚的说明，重大偏差应当由质量管理部门会同其他部门进行彻底调查，并有调查报告。偏差调查报告应当由质量管理部门的指定人员审核并签字。企业还应当采取预防措施有效防止类似偏差的再次发生。',
	'第八十七条': '第八十七条　生产设备应当有明显的状态标识，标明设备编号和内容物（如名称、规格、批号）；没有内容物的应当标明清洁状态。',
	'第一百七十条 （二）': '第一百七十条　制剂的工艺规程的内容至少应当包括：（二）生产操作要求：1.对生产场所和所用设备的说明（如操作间的位置和编号、洁净度级别、必要的温湿度要求、设备型号和编号等）；2.关键设备的准备（如清洗、组装、校准、灭菌等）所采用的方法或相应操作规程编号；3.详细的生产步骤和工艺参数说明（如物料的核对、预处理、加入物料的顺序、混合时间、温度等）；4.所有中间控制方法及标准；5.预期的最终产量限度，必要时，还应当说明中间产品的产量限度，以及物料平衡的计算方法和限度；6.待包装产品的贮存要求，包括容器、标签及特殊贮存条件；7.需要说明的注意事项。',
	'第五十八条': '第五十八条　仓储区的设计和建造应当确保良好的仓储条件，并有通风和照明设施。仓储区应当能够满足物料或产品的贮存条件（如温湿度、避光）和安全贮存的要求，并进行检查和监控。'
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
                  '+ (showValue && '<span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">' + item.value + (idx < units.length ? (units[idx] != '%' ? '(' + units[idx] + ')' : units[idx]) : '') + '</span>' || '') + '\
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
const jcpzsl = ref(0), nbcount = ref(0), ypsczJjgq = ref(0);

const backData = ref({});
function loadReportData(params = {}, isFirst = true) {
	openLoading();

	setTimeout(() => {

		notification.open({
			message: '工作提醒',
			description: createVNode('ul', { class: 'list-decimal pl-2rem m-0' }, [
				createVNode('li', { class: 'whitespace-nowrap' }, ['您有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '条风险处置需要处理。'])
				, createVNode('li', { class: 'whitespace-nowrap' }, ['您有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '条协同处置需要处理。'])
				, createVNode('li', { class: 'whitespace-nowrap' }, ['当前有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '家企业未填写药品生产企业年报。'])
				, createVNode('li', { class: 'whitespace-nowrap' }, ['当前有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '即将到期的药品生产许可证。'])
				, createVNode('li', { class: 'whitespace-nowrap' }, ['当前有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '个集采药品未达到监管全覆盖。'])
				, createVNode('li', { class: 'whitespace-nowrap' }, ['当前有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '次集采或特药专项检查未绑定品种。'])
				, createVNode('li', { class: 'whitespace-nowrap' }, ['当前有', createVNode('span', { class: 'text-red-500 px-1' }, '0'), '次检查未上传整改报告。'])
			]),
			placement: 'bottomRight',
			style: { margin: '0 -24px -24px 0' }
			//, duration: 0
		});

		let res = { "scfs": [{ "name": "自产(A类)", "value": 274 }, { "name": "委托(B类)", "value": 105 }, { "name": "受托(C类)", "value": 61 }, { "name": "原料药(D类)", "value": 104 }], "cjyData": { "category": ["药品生产", "医疗机构制剂"], "yljgzj": { "cyQy": 7, "cyBhg": 0, "cyCs": 19, "cyHg": 19 }, "ypsc": { "cyQy": 112, "cyBhg": 2, "cyCs": 3148, "cyHg": 3146 } }, "ypsczJjgq": 1, "mapData": { "429021": { "areaCode": "429021", "ypscqy": 1 }, "429006": { "zjsl": 58, "areaCode": "429006", "ypscqy": 12, "yppz": 180, "yljgzj": 3 }, "421200": { "zjsl": 34, "areaCode": "421200", "ypscqy": 16, "yppz": 41, "yljgzj": 4 }, "420100": { "zjsl": 455, "areaCode": "420100", "ypscqy": 116, "yppz": 2592, "yljgzj": 17 }, "429005": { "zjsl": 10, "areaCode": "429005", "ypscqy": 5, "yppz": 157, "yljgzj": 1 }, "421100": { "zjsl": 142, "areaCode": "421100", "ypscqy": 37, "yppz": 369, "yljgzj": 6 }, "429004": { "zjsl": 94, "areaCode": "429004", "ypscqy": 6, "yppz": 323, "yljgzj": 4 }, "421000": { "zjsl": 198, "areaCode": "421000", "ypscqy": 25, "yppz": 269, "yljgzj": 7 }, "422800": { "zjsl": 70, "areaCode": "422800", "ypscqy": 10, "yppz": 88, "yljgzj": 3 }, "420500": { "zjsl": 39, "areaCode": "420500", "ypscqy": 26, "yppz": 687, "yljgzj": 3 }, "420300": { "zjsl": 190, "areaCode": "420300", "ypscqy": 18, "yppz": 224, "yljgzj": 7 }, "421300": { "zjsl": 95, "areaCode": "421300", "ypscqy": 7, "yppz": 231, "yljgzj": 4 }, "420200": { "zjsl": 77, "areaCode": "420200", "ypscqy": 24, "yppz": 427, "yljgzj": 3 }, "420900": { "zjsl": 11, "areaCode": "420900", "ypscqy": 27, "yppz": 477, "yljgzj": 3 }, "420800": { "zjsl": 108, "areaCode": "420800", "ypscqy": 18, "yppz": 167, "yljgzj": 5 }, "420700": { "zjsl": 74, "areaCode": "420700", "ypscqy": 17, "yppz": 272, "yljgzj": 2 }, "420600": { "zjsl": 130, "areaCode": "420600", "ypscqy": 22, "yppz": 416, "yljgzj": 8 } }, "xzxkNum3": 102, "xzxkNum1": 9, "yppzlx": { "total": 6920, "pz3": 103, "pz2": 4421, "pz4": 2396, "pz9": 1873 }, "nbcount": 349, "jcpzsl": 215, "dataBlock": [{ "zcwh": 2035, "name": "药品生产企业(含放射性)", "pz": 2369, "value": 387, "pzwh": 6920 }, { "zcwh": 1785, "name": "医疗机构制剂单位", "pz": 1272, "value": 80, "pzwh": 1785 }, { "zcwh": 163, "name": "特殊药品生产企业", "pz": 189, "value": 95, "pzwh": 415 }, { "zcwh": 19, "name": "生物制品生产企业", "pz": 49, "value": 7, "pzwh": 99 }], "ypqyfl": [{ "code": "H", "name": "化学药", "value": 222 }, { "code": "Z", "name": "中成药", "value": 126 }, { "code": "S", "name": "生物制品", "value": 7 }, { "code": "T", "name": "特殊药品", "value": 95 }, { "code": "Y", "name": "中药饮片", "value": 84 }, { "code": "Q", "name": "医用气体", "value": 47 }, { "code": "X", "name": "其它", "value": 7 }, { "name": "中药配方颗粒", "value": 6, "tags": "A02A04A04" }], "jdjcData": { "jdjcTotal": 485, "jdjcQyTotal": 254, "jcbhg": 4 }, "jczfData": { "ybAj": [9, 16, 20, 3, 8], "zdAj": [0, 0, 0, 0, 0], "category": ["2019年", "2020年", "2021年", "2022年", "2023年"], "jnTotal": 8 } }

		backData.value = res;
		dataBlock.value = [{ name: '药品上市许可持有人', value: 256, pz: 2418, pzwh: 7097, zcwh: 2048 }, ...res.dataBlock];
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
:deep(.ant-input-group-wrapper-lg) {
	.ant-input+.ant-input-group-addon {
		padding: 0;
		border-width: 0;

		.ant-btn {
			padding: 6.5px 15px;
			height: unset;
			font-size: 16px;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
}

:deep(.ant-input-group-wrapper) {
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

:deep(.ant-card) {
	& {
		display: flex;
		flex-direction: column;
	}

	.ant-card-head {
		padding: 0 16px;

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

	&>div {
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