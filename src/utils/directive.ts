import { App } from 'vue'
const Vdrag = (app: App<Element>) => {
  app.directive('drag', {
    mounted(el, bindings) {
      let cursorDown = false
      let clientX = 0
      let move = 0
      const numArr: number[] = []
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
export default {
  install: (app: App<Element>) => {
    Vdrag(app)
  }
}
