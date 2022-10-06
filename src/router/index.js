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
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/search/:keywords', // 动态路由
    component: () => import('@/views/search/SearchResult.vue')
  },
  {
    path: '/detail', // 动态路由
    component: () => import('@/views/detail/ArticleDetail.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
