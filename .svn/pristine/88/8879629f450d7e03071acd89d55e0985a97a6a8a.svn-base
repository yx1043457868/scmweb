<template>
    <div class="login">
         <div class="header">
            <mt-header :title="'退货单'">
                <mt-button icon="back" slot="left" @click="back(1)"></mt-button>
            </mt-header>
        </div>
        <section id="order" v-cloak>
            <!-- <input type="hidden" value="" id="login_info"> -->
            <!-- 订单-topNav -->
            <div id="popover" class="nav_show" v-if="show">
                <ul class="mui-table-view">
                    <li v-for="(item,index) in choices" @click="chosen(index,item.value,item.choice)" :value="item.value" :class="{'select':index==isActive}" :key="index">{{item.choice}}
                    </li>
                </ul>
            </div>
            <div class="mui-content">
                <div id="mescroll" class="mescroll">
                    <!--您的项目如果是在微信,QQ,Safari等等iOS浏览器访问的,则需再嵌套<div class="mescroll-bounce"><div>,可解决列表顶部下拉和底部上拉露出浏览器灰色背景和卡顿2秒的问题,可避免数据不满屏下拉刷新dom元素可能不渲染的问题-->
                    <div class="mescroll-bounce">
                        <div class="order-wrapper">
                            <ul class="mui-table-view" id="goods-ul">
                                <li class="mui-table-view-cell order-list" v-for="(item,index) in orderList" :wm_code="item.wm_code" :data-name="item.shop_name" :key="index">
                                    <!--页眉，放置标题-->
                                    <div class="order-header clearfix">
                                        <span class="mui-pull-left">
                                            订单号:{{item.orderCode}}</span>
                                        <span class="orderSt mui-pull-right">
                                            <em class="blue" v-if="item.handleStatus == 1">待配送</em>
                                            <em class="blue" v-else-if="item.handleStatus == 2">配送中</em>
                                            <em class="green" v-else-if="item.handleStatus == 3">已签收</em>
                                            <em class="gray" v-else-if="item.handleStatus == 4">已取消</em>
                                            <em class="blue" v-else-if="item.handleStatus == 8">待审核</em>
                                            <em class="blue" v-else-if="item.handleStatus == 9">待审核</em>
                                        </span>
                                    </div>
                                    <!--内容区-->
                                    <div class="order-content">
                                        <p class="order-info">
                                            <span class="mui-text-left">采购品类：{{item.skuNum}}</span>
                                            <!-- <span class="mui-pull-right">订单价：¥{{item.sumAmount}}</span> -->
                                        </p>
                                        <p class="order-info">
                                            <span class="mui-pull-left">采购时间：{{item.createTime}}</span>
                                        </p>
                                        <p class="order-info">
                                            <span class="mui-pull-left">订单价：
                                                <i style="color:#ff671d">¥{{item.sumAmount}}</i>
                                            </span>
                                        </p>
                                        <!-- <p class="order-info"><span
										class="mui-text-left granary">{{item.wm_name}}</span><span
										class="mui-pull-right c-time">{{item.createTime}}</span></p> -->
                                        <div class="payed" v-if="item.payStatus == '1'"></div>
                                        <div class="unpayed" v-else></div>
                                    </div>
                                    <div class="order-footer hand_details">
                                        <div class="state_btn clearfix">
                                            <a href="javascript:;" v-if="item.handleStatus == 1 || item.handleStatus == 8 || item.handleStatus ==9" @click="cancelOrder(item.orderCode,index)">
                                                <!-- <i class="iconfont">&#xe64a;</i> -->
                                                <span>取消订单</span>
                                            </a>
                                            <a href="javascript:;" v-if="item.handleStatus == 2" @click="sureOrder(item.orderCode)">
                                                <span>确认收货</span>
                                            </a>
                                            <!-- <a href="javascript:;" @click="goToDec(item.orderCode,1)" v-if="item.viewLogisCase == '1'">
                                                <span>查看物流</span>
                                            </a>
                                            <a href="javascript:;" @click="goToDec(item.orderCode,3)" v-if="item.upErrorCase != 0 && item.upErrorCase">
                                                <span>上传异常</span>
                                            </a>
                                            <a href="javascript:;" @click="goToDec(item.orderCode,3)" v-if="item.viewErrorCase != 0 && item.viewErrorCase">
                                                <span>查看异常</span>
                                            </a>
                                            <a href="javascript:;" @click="goToDec(item.orderCode,2)" v-if="item.upReceiptCase != 0 && item.upReceiptCase && item.handleStatus != 4">
                                                <span>上传回单</span>
                                            </a>
                                            <a href="javascript:;" @click="goToDec(item.orderCode,2)" v-if="item.isExistReceipt != 0 && item.isExistReceipt">
                                                <span>查看回单</span>
                                            </a> -->
                                            <!-- <router-link :to="{path:'/pay',query:{orderCode:item.orderCode}}" v-if="item.handleStatus != '4'&& item.payStatus != '1'">
                                                <span>立即支付</span>
                                            </router-link> -->
                                            <button class="mui-btn" v-if="item.handleStatus != '4'&& item.payStatus != '1'" @click="pay(item.orderCode)">
                                                立即支付
                                            </button>
                                            <a href="javascript:;" @click="goToDec(item.orderCode,0)">
                                                <span>查看详情</span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Header from "@/components/Header";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import { Toast, MessageBox } from "mint-ui";
