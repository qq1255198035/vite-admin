import { VNode } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
export interface IMenuItem {
  key: string
  title: string
  id: string
  children?: menuData
  [key: string]: any
}

export type menuData = Array<IMenuItem>
export interface IRouterViewSlot {
  Component: VNode
  route: RouteLocationNormalizedLoaded
}

export type userInfoState = {
  menuList: menuData
  token: string
  isCollapse: boolean
  sideWidth: number
  breadList: menuData
  navList: menuData
}
export interface ILoginParams {
  name: string
  password: string
}
