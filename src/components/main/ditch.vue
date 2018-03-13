<template>
  <div class="ditch">
      <input-text @getText="setData" :elName="'渠道组名称'" :propType="{type:'name'}"></input-text>
      <input-text @getText="setData" :elName="'渠道组类型'" :propType="{type:'type'}"></input-text>
      <input-text @getText="setData" :elName="'渠道组标识'" :propType="{type:'icon'}"></input-text>
      <input-submit @getSubmit="setSubmit"></input-submit>
  </div>
</template>

<script>
    import inputText from "./from/inputText"
    import inputSubmit from "./from/inputSubmit"
    import inputSelect from "./from/inputSelect"
    import inputRadio from "./from/inputRadio"
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
                this.ajaxData[val.type] = val.txt;
            },
            // 发送ajax请求
            setSubmit(){
                console.log(this.ajaxData)
            }
        },
        components:{
            inputText:inputText,
            inputSubmit:inputSubmit,
            inputSelect:inputSelect,
            inputRadio:inputRadio
        }
    }
</script>

<style scoped>
</style>

