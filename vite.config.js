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
		open: true,      // 自動打開浏览器
		// 代理配置解決CORS問題
		proxy: {
			'/api/blockchain': {
				target: 'https://e99c-120-239-205-225.ngrok-free.app',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api\/blockchain/, ''),
				configure: (proxy, options) => {
					proxy.on('proxyReq', (proxyReq, req, res) => {
						// 添加ngrok需要的header
						proxyReq.setHeader('ngrok-skip-browser-warning', 'true')
					})
				}
			}
		}
	}
})
