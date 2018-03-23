<template>
  <div class="home">
    <div class="flex flex-mid flex-center-1 h100">
        <div class="ajax-login">
            <img class="ajax-login-logo" src="../../assets//logo.png" alt="">
            <div class="ajax-login-name">
                <input type="text" name="username" v-model="username" placeholder="用户名">
            </div>
            <div class="ajax-login-pass">
                <input type="password" name="password" v-model="password" placeholder="密码">
            </div>
            <div class="ajax-login-verify">
                <div class="verify-bar">
                    <p>向右滑动验证</p>
                    <div class="verify-bg" :style="{'width':verifyWidth+'px'}">{{verifyInfo}}</div>
                    <input class="range" v-if="isShowRange" type="range" name="" v-model="range" value="0" min="0" :max="inputMax" id="">
                    <div class="slide-block" :style="{'transform':'translateX('+range+'px)'}">
                        <i :class="['iconfont',{'icon-xiangyou':!isVerify,'icon-trues-active':isVerify,'color-g':isVerify}]"></i>
                        <i v-show="!isVerify" class="iconfont icon-xiangyou"></i>
                    </div>
                </div>
            </div>
            <div class="ajax-login-submit">
                <a href="javascript:" @click="login">登录</a>
            </div>
            <div class="ajax-login-more flex flex-mid flex-center-3">
                <p>
                    <label class="flex flex-mid" for="jz">
                        <div class="check-input">
                            <input type="checkbox" id="jz" v-model="isShowSave">
                            <span class="flex-mid flex-center-1">
                                <i class="iconfont" :class="{'icon-duihao':isShowSave}"></i>
                            </span>
                        </div>
                        <span class="line10" style="font-size:15px">下次自动登录</span>
                    </label>
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters , mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      username:"",
      password:"",
      isShowSave:false,
      isShowRange:true,
      isVerify:false,
      range:0,
      verifyInfo:"",
      verifyWidth:"",
      inputMax:0
    }
  },
  mounted(){
    document.querySelector('.range').addEventListener("mouseup",()=>{
        this.range = 0;
    })
    this.inputMax = document.querySelectorAll('.verify-bar .range')[0].clientWidth-50;
  },
  watch:{
     'range':function(val){
         this.verifyWidth = val;
         if(val == this.inputMax){
             this.isShowRange = false;
             this.verifyInfo ="验证通过";
             this.isVerify = true;
         }
     } 
  },
  computed:{
    ...mapGetters(['getUser'])
  },
  methods:{
    ...mapActions(['setUser','setHint']),
    login(){
      this.setUser(2)
      this.setHint({txt:"登入成功",className:"hint-success"})
      this.$router.push({path:"/app/main"})
      return;  
      this.$axios.post('/app/adminLogin',{username:this.username,password:this.password}).then((res)=>{
        console.log(res)
        this.setUser(res)
        this.$router.push({path:"/main"})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body {
    height: 100%;
    
}
html,body * {
    user-select:none;
}
.home{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
}

/* login */

.ajax-login {
    width: 30%;
    min-width: 480px;
    padding: 70px 75px;
    background-color: rgba(0, 0, 0, .4);
    border: 1px rgba(255, 255, 255, .6) solid;
    border-radius: 5px;
    transform: matrix(1, 0, 0, 1, 0, -35);
}

.ajax-login-logo {
    display: block;
    margin: 0 auto;
}

.ajax-login-name,
.ajax-login-pass,
.ajax-login-more,
.ajax-login-verify,
.ajax-login-submit {
    margin-top: 30px;
}

.ajax-login-name input,
.ajax-login-pass input {
    border: none;
    color: #999;
    width: 100%;
    line-height: 60px;
    border-radius: 5px;
    padding: 0 15px;
    font-size: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
}

.ajax-login-verify {
    height: 55px;
    background-color: #e0e0e0;
    border-radius: 5px;
    line-height: 55px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    overflow: hidden;
}
.ajax-login-verify .verify-bar p {
    color: #999;
}
.ajax-login-verify .verify-bar .verify-bg {
    position:absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #7bde42;
    color: #fff;
    font-size: 18px;
    z-index:2;
}
.ajax-login-verify .verify-bar {
    position: relative;
    height: 100%;
    overflow: hidden;
}
.ajax-login-verify .verify-bar input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    opacity: 0;
}
.ajax-login-verify .verify-bar .slide-block {
    position: absolute;
    height: 100%;
    width: 50px;
    top: 0;
    left: 0;
    border-radius: 5px;
    background-color:#fff; 
    z-index: 5;
}
.ajax-login-verify .verify-bar .slide-block i:first-child {
    margin-right: -5px;
}
.ajax-login-verify .verify-bar .slide-block i:last-child{
    margin-left: -5px;
}
.ajax-login-more,
.ajax-login-more a {
    font-size: 18px;
    color: #fff;
}

.ajax-login-more a:hover {
    opacity: .7;
}
.ajax-login-more .check-input{
    position: relative;
    width: 20px;
    height: 20px;
    
    margin-right: 10px;
}
.ajax-login-more input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
}
.ajax-login-more .check-input span {
    display: flex;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    background-color: #fff;
    border-radius: 3px;
}
.ajax-login-more .check-input span i {
    color: #333;
    font-size: 18px;
}
.ajax-login-submit a {
    display: block;
    line-height: 60px;
    background-color: #ffcc00;
    border-radius: 30px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
}

.ajax-login-submit a:hover {
    opacity: .7;
}

.color-g {
    color:#7bde42 ;
    margin: 0 !important;
    font-size: 24px;
}
</style>
