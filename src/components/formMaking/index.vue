<template>
  <!--<fm-making-form ref="formMaking" preview generate-code generate-json>-->
  <fm-making-form ref="formMakingManage" preview>
    <template slot="action">
      <el-button class="el-button--text" icon="el-icon-check" @click="onFormMakingSubmit">确 认</el-button>
    </template>
  </fm-making-form>
</template>

<script>
export default {
  name: 'form-making',
  props: {
    data: {}
  },
  created () {
  },
  mounted () {
    if (JSON.stringify(this.data) != '{}') {
      this.$refs.formMakingManage.setJSON(this.data);
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onFormMakingSubmit () {
      this.$store.commit('SET_FORM_MAKING', this.$refs.formMakingManage._data.widgetForm);
      console.log(this.$refs.formMakingManage._data.widgetForm)
      this.$emit('onFormMakingSubmit');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
.el-button--text {
  color: #409eff;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.el-button--danger {
  height: 30px !important;
  min-width: 30px !important;
  width: 30px !important;
}
.iconfont {
  height: 26px;
}
</style>
