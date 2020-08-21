import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('../views/Recommend/Recommend.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../views/Detail/Detail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/singer',
    component: () => import('../views/Singer/Singer.vue'),

    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../views/Detail/Detail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/rank',
    component: () => import('../views/Rank/Rank.vue'),
    children: [
      {
        path: 'detail/:id/:type',
        component: () => import('../views/Detail/Detail.vue'),
        props: true
      }
    ]
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search.vue')
  },
  {
    path: '/account',
    component: () => import('../views/Account/Account.vue')
  }
]

const router = new VueRouter({
  // 使用预渲染，路由模式必须为history
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
