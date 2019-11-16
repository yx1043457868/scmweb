import { Indicator, Toast } from 'mint-ui';
// import Vue from 'vue'
const Vue = require('vue');
import fly from 'flyio';
import store from "../store";
import router from '../router'
// API_PATH_DEV: '"http://10.66.0.55:8080/scmapi"',
// API_PATH_TEST: '"http://m.lzl98.com/scmapi"', //良之隆正式环境web
// API_PATH_PROD: '"http://mt1.lzl98.com/scmapi"', //良之隆准生产环境
// API_PATH_PROD_TEST: '"http://mt1.lzl98.com:81/scmapi"', //良之隆准生产测试环境

// fly.config.baseURL = process.env.NODE_ENV !== 'production' ? 'http://10.66.0.49:8585/scmapi' : location.origin + '/scmapi';//海
// Vue.prototype.apiurl = process.env.NODE_ENV !== 'production' ? 'http://10.66.0.49:8585/scmapi' : location.origin + '/scmapi';//海

// fly.config.baseURL = process.env.NODE_ENV !== 'production' ? 'http://10.66.1.58:8080/scmapi' : location.origin + '/scmapi'; //雪
// Vue.prototype.apiurl = process.env.NODE_ENV !== 'production' ? 'http://10.66.1.58:8080/scmapi' : location.origin + '/scmapi'; //雪

fly.config.baseURL = process.env.NODE_ENV !== 'production' ? 'http://10.66.0.76:8089/scmapi' : location.origin + '/scmapi'; //my
Vue.prototype.apiurl = process.env.NODE_ENV !== 'production' ? 'http://10.66.0.76:8089/scmapi' : location.origin + '/scmapi'; //my
// fly.config.baseURL = process.env.NODE_ENV !== 'production' ? 'mt1.lzl98.com/scmapi' : location.origin + '/scmapi'; //my
// Vue.prototype.apiurl = process.env.NODE_ENV !== 'production' ? 'mt1.lzl98.com/scmapi' : location.origin + '/scmapi'; //my


//http request 拦截器
fly.interceptors.request.use(config => {
        // wx.showLoading({
        //     title: '加载中',
        // })
        Indicator.open({
            text: 'loading...',
            spinnerType: 'fading-circle'
        });
        config.data = JSON.stringify(config.data);
        // config.dataType = "json";
        //给所有请求添加自定义header
        config.headers["X-Tag"] = "flyio";
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


//http response 拦截器
fly.interceptors.response.use(
    response => {
        setTimeout(() => {
            Indicator.close();
        }, 500)
        if (response.data) {
            let data = JSON.parse(response.data);
            switch (data.optCode) {
                case "1001":
                    // 返回 1001, 清除token信息并跳转到登录页面
                    Toast(data.optDesc);
                    store.commit("loginOut");
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                    break;
                case "1000":
                    // 返回 1000 清除token信息并跳转到登录页面
                    store.commit("loginOut");
                    Toast(data.optDesc);
                    router.replace({
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                    break;
            }
        }
        return response;
    },
    error => {
        setTimeout(() => {
            Indicator.close();
        }, 500)
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        fly.get(url, params)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        fly.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}

export default fly