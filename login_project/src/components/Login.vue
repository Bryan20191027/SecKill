<template>
  <div class="overDiv">
    <video autoplay muted loop id="bg-video" class="video">
      <source src="../assets/bg~1.mp4" type="video/mp4">
    </video>
    <el-row :gutter="20">
      <el-col :span="8" :offset="16">
        <div  class="loginDiv" v-if="!isReg">
          <h2>登录页面</h2>
          <h3> </h3>
          <el-form ref="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.name" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="loginForm.password" class="input"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="6" :offset="3">
                <el-form-item>
                  <el-button type="primary" @click="login()">登录</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="19">
                <el-form-item>
                  <el-button type="text" @click="clickToReg">账号注册</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button type="text">密码找回</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="loginDiv" v-if="isReg">
          <h2>注册页面</h2>
          <h3> </h3>
          <el-form ref="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="regForm.name" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="regForm.password" class="input"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" v-model="regForm.secPassword" class="input"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="regForm.phone" class="input"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="regForm.idCard" class="input"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="6" :offset="3">
                <el-form-item>
                  <el-button type="primary" @click="userRegister()">注册</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Login",
  data(){
    return{
      loginForm:{
        name:"",
        password:"",
      },
      regForm:{
        name:"",
        password:"",
        secPassword:"",
        phone:"",
        idCard:"",
      },
      backGroundSrc:"../assets/bg.mp4",
      isReg:false
    }
  },
  methods:{
    login(){
      var vm = this;
      this.axios({
        headers:{
          "Content-Type": "application/json",
          /*Authorization: getToken(),*/
        },
        method:"POST",
        url:"http://47.99.149.141:8000/login/dologin",
        transformRequest:[function(data){
          return JSON.stringify(data)
        }],
        data:{
          username:this.loginForm.name,
          password:this.loginForm.password
        }
      }).then(function(resp){
        if(resp.data.success === true){
            vm.$message({
              message: '登录成功',
              type: 'success'
            });
            const accessToken = resp.data.data.token;
            sessionStorage.clear()
            sessionStorage['uid']=JSON.stringify(resp.data.data.id)
            sessionStorage['token']=resp.data.data.token
            vm.$router.push('/SecKillList')
        }
        else{
          vm.$message.error('登录失败');
        }
        /*/!*vm.$message({
          message: resp.data,
          type: 'success'*!/
        });*/
      })
    },
    clickToReg(){
      this.isReg=true
    },
    userRegister(){
      var vm = this;
      if(this.regForm.name===""||this.regForm.password===""||this.regForm.secPassword===""||this.regForm.phone===""||this.regForm.idCard==="")
        vm.$message.error('请输入注册完整信息');
      else if(this.regForm.password!==this.regForm.secPassword)
        vm.$message.error('两次输入密码不一致');
      else{
        this.axios({
          headers:{
            "Content-Type": "application/json",
            /*Authorization: getToken(),*/
          },
          method:"POST",
          url:"http://47.99.149.141:8000/login/addUser",
          transformRequest:[function(data){
            return JSON.stringify(data)
          }],
          data:{
            name:this.regForm.name,
            password:this.regForm.password,
            phone:this.regForm.phone,
            idcard:this.regForm.idCard
          }
        }).then(function(resp) {
          if (resp.data.success===true) {
            vm.$message({
              message: '注册成功',
              type: 'success'
            });
            this.isReg=false;
            vm.$router.push('/SecKillList')

          } else {
            vm.$message.error('注册失败');
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .overDiv{
  }

  .loginDiv{
    width:300px;
    height:500px;
    border: 1px solid #2c3e50;
    border-radius: 20px;
    padding:20px;
    position: absolute;
    background:rgba(255,255,255,0.3)
 }
  .input{
    width: 200px;
  }


</style>

<style>
  .el-form-item__label{
    color: black;
    font-size: 15px;
  }
</style>
