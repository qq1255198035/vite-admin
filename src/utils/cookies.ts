const TokenKey = 'access_token'
const SideWidth = 'side_width'
const BreadList = 'bread_list'
const MenuList = 'menu_list'

export const getToken = () => sessionStorage.getItem(TokenKey)
export const setToken = (token: string) =>
  sessionStorage.setItem(TokenKey, token)
export const removeToken = () => sessionStorage.removeItem(TokenKey)

export const getSideWidth = () => sessionStorage.getItem(SideWidth)
export const setSideWidth = (width: string) =>
  sessionStorage.setItem(SideWidth, width)
export const removeSideWidth = () => sessionStorage.removeItem(SideWidth)

export const getBreadList = () => sessionStorage.getItem(BreadList)
export const setBreadList = (breadList: string) =>
  sessionStorage.setItem(BreadList, breadList)
export const removeBreadList = () => sessionStorage.removeItem(BreadList)

export const getMenuList = () => sessionStorage.getItem(MenuList)
export const setMenuList = (breadList: string) =>
  sessionStorage.setItem(MenuList, breadList)
export const removeMenuList = () => sessionStorage.removeItem(MenuList)
