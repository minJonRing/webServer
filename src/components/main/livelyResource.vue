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
                    <input type="text" id="laydaystart" name="daystart" readonly="readonly" placeholder="请选择起始时间">
                    <!-- <input v-show="rangeVal == 'month'" type="text" id="laymonthstart" name="monthstart" readonly="readonly" placeholder="请选择起始时间">
                    <input v-show="rangeVal == 'year'" type="text" id="layyearstart" name="yearstart" readonly="readonly" placeholder="请选择起始时间"> -->
                </div>
                <p>—</p>
                <div class="input-box-date">
                    <input type="text" id="laydayend" name="dayend" readonly="readonly" placeholder="请选择结束时间">
                    <!-- <input v-show="rangeVal == 'month'" type="text" id="laymonthend" name="monthend" readonly="readonly" placeholder="请选择结束时间">
                    <input v-show="rangeVal == 'year'" type="text" id="layyearend" name="yearend" readonly="readonly" placeholder="请选择结束时间"> -->
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
    import {listen,set_start,set_end} from "./table/ajax.js"
    import {mapGetters,mapActions} from "vuex";

    var now = new Date();
    var default_option = {
                    start_min: {
                        year: 1970,
                        month: 0,
                        date: 1,
                    },
                    start_max: {
                        'date': {
                            'year': now.getFullYear(),
                            'month': now.getMonth(),
                            'date': now.getDate()
                        },
                        'month': {
                            'year': now.getFullYear(),
                            'month': now.getMonth()
                        },
                        'year': {
                            'year': now.getFullYear()
                        }
                    },
                    end_min: {
                        year: 1970,
                        month: 0,
                        date: 1,
                    },
                    end_max: {
                        'date': {
                            'year': now.getFullYear(),
                            'month': now.getMonth(),
                            'date': now.getDate()
                        },
                        'month': {
                            'year': now.getFullYear(),
                            'month': now.getMonth()
                        },
                        'year': {
                            'year': now.getFullYear()
                        }
                    },
                }
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
                    {name:"day",id:"date",txt:"天"},
                    {name:"month",id:"month",txt:"月"},
                    {name:"year",id:"year",txt:"年"},
                ],
                rangeVal:'date',
                tableData:"",
                start_laydate:"",
                end_laydate:"",
                dataType : {
                    "date": 'yyyy-MM-dd',
                    "month": 'yyyy-MM',
                    "year": 'yyyy',
                },
                
            }
        },
        mounted(){
            // 天数选择
            //常规用法
            let _this = this;
            
            var type = this.rangeVal;
            var $start_date = $("#laydaystart"),$end_date = $("#laydayend");
            this.start_laydate = laydate.render({
                elem: "#laydaystart",
                max: 0,
                type: type,
                format: 'yyyy-MM-dd',
                showBottom: true,
                btns:["clear"],
                done: function (value, date, endDate) {
                    set_start($start_date,value, date, endDate,_this.rangeVal,_this.end_laydate,now)
                    if ($start_date.val() == ''){
                        _this.end_laydate.config.min = default_option['end_min'];
                        _this.end_laydate.config.max = default_option['end_max'][_this.rangeVal];
                    }
                },
                change: function (value,date,endDate) {
                    $start_date.val(value,date);
                    set_start($start_date,value, date, endDate,_this.rangeVal,_this.end_laydate,now)
                    $('.layui-laydate-list').on('click', 'li', function () {
                        $('.layui-laydate').hide();
                    });
                    if ($start_date.val() == ''){
                        _this.end_laydate.config.min = default_option['end_min'];
                        _this.end_laydate.config.max = default_option['end_max'][_this.rangeVal];
                    }
                }
            });
            this.end_laydate = laydate.render({
                elem: "#laydayend",
                type: type,
                max: 0,
                format: 'yyyy-MM-dd',
                showBottom: true,
                btns:["clear"],
                done: function (value, date, endDate) {
                    set_end($end_date,value, date, endDate,_this.rangeVal,_this.start_laydate);
                    if ($end_date.val() == ''){
                        _this.start_laydate.config.min = default_option['end_min'];
                        _this.start_laydate.config.max = default_option['end_max'][_this.rangeVal];
                    }
                },
                change: function (value,date,endDate) {
                    set_end($end_date,value, date, endDate,_this.rangeVal,_this.start_laydate);
                    $end_date.val(value,date);
                    $('.layui-laydate-list').on('click', 'li', function () {
                        $('.layui-laydate').hide();
                    });
                    if ($end_date.val() == ''){
                        _this.start_laydate.config.min = default_option['start_min'];
                        _this.start_laydate.config.max = default_option['start_max'][_this.rangeVal];
                    }
                }
            });
            // let nowDate = new Date(),nowYear = nowDate.getFullYear(),nowMonth = nowDate.getMonth()+1,nowDay = nowDate.getDate()
            // var startDay =  laydate.render({elem: "#laydaystart",max:nowYear+'-'+nowMonth+'-'+nowDay,done:function(value,dates){
            //     let day = nowDay;
            //     if(dates.month < nowMonth || dates.year < nowYear){
            //         day = new Date(dates.year,dates.month,0).getDate();
            //     }
            //     endDay.config.min ={year:dates.year,month:dates.month-1,date: dates.date}
            //     endDay.config.max ={year:dates.year,month:dates.month-1,date: day}
            //     console.log(dates)
            // }});
            // var endDay =  laydate.render({elem: "#laydayend",max:nowYear+'-'+nowMonth+'-'+nowDay,done:function(value,dates){
            //     startDay.config.min ={year:dates.year,month:dates.month-1,date: 1}
            //     startDay.config.max ={year:dates.year,month:dates.month-1,date: dates.date}
            // }});
            // 月份选择
            // var startMonth =  laydate.render({elem: "#laymonthstart",type: "month",max:nowYear+'-'+nowMonth+'-'+nowDay,showBottom: false,done:function(value, date, endDate){
            //     console.log(value)
                
            // },change: function(value,dates){
            //     $('#laymonthstart').val(value);
            //     $('.layui-laydate').hide()
            // }});
            // var endMonth = laydate.render({elem: "#laymonthend",type: "month",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
            //     $('#laymonthend').val(value);
            //     $('body').click()
            // }});
            // 年份选择
            // var startYear =  laydate.render({elem: "#layyearstart",type: "year",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
            //     endYear.config.min ={year:dates.year}
            //     $('#layyearstart').val(value);
            //     $('body').click()
            // }});
            // var endYear = laydate.render({elem: "#layyearend",type: "year",max:nowYear+'-'+nowMonth+'-'+nowDay,change: function(value,dates){
            //     startYear.config.max ={year:dates.year}
            //     $('#layyearend').val(value);
            //     $('body').click()
            // }});
            // 点击body 隐藏多选框
            document.body.addEventListener('click',()=>{ 
                this.isSelect = false;
                this.isDitch = false;
            });
            // 
            $.ajax({
                url:webUrl+"/active/getData",
                type:"POST",
                dataType:"JSON",
                success:(res)=>{
                    this.tableData = res.data.list;
                }
            })
            // 异步更新数据
            setTimeout(()=>{
                this.selectList = this.getWeb ;
                this.ditchList = this.getGroup ;
            },1000)
        },
        watch:{
            "rangeVal":function(val){
                $("#laydaystart").val('');
                $("#laydayend").val('');
                this.start_laydate.config.type = val;
                this.end_laydate.config.type = val;
                this.start_laydate.config.format = this.dataType[val];
                this.end_laydate.config.format = this.dataType[val];

                this.end_laydate.config.min = default_option['end_min'];
                this.end_laydate.config.max = default_option['end_max'][val];
                this.start_laydate.config.min = default_option['start_min'];
                this.start_laydate.config.max = default_option['start_max'][val];
            }
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
                let startTime = document.querySelector("#laydaystart").value;
                let endTime = document.querySelector("#laydayend").value;
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

