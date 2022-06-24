import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'Collapse',
  setup() {
    const systemInfo = systemInfoStore()
    const { isCollapse } = storeToRefs(systemInfo)

    const handleCollpsed = () => {
      const collapse = !isCollapse.value
      systemInfo.setCollapse(collapse)
    }

    return () => {
      return (
        <el-icon
          size={22}
          onClick={() => handleCollpsed()}
          style={{ cursor: 'pointer' }}
        >
          {isCollapse.value ? <Expand /> : <Fold />}
        </el-icon>
      )
    }
  }
})
