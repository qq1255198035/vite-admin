import '@/assets/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routers'
import '@/assets/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Vdrag from '@/utils/directive'
const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(Vdrag)
app.use(pinia)
app.use(router)
app.mount('#app')
