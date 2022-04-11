<template>
  <div class="conScroll">
    <el-container>
      <el-row :gutter="20">
        <el-col v-for="(merchant) in userMerchants" :key="reFreshKey" :span="18" :offset="1" class="el-col">
          <el-card class="box-card1" shadow="hover">
            <!--<div slot="header" class="clearfix">
              <span>{{merchant.id}}</span>
            </div>-->
            <div class="text item">
              <span style="font-size: 18px;">{{merchant.id}}</span>
              <div style="padding: 14px">
                <span style="font-size: 20px;">{{"&#12288&#12288&#12288库存:"+merchant.stockCount}}</span>
                <span style="font-size: 20px;color: crimson;">{{"&#12288&#12288&#12288价格:￥"+merchant.seckillPrice}}</span>
                <div class="rightDIV">
                  <div style="padding: 10px"><timeCD :overTime="merchant.startTime" :endTime="merchant.endTime"></timeCD></div>
                  <el-button type="danger" round  @click="buySecMerchant(merchant.startTime,merchant.id)">立即购买</el-button>
                </div>
              </div>
            </div>
            <el-collapse class="des">
              <el-collapse-item >
                <template slot="title">
                  详细信息<i class="header-icon el-icon-info"></i>
                </template>
                <div style="font-size: 15px">
                <div>商品信息：{{merchant.description}}</div>
                <div>开始时间：{{merchant.startTime}}</div>
                <div>结束时间：{{merchant.endTime}}</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import timeCD from "./SecKillTimes"

export default {
name: "buyMerchant",
  data(){
    return{
      userMerchants:[],
      reFreshKey:0
    }
  },
  mounted() {
    this.getUserMerchantList()
  },
  methods:{
    alertD(){
      alert(this.userMerchants.length)
    },
    getUserMerchantList() {
      this.userMerchants=[]
      var vm = this;
      this.axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        url: "http://47.99.149.141:8000/seckill-mechant/list/user"
      }).then(function (resp) {
        var result = resp.data;
        if (result.success === true) {
          for (var i = 0; i < result.data.length; i++) {
            vm.userMerchants.push(result.data[i])
          }
        } else {
          alert("Fail")
        }
      })
    },
    buySecMerchant(startTime,sid){
      if(new Date(startTime)>new Date()){
        alert('秒杀尚未开始')
      }else {
        var vm = this;
        this.axios({
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
          url: "http://47.99.149.141:8000/service/path/",
          params: {
            "uid": sessionStorage.getItem('uid')
          }
        }).then(function (resp) {
          var result = resp.data;
          if (result.success === true) {
            //二次请求
            vm.buySecMerchantPath(sid, result.data)
          } else {
            alert("Fail")
          }
        })
      }
    },
    buySecMerchantPath(sid,path){
      var vm = this
      this.axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        url: "http://47.99.149.141:8000/service/doseckill/"+path,
        params:{
          "uid":sessionStorage.getItem('uid'),
          "sid":sid
        }
      }).then(function (resp) {
        var resultSec = resp.data;
        if (resultSec.success === true) {
          vm.$alert(resultSec.data, '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
          setTimeout(function () {
            vm.getUserMerchantList();
          }, 700);
        } else {
          vm.$alert('购买失败', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
          vm.reFreshKey+=1
          vm.getUserMerchantList()
        }
      })
      /*vm.getUserMerchantList()
      vm.reFresh+=1*/
      // vm.getUserMerchantList()
    }
  }
}
</script>

<style scoped>
.box-card1 {
  width: 150%;
  height: auto;
  max-width: 1200px;
  /*max-height: 200px;*/
  border-color: #99a9bf;
  border-width: 3px;
}

.el-col {
  margin-bottom: 5px;
  margin-top: 5px;
}

.des{
  width: 80%;
}

.rightDIV{
  font-size: 30px;
  max-height: 40px;
  max-width: 110px;
  color: red;
  float: right;
}

.conScroll{
  height: 100vh;
  overflow-y: scroll;
}
</style>
