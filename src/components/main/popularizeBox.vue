<template>
    <div class="popularize-box">
        <ditchlist @getChild="setFather" :searchData="searchData" :searchTitle="searchTitle" :searchUrl="searchUrl" v-show="isShowList"></ditchlist>
        <popu @getChild="setFather" :searchUrl="searchUrl" :popu="popu"  v-show="!isShowList"></popu>
    </div>
</template>

<script>
    import ditchlist from "./ditchlist"
    import popu from "./popu"

    export default {
        name:"popularize-box",
        props:[],
        data(){
            return {
                isShowList:true,
                searchData:[{name:"渠道媒介名称",value:""},{name:"渠道媒介标识",value:""}],
                searchTitle:[{name:"渠道组"},{name:"渠道组媒介"},{name:"url链接"},{name:"关键词"}],
                searchUrl:`${webUrl}/resource/`,
                popu:""
            }
        },
        mounted(){
            $.ajax({
                url:`${webUrl}/resource/getSelect`,
                type:"POST",
                dataType:"JSON",
                success:(res)=>{
                    this.popu = res.data;
                }
            })
        },
        methods:{
            setFather(val){
                if(val){
                    this.isShowList = true;
                }else{
                    let bl = this.isShowList;
                    this.isShowList = !bl;
                }
            }
        },
        components:{
            ditchlist:ditchlist,
            popu:popu
        }
    }
</script>
