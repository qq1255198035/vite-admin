import { defineStore } from 'pinia'
import { menuData, IMenuItem } from '@/types/sys'
import {
	setToken,
	getToken,
	removeToken,
	getSideWidth,
	getBreadList,
	setBreadList,
	removeBreadList,
	setSideWidth,
	removeSideWidth,
	setMenuList,
	getMenuList as getMenuListFromcoocikes,
	removeMenuList
} from '@/utils/cookies'
import config from '@/config'
import router from '@/routers'
import { userInfoState, ILoginParams } from '@/types/sys'
import { loginIn, getMenuList } from '@/api/common'

const { MIN_SIDE_WIDTH } = config

const transfromArr = (list: menuData): any => {
	return list.reduce((prev, next) => {
		return prev.concat(
			Array.isArray(next.children) ? transfromArr(next.children) : next
		)
	}, [])
}

export const systemInfoStore = defineStore('system', {
	state: (): userInfoState => ({
		menuList: JSON.parse(getMenuListFromcoocikes() as string),
		navList: [],
		breadList: JSON.parse(getBreadList() as string),
		token: getToken() || '',
		isCollapse: false,
		sideWidth: parseInt(getSideWidth() as string)
	}),
	actions: {
		setNavList(list: menuData) {		
			this.navList = transfromArr(list)
			this.breadList = [this.navList[0]]
			setBreadList(JSON.stringify([this.breadList]))
		},
		async setMenuList(token: string) {
			const { statusCode, data } = await getMenuList(token)
			if (statusCode === 200) {
				this.menuList = data
				setMenuList(JSON.stringify(this.menuList))
				this.setNavList(this.menuList)
			}
		},
		setCollapse(isCollapse: boolean) {
			this.isCollapse = isCollapse
		},
		setSideWidth(num: number) {
			this.sideWidth = num
		},
		loginOut() {
			removeToken()
			removeBreadList()
			removeSideWidth()
			removeMenuList()
			router.replace('/login')
		},
		async loginIn(params: ILoginParams) {
			const { statusCode, data } = await loginIn(params)
			if (statusCode === 200) {
				await this.setMenuList(data)
				this.token = data
				setSideWidth(MIN_SIDE_WIDTH.toString())
				setToken(data)
				router.push('/home')
			}
		},
		updateBreadList(item: IMenuItem) {
			const index = this.breadList.findIndex((a) => a.key === item.key)
			if (index === -1) {
				this.breadList.push(item)
				setBreadList(JSON.stringify(this.breadList))
			}
		},
		reduceBreadList(item: IMenuItem) {
			const index = this.breadList.findIndex((a) => a.key === item.key)
			this.breadList.splice(index, 1)
			setBreadList(JSON.stringify(this.breadList))
			if (item.key === router.currentRoute.value.name) {
				router.replace(this.breadList[index - 1].key)
			}
		}
	},
	getters: {}
})
