import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/styles/index.scss'
import 'uno.css'
import directive from './utils/directive'
const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

type Filter = {
  format: <T>(str: T) => string
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Filter
    $loading: {
      show: () => void
      hide: () => void
    }
  }
}

app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `sss-${str}`
  }
}

app.use(pinia)
app.use(router)
app.use(directive)
app.mount('#app')
