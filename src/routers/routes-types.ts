
export interface RouteItem {
	path: string
  name: string
	children?: RoutesData
	[key: string]: any
}

export type RoutesData = Array<RouteItem>

