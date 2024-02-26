import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/gacha',
			component: () => import('../views/GachaView.vue'),
		},
		{
			path: '/card/:cardId',
			component: () => import('../views/CardView.vue'),
		},
		{
			path: '/:notFound(.*)*',
			component: () => import('../views/NotFoundView.vue'),
		}
	]
});

export default router