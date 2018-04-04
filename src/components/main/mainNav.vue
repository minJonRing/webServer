<template>
  <div class="main-nav">
      <ul class="admin-one-ul">
        <li class="admin-one-li" v-for="(item,index) in nav" :key="index">
            <a class="admin-one-a" :class="{navActive:navIndex == index}" href="javascript:"  @click.stop ="onShow($event,index)">
                <i :class="['iconfont1','iconfont',item.icon]"></i>
                <span>{{item.txt}}</span>
                <i class="iconfont icon-xiangyou"></i>
            </a>
            <ul class="admin-tow-ul" v-if="item.child" :class="{'show-ul':navIndex == index}">
                <li class="admin-tow-li" v-for="(el,i) in item.child" :key="i">
                    <a class="admin-tow-a" :class="{navChildActive:`${index}-${i}` == `${navIndex}-${navChildIndex}`}" href="javascript:" @click="select($event,i)" :data-select="`${index}-${i}`">{{el.txt}}</a>
                </li>
            </ul>
        </li>
    </ul>
  </div>
</template>
<script>
    export default {
        name:"main-nav",
        props:{
            nav:Array
        },
        data(){
            return {
                navIndex:0,
                navChildIndex:0,
                concatIndex:'0-0'
            }
        },
        mounted(){
        },
        watch:{
            "concatIndex":function(val){
                this.$emit('changenav',val)
            }
        },
        methods:{
            onShow(event,val){
                this.navIndex =val; 
                this.navChildIndex = 0;
                this.concatIndex = `${val}-0`;
            },
            select(event,val){
                this.navChildIndex = val;
                let i = event.target.dataset.select;
                this.concatIndex = '3-0';
                setTimeout(()=>{
                    this.concatIndex = i;
                },1)
            }
        }
    }
</script>

<style scoped>



/* main-left */

.admin-one-li {
    border-bottom: 1px #e8e8e8 solid;
}
.admin-one-li:last-child {
    border: none;
}
.admin-one-a {
    display: flex;
    align-content: center;
    width: 100%;
    line-height: 60px;
    padding-left: 30px;
    font-size: 16px;
    color: #333;
}
.admin-one-a > span {
    padding-left: 12px;
}

.admin-one-a > span + i {
    flex-grow: 1;
    text-align: right;
    padding-right: 12px;
    transition-duration: 600ms;
    opacity: 0;
    transform: translateX(-20px);
}

.navActive .iconfont1,
.navChildActive {
    color: #6699ff !important;
}

.navActive span + i {
    opacity: 1;
    transform: translateX(0)
}

/**二级导航*/
.admin-tow-ul {
    opacity: 0;
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
.show-ul {
    opacity: 1;
    height: auto;
    padding-bottom: 20px;
}
</style>

