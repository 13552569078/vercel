import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(`/${import.meta.env.PROD_PREFIX}`),
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
      path: '/draw',
      name: 'Draw',
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: '绘制区域',
      },
    },
  ]
})

export default router
