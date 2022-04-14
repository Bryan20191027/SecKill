<template>
  <div class="overDiv">
    <video autoplay muted loop id="bg-video" class="video">
      <source src="../assets/bg~1.mp4" type="video/mp4">
    </video>
    <el-row :gutter="20">
      <el-col :span="8" :offset="16">
        <div  class="loginDiv" v-if="!isReg">
          <h2>登录</h2>
          <h3> </h3>
          <el-form ref="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.usernameLogin" class="input"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="loginForm.passwordLogin" class="input"></el-input>
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
        <div class="regDiv" v-if="isReg">
          <el-button type="primary" icon="el-icon-arrow-left" style="float: left" @click="clickToReg"></el-button>
          <h2 style="float: top">注册</h2>
          <h3> </h3>
          <el-form :model="regForm" status-icon label-width="80px" :rule="rules" ref="regForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="regForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="regForm.password" class="input"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input type="password" v-model="regForm.secPassword" class="input"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="regForm.idCard" class="input"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age" :rules="[
              {type:'number',message: '年龄必须为数字值'}
            ]">
              <el-input type="age" v-model.number="regForm.age" class="input"></el-input>
            </el-form-item>
            <el-row :gutter="20" style="margin-top: 10px">
              <el-col :span="7" :offset="5">
                <el-form-item>
                  <el-button type="primary" @click="userRegister" style="float: left">注册</el-button>
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
    var checkText = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('该项不能为空'));
      }
      else{
        callback()
      }
    };
    return{
      loginForm:{
        usernameLogin:"",
        passwordLogin:"",
      },
      regForm:{
        username:"",
        password:"",
        secPassword:"",
        idCard:"",
        age:"",
      },
      backGroundSrc:"../assets/bg.mp4",
      isReg:false,
      rules:{
        username: [
          { validator: checkText, trigger: 'blur'}
        ]
      }
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
          username:this.loginForm.usernameLogin,
          password:this.loginForm.passwordLogin
        }
      }).then(function(resp){
        var result = resp.data
        if(result.success === true){
            vm.$message({
              message: '登录成功',
              type: 'success'
            });
            sessionStorage.clear()
            sessionStorage['uid']=window.btoa(window.encodeURIComponent(JSON.stringify(result.data.id)))
            sessionStorage['token']=window.btoa(window.encodeURIComponent(JSON.stringify(result.data.token)))
            sessionStorage['role']=window.btoa(window.encodeURIComponent(JSON.stringify(result.data.role)))
            if(result.data.role ===102)
              vm.$router.push('/Home/buyMerchant')
            else if(result.data.role === 101)
              vm.$router.push('/Admin/MerchantList')
            else
              vm.$router.push('/Home/OrderList')
        }
        else{
          vm.$message.error('登录失败');
        }
      })
    },
    clickToReg(){
      this.isReg=!this.isReg
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    userRegister(){
      var vm = this;
      if(this.regForm.username===""||this.regForm.password===""||this.regForm.secPassword===""||
        this.regForm.idCard===""||this.regForm.age==="")
        vm.$message.error('请输入完整注册信息');
      else if(this.regForm.username.length<=3||this.regForm.username.length>8)
        vm.$message.error('用户名长度应该在4到8位之间');
      else if(this.regForm.password.length<=7||this.regForm.password.length>16)
        vm.$message.error('密码长度应该在8~16位之间');
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
            username:this.regForm.username,
            password:this.regForm.password,
            idcard:this.regForm.idCard,
            age:this.regForm.age
          }
        }).then(function(resp) {
          if (resp.data.success===true) {
            vm.$message({
              message: '注册成功',
              type: 'success'
            });
            vm.isReg=false;
            /*vm.$router.push('/Home/buyMerchant')*/
          } else {
            alert(JSON.stringify(resp.data))
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
    height:auto;
    border: 1px solid #2c3e50;
    border-radius: 20px;
    padding:20px;
    position: absolute;
    background:rgba(255,255,255,0.7);
    margin-top:60px;
 }

  .regDiv{
    width:350px;
    height:auto;
    border: 1px solid #2c3e50;
    border-radius: 20px;
    padding:20px;
    position: absolute;
    background:rgba(255,255,255,0.7);
    margin-top:60px;
  }
</style>

<style>

</style>
