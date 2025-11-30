import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import ProjectDetail from '../views/ProjectDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/project/:slug',
      name: 'project-detail',
      component: ProjectDetail,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to top for project detail pages
    if (to.name === 'project-detail') {
      return { top: 0, behavior: 'instant' };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router
