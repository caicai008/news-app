import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),

    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/home')
      },
      {
        path: 'user',
        component: () => import('@/views/layout/user')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
