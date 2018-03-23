<template>
    <div class="fixedDitch">
        <div class="resource-search">
            <div class="search-resource flex flex-mid">
                <p>渠道组名称</p>
                <div class="imitate-select">
                    <div class="imitate-select-cont" @click.stop="isSelect = !isSelect">
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
            <div class="search-resource flex flex-mid">
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
            </div>
            <div class="search-submit">
                <a href="javascript:" @click="submitData">查询</a>
            </div>
            <div class="add-link">
                <a href="javascript:" @click="sendFather">
                    <i class="iconfont icon-jia"></i>
                    <span>新增</span>
                </a>
            </div>
        </div>
        <div class="table-box">
            <table border="0">
                <tr class="table-title">
                    <td>channel_type</td>
                    <td>channel_name</td>
                    <td>utm_source</td>
                    <td>pattern</td>
                </tr>
                <tr v-for="(item,index) in pageArr" :key="index">
                    <td>{{item.type}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.source}}</td>
                    <td>{{item.pattem}}</td>
                </tr>
            </table>
        </div>
        <div class="page flex flex-mid">
            <div class="page-number flex-1 flex flex-mid">
                <p>共{{arr.length}}条</p>
                <p>{{add}}/{{L}}页</p>
            </div>
            <div class="flex flex-mid">
                <a class="page-btn" :class="{'page-btn-over':add == 1}" href="javascript:" @click="prev">&lt;</a>
                <a class="page-btn" :class="{'page-btn-over':add == L}"  href="javascript:" @click="next">&gt;</a>
                <div class="flex flex-mid">
                    <p class="page-go">跳转到</p>
                    <input class="page-input" type="text" name="name" id="" v-model="page">
                    <a class="page-btn" href="javascript:" @click="gowill">GO</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"fixedDitch",
        data(){
            return {
                arr:[
                    {type:"搜索引擎",name:"360搜索",source:"360so",pattem:"so.com"},
                    {type:"搜索引擎",name:"搜狗",source:"sogou",pattem:"www.sogou.com"},
                    {type:"搜索引擎",name:"GOOGLE",source:"google",pattem:"www.google.com"},
                    {type:"搜索引擎",name:"百度搜索",source:"baidu",pattem:"www.baidu.com"},
                    {type:"搜索引擎",name:"雅虎",source:"yahoo",pattem:"yahoo.com"},
                    {type:"搜索引擎",name:"BING",source:"bing",pattem:"bing.com"},
                    {type:"搜索引擎",name:"神马搜索",source:"sm",pattem:"sm.com"},
                    {type:"搜索引擎",name:"265导航",source:"265dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"}
                ],
                // 当前页面数据
                pageArr:[],
                // input 跳转框数据
                page:1,
                // 当前页数
                add:1,
                // 分页数
                L:1,
                isSelect:false,
                selectCont:"请选择推广资源",
                selectList:[{txt:"请选择推广资源"},{txt:"a"},{txt:"b"},{txt:"c"},{txt:"d"}],
                isDitch:false,
                ditchCont:"请选择渠道组",
                ditchList:[{txt:"请选择渠道组"},{txt:"360"},{txt:"百度"},{txt:"谷歌"},{txt:"搜狐"}],
            }
        },
        watch:{
            "page":function(val){
                let num = (val+'').replace(/[^0-9]/g,"");
                this.page = num > this.L?this.L:num;
            },
            "add":function(val){
                let num;
                if(val < 1){
                    num = 1
                }else if(val > this.L){
                    num = this.L
                }else{
                    num = val
                }
                this.add = num;
                this.filterData(num)
            }
        },
        mounted(){
            this.L = Math.ceil(this.arr.length/9);
            this.filterData(1)
            document.body.addEventListener("click",()=>{
                this.isSelect = this.isDitch = false;
            })
        },
        methods:{
            // 筛选当前页码数据
            filterData(num){
                let i = num-1;
                this.pageArr = [].concat(this.arr.slice(9*i,9*num));
            },
            // 上一页
            prev(){
                this.add--
            },
            // 下一页
            next(){
                this.add++
            },
            // 跳页
            gowill(){
                this.add = this.page
            },
            // 查询
            submitData(){

            },
            // 给父元素通报事件
            sendFather(){
                this.$emit("getChild")
            },
            // 渠道组名称选择
            copySelect(event,data){
                this.selectCont  =data
            },
            // 渠道组标识选择
            copyDitch(event,data){
                this.ditchCont = data
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
    z-index: 9;
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
    height: 590px;
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
/*跳转*/
.page {
    /* width: 700px; */
    padding: 11px 0;
    font-size: 14px;
    color: #333;
}
.page-number p{
    padding: 0 6px;
}
.page-btn {
    border: 1px #e4e4e4 solid;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 38px;
    color: #333;
    margin: 0 5px;
    transition-duration: 600ms;
}
.page-input {
    width: 50px;
    height: 40px;
     border: 1px #e4e4e4 solid;
    border-radius: 5px;
    line-height: 38px;
    padding: 0 6px;
}
.page-go {
    padding: 0 12px;
}

.page-btn:hover {
    background-color: #f5f5f5;
    color: deepskyblue;
}

.page-btn-over {
    background-color: #f7f7f7;
}
</style>

