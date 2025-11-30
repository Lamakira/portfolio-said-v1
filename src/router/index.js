import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import DataProjectDetail from '../views/DataProjectDetail.vue';

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
    {
      path: '/data/:slug',
      name: 'data-project',
      component: DataProjectDetail,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Don't auto-scroll if coming from a project page with 'from' parameter
    // This allows BackButton component to handle the scroll
    if (from.name === 'project-detail' || from.name === 'data-project') {
      if (from.query.from) {
        // Let BackButton handle the scroll
        return false;
      }
    }
    
    // Always scroll to top for project detail pages
    if (to.name === 'project-detail' || to.name === 'data-project') {
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
