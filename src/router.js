import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView (view) {
  return () => import(`@/views/${view}.vue`)
}

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/Home/',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/Schedule/',
      name: 'schedule',
      component: loadView('Schedule')
    },
    {
      path: '/TotalResult/',
      name: 'totalResult',
      component: loadView('TotalResult')
    }
  ]
})

export default router