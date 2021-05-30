import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
//   },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
//   {
//     path: '/location/new',
//     name: 'Add Location',
//     component: () => import(/* webpackChunkName: "about" */ '../views/AddLocation.vue')
//   },
  // for location serach and view page
  // {
  //   path: '/locations',
  //   name: 'Locations',
  //   component: () => import('../views/Locations.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers
})

export default router