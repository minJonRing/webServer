<template>
    <div class="lively-resource">
        <div class="resource-search">
            <div class="search-resource flex flex-mid">
                <p>推广资源</p>
                <div class="imitate-select">
                    <div class="imitate-select-cont" @click="isSelect = !isSelect">
                        <p class="flex-1">{{selectCont}}</p>
                        <i class="iconfont icon-zheng-triangle" :class="{'recover':isSelect}"></i>
                    </div>
                    <div :class="['imitate-select-list',{'imitate-select-list-show':isSelect}]">
                        <ul>
                            <li v-for="(item,index) in selectList" :key="index"><a href="javascript:" @click="copySelect($event,item.txt)">{{item.txt}}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="seaarch-time flex flex-mid">
                <p>时间类型</p>
                <label class="flex flex-mid" for="day">
                    <div class="input-box-radio">
                        <input type="radio" name="time" id="day">
                        <span></span>
                    </div>
                    <span>天</span>
                </label>
                <label class="flex flex-mid" for="month">
                    <div class="input-box-radio">
                        <input type="radio" name="time" id="month">
                        <span></span>
                    </div>
                    <span>月</span>
                </label>
                <label class="flex flex-mid" for="year">
                    <div class="input-box-radio">
                        <input type="radio" name="time" id="year">
                        <span></span>
                    </div>
                    <span>年</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"lively-resource",
        data(){
            return {
                isSelect:false,
                selectCont:"",
                selectList:[{txt:"a"},{txt:"b"},{txt:"c"},{txt:"d"}]
            }
        },
        methods:{
            copySelect(event,val){
                this.selectCont = val;
                this.isSelect = false;
            }
        }
    }
</script>

<style scoped>
.resource-search {
    display: flex;
    align-content: center;
    font-size: 14px;
    color: #333;
    text-align: left;
}

/*模拟select*/
.imitate-select {
    position: relative;
    margin: 0 14px;
}
.imitate-select-cont {
    position: relative;
    display: flex;
    align-content: center;
    width: 180px;
    height: 36px;
    line-height: 34px;
    padding: 0 12px;
    border: 1px #e4e4e4 solid;
    border-radius: 3px;   
    cursor: pointer;
}
.imitate-select-cont i {
    color: #ddd;
    transition-duration: 600ms;
    transform: rotate(180deg);
}
.imitate-select-cont i.recover {
    transform: rotate(0);
}
.imitate-select-list {
    position: absolute;
    top: 38px;
    left: 0;
    width: 100%;
    padding: 0 12px;
    background-color: #fff;
    border: 1px #e4e4e4 solid;
    border-radius: 3px;
    opacity: 0;
    transition-duration: 600ms;
    transform: matrix(1,0,0,1,20,0); 
    pointer-events: none;
}
.imitate-select-list-show {
    opacity: 1;
    transform: matrix(1,0,0,1,0,0);
    pointer-events:auto; 
}
.imitate-select-list li {
    padding: 6px 0;
    border-bottom: 1px #999 dashed;
}
.imitate-select-list li:last-child{
    border: none;
}
.imitate-select-list li a {
    display: inline-block;
    width: 100%;
    color: #333;
}

/*时间单选*/
.seaarch-time {
    padding-left: 25px;
}
.seaarch-time label {
    padding: 0 12px;
}
.seaarch-time label span {
    padding-left: 6px;
}
.input-box-radio {
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px #d1d1d1 solid;
    border-radius: 50%;
    overflow: hidden;
}
.input-box-radio input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.input-box-radio span {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 3px #f7f7f7 solid;
    background-color: #f7f7ff;
    transition-duration: 600ms;
}
.input-box-radio input:checked + span {
    background-color: #6699ff;
}
</style>

