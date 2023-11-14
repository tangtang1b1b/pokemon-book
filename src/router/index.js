import { createRouter, createWebHistory } from 'vue-router'
import select from '../views/SelectView.vue'
import home from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'select',
      component: select,
      meta: { transition: '' }
    },
    {
      path: '/home/:id?',
      name: 'home',
      component: home,
      meta: { transition: '' }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from) => {
  const toDepth = to.path.split('/').filter((item) => item.length !== 0).length
  const fromDepth = from.path.split('/').filter((item) => item.length !== 0).length
  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
})

export default router
