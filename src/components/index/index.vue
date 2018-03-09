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
            <div class="ajax-login-more flex flex-mid flex-center-3">
                <p>
                    <label class="flex flex-mid" for="jz">
                        <input type="checkbox" id="jz">
                        <span class="line10">下次自动登录</span>
                    </label>
                </p>
                <p>
                    <a href="javascript:">忘记密码</a>
                </p>
            </div>
            <div class="ajax-login-submit">
                <a href="javascript:" @click="login">登录</a>
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
      password:""
    }
  },
  mounted(){
   
  },
  computed:{
    ...mapGetters(['getUser'])
  },
  methods:{
    ...mapActions(['setUser']),
    login(){
      this.setUser(2)
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

.ajax-login-more,
.ajax-login-more a {
    font-size: 18px;
    color: #fff;
}

.ajax-login-more a:hover {
    opacity: .7;
}

.ajax-login-more input {
    width: 30px;
    height: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    background-color: #fff;
    margin-right: 10px;
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
</style>
