import { mapGetters, mapActions } from "vuex";
import { exportExcel } from "@/utils/util";
const mixin = {
  data() {
    return {
      loading: false,
      queryForm: {
        //查询数据
        xnd: "",
        mbbm: "" //奖项模板
      },
      //学年度data
      xndData: [],
      //奖项模板data
      jxmbData: [],
      //奖项类型data
      jxlxData: [],
      //所属部门data
      ssbmData: [],
      // 分页数据
      page: {
        pageSizes: [10, 20, 30, 50],
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      //列表数据
      data: [],
      // 列表配置项
      option: {
        columnBtn: false,
        refreshBtn: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        header: false,
        page: true,
        selection: true,
        tip: false,
        align: "center",
        menuAlign: "center",
        menu: true,
        index: false,
        minWidth: 200,
        // 列表表头
        column: [
          {
            label: "奖项名称",
            prop: "jxmc",
            overHidden: true,
            width: 300
          },
          {
            label: "学年度",
            prop: "xnd",
            overHidden: true,
            width: 150
          },
          {
            label: "评奖时间",
            prop: "pjsj",
            overHidden: true,
            width: 180
          },
          {
            label: "评奖范围",
            prop: "pjfw",
            overHidden: true,
            width: 80
          },
          {
            label: "评奖模板",
            prop: "mbmc",
            overHidden: true,
            width: 250
          },
          {
            label: "奖项类型",
            prop: "jxlx",
            overHidden: true,
            width: 150,
            formatter: function(row, value, label, column) {
              let res = "";
              this.jxlxData.forEach(ele => {
                if (ele.code == row.jxlx) {
                  res = ele.value;
                }
              });
              return res;
            }.bind(this)
          },
          {
            label: "所属部门",
            prop: "ssbmmc",
            overHidden: true,
            width: 150
          },
          {
            label: "奖励人数",
            prop: "jlrs",
            overHidden: true,
            width: 150
          },
          {
            label: "获奖人数",
            prop: "hjrs",
            overHidden: true,
            width: 150,
            formatter: function(row, value, label, column) {
              return row.hjrs == "" ? "-" : row.hjrs;
            }
          }
        ]
      },
      exportCondition: {}, //导出条件
      bmArr: [], //导出编码数组
      exportLoading: true, //导出loading
      role: "", //角色
      removeRatingData: []
    };
  },
  created() {
    this.getFindxnd();
    this.hasRating();
    this.getYhSf();
    this.getData();
    this.getSSBM();
    this.getJXLX();
    this.getJXMB();
    this.exportCondition = this.deepCopy(this.queryForm);
  },
  computed: {
    ...mapGetters(["common", "dict"])
  },
  mounted() {},
  methods: {
    //初始化页面
    async getData() {
      this.loading = true;
      let params = {
        ...this.queryForm,
        pageSize: this.page.pageSize,
        pageNum: this.page.currentPage
      };
      let result = await this.Api[this.listApiName](params);

      this.data = result.statusCode == 200 ? result.data.data : [];
      this.page.total =
        result.statusCode == 200 ? Number(result.data.total) : 0;
      //评奖时间由开始时间+结束时间
      this.data.forEach(ele => {
        ele.pjsj = ele.pjkssj + "," + ele.pjjssj;
      });
      this.loading = false;
    },
    //查询
    search() {
      this.page.currentPage = 1;
      this.getData();
      this.exportCondition = this.deepCopy(this.queryForm);
    },
    //重置
    reset() {
      Object.keys(this.queryForm).forEach(key => (this.queryForm[key] = ""));
    },
    //跳转审批
    approve(row) {
      this.$router.push({
        path: this.approvePath,
        query: { jxfbBm: row.bm }
      });
    },
    //表格选择
    selectionChange(list) {
      this.bmArr = [];
      list.forEach(ele => {
        this.bmArr.push(ele.bm);
      });
    },
    //导出
    async downLoadData(val) {
      let params = {};
      params.cxtj = this.exportCondition;
      params.bmArr = this.bmArr;
      this.export_excel(params, this.exportName, this.exportApi);
    },
    // 每页展示条数改变
    sizeChange(val) {
      this.page.pageSize = val;
      this.getData();
    },
    // 页码条数改变
    currentChange(val) {
      this.page.currentPage = val;
      this.getData();
    },
    //获取学年度
    async getFindxnd() {
      let result = await this.Api.getFindxnd();
      this.xndData = result.statusCode == 200 ? result.data : [];
    },
    //获取奖项模板
    async getJXMB() {
      let res = await this.Api.findMbAll();
      this.jxmbData =
        res.statusCode == 200
          ? res.data.data.filter(item => item.jxlx == this.jxlx)
          : [];
    },
    //获取奖项类型
    getJXLX() {
      this.jxlxData = this.dict["PJPY_JXLX"];
    },
    //获取所属部门
    async getSSBM() {
      let res = await this.Api.findJxfbSsbmDropList();
      this.ssbmData = res.statusCode == 200 ? res.data : [];
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

    //获取用户身份
    async getYhSf() {
      let res = await this.Api.pjryglFindYhSf();
      this.role = res.statusCode == 200 ? res.data : "";
    },
    //判断是否具有审核权限
    async hasRating() {
      let res = await this.Api.gwGetSfkysp();
      if (res.statusCode == 200) {
        res.data || this.removeRating();
      }
    },
    //去掉审核权限
    removeRating() {
      this.removeRatingData = ["打印模板", "设置"];
    }
  },
  watch: {}
};

export default mixin;
