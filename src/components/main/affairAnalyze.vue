<template>
    <div class="affair-analyze">
        <div class="resource-search">
            <div class="search-resource flex flex-mid" v-for="(item,index) in imitateSelect" :key="index">
                <p>{{item.title}}</p>
                <div class="imitate-select">
                    <div class="imitate-select-cont" @click.stop="item.isShow = !item.isShow">
                        <p class="flex-1">{{item.cont}}</p>
                        <i class="iconfont icon-zheng-triangle" :class="{'recover':item.isShow}"></i>
                    </div>
                    <div :class="['imitate-select-list',{'imitate-select-list-show':item.isShow}]">
                        <ul>
                            <li v-for="(val,key,i) in item.list" :key="i"><a href="javascript:" @click="copySelect($event,{name:val,id:index,key:key})">{{val}}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- <div class="search-resource flex flex-mid">
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
            <div class="search-resource flex flex-mid">
                <p>事件类型</p>
                <div class="imitate-select">
                    <div class="imitate-select-cont" @click.stop="isAffair = !isAffair">
                        <p class="flex-1">{{affairCont}}</p>
                        <i class="iconfont icon-zheng-triangle" :class="{'recover':isAffair}"></i>
                    </div>
                    <div :class="['imitate-select-list',{'imitate-select-list-show':isAffair}]">
                        <ul>
                            <li v-for="(item,index) in affairList" :key="index"><a href="javascript:" @click="copyAffair($event,item.txt)">{{item.txt}}</a></li>
                        </ul>
                    </div>
                </div>
            </div> -->
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
            <v-table :ajaxData="tqr"></v-table>
        </div>
    </div>
</template>
<script>
    import VTable from './table/table';
    import ajaxData from "./table/ajax";

    import {mapGetters} from "vuex";

    export default {
        name:"affair-analyze",
        data(){
            return {
                // isSelect:false,
                // selectCont:"请选择推广资源",
                // selectList:[{txt:"请选择推广资源"},{txt:"a"},{txt:"b"},{txt:"c"},{txt:"d"}],
                // isDitch:false,
                // ditchCont:"请选择渠道组",
                // ditchList:[{txt:"请选择渠道组"},{txt:"360"},{txt:"百度"},{txt:"谷歌"},{txt:"搜狐"}],
                // isAffair:false,
                // affairCont:"全部",
                // affairList:[{txt:"全部"},{txt:"登录"},{txt:"注册"},{txt:"预约"}],

                imitateSelect:[
                    {title:"推广资源",cont:"全部",isShow:false,key:0,list:{}},
                    {title:"渠道组",cont:"全部",isShow:false,key:0,list:{}},
                    {title:"事件类型",cont:"全部",isShow:false,key:0,list:{
                        0:"全部",1:"登录",2:"注册",3:"预约",4:"分享"
                    }}
                ],
                selectRange:[
                    {name:"day",id:"day",txt:"天"},
                    {name:"month",id:"month",txt:"月"},
                    {name:"year",id:"year",txt:"年"},
                ],
                rangeVal:"day",
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
                this.imitateSelect.map((el)=>{
                    el.isShow = false;
                })
            });

            this.imitateSelect[0].list = this.getWeb;
            this.imitateSelect[1].list = this.getGroup;

            console.log(this.imitateSelect)
        },
        watch:{
        },
        computed:{
            ...mapGetters(['getWeb','getGroup'])
        },
        methods:{
            copySelect(event,val){
                this.imitateSelect[val.id].isShow = false;
                this.imitateSelect[val.id].cont = val.name;
                this.imitateSelect[val.id].key = val.key;
            },
            submitData(){
                let startIdName = this.rangeVal =="day"?"#laydaystart":this.rangeVal =="month"?"#laymonthstart":"#layyearstart";
                let endIdName = this.rangeVal == "day"?"#laydayend":this.rangeVal =="month"?"#laymonthend":"#layyearend";
                let startTime = document.querySelector(startIdName).value;
                let endTime = document.querySelector(endIdName).value;
                let data = {
                    web:this.imitateSelect[0].key,
                    search_engine:this.imitateSelect[1].key,
                    state:this.imitateSelect[2].key,
                    type:this.rangeVal,
                    start_time:startTime,
                    end_time:endTime
                }
                console.log(data)
            }
        },
        components:{
            VTable:VTable
        }
    }
</script>
