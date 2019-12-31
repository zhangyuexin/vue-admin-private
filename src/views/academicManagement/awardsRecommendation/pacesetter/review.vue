<template>
  <div class="setting">
    <div class="middle_title">
      <P>{{ common.heightTitle }}</P>
    </div>
    <div class="middle_content">
      <!-- 表格开始 -->
      <avue-crud
        :data="data"
        :option="option"
        ref="crud"
        :table-loading="loading"
        :page="page"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot="empty">
          <div>暂无数据</div>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-tooltip effect="dark" content="评分" placement="bottom">
            <i
              class="iconfont icon-ArtboardCopy235"
              @click="handelEdit(scope.row)"
            ></i>
          </el-tooltip>
        </template>
      </avue-crud>
      <el-dialog title="评分" :visible.sync="scoreDialog" width="200px">
        <pf
          @pfHandelSubmit="pfHandelSubmit"
          @pfHandelCancel="pfHandelCancel"
          :pfBtnLoading.sync="pfBtnLoading"
          :pfForm="pfForm"
          :pfSubmitBtn="pfSubmitBtn"
        ></pf>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import pf from "./components/pf";
export default {
  data() {
    return {
      loading: false,
      data: [],
      // 列表配置项
      option: {
        columnBtn: false,
        refreshBtn: false,
        addBtn: false,
        delBtn: false,
        editBtn: false,
        page: true,
        selection: false,
        header: false,
        tip: false,
        menu: true,
        align: "center",
        menuAlign: "center",
        menuWidth: "180",
        index: false,
        indexLabel: "序号",
        // 列表表头
        column: [
          {
            label: "学院",
            prop: "xy",
            overHidden: true,
            width: 150
          },
          {
            label: "班级",
            prop: "bj",
            overHidden: true,
            width: 150
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
          },
          {
            label: "评委评分",
            overHidden: true,
            width: 150,
            prop: "pwpf"
          },
          {
            label: "评委评审意见",
            prop: "pwpsyj",
            overHidden: true,
            width: 150
          }
        ]
      },
      page: {
        // 列表分页数据
        pageSizes: [10, 20, 30, 40],
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      scoreDialog: false,
      pfBtnLoading: false,
      pfSubmitBtn: true,
      dataBm: "",
      pwBm: "",
      pfForm: {}
    };
  },
  components: {
    pf
  },
  methods: {
    //初始化
    async getData() {
      this.loading = true;
      let params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize
      };
      let res = await this.Api.xjbjtbbFindPwXjbjtbbList(params);
      if (res.statusCode == 200) {
        this.data = res.data.data;
        this.page.total = Number(res.data.total);
        this.loading = false;
      }
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
    async pfHandelSubmit(e) {
      this.pfBtnLoading = true;
      let params = {
        ...e,
        bm: this.dataBm
      };
      let res = await this.Api.xjbjtbbSavePf(params);
      if (res.statusCode == 200) {
        this.$message.success(res.message);
        this.getData();
        this.scoreDialog = false;
      }
      this.pfBtnLoading = false;
    },
    pfHandelCancel() {
      this.scoreDialog = false;
      this.pfBtnLoading = false;
    },
    async handelEdit(e) {
      this.dataBm = e.bm;
      this.pwBm = e.pwBm;
      let res = await this.Api.xjbjtbbGetPf(e.bm);
      if (res.statusCode == 200) {
        this.pfForm = res.data;
        this.scoreDialog = true;
      }
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(["common", "dict"])
  },
  created() {
    this.getData();
  },
  watch: {
    scoreDialog(nv) {
      if (!nv) {
        this.pfBtnLoading = false;
        this.pfForm = {};
      }
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.setting {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  border-radius: 9px;
  overflow-y: auto;
  overflow-x: auto;
}
.Btn {
  float: right;
  margin-bottom: 20px;
}
.btn_list {
  padding-top: 20px;
}
</style>
