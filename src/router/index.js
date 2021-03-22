import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用vue-router
Vue.use(VueRouter);

// 引入页面模块
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User.vue';
// 创建路由实例 并进行配置路由
const router = new VueRouter({
  routes: [
    // 登录页面路由配置
    { path: '/login', name: 'login', component: Login },
    // 注册页面路由配置
    { path: '/register', name: 'register', component: Register },
    // 个人中心页面路由配置
    { path: '/user', name: 'user', component: User },
  ],
});

// 登录拦截,判断跳转的地址是否带有token,如果有则跳转,没有则跳转回登录页
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (to.path == '/user') {
    if (token) {
      next();
    } else {
      next('/login');
    }
  }
  next();
});
// 导出路由
export default router;
