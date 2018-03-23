<template>
  <div class="course">
      <div class="iframe">
          <iframe src="http://47.100.109.215:7777/" frameborder="0"></iframe>
      </div>
  </div>
</template>

<script>
    export default {
        name:"cource"
    }
</script>

<style scoped>
.course,.iframe{
    height: 100%;
    height: 690px;
    overflow: hidden;
}
iframe {
    width: 100%;
    height: 690px;
}
</style>

