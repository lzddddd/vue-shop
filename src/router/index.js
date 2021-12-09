import Vue from 'vue'
import VueRouter from 'vue-router'


const Login = () => import('components/Login')
const Home = () => import('components/Home')
const Welcome = () => import('components/Welcome')
const User = () => import('components/user/User')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    redirect: '/home/welcome',
    component: Home,
    children: [
      {
        path: 'welcome',
        component: Welcome
      },
      {
        path: 'users',
        component: User
      },
    ]
  },




]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // 挂载路由导航守卫
// router.beforeEach((to, form, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //    next() 放行  next('/路径')  强制跳转
//   if (to.path === '/login') {
//     return next()
//   }

//   // 获取token值
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) {
//     return next('/login')
//   }
//   // 存在token值
//   next()

// })

export default router
