<template>
    <div class="ditch-medium-box">
        <ditchlist  @getChild="setFather" :searchData="searchData" :searchTitle="searchTitle" :searchUrl="searchUrl" v-show="isShowList"></ditchlist>
        <ditch-medium  @getChild="setFather" :searchUrl="searchUrl" v-show="!isShowList"></ditch-medium>
    </div>
</template>

<script>
    import ditchMedium from "./ditchMedium"
    import ditchlist from "./ditchlist"

    export default {
        name:"ditch-medium-box",
        props:[],
        data(){
            return {
                isShowList:true,
                searchData:[{name:"渠道组名称",value:""},{name:"渠道媒介标识",value:""}],
                searchTitle:[{name:"渠道媒介"},{name:"渠道媒介类型"},{name:"渠道媒介标识"}],
                searchUrl:"http://api.wildog.cn/medium/"
            }
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
            ditchMedium:ditchMedium,
            ditchlist:ditchlist
        }
    }
</script>
