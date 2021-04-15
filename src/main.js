import Vue from 'vue';
import App from './App.vue';

// 引入rem布局插件
import 'lib-flexible';

// 引入通用样式
import './css/base.css';
// 引入字体图标样式
import './css/iconfont.css';
// 引入路由模块
import router from './router';
Vue.config.productionTip = false;

// 按需引入vant并且使用
import {
  Toast,
  Dialog,
  Field,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
  Uploader,
  Button,
  List,
  Tab,
  Tabs,
  PullRefresh,
} from 'vant';

Vue.use(Toast);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Uploader);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
// 引入moment 创建全局过滤器
import moment from 'moment';
// 过滤时间格式
Vue.filter('date', (input, format = 'YYYY-MM-DD') => {
  return moment(input).format(format);
});
Vue.filter('date2', (input, format = 'YYYY-MM-DD') => {
  let oldTime = new Date(input).getTime();
  let newTime = new Date().getTime();
  // 现在的时间减去评论的事件 超过1天 就显示日期
  // 没超过1天就显示多少小时内
  let D = ((newTime - oldTime) / 1000 / 60 / 60 / 24) | 0;
  if (D > 1) {
    return moment(input).format(format);
  }
  let S = ((newTime - oldTime) / 1000 / 60) | 0;
  if (S < 1) {
    return '刚刚';
  }
  if (S < 60) {
    return S + '分钟前';
  }
  let H = ((newTime - oldTime) / 1000 / 60 / 60) | 0;
  if (H < 24) {
    return H + '小时前';
  }
  // 1个小时内显示多少分钟
});
// 引入axios插件 并绑定到vue原型上
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  const { statusCode, message } = res.data;
  if (statusCode == 401 && message == '用户信息验证失败') {
    Toast.fail(message);
    router.push({
      path: '/login',
      name: 'login',
      params: {
        back: true,
      },
    });
    localStorage.removeItem('token');
  }
  return res;
});

//设置统一的tonken
axios.interceptors.request.use((config) => {
  // console.log(config);
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
Vue.prototype.$axios = axios;
// 引入已经写好的通用组件
import wzjHead from './components/wzjHead.vue';
import wzjLog from './components/wzjLog.vue';
import wzjBtn from './components/wzjBtn.vue';
import wzjInput from './components/wzjinput.vue';
import navBar from './components/navBar.vue';
import tabNav from './components/tabNav.vue';
import commentList from './components/commentList.vue';
import commentFloor from './components/commentFloor.vue';
// 注册全局组件
Vue.component('wzj-head', wzjHead);
Vue.component('wzj-log', wzjLog);
Vue.component('wzj-btn', wzjBtn);
Vue.component('wzj-input', wzjInput);
Vue.component('nav-bar', navBar);
Vue.component('tab-nav', tabNav);
Vue.component('comment-list', commentList);
Vue.component('comment-floor', commentFloor);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
