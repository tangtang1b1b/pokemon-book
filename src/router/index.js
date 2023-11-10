import { createRouter, createWebHistory } from 'vue-router'
import select from '../views/SelectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'select',
      component: select
    },
    {
      path: '/home/:id?',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    }
  ]
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
