import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentication from '../views/Authentication.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Authentication',
    component: Authentication
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import("../views/Home.vue")
  },

  {
    path: '/film/:id',
    name: 'Film',
    component: () => import("../views/Film.vue")
  },
  {
    path: '/favoris',
    name: 'Favoris',
    component: () => import("../views/Favoris.vue")
  },
  {
    path: '/films-à-voir',
    name: 'FilmsVoir',
    component: () => import("../views/FilmsVoir.vue")
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

