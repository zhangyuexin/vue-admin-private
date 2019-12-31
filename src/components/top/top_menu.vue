<template>
  <div class="container">
    <el-menu :default-active="activeIndex" class="el-top-navigate" mode="horizontal" text-color="#9b9b9b" :active-text-color="theme">
      <el-menu-item v-for="(item, index) in topMenuList" :index="item.id + ''" @click="openMenu(item)" :key="index">
        <template slot="title">
          <i :class="'iconfont ' + item.icon" class="iconfont"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { setStore, getStore, removeStore } from "@/utils/store";
import bus from "@/utils/bus";

export default {
  data () {
    return {
      topMenuList: [
        {
          "id": "shouye",
          "children": [
            {
              "id": "CD_28bcf4c5b7f54845b70138e86228aae0",
              "parentId": "CD_eff14f431990461ab6b26cd197bc98df",
              "children": [],
              "icon": "icon-ArtboardCopy232",
              "label": "首页",
              "viewPath": "academicManagement/homePage/homePage",
              "type": "menu"
            }
          ],
          "icon": "icon-ArtboardCopy252",
          "label": "首页",
          "viewPath": "academicManagement/homePage/homePage"
        },
        {
          "id": "pingjiangpingyou",
          "children": [
            {
              "id": "CD_559e4e08d85c473c8034604928a82e76",
              "parentId": "CD_26e3af918e444f7dbca02b10a3dbd598",
              "children": [],
              "icon": "icon-huabancopy12",
              "label": "评奖人员管理",
              "viewPath": "academicManagement/awardsRecommendation/personnelManagement/index",
              "type": "menu"
            },
            {
              "id": "CD_dd3909c9a6cc40f5844d370094066d08",
              "parentId": "CD_26e3af918e444f7dbca02b10a3dbd598",
              "children": [
                {
                  "id": "CD_a2735f841a654a008067537b8d6940fc",
                  "parentId": "CD_dd3909c9a6cc40f5844d370094066d08",
                  "children": [],
                  "icon": "icon-huabancopy11",
                  "label": "先进班集体标兵",
                  "viewPath": "academicManagement/awardsRecommendation/pacesetter/index",
                  "type": "menu"
                }
              ],
              "icon": "icon-ArtboardCopy240",
              "label": "评奖评优",
              "viewPath": "@/views/Home",
              "type": "option"
            }
          ],
          "icon": "icon-ArtboardCopy227",
          "label": "评奖评优",
          "viewPath": "@/views/home"
        },
      ],
      activeIndex: ""
    };
  },
  computed: {
    ...mapGetters([
      "common",
      "theme",
      "userData",
      "sidebarList"
    ])
  },
  filters: {},
  created () {
    let _this = this;
    setTimeout(() => {
      // 关闭全局loading
      _this.$store.commit("SET_GLOBAL_LOADING", false);
    }, 2000);
  },
  mounted () { },
  methods: {
    openMenu (item) {
      this.activeIndex = item.id
      this.filterMenu(item);
    },

    filterMenu (data) {
      bus.$emit('top_menu', data.children)
    },
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 80px;
  line-height: 80px;
  .iconfont {
    margin-bottom: -4px;
  }
}
</style>
