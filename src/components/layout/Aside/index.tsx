import logo from '@/assets/logo.png'
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'Aside',
  setup() {
    const router = useRouter()
    const systemInfo = systemInfoStore()
    const { menuList } = storeToRefs(systemInfo)
    return () => {
      return (
        <div class="aside">
          <div class="main-logo">
            <el-image
              src={logo}
              fit="contain"
              onClick={() => router.push('/home')}
            />
          </div>
          <menu-tree menu={menuList.value}></menu-tree>
        </div>
      )
    }
  }
})
