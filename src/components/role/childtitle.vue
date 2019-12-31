<template>
   <div class="childtitle clearBox">
         <div>
           <span></span>
           <span>{{titleTxt}}</span>
         </div>
   </div>
</template>

<script>


  export default {

    data() {
      return {

      };
    },
    props:["titleTxt"]
  }

</script>

<style scoped lang="scss">
  @mixin flexCol {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  .childtitle{
    height: inherit;
    float: left;
    @include flexCol;
  }
  .childtitle>div{
    float: left;
  }
  .childtitle>div>span:nth-child(1){
    width: 5px;
    height: 28px;
    background: #28C6C0;
    float: left;
    margin:0 0 0 10px;
  }
  .childtitle>div>span:nth-child(2){
    font-size: 20px;
    color: #6F828A;
    float: left;
    margin-left: 8px;
    font-weight: bold;
  }
</style>

