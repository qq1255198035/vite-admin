import { useDark, useToggle } from '@vueuse/core'
import { defineComponent } from 'vue'
const isDark = useDark()
const changeTheme = useToggle(isDark)
export default defineComponent({
  setup() {
    let theme = ref('sunny')
    const handleToggle = (val: string) => {
      theme.value = val
      changeTheme()
    }
    return () => {
      return (
        <el-switch
          model-value= {theme.value}
          class="ml-2"
          inline-prompt
          active-icon="Moon"
          inactive-icon="Sunny"
          active-value="sunny"
          inactive-value="moon"
          onChange={(val: string) => handleToggle(val)}
        />
      )
    }
  }
})



