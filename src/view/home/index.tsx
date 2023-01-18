import { ComponentInternalInstance } from 'vue'
import { useTheme } from '@/hooks/useTheme'
const { changePrimary } = useTheme()
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
      changePrimary('#18BAAC')
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
          <el-button v-copy="复制">复制</el-button>
        </div>
      )
    }
  }
})
