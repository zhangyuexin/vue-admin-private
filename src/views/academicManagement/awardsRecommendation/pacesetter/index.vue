<template>
  <div class="banji-container">
    <div class="middle_title">
      <P>{{ common.heightTitle }}</P>
    </div>
    <div class="middle_content">
      <div class="right">
        <div class="menu_details">
          <el-form :model="searchData" label-width="80px" ref="searchData">
            <el-row>
              <el-col :span="6">
                <el-form-item label="学院">
                  <el-input
                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    v-model="searchData.xy"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="班级">
                  <el-input
                    onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    v-model="searchData.bj"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
              </el-col>
              <div style="float: right;">
                <el-button
                  class="operation_green"
                  type="primary"
                  @click="search()"
                  >查询</el-button
                >
                <el-button class="operation_gray" @click="reset()"
                  >重置</el-button
                >
              </div>
            </el-row>
          </el-form>
        </div>
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
            @row-click="rowClick"
            @sort-change="sortChange"
            :cell-class-name="changeCell"
          >
            <template slot="menuLeft">
              <el-button
                class="operation_green"
                type="primary"
                @click="handleDialogVisible12 = true"
                >设置评委</el-button
              >
              <el-button
                class="operation_green"
                type="primary"
                @click="importDialog = true"
                >导入候选班集体</el-button
              >
            </template>
          </avue-crud>
        </div>
      </div>
      <!--导入开始-->
      <el-dialog
        title="数据导入"
        :visible.sync="importDialog"
        width="30%"
        @closed="toFormClick()"
        :show-close="false"
      >
        <ImportTemplate
          :submitAction="submitAction"
          :templateShow="true"
          :errorDocHref="errorDocHref"
          :fileName="fileName"
          :templateHref="templateHref"
          @importSuccessEvent="importSuccessEvent"
          :fileList="[]"
        ></ImportTemplate>
      </el-dialog>
      <el-dialog
        title="新增评委"
        :visible.sync="handleDialogVisible12"
        width="900px"
        :before-close="
          value => {
            handleClose(value, 'handleData12');
          }
        "
      >
        <el-form
          :model="handleData12"
          ref="handleData12"
          label-width="140px"
          style="width: 100%"
        >
          <el-form-item label="设置系统内评委：" prop="judgeArr">
            <el-cascader
              v-model="handleData12.judgeArr"
              :options="options"
              :props="dxProps"
              clearable
              filterable
              placeholder="请设置系统内评委"
            >
              <template slot-scope="{ node, data }">
                <span>{{ node.level == 1 ? data.gwmc : data.jgmc }}</span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="设置系统外评委：" prop="createJudge">
            <el-select
              v-model="handleData12.createJudge"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请创建系统外评委"
            >
            </el-select>
          </el-form-item>
          <el-row type="flex" justify="center" align="bottom">
            <el-button
              type="primary"
              :loading="judgesLoading"
              @click="submitJudges('handleData12')"
              >确定
            </el-button>
            <el-button @click="handleDialogVisible12 = false">取消</el-button>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog title="评分" :visible.sync="scoreDialog" width="200px">
        <pf
          @pfHandelSubmit="pfHandelSubmit"
          @pfHandelCancel="pfHandelCancel"
          :pfBtnLoading="pfBtnLoading"
          :pfForm="pfForm"
          :pfSubmitBtn="pfSubmitBtn"
        ></pf>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Api from "@/api";
import { mapGetters } from "vuex";
import ImportTemplate from "@/components/upload";
import pf from "./components/pf";

