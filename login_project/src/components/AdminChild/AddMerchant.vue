<template>
  <div>
    <el-container>
      <div  class="changeDiv">
    <el-form ref="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="MerchantAdd.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="MerchantAdd.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="MerchantAdd.count"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="MerchantAdd.description"></el-input>
      </el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="AddMerchant">添加商品</el-button>
    </el-form>
      </div>
    </el-container>
  </div>
</template>

<script>
import {handleAlert, handleConfirm} from "../../utils/confirm";

export default {
  name: "MerchantList",
  data() {
    return {
      MerchantAdd: {
        count: "",
        description: "",
        name: "",
        price: ""
      }
    }
  },
  methods: {
    AddMerchant() {
      if (this.MerchantAdd.name === "" || this.MerchantAdd.price === "" || this.MerchantAdd.count === "" || this.MerchantAdd.description === "")
        this.$message.error("请输入完整信息")
      else {
        handleConfirm('是否确定添加该商品').then(res => {
          var vm = this;
          this.axios({
            headers: {
              "Content-Type": "application/json",
              /*Authorization: getToken(),*/
            },
            method: "POST",
            url: "http://47.99.149.141:8000/mechant",
            transformRequest: [function (data) {
              return JSON.stringify(data)
            }],
            data: {
              name: this.MerchantAdd.name,
              price: this.MerchantAdd.price,
              count: this.MerchantAdd.count,
              description: this.MerchantAdd.description,
            }
          }).then(function (resp) {
            if (resp.data.success===true) {
              vm.$message({
                message: '添加成功',
                type: 'success'
              });
              vm.$router.push('/Admin/MerchantList')
            } else {
              vm.$message.error('添加失败');
            }
          })
        }).catch(err => {
          handleAlert('取消添加该商品')
        })
      }
    }
  }
}
</script>

<style scoped>
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
