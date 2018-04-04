<template>
  <div class="ditch">
        <!-- <input-select @getSelect="setData" :elName="'渠道组类型'" :txt="ajaxData.ajaxType" :propType="{type:'type'}" :hint="'请输入渠道组类型'" :list="list"></input-select> -->
        <div class="inputText">
            <span>*</span>
            <p>资源名称</p>
            <div class="input-box">
                <input type="text" name="name" v-model="name" placeholder="请输入渠道组匹配标识">
            </div>
            <i></i>
        </div>
        <div class="inputSelect" style="z-index:10">
            <span>*</span>
            <p>推广资源</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':view[0].isShow}"></i>
                <div class="copyModel" @click.stop="bindChange($event,0)">{{view[0].Cont}}</div>
                <ul :class="{'show-select':view[0].isShow}" @click.stop>
                    <li v-for="(val,key,index) in view[0].list" :key="index" @click="bindSelect($event,{val:val,key:key,index:0,selectUrl:true})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputSelect" style="z-index:9" v-show="isShowPopu">
            <span>*</span>
            <p>模块</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':view[1].isShow}"></i>
                <div class="copyModel" @click.stop="bindChange($event,1)">{{view[1].Cont}}</div>
                <ul :class="{'show-select':view[1].isShow}" @click.stop>
                    <li v-for="(item,index) in view[1].list[view[0].key]" :key="index" @click="bindSelect($event,{val:item.source_name,key:index,index:1,module:item.key,isInfo:true,url:item.url})">{{item.source_name}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputText" :class="{'show-name':!isShowName}">
            <span>*</span>
            <p>关键词</p>
            <div class="input-box" style="position:relative;z-index:8">
                <input type="text" name="name" v-model="keyName" @keyup="bindKey" placeholder="请输入渠道组匹配标识">
                <ul class="ajax-list" :class="{'show-ajax-list':isHaveSource}">
                    <li v-for="(item,index) in ajaxlist" :key="index" @click="bindSetKeyName($event,{name:item.title,url:item.url})">{{item.title}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputSelect" style="z-index:7">
            <span>*</span>
            <p>渠道组</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':view[2].isShow}"></i>
                <div class="copyModel" @click.stop="bindChange($event,2)">{{view[2].Cont}}</div>
                <ul :class="{'show-select':view[2].isShow}" @click.stop>
                    <li v-for="(val,key,index) in view[2].list" :key="index" @click="bindSelect($event,{val:val,key:key,index:2})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputSelect">
            <span>*</span>
            <p>渠道媒介</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':view[3].isShow}"></i>
                <div class="copyModel" @click.stop="bindChange($event,3)">{{view[3].Cont}}</div>
                <ul :class="{'show-select':view[3].isShow}" @click.stop>
                    <li v-for="(val,key,index) in view[3].list" :key="index" @click="bindSelect($event,{val:val,key:key,index:3})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="btn-box">
            <input-submit @getSubmit="bindCreate" :txt="'提交'" :color="'#ffcc00'"></input-submit>
            <input-submit @getSubmit="bindReturn" :txt="'返回'" :color="'deepskyblue'"></input-submit>
        </div>
  </div>
</template>

<script>
    import inputText from "./from/inputText"
    import inputSubmit from "./from/inputSubmit"
    import inputSelect from "./from/inputSelect"
    import inputRadio from "./from/inputRadio"
    import bus from "./js/a.js"
    import {mapActions} from "vuex"
    export default {
        name:"ditch",
        props:["searchUrl","popu"],
        data(){
            return {
                view:[
                    {Cont:"请选择",isShow:false,list:{},key:0},
                    {Cont:"请选择",isShow:false,list:{},key:0},
                    {Cont:"请选择",isShow:false,list:{},key:0},
                    {Cont:"请选择",isShow:false,list:{},key:0},
                ],
                // 关键词
                keyName:"",
                // 资源名称
                name:"",
                // 模块
                module:"",
                // url链接
                sourceUrlList:{},
                sourceUrlAjax:"",
                sourceUrl:"",
                // 显示资源名称
                isShowName:false,
                // 延迟发送请求
                delay:"",
                // 是否显示详情搜索框
                isHaveSource:false,
                // 关键词搜索框匹配数据
                ajaxlist:[],
                // 是否显示推广资源
                isShowPopu:false
            }
        },
        mounted(){
            let _this = this;
            document.body.addEventListener('click',()=>{
                for(let i in this.view){
                    this.view[i].isShow =false;
                }
            })

            bus.$on("bindBrother",function () {
                _this.view[0].Cont = _this.view[1].Cont =_this.view[2].Cont =_this.view[3].Cont ="请选择";
                _this.view[0].key = _this.view[1].key =_this.view[2].key =_this.view[3].key =0;
                
                
                // 关键词
                _this.keyName="";
                // 资源名称
                _this.name="";
                // 模块
                _this.module="";
                // url链接
                _this.sourceUrl="";
                // 显示资源名称
                _this.isShowName=false;
                // 是否显示详情搜索框
                _this.isHaveSource=false;
                // 关键词搜索框匹配数据
                _this.ajaxlist=[];
                // 是否显示推广资源
                _this.isShowPopu=false
            })
        },
        watch:{
            "popu":function (val) {  
                this.view[0].list = this.popu.web_name;
                this.view[1].list = this.popu.module;
                this.view[2].list = this.popu.group;
                this.view[3].list = this.popu.medium;
                this.sourceUrlList = this.popu.web;
            },
                
        },
        computed:{
            group:function(){
                return this.popu.group;
            },
            medium:function(){
                return this.popu.medium
            }
        },
        methods:{
            ...mapActions(['setHint']),
            // 发送ajax请求
            bindCreate(){
                if(!this.name){
                    this.setHint({txt:"请输入资源名称",className:"hint-error"});
                    return ;
                }else if(!this.view[2].key){
                    this.setHint({txt:"请选推广资源",className:"hint-error"});
                    return ;
                }else if(!this.view[3].key){
                    this.setHint({txt:"请选择渠道组",className:"hint-error"});
                    return ;
                }else if(!this.sourceUrl){
                    this.setHint({txt:"请选渠道媒介",className:"hint-error"});
                    return ;
                }
                let _this = this;
                let _data = {
                    name:this.name,
                    group:this.view[2].key,
                    medium:this.view[3].key,
                    url:this.sourceUrl,
                    term:this.keyName
                }
                if(this.ajaxId){
                    _data.id = this.ajaxId;
                }else{
                    if(_data.id){
                        delete _data.id;
                    }
                }
                $.ajax({
                    url:_this.searchUrl+"saveData",
                    type:"POST",
                    data:_data,
                    dataType:"JSON",
                    success:(res)=>{
                        console.log(res)
                        if(res.status == 1){
                            this.ajaxId = 0;
                            this.bindReturn(true)
                            bus.$emit("bindUpdate")
                            this.setHint({txt:res.msg,className:"hint-success"})
                        }else{
                            this.setHint({txt:res.msg,className:"hint-error"})
                        }
                        
                    }
                })
            },
            // 返回
            bindReturn(val){
                this.$emit("getChild",val)
            },
            // select 选择
            bindSelect(event,val){
                for(let i in this.view){
                    if(i == val.index){
                        this.view[i].Cont = val.val;
                        this.view[i].key = val.key;
                    }
                }
                this.bindChange(event,val.index);

                // 推广资源网站地址选择
                if(val.selectUrl){
                    this.sourceUrlAjax = this.sourceUrlList[val.key];
                    this.isShowPopu = true;
                }
                // 关键字选择
                if(val.module){
                    this.sourceUrl = val.url;
                    this.module = val.module.replace(/(\:).+$/g,"");
                }
                if(val.isInfo){
                    this.keyName = val.val;
                    if(/(detail)/.test(val.module)){
                        this.keyName = "";
                        this.isShowName = true;
                    }else{
                        this.isShowName = false;
                    }
                }
                
            },
            bindChange(event,val){
                for(let i in this.view){
                    if(i == val){
                        this.view[i].isShow = !this.view[i].isShow;
                    }else{
                        this.view[i].isShow = false;
                    }
                }
            },
            bindKey(){
                $.ajax({
                    url:"http://"+this.sourceUrlAjax+"/site/select",
                    type:"POST",
                    data:{module:this.module,keyword:this.keyName},
                    dataType:"JSON",
                    success:(res)=>{
                        if(res.data.length > 0){
                            this.isHaveSource = true;
                            this.ajaxlist = res.data;
                        }else{
                            this.isHaveSource = false;
                        }
                    }
                })
                
            },
            bindSetKeyName(event,val){
                this.keyName = val.name;
                this.sourceUrl = val.url;
                this.isHaveSource = false;
            }
        },
        components:{
            // inputText:inputText,
            inputSubmit:inputSubmit,
            // inputSelect:inputSelect,
            // inputRadio:inputRadio
        }
    }
</script>

<style scoped>
.btn-box {
    display: flex;
    justify-content: space-between;
    width: 460px;
    text-align: left;
    padding-left: 140px;
}
.show-name {
    height: 0;
    padding: 0;
    overflow: hidden;
    z-index: 9;
}
.ajax-list {
    position: absolute;
    width: 100%;
    top: 48px;
    left: 0;
    border: 1px #e4e4e4 solid;
    border-radius: 6px;
    color: #333;
    padding: 6px 12px;
    background-color: #fff;
    text-align: left;
    opacity: 0;
    transition-duration: 600ms;
    transform: matrix(1,0,0,1,20,0);
    pointer-events: none;
}
.show-ajax-list {
    opacity: 1;
    transform: matrix(1,0,0,1,0,0);
    pointer-events: auto;
}
.ajax-list li {
    width: 100%;
    padding: 6px 0;
    border-bottom: 1px #e4e4ee dashed;
    cursor: pointer;
}
.ajax-list li:last-child {
    border: none;
}
</style>

