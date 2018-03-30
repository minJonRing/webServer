<template>
    <div class="inputText">
        <span>*</span>
        <p>{{elName}}</p>
        <div class="input-box">
            <input type="text" name="name" v-model="cont" @change="setFather" :placeholder="hint">
        </div>
        <i></i>
    </div>
</template>

<script>
    export default {
        name:"inputText",
        props:{
            propType:Object,
            elName:String,
            hint:String,
            txt:String
        },
        data(){
            return {
                cont:""
            }
        },
        mounted(){
            
        },
        watch:{
            "txt":function(val){
                this.cont = val;
            }
        },
        methods:{
            setFather(){
                /**正则验证
                 * loding  待完成
                 */
                this.$emit('getText',{type:this.propType.type,name:this.cont})
            }
        }
    }
</script>

<style>

.inputText{
    width: 720px;
    font-size: 0;
    text-align: right;
    padding: 12px 0;
}
.inputText * {
    display: inline-block;
    font-size: 14px;
}
.inputText span{
    color: #fa2323;
}
.inputText p {
    padding: 0 12px;
    color: #333;
}
.inputText input {
    width: 320px;
    height: 46px;
    padding: 0 12px;
    border: 1px #e4e4e4 solid;
    border-radius: 6px;
    color: #333;
}
.inputText input:focus {
    /* outline-color: #23cb5c; */
}
.inputText i {
    width: 260px;
}


</style>
