<template>
  <div>
    <topDiv></topDiv>
    <el-container class="conScroll">
      <el-row :gutter="20" v-if="!ifChange" style="display: flex;flex-wrap: wrap">
        <el-col v-for="(merchant,index) in SecMerchants" :key="reFresh" :span="5" :offset="2" class="el-col">
          <el-card class="box-card1" shadow="hover">
            <div slot="header" class="clearfix" style="font-size: 30px">
              <span>{{merchant.id}}</span>
            </div>
            <div class="text item">
              <div>{{"价格:"+merchant.seckillPrice}}</div>
              <div>{{"数量:"+merchant.stockCount}}</div>
              <div>{{"开始时间:"+merchant.startTime}}</div>
              <div>{{"结束时间:"+merchant.endTime}}</div>
              <div>{{"描述:"+merchant.description}}</div>
            </div>
            <div>
              <el-button type="primary" size="small" icon="el-icon-edit" @click="changeSecMerchant(index)">修改</el-button>
              <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteSecMerchant(merchant.id)">删除</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="changeDiv" v-if="ifChange">
        <div>{{"秒杀商品id:"+SecMerchants[settingIndex].id}}</div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-input v-model="SecMerchantsChange.seckillPrice" :placeholder=SecMerchants[settingIndex].seckillPrice></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="SecMerchantsChange.stockCount" :placeholder=SecMerchants[settingIndex].stockCount></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="SecMerchantsChange.description" :placeholder=SecMerchants[settingIndex].description></el-input>
          </el-form-item>
          <el-form-item>
            <el-col class="line" :span="3">秒杀时间</el-col>
            <el-col :span="9">
              <el-date-picker type="datetime" placeholder="选择开始时间" v-model="SecMerchantsChange.startTime" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="9">
              <el-date-picker type="datetime" placeholder="选择结束时间" v-model="SecMerchantsChange.endTime" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="changeSecMerchantSet">提交修改</el-button>
        </el-form>
      </div>
      <div style="margin-top: 30px;"></div>
    </el-container>
  </div>
</template>


<script>
import { handleConfirm, handleAlert } from "../../utils/confirm"
export default {
  name: "MerchantList",
  data(){
    return{
      SecMerchants:[],
      reFresh:0,
      ifChange:false,
      settingIndex:null,
      SecMerchantsChange:{
        seckillPrice:"",
        stockCount:"",
        description:"",
        startTime:"",
        endTime:"",
      }
    }
  },
  mounted() {
    this.getSecMerchantList()
  },
  methods: {
    getSecMerchantList() {
      this.SecMerchants = []
      var vm = this;
      this.axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://47.99.149.141:8000/seckill-mechant/list"
      }).then(function (resp) {
        var result = resp.data;
        if (result.success === true) {
          for (var i = 0; i < result.data.list.length; i++) {
            vm.SecMerchants.push(result.data.list[i])
          }
        } else {
          this.$message.error('查询失败')
        }
      })
    },
    changeSecMerchant(index) {
      this.settingIndex = index
      this.ifChange = true
    },
    deleteSecMerchant(merchantID) {
      handleConfirm('是否确定删除该商品').then(res=>{
        var vm = this;
        this.axios({
          headers: {
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method: "DELETE",
          url: "http://47.99.149.141:8000/seckill-mechant",
          params: {
            "id": merchantID
          }
        }).then(function (resp) {
          if (resp.data.success === true) {
            vm.$message({
              message: '删除成功',
              type: 'success'
            });
            vm.reFresh += 1
            vm.getSecMerchantList();
          } else {
            vm.$message.error('删除失败');
          }
        })
      }).catch(err=>{
        handleAlert('取消删除该商品')
      })
    },
    changeSecMerchantSet() {
      var vm = this;
      if (this.SecMerchantsChange.seckillPrice === "" || this.SecMerchantsChange.stockCount === ""
        || this.SecMerchantsChange.description === ""||this.SecMerchantsChange.startTime === ""
        ||this.SecMerchantsChange.endTime === "") {
        this.$message.error('请输入完整商品信息')
      }else if(this.SecMerchantsChange.endTime<new Date()){
        this.$message.error('请输入正确结束时间')
      }
      else if(this.SecMerchantsChange.startTime>this.SecMerchantsChange.endTime){
        this.$message.error('请输入正确时间段')
      }
      else {
        this.SecMerchantsChange.startTime=this.moment(this.SecMerchantsChange.startTime).format("YYYY-MM-DD HH:mm:ss")
        this.SecMerchantsChange.endTime=this.moment(this.SecMerchantsChange.endTime).format("YYYY-MM-DD HH:mm:ss")
        this.axios({
          headers: {
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method: "PUT",
          url: "http://47.99.149.141:8000/seckill-mechant",
          transformRequest: [function (data) {
            return JSON.stringify(data)
          }],
          data: {
            id: this.SecMerchants[this.settingIndex].id,
            mechantId: this.SecMerchants[this.settingIndex].mechantId,
            seckillPrice: this.SecMerchantsChange.seckillPrice,
            stockCount: this.SecMerchantsChange.stockCount,
            description: this.SecMerchantsChange.description,
            startTime:this.SecMerchantsChange.startTime,
            endTime:this.SecMerchantsChange.endTime,
          }
        }).then(function (resp) {
          if (resp.data.success === true) {
            vm.$message.success('修改成功')
            vm.reFresh += 1
            vm.getSecMerchantList();
          } else {
            vm.$message.error('修改失败');
          }

        })
        this.ifChange = false
        this.MerchantsChange={}
        this.settingIndex = null
        //this.$forceUpdate()
      }
    },
  }
}
</script>

<style scoped>
.text {
  font-size: 20px;
}
.item {
  margin-bottom: 18px;
}
.box-card1 {
  width: 350px;
  border-color: #99a9bf;
  margin-bottom: 30px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
  font-size: 50px;
}
.clearfix:after {
  clear: both
}
.el-col {
  margin-top: 20px;
  margin-right: 20px;
}
.changeDiv{
  alignment: center;
  font-size: 40px;
  text-align: center;
  margin-top:60px;
  margin-left: auto;
  margin-right: auto;
  line-height:100px;
  top:0;
  left:0;
  right:0;
  bottom:0;
}

.conScroll{
  width: 87%;
  height: 100vh;
  overflow-y: scroll;
}
</style>

<style>
</style>

