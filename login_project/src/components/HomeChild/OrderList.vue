<template>
  <div class="conScroll">
    <el-container>
      <el-row :gutter="20">
        <el-col v-for="(merchant) in userOrderList" :key="reFreshKey" :span="18" :offset="1" class="el-col">
          <el-card class="box-card1" shadow="hover">
            <div slot="header" class="clearfix">
              <span>秒杀商品id:{{merchant.id}}</span>
            </div>
            <div class="text item">
              <span style="font-size: 18px;">商品id:{{merchant.mid}}</span>
              <div style="padding: 14px">
                <span style="font-size: 20px;">&#12288&#12288&#12288数量:1</span>
                <span style="font-size: 20px;color: crimson;">{{"&#12288&#12288&#12288价格:￥"+merchant.seckillPrice}}</span>
              </div>
            </div>
            <el-collapse class="des">
              <el-collapse-item >
                <template slot="title">
                  详细信息<i class="header-icon el-icon-info"></i>
                </template>
                <div style="font-size: 15px">
                  <div>商品信息：{{merchant.description}}</div>
                  <div>购买时间：{{merchant.gmtCreate}}</div>
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
export default {
  name: "OrderList",
  data(){
    return{
      userOrderList:{
        id:"",
        mid:"",
        seckillPrice:0,
        description:"",
        gmtCreate:""
      },
      reFreshKey:0
    }
  },
  mounted() {
    this.getUserOrderList()
  },
  methods:{
    getUserOrderList() {
      this.userOrderList=[]
      var vm = this;
      this.axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        url: "http://47.99.149.141:8000/order/user",
        params:{
          "uid":sessionStorage.getItem('uid')
        }
      }).then(function (resp) {
        var result = resp.data;
        if (result.success === true) {
          for (var i = 0; i < result.data.length; i++) {
            var orderOne = {}
            orderOne.id=result.data[i].id
            orderOne.mid=result.data[i].mid
            orderOne.seckillPrice=result.data[i].seckillMechant.seckillPrice
            orderOne.description=result.data[i].seckillMechant.description
            orderOne.gmtCreate=result.data[i].gmtCreate
            vm.userOrderList.push(orderOne)
          }
        } else {
          alert("Fail")
        }
      })
    },
  }
}
</script>

<style scoped>
.conScroll{
  height: 100vh;
  overflow-y: scroll;
}
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
</style>
