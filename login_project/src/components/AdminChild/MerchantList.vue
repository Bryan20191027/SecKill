<template>
  <div>
    <el-container>
  <el-row :gutter="20" v-if="(!ifChange)&&(!ifSet)">
    <el-col v-for="(merchant,index) in Merchants" :key="reFresh" :span="6" :offset="1" class="el-col">
      <el-card class="box-card1" shadow="hover">
        <div slot="header" class="clearfix">
          <span>{{merchant.name}}</span>
        </div>
        <div class="text item">
          <div>{{"商品id:"+merchant.id}}</div>
          <div>{{"商品价格:"+merchant.price}}</div>
          <div>{{"商品数量:"+merchant.count}}</div>
          <div>{{"商品描述:"+merchant.description}}</div>
        </div>
        <div>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="changeMerchant(index)">修改</el-button>
          <el-button type="success" size="small" @click="setMerchant(index)">设置商品为秒杀商品</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteMerchant(merchant.id)">删除</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
      <div class="changeDiv" v-if="(ifChange)&&(!ifSet)">
        <span>{{Merchants[settingIndex].name}}</span>
        <div>{{"商品id:"+Merchants[settingIndex].id}}</div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-input v-model="MerchantsChange.price" :placeholder=Merchants[settingIndex].price></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="MerchantsChange.count" :placeholder=Merchants[settingIndex].count></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="MerchantsChange.description" :placeholder=Merchants[settingIndex].description></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="changeMerchantSet">提交修改</el-button>
        </el-form>
      </div>
      <div class="changeDiv" v-if="(!ifChange)&&(ifSet)">
        <span>{{Merchants[settingIndex].name}}</span>
        <div>{{"商品id:"+Merchants[settingIndex].id}}</div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-input v-model="MerchantsSet.price" :placeholder=Merchants[settingIndex].price></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="MerchantsSet.count" :placeholder=Merchants[settingIndex].count></el-input>
          </el-form-item>
          <el-form-item>
            <el-col class="line" :span="3">秒杀时间</el-col>
            <el-col :span="9">
              <el-date-picker type="datetime" placeholder="选择开始时间" v-model="MerchantsSet.start_time" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="9">
              <el-date-picker type="datetime" placeholder="选择结束时间" v-model="MerchantsSet.end_time" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="SetMerchantSet">设置秒杀商品</el-button>
        </el-form>
      </div>
    </el-container>
  </div>
</template>


<script>
import { handleConfirm, handleAlert } from "../../utils/confirm"
export default {
  name: "MerchantList",
  data(){
    return{
      Merchants:[],
      reFresh:0,
      ifChange:false,
      ifSet:false,
      settingIndex:null,
      MerchantsChange:{
        price:"",
        count:"",
        description:""
      },
      MerchantsSet:{
        price:"",
        count:"",
        start_time:"",
        end_time:""
      }
    }
  },
  mounted() {
    this.getMerchantList()
  },
  methods: {
    getMerchantList() {
      this.Merchants = []
      var vm = this;
      this.axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        url: "http://47.99.149.141:8000/mechant"
      }).then(function (resp) {
        var result = resp.data;
        if (result.success === true) {
          for (var i = 0; i < result.data.list.length; i++) {
            vm.Merchants.push(result.data.list[i])
          }
        } else {
          alert("Fail")
        }
      })
    },
    changeMerchant(index) {
      this.settingIndex = index
      this.ifChange = true
    },
    deleteMerchant(merchantID) {
      handleConfirm('是否确定删除该商品').then(res=>{
        alert(merchantID)
        var vm = this;
        this.axios({
          headers: {
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method: "DELETE",
          url: "http://47.99.149.141:8000/mechant",
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
            vm.getMerchantList();
          } else {
            vm.$message.error('删除失败');
          }
        })
      }).catch(err=>{
        handleAlert('取消删除该商品')
      })
    },
    setMerchant(merchantID) {
      handleConfirm('是否确定要将该商品设置为秒杀商品').then(res=>{
        this.settingIndex = merchantID
        this.ifSet=true
      }).catch(err=>{
        this.$message.success('取消将该商品设置为秒杀商品')
      })
    },
    changeMerchantSet() {
      var vm = this;
      if (this.MerchantsChange.price === "" || this.MerchantsChange.count === "" || this.MerchantsChange.description === "") {
        this.$message.error('请输入完整商品信息')
      } else {
        this.axios({
          headers: {
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method: "PUT",
          url: "http://47.99.149.141:8000/mechant",
          transformRequest: [function (data) {
            return JSON.stringify(data)
          }],
          data: {
            id: this.Merchants[this.settingIndex].id,
            name: this.Merchants[this.settingIndex].name,
            price: this.MerchantsChange.price,
            count: this.MerchantsChange.count,
            description: this.MerchantsChange.description,
          }
        }).then(function (resp) {
          if (resp.data.data === true) {
            vm.$message.success('修改成功')
            vm.reFresh += 1
            vm.getMerchantList();
          } else {
            vm.$message.error('修改失败');
          }
        })
        this.MerchantsChange={}
        this.ifChange = false
        this.settingIndex = null
        //this.$forceUpdate()
      }
    },
    SetMerchantSet(){
      var vm = this;
      if (this.MerchantsSet.price === "" || this.MerchantsSet.count === ""
        || this.MerchantsSet.start_time === ""||this.MerchantsSet.end_time === "") {
        this.$message.error('请输入完整秒杀商品信息')
      } else if(this.MerchantsSet.start_time>this.MerchantsSet.end_time){
        this.$message.error('请输入正确秒杀商品时间信息')
      }
      else {
        this.MerchantsSet.start_time=this.moment(this.MerchantsSet.start_time).format("YYYY-MM-DD HH:mm:ss")
        this.MerchantsSet.end_time=this.moment(this.MerchantsSet.end_time).format("YYYY-MM-DD HH:mm:ss")
        this.axios({
          headers: {
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method: "POST",
          url: "http://47.99.149.141:8000/mechant/setSeckillMechant/"+this.Merchants[this.settingIndex].id,
          transformRequest: [function (data) {
            return JSON.stringify(data)
          }],
          data: {
            seckill_price:this.MerchantsSet.price,
            stock_count:this.MerchantsSet.count,
            start_time:this.MerchantsSet.start_time,
            end_time:this.MerchantsSet.end_time
          }
        }).then(function (resp) {
          if (resp.data.data !== "") {
            vm.$message.success('设置成功')
          } else {
            vm.$message.error('设置失败');
          }
        })
        this.MerchantsSet={}
        this.ifSet = false
        this.settingIndex = null
        //this.$forceUpdate()
      }
    }
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
  width: 500px;
}
.box-card2 {
  width: 200px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.el-col {
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-but{
  margin-right: 5px;
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
</style>

<style>
</style>
