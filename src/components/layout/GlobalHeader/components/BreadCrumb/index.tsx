import { menuData, IMenuItem } from '@/types/sys'
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'

const renderBreadItem = (list: menuData, fun: (e: MouseEvent, item: IMenuItem) => {}) => {
  return list.map((item, index) => {
    return (
      <el-breadcrumb-item 
        key={item.key}
        to={{ path: item.key }} 
      >
        <span class="breadcrumb-span">
          {item.title}
          {index > 0 ? (<el-icon class="ml-2" size={12} onClick={(e: MouseEvent) => fun(e, item)}><Close /></el-icon>) : ''}
        </span>
      </el-breadcrumb-item>
    )
  })
}

export default defineComponent({
  setup() {
    const systemInfo = systemInfoStore()
    const { breadList } = storeToRefs(systemInfo)

    const handleCloseClick = (e: MouseEvent, item: IMenuItem):any => {
      e.stopPropagation()
      systemInfo.reduceBreadList(item)
    }

    return () => {
      return (
        <div class="breadcrumb-box">
          <el-breadcrumb separator="/">
            {renderBreadItem(breadList.value, handleCloseClick)}
          </el-breadcrumb>
        </div>
      )
    }
  }
})

