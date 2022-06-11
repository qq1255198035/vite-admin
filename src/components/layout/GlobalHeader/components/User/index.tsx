import { systemInfoStore } from '@/store'
const systemInfo = systemInfoStore()
const User = () => {
  return (
    <div class="user-ceter">
      <el-avatar icon="UserFilled" size={30} />
      <el-dropdown v-slots={{
          dropdown: () => (
            <el-dropdown-menu>
              <el-dropdown-item icon="Refresh">清除缓存</el-dropdown-item>
              <el-dropdown-item icon="SwitchButton" onClick={() => systemInfo.loginOut()}>退出</el-dropdown-item>
            </el-dropdown-menu>
          )
        }}>
        <span class="el-dropdown-link">
          wangz
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
          </span>
      </el-dropdown>
    </div>
  )
}

export default User