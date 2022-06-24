import { menuProps, TreeProps } from './menutree-type'
import renderMenuTree from './renderMenuTree'
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
export default defineComponent({
  name: 'MenuTree',
  props: menuProps,
  setup(props: TreeProps) {
    const systemInfo = systemInfoStore()
    const { isCollapse } = storeToRefs(systemInfo)
    const route = useRoute()
    const { menu } = toRefs(props)

    const wrapProps = reactive({
      props: {
        router: true,
        uniqueOpened: true,
        collapseTransition: false,
        defaultActive: route.name
      },
      style: { borderRight: 'none', height: '100%' }
    })

    return () => {
      return (
        <div>
          <el-menu
            {...wrapProps.props}
            collapse={isCollapse.value}
            style={{ ...wrapProps.style }}
          >
            {renderMenuTree(menu.value)}
          </el-menu>
        </div>
      )
    }
  }
})
