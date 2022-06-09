import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo.png'
import { getMenuList } from '@/api/common'
export default defineComponent({
  name: 'Aside', 
  setup() {
    const router = useRouter()
    let menuList = ref([]) 
    const handleGetMenulist = async () => {
      const { data, statusCode } = await getMenuList()
      if (statusCode === 200) {
        menuList.value = data
      }
    }
    onMounted(async () => {
      await handleGetMenulist()
    })
    return () => {
      return (
        <div class="aside">
          <div class="main-logo">
            <el-image style="height: 45px" src={logo} fit="contain" onClick={() => router.push('/home')}/>
          </div>
          <menu-tree menu={menuList.value}></menu-tree>
        </div>
      )
    }
  }
})