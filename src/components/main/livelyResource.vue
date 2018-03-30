<template>
    <div class="lively-resource">
        <div class="resource-search">
            <div class="search-resource flex flex-mid">
                <p>推广资源</p>
                <div class="imitate-select">
                    <div class="imitate-select-cont" @click.stop="bindChangeSelect">
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
                    <div class="imitate-select-cont" @click.stop="bindChangeDitch">
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
            let nowDate = new Date(),nowYear = nowDate.getFullYear(),nowMonth = nowDate.getMonth()+1,nowDay = nowDate.getDate()
            var startDay =  laydate.render({elem: "#laydaystart",max:nowYear+'-'+nowMonth+'-'+nowDay,done:function(value,dates){
                endDay.config.min ={year:dates.year,month:dates.month-1,date: dates.date}
                endDay.config.max ={year:dates.year,month:dates.month-1,date: nowDay}
            }});
            var endDay =  laydate.render({elem: "#laydayend",max:nowYear+'-'+nowMonth+'-'+nowDay,done:function(value,dates){
                startDay.config.min ={year:dates.year,month:dates.month-1,date: 1}
                startDay.config.max ={year:dates.year,month:dates.month-1,date: dates.date}
            }});
            // 月份选择
            var startMonth =  laydate.render({elem: "#laymonthstart",type: "month",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
                endMonth.config.min ={year:dates.year,month:dates.month-1}
                endMonth.config.max ={year:dates.year,month:nowMonth-1}
                $('#laymonthstart').val(value);
                $('body').click()
            }});
            var endMonth = laydate.render({elem: "#laymonthend",type: "month",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
                startMonth.config.min ={year:dates.year,month:0}
                startMonth.config.max ={year:dates.year,month:dates.month-1}
                $('#laymonthend').val(value);
                $('body').click()
            }});
            // 年份选择
            var startYear =  laydate.render({elem: "#layyearstart",type: "year",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
                endYear.config.min ={year:dates.year}
                $('#layyearstart').val(value);
                $('body').click()
            }});
            var endYear = laydate.render({elem: "#layyearend",type: "year",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
                startYear.config.max ={year:dates.year}
                $('#layyearend').val(value);
                $('body').click()
            }});
            // 点击body 隐藏多选框
            document.body.addEventListener('click',()=>{ 
                this.isSelect = false;
                this.isDitch = false;
            });
            // 
            this.$axios.post(webUrl+"/active/getData").then((res)=>{
                this.tableData = res.data.data.list;
            }).catch((err)=>{
            })
            // 异步更新数据
            setTimeout(()=>{
                this.selectList = this.getWeb ;
                this.ditchList = this.getGroup ;
            },1000)
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
                console.log(data)
                let _this = this;
                $.ajax({
                    url:webUrl+"/active/getData",
                    type:"POST",
                    data:data,
                    dataType:"JSON",
                    success:function(res){
                        _this.setHint({txt:"请求成功",className:"hint-success"})
                        _this.tableData = res.data.list;
                        
                    }
                })
            },
            bindChangeSelect(){
                this.isSelect = !this.isSelect;
                this.isDitch = false;
            },
            bindChangeDitch(){
                this.isDitch = !this.isDitch;
                this.isSelect = false;
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

