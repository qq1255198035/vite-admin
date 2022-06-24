export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="global-header">
          <div>
            <Collapse />
            <BreadCrumb class="ml-2" />
          </div>
          <div>
            <FullScreenCom />
            <el-divider direction="vertical" />
            <ToggleDark class="mr-2" />
            <el-divider direction="vertical" />
            <User class="ml-2" />
          </div>
        </div>
      )
    }
  }
})
