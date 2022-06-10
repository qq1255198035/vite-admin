import { App } from 'vue';
import {on} from '@/utils/handleDom'
export const Vdrag = (app: App<Element>) => {
  app.directive('drag', {
    mounted(el, bindings) {
      console.log(el, bindings)
      on(el, 'mouseup', () => {
        console.log(111)
      })
    }
  })
}

