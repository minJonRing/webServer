<template>
  <div class="tqr">
      <div class="tqrr">{{tqr}}</div>
  </div>
</template>

<script>
    export default {
        name:"tqr",
        props:{
            tqr:String
        }
    }
</script>

<style scoped>
.tqrr {
    position: fixed;z-index: 999999;top: 0;left: 0;font-size: 30px;color: #000;
}
</style>

