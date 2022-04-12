<template>
  <div class="topDIV">
    <el-button type="primary" icon="el-icon-arrow-left" style="float:right;margin:10px" @click="exit">退出登录</el-button>
  </div>
</template>

<script>
export default {
name: "topDIV",
  methods:{
    exit(){
      sessionStorage.clear()
      this.$router.push('/Login')
    }
  }
}
</script>

<style scoped>
.topDIV{
  height: 60px;
  background:#545c64;
}
</style>
