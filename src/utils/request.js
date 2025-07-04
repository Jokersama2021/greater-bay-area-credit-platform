import axios from 'axios'

const service = axios.create({
	baseURL: process.env.NODE_ENV === 'production'
		? 'http://47.107.114.234:3100/api'  // 修改為 3100
		: 'http://localhost:3100/api',       // 修改為 3100
	timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		config.headers.icode = 'input you icode'
		return config // 必须返回配置
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响應拦截器
service.interceptors.response.use((response) => {
	const { success, message, data } = response.data
	//   要根據success的成功与否決定下面的操作
	if (success) {
		return data
	} else {
		return Promise.reject(new Error(message))
	}
})

export default service
