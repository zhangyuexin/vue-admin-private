<template>
  <div class="qrcodeRegister" v-loading="loading">
      <h1>{{title}}</h1>
      <i class="iconfont icon-ArtboardCopy263 red" style="font-size: 30px;"></i>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import store from '@/store'
  import {getHashParameters,getHashParameter} from '@/utils/util'

  export default {


    data() {
      return {
        loading:false,
        title:""
      }
    },
    created() {
      // console.log(getHashParameter('hdbm'),'空空如也')
      this.qrcodeRegister(getHashParameter('hdbm'))
    },
    mounted() {

    },
    methods: {
      async qrcodeRegister(bm) {
        try {
          this.loading = true
          let result = await this.Api.qrcodeRegister(bm)
          if (result.statusCode == 200) {
            this.title = ' 签到成功'
            this.$message.success("签到成功")
            this.loading = false
          }else{
            this.$message.warning(result.message)
            this.title = result.message
          }
          this.loading = false
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  @mixin flexRow2 {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
.qrcodeRegister{
  width: 100%;
  height: 100%;
  @include flexRow2;
}



</style>
