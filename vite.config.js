import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Vite 配置文件
export default defineConfig({
	plugins: [vue()],
	// 為 ./src 提供別名 @
	resolve: {
		alias: {
			'@': './src'
		}
	},
	// 服務器配置
	server: {
		host: '0.0.0.0', // 允许外部访問
		port: 5173,      // 端口号
		hmr: true,       // 热更新
		open: true       // 自動打開浏览器
	}
})
