<template>
  <div>
    <el-container>
  <el-row :gutter="20" v-if="!ifChange">
    <el-col v-for="(merchant,index) in Merchants" :key="index" :span="6" :offset="1" class="el-col">
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
          <el-button type="success" size="small" @click="setMerchant">设置商品为秒杀商品</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteMerchant(merchant.id)">删除</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
      <div class="text item" v-if="ifChange">
        <span>{{Merchants[settingIndex].name}}</span>
        <div>{{"商品id:"+Merchants[settingIndex].id}}</div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品价格">
            <el-input v-model="MerchantsChange.price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="MerchantsChange.count"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input v-model="MerchantsChange.description"></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="changeMerchantSet">提交修改</el-button>
        </el-form>
      </div>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "MerchantList",
  data(){
    return{
      Merchants:[],
      ifChange:false,
      settingIndex:null,
      MerchantsChange:{
        price:"",
        count:"",
        description:""
      },
    }
  },
  mounted() {
    this.getMerchantList()
  },
  methods:{
    getMerchantList(){
      this.Merchants=[]
      var vm = this;
      this.axios({
        headers:{
          "Content-Type": "application/json",
        },
        method:"GET",
        url:"http://47.99.149.141:8000/mechant"
      }).then(function(resp){
        var result = resp.data;
        if(result.success==true){
          for(var i =0;i<result.data.list.length;i++){
            vm.Merchants.push(result.data.list[i])
          }
        }else{
          alert("Fail")
        }
      })
    },
    changeMerchant(index){
      this.settingIndex=index
      this.ifChange=true
    },
    deleteMerchant(merchantID){
      alert(merchantID)
      var vm = this;
      this.axios({
        headers:{
          "Content-Type": "application/json",
          /*Authorization: getToken(),*/
        },
        method:"DELETE",
        url:"http://47.99.149.141:8000/mechant",
        params:{
          "id":merchantID
        }
      }).then(function(resp){
        if(resp.data.success === true){
          vm.$message({
            message: '删除成功',
            type: 'success'
          });
        }
        else{
          vm.$message.error('删除失败');
        }
      })
      this.getMerchantList();
      this.$forceUpdate()
    },
    setMerchant(){

    },
    changeMerchantSet(){
      var vm = this;
      this.axios({
        headers:{
          "Content-Type": "application/json",
          /*Authorization: getToken(),*/
        },
        method:"PUT",
        url:"http://47.99.149.141:8000/mechant",
        transformRequest:[function(data){
          return JSON.stringify(data)
        }],
        data:{
          id:this.Merchants[this.settingIndex].id,
          name:this.Merchants[this.settingIndex].name,
          price:this.MerchantsChange.price,
          count:this.MerchantsChange.count,
          description:this.MerchantsChange.description,
        }
      }).then(function(resp){
        if(resp.data.data === true){
          vm.$message({
            message: '修改成功',
            type: 'success'
          });
        }
        else{
          vm.$message.error('修改失败');
        }
      })
      this.getMerchantList();
      this.settingIndex=null
      this.ifChange=false
      this.$forceUpdate()
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
</style>

<style>
</style>
