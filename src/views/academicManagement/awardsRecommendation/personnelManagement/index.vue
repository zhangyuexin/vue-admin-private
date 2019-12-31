<template>
  <div class="banji-container">
    <div class="middle_title">
      <P>{{ common.heightTitle }}</P>
    </div>
    <div class="middle_content">
      <div class="left">
        <lefttree :treeParams="treeParams" @handleNodeClick="handleNodeClick"></lefttree>
      </div>
      <div class="right">
        <rightsearch :searchCollocation="searchCollocation" @search="search"></rightsearch>
        <righttable :menuLeft="menuLeft" :menuRight="menuRight" :option="option" :handelMenu="handelMenu" :searchData="searchData" :interfaceName="interfaceName" :rowClickDetail="rowClickDetail" :rowClickStatic="rowClickStatic" @menuLeftClick="menuLeftClick" @menuRightChange="menuRightChange" @menuClick="menuClick" @selectionChange="selectionChange"></righttable>
      </div>
      <!-- 修改专业年级 -->
      <el-dialog title="修改" :visible.sync="menuOtherDialog" width="40%">
        <el-form label-width="152px">
          <div class="jcjyapplyWrap4">
            <div style="padding-top: 20px;">
              <el-row>
                <el-form-item label="专业">
                  <el-select :popper-append-to-body="false" v-model="changeZy" placeholder="请选择专业" @change="handelZY">
                    <el-option v-for="(item, index) in zySelected" :key="index" :label="item.name" :value="item.bm"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="年级">
                  <el-select :popper-append-to-body="false" v-model="changeNj" placeholder="请选择年级" @change="handelNJ">
                    <el-option v-for="(item, index) in njSelected" :key="index" :label="item.name" :value="item.bm"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="班级">
                  <el-select :popper-append-to-body="false" v-model="changeBj" placeholder="请选择班级">
                    <el-option v-for="(item, index) in bjSelected" :key="index" :label="item.name" :value="item.bm"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </div>
          </div>
          <div class="postBtn">
            <div style="margin-top:20px; text-align:center;">
              <el-button :loading="menuOtherDialogBtn" type="primary" class="scholarship-btn operation_green" @click="handelMenuClick()">提 交</el-button>
              <el-button class="operation_gray" @click="menuOtherDialog = false">取 消</el-button>
            </div>
          </div>
        </el-form>
      </el-dialog>
      <!--导入开始-->
      <el-dialog title="数据导入" :visible.sync="importDialog" width="30%" @closed="toFormClick()" :show-close="false">
        <ImportTemplate :submitAction="submitAction" :templateShow="true" :errorDocHref="errorDocHref" :fileName="fileName" :templateHref="templateHref" @importSuccessEvent="importSuccessEvent" :fileList="[]"></ImportTemplate>
      </el-dialog>
      <el-dialog title="初始化" :visible.sync="initDialog" width="40%">
        <el-form label-width="152px">
          <div class="jcjyapplyWrap4">
            <div style="padding-top: 20px;">
              <el-row>
                <el-form-item label="学年度">
                  <el-select :popper-append-to-body="false" v-model="initXndBm" placeholder="请选择学年度">
                    <el-option v-for="(item, index) in xndSelected" :key="index" :label="item.xndBm" :value="item.bm"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </div>
          </div>
          <div class="postBtn">
            <div style="margin-top:20px; text-align:center;">
              <el-button :loading="initDialogBtn" type="primary" class="scholarship-btn operation_green" @click="handelInitClick()">提 交</el-button>
              <el-button class="operation_gray" @click="initDialog = false">取 消</el-button>
            </div>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Api from "@/api";
import ImportTemplate from "@/components/upload";
import mixin from "../common/mixin";

