<template>
  <div class="ditch">
      <input-text @getChild="setData" :propType="{type:'name'}"></input-text>
      <input-text @getChild="setData" :propType="{type:'type'}"></input-text>
      <input-text @getChild="setData" :propType="{type:'icon'}"></input-text>
      <input-select></input-select>
      <input-submit @sendFather="sendAjax"></input-submit>
  </div>
</template>

<script>
    import inputText from "./from/inputText"
    import inputSubmit from "./from/inputSubmit"
    import inputSelect from "./from/inputSelect"
    export default {
        name:"ditch",
        props:{
            showView:Array
        },
        data(){
            return {
                ajaxData:{
                    name:"",
                    type:"",
                    icon:""
                },
                isAjax:false
            }
        },
        mounted(){
        },
        methods:{
            // 处理数据
            setData(val){
                for(let i in this.ajaxData){
                    if(val.type == i){
                        this.ajaxData[i] = val.txt
                    }
                }
            },
            // 发送ajax请求
            sendAjax(){
                console.log(this.ajaxData)
            }
        },
        components:{
            inputText:inputText,
            inputSubmit:inputSubmit,
            inputSelect:inputSelect
        }
    }
</script>

<style scoped>
.ditch {
    padding: 20px 50px;
}
</style>

