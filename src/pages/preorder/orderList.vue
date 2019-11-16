<template>
    <div>
        <div class="header">
            <mt-header :title="orderTitle">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
                <mt-button icon="" slot="right" @click="popupVisible=true"><i class="iconfont" style="font-size:24px">&#xe679;</i></mt-button>
            </mt-header>
        </div>
        <div v-show="popupVisible" class="mint-popup right-popup mint-popup-right" @click="popupVisible = false"> </div>
        <transition name="slide" enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <div class="popup-model" v-show="popupVisible">
                <div class="model-wrap">
                    <div class="model-content">
                        <h5 class="model-t"><span>订单状态</span></h5>
                        <div class="model-item">
                            <button v-for="(item,index) in dataList" :key="index" :class="{'active':currentIndex===index}" @click="chosen(index,item.value)">{{item.name}}</button>
                        </div>
                    </div>
                </div>
                <div class="handle-btn">
                    <!-- <button class="reset" @click="reset">重置</button> -->
                    <button class="comfirm" @click="comfirm">确定</button>
                </div>
            </div>
        </transition>
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div id="mescroll">
                <div class="order-wrapper">
                    <ul>
                        <li class="order-list" v-for="(item,index) in orderList" :key="index">
                            <!--页眉，放置标题-->
                            <!-- 处理状态:1-订单提交；2-待接单；3-已接单；4-供应商发货；5-到货；6-出库；7-收货；99-取消;100-删除 -->
                            <div class="list-h clearfix">
                                <span class="mui-pull-left" style="font-weight:500"><span class="iconfont def">&#xe68e;</span>{{item.orderCode}}</span>
                                <span class="orderSt mui-pull-right"><em class="blue" v-if="item.handleStatus == 1">待预付</em>
                                    <em class="blue" v-else-if="item.handleStatus == 2">待接单</em>
                                    <em class="blue" v-else-if="item.handleStatus == 3 || item.handleStatus == 4 || item.handleStatus == 5 || item.handleStatus == 6">配送中</em>
                                    <em class="blue" v-else-if="item.handleStatus == 7">已收货</em>
                                    <em class="gray" v-else-if="item.handleStatus == 99">已取消</em>
                                </span>
                            </div>
                            <!--内容区-->
                            <div class="order-info clearfix">
                                <p class="order-title">采购品类：{{item.sumQty}}</p>
                                <p class="order-title">采购时间：{{item.createTime | formatTime}}</p>
                                <!-- 1已支付，2定金未支付，3尾款未支付 -->
                                <p class="order-title" v-if="item.payStatus == '1'">支付状态：<span style="color:#000">已支付</span></p>
                                <p class="order-title" v-else-if="item.payStatus == '2'">支付状态：<span style="color:red">定金未支付</span></p>
                                <p class="order-title" v-else-if="item.payStatus == '3'">支付状态：<span style="color:red">尾款未支付</span></p>
                                <!-- <p class="order-title" v-else>支付状态：<span style="color:red">已支付</span></p> -->
                                <p class="order-title clearfix">
                                    <span class="order-n">订单金额：￥{{item.sumAmount | formatMoney}}</span>
                                    <span class="order-t" v-if="item.payStatus == '2'">预付定金：￥{{item.preAmount | formatMoney}}</span>
                                    <span class="order-t" v-else-if="item.payStatus == '3'">应付尾款：￥{{item.tailAmount | formatMoney}}</span>
                                    <span class="order-t" v-else></span>
                                </p>

                            </div>
                            <div class="list-b clearfix">
                                <router-link :to="{path:'/orderDetail',query:{id:item.orderCode}}" class="mui-btn" tag="button">
                                    查看详情
                                </router-link>
                                <button class="mui-btn" @click="cancelOrder(item.id,item.orderCode,index)" v-if="item.handleStatus == 1">
                                    取消订单
                                </button>
                                <button class="mui-btn" @click="confirmReceipt(item.id,index)" v-if="item.handleStatus == 3 || item.handleStatus == 4 || item.handleStatus == 5 || item.handleStatus == 6">
                                    确认收货
                                </button>
                                <router-link :to="{path:'/prePay',query:{orderCode:item.orderCode}}" tag="button" class="mui-btn" v-if="item.handleStatus == '1' && item.payStatus == '2'">
                                    支付定金
                                </router-link>
                                <router-link :to="{path:'/prePay',query:{orderCode:item.orderCode}}" tag="button" class="mui-btn" v-if="(item.handleStatus != '1' && item.handleStatus != '99') && item.payStatus == '3'">
                                    支付尾款
                                </router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </mescroll-vue>
        <!-- 搜索组件 -->
        <!-- <searchPage v-show="search" placeholder="请输入订单号/客户名称/客户账号" @hide="hide" @handleSearch="handleSearch"></searchPage> -->
    </div>
