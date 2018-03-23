<template>
    <div class="affair-analyze">
        <div class="resource-search">
            <div class="search-resource flex flex-mid">
                <p>推广资源</p>
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
                <p>渠道组</p>
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
            <div class="seaarch-time flex flex-mid">
                <p>时间类型</p>
                <label class="flex flex-mid" :for="item.name" v-for="(item,index) in selectRange" :key="index">
                    <div class="input-box-radio">
                        <input type="radio" name="time" :value="item.id" v-model="rangeVal" :id="item.name">
                        <span></span>
                    </div>
                    <span>{{item.txt}}</span>
                </label>
            </div>
            <div class="search-time-scope flex flex-mid">
                <p>时间范围</p>
                <div class="input-box-date" >
                    <input v-show="rangeVal == 1" type="text" id="laydaystart" name="daystart" readonly="readonly" placeholder="请选择起始时间">
                    <input v-show="rangeVal == 2" type="text" id="laymonthstart" name="monthstart" readonly="readonly" placeholder="请选择起始时间">
                    <input v-show="rangeVal == 3" type="text" id="layyearstart" name="yearstart" readonly="readonly" placeholder="请选择起始时间">
                </div>
                <p>—</p>
                <div class="input-box-date">
                    <input v-show="rangeVal == 1" type="text" id="laydayend" name="dayend" readonly="readonly" placeholder="请选择结束时间">
                    <input v-show="rangeVal == 2" type="text" id="laymonthend" name="monthend" readonly="readonly" placeholder="请选择结束时间">
                    <input v-show="rangeVal == 3" type="text" id="layyearend" name="yearend" readonly="readonly" placeholder="请选择结束时间">
                </div>
            </div>
            <div class="search-submit">
                <a href="javascript:" @click="submitData">查询</a>
            </div>
        </div>
        <div class="table-box">
            <v-table :ajaxData="tqr"></v-table>
        </div>
    </div>
</template>
<script>
    import VTable from './table/table';
    import ajaxData from "./table/ajax"

    export default {
        name:"affair-analyze",
        data(){
            return {
                isSelect:false,
                selectCont:"请选择推广资源",
                selectList:[{txt:"请选择推广资源"},{txt:"a"},{txt:"b"},{txt:"c"},{txt:"d"}],
                isDitch:false,
                ditchCont:"请选择渠道组",
                ditchList:[{txt:"请选择渠道组"},{txt:"360"},{txt:"百度"},{txt:"谷歌"},{txt:"搜狐"}],
                selectRange:[
                    {name:"day",id:1,txt:"天"},
                    {name:"month",id:2,txt:"月"},
                    {name:"year",id:3,txt:"年"},
                ],
                rangeVal:1,
                tqr:ajaxData
            }
        },
        mounted(){
            // 天数选择
            var startDay =  laydate.render({elem: "#laydaystart",done:function(value,dates){
                endDay.config.min ={year:dates.year,month:dates.month-1,date: dates.date}
                endDay.config.max ={year:dates.year,month:dates.month-1,date: 31}
            }});
            var endDay =  laydate.render({elem: "#laydayend"});
            // 月份选择
            var startMonth =  laydate.render({elem: "#laymonthstart",type: "month",done:function(value,dates){
                endMonth.config.min ={year:dates.year,month:dates.month-1}
                endMonth.config.max ={year:dates.year,month:11}
            }});
            var endMonth = laydate.render({elem: "#laymonthend",type: "month"});
            // 年份选择
            var startYear =  laydate.render({elem: "#layyearstart",type: "year",done:function(value,dates){
                endYear.config.min ={year:dates.year}
            }});
            var endYear = laydate.render({elem: "#layyearend",type: "year"});
            // 点击body 隐藏多选框
            document.body.addEventListener('click',()=>{ 
                this.isSelect = false;
                this.isDitch = false;
            });
        },
        watch:{
        },
        methods:{
            copySelect(event,val){
                this.selectCont = val;
                this.isSelect = false;
            },
            copyDitch(event,val){
                this.ditchCont = val;
                this.isDitch = false;
            },
            submitData(){
                let startIdName = this.rangeVal == 1?"#laydaystart":this.rangeVal ==2?"#laymonthstart":"#layyearstart";
                let endIdName = this.rangeVal == 1?"#laydayend":this.rangeVal ==2?"#laymonthend":"#layyearend";
                let startTime = document.querySelector(startIdName).value;
                let endTime = document.querySelector(endIdName).value;
                let data = {
                    a:this.selectCont,
                    b:this.ditchCont,
                    startTime:startTime,
                    endTime:endTime
                }
                console.log(data)
            }
        },
        components:{
            VTable:VTable
        }
    }
</script>
