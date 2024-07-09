import RobotBuilder from '@/build/RobotBuilder.vue';
import HomePage from '@/home/HomePage.vue';
import ProductSearch from '@/search/ProductSearch.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

export default createRouter({
  linkActiveClass: 'active-link',
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/build',
      name: 'Build',
      component: RobotBuilder,
    },
    {
      path: '/search',
      name: 'Search',
      component: ProductSearch,
    },
  ],
});
