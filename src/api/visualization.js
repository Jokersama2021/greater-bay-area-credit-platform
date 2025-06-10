import request from '@/utils/request.js'

/**
 * 數據可视化
 */
export const getVisualization = () => {
	return request({
		url: '/visualization'
	})
}
