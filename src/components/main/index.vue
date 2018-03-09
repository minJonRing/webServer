<template>
    <div class="admin">
        <div class="admin-head flex flex-mid flex-center-3">
            <img class="admin-logo" src="../../assets/logo.png" alt="">
            <div class="admin-user flex flex-mid flex-center-3">
                <div class="admin-user-img">
                    <img class="block w100" src="./images/user.jpeg" alt="">
                </div>
                <div class="admin-user-info">
                    <span>admin</span>
                    <i>：超级管理员</i>
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
                <main-nav></main-nav>
            </div>
            <div class="admin-main-right"></div>
        </div>
    </div>
</template>
<script>
import mainNav from "./mainNav"

export default {
    name : "admin",
    data(){
        return {

        }
    },
    mounted(){
        
    },
    components:{
        mainNav:mainNav
    }
}
</script>
<style scoped>
html,
body {
    height: 100%;
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
</style>
