import { VNode } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'

export interface IMenuItem {
	key: string;
	name: string;
	id: string;
	children?: menuData;
	[key: string]: any
}

export type menuData = Array<IMenuItem>


export interface IRouterViewSlot {
	Component: VNode;
	route: RouteLocationNormalizedLoaded
}
