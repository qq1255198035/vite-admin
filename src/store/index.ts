import { defineStore } from 'pinia'
import { menuData } from '@/types/sys'
import { setToken, getToken, removeToken, getSideWidth } from '@/utils/cookies'
import config from '@/config'

const { MIN_SIDE_WIDTH } = config
const localWidth: number = getSideWidth()
	? parseInt(getSideWidth() as string)
	: MIN_SIDE_WIDTH

type userInfoState = {
	menuList: menuData
	token: string
	isCollapse: boolean
	sideWidth: number
}
export const systemInfoStore = defineStore('system', {
	state: (): userInfoState => ({
		menuList: [],
		token: getToken() || '',
		isCollapse: false,
		sideWidth: localWidth
	}),
	actions: {
		getMenuList(params: menuData) {
			this.menuList = params
		},
		setCollapse(isCollapse: boolean) {
			this.isCollapse = isCollapse
		},
		setSideWith(num: number) {
			this.sideWidth = num
		},
		loginOut() {
			removeToken()
		},
		loginIn() {
			setToken('')
		}
	},
	getters: {}
})
