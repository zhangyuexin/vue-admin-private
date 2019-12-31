<template>
  <div class="menu_details">
    <el-form :model="searchData" label-width="80px" ref="searchData">
      <el-row :gutter="10">
        <el-col
          :span="6"
          v-for="(item, index) in searchCollocation.firstRow"
          :key="index"
        >
          <el-form-item :label="item.label">
            <el-select
              :popper-append-to-body="false"
              v-model="searchData[item.value]"
              :placeholder="item.placeholder"
              v-if="!item.isInput"
              @input="handelSelect($event, item.label)"
            >
              <el-option
                v-for="(itemm, indexx) in item.optionData"
                :label="itemm[item.opLabel]"
                :value="itemm[item.opValue]"
                :key="indexx"
              ></el-option>
            </el-select>
            <el-input
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
              v-if="item.isInput"
              v-model="searchData[item.value]"
              :placeholder="item.placeholder"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col
          :span="6"
          v-for="(item, index) in searchCollocation.secondRow"
          :key="index"
        >
          <el-form-item :label="item.label" label-width>
            <el-select
              :popper-append-to-body="false"
              v-model="searchData[item.value]"
              :placeholder="item.placeholder"
              v-if="!item.isInput"
              @input="handelSelect($event, item.label)"
            >
              <el-option
                v-for="(itemm, indexx) in item.optionData"
                :label="itemm[item.opLabel]"
                :value="itemm[item.opValue]"
                :key="indexx"
              ></el-option>
            </el-select>
            <el-input
              onkeyup="this.value=this.value.replace(/\s+/g,'')"
              v-if="item.isInput"
              v-model="searchData[item.value]"
              :placeholder="item.placeholder"
            ></el-input>
          </el-form-item>
        </el-col>
        <div style="float: right;">
          <el-button class="operation_green" type="primary" @click="search()"
            >查询</el-button
          >
          <el-button class="operation_gray" @click="reset()">重置</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  name: "rightSearch",
  props: ["searchCollocation"],
  data() {
    return {
      searchData: {}
    };
  },
  created() {
    bus.$on("reset", () => {
      this.reset();
    });
    bus.$on("rowClickDetailSearchData", e => {
      this.searchData = this.deepCopy(e);
    });
  },
  methods: {
    search() {
      this.$emit("search", this.searchData);
      bus.$emit("search", this.searchData);
    },
    reset() {
      Object.keys(this.searchData).forEach(key => {
        if (key != "jxfbBm") {
          this.searchData[key] = "";
        }
      });
      this.setSearchCollocation([], "年级");
      this.setSearchCollocation([], "班级");
    },
    handelSelect(value, label) {
      let arr = ["年级", "专业"];
      if (arr.includes(label)) {
        bus.$emit("handelSelect", {
          value,
          label,
          sszyBm: this.searchData.sszyBm
        });
      }
      if (label == "专业") {
        this.searchData.njBm = "";
        this.searchData.bjBm = "";
      }
      if (label == "年级") {
        this.searchData.bjBm = "";
      }
      this.$forceUpdate();
    },
    //深拷贝
    deepCopy(obj) {
      var result = Array.isArray(obj) ? [] : {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === "object" && obj[key] !== null) {
            result[key] = this.deepCopy(obj[key]); //递归复制
          } else {
            result[key] = obj[key];
          }
        }
      }
      return result;
    },
    setSearchCollocation(data, target) {
      if (this.searchCollocation.firstRow && this.searchCollocation.secondRow) {
        this.searchCollocation.firstRow.forEach(ele => {
          if (ele.label == target) {
            ele.optionData = data;
          }
        });
        this.searchCollocation.secondRow.forEach(ele => {
          if (ele.label == target) {
            ele.optionData = data;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu_details {
  width: 100%;

  .actionBar {
    background: #fafbfd;
    padding: 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
}
/deep/ .el-form {
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
