<template>
  <div class="popuResource">
      <input-text @getText="setData" :elName="'推广名称'" :propType="{type:'name'}"></input-text>
      <input-text @getText="setData" :elName="'推广标识'" :propType="{type:'icon'}"></input-text>
      <input-select @getSelect="setData" :elName="'渠道选择'" :propType="{type:'ditch'}"></input-select>
      <input-text @getText="setData" :elName="'广告关键词'" :propType="{type:'keyword'}"></input-text>
      <input-radio @getRadio="setData" :elName="'有效性'" :propType="{type:'validity'}"></input-radio>
      <input-submit @getSubmit="setSubmit"></input-submit>
  </div>
</template>

<script>
import inputText from "./from/inputText"
import inputSelect from "./from/inputSelect"
import inputRadio from "./from/inputRadio"
import inputSubmit from "./from/inputSubmit"
    export default {
        name:"popuResource",
        data(){
            return {
                ajaxData:{
                    name:"",
                    icon:"",
                    ditch:"",
                    keyword:"",
                    validity:"1"
                }
            }
        },
        mounted(){
            console.log(this.ajaxData['name'])
        },
        methods:{
            setData(val){
                this.ajaxData[val.type] = val.txt;
            },
            setSubmit(){
                console.log(this.ajaxData)
            }

        },
        components:{
            inputText:inputText,
            inputSelect:inputSelect,
            inputRadio:inputRadio,
            inputSubmit:inputSubmit
        }
    }
</script>
