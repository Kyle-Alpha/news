import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/login/index') },
  { path: '/checkLogin', component: () => import('@/views/login/index') },
  {
    path: '/index',
    component: () => import('@/views/layout/index'),
    children: [
      { path: '/home', component: () => import('@/views/home/index') },
      { path: '/question', component: () => import('@/views/question/index') },
      { path: '/video', component: () => import('@/views/video/index') },
      { path: '/mine', component: () => import('@/views/mine/index') }
    ]
  },
  { path: '/search', component: () => import('@/views/search/index') },
  {
    path: '/result/:art',
    component: () => import('@/views/searchResult/index')
  },
  { path: '/detail/:id', component: () => import('@/views/details/index') }
]
const router = new VueRouter({
  routes
})

export default router
