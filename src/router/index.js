import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/token'

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
  },
  {
    path: '/user_editor',
    component: () => import('@/views/layout/user/UserEdit.vue')
  },
  {
    path: '/chat',
    component: () => import('@/views/chat')
  }

]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  // 有token，不能去登录页
  // 无token, 需要用户"权限"的才需要去登录页
  if (to.path === '/login' && getToken()?.length > 0) {
    // 证明有token-已经登录了
    next(false) // 阻止跳转原地带着
  } else {
    next()
  }
})
