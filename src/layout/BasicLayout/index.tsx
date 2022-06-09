import { defineComponent, reactive, watch, Transition, KeepAlive, createVNode } from 'vue'
import { useRoute } from 'vue-router'
import { IRouterViewSlot } from '@/types/sys'
import './index.scss'
export default defineComponent({
  name: 'layout',
  setup() {
    let keepAliveList: any = reactive([])
    const route = useRoute()
    watch(
      () => route, (newVal) => {
        if(newVal.meta.keepAlive && !keepAliveList.includes(newVal.name)){
          keepAliveList.push(newVal.name)
        }
      }, { deep: true, immediate: true  }
    ) // 开启深度监听
    return () => {
      return (
        <div class="common-layout">
          <el-container>
            <el-aside width="200px">
              <Aside />
            </el-aside>
            <el-container>
              <el-header>
                <GlobalHeader />
              </el-header>
              <el-main>
                {/* <Transition name="fade-slide" mode="out-in">
                  <KeepAlive include={keepAliveList}>
                    <router-view></router-view>
                  </KeepAlive>
                </Transition> */}
                
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