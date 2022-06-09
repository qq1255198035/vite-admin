import { defineStore } from 'pinia'
import { menuData } from '@/types/sys'
import { setToken, getToken, removeToken } from '@/utils/cookies'


type userInfoState = {
	menuList: menuData
	token: string
}
export const getUsrInfo = defineStore('userInfo', {
	state: (): userInfoState => ({
		menuList: [],
		token: getToken() || '',
	}),
	actions: {
		getMenuList(state: userInfoState, params: menuData) {
			state.menuList = params
		}
	},
	getters: {}
})
