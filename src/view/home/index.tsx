import { ComponentInternalInstance } from 'vue'
import { useCssVar } from '@vueuse/core'
export default defineComponent({
  name: 'Home',
  setup() {
    let str = ref<string>('aa')
    const { appContext } = getCurrentInstance() as ComponentInternalInstance

    const showLoading = () => {
      appContext.config.globalProperties.$loading.show()
      setTimeout(() => {
        appContext.config.globalProperties.$loading.hide()
      }, 1000)
    }

    const changeColor = () => {
      const el = ref(null)
      const color = useCssVar('--el-color-primary', el)
      color.value = 'green'
    }

    return () => {
      return (
        <div>
          <div>
            {appContext.config.globalProperties.$filters.format(str.value)}
          </div>
          <el-button type="primary" onClick={() => showLoading()}>
            loading
          </el-button>
          <el-button type="primary" onClick={() => changeColor()}>
            changeColor
          </el-button>
        </div>
      )
    }
  }
})
