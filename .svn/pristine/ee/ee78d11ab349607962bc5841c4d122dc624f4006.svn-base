<template>
    <div>
        <Header title="领券中心"></Header>
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div id="mescroll">
                <ul class="card-ul" id="goods-ul">
                    <li class="card-list" v-for="(item,index) in couponsList" :key="index">
                        <!--页眉，放置标题-->
                        <div class="img-card">
                            <img v-lazy="baseurl + item.couponIcon" alt="">
                        </div>
                        <div class="card-center-info">
                            <h4 class="card-name">{{item.couponName}}</h4>
                            <div class="couponInfo" v-if="item.parentId != ''">
                                <span class="coupon">卡包套餐</span><span class="minMoney">{{item.totalCount}}张优惠券可使用</span>
                            </div>
                            <div class="couponInfo" v-else>
                                <span class="couponValue">{{item.couponValue}}</span><span class="minMoney">满{{item.minMoney | formatPrice}}可用</span>
                            </div>
                        </div>
                        <div class="couponRight">
                            <div class="yuan1"></div>
                            <div class="yuan2"></div>
                            <div class="circl" v-if="item.hasGotten !== '0'">
                                <!-- <div class="circliful" data-dimension="55%" data-text="已抢" :data-info="item.gottenCount | checkPercent(item.totalNum)" data-width="3" data-fontsize="12" data-type="full" :data-percent="(item.gottenCount / item.totalNum)*100" data-fgcolor="#eb6000" data-bgcolor="#eee" :data-total="item.totalNum" :data-part="item.gottenCount" data-border="outline"></div> -->
                                <progress-circle :percent="item.gottenCount | checkPercent(item.totalNum)"></progress-circle>
                            </div>
                            <div class="status get" v-else></div>
                            <button class="mui-btn card-btn" v-if="item.hasGotten == '0' && (item.gottenCount / item.totalNum) != 1" @click="receiveCouponHandle(item.parentId,item.ID,index)">立即领取
                            </button>
                            <button class="mui-btn card-btn" v-else-if="item.hasGotten == '0' && (item.gottenCount / item.totalNum) == 1" disabled>已抢完
                            </button>
                            <button class="mui-btn card-btn card-use" v-else @click.stop="useHandle(item.yuGou)">去使用</button>
                        </div>
                    </li>
                </ul>
            </div>
        </mescroll-vue>
    </div>
</template>
			
