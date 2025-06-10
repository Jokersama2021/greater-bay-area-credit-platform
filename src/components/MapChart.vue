<template>
	<div>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import mapJson from '@/assets/MapData/china.json'

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
	// echarts 渲染
	echarts.registerMap('china', mapJson)

	let options = {
		// 時間線，提供了在多個 ECharts option 間進行切换
		timeline: {
			// 數據
			data: props.data.voltageLevel,
			// 类目轴
			axisType: 'category',
			// 自動切换
			autoPlay: true,
			// 間隔時間
			playInterval: 3000,
			// 位置
			left: '10%',
			right: '10%',
			bottom: '0%',
			width: '80%',
			// 轴的文本標签
			label: {
				// 默認状态
				normal: {
					textStyle: {
						color: '#ddd'
					}
				},
				// 高亮状态
				emphasis: {
					textStyle: {
						color: '#fff'
					}
				}
			},
			// 文字大小
			symbolSize: 10,
			// 線的樣式
			lineStyle: {
				color: '#555'
			},
			// 選中點的樣式
			checkpointStyle: {
				borderColor: '#888',
				borderWidth: 2
			},
			// 控件樣式
			controlStyle: {
				// 上一步按钮
				showNextBtn: true,
				// 下一步按钮
				showPrevBtn: true,
				// 默認樣式
				normal: {
					color: '#666',
					borderColor: '#666'
				},
				// 高亮樣式
				emphasis: {
					color: '#aaa',
					borderColor: '#aaa'
				}
			}
		},
		// 柱形图右侧展示
		baseOption: {
			grid: {
				right: '2%',
				top: '15%',
				bottom: '10%',
				width: '20%'
			},

			// 中國地图
			geo: {
				// 展示
				show: true,
				// 中國地图
				map: 'china',
				// 開启缩放
				roam: true,
				// 初始缩放
				zoom: 0.8,
				// 中心點
				center: [113.83531246, 34.0267395887],
				// 默認状态的省份樣式
				itemStyle: {
					normal: {
						// 边框色值
						borderColor: 'rgba(147, 235, 248, 1)',
						// 边框宽度
						borderWidth: 1,
						// 區域颜色
						areaColor: {
							// 經向色值
							type: 'radial',
							x: 0.5,
							y: 0.5,
							r: 0.5,
							colorStops: [
								// 0% 處的颜色
								{
									offset: 0,
									color: 'rgba(147, 235, 248, 0)'
								},
								// 100% 處的颜色
								{
									offset: 1,
									color: 'rgba(147, 235, 248, .2)'
								}
							],
							// 缺省為 false
							globalCoord: false
						}
					},
					// 鼠標移入的色值
					emphasis: {
						areaColor: '#389BB7',
						borderWidth: 0
					}
				}
			}
		},
		// 绑定時間轴的多個图表
		options: []
	}

	// 為每一年度的图表添加數據
	props.data.voltageLevel.forEach((item, index) => {
		options.options.push({
			// 背景色
			backgroundColor: '#142037',
			title: [
				// 主標題，對應地图
				{
					text: '2019-2023 年度數據統計',
					left: '0%',
					top: '0',
					textStyle: {
						color: '#ccc',
						fontSize: 30
					}
				},
				// 副標題，對應柱形图
				{
					id: 'statistic',
					text: item + '年數據統計情况',
					right: '0%',
					top: '4%',
					textStyle: {
						color: '#ccc',
						fontSize: 20
					}
				}
			],
			// X 轴配置
			xAxis: {
				// 數據轴
				type: 'value',
				// 脱離 0 值比例
				scale: true,
				// 位置
				position: 'top',
				// 不顯示分割線
				splitLine: {
					show: false
				},
				// 不顯示轴線
				axisLine: {
					show: false
				},
				// 不顯示刻度尺
				axisTick: {
					show: false
				},
				// 类別文字
				axisLabel: {
					margin: 2,
					textStyle: {
						color: '#aaa'
					}
				}
			},
			// Y 轴
			yAxis: {
				// 選项轴
				type: 'category',
				// 轴線
				axisLine: {
					show: true,
					lineStyle: {
						color: '#ddd'
					}
				},
				// 轴刻度
				axisTick: {
					show: false,
					lineStyle: {
						color: '#ddd'
					}
				},
				// 轴標签
				axisLabel: {
					interval: 0,
					textStyle: {
						color: '#ddd'
					}
				},
				// 根據年份，获取對應數據
				data: props.data.categoryData[item].map((item) => item.name)
			},
			// 核心配置
			series: [
				// 柱形图
				{
					zlevel: 1.5,
					// 柱形图
					type: 'bar',
					// 每個柱子的色值
					itemStyle: {
						normal: {
							color: props.data.colors[index]
						}
					},
					// 根據年份，获取對應數據
					data: props.data.categoryData[item].map((item) => item.value)
				},
				// 散點图
				{
					// 散點（气泡）图
					type: 'effectScatter',
					// 使用地理坐標系
					coordinateSystem: 'geo',
					// 數據
					data: props.data.topData[item],
					// 標記大小
					symbolSize: function (val) {
						return val[2] / 4
					},
					// 绘制完成后顯示特效
					showEffectOn: 'render',
					// 展示涟漪特效
					rippleEffect: {
						brushType: 'stroke'
					},
					// 文字
					label: {
						normal: {
							formatter: '{b}',
							position: 'right',
							show: true
						}
					},
					// 每一项的配置
					itemStyle: {
						normal: {
							color: props.data.colors[index],
							// 阴影配置
							shadowBlur: 5,
							shadowColor: props.data.colors[index]
						}
					},
					zlevel: 1
				}
			]
		})
	})

	mChart.setOption(options)
}
</script>

<style lang="scss" scoped></style>
