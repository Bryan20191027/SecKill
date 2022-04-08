<template>
  <div class="Navigator">
    <el-col :span="3">
      <el-menu
        :default-active="this.$route.path"
        class="left-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        :router="true">
        <el-submenu index="/Admin/MerchantList">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">商品设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Admin/MerchantList" style="font-size: 17px">商品列表</el-menu-item>
            <el-menu-item index="/Admin/AddMerchant" style="font-size: 17px">增加商品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">秒杀商品设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/Admin/SecMerchantList" style="font-size: 17px">秒杀商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">用户设置</span>
          </template>
        </el-submenu>
      </el-menu>
    </el-col>
    <div class="navContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminCtrl",
  watch: {
    // 监听路由变化
    '$route.path': {
      handler (routePath) {

      },
      immediate: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>
  .Navigator{
    height: 100%;
    position: fixed;
    width: 100%;
    margin-top: 0;
  }

  .left-menu{
    height: 100vh;
  }
</style>
