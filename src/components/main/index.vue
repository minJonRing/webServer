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
                        <ul @click.stop>
                            <li><a href="javascript:" @click.stop="bindRePass">修改密码</a></li>
                        </ul>
                    </div>
                </div>
                <div class="admin-user-logout">
                    <a href="javascript:" @click="bindLogout">
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
                    <!-- 1 -->
                    <lively-resource v-if="view1 == 0 && view2 == 0"></lively-resource>
                    <resource-details v-if="view1 == 0 && view2 == 1"></resource-details>
                    <affair-analyze v-if="view1 == 0 && view2 == 2"></affair-analyze>
                    <!-- 2 -->
                    <ditchs-box v-if="view1 == 1 && view2 == 0"></ditchs-box>
                    <ditch-medium-box v-if="view1 == 1 && view2 == 1"></ditch-medium-box>
                    <popularize-box v-if="view1 == 1 && view2 == 2"></popularize-box>
                    <!-- 3 -->
                    <course-change v-if="view1 == 2 && view2 == 0"></course-change>
                    <!-- 4 -->
                    <div v-if="view1 == 4 && view2 == 4"></div>
                </div>
            </div>
        </div>
        <div class="admin-hint" v-show="isShowRe" @click="isShowRe = false">
            <div class="admin-hint-main" @click.stop>
                <p class="admin-hint-title">修改密码</p>
                <div class="admin-hint-box">
                    <p><i>*</i><span>原密码</span></p>
                    <input type="text" v-model="initPass" placeholder="请输入密码">
                </div>
                <div class="admin-hint-box">
                    <p><i></i><span>新密码</span></p>
                    <input type="text" v-model="newPass" placeholder="请输入新密码">
                </div>
                <div class="admin-hint-box">
                    <p><i></i><span>确认密码</span></p>
                    <input type="text" v-model="rePass" placeholder="请再次输入新密码">
                </div>
                <a class="admin-hint-submit" href="javascript:" @click="bindRePassSubmit">提交</a>
            </div>
        </div>
    </div>
</template>
<script>
import mainNav from "./mainNav"
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
                    {txt:"进程管理",icon:"icon-qiehuan1"},
                    {txt:''}
                ],
            // 显示修改密码界面
            isShowRe:false,
            initPass:"",
            newPass:"",
            rePass:""
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
            this.selectView =  val.split('-');
        },
        showUserEdit(){
            this.isUserEditIcon = !this.isUserEditIcon;
        },
        setView(){
            this.selectView = [0,0];
        },
        ...mapActions(['setWeb','setGroup','setHint']),
        bindLogout(){
            $.ajax({
                url:webUrl+"/auth/logout",
                type:"POST",
                data:{auth_token:localStorage.getItem("token")},
                dataType:"JSON",
                success:(res)=>{
                    localStorage.removeItem("token")
                    localStorage.removeItem("xxx")
                    localStorage.removeItem("time")
                    this.$router.push({path:"/"})
                    this.setHint({txt:"退出成功",className:"hint-success"})
                }
            })
            
        },
        bindRePass(){
            this.isShowRe = true;
        },
        bindRePassSubmit(){
            if(!this.initPass){
                this.setHint({txt:"请输入密码",className:"hint-error"})
                return ;
            }else if(!this.newPass){
                this.setHint({txt:"请输入请密码",className:"hint-error"})
                return ;
            }else if(!this.rePass){
                this.setHint({txt:"请再次输入新密码",className:"hint-error"})
                return ;
            }
            $.ajax({
                url:webUrl+"/auth/change",
                type:"POST",
                data:{
                    auth_token:localStorage.getItem("token"),
                    password:this.initPass,
                    new_password:this.newPass,
                    re_password:this.rePass
                },
                dataType:"JSON",
                success:(res)=>{
                    if(res.status==1){
                        localStorage.removeItem("token")
                        localStorage.removeItem("xxx")
                        localStorage.removeItem("time")
                        this.$router.push({path:"/"})
                        this.setHint({txt:"密码修改成功",className:"hint-success"})
                    }else{
                        this.setHint({txt:res.msg,className:"hint-success"})
                    }
                }
            })
            // this.isShowRe = false;
        }
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
    background-color: #42516a;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    line-height: 40px;
    overflow: hidden;
    opacity: 0;
    transition-duration: 600ms;
    transform: matrix(1,0,0,1,20,0);
    pointer-events: none;
}
.admin-user-edit-show {
    pointer-events: auto;
    opacity: 1;
    transform: matrix(1,0,0,1,0,0);    
}
.admin-user-edit li {
    border-bottom: 1px #fff dashed;
    transition-duration: 600ms;
}
.admin-user-edit li:last-child {
    border: none;
}
.admin-user-edit a {
    display: inline-block;
    width: 100%;
    color: #fff;
    height: 100%;
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
/**/
.admin-hint {
    position:absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
    z-index: 99;
    font-size: 12px;
    color: #333;
}
.admin-hint-main {
    background-color: #fff;
    border-radius: 5px;
    padding: 24px;
}
.admin-hint-title {
    font-size: 18px;
    text-align: left;
    padding-bottom:18px;
}
.admin-hint-box {
    display: flex;
    align-items: center;
    margin: 12px 0;
}
.admin-hint-box i {
    color: red;
}
.admin-hint-box p {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 12px;
    font-size: 14px;
    width: 100px;
}

.admin-hint-box input {
    border: none;
    padding: 7px 12px;
    border: 1px #e4e4e4 solid;
    border-radius: 3px;
}
.admin-hint-submit {
    display: inline-block;
    width: 195px;
    line-height: 31px;
    background-color: #70ca10;
    color: #fff;
    font-size: 14px;
    margin-left: 100px;
    border-radius: 3px;
}
</style>
