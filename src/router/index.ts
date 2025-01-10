import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: import('@/views/Home.vue')
  },
  {
    path: '/tools',
    name: 'tools',
    component: import('@/views/Tools.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: import('@/views/Settings.vue'),
    children:[
      {
        path: '/setCookie',
        name: 'setCookie',
        component: import('@/views/settings/SetCookie.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
