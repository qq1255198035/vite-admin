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
    const route = useRoute();
    const { syncActive, menu } = toRefs(props);
    const selectedKey = ref('')
    watch(
      () => route.path,
      async newPath => {
        console.log(newPath)
        selectedKey.value = newPath
      }
    )
    const wrapProps = reactive({
      props: {
        router: true,
        uniqueOpened: true,
        collapseTransition: false,
        defaultActive: ''
      },
      style: { borderRight: 'none', height: '100%' }
    })

    if (syncActive) {
      wrapProps.props.defaultActive = selectedKey.value;
    }

    return () => {  
      return (
        <div>
          <el-menu { ...wrapProps.props } collapse={ isCollapse.value } style={{...wrapProps.style}}>
            { renderMenuTree(menu.value) }
          </el-menu>
        </div>
      )
    }
  }
})