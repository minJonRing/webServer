<template>
    <div class="ditch-box">
        <ditchlist @getChild="setFather" :searchData="searchData" :searchTitle="searchTitle" :searchUrl="searchUrl" v-show="isShowList"></ditchlist>
        <ditch @getChild="setFather" :searchUrl="searchUrl"  v-show="!isShowList"></ditch>
    </div>
</template>
<script>
    import ditch from "./ditch"
    import ditchlist from "./ditchlist"

    export default {
        name:"ditch-box",
        data(){
            return {
                isShowList:true,
                searchData:[{name:"渠道组名称",value:""},{name:"渠道组标识",value:""}],
                searchTitle:[{name:"渠道组类型"},{name:"渠道组名称"},{name:"渠道组标识"},{name:"渠道组匹配标识"}],
                searchUrl:"http://api.wildog.cn/group/",
            }
        },
        mounted(){
        },
        methods:{
            setFather(val){
                console.log(val)
                if(val){
                    this.isShowList = true;
                }else{
                    let bl = this.isShowList;
                    this.isShowList = !bl;
                }
            }
        },
        components:{
            ditch:ditch,
            ditchlist:ditchlist
        }
    }
</script>
