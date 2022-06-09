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
				path: '/login',
				name: 'login',
				meta: {
					keepAlive: true
				},
				component: () => import('@/view/login')
			}
		]
	}
] as AppRouteRecordRaw[]

export default routes
