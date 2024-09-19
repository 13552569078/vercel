import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Diff',
      component: () => import('@/views/diff-index/index.vue'),
      meta: {
        title: 'diff',
      },
    },
    {
      path: '/',
      name: 'Draw',
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: '绘制区域',
      },
    },
  ]
})

export default router
