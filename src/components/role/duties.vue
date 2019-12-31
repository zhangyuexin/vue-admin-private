<template>
  <!--角色信息 添加岗位弹框-->
  <div class="duties">
    <el-dialog :visible.sync="dutiesShow" :show-close="false" @closed="cancel()" width="50%" title="添加岗位">
      <div class="dutiesMain">
        <div class="dutiesHeader">
          <div>
            <span>岗位名称：</span>
            <el-input placeholder="请输入岗位名称" v-model="dutiesVal" clearable></el-input>
          </div>
          <el-button type="primary" @click="findDutiesList()" class="operation_green">查询</el-button>
        </div>
        <!--表格内容-->
        <div class="dutiesTable">
          <avue-crud ref="crud" :data="dutieData" :option="dutiesOption1" :page="dutiePage" height="100%"
            @selection-change="dutiesSelectionChange" @current-change="dutiesCurrentChange">
            <template slot="empty">
              <div>暂无数据</div>
            </template>
          </avue-crud>
        </div>
      </div>
      <div class="dutiesBtn">
        <div class="clearBox">
          <el-button   class="operation_gray" @click="cancel()">取消</el-button>
          <el-button  class="operation_green" @click="quit()">添加</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {setStore, getStore, removeStore} from '@/utils/store'

  export default {

    data() {
      return {

        dutiesVal:"",//岗位名称val
        dutiesValPage:"", //岗位名称分页val
        dutieGwbm: [],//岗位编码
        dutiePage: {  //岗位弹窗分页
          pageSizes:[5],
          total: 0,
          currentPage: 1,
          pageSize:5,
        },
        dutieData: [],//岗位弹窗表格数据
        dutiesOption1:{     //岗位弹窗表格参数
          menu:false,
          columnBtn:false,
          refreshBtn:false,
          addBtn:false,
          delBtn:false,
          editBtn:false,
          viewBtn:false,
          border:true,
          selection: true,
          page:true,
          showHeader:true,
          header:false ,
          align:'center',
          menuAlign:'center',
          column:[
            {
              label:'岗位名称',
              prop:'gwmc',
            },
            {
              label:'所属部门',
              prop:'zzjgmc',
            },
            {
              label:'创建时间',
              prop:'cjsj'
            },
            {
              label:'创建人',
              prop:'cjr'
            },
          ],//用户表格参数
        },

      };
    },
    mounted(){
    },
    created(){
       this.findroleJob()
    },
    methods: {
      ...mapActions ([
        'findGwsPage',
        'saveJsGw'
      ]),
      //获取添加的岗位列表
      findroleJob(){
        // console.log("sd")
        let data = {
          pageNum:this.dutiePage.currentPage,
          pageSize:this.dutiePage.pageSize,
          gwmc:this.dutiesValPage
        }
        this.findGwsPage(data).then(response => {
          // console.log(response,"岗位a")
          this.dutieData= response.data.data
          this.page.total=Number(response.data.total)
        }).catch(error => {
          this.$message.error('请求失败,请点击刷新或者刷新页面重试。')
        })

      },
      //添加的岗位查询
      findDutiesList(){
        this.dutiesValPage=this.dutiesVal
        this.findroleJob(this.page.currentPage)
      },
      //添加岗位
      saveDuties(){
        let data = {
          jsBm:this.jsbm,
          gwBms:this.dutieGwbm
        }
        console.log(data,"岗位")
        this.saveJsGw(data).then(response => {
          this.$message.success("添加成功")
          this.findroleJob(this.page.currentPage)
          this.page.currentPage=1
        }).catch(error => {
          this.$message.error('请求失败,请点击刷新或者刷新页面重试。')
        })
      },
      cancel(){
        this.$emit('clickClose')
          this.dutiesVal=""
        this.dutiesValPage=""
          this.page.currentPage=1
        this.findroleJob(this.page.currentPage)


      },
      quit(){
        if(this.dutieGwbm.length>0){
          this.$emit('clickQuit')
          this.dutiesVal=""
          this.dutiesValPage=""
        }else{
          this.$message.info("请选择数据")
        }

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //分页
      dutiesCurrentChange(val){
        this.currentPage = val;
        this.findroleJob(this.page.currentPage)
      },
      dutiesSelectionChange(list){
        this.dutieGwbm=[]
        let _this = this
        list.forEach((value,index,array)=>{
          _this.dutieGwbm.push(
            value.bm
          )
        })
        console.log(this.dutieGwbm,"cmo")
      },
    },
    components:{

    },
    props:["dutiesShow","jsbm"]
  };
</script>

<style scoped lang="scss">
  .clearBox:after {
    display: block;
    content: "";
    clear: both;
    visibility: hidden;
    font-size: 0;
    overflow: hidden;
  }
  @mixin centerBox {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  @mixin flexCol {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
  }
  @mixin flexRow2 {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  @mixin btnStyle {
    background: #28C6C0;
    color: white;
    border-color: #28C6C0;
  }
  .dutiesMain{
    width: 100%;
    height: 468px;
    overflow-y: auto;
    border-bottom: 1px solid rgba(155,155,155,0.31);
    @include centerBox;
    .dutiesTile{
      width: 100%;
      padding-bottom: 30px;
      border-bottom: 1px solid rgba(155,155,155,0.31);
    }
    .dutiesHeader{
      width: 100%;
      height: 71px;
      border-bottom: 1px solid rgba(155,155,155,0.31);
      margin-top: 13px;
      background: #fafafa;
      @include flexCol;
    }
    .dutiesHeader>div{
      float: left;
    }
    .dutiesHeader>div>span{
      font-size: 18px;
      color: #B9C1C8;
      text-align: right;
      float: left;
      height: 40px;
      line-height: 40px;
      margin-right: 7px;
    }
    .dutiesHeader>div .el-input,.dutiesHeader>div .el-input .el-input__inner{
      width: 200px;
      height: 40px;
      float: left;
    }
    .dutiesHeader>div:nth-child(1){
      margin-left: 20px;
    }
    .dutiesHeader .el-button{
      width: 100px;
      height: 40px;
      text-align: center;
      font-size: 16px;
      border-radius: 5px;
      box-shadow: 0 1px 3px 0;
      float: left;
      margin-left: 12px;
    }
    .dutiesTable{
      width: 100%;
    }
  }
  .dutiesBtn{
    width: 100%;
    padding-top: 30px;
    @include flexRow2;
  }
  .dutiesBtn>div .el-button{
    width: 100px;
    height: 40px;
    float: left;
    -webkit-box-shadow: 0 1px 3px 0;
    box-shadow: 0 1px 3px 0;
  }



</style>
<style>


</style>