export default {
    data() {
        return {
            orderList: [],
            // handle_status` char(1) DEFAULT NULL COMMENT '处理状态；9-业务员待审核；8-财务待审核；1-待配送；2-配送中；3-已收货；4-已取消；
            choices: [
                {
                    choice: "全部订单",
                    value: ""
                },
                {
                    choice: "待审核订单",
                    value: "8,9"
                },
                {
                    choice: "待配送订单",
                    value: "1,8,9"
                },
                {
                    choice: "配送中订单",
                    value: "2"
                },
                {
                    choice: "已签收订单",
                    value: "3"
                },
                {
                    choice: "已取消订单",
                    value: "4"
                }
            ],
            mescroll: null,
            searchTx: "",
            stateId: "",
            isActive: "",
            orderTitle: "全部订单",
            login_info: {},
            nopay: "",
            companyObj: "",
            accountObj: "",
            show: false
        };
    },
    mounted: function() {
        var self = this;
        self.mescroll = new MeScroll("mescroll", {
            //请至少在vue的mounted生命周期初始化mescroll,以确保您配置的id能够被找到
            down: {
                auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
                callback: self.downCallback //下拉刷新的回调
            },
            up: {
                auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认false
                callback: self.upCallback, //上拉回调
                //以下参数可删除,不配置
                isBounce: true, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                empty: {
                    //配置列表无任何数据的提示
                    warpId: "goods-ul",
                    icon: "static/images/none.png",
                    tip: "亲,暂无相关数据哦~"
                }
            }
        });
    },
    created() {
        var typeId = this.$route.query.typeId;
        this.accountObj = this.$store.getters["account"]
            ? this.$store.getters["account"]
            : {};
        this.companyObj = this.$store.getters["company"]
            ? this.$store.getters["company"]
            : {};
        if (typeId) {
            if (typeId == "1,8,9") {
                this.orderTitle = "待配送订单";
                this.isActive = 2;
                return;
            }
            if (typeId == "8,9") {
                this.stateId = "";
                this.nopay = "no";
                this.orderTitle = "待付款订单";
                this.isActive = 1;
            } else {
                this.stateId = typeId;
                if (typeId == "1") {
                    this.orderTitle = "待配送订单";
                    this.isActive = 2;
                } else if (typeId == "2") {
                    this.orderTitle = "配送中订单";
                    this.isActive = 3;
                } else if (typeId == "3") {
                    this.orderTitle = "已签收订单";
                    this.isActive = 4;
                } else if (typeId == "4") {
                    this.orderTitle = "已取消订单";
                    this.isActive = 5;
                }
            }
        }
    },
    methods: {
        pay(code){
            window.location.href = location.origin +"/pay?orderCode="+ code;
        },
        back: function() {
            this.$router.back(-1);
        },
        goToDec: function(id, tab) {
            this.$router.push({
                path: "/refundInfo",
                query: {
                    id: id,
                    tab: tab
                }
            });
        },
        sureOrder: function(orderCode) {
            this.$router.push({
                path: "/orderConfirm",
                query: {
                    orderCode: orderCode,
                    groupCode: orderCode
                }
            });
        },
        cancelOrder: function(orderCode,index) {
            var self = this;
            MessageBox.confirm("确定取消吗?").then(action => {
                if (action == "confirm") {
                    var owner = self.companyObj.owner;
                    var account = self.accountObj.account;
                    var content_ =
                        "{'orderCode':'" +
                        orderCode +
                        "','account':'" +
                        account +
                        "','owner':'" +
                        owner +
                        "'}";
                    self.$post("/appOrder/cancelOrder.do", {
                            content: content_,
                            version: "kkllo",
                            login_token: this.$store.getters["logintoken"]
                        })
                        .then(function(res) {
                            var response = JSON.parse(res);
                            if (response.optFlag == "yes") {
                                Toast({
                                    message: "订单取消成功",
                                    duration: 950
                                });
                                self.orderList[index].handleStatus = '4';
                            } else {
                                Toast({
                                    message: response.optDesc,
                                    duration: 950
                                });
                            }
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                }
            }).catch(() => {
                // Toast('操作取消');
            });
        },
        isWeixinBrowser() {
            var agent = navigator.userAgent.toLowerCase();
            if (agent.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        search: function() {
            var word = this.searchTx.trim();
            if (word) {
                this.searchTx = word; //更新关键词
                this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
            }
        },
        downCallback: function() {
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
        },
        //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback: function(page) {
            //联网加载数据
            var self = this;
            //如果是第一页需手动制空列表 (代替clearId和clearEmptyId的配置)
            if (page.num == 1) self.orderList = [];
            this.$nextTick(function() {
                self.getListDataFromNet(
                    self.stateId,
                    self.searchTx,
                    self.nopay,
                    page.num,
                    page.size,
                    function(curPageData) {
                        //curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置
                        //更新列表数据
                        self.orderList = self.orderList.concat(curPageData);
                        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                        //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
                        console.log(
                            "page.num=" +
                                page.num +
                                ", page.size=" +
                                page.size +
                                ", curPageData.length=" +
                                curPageData.length +
                                ", self.orderList.length==" +
                                self.orderList.length
                        );

                        //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                        //self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

                        //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                        //self.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

                        //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                        //self.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

                        //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
                        self.mescroll.endSuccess(curPageData.length);
                    },
                    function() {
                        //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                        self.mescroll.endErr();
                    }
                );
            });
        },
        chosen(index, id, choice) {
            // console.log(index, id);
            this.isActive = index;
            this.searchTx = "";
            this.stateId = id;
            this.orderTitle = choice;
            // mui('#popover').popover('hide');//show hide toggle
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
            this.show = !this.show;
        },
        getListDataFromNet(
            classId,
            key,
            nopay,
            pageNum,
            pageSize,
            successCallback,
            errorCallback
        ) {
            //延时一秒,模拟联网
            var that = this;
            setTimeout(function() {
                try {
                    var newArr = []; //分页数据
                    //获取登录信息
                    if (that.accountObj) {
                        var _content =
                            '{"account": "' +
                            that.accountObj.account +
                            '","shopId":"' +
                            that.accountObj.shopId +
                            '", "searchContent":"' +
                            key +
                            '", "nopay":"' +
                            nopay +
                            '","handleStatus": "' +
                            classId +
                            '","pageSize": "' +
                            pageSize +
                            '","pageNo": "' +
                            pageNum +
                            '"}';
                        if (pageNum == 0) {
                            //此处模拟下拉刷新返回的数据
                            that
                                .$post(
                                    "/appVpOrder/orderList.do",
                                    {
                                        content: _content,
                                        version: "kkllo",
                                        login_token: this.$store.getters["logintoken"]
                                    },
                                    { emulateJSON: true }
                                )
                                .then(function(response) {
                                    if (response.data.optFlag == "yes") {
                                        var data = response.data.res.orders;
                                        for (
                                            var i = 0, len = data.length;
                                            i < len;
                                            i++
                                        ) {
                                            newArr.push(data[i]);
                                        }
                                    } else {
                                        errorCallback && errorCallback();
                                    }
                                    successCallback && successCallback(newArr); //成功回调
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
                        } else {
                            //此处模拟上拉加载返回的数据
                            that
                                .$post(
                                    "/appVpOrder/orderList.do",
                                    {
                                        content: _content,
                                        version: "kkllo",
                                        login_token: this.$store.getters["logintoken"]
                                    },
                                    { emulateJSON: true }
                                )
                                .then(function(res) {
                                    var response = JSON.parse(res);
                                    if (response.optFlag == "yes") {
                                        var data = response.res.orders;
                                        for (
                                            var i = 0, len = data.length;
                                            i < len;
                                            i++
                                        ) {
                                            newArr.push(data[i]);
                                        }
                                    } else {
                                        Toast({
                                            message: response.optDesc,
                                            duration: 950
                                        });
                                        errorCallback && errorCallback();
                                    }
                                    successCallback && successCallback(newArr); //成功回调
                                })
                                .catch(function(error) {
                                    console.log(error);
                                });
                        }
                    } else {
                        // window.location.href = VIEW_URL_LIST.LOGIN;
                    }
                } catch (e) {
                    //联网失败的回调
                    errorCallback && errorCallback();
                }
            }, 1000);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@write: #ffffff;
.mescroll {
    position: fixed;
    top: 45px;
    bottom: 0;
    height: auto !important;
}
.login {
    background: #f2f2f2 !important;
    height: 100%;
}
.bodyMid {
    padding-top: 45px;
    ul {
        li {
            background: @write;
            .head {
                height: 30px;
                padding: 6px 10px;
                line-height: 30px;
                border-bottom: 1px solid #c9c9c9;
                padding-bottom: 28px;
                span {
                    font-size: 14px;
                }
                :nth-child(1) {
                    margin-right: 40px;
                }
                :nth-child(2) {
                    color: #ff0000;
                }
                :nth-child(3) {
                    float: right;
                    padding: 0px 10px;
                    border: 1px solid #c9c9c9;
                    border-radius: 10px;
                    line-height: 22px;
                }
            }
            .body_ {
                padding-bottom: 18px;
                padding-top: 10px;
                padding-right: 30px;
                overflow: hidden;
                .body_img {
                    width: 77px;
                    height: 95px;
                    overflow: hidden;
                    float: left;
                    margin-right: 17px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .body_name {
                span {
                }
                :nth-child(1) {
                    color: black;
                    font-size: 14px;
                }
                :nth-child(2) {
                    font-size: 12px;
                    float: right;
                }
            }
            .body_Specifications {
                line-height: 25px;
            }
            .body_describe {
                width: 166px;
                float: left;
                line-height: 16px;
                margin-top: 10px;
            }
        }
    }
}
.unpayed {
    position: absolute;
    top: 46px;
    right: 20px;
    width: 4pc;
    height: 58px;
}
.state_btn a span {
    padding: 0;
}
.order-footer hand_details {
    border: none;
}
.order-list {
    padding: 0;
}
</style>
