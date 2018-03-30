<template>
  <div class="ditch">
        <!-- <input-select @getSelect="setData" :elName="'渠道组类型'" :txt="ajaxData.ajaxType" :propType="{type:'type'}" :hint="'请输入渠道组类型'" :list="list"></input-select> -->
        <div class="inputSelect" style="z-index:9">
            <span>*</span>
            <p>渠道组</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':isShowGroup}"></i>
                <div class="copyModel" @click.stop="bindChangeGroup">{{type}}</div>
                <ul :class="{'show-select':isShowGroup}" @click.stop>
                    <li v-for="(val,key,index) in group" :key="index" @click="bindSelect($event,{val:val,key:key})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputSelect">
            <span>*</span>
            <p>渠道媒介</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':isShowMedium}"></i>
                <div class="copyModel" @click.stop="bindChangeMedium">{{type}}</div>
                <ul :class="{'show-select':isShowMedium}" @click.stop>
                    <li v-for="(val,key,index) in medium" :key="index" @click="bindSelect($event,{val:val,key:key})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputSelect">
            <span>*</span>
            <p>推广资源</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':isShowMedium}"></i>
                <div class="copyModel" @click.stop="bindChangeMedium">{{type}}</div>
                <ul :class="{'show-select':isShowMedium}" @click.stop>
                    <li v-for="(val,key,index) in medium" :key="index" @click="bindSelect($event,{val:val,key:key})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputSelect">
            <span>*</span>
            <p>推广类型</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':isShowMedium}"></i>
                <div class="copyModel" @click.stop="bindChangeMedium">{{type}}</div>
                <ul :class="{'show-select':isShowMedium}" @click.stop>
                    <li v-for="(val,key,index) in medium" :key="index" @click="bindSelect($event,{val:val,key:key})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputText">
            <span>*</span>
            <p>资源名称</p>
            <div class="input-box">
                <input type="text" name="name" v-model="matchIcon" placeholder="请输入渠道组匹配标识">
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
                ajaxId:0,
                name:"",
                type:"请选择",
                icon:"",
                matchIcon:"",
                ajaxType:0,
                isShowGroup:false,
                isShowMedium:false,
                isNew:false
            }
        },
        mounted(){
            console.log(this.popu)
            let _this = this;
             $.ajax({
                url:_this.searchUrl+"getEditInfo",
                type:"POST",
                data:{id:1},
                dataType:"JSON",
                success:(res)=>{
                    let data = res.data;
                    this.list = data.group_type;
                }
            })
            document.body.addEventListener('click',()=>{
                this.isShowGroup = this.isShowMedium = false;
            })
            
            bus.$on('bindBrother',function (val) { 
                if(val){
                    $.ajax({
                        url:_this.searchUrl+"getEditInfo",
                        type:"POST",
                        data:{id:val},
                        dataType:"JSON",
                        success:(res)=>{
                            let data = res.data;
                            _this.ajaxId = val;
                            _this.name= data.group[0].name; //名称
                            _this.ajaxType = data.group[0].type; //类型索引(s数字)
                            _this.type = _this.list[data.group[0].type]; //类型索引(文字)
                            _this.icon = data.group[0].identifying; //标识
                            _this.matchIcon = data.group[0].pattern; //匹配标识 
                        }
                    })
                }else{
                    _this.name="";
                    _this.type="请选择";
                    _this.icon="";
                    _this.matchIcon="";
                    _this.ajaxType=0;
                }
            })
        },
        watch:{

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
                let _this = this;
                let _data = {name:this.name,type:this.ajaxType,identifying:this.icon,pattern:this.matchIcon}
                if(this.ajaxId){
                    _data.id = this.ajaxId;
                }
                console.log(_data)
                $.ajax({
                    url:_this.searchUrl+"saveData",
                    type:"POST",
                    data:_data,
                    dataType:"JSON",
                    success:(res)=>{
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
                this.ajaxType = val.key;
                this.type = val.val;
                this.isShowSelect = false;
            },
            bindChangeGroup(){
                this.isShowGroup = !this.isShowGroup;
                this.isShowMedium = false;
            },
            bindChangeMedium(){
                this.isShowMedium = !this.isShowMedium;
                this.isShowGroup = false;
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
</style>

