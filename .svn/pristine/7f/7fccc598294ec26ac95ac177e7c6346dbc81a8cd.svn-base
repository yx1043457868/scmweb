// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //state访问状态对象
        logindata: localStorage["logindata"] ? JSON.parse(localStorage["logindata"]) : "",
        count: 0,
        carts: localStorage["carts"] ? JSON.parse(localStorage["carts"]) : [],
        orders: localStorage["orders"] ? JSON.parse(localStorage["orders"]) : [],
        address: localStorage["address"] ? JSON.parse(localStorage["address"]) : "",
        fakedata: localStorage["fakedata"] ? JSON.parse(localStorage["fakedata"]) : "",
        sample: localStorage["sample"] ? JSON.parse(localStorage["sample"]) : [],
        preorder: localStorage["preorder"] ? JSON.parse(localStorage["preorder"]) : [], //预购
        integrals: localStorage["integrals"] ? JSON.parse(localStorage["integrals"]) : [],
        pcid: localStorage["pcid"] ? JSON.parse(localStorage["pcid"]) : "",
        isFirstShare: localStorage["logindata"] && localStorage["logindata"].isFirstShare ? localStorage["logindata"].isFirstShare : false,
        openId: localStorage["openId"] ? JSON.parse(localStorage["openId"]) : "",
        productList: localStorage["productList"] ? JSON.parse(localStorage["productList"]) : {},
    },
    //Mutations修改状态
    // 同步状态
    mutations: {
        //储存openId
        setOpenId: function(state, data) {
            state.openId = data;
            localStorage.setItem("openId", JSON.stringify(state.openId));
        },
        setProductList: function(state, data) {
            state.productList = data;
            localStorage.setItem("productList", JSON.stringify(state.productList));
        },
        //加入购物车
        setpcid: function(state, data) {
            state.pcid = data;
            localStorage.setItem("pcid", JSON.stringify(state.pcid));
        },
        //修改isFirstShare
        changIsFirstShare: function(state, data) {
            sessionStorage.setItem("isFirstShare", data);
            state.isFirstShare = sessionStorage.isFirstShare;

        },
        //加入购物车
        addcarts: function(state, data) {
            state.carts.unshift(data);
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        // 设置购物车
        setcarts: function(state, msg) {
            state.carts = msg;
            localStorage.setItem("carts", JSON.stringify(msg));
        },

        //加入订单
        orders: function(state, data) {
            state.orders = data;
            localStorage.setItem("orders", JSON.stringify(data));
        },
        //选择的地址
        address: function(state, data) {
            state.address = data;
            localStorage.setItem("address", JSON.stringify(data));
        },
        //清空选择的地址
        clearaddress: function(state) {
            state.address = "";
            localStorage.setItem("address", JSON.stringify(state.address));
        },
        //清空订单
        clearorders: function(state, data) {
            // 第一种使用这种清除 localStorage.clear();
            // 另一种给空覆盖
            state.orders = [];
            localStorage.setItem("orders", JSON.stringify(state.orders));
            //清除localstorage
        },
        // 计算加
        add(state, index) {
            state.carts[index].value++;
            localStorage.setItem("carts", JSON.stringify(state.carts));
            state.carts = JSON.parse(localStorage.getItem("carts"));
        },
        //计算减
        reduce(state, index) {
            state.carts[index].value--;
            if (state.carts[index].value == 0) {
                state.carts.splice(index, 1);
            }
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        // 删除购物车中的某个数据
        shanchu(state, index) {
            state.carts.splice(index, 1);
            localStorage.setItem("carts", JSON.stringify(state.carts));
        },
        // 清除购物车
        settlement(state) {
            // 第一种使用这种清除 localStorage.clear();
            // 另一种给空覆盖
            state.carts = [];
            localStorage.setItem("carts", JSON.stringify(state.carts));
            // localStorage注意是json对象转字符串，getitem时要字符串转对象
            //清除localstorage
        },
        // 设置登录的数据
        setData: function(state, msg) {
            state.logindata = msg;
            localStorage.setItem("logindata", JSON.stringify(msg));
        },
        setFake: function(state, msg) {
            state.fakedata = msg;
            localStorage.setItem("fakedata", JSON.stringify(msg));
        },
        //设置退出的数据
        loginOut: function(state) {
            sessionStorage.clear();
            state.logindata = "";
            state.fakedata = "";
            state.pcid = "";
            state.carts = [];
            state.address = "";
            state.openId = "";
            state.preorder = [];
            state.sample = [];
            state.integrals = [];
            localStorage.setItem("logindata", JSON.stringify(state.logindata));
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
            localStorage.setItem("integrals", JSON.stringify(state.integrals));
            localStorage.setItem("sample", JSON.stringify(state.sample));
            localStorage.setItem("fakedata", JSON.stringify(state.fakedata));
            localStorage.setItem("carts", JSON.stringify(state.carts));
            localStorage.setItem("address", JSON.stringify(state.address));
            localStorage.setItem("openId", JSON.stringify(state.openId));
            localStorage.setItem("pcid", JSON.stringify(state.pcid));
        },
        addsampleCarts: function(state, data) {
            state.sample.push(data);
            localStorage.setItem("sample", JSON.stringify(state.sample));
        },
        // 计算加
        addsample(state, index) {
            state.sample[index].value++;
            localStorage.setItem("sample", JSON.stringify(state.sample));
            state.sample = JSON.parse(localStorage.getItem("sample"));
        },
        reducesample(state, index) {
            state.sample[index].value--;
            if (state.sample[index].value == 0) {
                state.sample.splice(index, 1);
            }
            localStorage.setItem("sample", JSON.stringify(state.sample));
        },
        setsample: function(state, msg) {
            state.sample = msg;
            localStorage.setItem("sample", JSON.stringify(state.sample));
        },
        clearsample(state, data) {
            state.sample = [];
            localStorage.setItem("sample", JSON.stringify(state.sample));
        },
        addintegralsCarts: function(state, data) {
            state.integrals.push(data);
            localStorage.setItem("integrals", JSON.stringify(state.integrals));
        },
        // 计算加
        addintegrals(state, index) {
            state.integrals[index].value++;
            localStorage.setItem("integrals", JSON.stringify(state.integrals));
            state.integrals = JSON.parse(localStorage.getItem("integrals"));
        },
        reduceintegrals(state, index) {
            state.integrals[index].value--;
            if (state.integrals[index].value == 0) {
                state.integrals.splice(index, 1);
            }
            localStorage.setItem("sample", JSON.stringify(state.integrals));
        },
        setintegrals: function(state, msg) {
            state.sample = msg;
            localStorage.setItem("sample", JSON.stringify(state.integrals));
        },
        clearintegrals(state, data) {
            state.integrals = [];
            localStorage.setItem("integrals", JSON.stringify(state.integrals));
        },
        //预购加入购物车
        addPrecarts: function(state, data) {
            state.preorder.push(data);
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
        },
        // 计算加
        addPreorder(state, index) {
            state.preorder[index].value++;
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
            state.preorder = JSON.parse(localStorage.getItem("preorder"));
        },
        reducePreorder(state, index) {
            state.preorder[index].value--;
            if (state.preorder[index].value == 0) {
                state.preorder.splice(index, 1);
            }
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
            state.preorder = JSON.parse(localStorage.getItem("preorder"));
        },
        // 设置购物车
        setPreorder: function(state, msg) {
            state.preorder = msg;
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
        },
        // 删除购物车中的某个数据
        deletePreOrder(state, index) {
            state.preorder.splice(index, 1);
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
        },
        // 清除预购购物车
        clearPreOrder(state) {
            // 第一种使用这种清除 localStorage.clear();
            // 另一种给空覆盖
            state.preorder = [];
            localStorage.setItem("preorder", JSON.stringify(state.preorder));
            // localStorage注意是json对象转字符串，getitem时要字符串转对象
            //清除localstorage
        },

    },
    //getters计算过滤操作


    // 购物车中常见的合计?数量改变时的合计
    getters: {
        openId: state => {
            return state.openId ? state.openId : "";
        },
        fakeInfo: state => {
            return state.fakedata ? state.fakedata : "";
        },
        account: state => {
            return state.logindata ? state.logindata.account : "";
        },
        company: state => {
            return state.logindata ? state.logindata.company : "";
        },
        shop: state => {
            return state.logindata ? state.logindata.shop : "";
        },
        logintoken: state => {
            return state.logindata ? state.logindata.logintoken : "";
        },
        totalPrice: state => {
            return state.carts.reduce(function(prev, next, index) {
                if (!next.checked) return prev;
                if (!state.carts[index].rkpriceList) {
                    return (
                        prev +
                        next.unit_price * parseFloat(next.value) +
                        (next.price || 0) * (parseFloat(next.mnum_value) || 0)
                    );
                } else if (state.carts[index].rkpriceList) {
                    return (
                        prev +
                        next.rank_price * parseFloat(next.value) +
                        (next.price || 0) * (parseFloat(next.mnum_value) || 0)
                    );
                }
            }, 0);
        },
        shopCarts: state => state.carts,
        shopCount: (state, getters) => {
            var sum = 0;
            getters.shopCarts.map((cart) => {
                sum += parseFloat(cart.value)
            })
            return parseInt(sum)
        },
        sampleCount: state => {
            var sum = 0;
            state.sample.forEach((cart) => {
                sum += parseFloat(cart.value)
            })
            return sum
        },
        preorderCount: state => {
            var sum = 0;
            state.preorder.forEach((cart) => {
                sum += parseFloat(cart.value)
            })
            return sum
        },
        integralsCount: state => {
            var sum = 0;
            state.integrals.forEach((cart) => {
                sum += parseFloat(cart.value)
            })
            return sum
        },

    },
    //actions异步修改状态
    actions: {

    }
});
export default store