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
// 引入axios插件 并绑定到vue原型上
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
Vue.prototype.$axios = axios;
// 引入已经写好的通用组件
import wzjHead from './components/wzjHead.vue';
import wzjLog from './components/wzjLog.vue';
import wzjBtn from './components/wzjBtn.vue';
import wzjInput from './components/wzjinput.vue';
import navBar from './components/navBar.vue';
// 注册全局组件
Vue.component('wzj-head', wzjHead);
Vue.component('wzj-log', wzjLog);
Vue.component('wzj-btn', wzjBtn);
Vue.component('wzj-input', wzjInput);
Vue.component('nav-bar', navBar);
// 按需引入vant并且使用
import { Toast } from 'vant';

Vue.use(Toast);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
