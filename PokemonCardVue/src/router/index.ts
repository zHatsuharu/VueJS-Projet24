import { createRouter, createWebHistory } from 'vue-router'
import HomeViewVue from '../views/HomeView.vue';
import GachaViewVue from '../views/GachaView.vue';
import NotFoundViewVue from '../views/NotFoundView.vue';
import CardViewVue from '../views/CardView.vue';

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
			path: '/card/:cardId',
			component: CardViewVue,
		},
		{
			path: '/:notFound(.*)*',
			component: NotFoundViewVue
		}
	]
});

export default router