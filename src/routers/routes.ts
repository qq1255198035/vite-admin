import { RouteItem } from './routes-types'
import { RouteRecordRaw } from 'vue-router'
export type AppRouteRecordRaw = RouteRecordRaw & RouteItem
const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/BasicLayout/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          keepAlive: true
        },
        component: () => import('@/view/home')
      },
      {
        path: '/components',
        name: 'components',
        meta: {
          keepAlive: true
        },
        component: () => import('@/view/components')
      },
      {
        path: '/404',
        name: '404',
        meta: {
          keepAlive: true
        },
        component: () => import('@/view/404')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      keepAlive: true
    },
    component: () => import('@/view/login')
  }
] as AppRouteRecordRaw[]

export const WHITE_LIST = ['login', '404']

export default routes
