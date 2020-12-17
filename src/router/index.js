import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes =  [
  {
    path: '/',
    component: () => import('@/views/Login'),
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/General'),
    // children: [
    //   // Dashboard
    //   {
    //     name: 'Dashboard',
    //     path: '',
    //     component: () => import('@/views/Dashboard'),
    //   },
    // ],
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
