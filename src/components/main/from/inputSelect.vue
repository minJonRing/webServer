<template>
    <div class="inputSelect">
        <span>*</span>
        <p>{{elName}}</p>
        <div class="input-box" :class="{'is-hide':!isShowSelect}">
            <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':isShowSelect}"></i>
            <div class="copyModel" @click="isShowSelect = !isShowSelect">{{txt}}</div>
            <ul :class="{'show-select':isShowSelect}">
                <li v-for="(item,index) in list" :key="index" @click="selectTxt($event,item.txt)">{{item.txt}}</li>
            </ul>
        </div>
        <i></i>
    </div>
</template>

<script>
    export default {
        name:"inputSelect",
        props:{
            propType:Object,
            elName:String
        },
        data(){
            return {
                isShowSelect:false,
                txt:"",
                list:[{txt:'1'},{txt:'2'},{txt:'3'},{txt:'4'},{txt:'1'},{txt:'1'}]
            }
        },
        methods:{
            selectTxt(event,val){
                this.txt = val;
                this.isShowSelect = false
                this.$emit("getSelect",{type:this.propType.type,txt:this.txt})
            },
        }
    }
</script>

<style scoped>
.inputSelect{
    position: relative;
    width: 720px;
    font-size: 0;
    text-align: right;
    padding: 12px 0;
    
}
.inputSelect * {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
}
.inputSelect span{
    color: #fa2323;
}
.inputSelect p {
    padding: 0 12px;
    color: #333;
}
.inputSelect .input-box {
    position: relative;
    z-index: 2;
}
.inputSelect .input-box .copyModel{
    position: relative;
    width: 320px;
    height: 46px;
    line-height: 46px;
    padding: 0 12px;
    text-align: left;
    border: 1px #e4e4e4 solid;
    border-radius: 6px;
    color: #333;
}
.inputSelect .is-hide{
    overflow: hidden;
}
.inputSelect .input-box ul {
    position: absolute;
    top: 50px;
    left: 0;
    width: 320px;
    padding: 3px 12px;
    border: 1px #e4e4e4 solid;
    border-radius: 6px;
    text-align: left;
    background-color: #fff;
    opacity: 0;
    transition-duration: 600ms;
    transform: matrix(1,0,0,1,20,0);
}
.inputSelect .input-box .show-select {
    opacity: 1;
    transform: matrix(1,0,0,1,0,0);
}
.inputSelect .input-box ul li {
    width: 100%;
    padding: 6px 0;
    color: #666;
    border-bottom: 1px #f5f5f5 dashed;
    transition-duration: 600ms;
    cursor: pointer;
}
.inputSelect .input-box ul li:hover {
    background-color: #fafafa;
}
.inputSelect .input-box ul li:last-child{
    border: none;
}
.inputSelect i {
    width: 260px;
}
.inputSelect .icon {
    position: absolute;
    width: auto;
    right: 10px;
    top: 14px;
    color: #999;
    transition-duration: 600ms;
    transform: rotate(180deg);
}
.inputSelect .rotate-icon {
    transform-origin: 50% 50%;
    transform: rotate(0deg);
}
</style>

