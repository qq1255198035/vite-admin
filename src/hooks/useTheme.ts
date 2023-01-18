import { onBeforeMount } from 'vue'
import { getLightColor, getDarkColor } from '@/utils/theme/tool'
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'
/**
 * @description 切换主题
 * */
export const useTheme = () => {
  const systemInfo = systemInfoStore()
  const { isDark, primaryColor } = storeToRefs(systemInfo)

  // 修改主题颜色
  const changePrimary = (val: string) => {
    systemInfo.setPrimaryColor(val)
    // 为了兼容暗黑模式下主题颜色也正常，以下方法计算主题颜色 由深到浅 的具体颜色
    document.documentElement.style.setProperty('--el-color-primary', val)
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value
        ? `${getLightColor(primaryColor.value, 0.2)}`
        : `${getDarkColor(primaryColor.value, 0.3)}`
    )
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        isDark.value
          ? `${getDarkColor(primaryColor.value, i / 10)}`
          : `${getLightColor(primaryColor.value, i / 10)}`
      )
    }
  }

  onBeforeMount(() => {
    changePrimary(primaryColor.value)
  })

  return {
    changePrimary
  }
}