</template>
			
<script>
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import { Toast, MessageBox } from "mint-ui";
export default {
    name: "orderList",
    components: {
        MescrollVue // 注册mescroll组件
    },
    data() {
        return {
            searchText: "",
            search: false,
            mescroll: null, // mescroll实例对象
            mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
                // 上拉加载的配置.
                callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
                //以下是一些常用的配置,当然不写也可以的.
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 10 //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了 --</p>',
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因;
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
                    icon: "static/images/none.png", //图标,默认null,支持网络图
                    tip: "暂无相关数据~" //提示
                }
            },
            classId: this.$route.query.typeId || "",
            payStatus: this.$route.query.payStatus || "",
            currentIndex: 0,
            popupVisible: false,
            // 处理状态:1-订单提交；2-待接单；3-已接单；4-供应商发货；5-到货；6-出库；7-收货；99-取消;100-删除
            dataList: [
                {
                    name: "全部",
                    value: ""
                },
                {
                    name: "待预付",
                    value: "1"
                },
                {
                    name: "待接单",
                    value: "2"
                },
                {
                    name: "配送中",
                    value: "3,4,5,6"
                },
                {
                    name: "已收货",
                    value: "7"
                },
                {
                    name: "已取消",
                    value: "99"
                }
            ],
            orderList: [] // 列表数据
        };
    },
    beforeRouteEnter(to, from, next) {
        // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
        next(vm => {
            vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
        });
    },
    beforeRouteLeave(to, from, next) {
        // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
        this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
        next();
    },
    //侦听属性
    watch: {
        //picker关闭没有回调函数，所以侦听该属性替代
        popupVisible(val) {
            if (val) {
                this.closeTouch();
            } else {
                this.openTouch();
            }
        }
    },
    computed: {
        orderTitle() {
            if (this.classId == "" && this.payStatus == "") {
                return "全部预订单";
            } else if (this.classId == "1") {
                return "待预付";
            } else if (this.classId == "2") {
                return "待接单";
            } else if (this.classId == "3,4,5,6") {
                return "配送中订单";
            } else if (this.classId == "7") {
                return "已收货订单";
            } else if (this.classId == "99") {
                return "已取消订单";
            }
        }
    },
    methods: {
        hide() {
            this.search = false;
        },
        //返回
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.push({ path: "/userCenter" });
            }
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            let accountObj = this.$store.getters["account"];
            var _content =
                '{"shopId":"' +
                accountObj.shopId +
                '","companyId":"' +
                accountObj.companyId +
                '","handleStatus": "' +
                this.classId +
                '","pageSize": "' +
                page.size +
                '","page": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/appPreOrder/selectAppPreorderList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    // 请求的列表数据
                    let arr = data.res.list;
                    // 如果是第一页需手动制空列表
                    if (page.num === 1) this.orderList = [];
                    // 把请求到的数据添加到列表
                    this.orderList = this.orderList.concat(arr);
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        mescroll.endSuccess(arr.length);
                    });
                })
                .catch(e => {
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr();
                });
        },
        chosen(index, value) {
            this.currentIndex = index;
            if (value == "nopay") {
                //未支付
                this.classId = "";
                this.payStatus = "2";
            } else if (value == "pay") {
                this.classId = "";
                this.payStatus = "1";
            } else {
                this.classId = value;
                this.payStatus = "";
            }
        },
        reset() {
            this.currentIndex = 0;
            this.classId = "";
            this.payStatus = "";
            this.searchText = "";
        },
        sureOrder(orderCode, index) {
            MessageBox.confirm("确定签收吗?")
                .then(action => {
                    let account = this.$store.getters["account"].account;
                    let content_ =
                        "{'orderCode':'" +
                        orderCode +
                        "','account':'" +
                        account +
                        "'}";
                    this.$post("/appVpOrder/receiveOrderBySale.do", {
                        content: content_,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    }).then(res => {
                        let response = JSON.parse(res);
                        if (response.optFlag == "yes") {
                            if (this.classId != "") {
                                this.orderList.splice(index, 1);
                            } else {
                                this.orderList[index].handleStatus = 4;
                            }
                            Toast(response.optDesc);
                        } else {
                            Toast(response.optDesc);
                        }
                    });
                })
                .catch(() => {
                    // Toast('操作取消');
                });
        },

        comfirm() {
            this.popupVisible = false;
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
        },
        handleSearch(value) {
            this.search = false;
            this.searchText = value;
            this.comfirm();
        },
        /*解决页面层级相互影响滑动的问题*/
        closeTouch() {
            document
                .getElementsByTagName("body")[0]
                .addEventListener("touchmove", this.handler, {
                    passive: false
                }); //阻止默认事件
        },
        openTouch() {
            document
                .getElementsByTagName("body")[0]
                .removeEventListener("touchmove", this.handler, {
                    passive: false
                }); //打开默认事件
        },
        //取消订单
        cancelOrder(id, orderCode, index) {
            MessageBox.confirm("确定取消该订单吗?")
                .then(action => {
                    let account = this.$store.getters["account"].account;
                    let content_ =
                        "{'id':'" +
                        id +
                        "','handleStatus':'99','orderCode':'" +
                        orderCode +
                        "','account':'" +
                        account +
                        "'}";
                    this.$post("/appPreOrder/updateAppPreorder.do", {
                        content: content_,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    }).then(res => {
                        let response = JSON.parse(res);
                        if (response.optFlag == "yes") {
                            if (this.classId != "") {
                                this.orderList.splice(index, 1);
                            } else {
                                this.orderList[index].handleStatus = 99;
                            }
                            Toast(response.optDesc);
                        } else {
                            Toast(response.optDesc);
                        }
                    });
                })
                .catch(() => {
                    // Toast('操作取消');
                });
        },
        confirmReceipt(id, index) {
            MessageBox.confirm("确定收货吗?")
                .then(action => {
                    let account = this.$store.getters["account"].account;
                    let content_ =
                        "{'id':'" + id + "','account':'" + account + "'}";
                    this.$post("/appPreOrder/confirmReceipt.do", {
                        content: content_,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    }).then(res => {
                        let response = JSON.parse(res);
                        if (response.optFlag == "yes") {
                            if (this.classId != "") {
                                this.orderList.splice(index, 1);
                            } else {
                                this.orderList[index].handleStatus = 7;
                            }
                            Toast(response.optDesc);
                        } else {
                            Toast(response.optDesc);
                        }
                    });
                })
                .catch(() => {
                    // Toast('操作取消');
                });
        }
    }
};
</script>
			
<style scoped lang="less">
@base: #eb6000;
/*通过fixed固定mescroll的高度*/
.mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
}

.mint-popup-1 {
    width: 160px;
    border-radius: 8px;
    padding: 10px;
    transform: translate(-50%);
}
.mint-popup-1::before {
    display: inline-block;
    width: 0;
    height: 0;
    border: solid transparent;
    border-top-width: medium;
    border-right-width: medium;
    border-bottom-color: transparent;
    border-bottom-width: medium;
    border-left-width: medium;
    border-width: 10px;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -20px;
    right: 10px;
}
</style>
		