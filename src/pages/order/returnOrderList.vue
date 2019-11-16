<template>
    <div>
        <div class="header">
            <header class="mint-header">
                <div class="mint-header-button is-left"
                     @click="back">
                    <button class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
                        <label class="mint-button-text"></label>
                    </button>
                </div>
                <h1 class="mint-header-title">{{orderTitle}}</h1>
                <div class="mint-header-button is-right">
                    <button class="mint-button mint-button--default mint-button--normal"
                            @click="popupVisible=true">
                        <i class="iconfont"
                           style="font-size:24px">&#xe679;</i>
                    </button>
                </div>
            </header>
        </div>
        <div v-show="popupVisible"
             class="mint-popup right-popup mint-popup-right"
             @click="popupVisible = false"> </div>
        <transition name="slide"
                    enter-active-class="animated slideInRight"
                    leave-active-class="animated slideOutRight">
            <div class="popup-model"
                 v-show="popupVisible">
                <div class="model-wrap">
                    <div class="model-content">
                        <h5 class="model-t"><span>退货单状态</span></h5>
                        <div class="model-item">
                            <button v-for="(item,index) in dataList"
                                    :key="index"
                                    :class="{'active':currentIndex===index}"
                                    @click="chosen(index,item.value)">{{item.name}}</button>
                        </div>
                    </div>
                </div>
                <div class="model-wrap">
                    <div class="model-content">
                        <h5 class="model-t"><span>下单时间</span></h5>
                        <div class="model-item">
                            <input type="text"
                                   placeholder="起始时间"
                                   @focus="beginOpen"
                                   v-model="beginTime"
                                   readonly="readonly"><span class="pie">-</span><input type="datetime"
                                   placeholder="截止时间"
                                   v-model="endTime"
                                   readonly="readonly"
                                   @focus="endOpen">
                        </div>
                    </div>
                </div>
                <div class="handle-btn">
                    <button class="reset"
                            @click="reset">重置</button>
                    <button class="comfirm"
                            @click="comfirm">确定</button>
                </div>
            </div>
        </transition>
        <mt-datetime-picker ref="beginPicker"
                            type="date"
                            @confirm="handleConfirm"
                            v-model="dataVal">
        </mt-datetime-picker>
        <mt-datetime-picker ref="endPicker"
                            type="date"
                            @confirm="handleConfirmTwo"
                            v-model="dataVal">
        </mt-datetime-picker>
        <div class="order-list-info">
            <div class="l">
                <span>退货单：{{returnTotal}}笔</span>
            </div>
            <div class="r">
                <span>退货总额：<em>￥{{returnPrice | toFixed}}</em></span>
            </div>
        </div>
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll"
                      :down="mescrollDown"
                      :up="mescrollUp"
                      @init="mescrollInit">
            <!--内容...-->
            <div id="mescroll">
                <div class="order-wrapper">
                    <ul>
                        <li class="order-list"
                            v-for="(item,index) in outOrderList"
                            :key="index">
                            <!--页眉，放置标题-->
                            <div class="list-h clearfix">
                                <span class="mui-pull-left"><span class="iconfont def">&#xe61d;</span>{{item.wmsNo}}</span>
                                <span class="orderSt mui-pull-right"><em class="blue">{{item.asnStatus}}</em></span>
                            </div>
                            <!--内容区-->
                            <div class="order-info">
                                <h4 class="order-title">{{item.shopName}}</h4>
                                <p class="clearfix">
                                    <span class="order-n">发起时间：{{item.createTime}}</span></p>
                                <span class="price">退货金额：¥{{item.sumAmount | toFixed}}</span>
                            </div>
                            <div class="list-b clearfix">
                                <router-link :to="{path:'/returnOrderDetail',query:{id:item.wmsNo,type:1}}"
                                             class="mui-btn"
                                             tag="button">
                                    查看详情
                                </router-link>
                                <button class="mui-btn"
                                        @click="exPdfPrintReturnOrder(item.wmsNo,index)">
                                    打印退货单
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </mescroll-vue>
    </div>
</template>
			
