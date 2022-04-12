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
        <el-menu-item index="/Home/buyMerchant">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">购买商品</span>
          </template>
        </el-menu-item>
        <<el-menu-item index="/Home/OrderList">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">查看订单</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/Home/UserSetting">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span style="font-size: 20px">用户设置</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
    <div class="navContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
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
