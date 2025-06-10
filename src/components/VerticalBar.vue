<template>
	<div>
		<div>【服務資源占用比】</div>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})

const target = ref(null)
let mChart = null
onMounted(() => {
	mChart = echarts.init(target.value)
	renderChart()
})

const renderChart = () => {
	const options = {
		// X 轴展示選项
		xAxis: {
			type: 'category',
			// 根據根據服務端數據篩選
			data: props.data.servers.map((item) => item.name),
			// 文字色值
			axisLabel: {
				color: '#9EB1C8'
			}
		},
		// Y 轴展示數據
		yAxis: {
			// 數據展示
			type: 'value',
			// 不顯示轴
			show: false,
			// 最大值（防止触頂）
			max: function (value) {
				// 取整
				return parseInt(value.max * 1.2)
			}
		},
		// echarts 網格绘制的位置，對應 上、右、下、左
		grid: {
			top: 16,
			right: 0,
			bottom: 26,
			left: -26,
			// 計算边距時，包含標签
			containLabel: true
		},
		// 柱形图核心配置
		series: {
			// 柱形图
			type: 'bar',
			// 數據篩選
			data: props.data.servers.map((item) => ({
				name: item.name,
				value: item.value
			})),
			// 每個轴的樣式
			itemStyle: {
				color: '#479AD3', // 设置柱子的颜色
				barBorderRadius: 5, // 设置柱子的圆角
				shadowColor: 'rgba(0, 0, 0, 0.3)', // 设置柱子的阴影颜色
				shadowBlur: 5 // 设置柱子的阴影模糊大小
			},
			// 柱子宽度
			barWidth: 12,
			// 文本
			label: {
				show: true,
				// 设置標签位置為右侧
				position: 'top',
				textStyle: {
					// 设置標签文本颜色
					color: '#fff'
				},
				formatter: '{c}%'
			}
		}
	}

	mChart.setOption(options)
}

// 監聽數據的变化，重新渲染图表
watch(
	() => props.data,
	() => {
		renderChart()
	}
)
</script>

<style lang="scss" scoped></style>
