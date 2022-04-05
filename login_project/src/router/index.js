import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import SecKillList from "@/components/SeckillList";
import AdminCtrl from "../components/AdminCtrl";
import MerchantList from "../components/AdminChild/MerchantList";
import SecMerchantList from "../components/AdminChild/SecMerchantList";
import AddMerchant from "../components/AdminChild/AddMerchant";
import AddSecMerchant from "../components/AdminChild/AddSecMerchant";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/SecKillList',
      name: 'SecKillList',
      component: SecKillList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: AdminCtrl,
      children:[
        {
          path: '/MerchantList',
          name: 'MerchantList',
          component: MerchantList
        },
        {
          path: '/SecMerchantList',
          name: 'SecMerchantList',
          component: SecMerchantList
        },
        {
          path: '/AddMerchant',
          name: 'AddMerchant',
          component: AddMerchant
        },
        {
          path: '/AddSecMerchant',
          name: 'AddSecMerchant',
          component: AddSecMerchant
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("token")) {
      next()
    } else {
      next({
        path: '/',
        // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
        query: { redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router


