import type { PropType, ExtractPropTypes } from 'vue'

import { menuData } from '@/types/sys'

export const menuProps = {
	menu: {
		type: Array as PropType<menuData>,
		default: () => []
	}
} as const

export type TreeProps = ExtractPropTypes<typeof menuProps>
