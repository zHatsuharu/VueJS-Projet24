import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '../views/HomeView.vue';
import GachaViewVue from '../views/GachaView.vue';
import NotFoundViewVue from '../views/NotFoundView.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: HomeViewVue,
		},
		{
			path: '/gacha',
			component: GachaViewVue,
		},
		{
			path: '/:notFound(.*)*',
			component: NotFoundViewVue
		}
	]
});

export default router