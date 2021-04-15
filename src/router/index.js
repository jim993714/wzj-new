import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用vue-router
Vue.use(VueRouter);

// 引入页面模块
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import User from '../pages/User.vue';
import Edit from '../pages/Edit.vue';
import MyFollow from '../pages/MyFollow.vue';
import MyComment from '../pages/MyComment.vue';
import MyActive from '../pages/MyActive.vue';
import Home from '../pages/Home.vue';
import Search from '../pages/Search.vue';
import detail from '../pages/deTail.vue';
import tabList from '../pages/tabList.vue';
// 创建路由实例 并进行配置路由
const router = new VueRouter({
  routes: [
    // 配饰首页路由
    { path: '/', name: 'home', component: Home },
    // 登录页面路由配置
    { path: '/login', name: 'login', component: Login },
    // 注册页面路由配置
    { path: '/register', name: 'register', component: Register },
    // 个人中心页面路由配置
    { path: '/user', name: 'user', component: User },
    // 用户信息编辑页面的路由配置
    { path: '/edit', name: 'edit', component: Edit },
    // 我的关注页面的路由配置
    { path: '/myfollow', name: 'myfollow', component: MyFollow },
    // 配置我的跟帖
    { path: '/mycomment', name: 'mycomment', component: MyComment },
    // 配置我的收藏
    { path: '/myactive', name: 'myactive', component: MyActive },
    // 搜索页面路由配置
    { path: '/search', name: 'search', component: Search },
    // 新闻详情页面
    { path: '/detail/:id', name: 'detail', component: detail },
    // 栏目管理页面
    { path: '/tabList', name: 'tabList', component: tabList },
  ],
});

// 登录拦截,判断跳转的地址是否带有token,如果有则跳转,没有则跳转回登录页
let path = ['/user', '/edit', '/myactive', '/mycomment'];
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token');
  if (path.includes(to.path)) {
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
