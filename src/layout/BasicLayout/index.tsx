import { Transition, KeepAlive, createVNode } from 'vue'

import { IRouterViewSlot } from '@/types/sys'
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
import './index.scss'

export default defineComponent({
  name: 'layout',
  setup() {
    const systemInfo = systemInfoStore()
    const { isCollapse, sideWidth } = storeToRefs(systemInfo)
    let keepAliveList: any = reactive([])
    const route = useRoute()

    watch(
      () => route, (newVal) => {
        if(newVal.meta.keepAlive && !keepAliveList.includes(newVal.name)){
          keepAliveList.push(newVal.name)
        }
      }, { deep: true, immediate: true  }
    )

    return () => {
      return (
        <div class="common-layout">
          <el-container>
            <el-aside width={isCollapse.value ? '64px' : sideWidth.value + 'px'}>
              <Aside />
              <DragBar v-drag={sideWidth.value} />
            </el-aside>
            <el-container>
              <el-header>
                <GlobalHeader />
              </el-header>
              <el-main>
                <router-view>
                  {{
                    default: ({ Component }: IRouterViewSlot) => {
                      return (
                        <Transition name="fade-slide" mode="out-in" appear>
                          <KeepAlive include={keepAliveList}>
                            { createVNode(Component) }
                          </KeepAlive>
                        </Transition>
                      )
                  }}}
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