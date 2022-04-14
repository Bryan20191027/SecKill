<template>
  <div>
    <topDiv></topDiv>
    <el-container>
      <div>
        <el-menu :default-active="ifChange" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">修改信息</el-menu-item>
          <el-menu-item index="2">修改密码</el-menu-item>
        </el-menu>
      <div class="line"></div>
      </div>
      <div v-if="ifChange==='1'" class="pwdDiv" >
        <el-form :model="changeForm" status-icon :rules="rules" ref="changeForm" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="changeForm.username" autocomplete="off" placeholder="请输入修改信息"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="changeForm.age" autocomplete="off" placeholder="请输入修改信息"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码" prop="idcard">
            <el-input v-model="changeForm.idcard" autocomplete="off" placeholder="请输入修改信息"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('changeForm')">提交</el-button>
            <el-button @click="resetForm('changeForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="ifChange==='2'" class="pwdDiv" >
        <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input type="password" v-model="pwdForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="pwdForm.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="secPwd">
            <el-input type="password" v-model="pwdForm.secPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
            <el-button @click="resetForm('pwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
  </div>
</template>

<script>
import {handleAlert, handleConfirm} from "../../utils/confirm";
export default {
  name: "UserSetting",
  data(){
    var checkAge = (rule, value, callback) => {
      if (!value) {
        callback()
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
         callback()
        }
      }, 1000);
    };
    var checkText = (rule, value, callback) => {
      if (value === '') {
        callback();
      } else if(value.length <=3||value.length>8){
        callback(new Error('请输入长度为4~8位的用户名'))
      }
      else
        callback()
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if(value.length <=7||value.length>16){
        callback(new Error('请输入7位以上,16位以下的密码'))
      }
      else {
        if (this.pwdForm.secPwd !== '') {
          this.$refs.pwdForm.validateField('secPwd');
        }
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.pwdForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      ifChange:'1',
      changeForm:{
        age:null,
        idcard:"",
        username:""
      },
      pwdForm:{
        pwd:'',
        secPwd:'',
        oldPwd:''
      },
      rules: {
        pwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        secPwd: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        oldPwd: [
          { validator: validatePass3, trigger: 'blur' }
        ],
        username: [
          { validator: checkText, trigger: 'blur'}
        ],

        age: [
          { validator: checkAge, trigger: 'blur'}
        ]/*
        idcard: [
          { validator: checkText, trigger: 'blur'}
        ],*/
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.ifChange=key
    },
    submitForm(formName) {
      var vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(vm.ifChange==='2'){
            handleConfirm("是否确定修改密码").then(res=>{
            this.axios({
              headers: {
                "Content-Type": "application/json",
              },
              method: "PUT",
              url: "http://47.99.149.141:8000/user/pwd",
              params:{
                "uid":JSON.parse(decodeURIComponent(window.atob(sessionStorage.getItem('uid')))),
                "oldpwd":vm.pwdForm.oldPwd,
                "newpwd":vm.pwdForm.pwd
              }
            }).then(function (resp) {
              var result = resp.data;
              if(result.success===true) {
                vm.$message.success('修改密码成功')
                vm.resetForm(formName)
              }
              else
                vm.$message.error('修改密码失败')
            })}).catch(err=>{
            handleAlert('取消修改密码')
          })}
          else{
            if(vm.changeForm.username===""&&vm.changeForm.age===null&&vm.changeForm.username==="")
              vm.$message.error('至少输入一项修改项')
            else{
            handleConfirm("是否确定修改用户信息").then(res=>{
              this.axios({
                headers: {
                  "Content-Type": "application/json",
                },
                method: "PUT",
                url: "http://47.99.149.141:8000/user",
                transformRequest: [function (data) {
                  return JSON.stringify(data)
                }],
                data: {
                  "uid":JSON.parse(decodeURIComponent(window.atob(sessionStorage.getItem('uid')))),
                  username:vm.changeForm.username,
                  idcard:vm.changeForm.idcard,
                  age:vm.changeForm.age
                }
              }).then(function (resp) {
                var result = resp.data;
                if(result.success===true) {
                  vm.$message.success('修改用户信息成功,请重新登录')
                  vm.resetForm(formName)
                  vm.$router.push('/Login')
                }
                else
                  vm.$message.error('修改用户信息失败')
              })
            }).catch(err=>{
              handleAlert('取消修改用户消息')
          })}}
        } else {
          vm.$message.error('无效表单')
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.el-menu-demo{
  font-size: 30px;
  margin-left: 50px;
  margin-top: 10px;
}

.pwdDiv{
  alignment: center;
  font-size: 40px;
  text-align: center;
  margin-top:150px;
  margin-left: 25vh;
  margin-right: auto;
  line-height:100px;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:400px
}
</style>
