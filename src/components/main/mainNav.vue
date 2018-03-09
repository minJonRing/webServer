<template>
  <div class="main-nav">
      <ul class="admin-one-ul">
        <li class="admin-one-li" v-for="(item,index) in nav" :key="index">
            <a class="admin-one-a" href="javascript:"  @click.stop ="onShow($event,index)">
                <i></i>
                <span>{{item.txt}}</span>
                <i></i>
            </a>
            <ul class="admin-tow-ul" v-if="item.child && index == isShowNav" :style="{'height':item.childHeight+'px'}">
                <li class="admin-tow-li" v-for="(el,i) in item.child" :key="i">
                    <a class="admin-tow-a" href="javascript:">{{el.txt}}</a>
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>
<script>
    export default {
        name:"main-nav",
        data(){
            return {
                nav:[
                    {txt:"推广渠道管理",child:[{txt:"渠道组管理"},{txt:"渠道媒介管理"},{txt:"推广资源管理"}],childHeight:39*3},
                    {txt:"固定渠道",child:[{txt:"渠道组管理"},{txt:"推广资源管理"}],childHeight:39*2},
                    {txt:"推广单页面管理"},
                    {txt:"推广统计分析"}
                ],
                isShowNav:-1,
                animateH:[
                    {h1:0},
                    {h2:0},
                    {h3:0},
                    {h4:0}
                ]
            }
        },
        mounted(){
        },
        methods:{
            onShow(event,val){
                this.isShowNav = val
            }
        }
    }
</script>

<style scoped>



/* main-left */

.admin-one-li {
    border-bottom: 1px #e8e8e8 solid;
}

.admin-one-a {
    display: block;
    width: 100%;
    line-height: 60px;
    padding-left: 30px;
    font-size: 16px;
    color: #333;
}

.admin-tow-ul {
    padding-bottom: 20px;
    height: 0;
    overflow: hidden;
    transition-duration: 600ms;
}

.admin-tow-a {
    display: block;
    font-size: 14px;
    color: #999;
    padding: 10px 0;
    padding-left: 75px;
}
</style>

