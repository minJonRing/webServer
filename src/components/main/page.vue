<template>
  <div class="page">
      <div class="page flex flex-mid">
          <div class="page-number flex-1 flex flex-mid">
              <p>共{{total}}条</p>
              <p>{{page}}/{{pages}}页</p>
          </div>
          <div class="flex flex-mid">
              <a class="page-btn" :class="{'page-btn-end':page == 1}" href="javascript:" @click="prev">&lt;</a>
              <a class="page-btn" :class="{'page-btn-over':page == (index+1)}" href="javascript:" v-for="(item,index) in pages" :key="index" @click="gowill($event,index)">{{index+1}}</a>
              <a class="page-btn" :class="{'page-btn-end':page == pages}"  href="javascript:" @click="next">&gt;</a>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        name:"page",
        props:['pagesize','total',"isQuery"],
        data(){
            return {
                pages:0,
                page:1
            }
        },
        mounted(){
        },
        watch:{
            'page':function(val){
                this.$emit("switchPage",val);
            },
            'total':function(val){
                this.pages = Math.ceil(val/this.pagesize);
            },
            "isQuery":function(){
                this.page = 1;
            }
        },
        methods:{
            prev(){
                if(this.page == 1){
                    return false;
                }else{
                    this.page--
                }
            },
            next(){
                if(this.page == this.pages){
                    return false;
                }else{
                    this.page++
                }
            },
            gowill(event,val){
                this.page = val+1;
            }
        }
    }
</script>
 <style scoped>
 .page {
    /* width: 700px; */
    padding: 11px 0;
    font-size: 14px;
    color: #333;
}
.page-number p{
    padding: 0 6px;
}
.page-btn {
    border: 1px #e4e4e4 solid;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 38px;
    color: #333;
    margin: 0 5px;
    transition-duration: 600ms;
}
.page-input {
    width: 50px;
    height: 40px;
     border: 1px #e4e4e4 solid;
    border-radius: 5px;
    line-height: 38px;
    padding: 0 6px;
}
.page-go {
    padding: 0 12px;
}

.page-btn:hover {
    background-color: deepskyblue;
    color: #fff;
}
.page-btn-end {
    background-color: #dfdfdf;
    cursor: no-drop;
}
.page-btn-over {
    background-color: deepskyblue;
    color: #fff;
}
.page-btn-end:hover{
    background-color: #dfdfdf;
    color: #333;
    opacity: 1;
}
 </style>
 
