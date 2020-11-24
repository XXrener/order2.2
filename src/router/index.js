import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/start.vue'
import Cart from '../views/cart.vue'
import Remarks from '../views/change/remarks.vue'
import Order from '../views/change/order.vue'
import Message from "../components/message/message.vue"
Vue.use(VueRouter)

const routes = [
 
  {
    path:'/',
    redirect:'/Start'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/Start',
    name:'Start',
    component:Start
  },
  {
    path:'/Cart',
    name:'Cart',
    component:Cart
  },
  {
    path:'/Remarks',
    name:"Remarks",
    component:Remarks
  },
  {
    path:'/Order',
    name:"Order",
    component:Order
  },
  {
    path: '/About',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:"/Message",
    name:"Message",
    component:Message
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
