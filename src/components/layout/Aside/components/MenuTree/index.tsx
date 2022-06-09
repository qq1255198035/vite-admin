import { defineComponent, toRefs, ref, watch, reactive } from 'vue'
import {useRoute} from 'vue-router';
import { menuProps, TreeProps } from './menutree-type'
import renderMenuTree from './renderMenuTree'
export default defineComponent({
  name: 'MenuTree',
  props: menuProps,
  setup(props: TreeProps, context) {
    const route = useRoute();
    const { collapsed, syncActive, menu } = toRefs(props);
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
        collapse: collapsed,
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
          <el-menu {...wrapProps.props} style={{...wrapProps.style}}>
            { renderMenuTree(menu.value) }
          </el-menu>
        </div>
      )
    }
  }
})