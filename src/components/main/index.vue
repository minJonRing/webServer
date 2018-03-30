<template>
    <div class="admin">
        <div class="admin-head flex flex-mid flex-center-3">
            <img class="admin-logo" src="../../assets/logo.png" alt="">
            <div class="admin-user flex flex-mid flex-center-3">
                <div class="admin-user-box flex flex-mid" @click.stop="showUserEdit">
                    <div class="admin-user-img">
                        <img class="block w100" src="./images/user.jpeg" alt="">
                    </div>
                    <div class="admin-user-info">
                        <span>admin</span>
                        <i>：超级管理员</i>
                        <i class="iconfont icon-zheng-triangle" :class="{'admin-user-edit-icon':isUserEditIcon}"></i>
                    </div>
                    <div class="admin-user-edit" :class="{'admin-user-edit-show':isUserEditIcon}">
                        <ul>
                            <li><a href="javascript:">修改密码</a></li>
                            <li><a href="javascript:">修改密码</a></li>
                            <li><a href="javascript:">修改密码</a></li>
                            <li><a href="javascript:">修改密码</a></li>
                        </ul>
                    </div>
                </div>
                <div class="admin-user-logout">
                    <a href="javascript:">
                        <img src="./images/logout.png" alt="">
                        <span>退出</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="admin-main">
            <div class="admin-main-left">
                <main-nav @changenav="navI" :nav="nav"></main-nav>
            </div>
            <div class="admin-main-right">
                <div class="admin-main-right-title flex flex-mid">
                    <h2 :class="{'color9':isView2}">{{nav[view1].txt}}</h2>
                    <i class="iconfont icon-xiangyou"></i>
                    <h2 v-if="isView2">{{nav[view1].child[view2].txt}}</h2>
                </div>
                <div class="admin-main-right-box">
                    <!-- <ditch v-if="view1 == 0 && view2 == 0" :showView = "nav[selectView[0]].view[selectView[1]]"></ditch> -->
                    <!-- 1 -->
                    <!-- <popu-resource v-if="view1 == 0 && view2 == 2" :showView = "nav[selectView[0]].view[selectView[1]]"></popu-resource> -->
                    <lively-resource v-if="view1 == 0 && view2 == 0"></lively-resource>
                    <resource-details v-if="view1 == 0 && view2 == 1"></resource-details>
                    <affair-analyze v-if="view1 == 0 && view2 == 2"></affair-analyze>
                    <!-- 2 -->
                    <ditchs-box v-if="view1 == 1 && view2 == 0"></ditchs-box>
                    <ditch-medium-box v-if="view1 == 1 && view2 == 1"></ditch-medium-box>
                    <popularize-box v-if="view1 == 1 && view2 == 2"></popularize-box>
                    <!-- 3 -->
                    <course-change v-if="view1 == 2 && view2 == 0"></course-change>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mainNav from "./mainNav"
import ditch from "./ditch"

import popuResource from "./popuResource"

// 1-1
import livelyResource from "./livelyResource"
// 1-2
import resourceDetails from "./resourceDetails"
// 1-3
import affairAnalyze from "./affairAnalyze"
// 2-1
import ditchsBox from "./ditchsbox"
// 2-2
import ditchMediumBox from "./ditchMediumBox"
// 2-3
import popularizeBox from "./popularizeBox"
// 3-1
import courseChange from "./courseChange"
// 引入全局状态
import {mapActions} from "vuex";

