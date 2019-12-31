<template>
  <div class="adminBoxContent">
    <!-- 学生列表开始  -->
    <avue-crud
      class="table"
      :data="data"
      :option="option"
      :page="page"
      ref="crud"
      @size-change="sizeChange"
      @current-change="currentChange"
      :table-loading="loading"
      @selection-change="selectionChange"
      @row-click="rowClick"
      @sort-change="sortChange"
      :cell-class-name="changeCell"
    >
      <template slot="menuLeft">
        <el-button
          class="operation_green"
          type="primary"
          v-for="(item, index) in menuLeft"
          :key="index"
          @click="menuLeftClick(item.type)"
          >{{ item.name }}</el-button
        >
      </template>
      <template slot="menuRight">
        <div>
          <el-radio
            v-model="menuRightValue"
            v-for="(item, index) in menuRight.menuList"
            :key="index"
            :label="item.type"
            @change="menuRightChange"
            >{{ item.name }}</el-radio
          >
        </div>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-tooltip
          effect="dark"
          v-for="(item, index) in handelMenu"
          :key="index"
          :content="item.content"
          placement="bottom"
        >
          <i
            :class="setClass(scope.row, item)"
            @click="
              menuClick(
                scope.row,
                scope.index,
                item.type,
                setClass(scope.row, item)
              )
            "
          ></i>
        </el-tooltip>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import Api from "@/api";
import bus from "./bus";

