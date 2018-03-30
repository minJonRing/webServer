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
  
  // if(to.path == "/app/main"){
  //   console.log(vueRouter.app.$store)
  //   console.log(vueRouter.app)
  //   if(vueRouter.app.$store && vueRouter.app.$store.state.userId && (Date.now()-localStorage.getItem("time") <7200000)){
  //     console.log(2)
  //     next()
  //   }else{
  //     next('/')
  //   }
  // }else if(to.name == "Index" && from.name == "Main"){
  //   if(vueRouter.app.$store && !vueRouter.app.$store.state.userId){
  //     next()
  //   }else{
  //     next(false)
  //   }
  // }else {
  //   console.log(3)
  //   next()
  // }
  next()

})

export default vueRouter;
