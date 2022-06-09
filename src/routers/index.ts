import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	console.log(to, from)
	next()
})

export default router
