import { mapGetters } from "vuex";
import { getOtherConfig, getTableConfig } from "../config";
import { exportExcel } from "@/utils/util";
import lefttree from "../components/leftTree";
import rightsearch from "../components/rightSearch";
import righttable from "../components/rightTable";
import bus from "../components/bus";

const mixin = {
  data() {
    return {
      treeParams: {}, //请求树参数
      searchCollocation: {}, //右侧查询项
      menuLeft: [], //左侧操作菜单，例如通过-上报-导出等
      menuRight: {}, //右侧操作菜单，例如学院-学生
      // 顶部检索表单
      searchData: {},
      option: {}, //表格option
      handelMenu: [], //表格内部操作，如通过-驳回等
      interfaceName: "", //接口名
      rowClickDetail: [], //点击表格跳转
      rowClickStatic: [], //表格固定列
      njSelected: [], //年级下拉菜单
      bjSelected: [], //班级下拉菜单
      zySelected: [], //专业下拉菜单
      xySelected: [], //学院下拉菜单
      xndSelected: [], //学年度下拉菜单
      zpdjSelected: [], //自评等级下拉菜单
      sblbSelected: [], //自评等级下拉菜单
      shztSelected: [
        //审核状态数组
        {
          name: "待审核",
          bm: "0"
        },
        {
          name: "已通过",
          bm: "1"
        },
        {
          name: "已驳回",
          bm: "2"
        },
        {
          name: "已上报",
          bm: "3"
        }
      ],
      sfwjSelected: [
        {
          name: "是",
          bm: "1"
        },
        {
          name: "否",
          bm: "0"
        }
      ],
      selectionChangeData: [], //选择表格时所需要的数据
      exportLoading: true, //导出时防止重复点击
      exportCondition: {}, //数据导出条件
      jxdjData: [], //奖项等级集合
      jxdjDataSelect: [],
      xjNjselected: [],
      removeRatingData: []
    };
  },
  created() {
    this.findZPDJSBLB();
    this.hasRating();
    this.getYhSf();
    bus.$on("rowClickDetail", e => {
      if (e.sszyBm) {
        this.getNjData(e.sszyBm);
      }
      if (e.njBm) {
        this.getBjData(e.sszyBm, e.njBm);
      }
      //寝室
      if (e.zybm) {
        this.getNjData(e.zybm);
      }
      if (e.njbm) {
        this.getBjData(e.zybm, e.njbm);
      }
      e.jxfbBm = this.$route.query.jxfbBm;
      if (this.modular == "yjqs") {
        this.menuRightSelected = 4;
      } else if (this.modular == "xjbjt") {
        this.menuRightSelected = 5;
      } else {
        this.menuRightSelected = 2;
      }
      this.getOtherConfigData(this.modular, this.role, this.menuRightSelected);
      this.getTableConfigData(this.modular, this.role, this.menuRightSelected);
      this.searchData = { ...e };

      bus.$emit("rowClickDetailSearchData", this.searchData);
    });
    bus.$on("handelSelect", e => {
      if (e.label == "专业") {
        this.getNjData(e.value);
        this.setSearchCollocation([], "年级");
      } else {
        this.getBjData(e.sszyBm, e.value);
      }
      this.setSearchCollocation([], "班级");
    });
  },
  computed: {
    ...mapGetters(["common", "dict"])
  },
  components: {
    lefttree,
    rightsearch,
    righttable
  },
  mounted() {
    this.fullLoading = this.$loading({
      target: ".right"
    });
  },
  methods: {
    //树选择，默认显示学生列表
    handleNodeClick(e) {
      let strObj = {};
      if (this.modular == "pjrygl") {
        this.menuRightSelected = this.role == "xbzr" ? 2 : 1;
        strObj = {
          XY: "ssxyBm",
          ZY: "sszyBm",
          NJ: "njBm",
          BJ: "bjBm"
        };
      } else if (this.modular == "yjqs") {
        this.menuRightSelected = 4;
        strObj = {
          XY: "xybm",
          ZY: "zybm",
          NJ: "njbm",
          BJ: "bjbm"
        };
      } else if (this.modular == "xjbjt") {
        this.menuRightSelected = 5;
        strObj = {
          XY: "ssxyBm",
          ZY: "sszyBm",
          NJ: "ssnjBm",
          BJ: "ssbjBm"
        };
      } else {
        this.menuRightSelected = 2;
        strObj = {
          XY: "ssxyBm",
          ZY: "sszyBm",
          NJ: "njBm",
          BJ: "bjBm"
        };
      }
      this.getOtherConfigData(this.modular, this.role, this.menuRightSelected);
      this.getTableConfigData(this.modular, this.role, this.menuRightSelected);
      //先清除搜索内容，再添加
      Object.keys(this.searchData).forEach(key => (this.searchData[key] = ""));
      this.searchData.jxfbBm = this.$route.query.jxfbBm;
      //将选择的树项作为查询的条件
      // const strObj = {
      //   XY: 'ssxyBm',
      //   ZY: 'sszyBm',
      //   NJ: 'njBm',
      //   BJ: 'bjBm'
      // }
      let str = strObj[e.zzjglx];
      this.$set(this.searchData, str, e.id);
    },
    /**
     * 点击查询按钮，e为传回来的搜索数据
     */
    search(e) {
      this.searchData = {
        ...this.searchData,
        ...e
      };
      this.exportCondition = this.deepCopy(this.searchData);
    },
    /**
     * 点击右侧切换数据，例如切换年级和学生
     * e为type值
     */
    menuRightChange(e) {
      this.menuClickType = "";
      this.leftMenuClickType = "";
      this.menuRightSelected = e;
      Object.keys(this.searchData).forEach(key => (this.searchData[key] = ""));
      this.searchData.jxfbBm = this.$route.query.jxfbBm;
      this.searchData = { ...this.searchData };
      this.getOtherConfigData(this.modular, this.role, this.menuRightSelected);
      this.getTableConfigData(this.modular, this.role, this.menuRightSelected);
    },
    /**
     * 获取右侧数据导出以及学院/学生配置
     * modular为模块名，例如评奖人员管理为pjrygl
     * role为角色名，例如学办主任为xbzr
     */
    getOtherConfigData(modular, role, menuRightSelected) {
      let otherConfig = getOtherConfig(modular, role, menuRightSelected);
      this.menuLeft = this.removeBtn(otherConfig.menuLeft);
      this.menuRight = otherConfig.menuRight;
    },
    /**
     * 获取右侧下方表格的参数
     * modular为模块名，例如评奖人员管理为pjrygl
     * role为角色名，例如学办主任为xbzr
     * type为右侧年级/学生type值
     */
    getTableConfigData(modular, role, type) {
      let tableConfig = getTableConfig(modular, role, type);
      this.handelCells(tableConfig);
      this.option = tableConfig.option;
      this.handelMenu = this.removeBtn(tableConfig.handelMenu);
      this.interfaceName = tableConfig.interfaceName;
      this.rowClickDetail = tableConfig.rowClickDetail;
      this.rowClickStatic = tableConfig.rowClickStatic;

      //为右侧查询项添加下拉菜单，因按行遍历而成，所以根据行的不同，分开添加，重复添加是因为第二行查询项挪到了第一行
      const optionDataObj = {
        xnd: this.xndSelected,
        njBm: this.njSelected,
        njbm: this.njSelected,
        ssnjBm: this.njSelected,
        sszyBm: this.zySelected,
        zybm: this.zySelected,
        bjBm: this.bjSelected,
        shzt: this.shztSelected,
        xy: this.xySelected,
        ssxyBm: this.xySelected,
        xybm: this.xySelected,
        ssxy: this.xySelected,
        jxdj: this.jxdjDataSelect,
        zpjg: this.zpdjSelected,
        sblb: this.sblbSelected,
        sfwj: this.sfwjSelected
      };
      tableConfig.searchCollocation.firstRow.forEach(ele => {
        ele.optionData = optionDataObj[ele.value];
      });
      tableConfig.searchCollocation.secondRow.forEach(ele => {
        ele.optionData = optionDataObj[ele.value];
      });
      this.searchCollocation = tableConfig.searchCollocation;
    },

    //获取申报类别和自评等级
    findZPDJSBLB() {
      this.zpdjSelected = this.dict.YJQS_ZPJG;
      this.sblbSelected = [
        {
          name: "先进班集体",
          bm: "1"
        },
        {
          name: "学业创新",
          bm: "2"
        },
        {
          name: "团结友爱",
          bm: "3"
        },
        {
          name: "奉献社会",
          bm: "4"
        },
        {
          name: "文体活动",
          bm: "5"
        }
      ];
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
    //选择表格
    selectionChange(e) {
      this.selectionChangeData = e;
    },
    //导出
    async export_excel(params, fileTitle, apiName) {
      //获取当前时间
      let myDate = new Date();
      let y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      let m = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let d = myDate.getDate(); //获取当前日(1-31)
      let h = myDate.getHours(); //获取当前小时数(0-23)
      let i = myDate.getMinutes(); //获取当前分钟数(0-59)
      let s = myDate.getSeconds(); //获取当前秒数(0-59)
      let ymdhis = y + "-" + m + "-" + d + " " + h + "_" + i + "_" + s;
      if (this.exportLoading) {
        this.exportLoading = false;
        let file = await this.Api[apiName](params);
        exportExcel(file, fileTitle + ymdhis + ".xlsx");
        this.exportLoading = true;
      }
    },
    //通过-驳回-编辑奖项请求函数
    async checkGjjxjsq(params, apiName) {
      if (!this.menuOtherDialogBtn) {
        this.menuOtherDialogBtn = true;
        let res = await this.Api[apiName](params);
        if (res.statusCode == 200) {
          this.$message.success(res.message);
          this.searchData = { ...this.searchData };
        }
        this.menuOtherDialog = false;
        this.menuOtherDialogBtn = false;
        return res.statusCode;
      }
    },
    //公示函数
    handelGSFn(params) {
      this.$router.push({
        path: "/awardsRecommendation/publicity",
        query: params
      });
    },

    //改变对象属性名
    changeObjAttributeName(obj, reg, newAttrName) {
      return JSON.parse(JSON.stringify(obj).replace(reg, newAttrName));
    },
    //获取专业
    async getZyData(bm) {
      let res = await this.Api.findZzjgDropListByForm(`${bm}/ZY`);
      let zySelected = res.statusCode == 200 ? res.data : [];
      let changedDataT = this.changeObjAttributeName(zySelected, /mc/g, "name");

      this.setSearchCollocation(changedDataT, "专业");
      this.zySelected = this.deepCopy(changedDataT);
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
    },
    //获取年级
    async getNjData(bm) {
      let res = await this.Api.pjryglFindNjDropList(bm);
      let njData = res.statusCode == 200 ? res.data : [];
      let changedDataT = this.changeObjAttributeName(njData, /mc/g, "name");
      this.setSearchCollocation(changedDataT, "年级");
      this.njSelected = this.deepCopy(changedDataT);
    },
    //获取班级
    async getBjData(zy, nj) {
      let res = await this.Api.pjryglFindBjDropList(zy, nj);
      let bjData = res.statusCode == 200 ? res.data : [];
      let changedDataT = this.changeObjAttributeName(bjData, /mc/g, "name");
      this.setSearchCollocation(changedDataT, "班级");
      this.bjSelected = this.deepCopy(changedDataT);
    },
    //判断是否具有审核权限
    async hasRating() {
      let res = await this.Api.gwGetSfkysp();
      console.log(res.data);
      if (res.statusCode == 200) {
        res.data || this.removeRating();
      }
    },
    //去掉审核权限
    removeRating() {
      console.log("面对疾风吧");
      this.removeRatingData = [
        "导入综合测评",
        "初始化",
        "通过",
        "驳回",
        "上报",
        "公示",
        "归档",
        "奖项重排",
        "编辑",
        "修改等级",
        "审核",
        "公示",
        "公示"
      ];
    },
    //根据是否具有审核去掉菜单按钮
    removeBtn(data) {
      if (!this.removeRatingData.length) {
        return data;
      }
      let str = data[0].icon ? "content" : "name";
      return data.filter(e => !this.removeRatingData.includes(e[str]));
    }
  },
  watch: {
    role(nv) {
      if (nv == "0") false;
      let jxdj = this.Api.findJxdjs,
        xnd = this.Api.getFindxnd,
        xylist = this.Api.findXyDropListByDlrBm,
        downList = this.Api.findManagedDropDownList,
        wholeZy = this.Api.fwzxfwzxBFxjlfindZy,
        njzyList = this.Api.findBzxx;
      let paramsArr =
        nv == "bz"
          ? [njzyList()]
          : nv == "xsglk"
          ? [
              jxdj(this.$route.query.jxfbBm),
              xnd(),
              xylist(),
              wholeZy(),
              downList()
            ]
          : [jxdj(this.$route.query.jxfbBm), xnd(), xylist(), downList()];

      Promise.all(paramsArr).then(res => {
        if (nv == "bz") {
          let njzyRes = res[0];
          if (njzyRes.statusCode === 200) {
            this.njSelected = [
              { bm: njzyRes.data[0].njbm, name: njzyRes.data[0].njmc }
            ];
            this.zySelected = [
              { bm: njzyRes.data[0].zybm, name: njzyRes.data[0].zymc }
            ];
          }
        } else {
          let jxdjRes = res[0];
          let xndRes = res[1];
          let xyRes = res[2];

          if (jxdjRes.statusCode == 200) {
            jxdjRes.data.forEach(ele => {
              this.jxdjData.push(ele.djmc);
              let obj = {};
              obj.name = ele.djmc;
              obj.bm = ele.djmc;
              this.jxdjDataSelect.push(obj);
            });

            this.jxdjData.push("无");
            this.jxdjDataSelect.push({ name: "无", bm: "无" });
          }

          this.xndSelected = xndRes.statusCode == 200 ? xndRes.data : [];

          this.xySelected = xyRes.statusCode == 200 ? xyRes.data : [];

          if (nv == "xsglk") {
            let zyRes = res[3];

            if (zyRes.statusCode == 200) {
              let changedDataO = this.changeObjAttributeName(
                zyRes.data,
                /zyBm/g,
                "bm"
              );
              let changedDataT = this.changeObjAttributeName(
                changedDataO,
                /zyMc/g,
                "name"
              );
              this.zySelected = changedDataT;
            }

            let njRes = res[4];
            this.pjryNlList = njRes.statusCode == 200 ? njRes.data.njList : [];
          } else {
            let downListRes = res[3];

            if (downListRes.statusCode === 200) {
              this.zySelected = downListRes.data.zyList;
              this.xjNjselected = downListRes.data.njList;
            }
          }
        }
        this.searchData.jxfbBm = this.$route.query.jxfbBm;
        this.searchData = { ...this.searchData };
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
        this.exportCondition = this.deepCopy(this.searchData);
        this.fullLoading.close();
      });
    },
    menuRightSelected() {
      this.selectionChangeData = [];
      //增加容错判断
      if (this.searchCollocation.firstRow && this.searchCollocation.secondRow) {
        //判断切换的菜单中是否有专业项，如果有，则查看查询条件中有无学院条件，有则按照学院查询专业，无则判断角色，按角色查询全部
        if (
          Array.from(
            [
              ...this.searchCollocation.firstRow,
              ...this.searchCollocation.secondRow
            ],
            ({ label }) => label
          ).includes("专业")
        ) {
          this.searchData.ssxyBm
            ? this.getZyData(this.searchData.ssxyBm)
            : this.setSearchCollocation(this.zySelected, "专业");
        }
      }
    }
  },
  destroyed() {
    this.fullLoading.close();
  }
};

export default mixin;
