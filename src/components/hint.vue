<template>
    <div class="hint">
        <div class="hint-info" :class="[getHint.className]">
          <i class="iconfont" :class="[icon]"></i>
          <span>{{getHint.txt}}</span>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
    export default {
        name:"hint",
        props:{
            hint:String,
            isShow:Boolean
        },
        data(){
            return {
                icon:""
            }
        },
        computed:{
            ...mapGetters(['getHint'])
        },
        mounted(){
            
        },
        watch:{
            'getHint.className':function(val){
                this.icon = this.getHint.className == "hint-success"?"icon-chenggong":"icon-error";
                if(val != ""){
                    setTimeout(() => {
                        this.getHint.className = "";
                        this.setHint(this.getHint)
                    }, 3000);
                }
            }
        },
        methods:{
            ...mapActions(['setHint'])
        }
    }
</script>

<style scoped>
.hint-info {
    position: fixed;
    display: flex;
    align-content: center;
    justify-content: center;
    width: 330px;
    top: 0;
    left: 50%;
    line-height: 52px;
    margin-left: -165px;
    background-color: #fff;
    border: 1px transparent solid;
    border-radius: 3px;
    color: #333;
    transition-duration: 600ms;
    transform: matrix(1,0,0,1,0,-100);
    opacity: 0;
    z-index: 100;
}
.hint-success {
    border-color: green;
    color: green;
    opacity: 1;
    transform: matrix(1,0,0,1,0,30);
}
.hint-error {
    border-color: #f65939;
    color: #f65939;
    opacity: 1;
    transform: matrix(1,0,0,1,0,30);
}

.hint-info span {
    padding: 0 12px;
}
</style>
