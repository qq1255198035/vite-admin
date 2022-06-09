import { menuData } from '@/types/sys';
import renderTreeNode from './renderTreeNode'

const renderMenuTree = (props: menuData) => {
  return props.filter(x => !x.hide).map(item => renderTreeNode(item, renderMenuTree));
}

export default renderMenuTree