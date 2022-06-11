import { createRouter, createWebHistory } from 'vue-router'
import { WHITE_LIST } from './routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from './routes'
import { getToken } from '@/utils/cookies';
import { systemInfoStore } from '@/store'
import { storeToRefs } from 'pinia'

const isLogin = () => {
	return (
		getToken() !== 'undefined' &&
		getToken() !== '' &&
		getToken() !== null &&
		getToken() !== undefined
	)
}
		
NProgress.configure({ showSpinner: false })
const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach(async (to, from, next) => {
	const systemInfo = systemInfoStore()
	const { navList, menuList } = storeToRefs(systemInfo)
	if (WHITE_LIST.includes(to.name as string)) {
		next()
	} else {
		if (isLogin()) {
			if (menuList.value?.length) {
				if (navList.value?.length) {
					if (navList.value.some((item) => item.key === to.name)) {
						next()
					} else {
						next('/404')
					}
				} else {
					await systemInfo.setNavList(menuList.value)
					next(to.path)
				}
			} else {
				await systemInfo.setMenuList(getToken() as string)
				next()
			}
		} else {
			next('/login')
		}
	}
	NProgress.start()
})
router.afterEach(() => {
	NProgress.done()
})

export default router