export default {
  /**
   * 该组件数据为组件内部请求，父组件提供所需参数，分页等操作皆有组件内部实现
   * 组件所需的导出等操作，切换学院学生等操作以及保存，编辑等操作皆有父组件提供
   * menuLeft：类似于导出等左侧上方操作按钮list，点击后将type值传回父组件，父组件根据type值进行下一步操作
   * menuRight：类似于切换学院、学生操作的按钮list，同为利用type传回父组件
   * option：表格参数，父组件传，用于切换menuRight
   * handelMenu：表格中保存，编辑等操作，将所需数值传回父组件处理
   * searchData：组件内部表格请求数据所需参数
   */
  name: "rightTable",
  props: [
    "menuLeft",
    "menuRight",
    "option",
    "handelMenu",
    "searchData",
    "interfaceName",
    "rowClickDetail",
    "rowClickStatic",
    "isYJQS",
    "isXJBJT"
  ],
  data() {
    return {
      loading: false,
      data: [],
      page: {
        // 列表分页数据
        pageSizes: [10, 20, 30, 40],
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      queryForm: {},
      menuRightValue: ""
    };
  },
  created() {
    this.queryForm = this.searchData;
    this.menuRightValue = this.menuRight.menuRightSelected;
    bus.$on("search", () => {
      this.page.currentPage = 1;
    });
  },
  mounted() {},
  watch: {
    interfaceName() {
      this.data = [];
    },
    menuRight() {
      this.menuRightValue = this.menuRight.menuRightSelected;
      this.page = {
        // 列表分页数据
        pageSizes: [10, 20, 30, 40],
        total: 0,
        currentPage: 1,
        pageSize: 10
      };
    },
    searchData: {
      deep: true,
      handler: function() {
        this.queryForm = this.searchData;
        this.getList();
      }
    }
  },
  methods: {
    menuClick(row, index, type, className) {
      if (className.indexOf("gray") != -1) {
        return false;
      }
      let obj = {
        row,
        index,
        type
      };

      this.$emit("menuClick", obj);
    },
    async getList() {
      this.loading = true;
      this.queryForm.pageNum = this.page.currentPage;
      this.queryForm.pageSize = this.page.pageSize;
      let result = await this.Api[this.interfaceName](this.queryForm);
      if (result.statusCode == 200) {
        if (this.isArrayFn(result.data)) {
          this.option.page = false;
          this.data = result.data;
          this.page = {};
        } else {
          this.data = result.data.data;
          this.page.total = Number(result.data.total);
        }
      }

      this.loading = false;
    },
    // 每页展示条数改变
    sizeChange(val) {
      this.page.pageSize = val;
      this.getList();
    },
    // 页码条数改变
    currentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    menuLeftClick(e) {
      this.$emit("menuLeftClick", e);
    },
    menuRightChange() {
      bus.$emit("reset");
      this.$emit("menuRightChange", this.menuRightValue);
      this.page = {
        // 列表分页数据
        pageSizes: [10, 20, 30, 40],
        total: 0,
        currentPage: 1,
        pageSize: 10
      };
    },
    selectionChange(list) {
      this.$emit("selectionChange", list);
    },
    isArrayFn(o) {
      return Object.prototype.toString.call(o) === "[object Array]";
    },
    isShow(row, item) {
      let shzy =
        this.$parent.role == "bz"
          ? "bzshzt"
          : this.$parent.role == "fdy"
          ? "fdyshzt"
          : this.$parent.role == "yz"
          ? "xyshzt"
          : this.$parent.role == "xsglk"
          ? "xsglkshzt"
          : "";
      if (this.isYJQS && row[shzy] != "待审核" && item.content == "审核") {
        return false;
      }
      if (
        row.shzt != "待审核" &&
        (item.content == "通过" || item.content == "驳回")
      ) {
        return false;
      }
      if (row.xymc == "合计") {
        return false;
      }
      return true;
    },
    rowClick(row, event) {
      if (this.rowClickDetail.includes(event.property)) {
        let obj = {};

        if (this.rowClickStatic.includes(event.property)) {
          obj[event.property] = row[event.property];
        } else {
          obj.jxdj = event.property;
        }

        obj.xndBm = row.xndBm ? row.xndBm : "";
        obj.ssxyBm = row.xyBm ? row.xyBm : "";
        if (this.isXJBJT) {
          obj.ssnjBm = row.ssnjBm ? row.ssnjBm : "";
          obj.sszyBm = row.sszyBm ? row.sszyBm : "";
          let inx = ["", "xjbjt", "xycx", "tjya", "fxsh", "wthd"].indexOf(
            event.property
          );
          obj.sblb = inx > 0 ? inx + "" : "";
        } else if (this.isYJQS) {
          obj.njbm = row.njbm ? row.njbm : "";
          obj.zybm = row.zybm ? row.zybm : "";
          let inx = ["sj", "bq", "qy"].indexOf(event.property);
          obj.zpjg = inx >= 0 ? inx + "" : "";
        } else {
          obj.njBm = row.njBm ? row.njBm : "";
          obj.sszyBm = row.zy ? row.zy : "";
        }

        bus.$emit("rowClickDetail", obj);
        if (this.isXJBJT && event.property == "ssbj") {
          this.$emit("rowClick", row.ssbjBm);
        }
      }
    },
    changeCell({ row, column, rowIndex, columnIndex }) {
      if (
        this.rowClickDetail.includes(column.property) &&
        row[column.property] != "合计"
      ) {
        return "special-row";
      }
      if (row.bh) {
        if (row.bh.includes(column.property)) {
          return "special-cell";
        }
      }
    },
    setClass(row, item) {
      let color = this.isShow(row, item) ? "green" : "gray";
      return `iconfont ${color} ${item.icon}`;
    },
    sortChange(e) {
      this.queryForm.prop = e.prop;
      this.queryForm.order = e.order;
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped>
.adminBoxContent {
  width: 100%;
}

.table {
  width: calc(100% - 20px);
  padding: 0px 0px 60px 0px;

  i {
    margin-right: 10px;
  }
}

/deep/ .avue-crud__right {
  top: 10px;
}
</style>
<style lang="scss">
.special-row {
  cursor: pointer;
  color: blue;
  text-decoration-line: underline;
}
.special-cell {
  color: red;
}
.special-xjbjtbbb {
  cursor: pointer;
  color: blue;
}
</style>
