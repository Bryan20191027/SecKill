<template>
  <div>
    <topDiv></topDiv>
    <div class="conScroll">
      <el-container>
        <el-row :gutter="20">
          <el-col v-for="(user) in userList" :key="reFreshKey" :span="18" :offset="1" class="el-col">
            <el-card class="box-card1" shadow="hover">
              <div style="font-size: 20px;margin-bottom: 5px">用户id:{{user.userId}}</div>
              <div style="font-size: 20px;margin-bottom: 5px">用户名:{{user.username}}</div>
              <div class="text item">
                <div class="rightDIV">
                  <el-button type="danger" round @click="deleteUser(user.userId)">删除用户</el-button>
                </div>
              </div>
              <el-collapse class="des">
                <el-collapse-item >
                  <template slot="title">
                    用户详细信息<i class="header-icon el-icon-info"></i>
                  </template>
                  <div style="font-size: 15px">
                    <div style="font-size: 18px;">角色:{{user.role}}</div>
                    <div>年龄：{{user.age}}</div>
                    <div>身份证号码：{{user.idcard}}</div>
                    <div>余额：{{user.count}}</div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-card>
          </el-col>
        </el-row>
      </el-container>
      <div style="margin-top: 30px;height: 50px"></div>
    </div>

  </div>
</template>

<script>
import {handleAlert, handleConfirm} from "../../utils/confirm";
export default {
  name: "UserCtrl",
  data(){
    return{
      userList:{
        userId:"",
        role:"",
        username:"",
        idcard:"",
        age:0,
        count:0,
      },
      reFreshKey:0
    }
  },
  mounted() {
    this.getUserList()
  },
  methods:{
    getUserList() {
      this.userList=[]
      var vm = this;
      this.axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
        url: "http://47.99.149.141:8000/user"
      }).then(function (resp) {
        var result = resp.data;
        if (result.success === true) {
          for (var i = 0; i < result.data.length; i++) {
            var userOne = {}
            userOne.userId=result.data[i].userId
            userOne.role=(result.data[i].roleId===102?"用户":(result.data[i].roleId===103?"禁止用户":"管理员"))
            userOne.username=result.data[i].username
            userOne.idcard=result.data[i].idcard
            userOne.age=result.data[i].age
            userOne.count=result.data[i].count
            vm.userList.push(userOne)
          }
        } else {
          alert("Fail")
        }
      })
    },
    deleteUser(userId){
      handleConfirm('是否确定删除该用户').then(res=>{
        var vm = this;
        this.axios({
          headers: {
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method: "DELETE",
          url: "http://47.99.149.141:8000/user",
          params: {
            "id": userId
          }
        }).then(function (resp) {
          if (resp.data.success === true) {
            vm.$message({
              message: '删除成功',
              type: 'success'
            });
            vm.reFreshKey += 1
            vm.getUserList();
          } else {
            vm.$message.error('删除失败');
          }
        })
      }).catch(err=>{
        handleAlert('取消删除该用户')
      })
    }
  }
}
</script>

<style scoped>
.conScroll{
  width: 87%;
  height: 100vh;
  overflow-y: scroll;
}
.box-card1 {
  width: 150%;
  height: auto;
  max-width: 1200px;
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
