import { getPrimaryColor } from '@/utils/cookies'
export default {
  MIN_SIDE_WIDTH: 200,
  MAX_SIDE_WIDTH: 400,
  DEFAULT_PRIMARY_COLOR: getPrimaryColor() || '#409eff'
}
