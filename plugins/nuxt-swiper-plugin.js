import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import md5 from "js-md5";
import cookie from "js-cookie"
import VueQriously from 'vue-qriously'
// import 'swiper/swiper-bundle.css'
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.use(VueQriously)
Vue.prototype.$md5 = md5;
Vue.prototype.$cookie = cookie;


