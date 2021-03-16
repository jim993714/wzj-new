import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用vue-router
Vue.use(VueRouter);

// 引入页面模块
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

// 创建路由实例 并进行配置路由
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
  ],
});

// 导出路由
export default router;
