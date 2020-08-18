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
    component: () => import('../views/Singer/Singer.vue')
  },
  {
    path: '/rank',
    component: () => import('../views/Rank/Rank.vue')
  },
  {
    path: '/search',
    component: () => import('../views/Search/Search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
