import { IMenuItem, menuData } from '@/types/sys'
const isHttpLink = (key: string) => {
  const httpLink = /^https?:\/\//.test(key);
  return httpLink
}

const handleMenuItemClick = (item: IMenuItem) => {
  console.log(item)
  // this.$store.commit('app/updateBreadList', item)
}

const menuItemNode = (item: IMenuItem) => {
  const { key, title, icon } = item;
  const menuItemNode = !isHttpLink(key) ? (
    <>
      {icon && <i class={icon} />}
      <span title={title}>{title}</span>
    </>
  ) : (
    <a href={key} title={title} target="_blank">
      {icon && <i class={icon} />}
      <span>{item.title}</span>
    </a>
  );
  return menuItemNode
}
  
const renderTreeNode = (item: IMenuItem, fun: (arr: menuData) => {}) => {
  let { key, title } = item;
  key = key ?? '';
  if (Array.isArray(item.children)) {
    return (
      <el-sub-menu index={ key } v-slots={{ title: () => <span>{ title }</span>}}>
        {menuItemNode(item)}
        {fun(item.children)}
      </el-sub-menu>
    );
  }
  return (
    <el-menu-item index={!isHttpLink(key) ? key : ''} onClick={() => handleMenuItemClick(item)}>
      {menuItemNode(item)}
    </el-menu-item>
  );
}

export default renderTreeNode