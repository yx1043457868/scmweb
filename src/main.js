// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
if (Number.parseInt === undefined) Number.parseInt = window.parseInt
if (Number.parseFloat === undefined) Number.parseFloat = window.parseFloat
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

// import Vue from 'vue'
const Vue = require('vue');
import App from './App'
import router from './router'
// import Mint from 'mint-ui'
// import MINT from 'mint-ui'
// const Mint = require('mint-ui');
// import Vuex from 'vuex'
// const Vuex = require('vuex');
import 'lib-flexible/flexible.js'
import store from "./store"
import { post, get } from './utils/fly'
import VueLazyLoad from 'vue-lazyload'
import filter from "./utils/filters"
// Vue.use(Mint);
// Vue.use(MINT)
// Vue.use(Vuex);
Vue.use(VueLazyLoad, {
        preload: 1.3, //预加载的宽高
        error: require('../static/images/placeholder.png'),
        loading: require('../static/images/placeholder.png'),
        attempt: 3, //尝试加载的次数
        listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'], //你想让vue监听的事件
    })
    // 全局导入过滤器
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
    //定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$get = get;

Vue.config.productionTip = false


//良之隆appidhttp://p1.lzl98.com
if (location.hostname === 'm.lzl98.com') { //良之隆正式环境web
    Vue.prototype.appid = "wxc20fbebaa5ff5b61";
    Vue.prototype.baseurl = "https://p.lzl98.com/scmplus/";
} else if (location.hostname === 'mt1.lzl98.com') { //良之隆准生产环境
    Vue.prototype.appid = "wxf342220deba2a59b";
    Vue.prototype.baseurl = "http://p1.lzl98.com/scmplus/";
} else {
    Vue.prototype.appid = "wxf342220deba2a59b";
    Vue.prototype.baseurl = "http://p1.lzl98.com/scmplus/";
}


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        // 判断该路由是否需要登录权限
        store.state.logindata = JSON.parse(window.localStorage.getItem('logindata')); //获取本地存储的token
        if (store.state.logindata && store.state.logindata.logintoken !== "") {
            // 通过vuex state获取当前的token是否存
            next();
        } else {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    } else {
        next();
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})