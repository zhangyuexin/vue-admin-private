<template>
  <div class="app">
    <div class="app">
      <router-view v-if="isRouterAlive" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isRouterAlive: true //控制视图是否显示的变量
    };
  },
  created() {},
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  }
};
</script>

<style>
html,
body,
.app {
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 720px;
  overflow: auto;
  font-size: 14px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
