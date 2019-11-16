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
                        <h5 class="model-t"><span>申报状态</span></h5>
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
                <div class="bodyMid">
                    <ul v-for="(item,index) in orderList" :key="index">
                        <li>
                            <div class="head">
                                <span>单号:{{item.orderCode}}</span>
                                <span>{{item.handleStatus}}</span>
                                <span @click="cancel(item.orderCode,index,item)" v-if="item.handleStatus == '待审核' || item.handleStatus == '待配送'">取消申请</span>
                            </div>
                            <div class="body_" v-for="(list,index) in item.set" :key="index">
                                <div class="body_img">
                                    <img :src="baseurl+list.imgPath">
                                </div>
                                <div class="body_name">
                                    <span>{{list.skuName}}</span>
                                    <span>×{{list.qty}}</span>
                                </div>
                                <div class="body_Specifications">
                                    <span>{{list.styleno}}</span>
                                </div>
                                <div class="body_describe" v-html="list.skuDec">
                                    {{list.skuDec}}
                                </div>
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
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { formatDate } from "../../utils/index.js";
export default {
    name: "vpOrderList",
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
            dataList: [
                {
                    name: "全部",
                    value: ""
                },
                {
                    name: "待审核",
                    value: "7,8,9"
                },
                {
                    name: "待配送",
                    value: "1"
                },
                {
                    name: "配送中",
                    value: "2"
                },
                {
                    name: "已签收",
                    value: "3"
                },
                {
                    name: "已取消",
                    value: "4"
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
            if (this.classId == "") {
                return "全部样品";
            } else if (this.classId == "7,8,9") {
                return "待审核样品";
            } else if (this.classId == "1" || this.classId == "1,7,8,9") {
                return "待配送样品";
            } else if (this.classId == "2") {
                return "配送中样品";
            } else if (this.classId == "3") {
                return "已签收样品";
            } else if (this.classId == "4") {
                return "已取消样品";
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
                this.$router.back(-1);
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
            let _content =
                '{"companyId": "' +
                accountObj.companyId +
                '","account": "' +
                accountObj.account +
                '","shopId":"' +
                accountObj.shopId +
                '","handleStatus": "' +
                this.classId +
                '","pageSize": "' +
                page.size +
                '","pageNo": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/appOrder/getGiftOrderList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
            .then(response => {
                let data = JSON.parse(response);
                // 请求的列表数据
                let arr = data.res;
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
            this.classId = value;
        },
        reset() {
            this.currentIndex = 0;
            this.classId = "";
            this.searchText = "";
        },
        sureOrder(orderCode, index) {
            MessageBox.confirm("确定签收吗?").then(action => {
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
                            this.orderList[index].handleStatus = 3;
                        }
                        Toast(response.optDesc);
                    } else {
                        Toast(response.optDesc);
                    }
                });
            }).catch(() => {
                // Toast('操作取消');
            });
        },

        comfirm() {
            this.popupVisible = false;
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
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
        //取消样品
        cancel(code, index, obj) {
            var that = this;
            this.$post("/appGift/cancelOrder.do", {
                content: '{"orderCode":"' + code + '"}',
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(function(res) {
                    var response = JSON.parse(res);
                    if (response.flag == true) {
                        Toast({
                            message: response.message,
                            time: 2 //2秒后自动关闭
                        });
                        obj.handleStatus = "已取消";
                        that.$set(that.orderList, index, obj);
                    } else {
                        Toast(response.message);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }
};
</script>
			
<style scoped lang="less">
@base: #eb6000;
@write: #ffffff;
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
.bodyMid {
    padding: 10px 15px;
    ul {
        li {
            background: @write;
            border-radius: 3px;
            .head {
                height: 30px;
                padding: 3px 4px;
                line-height: 24px;
                border-bottom: 1px solid #c9c9c9;
                padding-bottom: 28px;
                margin-bottom: 10px;
                span {
                    font-size: 14px;
                }
                :nth-child(1) {
                    // margin-right: 40px;
                }
                :nth-child(2) {
                    color: #ff0000;
                }
                :nth-child(3) {
                    float: right;
                    padding: 0px 8px;
                    border: 1px solid #c9c9c9;
                    border-radius: 3px;
                    line-height: 22px;
                    font-size: 12px;
                }
            }
            .body_ {
                // padding-bottom: 18px;
                // padding-top: 10px;
                padding-right: 30px;
                overflow: hidden;
                margin-bottom: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
                .body_img {
                    width: 77px;
                    height: 65px;
                    overflow: hidden;
                    float: left;
                    margin-right: 17px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            :nth-child(5) {
                // padding-bottom: 10px;
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
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                height: 33px;
            }
        }
    }
}
</style>
		