<template>
  <div class="table-chart">
      <table border="0">
            <tr class="table-title">
                <td v-for="(item,index) in filetrArr" :key="index">
                    <div class="table-title-txt">
                        <p>{{item.txt}}</p>
                        <i v-if="item.icon" :class="['iconfont','icon-zheng-triangle', {'icon-rotate':item.sort}]" @click="bindSort($event,{id:item.id,sort:item.sort,type:item.type})"></i>
                        <div class="affairType" v-if="item.switchover" @click="bindSort($event,{id:item.id,sort:item.sort,type:item.type})">
                            <span>{{affairTxt}}</span>
                            <i :class="['iconfont','icon-zheng-triangle',{'i':item.sort}]"></i>
                            <ul :class="['affairTyoe-list',{'ul':item.sort}]" @click.stop>
                                <li @click="item.sort = !item.sort;affairTxt='全部'">全部</li>
                                <li @click="item.sort = !item.sort;affairTxt='登录'">登录</li>
                                <li @click="item.sort = !item.sort;affairTxt='注册'">注册</li>
                                <li @click="item.sort = !item.sort;affairTxt='预约'">预约</li>
                            </ul>
                        </div>
                    </div>
                    <div class="table-title-icon">
                        <span v-for="(el,i) in item.icon" :key="i" @click="bindDraw($event,{id:el.id,type:item.type,title:item.txt})">
                            <svg class="icon" aria-hidden="true">
                                <use :xlink:href="el.name"></use>
                            </svg>
                        </span>
                    </div>
                </td>
            </tr>
            <tr class="table-main" v-for="(item,index) in showData" :key="index">
                <td>{{item.time}}</td>
                <td>{{item.browse}}</td>
                <td>{{item.visit}}</td>
                <td>{{affairTxt}}</td>
                <td>{{item[affairNum]}}</td>
                <td>{{item[affairPercentage]+"%"}}</td>
                <td>{{item.stayTime}}</td>
                <td>{{item.averageStay+"%"}}</td>
            </tr>
      </table>
      <!-- <page @switchPage="resetData" :dataLength="initData.length" :nowPage="pageNumber"></page> -->
      <highcharts v-if="isShowChart" :drawdata="drawChart" @getIsShowChart="setIsShowChart"></highcharts>
  </div>
</template>

