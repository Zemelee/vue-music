import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '../views/Default.vue'
import store from '@/store/index.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    name: 'home',
    component: () => import('@/components/Home.vue')
  },
  {
    path: '/default/home',
    name: 'home',
    component: () => import('@/components/Home.vue')
  },
  {
    path: '/default/userinfo',
    name: 'userinfo',
    //独享守卫
    beforeEnter(to, from, next) {
      if (store.state.token || store.state.isLogin || localStorage.getItem('netEase')) {
        next()
      } else {
        next('/default/login')
      }
    },
    component: () => import('@/components/user/UserInfo.vue'),
    children: [
      {
        path: '/default/userinfo/userEvent',
        name: 'userevent',
        component: () => import('@/components/user/UserEvent.vue'),
      },
      {
        path: '/default/userinfo/followeds',
        name: 'followeds',
        component: () => import('@/components/user/Followeds.vue'),
      },
    ]

  },
  {
    path: '/default/usersinfo',
    name: 'usersinfo',
    component: () => import('@/components/user/others/UsersInfo.vue'),
    children: [
      {
        path: '/default/usersinfo/userEvent',
        component: () => import('@/components/user/UserEvent.vue'),
      },
      {
        path: '/default/usersinfo/followeds',
        component: () => import('@/components/user/others/Followeds.vue'),
      },
    ]
  },

  {
    path: '/default/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/default/setting',
    name: 'setting',
    component: () => import('@/components/Setting.vue')
  },
  {
    path: '/recommendmore/',
    name: 'recommendmore',
    component: () => import('@/components/recommend/RecommendMore.vue')
  },
  {
    path: '/recommenddetails/',
    name: 'recommenddetails',
    component: () => import('@/components/recommend/RecommendDetails.vue')
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import('@/components/singer/Singer.vue')
  },
  {
    path: '/singermore',
    name: 'singermore',
    component: () => import('@/components/singer/SingerMore.vue')
  },
  {
    path: '/default/searchresult',
    name: 'searchresult',
    component: () => import('@/views/SearchResult.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
