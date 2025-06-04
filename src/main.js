import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/fonts/fonts.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
