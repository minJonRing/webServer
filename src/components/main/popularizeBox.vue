<template>
    <div class="popularize-box">
        <populist @getChild="setFather" :popu="popu" :searchData="searchData" :searchTitle="searchTitle" :searchUrl="searchUrl" v-show="isShowList"></populist>
        <popu @getChild="setFather" :searchUrl="searchUrl" :popu="popu"  v-show="!isShowList"></popu>
    </div>
</template>

<script>
    import populist from "./popuList"
    import popu from "./popu"

    export default {
        name:"popularize-box",
        props:[],
        data(){
            return {
                isShowList:true,
                searchData:[{name:"渠道媒介名称",value:""},{name:"渠道媒介标识",value:""}],
                searchTitle:[{name:"渠道组"},{name:"渠道组媒介"},{name:"资源名字"},{name:"url链接"},{name:"关键词"}],
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
            populist:populist,
            popu:popu
        }
    }
</script>
