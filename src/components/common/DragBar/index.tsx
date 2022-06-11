import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
import { on, off } from '@/utils/handleDom'
import config from '@/config'
import { setSideWidth } from '@/utils/cookies'

const { MAX_SIDE_WIDTH, MIN_SIDE_WIDTH } = config

export default defineComponent({
  name: 'DragBar',
  setup(props, { attrs }) {
    const systemInfo = systemInfoStore()
    const { sideWidth, isCollapse } = storeToRefs(systemInfo)

    let clientX = ref(0)
    let cursorDown = ref(false)
    let localWidth = ref(sideWidth.value)

    const onMouseDown = (e: MouseEvent) => {
      if (e.ctrlKey || e.button === 2) {
        return
      }

      if (isCollapse.value) {
        return
      }

      clientX.value = e.clientX
      e.stopImmediatePropagation()
      cursorDown.value = true
      on(window, 'mousemove', onMouseMove as EventListener)
      on(window, 'mouseup', onMouseUp)
      document.onselectstart = () => false
    }

    const onMouseUp = () => {
      cursorDown.value = false
      localWidth.value = sideWidth.value
      setSideWidth(sideWidth.value.toString())
      off(window, 'mousemove', onMouseMove as EventListener);
      off(window, 'mouseup', onMouseUp)
      document.onselectstart = null
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isCollapse.value) {
        return;
      }

      if (!cursorDown.value) return
      if (!clientX.value) return

      const moved = localWidth.value + (e.clientX - clientX.value)

      if (moved > MAX_SIDE_WIDTH) {
        systemInfo.setSideWidth(MAX_SIDE_WIDTH)
      } else if (moved < MIN_SIDE_WIDTH) {
        systemInfo.setSideWidth(MIN_SIDE_WIDTH)
      } else {
        systemInfo.setSideWidth(moved)
      }
    }

    return () => <div class="side-drag-bar" {...attrs} onMousedown={(e) => onMouseDown(e)}></div>
  }
})

    



