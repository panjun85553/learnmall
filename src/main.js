// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import 'assets/scss/index.scss';
import 'swiper/dist/css/swiper.css';
import VueLazyload from 'vue-lazyload';
Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1, // 完全显示加载
  error: require('assets/img/error.png'), // 失败时加载图片
  loading: require('assets/img/loading.gif'), //  成功时加载图片
  attempt: 1 // 尝试次数
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
