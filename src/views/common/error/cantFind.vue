<template>
  <div class="container">
    <img src="@/assets/images/404.png" width="400" height="200">
  </div>
</template>

<script>
  export default {
    name: "cantFind"
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 5px;
    position: relative;
    img {
      position: absolute;
      left: calc(50% - 180px);
      top: calc(50% - 120px);
    }
  }
</style>
