<template>
    <div class="fixedDitch">
        <div class="resource-search">
            <div class="search-resource flex flex-mid" v-for="(item,index) in searchData" :key="index">
                <p>{{item.name}}</p>
                <div class="search-resource-input">
                    <input type="text" v-model="item.value" :placeholder="'请输入'+item.name">
                </div>
            </div>
            <!-- <div class="search-resource flex flex-mid">
                <p>渠道组标识</p>
                <div class="imitate-select">
                    <div class="imitate-select-cont" @click.stop="isDitch = !isDitch">
                        <p class="flex-1">{{ditchCont}}</p>
                        <i class="iconfont icon-zheng-triangle" :class="{'recover':isDitch}"></i>
                    </div>
                    <div :class="['imitate-select-list',{'imitate-select-list-show':isDitch}]">
                        <ul>
                            <li v-for="(item,index) in ditchList" :key="index"><a href="javascript:" @click="copyDitch($event,item.txt)">{{item.txt}}</a></li>
                        </ul>
                    </div>
                </div>
            </div> -->
            <div class="search-submit">
                <a href="javascript:" @click="submitBtn">查询</a>
            </div>
            <div class="add-link">
                <a href="javascript:" @click="changeShow">
                    <i class="iconfont icon-jia"></i>
                    <span>新增</span>
                </a>
            </div>
        </div>
        <div class="table-box">
            <table border="0">
                <tr class="table-title">
                    <td v-for="(item,index) in searchTitle" :key="index">{{item.name}}</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item,index) in pageArr" :key="index">
                    <td>{{item.type}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.identifying}}</td>
                    <td  v-if="item.pattern">{{item.pattern}}</td>
                    <td class="td-edit">
                        <a class="table-edit" href="javascript:" @click="bindEdit($event,item.id)">编辑</a>
                        <a class="table-remove" href="javascript:" @click="bindRemove($event,item.id)">删除</a>
                    </td>
                </tr>
            </table>
            <div class="list-hint" v-show="isShowTip" @click="isShowTip = false">
                <div class="list-hint-box" @click.stop>
                    <p class="p1">确认{{tip}}</p>
                    <p class="p2">
                        <a href="javascript:" @click="bindConfirm">确定</a>
                        <a href="javascript:" @click="isShowTip = false">取消</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import  bus from './js/a.js';

    export default {
        name:"fixedDitch",
        props:['searchData','searchTitle','searchUrl'],
        data(){
            return {
                arr:0,
                // 当前页面数据
                pageArr:[],
                tip:"",
                isShowTip:false,
                isRemove:false,
                dataId:0,
            }
        },
        watch:{

        },
        mounted(){
            document.body.addEventListener("click",()=>{
                this.isSelect = this.isDitch = false;
            })
            this.submitData({name:'',identifying:'',page:1})
            let _this = this;
            bus.$on("bindUpdate",function () { 
                _this.submitData({name:'',identifying:'',page:1});
            })
        },
        methods:{
            ...mapActions(['setHint']),
            // 查询
            submitData(data){
                let _data = data;
                let _this = this;
                $.ajax({
                    url:_this.searchUrl+'getData',
                    type:"POST",
                    data:_data,
                    dataType:"JSON",
                    success:function(res){
                        _this.pageArr = res.data.list;
                        _this.arr = res.data.total;
                        _this.L = Math.ceil(res.data.total/res.data.pageSize);
                    }
                })
            },
            // 查询数据
            submitBtn(){
                this.add = 1;
                this.submitData({name:this.searchData[0].value,identifying:this.searchData[1].value,page:1})
            },
            // 父组件通信(跳转到新增页面)
            changeShow(){
                bus.$emit('bindBrother')
                this.$emit("getChild")
            },
            // 编辑按钮
            bindEdit(event,id){
                bus.$emit('bindBrother',id)
                this.$emit("getChild")
                // this.$emit("bindChildEdit",{id:id,isEdit:++this.isEdit})
               
            },
            // 删除按钮
            bindRemove(event,id){
                this.tip = "删除";
                this.isShowTip = true;
                this.dataId = id;
            },
            // 确定操作
            bindConfirm(event,id){
                let _this = this;
                $.ajax({
                    url:_this.searchUrl+"delete",
                    type:"POST",
                    data:{id:this.dataId},
                    dataType:"JSON",
                    success:(res)=>{
                        this.isShowTip = false;
                        if(res.status == 1){
                            this.setHint({txt:res.msg,className:"hint-success"});
                            this.submitData({name:'',identifying:'',page:1})
                        }else{
                            this.setHint({txt:res.msg,className:"hint-error"})
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
/*搜索栏*/
.resource-search {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    font-size: 14px;
    color: #333;
    text-align: left;
    
}
/*模拟select*/
.search-resource {
    padding: 6px 12px;
}
.search-resource-input {
    position: relative;
    margin: 0 14px;
    
}
.search-resource-input input{
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
/*筛选提交按钮*/
.search-submit,
.add-link {
    padding: 6px 12px;
}
.search-submit a,
.add-link a{
    display: block;
    width: 120px;
    line-height: 36px;
    border-radius: 3px;
    background-color: #ffcc00;
    text-align: center;
    color: #fff;
    font-size: 16px;
}
.add-link a{
    background-color: #70ca10;
}
/*table 表单*/ 
.table-box {
    /* width: 700px; */
    min-height: 590px;
    border-bottom: 1px #f7f7f7 solid;
    margin: 20px 0;
}
table {
    text-align: left;
    width: 100%;
    color: #333;
    border-collapse:collapse;
}

tr {
    font-size:14px; 
}
tr:nth-child(odd){
    background-color: #f7f7f7;
}
tr td {
    padding: 20px 30px;
}
.table-title {
    font-size: 16px;
    font-weight: bold;
}
.td-edit {
    display: flex;
    justify-content: space-between;
}
.table-edit {
    color:#00BFFF;
}
.table-remove {
    color:red;
}

/*操作确认*/
.list-hint {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    z-index: 88;
}

.list-hint-box {
    width: 200px;
    height: 120px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
}
.list-hint-box .p1 {
    height: 80px;
    line-height: 80px;
    border-bottom: 1px #ddd solid;
    font-size: 16px;
    color: #666;
}
.list-hint-box .p2 {
    height: 40px;
}
.list-hint-box .p2 a {
    display: inline-block;
    width: 50%;
    transition-duration: 600ms;
    color: red;
    font-size: 14px;
    line-height: 40px;
}
.list-hint-box .p2 a:first-child {
    border-right: 1px #ddd solid;
    color: deepskyblue;
}
.list-hint-box .p2 a:hover {
    background-color: #efefef;
}
</style>

