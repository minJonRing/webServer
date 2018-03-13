<template>
    <div class="inputSelect">
        <span>*</span>
        <p>ss</p>
        <div class="input-box">
            <div class="copyModel">{{txt}}</div>
            <ul>
                <li v-for="(item,index) in list" :key="index" @click="selectTxt($event,item.txt)">{{item.txt}}</li>
            </ul>
        </div>
        <i></i>
    </div>
</template>

<script>
    export default {
        name:"inputSelect",
        data(){
            return {
                txt:"",
                list:[{txt:'1'}]
            }
        },
        methods:{
            selectTxt(event,val){
                console.log()
                this.txt = val;
            }
        }
    }
</script>

<style scoped>
.inputSelect{
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

.inputSelect .input-box ul {
    position: absolute;
    top: 50px;
    left: 0;
    width: 320px;
    padding: 6px 12px;
    border: 1px #e4e4e4 solid;
    border-radius: 6px;
    text-align: left;
    background-color: #fff;
}
.inputSelect .input-box ul li {
    width: 100%;
    padding: 6px 0;
    color: #666;
    border-bottom: 1px #f5f5f5 dashed;
}
.inputSelect .input-box ul li:last-child{
    border: none;
}
.inputSelect i {
    width: 260px;
}
</style>

