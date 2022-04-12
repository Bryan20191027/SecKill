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
        requireAuth:true,
        requireAdminAuth:false,
        requireUserAuth:true,
        requireSecAuth:false
      },
      children:[
        {
          path: '/Home/BuyMerchant',
          name: 'MerchantList',
          component: BuyMerchant,
          meta:{
            requireAuth:true,
            requireAdminAuth:false,
            requireUserAuth:true,
            requireSecAuth:true
          },
        },
        {
          path: '/Home/OrderList',
          name: 'SecMerchantList',
          component: OrderList,
          meta:{
            requireAuth:true,
            requireAdminAuth:false,
            requireUserAuth:true,
            requireSecAuth:false
          },
        },
        {
          path: '/Home/UserSetting',
          name: 'AddMerchant',
          component: UserSetting,
          meta:{
            requireAuth:true,
            requireAdminAuth:false,
            requireUserAuth:true,
            requireSecAuth:false
          },
        }
      ]
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: AdminCtrl,
      meta:{
        requireAuth:true,
        requireAdminAuth:true,
        requireUserAuth: false
      },
      children:[
        {
          path: '/Admin/MerchantList',
          name: 'MerchantList',
          component: MerchantList,
          meta:{
            requireAuth:true,
            requireAdminAuth:true,
            requireUserAuth: false
          },
        },
        {
          path: '/Admin/SecMerchantList',
          name: 'SecMerchantList',
          component: SecMerchantList,
          meta:{
            requireAuth:true,
            requireAdminAuth:true,
            requireUserAuth: false
          },
        },
        {
          path: '/Admin/AddMerchant',
          name: 'AddMerchant',
          component: AddMerchant,
          meta:{
            requireAuth:true,
            requireAdminAuth:true,
            requireUserAuth: false
          },
        },
        {
          path: '/Admin/UserCtrl',
          name: 'UserCtrl',
          component: UserCtrl,
          meta:{
            requireAuth:true,
            requireAdminAuth:true,
            requireUserAuth: false
          },
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    //如果要去的页面需要权限
    if (sessionStorage.getItem("token")) {
      //判断是否登录
      if(to.meta.requireAdminAuth){
        //判断要去的页面是否为管理员页面
        if(JSON.parse(decodeURIComponent(window.atob(window.sessionStorage.getItem('role'))))===101){
          next()
        }
        else{
          sessionStorage.clear()
          alert('抱歉，您未拥有访问该网页的权限')
          next({
            path: '/',
            // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
            query: { redirect: to.fullPath}
          })
        }
      }
      else if(to.meta.requireUserAuth){
        if(to.meta.requireSecAuth) {
          //判断要去的页面是否为用户秒杀页面
          if (JSON.parse(decodeURIComponent(window.atob(window.sessionStorage.getItem('role')))) === 102) {
            next()
          } else {
            sessionStorage.clear()
            alert('抱歉，您未拥有访问该网页的权限')
            next({
              path: '/',
              // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
              query: { redirect: to.fullPath}
            })
          }
        }
        else{
          if (JSON.parse(decodeURIComponent(window.atob(window.sessionStorage.getItem('role')))) === 102||
            JSON.parse(decodeURIComponent(window.atob(window.sessionStorage.getItem('role')))) === 103) {
            next()
          } else {
            sessionStorage.clear()
            alert('抱歉，您未拥有访问该网页的权限')
            next({
              path: '/',
              // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由，这要进一步在登陆页面判断
              query: {redirect: to.fullPath}
            })
          }
        }
      }
    } else {
      sessionStorage.clear()
      alert('抱歉，您未拥有访问该网页的权限')
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


