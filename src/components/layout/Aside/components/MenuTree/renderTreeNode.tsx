import { IMenuItem, menuData } from '@/types/sys'
import { systemInfoStore } from '@/store'

const isHttpLink = (key: string) => {
  const httpLink = /^https?:\/\//.test(key)
  return httpLink
}

const systemInfo = systemInfoStore()

const handleMenuItemClick = (item: IMenuItem) => {
  console.log(item)
  systemInfo.updateBreadList(item)
}

const menuItemNode = (item: IMenuItem) => {
  const { key, title, icon } = item
  const menuItemNode = !isHttpLink(key) ? (
    <>
      {icon && <el-icon>{h(resolveComponent(icon))}</el-icon>}
      <span title={title}>{title}</span>
    </>
  ) : (
    <a href={key} title={title} target="_blank">
      {icon && `<el-icon><${icon} /></el-icon>`}
      <span>{item.title}</span>
    </a>
  )
  return menuItemNode
}

const renderTreeNode = (
  item: IMenuItem,
  fun: (arr: menuData) => Record<string, unknown>
) => {
  const { title, icon } = item
  let { key } = item
  key = key ?? ''
  if (Array.isArray(item.children)) {
    return (
      <el-sub-menu
        index={key}
        v-slots={{
          title: () => (
            <>
              {icon && <el-icon>{h(resolveComponent(icon))}</el-icon>}
              <span>{title}</span>
            </>
          )
        }}
      >
        {fun(item.children)}
      </el-sub-menu>
    )
  }
  return (
    <el-menu-item
      index={!isHttpLink(key) ? key : ''}
      onClick={() => handleMenuItemClick(item)}
    >
      {menuItemNode(item)}
    </el-menu-item>
  )
}

export default renderTreeNode
