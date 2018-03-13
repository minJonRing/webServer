<template>
  <div class="fixedDitch">
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
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                    {type:"搜索引擎",name:"2345导航",source:"2345dh",pattem:"2345.com"},
                ],
                pageArr:[],
                page:1,
                add:1,
                L:1
            }
        },
        watch:{
            "page":function(val){
                let num = (val+'').replace(/[^0-9]/g,"");
                this.page = num > this.L?this.L:num;
            },
            "add":function(val){
                let num;
                console.log(val)
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
        },
        methods:{
            filterData(num){
                let i = num-1;
                this.pageArr = [].concat(this.arr.slice(9*i,9*num));
            },
            prev(){
                this.add--
            },
            next(){
                this.add++
            },
            gowill(){
                this.add = this.page
            }
        }
    }
</script>

<style scoped>
.table-box {
    width: 700px;
    height: 590px;
    border-bottom: 1px #f7f7f7 solid;
}
table {
    text-align: left;
    width: 700px;
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
    width: 700px;
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

