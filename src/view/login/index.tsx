import { systemInfoStore } from '@/store'
import './index.scss'
export default defineComponent({
  name: 'login',
  setup() {
    const systemInfo = systemInfoStore()
    const form = reactive({
      name: '',
      password: ''
    })
    const onSubmit = () => {
      systemInfo.loginIn(form)
    }
    return () => {
      return (
        <div class="login-box">
          <div class="login-form">
            <el-form model={form}>
              <el-form-item label="账号">
                <el-input v-model={form.name} />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model={form.password} />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" onClick={() => onSubmit()}>登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      )
    }
  }
})