import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="global-header">
          <FullScreenCom />
          <el-divider direction="vertical" />
          <ToggleDark class="mr-2" />
          <el-divider direction="vertical" />
          <User class="ml-2" />
        </div>
      )
    }
  }
})