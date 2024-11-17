import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/MyView/LoginView.vue')
  },
  {
    path: '/rootpage',
    name: 'rootpage',
    component: () => import('../views/MyView/RootPage.vue'),
    redirect: '/rootpage/user',
    children: [
      {
        path: '/rootpage/user',
        name: 'user',
        component: () => import('@/views/MyView/UserView.vue')
      },
      {
        path: '/rootpage/assetc',
        name: 'assetc',
        component: () => import('@/views/MyView/AssetcView.vue'),
        redirect: '/rootpage/assetc/image',
        children: [
          {
            path: '/rootpage/assetc/image',
            name: 'image',
            component: () => import('@/views/MyView/ImageView.vue')
          },
          {
            path: '/rootpage/assetc/soft',
            name: 'soft',
            component: () => import('@/views/MyView/SoftView.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404View.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
