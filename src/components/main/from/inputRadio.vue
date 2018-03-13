<template>
  <div class="inputRadio">
        <span>*</span>
        <p>{{elName}}</p>
        <div class="input-box">
            <label for="yes">
                <input type="radio" name="valid" value="1" v-model="value" @change="setFather" id="yes">
                <p>启用</p>
            </label>
            <label for="no">
                <input type="radio" name="valid" value="0" v-model="value" @change="setFather" id="no">
                <p>关闭</p>
            </label>
        </div>
        <i></i>
  </div>
</template>
<script>
    export default {
        name:"inputRadio",
        props:{
            propType:Object,
            elName:String
        },
        data(){
            return {
                value:"1"
            }
        },
        methods:{
            setFather(){
                this.$emit("getRadio",{type:this.propType.type,txt:this.value})
            }
        }
    }
</script>

<style scoped>
.inputRadio{
    position: relative;
    width: 720px;
    font-size: 0;
    text-align: right;
    padding: 12px 0;
}
.inputRadio * {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
}
.inputRadio span{
    color: #fa2323;
}
.inputRadio p {
    padding: 0 12px;
    color: #333;
}
.inputRadio .input-box {
    width: 320px;
    text-align: left;
}
.inputRadio input {
    width: 20px;
    height: 20px;
}
.inputRadio input:focus {
    outline-color: #23cb5c;
}
.inputRadio i {
    width: 260px;
}
</style>

