import { useFullscreen } from '@vueuse/core'
const { toggle } = useFullscreen()

const FullScreenCom = () => {
  return (
    <div class="full-screen">
      <el-icon size={18} onClick={() => toggle()}>
        <FullScreen />
      </el-icon>
    </div>
  )
}

export default FullScreenCom