export default {
  name: "nationalScholarshipRating",
  mixins: [mixin],

  data () {
    return {
      termsObj: {
        title: "学期注册",
        btnLoading: false, //按钮loading
        dialogFormVisible: false, //启动注册弹窗
        toForm: {
          xnd: "", //学年度
          xq: "" //学期
        },
        toFormRule: {
          xnd: [{ required: true, message: "请选择学年度", trigger: "change" }],
          xq: [{ required: true, message: "请选择学期", trigger: "change" }]
        }
      }, // 评奖人员初始化- 学期注册对象
      role: "", //角色，如辅导员等
      modular: "pjrygl", //模块 如国奖评比等
      menuRightSelected: 2, //右侧菜单选择，如勾选学生
      menuOtherDialog: false, //点击通过等，弹出框的隐藏
      njListData: [], //年级集合
      menuClickRow: "", //点击表格菜单的操作，返回的行的数据
      menuOtherDialogBtn: false, //防止通过驳回等输入原因确定时重复点击
      jxdj: "", //修改后的奖项等级
      importDialog: false, // 导入数据对话框
      submitAction: "/api/xggl/pjrygl/importZhcp", // 导入数据Api
      templateHref: "pjryglExportTemplate", // 下载模板Api
      fileName: "综合测评导入模板.xlsx", // 下载模板的文件名
      errorDocHref: "knsglDownloadErrorExcel", // 错误后下载错误文档Api
      changeZy: "", //修改专业
      changeNj: "", //修改年级
      changeBj: "", //修改班级
      changeBm: "", //修改所需编码
      initDialog: false,
      initDialogBtn: false,
      initXndBm: "",
      pjryNlList: []
    };
  },
  components: {
    ImportTemplate
  },

  mounted () {
    this.findNjList();
  },
  created () { },
  methods: {
    //点击左侧菜单回调函数
    async menuLeftClick (e) {
      const switchObj = {
        "4": function () {
          // 数据导出
          let params = {};
          params.cxtj = this.exportCondition;
          params.type = this.menuRightSelected;
          let bmArr = [];
          let objArr = [];
          if (this.selectionChangeData.length) {
            this.selectionChangeData.forEach(ele => {
              let obj = {};
              const switchObj = {
                "1": function () {
                  obj.njbm = ele.njbm;
                  obj.zybm = ele.zybm;
                  obj.xndbm = ele.xndBm;
                  objArr.push(obj);
                },
                "2": function () {
                  bmArr.push(ele.bm);
                },
                "3": function () {
                  obj.xybm = ele.xybm;
                  obj.xndbm = ele.xndBm;
                  objArr.push(obj);
                }
              };
              switchObj[this.menuRightSelected]();
            });
          }
          params.bmArr = bmArr;
          params.bmObj = objArr;
          this.export_excel(params, "评奖人员信息", "pjryglExportPjry");
        },
        "8": function () {
          // 导入综合测评
          this.importDialog = true;
        },
        "11": function () {
          this.initDialog = true;
        }
      };
      switchObj[e].call(this);
    },
    //表格内部点击事件
    menuClick (e) {
      this.menuClickRow = e.row;
      const switchObj = {
        "8": function () {
          //查看
          let params = {};
          let type = 0;
          if (this.role == "xbzr") {
            //跳到学生
            params = {
              xnd: e.row.xndBm,
              njBm: e.row.njbm,
              sszyBm: e.row.zybm
            };
            type = 2;
          } else {
            //跳到专业&年级
            params = {
              xnd: e.row.xndBm,
              ssxyBm: e.row.xybm
            };
            type = 1;
          }

          this.menuRightSelected = type;
          this.getOtherConfigData(
            this.modular,
            this.role,
            this.menuRightSelected
          );
          this.getTableConfigData(
            this.modular,
            this.role,
            this.menuRightSelected
          );
          this.searchData = { ...params };
        },
        "7": function () {
          //编辑
          this.changeBj = e.row.bjbm;
          this.changeZy = e.row.zybm;
          this.changeNj = e.row.njbBm;
          this.changeBm = e.row.bm;
          this.menuOtherDialog = true;
          this.getNjData(e.row.zybm);
          this.getBjData(e.row.zybm, e.row.njbBm);
        }
      };
      switchObj[e.type].call(this);
    },
    //确认修改
    async handelMenuClick () {
      if (this.changeZy && this.changeNj && this.changeBj) {
        let params = {
          zybm: this.changeZy,
          njbm: this.changeNj,
          bjbm: this.changeBj,
          bm: this.changeBm
        };
        if (!this.menuOtherDialogBtn) {
          this.menuOtherDialogBtn = true;
          let res = await this.Api.pjryglEditPjryxx(params);
          if (res.statusCode == 200) {
            this.$message.success(res.message);
            this.searchData = { ...this.searchData };
          }
          this.menuOtherDialogBtn = false;
          this.menuOtherDialog = false;
        }
      } else {
        this.$message.warning("请选择数据");
      }
    },
    //获取年级集合
    async findNjList () {
      let res = await this.Api.pjryglFindNjmcList();
      if (res.statusCode == 200) {
        res.data.forEach(ele => {
          this.njListData.push(ele);
        });
      }
    },
    toFormClick () { },
    //导入模板成功处理
    importSuccessEvent (res) {
      this.importDialog = false;
      this.menuRightSelected = 2;
      this.getOtherConfigData(this.modular, this.role, this.menuRightSelected);
      this.getTableConfigData(this.modular, this.role, this.menuRightSelected);
      //先清除搜索内容，再添加
      Object.keys(this.searchData).forEach(key => (this.searchData[key] = ""));
    },
    //获取用户身份
    async getYhSf () {
      let res = await this.Api.pjryglFindYhSf();
      this.role = res.statusCode == 200 ? res.data : "";
      const actions = {
        xbzr () {
          this.menuRightSelected = 1;
        },
        xsglk () {
          this.menuRightSelected = 3;
        },
        other () {
          // this.role = "0";
          // this.$message.error("身份不正确");
          this.role = "xsglk";
          this.menuRightSelected = 3;
        }
      };
      let action = actions[res.data] || actions["other"];
      action.call(this);
    },
    handelCells (tableConfig) {
      //当选择学院与专业&学生时，列表行要动态添加
      if (this.pjryNlList && this.pjryNlList.length) {
        if (this.menuRightSelected == 3) {
          let arr = [];
          this.pjryNlList.forEach(ele => {
            let obj = {};
            obj.label = ele.njmc;
            obj.prop = ele.njmc;
            obj.overHidden = true;
            arr.push(obj);
          });
          tableConfig.option.column = [...tableConfig.option.column, ...arr];
        }
      }
    },
    handelZY (e) {
      this.getNjData(e);
      this.changeNj = "";
      this.changeBj = "";
    },
    handelNJ (e) {
      this.getBjData(this.changeZy, e);
      this.changeBj = "";
    },
    async handelInitClick () {
      if (!this.initXndBm) {
        this.$message.warning("请选择学年度");
        return false;
      }
      if (this.initDialogBtn) {
        return false;
      }
      this.initDialogBtn = true;
      let res = await this.Api.pjryglInitXndPjry(this.initXndBm);
      if (res.statusCode == 200) {
        this.$message.success(res.message);
        this.initDialog = false;
      }
      this.initDialogBtn = false;
    }
  },
  watch: {
    initDialog (nv) {
      this.initXndBm = nv ? this.initXndBm : "";
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

    .left {
      -ms-flex: 0 0 380px;
      -webkit-flex: 0 0 380px;
      flex: 0 0 380px;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 380px;
    }

    .right {
      padding: 20px 0 0 20px;
      margin-left: 20px;
      border-left: 1px solid hsla(0, 0%, 60.8%, 0.31);
      -ms-flex: 1 1 auto;
      -webkit-flex: 1 1 auto;
      flex: 1 1 auto;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: auto;
      overflow-x: auto;
      height: 100%;
    }
  }
}
</style>
<style scoped="scoped">
/deep/ .avue-crud__pagination {
  margin-bottom: 20px;
  overflow: hidden !important;
}

/deep/ .tree .el-tree {
  padding-left: 20px;
}

/deep/ .tree .el-tree-node__expand-icon:before {
  content: "";
  background: url(~@/assets/images/role/jia.png) no-repeat center;
  width: 11px;
  height: 11px;
  display: block;
  position: absolute;
  top: 1px;
  left: -6px;
}

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
  margin-bottom: 15px;
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
</style>