<script>
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import { Toast, MessageBox } from "mint-ui";
import { formatDate } from "../../utils/index.js";
export default {
    name: "salesOrder",
    components: {
        MescrollVue
    },
    data() {
        return {
            searchText: "",
            search: false,
            beginTime: "",
            endTime: "",
            dataVal: new Date(),
            classId: this.$route.query.typeId || "",
            returnTotal: 0,
            returnPrice: 0,
            currentIndex: 0,
            pickerVisible: false,
            dataList: [
                {
                    name: "全部",
                    value: ""
                },
                {
                    name: "待审核",
                    value: "9"
                },
                {
                    name: "待入库",
                    value: "10"
                },
                {
                    name: "已入库",
                    value: "15"
                },
                {
                    name: "已退款",
                    value: "16"
                }
            ],
            popupVisible: false,
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
            outOrderList: [] //退货单
        };
    },
    filters: {
        toFixed: function(value) {
            return parseFloat(value).toFixed(2);
        }
    },
    mounted() {
        //初始化全部订单
    },
    computed: {
        orderTitle() {
            if (this.classId == "") {
                return "全部退货单";
            } else if (this.classId == "9") {
                return "待审核退货单";
            } else if (this.classId == "10") {
                return "待入库退货单";
            } else if (this.classId == "15") {
                return "已入库退货单";
            } else if (this.classId == "16") {
                return "已退款退货单";
            }
        }
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
    methods: {
        back: function() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        },
        beginOpen() {
            this.$refs.beginPicker.open(); //设置开始
        },
        endOpen() {
            this.$refs.endPicker.open(); //设置开始
        },
        handleConfirm() {
            this.beginTime = formatDate(this.$refs.beginPicker.value);
        },
        handleConfirmTwo() {
            this.endTime = formatDate(this.$refs.endPicker.value);
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            let companyId = this.$store.getters["account"].companyId;
            let shopId = "";
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            accountObj ? (shopId = accountObj.shopId) : (shopId = "");
            let _content =
                '{"companyId": "' +
                companyId +
                '","shopId": "' +
                shopId +
                '","startDate": "' +
                this.beginTime +
                '","endDate": "' +
                this.endTime +
                '","asnStatus":"' +
                this.classId +
                '","searchText":"' +
                this.searchText +
                '","pageSize": "' +
                page.size +
                '","pageNo": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/returnorder/getReturnOrderList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    // 请求的列表数据
                    let arr = data.res.rows;
                    this.returnTotal = data.res.totalCount;
                    this.returnPrice = data.res.totalAmount;
                    // 如果是第一页需手动制空列表
                    if (page.num === 1) this.outOrderList = [];
                    // 把请求到的数据添加到列表
                    this.outOrderList = this.outOrderList.concat(arr);
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
            this.classId = value;
        },
        reset() {
            this.currentIndex = 0;
            this.beginTime = "";
            this.endTime = "";
            this.classId = "";
            this.searchText = "";
        },
        comfirm() {
            this.popupVisible = false;
            this.mescroll.resetUpScroll();
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
        //打印销售单
        exPdfPrintReturnOrder(wmsNo, index) {
            let companyId = this.$store.getters["account"].companyId;
            let content_ =
                "{'wmsNo':'" + wmsNo + "','companyId':'" + companyId + "'}";
            this.$post("/returnorder/exPdfPrintReturnOrder.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast(response.optDesc);
                } else {
                    Toast(response.optDesc);
                }
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
    top: 90px;
    bottom: 0;
    height: auto;
}

.order-list-info {
    position: fixed;
    width: 100%;
    left: 0;
    height: 44px;
    top: 45px;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: #fff;
    font-size: 14px;
    color: #333333;
    // box-shadow: 0px 2px 4px 0px rgba(11, 2, 23, 0.3);
    .l {
        flex: 1;
        height: 100%;
        position: relative;
        line-height: 44px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 15px;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 1px;
            height: 44px;
            transform: scaleY(0.5);
            background-color: #ddd;
        }
    }
    .r {
        flex: 1;
        height: 100%;
        position: relative;
        line-height: 44px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 15px;
        span {
            font-size: 12px;
            em {
                font-size: 16px;
                color: #eb6000;
            }
        }
    }
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
		