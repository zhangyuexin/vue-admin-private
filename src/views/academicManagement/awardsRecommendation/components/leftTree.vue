<template>
  <div class="menu_treeContent">
    <div class="search_bar">
      <input
        v-model="filterText"
        class="search"
        placeholder="学院/专业/年级/班级"
      />
      <i class="iconfont icon-ArtboardCopy1"></i>
    </div>
    <!--左侧的组织结构树-->
    <div class="tree">
      <el-tree
        :default-checked-keys="['-1']"
        :data="treeList"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        highlight-current
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
  </div>
</template>

<script>
/**
 * 该组件为左侧树状图组件，由父组件传入参数，组件内部请求数据
 * 然后其事件，返回父组件操作
 */

import Api from "@/api";

export default {
  name: "leftTree",
  props: ["treeParams"],
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name"
      },
      treeList: []
    };
  },
  async created() {
      // let res = await this.Api.pjryglFindYhSf()
      // let role = res.statusCode == 200 ? res.data : ''
      // this.isBz = role == 'bz'
      this.getTreeData();
  },
  methods: {
    async getTreeData() {
      // let res = this.isBz ? await this.Api.findPjryglTree({}) : await this.Api.yhglBXsjcxxGetZzjgTree3({});
      let res = await this.Api.yhglBXsjcxxGetZzjgTree3({});
      this.treeList = res.statusCode === 200 ? res.data : [];
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      //点击下拉列表触发事件
      this.$emit("handleNodeClick", data);
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  filterText: {
    type: String,
    defaule: ""
  }
};
</script>

<style lang="scss" scoped="scoped">
.search_bar {
  width: 100%;
  position: relative;
  height: 35px;
  margin-bottom: 20px;
  margin-top: 30px;

  .search {
    border: solid 1px #e0e0e0;
    width: 100%;
    height: 35px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    padding: 0 40px 0 10px;
    box-sizing: border-box;
  }

  .icon-ArtboardCopy1 {
    position: absolute;
    font-size: 16px;
    top: 0;
    bottom: 0;
    right: 5px;
    padding: 0 20px;
    margin: auto;
    color: #ccc;
  }
}

.tree {
  margin-top: 5px;
  height: -moz-calc(100% - 100px);
  height: -webkit-calc(100% - 100px);
  height: calc(100% - 100px);
  max-height: 570px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
