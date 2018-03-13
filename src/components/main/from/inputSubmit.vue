<template>
  <div class="inputSubmit">
      <div class="input-submit">
        <a href="javasctipy:" @click="ajaxSubmit">提交</a>
      </div>
  </div>
</template>
<script>
    export default {
        name:"inputSubmit",
        data(){
            return {
            }
        },
        methods:{
            ajaxSubmit(){
                this.$emit('getSubmit')
            }
        }
    }
</script>

<style scoped>
/*提交按钮*/
.input-submit {
    width: 720px;
    padding: 12px 0;
    text-align: right;
}
.input-submit a{
    display: inline-block;
    width: 120px;
    margin-right:460px;
    text-align: center;
    border-radius: 5px;
    line-height: 46px;
    background-color: #ffcc00;
    font-size: 16px;
    color: #fff;
}
.input-submit a:hover{
    opacity: .7;
}
</style>


