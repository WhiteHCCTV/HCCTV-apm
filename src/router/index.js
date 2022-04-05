import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/home', name: 'Home', component: Home,
   children: [
      { path: 'dashboard', name: 'Dashboard', component: Dashboard },
    ]
  },
  { path: '/', name: 'Index', component: Index },
]

const router = new VueRouter({
  routes
})

export default router
