<template>
    <div class="login">
        <section class="scm-tab" id="tab">
            <Header title="订单详情"></Header>
            <!--tab-->
            <mt-navbar v-model="tab" id="tab" class="fixedBar">
                <mt-tab-item id="1">详情</mt-tab-item>
                <mt-tab-item id="2">日志</mt-tab-item>
            </mt-navbar>
            <section id="dialogMask" class="dialogMask" v-show="isShow" @click="isShow= false"></section>
            <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
                <div class="dialog-wrapper card-dialog" v-show="isShow">
                    <div class="dialog-box" style="padding-bottom:0">
                        <div class="dialog-header center">订单二维码</div>
                        <div id="qrcode" ref="qrcode" class="dialog-qrcode">
                            <img :src="baseurl+orderInfo.order_qrcode" alt="订单二维码" class="dialog">

                        </div>
                        <!-- <div class="confirm_b">
                            <button class="pay_btn">支付成功</button>
                            <button class="no_pay">未支付</button>
                        </div> -->
                    </div>
                </div>
            </transition>
            <div class="tab-container" style="padding-bottom:45px">
                <!-- tab-container -->
                <mt-tab-container v-model="tab">
                    <mt-tab-container-item id="1">
                        <div class="order-detail">
                            <!--默认地址-->
                            <div class="address-info" style="margin-bottom: 10px">
                                <i class="iconfont add-icon">&#xe681;</i>
                                <div class="add-contact">
                                    <h5 class="clearfix">
                                        <span class="contact-name">{{orderInfo.receiveName}}</span>
                                        <span class="contact-tel">{{orderInfo.receivePhone}}</span>
                                    </h5>
                                    <p class="address">{{orderInfo.province_cn}}{{orderInfo.city_cn}}{{orderInfo.receiveAddress}}</p>
                                </div>
                            </div>
                            <section class="msg-con bg-write" v-if="orderInfo.note">
                                <p class="msg-dec"><span class="iconfont">&#xe609;</span>留言：{{orderInfo.note}}</p>
                            </section>
                            <section class="order-list bg-write">
                                <p class="order-dec"><span class="iconfont">&#xe61d;</span>订单编号：{{orderInfo.orderCode}}
                                    <span class="orderSt mui-pull-right">
                                        <em class="blue" v-if="orderInfo.handleStatus == 1">待配送</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 2">配送中</em>
                                        <em class="green" v-else-if="orderInfo.handleStatus == 3">已签收</em>
                                        <em class="gray" v-else-if="orderInfo.handleStatus == 4">已取消</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 8">待审核</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 9">待审核</em>
                                    </span></p>
                                <p class="order-t">（下单时间：{{orderInfo.orderSubmitTime}}）</p>
                                <div class="payed" v-if="orderInfo.pay_status == '1'"></div>
                                <div class="unpayed" v-else></div>
                            </section>

                            <ul class="mui-table-view order-ul bg-write" id="order-ul">
                                <li class="mui-table-view-cell mui-media" v-for="(item,index) in skuList" :key="index">
                                    <a class="clearfix" href="javascript:;">
                                        <div class="list-img">
                                            <img class="mui-media-object mui-pull-left" v-lazy="baseurl+item.imgPath" />
                                            <!-- <span v-if="item.gift_qty == 1">赠</span> -->
                                        </div>
                                        <div class="mui-media-body detail-info">
                                            <h4 class="list-name">{{item.skuName}}<span class="price">￥{{item.unit_price}}/{{item.unit}}</span>
                                            </h4>
                                            <!-- <span class="uom_price" v-if="item.retail_flag == 'Y'">(￥{{item.price}}/{{item.uom_default}})</span> -->
                                            <h5 class="mui-ellipsis list-size">规格：{{item.styleno}}</h5>
                                            <div>
                                                <!-- <h5 class="mui-ellipsis def-text">请货量：{{item.qty |
                                                    capitalize(item.equation_factor,item.unit,item.uom_default)}}
                                                </h5> -->
                                                 <h5 class="mui-ellipsis def-text">
                                                <span v-if="item.gift_qty==0">
                                                    <span>请货量：{{item.qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                </span>
                                                <span v-else-if="item.gift_qty!=0 && item.gift_qty == item.qty">
                                                    <!-- <span>{{item.qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span> -->
                                                    <span>赠：{{item.gift_qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                </span>
                                                <span v-else-if="item.gift_qty!=0 && item.gift_qty != item.qty">
                                                    <span>请货量：{{(item.qty - item.gift_qty) | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>赠：{{item.gift_qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                </span>

                                            </h5>
                                                <p class="mui-ellipsis list-deliver">
                                                    <span>实发：{{item.wms_outqyt | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                    <span>实收：{{item.recived_qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                    <span v-if="item.alreadyReturnQty">已退：{{item.alreadyReturnQty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div class="order-price-info">
                                <div class="return-btn" v-if="orderInfo.handleStatus == 3 && orderInfo.returnCount == 0">
                                    <router-link :to="{path:'/returngood',query:{orderCode:orderInfo.orderCode,wmcode:orderInfo.wm_code}}" tag="button">申请退货</router-link>
                                </div>
                                <div class="order-price-dec">
                                    <div class="price-item clearfix">
                                        <span class="mui-pull-left">订单金额</span><span class="mui-pull-right">￥{{orderInfo.mustAmount | toFixed2}}</span>
                                    </div>
                                    <div class="price-item clearfix" v-if="coupon_amount>0">
                                        <span class="mui-pull-left">优惠金额</span><span class="mui-pull-right">-￥{{coupon_amount}}</span>
                                    </div>
                                    <div class="price-item clearfix" v-if="orderInfo && orderInfo.pointAmount">
                                        <span class="mui-pull-left">积分抵扣</span><span class="mui-pull-right">-￥{{orderInfo.pointAmount}}</span>
                                    </div>
                                    <div class="price-item clearfix" v-if="orderInfo && orderInfo.returnSumAmount">
                                        <span class="mui-pull-left">退货金额</span><span class="mui-pull-right">-￥{{orderInfo.returnSumAmount}}</span>
                                    </div>
                                </div>
                                <div class="mustAmount clearfix">
                                    <span class="mui-pull-left">应付金额</span><span class="mui-pull-right">￥{{sumAmount | toFixed2}}</span>
                                </div>
                            </div>
                            <!-- <div class="order-detail-info">
                                <div class="order-price-dec">
                                    <div class="price-item clearfix">
                                        <span class="mui-pull-left">期望交货时间</span><span class="mui-pull-right">{{orderInfo.expectedTime}}</span>
                                    </div>
                                    <div class="price-item clearfix">
                                        <span class="mui-pull-left">结算方式</span><span class="mui-pull-right">{{orderInfo.delaypay_flag == 'Y'? '货到付款':'先款后货'}}</span>
                                    </div>
                                    <div class="price-item clearfix">
                                        <span class="mui-pull-left">支付方式</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 1">支付宝支付</span>
                                        <span class="mui-pull-right" v-else-if="orderInfo.pay_type == 2">微信支付</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 3 || orderInfo.pay_type == 4">现金支付</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 5">授信支付</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 6">刷卡支付</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 7">对公转账</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 21">兴业银行支付宝</span>
                                        <span class="mui-pull-right" v-if="orderInfo.pay_type == 22">兴业银行微信</span>
                                    </div>
                                    <div class="price-item clearfix" @click="isShow=true">
                                        <span class="mui-pull-left">订单二维码</span><span class="mui-pull-right iconfont qcode-icon">&#xe603;</span>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="order-detail" v-show="orderLog && orderLog.length > 0">
                            <ul class="log-ul">
                                <li class="log-list" v-for="(item,index) in orderLog" :key="index">
                                    <div class="log-info">
                                        <h4>{{item.remark}}</h4>
                                        <p class="clearfix"><span class="log-a">{{item.account}}</span><span class="log-t">{{item.operate_time}}</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </section>
        <div class="bottom-btn" v-show="orderInfo.pay_status != '1'&&orderInfo.handleStatus != '4'">
            <router-link type="button" class="def-btn" :to="{path:'/pay',query:{orderCode:orderInfo.orderCode}}">立即支付</router-link>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../../utils/index.js";
export default {
    components: {
        Header
    },
    data() {
        return {
            tab: "1",
            skuList: [],
            orderInfo: {'pay_status':1},
            orderLog: [],
            auditLen: "",
            returnOrderDetailInfo: [],
            groupImagesList: [],
            returnAuditLog: [],
            goodsautive: "",
            isShow: false,
            coupon_amount:0,
            isCanCreateReturnOrder: "",
        };
    },
    created: function() {
        this.orderDetail(); //查看订单详情
        this.orderLogForSale(); //查看日志
    },
    filters: {
        capitalize(value, equation_factor, assist_unit, uom_default) {
            // if (price_type == 1) {
            if (equation_factor == 1) {
                //转换率为1
                return parseFloat(value).toFixed(2) + "" + assist_unit;
            } else {
                var _yu = m_rem(
                    parseFloat(value) || 0,
                    parseFloat(equation_factor) || 1
                );
                var shang = parseInt(
                    parseFloat(value) / parseFloat(equation_factor)
                );
                if (_yu == 0) {
                    //被整除
                    return shang.toFixed(2) + "" + assist_unit;
                } else if (shang == 0) {
                    return _yu + "" + uom_default;
                } else {
                    return shang + "" + assist_unit + _yu + "" + uom_default;
                }
            }
        },
        qty: function(value, equation_factor) {
            return m_div(
                parseFloat(value) || 0,
                parseFloat(equation_factor) || 1
            ).toFixed(2);
        },
    },
    computed: {
        sumAmount() {
            return m_sub(
                m_sub(
                    parseFloat(this.orderInfo.mustAmount) || 0,
                    parseFloat(this.orderInfo.coupon_amount) || 0
                ),
                parseFloat(this.orderInfo.returnSumAmount) || 0
            );
        }
    },
    mounted: function() {
        var id = this.$route.query.id;
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
        orderDetail() {
            //获取登录信息
            var id = this.$route.query.id,
                _content = '{"orderCode": "' + id + '"}';
            this.$post("/appVpOrder/orderDetailForSale.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.orderInfo = response.res.order;
                    this.coupon_amount= m_sub(this.orderInfo.coupon_amount,this.orderInfo.pointAmount)
                    this.skuList = response.res.skuList;
                    this.isCanCreateReturnOrder =
                        response.res.isCanCreateReturnOrder;
                } else {
                    Toast(response.optDesc);
                }
            });
        },
        orderLogForSale() {
            var self = this;
            //获取登录信息
            var id = this.$route.query.id;
            var content = '{"orderCode": "' + id + '"}';
            this.$post("/appVpOrder/orderLogForSale.do", {
                content: content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.orderLog = response.res.orderLog;
                } else {
                    Toast(response.optDesc);
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@write: #ffffff;
.tab-container {
    padding-top: 87px;
}
.unpayed {
    position: absolute;
    top: -16px;
    right: 57px;
    width: 4pc;
    height: 58px;
}
.log-ul {
    padding: 10px 10px;
    .log-list {
        background-color: #fff;
        margin-bottom: 10px;
        border-radius: 3px;
        height: auto;
        .log-info {
            padding: 10px;
            h4 {
                font-size: 15px;
                color: #333333;
                margin-bottom: 6px;
            }
            p {
                line-height: 1.4;
                color: #888888;
                font-size: 13px;
                span.log-a {
                    float: left;
                    font-size: 13px;
                }
                span.log-t {
                    float: right;
                    font-size: 13px;
                }
            }
        }
    }
}
.order-price-info {
    background-color: #fff;
    .return-btn {
        padding: 10px 15px 4px 15px;
        text-align: right;
        button {
            border: 1px solid @base;
            padding: 4px 8px;
            color: @base;
            font-size: 14px;
        }
    }
    .order-price-dec {
        padding: 8px 15px;
        .price-item {
            width: 100%;
        }
    }
    .mustAmount {
        border-top: 1px solid #eee;
        height: 34px;
        line-height: 34px;
        padding: 0 15px;
        span.mui-pull-left {
            font-size: 15px;
            font-weight: 500;
            color: #333333;
        }
        span.mui-pull-right {
            font-size: 15px;
            font-weight: 500;
            color: #ff671d;
        }
    }
}
.order-detail-info {
    margin-top: 10px;
    background-color: #fff;
    .order-price-dec {
        padding: 8px 15px;
        .price-item {
            width: 100%;
            line-height: 28px;
            span.mui-pull-left {
                font-size: 14px;
                font-weight: 400;
                color: #333333;
            }
            span.mui-pull-right {
                font-size: 14px;
                font-weight: 400;
                color: #333333;
            }
            .qcode-icon {
                color: #999999 !important;
                margin-right: 0;
            }
        }
    }
}
.fixedBar {
    position: fixed;
    width: 100%;
    left: 0;
    top: 45px;
    z-index: 100;
}
.order-list .payed,
.order-list .unpayed {
    position: absolute;
    top: -15px;
    right: 65px;
    width: 4pc;
    height: 58px;
}
.order-list {
    .unpayed {
        background: url("../../../static/images/wzhifu.png") center no-repeat;
        background-size: 4pc 56px;
        .payed {
            background: url("../../../static/images/yizhifu.png") center
                no-repeat;
            background-size: 4pc 56px;
        }
    }
}
.order-price-info li {
    padding: 8px 15px;
    text-align: right;
}
.uom_price {
    position: absolute;
    right: 15px;
    font-size: 10px;
    color: #ff671d;
}
.price {
    font-size: 14px;
    color: #ff671d;
}
</style>
