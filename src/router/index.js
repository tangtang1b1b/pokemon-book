import { createRouter, createWebHistory } from 'vue-router'
import select from '../views/SelectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'select',
      component: select,
      meta: { transtion: '' }
    },
    {
      path: '/home/:id?',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { transtion: '' }
    }
  ]
})

router.beforeEach((to, from) => {
  const toDepth = to.path.split('/').filter((item) => item.length !== 0).length
  const fromDepth = from.path.split('/').filter((item) => item.length !== 0).length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
