<template>
    <div class="lively-resource">
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
                            <li v-for="(val,key,index) in selectList" :key="index"><a href="javascript:" @click="copySelect($event,{el:val,key:key})">{{val}}</a></li>
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
                            <li v-for="(val,key,index) in ditchList" :key="index"><a href="javascript:" @click="copyDitch($event,{el:val,key:key})">{{val}}</a></li>
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
                    <input v-show="rangeVal == 'day'" type="text" id="laydaystart" name="daystart" readonly="readonly" placeholder="请选择起始时间">
                    <input v-show="rangeVal == 'month'" type="text" id="laymonthstart" name="monthstart" readonly="readonly" placeholder="请选择起始时间">
                    <input v-show="rangeVal == 'year'" type="text" id="layyearstart" name="yearstart" readonly="readonly" placeholder="请选择起始时间">
                </div>
                <p>—</p>
                <div class="input-box-date">
                    <input v-show="rangeVal == 'day'" type="text" id="laydayend" name="dayend" readonly="readonly" placeholder="请选择结束时间">
                    <input v-show="rangeVal == 'month'" type="text" id="laymonthend" name="monthend" readonly="readonly" placeholder="请选择结束时间">
                    <input v-show="rangeVal == 'year'" type="text" id="layyearend" name="yearend" readonly="readonly" placeholder="请选择结束时间">
                </div>
            </div>
            <div class="search-submit">
                <a href="javascript:" @click="submitData">查询</a>
            </div>
        </div>
        <div class="table-box">
            <v-table :ajaxData="tableData"></v-table>
        </div>
    </div>
</template>

<script>
    import VTable from './table/table';
    import ajaxData from "./table/ajax";
    import {mapGetters,mapActions} from "vuex";
// console.log(laydate)
    
    export default {
        name:"lively-resource",
        data(){
            return {
                isSelect:false,
                selectCont:"请选择推广资源",
                selectList:"",
                selectKey:0,
                isDitch:false,
                ditchCont:"请选择渠道组",
                ditchList:"",
                ditch:0,
                selectRange:[
                    {name:"day",id:"day",txt:"天"},
                    {name:"month",id:"month",txt:"月"},
                    {name:"year",id:"year",txt:"年"},
                ],
                rangeVal:'day',
                tableData:""
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
            // 
            this.$axios.post("http://api.wildog.cn/active/getData").then((res)=>{
                this.tableData = res.data.data.list;
            }).catch((err)=>{
            })

            this.selectList = this.getWeb || "";
            this.ditchList = this.getGroup || "";
            
        },
        watch:{
        },
        computed:{
            ...mapGetters(['getWeb','getGroup'])
        },
        methods:{
            ...mapActions(['setHint']),
            copySelect(event,val){
                this.selectCont = val.el;
                this.selectKey = val.key;
                this.isSelect = false;
            },
            copyDitch(event,val){
                this.ditchCont = val.el;
                this.ditchKey = val.key;
                this.isDitch = false;
            },
            submitData(){
                let startIdName = this.rangeVal == 'day'?"#laydaystart":this.rangeVal =='month'?"#laymonthstart":"#layyearstart";
                let endIdName = this.rangeVal == 'day'?"#laydayend":this.rangeVal =='month'?"#laymonthend":"#layyearend";
                let startTime = document.querySelector(startIdName).value;
                let endTime = document.querySelector(endIdName).value;
                let data = {
                    web:this.selectKey,
                    search_engine:this.ditchKey,
                    type:this.rangeVal,
                    start_time:startTime,
                    end_time:endTime
                }
                // this.$axios.post("http://api.wildog.cn/active/getData",data).then((res)=>{
                //     this.tableData = res.data.data.list;
                //     this.setHint({txt:"请求成功",className:"hint-success"})
                // }).catch((err)=>{
                //     this.setHint({txt:"请求失败",className:"hint-error"})
                // })
                console.log(data)
                let _this = this;
                $.ajax({
                    url:"http://api.wildog.cn/active/getData",
                    type:"POST",
                    data:data,
                    success:function(res){
                        _this.setHint({txt:"请求成功",className:"hint-success"})
                        _this.tableData = res.data.list;
                    }
                })
            }
        },
        components:{
            VTable:VTable
        }
    }
</script>

<style scoped>
.search-submit a {
    transition-duration: 600ms;
}
</style>

