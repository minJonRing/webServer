import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index/index'
import Main from '@/components/main/index'

Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
    {
      path: '/',
      name: 'Index',
      meta:{index:1},
      component: Home
    },
    {
      path:'/app/main',
      name:"main",
      meta:{index:2},
      component:Main
    }
  ]
})
