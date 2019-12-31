<template>
  <div>
    <el-form
      :model="scoreForm"
      :rules="formRules"
      ref="scoreForm"
      label-width="160px"
      style="width: 100%"
    >
      <el-form-item label="班级概况：" prop="bjgk">
        <el-input
          v-model="scoreForm.bjgk"
          placeholder="请输入"
          :disabled="!btnShow"
        >
          <template slot="append">分（满分30分）</template>
        </el-input>
      </el-form-item>
      <el-form-item label="特色展示-创新性：" prop="cxx">
        <el-input
          v-model="scoreForm.cxx"
          placeholder="请输入"
          :disabled="!btnShow"
        >
          <template slot="append">分（满分20分）</template>
        </el-input>
      </el-form-item>
      <el-form-item label="特色展示-示范性：" prop="sfx">
        <el-input
          v-model="scoreForm.sfx"
          placeholder="请输入"
          :disabled="!btnShow"
        >
          <template slot="append">分（满分20分）</template>
        </el-input>
      </el-form-item>
      <el-form-item label="特色展示-推广性：" prop="tgx">
        <el-input
          v-model="scoreForm.tgx"
          placeholder="请输入"
          :disabled="!btnShow"
        >
          <template slot="append">分（满分20分）</template>
        </el-input>
      </el-form-item>
      <el-form-item label="班导师点评：" prop="bdsdp">
        <el-input
          v-model="scoreForm.bdsdp"
          placeholder="请输入"
          :disabled="!btnShow"
        >
          <template slot="append">
            分（满分5分）<span>&nbsp;&nbsp;</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="随机问答：" prop="sjwd">
        <el-input
          v-model="scoreForm.sjwd"
          placeholder="请输入"
          :disabled="!btnShow"
        >
          <template slot="append">
            分（满分5分）<span>&nbsp;&nbsp;</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="评审意见：" prop="psyj">
        <el-input
          v-model="scoreForm.psyj"
          type="textarea"
          placeholder="请输入"
          :disabled="!btnShow"
        >
        </el-input>
      </el-form-item>
      <el-row type="flex" justify="center" align="bottom">
        <el-button
          type="primary"
          v-if="btnShow"
          :loading="btnLoading"
          @click="handelSubmit"
          >确定</el-button
        >
        <el-button @click="handelCancel">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "pf",
  props: ["pfBtnLoading", "pfForm", "pfSubmitBtn"],
  data() {
    return {
      scoreForm: {},
      formRules: {
        bjgk: [
          { required: true, message: "请输入班级概况评分", trigger: "blur" },
          {
            pattern: /^((30((\.0{1,2})?))|((\d|[1-2]\d)(\.\d{1,2})?))$/,
            message: "请输入正确的班级概况评分",
            trigger: "blur"
          }
        ],
        cxx: [
          {
            required: true,
            message: "请输入特色展示-创新性评分",
            trigger: "blur"
          },
          {
            pattern: /^((20((\.0{1,2})?))|((\d|1\d)(\.\d{1,2})?))$/,
            message: "请输入正确的特色展示-创新性评分",
            trigger: "blur"
          }
        ],
        sfx: [
          {
            required: true,
            message: "请输入特色展示-示范性评分",
            trigger: "blur"
          },
          {
            pattern: /^((20((\.0{1,2})?))|((\d|1\d)(\.\d{1,2})?))$/,
            message: "请输入正确的特色展示-示范性评分",
            trigger: "blur"
          }
        ],
        tgx: [
          {
            required: true,
            message: "请输入特色展示-推广性评分",
            trigger: "blur"
          },
          {
            pattern: /^((20((\.0{1,2})?))|((\d|1\d)(\.\d{1,2})?))$/,
            message: "请输入正确的特色展示-推广性评分",
            trigger: "blur"
          }
        ],
        bdsdp: [
          { required: true, message: "请输入班导师点评评分", trigger: "blur" },
          {
            pattern: /^((5((\.0{1,2})?))|([0-4](\.\d{1,2})?))$/,
            message: "请输入正确的班导师点评评分",
            trigger: "blur"
          }
        ],
        sjwd: [
          { required: true, message: "请输入随机问答评分", trigger: "blur" },
          {
            pattern: /^((5((\.0{1,2})?))|([0-4](\.\d{1,2})?))$/,
            message: "请输入正确的随机问答评分",
            trigger: "blur"
          }
        ],
        psyj: [{ required: true, message: "请输入评审意见", trigger: "blur" }]
      },
      btnLoading: false,
      btnShow: false
    };
  },
  mounted() {
    this.btnLoading = this.loading;
  },
  created() {},
  methods: {
    handelSubmit() {
      this.$refs["scoreForm"].validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          this.$emit("pfHandelSubmit", this.scoreForm);
        }
      });
    },
    handelCancel() {
      this.$refs["scoreForm"].resetFields();
      this.scoreForm = {
        bjgk: "",
        cxx: "",
        sfx: "",
        tgx: "",
        bdsdp: "",
        sjwd: "",
        psyj: ""
      };
      this.$emit("pfHandelCancel");
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
    }
  },
  watch: {
    pfBtnLoading: {
      handler(nv) {
        if (!nv) {
          this.btnLoading = nv;
        }
      },
      deep: true
    },
    pfForm: {
      handler(nv) {
        this.scoreForm = this.deepCopy(nv);
      },
      deep: true,
      immediate: true
    },
    pfSubmitBtn: {
      handler(nv) {
        this.btnShow = nv;
      },
      deep: true,
      immediate: true
    },
    scoreForm: {
      handler(nv) {
        if (!Object.keys(nv).length) {
          this.$refs["scoreForm"].resetFields();
          this.scoreForm = {
            bjgk: "",
            cxx: "",
            sfx: "",
            tgx: "",
            bdsdp: "",
            sjwd: "",
            psyj: ""
          };
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-input-group--append .el-input-group__append span {
  word-break: break-all;
}
</style>
