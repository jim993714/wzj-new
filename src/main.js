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
// 引入moment 创建全局过滤器
import moment from 'moment';
// 过滤时间格式
Vue.filter('date', (input, format = 'YYYY-MM-DD') => {
  return moment(input).format(format);
});
// 引入axios插件 并绑定到vue原型上
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
// 添加响应拦截器
axios.interceptors.response.use((res) => {
  const { statusCode, message } = res.data;
  if (statusCode == 401 && message == '用户信息验证失败') {
    Toast.fail(message);
    router.push('/login');
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
// 注册全局组件
Vue.component('wzj-head', wzjHead);
Vue.component('wzj-log', wzjLog);
Vue.component('wzj-btn', wzjBtn);
Vue.component('wzj-input', wzjInput);
Vue.component('nav-bar', navBar);
Vue.component('tab-nav', tabNav);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