<script>
import Header from "@/components/Header";
import progressCircle from "@/components/progressCircle";
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    getPcid
} from "../../utils/index.js";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
    name: "couponsCenter",
    components: {
        MescrollVue, // 注册mescroll组件
        Header,
        progressCircle
    },
    data() {
        return {
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
            couponsList: [] // 列表数据
        };
    },
    filters: {
        formatPrice: function(val) {
            return parseFloat(val).toFixed(0);
        },
        checkPercent: function(val1, val2) {
            return parseInt(m_mul(m_div(val1, val2), 100)) + "%";
        },
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
    methods: {
        useHandle(type) {
            type == 0 ?  this.$router.push({ path: "/classify" }) : this.$router.push({ path: "/preorderList" }); //前往分类页面
        },
        receiveCouponHandle(parentId, ID, index) {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            let companyObj = this.$store.getters["company"]
                ? this.$store.getters["company"]
                : "";
            if (accountObj) {
                if (accountObj.role == "1") {
                    var _content =
                        '{"account": "' +
                        accountObj.account +
                        '","parentId": "' +
                        parentId +
                        '","couponId": "' +
                        ID +
                        '"}';

                    this.$post("/appCounpon/receiveCouponApp.do", {
                        content: _content,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    })
                    .then(res => {
                        let response = JSON.parse(res);
                        if (response.optFlag == "yes") {
                            Toast({
                                message: response.optDesc,
                                duration: 950
                            });
                            this.couponsList[index].hasGotten = 1;
                            if (response.receiveCoupon) {
                                this.receiveCoupon = response.receiveCoupon;
                                this.cardShow = true;
                            }
                        } else if (response.optFlag == "no") {
                            Toast({
                                message: response.optDesc,
                                duration: 950
                            });
                        }
                    })
                    .catch(e => {
                        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                        mescroll.endErr();
                    });
                } else {
                    Toast({
                        message: "仅微批自营用户可领用",
                        duration: 950
                    });
                }
            } else {
                MessageBox.confirm("请先登录系统").then(action => {
                    this.$router.push({ path: "/login" });
                }).catch(() => {
                    // Toast('操作取消');
                });
            }
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            let companyId = this.$route.query.companyId?this.$route.query.companyId:getPcid();
            let couponId=this.$route.query.couponId?this.$route.query.couponId:''
            // let companyId = this.$route.params.companyId?this.$route.params.companyId:getPcid();
            // let couponId=this.$route.params.couponId?this.$route.params.couponId:''
            let account = "";
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            accountObj ? (account = accountObj.account) : (account = "");
            var _content =
                '{"companyId":"' +
                companyId +
                '","account": "' +
                account +
                '","couponId": "' +
                couponId +
                '","pageSize": "' +
                page.size +
                '","pageNo": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/appCounpon/getAllCouponApp.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    // 请求的列表数据
                    let arr = data.res;
                    // 如果是第一页需手动制空列表
                    if (page.num === 1) this.couponsList = [];
                    // 把请求到的数据添加到列表
                    this.couponsList = this.couponsList.concat(arr);
                    // 数据渲染成功后,隐藏下拉刷新的状态
                    this.$nextTick(() => {
                        mescroll.endSuccess(arr.length);
                    });
                })
                .catch(e => {
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr();
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
.card-ul {
    padding: 10px;
    .card-list {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #ffffff;
        position: relative;
        overflow: hidden;
        padding: 10px 5px 10px 10px;
        -webkit-touch-callout: none;
        margin-bottom: 10px;
        .img-card {
            width: 72px;
            flex: 0 0 72px;
            height: 72px;
            margin-right: 10px;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .card-center-info {
            position: relative;
            flex: 1;
            width: 100%;
            height: 72px;
            padding-right: 15px;
            .card-name{
                height: auto;
                line-height: 16px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .couponInfo {
                position: absolute;
                bottom: 0;
                .couponValue {
                    font-size: 18px;
                    font-weight: 700;
                    color: #ff671d;
                    vertical-align: middle;
                }
                .minMoney {
                    font-size: 12px;
                    font-weight: 400;
                    color: @base;
                    // background-color: rgba(49, 165, 255, 0.1);
                    border-radius: 4px;
                    padding: 1px 4px;
                    margin-left: 8px;
                    vertical-align: middle;
                }
            }
        }
        .couponRight {
            display: inline-block;
            position: relative;
            width: 65px;
            height: 72px;
            flex: 0 0 65px;
            -webkit-justify-content: center;
            justify-content: center;
            text-align: center;
            &:before {
                content: "";
                position: absolute;
                top: -5px;
                left: -6px;
                bottom: -5px;
                width: 1px;
                border-left: 2px dotted #f1f1f1;
            }
            .yuan1 {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background-color: #f1f1f1;
                left: -10px;
                top: -16px;
            }
            .yuan2 {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 10px;
                background-color: #f1f1f1;
                left: -10px;
                bottom: -16px;
            }
            .status {
                display: block;
                width: 65px;
                height: 65px;
                position: absolute;
                top: -20px;
                right: -20px;
                z-index: 110;
                background-size: 65px 65px !important;
                &.get {
                    background: url("../../../static/images/bid_label_get.png")
                        no-repeat center center;
                }
                &.used {
                    background: url("../../../static/images/bid_label_used.png") no-repeat
                        center center;
                }

                &.over {
                    background: url("../../../static/images/bid_label_over.png") no-repeat
                        center center;
                }
            }
            .card-btn {
                position: absolute;
                color: #fff;
                width: 65px;
                height: 20px;
                line-height: 16px;
                max-width: 65px;
                font-size: 12px;
                bottom: 0;
                padding: 1px 0;
                right: 0;
                border-radius: 15px;
                border-color: @base;
                background-color: @base;
                &.card-use {
                    border-color: #ff671d;
                    background-color: #ff671d;
                }
            }
        }
    }
}
</style>
		