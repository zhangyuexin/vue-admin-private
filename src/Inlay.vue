<template>
  <div class="inlay">
    <div class="inlay">
      <router-view/>
    </div>
      <certification-form v-if="certification"></certification-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import certificationForm from '@/components/certification/'

  export default {
    name: 'Inlay',
    components: {
      certificationForm
    },
    data() {
      return {
        certificationShow: false
      }
    },
    watch: {
      certification() {
        // this.certificationShow = this.certification
      }
    },
    computed: {
      ...mapGetters([
        'certification'
      ]),
    },
    created() {
      // 验证是否绑定
      // console.log('验证是否绑定')
      // this.certification = Cookies.get('certification')
      // Cookies.set('666',Cookies.get('accessToken'))
      // 读取cookie
      // console.log('读取cookie',Cookies.get('accessToken'))
      // if(Cookies.get('accessToken')=='true') {
      //   this.certification=true
      // }else{
      //   this.certification=false
      // }
    },
    methods:{

    }
  }
</script>

<style>
  html, body, .inlay {
    width: 100%;
    height: 100%;
    min-width: 1280px;
    min-height: 720px;
    overflow: auto;
    font-size: 14px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