export default {
    name : "admin",
    data(){
        return {
            selectView : [0,0],
            // 一级目录
            view1:0,
            // 二级目录
            view2:0,
            // 是否显示页面
            isView2:true,
            // 是否显示用户操作
            isUserEditIcon:false,
            nav:[
                    {txt:"推广统计分析",icon:"icon-tongji",child:[{txt:"活跃资源统计"},{txt:"资源详情分析"},{txt:"事件分析"},{txt:"事件管理"}]},
                    {txt:"推广渠道管理",icon:"icon-tuiguangqudao",
                        child:[
                            {txt:"渠道组管理"},{txt:"渠道媒介管理"},{txt:"推广资源管理"}
                        ],
                        view:[
                                [{txt:"渠道组名称",type:"text"},{txt:"渠道组类型",type:"text"},{txt:"渠道组标识",type:"text"}]
                                ,[],
                                [{txt:"推广名称",type:"input"},{txt:"推广标识",type:"input"},{txt:"渠道选择",type:"select"},{txt:"广告关键词",type:"input"},{txt:"有效性",type:"radio"}]
                            ]
                    },
                    {txt:"进程管理",icon:"icon-qiehuan1"}
                ]
        }
    },
    watch:{
        "selectView":function(val){
            this.view1 = val[0]-0; 
            this.view2 = val[1]-0;
            if(!this.nav[(this.selectView[0]-0)].child){
                this.isView2 = false
            }else{
                this.isView2 = true
            }
            
        }
    },
    mounted(){
        document.body.addEventListener("click",()=>{
            this.isUserEditIcon = false;
        });
        // ajax 加载 推广资源和渠道组数据
        this.$axios.post(webUrl+"/active/getSelect").then((res)=>{
            let web = res.data.data.web_name;
            web[0] = "全部";
            let group = res.data.data.group;
            group[0] = "全部";
            this.setWeb(web);
            this.setGroup(group);
        })
    },
    methods:{
        navI(val){
            console.log(val)
            this.selectView = val.split('-');
        },
        showUserEdit(){
            this.isUserEditIcon = !this.isUserEditIcon;
        },
        setView(){
            this.selectView = [0,0];
        },
        ...mapActions(['setWeb','setGroup'])
    },
    components:{
        // 左边导航栏
        mainNav:mainNav,
        // 推广统计分析 1 活跃资源统计
        livelyResource:livelyResource,
        // 推广统计分析 2 资源详情分析
        resourceDetails:resourceDetails,
        // 推广统计分析 3 事件分析
        affairAnalyze:affairAnalyze,
        // 推广渠道管理 1 渠道组管理
        ditchsBox:ditchsBox,
        // 推广渠道管理 2 渠道媒介管理
        ditchMediumBox:ditchMediumBox,
        // 推广渠道管理 3 推广资源管理
        popularizeBox:popularizeBox,
        // 进程管理
        courseChange:courseChange
    }
}
</script>
<style scoped>
html,
body {
    height: 100%;
}

.iconfont {
    display: inline-block;
    transition-duration: 600ms;
}
/* admin */

.admin {
    width: 100%;
    height: 100%;
}

.admin-head {
    background-color: #5270ad;
}

.admin-logo {
    height: 70px;
    transform: scale(.75) translateX(-30px);
}

.admin-user-box {
    position: relative;
    height: 100%;
    cursor: pointer;
    z-index: 99;
}
.admin-user-box:hover .admin-user-info{
    opacity: .7;
}

.admin-user-img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
}

.admin-user-info {
    padding: 0 12px;
    font-size: 14px;
    color: #fff;
}

.admin-user-edit-icon {
    transform: rotate(180deg)
}

.admin-user-edit {
    position: absolute;
    top: 53px;
    width: 100%;
    height: 0;
    background-color: #42516a;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    line-height: 40px;
    overflow: hidden;
    transition-duration: 600ms;
}
.admin-user-edit-show {
    height: 163px;
}
.admin-user-edit li {
    border-bottom: 1px #fff dashed;
    transition-duration: 600ms;
}
.admin-user-edit li:last-child {
    border: none;
}
.admin-user-edit a {
    color: #fff;
}
.admin-user-edit li:hover {
    background-color: #1d2c46;
}
.admin-user-logout a {
    display: block;
    height: 70px;
    padding: 0 20px;
    background-color: #ffcc00;
}

.admin-user-logout a::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
}

.admin-user-logout a * {
    vertical-align: middle;
    color: #fff;
    font-size: 14px;
}

.admin-user-logout img {
    display: inline-block;
}

.admin-user-logout a:hover {
    opacity: .7;
}


/* main */

.admin-main {
    height: calc(100% - 70px);
    font-size: 0;
}

.admin-main-left {
    display: inline-block;
    height: 100%;
    width: 260px;
    text-align: left;
    overflow-y: scroll;
}

.admin-main-right {
    display: inline-block;
    height: 100%;
    width: calc(100% - 260px);
    overflow-y: scroll;
}
.admin-main-right-title {
    padding: 20px 30px;
    border-bottom: 1px #e8e8e8 solid;
    line-height: 1;
}
.admin-main-right-title  h2{
    color: #333;
    font-size: 16px;
    font-weight: normal;
    padding: 0 12px;
}
.admin-main-right-title  h2:first-child{
    border-left: 2px #6699ff solid;
}
.admin-main-right-title  i {
    padding-left: 6px;
}
.admin-main-right-title  .color9 {
    color: #999;
}

.admin-main-right-box {
    padding: 20px 50px;
    min-height: calc(100% - 57px)
}
/**/
.sourse {
    height: 100%;
}
</style>