<script>
window.tqr;
    import '@/assets/icon/iconfont.js';
    import Highcharts from '../highcharts';
    import Page from '../page'
    // import ajaxData from './ajax.js'
    // import {dataClassification , dataExtract} from './data'
    import {dataClassification} from './data1'
    export default {
        name:"table-chart",
        props:["ajaxData"],        
        data(){
            return {
                filetrArr:[
                    {txt:"时间",id:0},
                    {txt:"浏览量",id:1,sort:false,type:"browse",icon:[{name:"#icon-icon",id:1},{name:"#icon-zhuzhuangtu",id:2},{name:"#icon-zhexiantu",id:3}]},
                    {txt:"访客量",id:2,sort:false,type:"visit",icon:[{name:"#icon-icon",id:1},{name:"#icon-zhuzhuangtu",id:2},{name:"#icon-zhexiantu",id:3}]},
                    {txt:"事件",id:3,sort:false,switchover:true},
                    {txt:"事件发生数",id:4,sort:false,type:"affair",icon:[{name:"#icon-icon",id:1},{name:"#icon-zhuzhuangtu",id:2},{name:"#icon-zhexiantu",id:3}]},
                    {txt:"转化率",id:5,sort:false,type:"percentage",icon:[{name:"#icon-icon",id:1},{name:"#icon-zhuzhuangtu",id:2},{name:"#icon-zhexiantu",id:3}]},
                    {txt:"停留时长",id:6,sort:false,type:"stayTime",icon:[{name:"#icon-icon",id:1},{name:"#icon-zhuzhuangtu",id:2},{name:"#icon-zhexiantu",id:3}]},
                    {txt:"平均停留时长",id:7,sort:false,type:"averageStay",icon:[{name:"#icon-icon",id:1},{name:"#icon-zhuzhuangtu",id:2},{name:"#icon-zhexiantu",id:3}]}
                ],
                // 当前页码展示数据
                showData:[],
                // 用于展示给用户看的数据
                filterData:[],
                // 初始化数据(开发者使用的数据 未剪裁)
                initData:[],
                // 图标绘制数据
                drawChart:{},
                // 是否绘制图标
                isShowChart:false,
                // 事件类型
                affairType:0,
                // 事件的中文名称
                affairTxt:"全部",
                // 事件json属性 获取发生数
                affairNum:"affair",
                affairPercentage:"affairAll"
                
            }
        },
        mounted(){
            // this.initData = dataClassification(ajaxData)
            this.initData = dataClassification(this.ajaxData);
            console.log(this.initData)
            this.filterData = this.initData.tt1
        },
        watch:{
            // 监听事件选项变化(事件选项变化 改变 用户展示数据)  
            "affairTxt":function (val) {
                if(val == "全部"){
                    this.affairNum="affair";
                    this.affairPercentage="affairAll";
                }else if(val == "登录"){
                    this.affairNum="login";
                    this.affairPercentage="affairLogin";
                }else if(val == "注册"){
                    this.affairNum="sign";
                    this.affairPercentage="affairSign";
                }else if(val == "预约"){
                    this.affairNum="order";
                    this.affairPercentage="affairOrder";
                }
            },
            // 监听用户数据展示变化(用户展示数据变化 改变 当前页码数页面的数据)
            "filterData":function(val){
                this.showData = [].concat(val)
            }
        },
        methods:{
            // 数据排序
            bindSort(event,data){
                let bl = this.filetrArr[data.id].sort;
                this.filetrArr[data.id].sort = !bl;
                if(!data.switchover){
                    let type = data.type;
                    if(type == "percentage"){
                        type = this.affairPercentage;
                    }
                    if(type == "affair"){
                        type = this.affairNum;
                    }
                    if(!bl){
                        this.showData.sort((x,y)=>{
                            return  (y[type]-0) - (x[type]-0);
                        })
                        
                    }else{
                        this.showData.sort((x,y)=>{
                            return  (x[type]-0) - (y[type]-0);
                        })
                    }
                }
            },
            // 绘制图表
            bindDraw(event,data){
                console.log(data)
                console.log(this.showData)
                let series = {name:data.title,dataY:[{data:[]}],dataX:[]};
                let type = data.type;
                if(type == "percentage"){
                    type = this.affairPercentage;
                }
                if(type == "affair"){
                    type = this.affairNum;
                }
                for(let i of this.showData){
                    series.dataY[0].data.push(i[type])
                    series.dataX.push(i["time"])
                }
                console.log(series)
                this.drawChart = {type:data.id,titleY:data.title,series:series}
                this.isShowChart = true;
            },
            // 设置图表影藏
            setIsShowChart(){
                this.isShowChart = false;
            }
        },
        components:{
            Highcharts:Highcharts,
            Page:Page
        }
    }
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
table td {
    padding: 15px;
}
.icon {
   width: 1em; height: 1em;
   vertical-align: -0.15em;
   fill: currentColor;
   overflow: hidden;
}
.table-title td{
    font-size: 16px;
    color: #333;
    
}
table tr:nth-child(odd) {
    background-color: #f7f7f7;
}
.table-title-txt {
    display: flex;
    align-content: center;
    padding-bottom: 10px;
}
.table-title-txt i {
    padding: 0 6px;
    color: #999;
    transition-duration: 600ms;
}
.table-title-txt i::after {
    display: inline-block;
    height: 100%;
    content: "";
    vertical-align: middle;
}
.table-title-txt span {
    font-size: 12px;
    /* line-height: 22px; */
}

.table-title-icon {
    display: flex;
    align-content:center;
    height: 18px;
}
.table-title-icon span {
    padding-right:20px; 
}
.icon-rotate {
    transform: rotate(180deg);
}
/*table-main*/
.table-main {
    font-size: 14px;
    color: #333;
    text-align: left;
}

/*事件 选项*/
.affairType {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding-left: 8px;
    border: 1px rgb(252, 173, 2) solid;
    border-radius: 3px;
    margin-left: 6px; 
}
.affairType i {
    transition-duration: 600ms;
    transform: matrix(.8,0,0,.8,0,0);
}
.affairType i.i {
    transform: matrix(-.8,0,0,-.8,0,0);
} 
.affairType ul {
    position: absolute;
    width: 100%;
    top: 21px;
    left: 0;
    border: 1px rgb(252, 173, 2) solid;
    border-radius: 3px;
    background-color: #f7f7f7;
    transition-duration: 600ms;
    opacity: 0;
    transform: matrix(1,0,0,1,20,0);
    pointer-events:none;
}
.affairType ul.ul {
    opacity: 1;
    transform: matrix(1,0,0,1,0,0);
    pointer-events:auto;
}
.affairType ul li {
    cursor: pointer;
    padding: 2px 0;
    transition-duration: 300ms;
    border-bottom: 1px #999 dashed;
}
.affairType ul li:last-child{
    border: none;
}
.affairType ul li:hover{
    background-color: #666;
    color: #fff;
}
</style>

