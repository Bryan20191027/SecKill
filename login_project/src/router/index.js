import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import AdminCtrl from "../components/AdminCtrl";
import MerchantList from "../components/AdminChild/MerchantList";
import SecMerchantList from "../components/AdminChild/SecMerchantList";
import AddMerchant from "../components/AdminChild/AddMerchant";
import BuyMerchant from "../components/HomeChild/BuyMerchant";
import OrderList from "../components/HomeChild/OrderList";
import UserSetting from "../components/HomeChild/UserSetting";
import UserCtrl from "../components/AdminChild/UserCtrl";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '/',
      redirect:'/Login'
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta:{
        requireAuth:true
      },
      children:[
        {
          path: '/Home/BuyMerchant',
          name: 'MerchantList',
          component: BuyMerchant,
          meta:{
            requireAuth:true
          },
        },
        {
          path: '/Home/OrderList',
          name: 'SecMerchantList',
          component: OrderList,
          meta:{
            requireAuth:true
          },
        },
        {
          path: '/Home/UserSetting',
          name: 'AddMerchant',
          component: UserSetting,
          meta:{
            requireAuth:true
          },
        }
      ]
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: AdminCtrl,
      meta:{
        requireAuth:true
      },
      children:[
        {
          path: '/Admin/MerchantList',
          name: 'MerchantList',
          component: MerchantList,
          meta:{
            requireAuth:true
          },
        },
        {
          path: '/Admin/SecMerchantList',
          name: 'SecMerchantList',
          component: SecMerchantList,
          meta:{
            requireAuth:true
          },
        },
        {
          path: '/Admin/AddMerchant',
          name: 'AddMerchant',
          component: AddMerchant,
          meta:{
            requireAuth:true
          },
        },
        {
          path: '/Admin/UserCtrl',
          name: 'UserCtrl',
          component: UserCtrl,
          meta:{
            requireAuth:true
          },
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


