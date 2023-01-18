import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routers'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'uno.css'
// reset style sheet
import '@/assets/styles/reset.scss'
// CSS common style sheet
import '@/assets/styles/common.scss'
// element dark(内置暗黑模式)
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark(自定义暗黑模式)
import '@/assets/styles/theme/element-dark.scss'
// custom element css
import '@/assets/styles/element.scss'
import globalLoading from '@/components/common/Loading'
import directives from '@/directives/index'
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
app.use(globalLoading)
app.use(directives)
app.mount('#app')
