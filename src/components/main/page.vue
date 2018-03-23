<template>
  <div class="page">
      <div class="page flex flex-mid">
          <div class="page-number flex-1 flex flex-mid">
              <p>共{{dataLength}}条</p>
              <p>{{page}}/{{pages}}页</p>
          </div>
          <div class="flex flex-mid">
              <a class="page-btn" :class="{'page-btn-over':page == 1}" href="javascript:" @click="prev">&lt;</a>
              <a class="page-btn" :class="{'page-btn-over':page == pages}"  href="javascript:" @click="next">&gt;</a>
              <div class="flex flex-mid">
                  <p class="page-go">跳转到</p>
                  <input class="page-input" type="text" name="name" id="" v-model="inputPage">
                  <a class="page-btn" href="javascript:" @click="gowill">GO</a>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
    export default {
        name:"page",
        props:['dataLength','nowPage'],
        data(){
            return {
                pages:0,
                page:1,
                inputPage:1
            }
        },
        mounted(){
            setTimeout(() => {
                this.pages = Math.ceil(this.dataLength/5);
            }, 1);
        },
        watch:{
            'nowPage':function(val){
                this.page = val
            },
            'page':function(val){
                this.$emit("switchPage",this.page);
            },
            'inputPage':function(val){
                let page = (val+"").replace(/[^0-9]$/g,'');
                if(page <1){
                    page = 1
                }else if(page > this.pages){
                    page = this.pages
                }
                this.inputPage = page;
                
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
            gowill(){
                this.$emit("switchPage",this.inputPage);
                this.page = this.inputPage;
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
    background-color: #f5f5f5;
    color: deepskyblue;
}

.page-btn-over {
    background-color: #f7f7f7;
}
 </style>
 
