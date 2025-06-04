import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite 配置文件
export default defineConfig({
	plugins: [vue()],
	// 为 ./src 提供别名 @
	resolve: {
		alias: {
			'@': './src'
		}
	},
	// 服务器配置
	server: {
		host: '0.0.0.0', // 允许外部访问
		port: 5173,      // 端口号
		hmr: true,       // 热更新
		open: true       // 自动打开浏览器
	}
})
