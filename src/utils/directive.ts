import { App, createVNode, VNode, render } from 'vue'
import Loading from '@/components/common/Loading'
const Vdrag = (app: App) => {
  app.directive('drag', {
    mounted(el, bindings) {
      let cursorDown = false
      let clientX = 0
      let move = 0
      el.addEventListener(
        'mousedown',
        (e: MouseEvent) => {
          clientX = e.clientX
          e.stopImmediatePropagation()
          cursorDown = true
          window.addEventListener('mousemove', onMouseMove, false)
          window.addEventListener('mouseup', onMouseUp, false)
          document.onselectstart = () => false
        },
        false
      )

      const onMouseMove = (e: MouseEvent) => {
        if (!cursorDown) return
        if (!clientX) return
        move = e.clientX - clientX
        bindings.value(move)
      }

      const onMouseUp = () => {
        cursorDown = false
        window.removeEventListener('mousemove', onMouseMove, false)
        window.removeEventListener('mouseup', onMouseUp, false)
        document.onselectstart = null
      }
    }
  })
}

const globalLoading = (app: App) => {
  const vnode: VNode = createVNode(Loading)
  render(vnode, document.body)
  app.config.globalProperties.$loading = {
    show: vnode.component?.exposed?.show,
    hide: vnode.component?.exposed?.hide
  }
}

export default {
  install: (app: App) => {
    Vdrag(app)
    globalLoading(app)
  }
}