export default {
  name: "pacesetterIndex",
  inject: ["reload"],
  data() {
    return {
      role: "", //角色，如辅导员等
      modular: "xjbjtbb", //模块 如国奖评比等
      menuRightSelected: 2, //右侧菜单选择，如勾选学生
      importDialog: false, // 导入数据对话框
      submitAction: "/api/xggl/xjbjtbb/importHxbjt", // 导入数据Api
      templateHref: "xjbjtbbExportTemplate", // 下载模板Api
      fileName: "候选班集体导入模板.xlsx", // 下载模板的文件名
      errorDocHref: "knsglDownloadErrorExcel", // 错误后下载错误文档Api
      handleDialogVisible12: false,
      handleData12: {
        judgeArr: [],
        createJudge: []
      },
      options: [],
      dxProps: {},
      judgesLoading: false,
      scoreDialog: false,
      pfBtnLoading: false,
      pwDatalist: [],
      pfForm: {},
      pfSubmitBtn: 0,
      dataBm: "",
      pwBm: "",
      searchData: {},
      data: [],
      option: {
        columnBtn: false,
        refreshBtn: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        page: true,
        selection: false,
        tip: false,
        menu: false,
        align: "center",
        menuAlign: "center",
        menuWidth: "180",
        index: false,
        column: []
      },
      page: {
        // 列表分页数据
        pageSizes: [10, 20, 30, 40],
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false,
      pwDatalistBm: []
    };
  },
  components: {
    ImportTemplate,
    pf
  },
  computed: {
    ...mapGetters(["common", "dict"])
  },
  mounted() {
    // this.fullLoading = this.$loading({
    //   target: ".banji-container"
    // });
  },
  created() {
    this.getPwList();
    this.getJudge();
    // this.getYhSf();
  },
  methods: {
    search() {
      this.getList();
    },
    reset() {
      Object.keys(this.searchData).forEach(key => {
        this.searchData[key] = "";
      });
      this.getList();
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.getList();
    },
    // 页码条数改变
    currentChange(val) {
      this.page.currentPage = val;
      this.getList();
    },
    rowClick(row, event) {
      this.pwDatalist.forEach(async ele => {
        if (ele.bm == event.property) {
          let res = await this.Api.xjbjtbbGetPwPf(row.bm, ele.bm);
          this.pfForm = res.data ? res.data : {};
          this.pfSubmitBtn = ele.pwlx == "0";
          this.dataBm = row.bm;
          this.pwBm = event.property;
          this.scoreDialog = true;
        }
      });
    },
    sortChange(e) {
      let str = "normal";
      switch (e.order) {
        case "ascending":
          str = "up";
          break;
        case "descending":
          str = "down";
          break;
        case "null":
          str = "normal";
          break;
        default:
          str = "normal";
          break;
      }
      this.searchData.order = str;
      this.getList();
    },
    changeCell({ row, column, rowIndex, columnIndex }) {
      if (this.pwDatalistBm && this.pwDatalistBm.length) {
        if (this.pwDatalistBm.includes(column.property)) {
          return "special-xjbjtbbb";
        }
      }
    },
    async getList() {
      this.loading = true;
      this.searchData.pageNum = this.page.currentPage;
      this.searchData.pageSize = this.page.pageSize;
      let result = await this.Api["xjbjtbbFindXsglkXjbjtbbList"](
        this.searchData
      );
      if (result.statusCode == 200) {
        this.data = result.data.data;
        this.page.total = Number(result.data.total);
      }
      this.loading = false;
    },
    toFormClick() {},
    //导入模板成功处理
    importSuccessEvent(res) {
      this.importDialog = false;
      this.menuRightSelected = 3;
      this.getOtherConfigData(this.modular, this.role, this.menuRightSelected);
      this.getTableConfigData(this.modular, this.role, this.menuRightSelected);
      //先清除搜索内容，再添加
      Object.keys(this.searchData).forEach(key => (this.searchData[key] = ""));
    },
    //获取用户身份
    async getYhSf() {
      let res = await this.Api.pjryglFindYhSf();
      this.role = res.statusCode == 200 ? res.data : "";
      const actions = {
        xsglk() {
          this.menuRightSelected = 3;
        },
        other() {
          this.role = "0";
          this.$message.error("身份不正确");
        }
      };
      let action = actions[res.data] || actions["other"];
      action.call(this);

      // this.role = "xsglk";
      // this.menuRightSelected = 3;
    },
    handelCells() {
      //列表行动态添加
      let arr = [];
      this.pwDatalist.forEach(ele => {
        let obj = {};
        obj.label = ele.pwxm;
        obj.prop = ele.bm;
        arr.push(obj);
      });
      let obj = {
        label: "评审组评分",
        overHidden: true,
        children: arr
      };
      let obj2 = {
        label: "平均分",
        prop: "pjf",
        overHidden: true,
        width: 150,
        sortable: "custom"
      };
      let column = [
        {
          label: "学院",
          prop: "xy",
          overHidden: true,
          width: 150,
          fixed: true
        },
        {
          label: "班级",
          prop: "bj",
          overHidden: true,
          width: 150,
          fixed: true
        },
        {
          label: "班级人数",
          prop: "bjrs",
          overHidden: true,
          width: 150
        },
        {
          label: "本专业（年级）班级数",
          prop: "bzybjs",
          overHidden: true,
          width: 150
        },
        {
          label: "本学年班集体获奖情况（校级及以上集体奖项）",
          prop: "bxnbjthjqk",
          overHidden: true,
          width: 150
        },
        {
          label: "本学年班级个人获奖情况（校级及以上，奖学金除外）",
          prop: "bxnbjgrhjqk",
          overHidden: true,
          width: 150
        },
        {
          label: "班级寝室总数",
          prop: "bjqszs",
          overHidden: true,
          width: 150
        },
        {
          label: "本学年十佳及百强寝室数",
          prop: "bxnsjjbqqss",
          overHidden: true,
          width: 150
        },
        {
          label: "本学年“百场报告进班级”开展情况",
          prop: "bxnbcbgjbjkzqk",
          overHidden: true,
          width: 150
        },
        {
          label: "本学年主题团日校优次数/累计开展次数",
          prop: "bxnzttrxycs",
          overHidden: true,
          width: 150
        },
        {
          label: "年级党员（含预备党员）人数比例",
          prop: "njdyrsbl",
          overHidden: true,
          width: 150
        },
        {
          label: "班级党员（含预备党员）人数及比例",
          prop: "bjdyrsbl",
          overHidden: true,
          width: 150
        },
        {
          label: "担任校、院两级学生干部人数比例",
          prop: "drxyljxsgbrsbl",
          overHidden: true,
          width: 150
        },
        {
          label: "备注",
          prop: "bz",
          overHidden: true,
          width: 150
        }
      ];
      column.push(obj, obj2);
      this.option.column = column;
      this.getList();
    },
    //  关闭弹出窗
    handleClose(done, formName) {
      this.$refs[formName].resetFields();
      done();
    },

    //  设置评委
    async submitJudges(formName) {
      let postData = {
        pwjh: []
      };
      this.handleData12.judgeArr.forEach(data => {
        postData.pwjh.push({
          gwmc: data[0],
          jgbm: data[1],
          jgmc: this.options
            .filter(data1 => data1.gwmc == data[0])[0]
            .children.filter(data1 => data1.jgbm == data[1])[0].jgmc,
          sfxtn: "1"
        });
      });
      this.handleData12.createJudge.forEach(data => {
        postData.pwjh.push({
          jgbm: "",
          jgmc: data,
          sfxtn: "0"
        });
      });
      if (!this.judgesLoading) {
        this.judgesLoading = true;
        let res = await this.Api.xjbjtbbSavePw(postData);
        if (res.statusCode == 200) {
          this.getPwList();
          this.$message.success(res.message);
          this.handleDialogVisible12 = false;
          this.$refs[formName].resetFields();
          this.reload();
        }
        this.judgesLoading = false;
      }
    },
    //  查询评委
    async getJudge() {
      let res = await this.Api.gwjgTree();
      if (res.statusCode == 200) {
        res.data.forEach(data => {
          data.jgbm = data.gwmc;
          data.jgmc = data.gwmc;
        });
        this.options = res.data;
      }
      this.dxProps = {
        multiple: true,
        checkStrictly: false,
        label: "jgmc",
        value: "jgbm"
      };
    },
    async pfHandelSubmit(e) {
      this.pfBtnLoading = true;
      let params = {
        ...e,
        bm: this.dataBm
      };
      let res = await this.Api.xjbjtbbSaveXtwPwPf(this.pwBm, params);
      if (res.statusCode == 200) {
        this.$message.success(res.message);
        this.getList();
        this.scoreDialog = false;
      }
      this.pfBtnLoading = false;
    },
    pfHandelCancel() {
      this.scoreDialog = false;
      this.pfBtnLoading = false;
    },
    async getPwList() {
      let res = await this.Api.xjbjtbbGetPwList();
      if (res.statusCode == 200) {
        this.handleData12.judgeArr = [];
        this.handleData12.createJudge = [];
        res.data.forEach(data => {
          if (data.pwlx == 1) {
            this.handleData12.judgeArr.push([data.bz, data.pwbm]);
          } else {
            this.handleData12.createJudge.push(data.pwxm);
          }
          this.pwDatalistBm.push(data.bm);
        });
        this.csOptions = JSON.parse(JSON.stringify(this.handleData12));
        this.pwDatalist = res.data;
        this.handelCells();
      }
    }
  },
  watch: {
    scoreDialog(nv) {
      if (!nv) {
        this.pfBtnLoading = false;
        this.pfForm = {};
      }
    },
    role(nv) {
      if (nv == "xsglk") {
        this.fullLoading.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.banji-container {
  height: 735px;
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 9px;
  overflow: hidden;

  .middle_content {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;

    .right {
      padding: 20px 0 0 20px;
      width: 100%;
      border-left: 1px solid hsla(0, 0%, 60.8%, 0.31);
      -ms-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
      flex: 1 1 auto;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
      overflow-x: auto;
      height: 100%;

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

      .adminBoxContent {
        width: 100%;
      }

      .table {
        width: calc(100% - 20px);
        padding: 0px 0px 60px 0px;

        i {
          margin-right: 10px;
        }
        /deep/ .special-xjbjtbbb {
          cursor: pointer;
          color: blue;
        }
      }
    }
  }
}
/deep/ .avue-crud__right {
  top: 10px;
}
</style>
<style scoped="scoped" lang="scss">
/deep/ .el-dialog__body {
  padding: 10px 20px;
}

/deep/ .el-dialog__body .menu_header {
  border: none;
}

.el-dialog .middle_title p {
  margin: 0;
}

.el-checkbox {
  margin: 0;
  width: 150px;
}

/deep/ .tree .el-tree-node__expand-icon {
  -webkit-transform: rotate(0);
  transform: rotate(0);
}

/deep/
  .tree
  .el-tree-node__children
  .el-tree-node__expand-icon.expanded:before {
  background: url(~@/assets/images/role/jian.png) no-repeat center;
}

/deep/ .tree .el-tree-node__children .el-tree-node__expand-icon.is-leaf:before {
  background: url(~@/assets/images/role/jian.png) no-repeat center;
}

/deep/ .tree .el-tree-node__expand-icon.expanded:before {
  background: url(~@/assets/images/role/jian.png) no-repeat center;
}

/deep/ .avue-crud__box .el-card__body {
  padding: 5px 0px 0px 0px;
}

/deep/ .el-form-item {
  margin-bottom: 20px;
}

/deep/ .el-table__row {
  height: 53px;
}

/deep/ .avue-crud__pagination {
  height: auto;
  overflow-x: scroll;
  overflow-y: hidden;
}

/deep/ .avue-crud__pagination .el-pagination {
  position: relative;
  float: right;
  max-width: 100%;
}
/deep/ .el-form {
  .el-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
