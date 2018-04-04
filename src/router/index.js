import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/index/index'
import Main from '@/components/main/index'

Vue.use(Router)


let vueRouter = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Index',
      meta:{index:1},
      component: Home
    },
    {
      path:'/app/main',
      name:"Main",
      meta:{index:2},
      component:Main
      
    }
  ]
})

vueRouter.beforeEach((to,from,next)=>{
  console.log(to)
  console.log(from)
  
  if(to.path == "/app/main"){
    if(localStorage.getItem("xxx") == 1 && localStorage.getItem("token") && (Date.now()-localStorage.getItem("time") <7200000)){
      next()
    }else{
      localStorage.removeItem("token")
      localStorage.removeItem("xxx")
      localStorage.removeItem("time")
      next('/')
    }
  }else if(to.path == "/" && from.path == "/app/main"){
    if(localStorage.getItem("xxx") == 1&& localStorage.getItem("token") && (Date.now()-localStorage.getItem("time") <7200000)){
      next(false)
    }else{
      localStorage.removeItem("token")
      localStorage.removeItem("xxx")
      localStorage.removeItem("time")
      next()
    }
  }else {
    next()
  }
})

export default vueRouter;
