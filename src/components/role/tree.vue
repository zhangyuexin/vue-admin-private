<template>
  <div class="treeMain">
    <el-tree ref='tree' :data="treeData" :show-checkbox="showCheckBox"
             :node-key="nodeKey" :default-expand-all="defaultAll"
             :filter-node-method="filterNode" :default-checked-keys="deCheckArr" :highlight-current="true"
             :props="defaultProps" @check="checkTree" @node-click="clickTree" :check-strictly="checkStrictly">
    </el-tree>
  </div>
</template>

<script>
  import {setStore, getStore, removeStore} from '@/utils/store'

  export default {
    props: {
      // 树结构的循环数组
      treeData: {
        type: Array,
        required: true
      },
      // 默认的props，根据需求配置相应项
      defaultProps: {
        type: Object,
        required: true
      },
      //默认展开的节点的 key 的数组
      deCheckArr: {
        type: Array,
        default: () => {
        }
      },
      defaultAll: {
        type: Boolean
      },
      nodeKey: {
        type: String
      },
      checkStrictly: {
        type: Boolean,
        default: true
      },
      showCheckBox: {
        type: Boolean,
        default: true
      },
      filterText: {
        type: String,
        defaule: ''
      },
      filterNode: {}

    },
    data() {
      return {}
    },
    created() {
      // this.$nextTick(function(){
      //   this.$refs.tree.setCurrentKey(2);
      // })
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.treeData.length > 0) {
          this.$refs.tree.setCurrentKey(this.treeData[0].id)
        }
      }, 900)
    },
    methods: {

      checkTree(checkedNodes, node) {
        let deptIds = []
        let banDeptIds = []
        let deptDates = this.$refs.tree.getCheckedNodes()
        let banDeptDates = this.$refs.tree.getHalfCheckedNodes()
        if (deptDates.length > 0) {
          deptDates.forEach((value, index, array) => {
            deptIds.push(value.id)
          })
        }
        if (banDeptDates.length > 0) {
          banDeptDates.forEach((value, index, array) => {
            banDeptIds.push(value.id)
          })
        }

        this.$emit('checkTree', deptIds, deptDates, checkedNodes, banDeptDates)
      },
      clickTree(item) {
        // let deptIds = []
        // let deptDates = this.$refs.tree.getCheckedNodes()
        let deptDates = this.$refs.tree.getCurrentNode()
        // if(deptDates.length>0){
        //   deptDates.forEach((value,index,array)=>{
        //     deptIds.push(value.id)
        //   })
        // }

        // console.log(item.id,"点击")
        this.$emit('clickTree', item, deptDates)

      }
    },

  };
</script>

<style scoped lang="scss">
  @mixin centerBox {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .treeMain {
    @include centerBox;
    /*width: inherit;*/
    /*height: inherit;*/
  }

</style>
<style lang="scss">
  @mixin wordColor {
    background: #28C6C0;
    color: white;
    border-color: #28C6C0;
  }

  @mixin borderColor {
    background: transparent;
    color: white;
    border-color: #28C6C0;
  }

  .treeMain .el-tree-node__children .el-tree-node .el-tree-node__label {
    position: relative;
  }

  .treeMain .el-tree {
    padding-left: 20px;
  }

  .treeMain .el-tree-node__content > .el-checkbox {
    margin-left: 2px;
  }

  .treeMain .el-checkbox__input.is-checked .el-checkbox__inner, .treeMain .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    //@include wordColor;
  }

  .treeMain .el-checkbox__inner:hover {
    //@include borderColor;
  }

  .treeMain .el-checkbox__input.is-focus .el-checkbox__inner {
    /*border-color: #28C6C0;*/
  }

  .treeMain .el-tree-node__expand-icon:before {
    /*color: red;*/
    content: "";
    background: url(~@/assets/images/role/jia.png) no-repeat center;
    width: 11px;
    height: 11px;
    display: block;
    /*padding: 6px 0 0 10px;!**!*/
    position: absolute;
    top: 1px;
    left: -6px;
  }

  .treeMain .is-leaf:before {
    background: url(~@/assets/images/role/jian.png) no-repeat center;
  }

  .treeMain .el-tree-node__expand-icon {
    -webkit-transform: rotate(0);
    transform: rotate(0)
  }

  .treeMain .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0);
    transform: rotate(0)
  }

  .treeMain .el-tree-node__children .el-tree-node__expand-icon.expanded:before {
    background: url(~@/assets/images/role/jian.png) no-repeat center;
  }

  .treeMain .el-tree-node__children .el-tree-node__expand-icon.is-leaf:before {
    background: url(~@/assets/images/role/jian.png) no-repeat center;
  }

  .treeMain .el-tree-node__expand-icon.expanded:before {
    background: url(~@/assets/images/role/jian.png) no-repeat center;
  }

  /*.treeMain  .el-tree-node .el-checkbox:before{*/
  /*content: "";*/
  /*background: url(~@/assets/images/role/jia.png) no-repeat center;*/
  /*width: 15px;*/
  /*height: 15px;*/
  /*display: block;*/
  /*!*padding: 6px 0 0 10px;!**!*!*/
  /*position: absolute;*/
  /*top: 1px;*/
  /*left: -19px;*/
  /*}*/

</style>
