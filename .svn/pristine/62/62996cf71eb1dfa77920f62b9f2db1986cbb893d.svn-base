// import Vue from 'vue'
// import Router from 'vue-router'
// const Vue = require('vue');
// const Router = require('vue-router');
// Vue.use(Router)
export default new VueRouter({
    routes: [{
            path: '/', //首页
            name: 'home',
            component: (resolve) => require(['@/pages/Home'], resolve),
            meta: {
                deepth: 0.5,
                keepAlive: false, // 判断是否需要缓存
            }
        }, {
            path: '/attract', //招商
            name: 'attract',
            component: (resolve) => require(['@/pages/attract'], resolve),
            meta: {

            }
        }, {
            path: '/attractAdd', //招商报名
            name: 'attractAdd',
            component: (resolve) => require(['@/pages/attractAdd'], resolve),
            meta: {
                keepAlive: false, // 判断是否需要缓存
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/recentlyBuy', //最近购买
            name: 'recentlyBuy',
            component: (resolve) => require(['@/pages/recentlyBuy/recentlyBuy'], resolve),
            meta: {
                keepAlive: false, // 判断是否需要缓存
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: "/login", //登录
            name: "login",
            component: (resolve) => require(['@/pages/login/login'], resolve)
        },
        {
            path: "/codeLogin", //手机验证码登录
            name: "codeLogin",
            component: (resolve) => require(['@/pages/login/codeLogin'], resolve)
        },
        {
            path: "/bindingWx", //微信关联账号
            name: "bindingWx",
            component: (resolve) => require(['@/pages/login/bindingWx'], resolve)
        },
        {
            path: "/register", //注册
            name: "register",
            component: (resolve) => require(['@/pages/login/register'], resolve)
        }, {
            path: "/findPwd", //忘记密码
            name: "findPwd",
            component: (resolve) => require(['@/pages/login/findPwd'], resolve)
        }, {
            path: "/detail", //详情
            name: "detail",
            component: (resolve) => require(['@/pages/detail'], resolve),
            meta: {
                deepth: 2
            }
        }, {
            path: "/search", //搜索
            name: "search",
            component: (resolve) => require(['@/pages/search'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
                keepAlive: true, // 判断是否需要缓存
            }
        }, {
            path: '/classify', //分类
            name: 'classify',
            component: (resolve) => require(['@/pages/classify/classify'], resolve),
            meta: {
                keepAlive: true, // 判断是否需要缓存
                deepth: 1
            }
        }, {
            path: '/shopCart', //采购单
            name: 'shopCart',
            component: (resolve) => require(['@/pages/shopCart/shopCart'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
                // deepth: 0,
                // keepAlive: false, // 判断是否需要缓存
            }
        }, {
            path: '/couponsCenter/:companyId?/:couponId?', //领劵中心
            name: 'couponsCenter',
            component: (resolve) => require(['@/pages/coupons/couponsCenter'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/confirmOrder', //确认订单
            name: 'confirmOrder',
            component: (resolve) => require(['@/pages/order/confirmOrder'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/selectAddress', //选择收货地址
            name: 'selectAddress',
            component: (resolve) => require(['@/pages/address/selectAddress'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/addAddress', //添加收货地址
            name: 'addAddress',
            component: (resolve) => require(['@/pages/address/addAddress'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/editAddress', //编辑收货地址
            name: 'editAddress',
            component: (resolve) => require(['@/pages/address/editAddress'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/orderOk', //订单完成
            name: 'orderOk',
            component: (resolve) => require(['@/pages/order/orderOk'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/pay', //订单支付
            name: 'pay',
            component: (resolve) => require(['@/pages/order/pay'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/userCenter', //个人中心
            name: 'userCenter',
            component: (resolve) => require(['@/pages/userCenter/userCenter'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/addmenber', //申请会员
            name: 'addmenber',
            component: (resolve) => require(['@/pages/userCenter/addmenber'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/aboutUs', //关于我们
            name: 'aboutUs',
            component: (resolve) => require(['@/pages/userCenter/aboutUs'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/clientsFirst', //客户首届节
            name: 'clientsFirst',
            component: (resolve) => require(['@/pages/userCenter/clientsFirst'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/fav', //我的收藏
            name: 'fav',
            component: (resolve) => require(['@/pages/fav/fav'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/myCoupons', //我的收藏
            name: 'myCoupons',
            component: (resolve) => require(['@/pages/coupons/myCoupons'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/accountEdit',
            name: 'accountEdit',
            component: (resolve) => require(['@/pages/userCenter/accountEdit'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/allOrder',
            name: 'allOrder',
            component: (resolve) => require(['@/pages/userCenter/allOrder'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/feedBack',
            name: 'feedBack',
            component: (resolve) => require(['@/pages/userCenter/feedBack'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/vpOrderList',
            name: 'vpOrderList',
            component: (resolve) => require(['@/pages/userCenter/vpOrderList'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/vpOrderDetail',
            name: 'vpOrderDetail',
            component: (resolve) => require(['@/pages/userCenter/vpOrderDetail'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/applySimple',
            name: 'applySimple',
            component: (resolve) => require(['@/pages/userCenter/applySimple'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/cofirmSimple',
            name: 'cofirmSimple',
            component: (resolve) => require(['@/pages/userCenter/cofirmSimple'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/simpleOk',
            name: 'simpleOk',
            component: (resolve) => require(['@/pages/order/simpleOk'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/myNews',
            name: 'myNews',
            component: (resolve) => require(['@/pages/userCenter/myNews'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/upRecept',
            name: 'upRecept',
            component: (resolve) => require(['@/pages/userCenter/upRecept'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/orderConfirm', //样品订单确认
            name: 'orderConfirm',
            component: (resolve) => require(['@/pages/userCenter/orderConfirm'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/simpleDetail', //样品订单详情
            name: 'simpleDetail',
            component: (resolve) => require(['@/pages/userCenter/simpleDetail'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/refund', //退货
            name: 'refund',
            component: (resolve) => require(['@/pages/userCenter/refund'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/refundInfo', //退货
            name: 'refundInfo',
            component: (resolve) => require(['@/pages/userCenter/refundInfo'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/simpleSearch', //样品搜索
            name: 'simpleSearch',
            component: (resolve) => require(['@/pages/userCenter/simpleSearch'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/activitylist', //活动列表
            name: 'activitylist',
            component: (resolve) => require(['@/pages/activity/activitylist'], resolve),
            meta: {
                keepAlive: false, // 判断是否需要缓存
            }
        }, {
            path: '/activitydetail', //活动列表
            name: 'activitydetail',
            component: (resolve) => require(['@/pages/activity/activitydetail'], resolve),
            meta: {
                keepAlive: false, // 判断是否需要缓存
            }
        }, {
            path: '/myactivity', //活动列表
            name: 'myactivity',
            component: (resolve) => require(['@/pages/activity/myactivity'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/integralList', //积分商城
            name: 'integralList',
            component: (resolve) => require(['@/pages/integral/integralList'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/pointsInfo', //兑换记录
            name: 'pointsInfo',
            component: (resolve) => require(['@/pages/integral/pointsInfo'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/cofirmConvert', //确认兑换
            name: 'cofirmConvert',
            component: (resolve) => require(['@/pages/integral/cofirmConvert'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/pointsOrder', //兑换订单列表
            name: 'pointsOrder',
            component: (resolve) => require(['@/pages/integral/pointsOrder'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/pointsOrderDetail', //兑换详情
            name: 'pointsOrderDetail',
            component: (resolve) => require(['@/pages/integral/pointsOrderDetail'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/cofirmOk', //兑换成功
            name: 'cofirmOk',
            component: (resolve) => require(['@/pages/integral/cofirmOk'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/applySample', // 免费送样申请
            name: 'applySample',
            component: (resolve) => require(['@/pages/sample/applySample'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/applyOK', // 免费送样申请成功
            name: 'applyOK',
            component: (resolve) => require(['@/pages/sample/applyOK'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/preorderList', // 预订单列表
            name: 'preorderList',
            component: (resolve) => require(['@/pages/preorder/preorderList'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/preDetail', //商品预购详情
            name: 'preDetail',
            component: (resolve) => require(['@/pages/preorder/preDetail'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/prePay', //预订单支付
            name: 'prePay',
            component: (resolve) => require(['@/pages/preorder/prePay'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/cofirmPreOrder', // 预订单提交
            name: 'cofirmPreOrder',
            component: (resolve) => require(['@/pages/preorder/cofirmPreOrder'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/orderList', //预购确认订单
            name: 'orderList',
            component: (resolve) => require(['@/pages/preorder/orderList'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/orderDetail', //预购订单详情
            name: 'orderDetail',
            component: (resolve) => require(['@/pages/preorder/orderDetail'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/advdetail', //预购订单详情
            name: 'advdetail',
            component: (resolve) => require(['@/pages/advertising/advdetail'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/mapShow', //地图预览
            name: 'mapShow',
            component: (resolve) => require(['@/components/mapShow'], resolve),
            meta: {
                requireAuth: false, // 判断是否需要登录
            }
        }, {
            path: '/returngood', //申请退货
            name: 'returngood',
            component: (resolve) => require(['@/pages/order/returngood'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/returnOrderList', //退货单列表
            name: 'returnOrderList',
            component: (resolve) => require(['@/pages/order/returnOrderList'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '/returnOrderDetail', //退货单详情
            name: 'returnOrderDetail',
            component: (resolve) => require(['@/pages/order/returnOrderDetail'], resolve),
            meta: {
                requireAuth: true, // 判断是否需要登录
            }
        }, {
            path: '*',
            redirect: "/"
        }
    ],
    // base: '/web/', //多项目情况下的本项目名称  
    // mode: process.env.NODE_ENV !== 'production' ? "hash" : "history", //这个是去除路径中显示的#
    mode: "history", //这个是去除路径中显示的#
    linkActiveClass: "link-active",
    scrollBehavior(to, from, savedPosition) {
        // if (savedPosition) {     return savedPosition } else {     return { x: 0, y:
        // 0 } }
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    }
})