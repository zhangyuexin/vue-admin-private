<template>
  <div class="welcome_content">
    <div class="welcome_img">
      <img src="@/assets/images/welcome.jpg" alt="" />
    </div>
    <p class="welcome_title">欢迎使用云成长一体化大数据平台——{{ topTitle }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      message: "系统管理"
    };
  },
  computed: {
    ...mapGetters(["topTitle"])
  },
  created() {}
};
</script>

<style>
.welcome_content {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  font-size: 22px;
  color: #9b9b9b;
}

.welcome_title {
  margin-top: 20px;
}
</style>
