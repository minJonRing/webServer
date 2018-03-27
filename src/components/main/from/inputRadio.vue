<template>
  <div class="inputRadio">
        <span>*</span>
        <p>{{elName}}</p>
        <div class="input-box">
            <label for="yes">
                <div class="radio-box">
                    <input type="radio" name="valid" value="1" v-model="value" @change="setFather" id="yes">
                    <span></span>
                </div>
                <p>启用</p>
            </label>
            <label for="no">
                <div class="radio-box">
                    <input type="radio" name="valid" value="0" v-model="value" @change="setFather" id="no">
                    <span></span>
                </div>
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
.inputRadio .radio-box {
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px #d1d1d1 solid;
    border-radius: 50%;
    overflow: hidden;
}
.inputRadio input {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    opacity: 0;
}

.inputRadio .radio-box span {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px #f7f7f7 solid;
    background-color: #f7f7ff;
    transition-duration: 600ms; 
}

.inputRadio .radio-box input:checked + span {
    background-color: #6699ff;
}
.inputRadio input:focus {
    outline-color: transparent;
}
.inputRadio i {
    width: 260px;
}
</style>

