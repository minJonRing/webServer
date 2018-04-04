<template>
  <div class="ditch">
        <!-- <input-select @getSelect="setData" :elName="'渠道组类型'" :txt="ajaxData.ajaxType" :propType="{type:'type'}" :hint="'请输入渠道组类型'" :list="list"></input-select> -->
        <div class="inputSelect">
            <span>*</span>
            <p>渠道组类型</p>
            <div class="input-box">
                <i class="icon iconfont icon-zheng-triangle" :class="{'rotate-icon':isShowSelect}"></i>
                <div class="copyModel" @click.stop="isShowSelect = !isShowSelect">{{type}}</div>
                <ul :class="{'show-select':isShowSelect}" @click.stop>
                    <li v-for="(val,key,index) in list" :key="index" @click="bindSelect($event,{val:val,key:key})">{{val}}</li>
                </ul>
            </div>
            <i></i>
        </div>
        <div class="inputText">
            <span>*</span>
            <p>渠道组名称</p>
            <div class="input-box">
                <input type="text" name="name" v-model="name" placeholder="请输入渠道组名称">
            </div>
            <i></i>
        </div>
        <div class="inputText">
            <span>*</span>
            <p>渠道组标识</p>
            <div class="input-box">
                <input type="text" name="name" v-model="icon" placeholder="请输入渠道组标识">
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
    import inputSubmit from "./from/inputSubmit"
    import bus from "./js/a.js"
    import {mapActions} from "vuex"
    export default {
        name:"ditch",
        props:["searchUrl"],
        data(){
            return {
                ajaxId:0,
                name:"",
                type:"请选择",
                icon:"",
                ajaxType:0,
                list:{},
                isShowSelect:false,
                isNew:false
            }
        },
        mounted(){
            let _this = this;
             $.ajax({
                url:_this.searchUrl+"getEditInfo",
                type:"POST",
                data:{id:1},
                dataType:"JSON",
                success:(res)=>{
                    let data = res.data;
                    this.list = data.medium_type;
                }
            })
            document.body.addEventListener('click',()=>{
                this.isShowSelect=false;
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
                            _this.name= data.medium[0].name; //名称
                            _this.ajaxType = data.medium[0].type; //类型索引(s数字)
                            _this.type = _this.list[data.medium[0].type]; //类型索引(文字)
                            _this.icon = data.medium[0].identifying; //标识
                        }
                    })
                }else{
                    _this.name="";
                    _this.type="请选择";
                    _this.icon="";
                    _this.ajaxType=0;
                }
            })
        },
        watch:{

        },
        methods:{
            ...mapActions(['setHint']),
            // 发送ajax请求
            bindCreate(){
                if(!this.ajaxType){
                    this.setHint({txt:"请选择渠道组类型",className:"hint-error"})
                    return ;
                }else if(!this.name){
                    this.setHint({txt:"请输入渠道组名称",className:"hint-error"})
                    return ;
                }else if(!this.icon){
                    this.setHint({txt:"请输入渠道组标识",className:"hint-error"})
                    return ;
                }
                let _this = this;
                let _data = {name:this.name,type:this.ajaxType,identifying:this.icon}
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

