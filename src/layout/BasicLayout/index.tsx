import { Transition, KeepAlive, createVNode } from 'vue'
import { IRouterViewSlot } from '@/types/sys'
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
import './index.scss'

export default defineComponent({
  name: 'Layout',
  setup() {
    const systemInfo = systemInfoStore()
    const { isCollapse, sideWidth } = storeToRefs(systemInfo)
    const keepAliveList: any = reactive([])
    const route = useRoute()
    const num = ref(0)

    watch(
      () => route,
      newVal => {
        if (newVal.meta.keepAlive && !keepAliveList.includes(newVal.name)) {
          keepAliveList.push(newVal.name)
        }
      },
      { deep: true, immediate: true }
    )
    const onDrag = (val: number) => {
      num.value = val
    }
    return () => {
      return (
        <div class="common-layout">
          <el-container>
            <el-aside
              width={isCollapse.value ? '64px' : sideWidth.value + 'px'}
            >
              <Aside v-drag={(val: number) => onDrag(val)} />
              <DragBar />
            </el-aside>
            <el-container>
              <el-header>
                <GlobalHeader />
                {num.value}
              </el-header>
              <el-main>
                <router-view>
                  {{
                    default: ({ Component }: IRouterViewSlot) => {
                      return (
                        <Transition name="fade-slide" mode="out-in" appear>
                          <KeepAlive include={keepAliveList}>
                            {createVNode(Component)}
                          </KeepAlive>
                        </Transition>
                      )
                    }
                  }}
                </router-view>
              </el-main>
              <el-footer>
                <GlobalFooter />
              </el-footer>
            </el-container>
          </el-container>
        </div>
      )
    }
  }
})
