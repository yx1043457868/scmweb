<template>
    <div class="login">
        <section class="scm-tab" id="tab">
            <Header title="订单详情"></Header>
            <!--tab-->
            <mt-navbar v-model="tab" id="tab" class="fixedBar">
                <mt-tab-item id="1">详情</mt-tab-item>
                <mt-tab-item id="2">日志</mt-tab-item>
                <!-- <mt-tab-item id="3">回单</mt-tab-item> -->
            </mt-navbar>
            <div class="tab-container">
                <!-- tab-container -->
                <mt-tab-container v-model="tab">
                    <mt-tab-container-item id="1">
                        <div class="order-detail">
                            <div class="address-info" style="margin-bottom: 10px">
                                <i class="iconfont add-icon">&#xe681;</i>
                                <div class="add-contact">
                                    <h5 class="clearfix">
                                        <span class="contact-name">{{orderInfo.receiveName}}</span>
                                        <span class="contact-tel">{{orderInfo.receivePhone}}</span>
                                    </h5>
                                    <p class="address">{{orderInfo.provinceCn}}{{orderInfo.cityCn}}{{orderInfo.receiveAddress}}</p>
                                </div>
                            </div>
                            <section class="msg-con bg-write" v-if="orderInfo.note">
                                <p class="msg-dec"><span class="iconfont">&#xe609;</span>留言：{{orderInfo.note}}</p>
                            </section>
                            <section class="order-list bg-write">
                                <!-- <p class="order-title" v-if="item.payStatus == '1'">支付状态：<span style="color:#000">定金已支付</span></p>
                                <p class="order-title" v-else-if="item.payStatus == '2'">支付状态：<span style="color:red">定金未支付</span></p>
                                <p class="order-title" v-else-if="item.payStatus == '3'">支付状态：<span style="color:red">尾款未支付</span></p>
                                <p class="order-title" v-else>支付状态：<span style="color:red">已支付</span></p> -->
                                <p class="order-dec"><span class="iconfont">&#xe61d;</span>订单编号：{{orderInfo.orderCode}}
                                    <span class="orderSt mui-pull-right">
                                        <em class="blue" v-if="orderInfo.handleStatus == 1">待预付</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 2">待接单</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 3 || orderInfo.handleStatus == 4 || orderInfo.handleStatus == 5 || orderInfo.handleStatus == 6">配送中</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 7">已收货</em>
                                        <em class="gray" v-else-if="orderInfo.handleStatus == 99">已取消</em>
                                    </span></p>
                                <p class="order-t">（下单时间：{{orderInfo.createTime | formatTime}}）</p>
                                <!-- <div class="payed" v-if="orderInfo.payStatus == '2'"></div>
                                <div class="unpayed" v-else></div> -->
                            </section>
                            <div class="bg-write">
                                <ul class="mui-table-view order-ul bg-write" id="order-ul">
                                    <li class="mui-table-view-cell mui-media" v-for="(item,index) in skuList" :key="index">
                                        <a class="clearfix" href="javascript:;">
                                            <div class="list-img">
                                                <img class="mui-media-object mui-pull-left" v-lazy="baseurl+item.imgPath" />
                                            </div>
                                            <div class="mui-media-body">
                                                <h4 class="list-name">{{item.skuName}}<span class="price">￥{{item.unitPrice}}/{{item.unit}}</span></h4>
                                                <h5 class="mui-ellipsis list-size">规格:{{item.styleno}}</h5>
                                                <div>
                                                    <h5 class="mui-ellipsis def-text">请货量:{{item.unitQty}}{{item.unit}}</h5>
                                                    <!-- <p class="mui-ellipsis list-deliver">
                                                        <span>实发:{{item.send_qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                        <span>实收:{{item.recived_qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                                    </p> -->
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                                <div class="form-wrapper">
                                    <mt-cell title="商品总额"><span style="color: #eb6000">￥{{orderInfo.sumAmount | toFixed2}}</span></mt-cell>
                                    <mt-cell title="优惠券抵扣" v-show="orderInfo.couponAmount > 0"><span style="color: #eb6000">￥-{{orderInfo.couponAmount | toFixed2}}</span></mt-cell>
                                    <mt-cell title="预付定金"><span style="color: #eb6000">￥{{orderInfo.preAmount | toFixed2}}</span></mt-cell>
                                    <mt-cell title="应付尾款"><span style="color: #eb6000">￥{{orderInfo.tailAmount | toFixed2}}</span></mt-cell>
                                    <mt-cell title="支付状态">
                                        <span v-if="orderInfo.payStatus == '1'" style="color: #eb6000">已支付</span>
                                        <span v-else-if="orderInfo.payStatus == '2'" style="color: #eb6000">定金未支付</span>
                                        <span v-else-if="orderInfo.payStatus == '3'" style="color: #eb6000">尾款未支付</span>
                                        <span v-else style="color: #eb6000">已支付</span>
                                    </mt-cell>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="order-detail" v-show="orderLog && orderLog.length > 0">
                            <ul class="log-ul">
                                <li class="log-list" v-for="(item,index) in orderLog" :key="index">
                                    <div class="log-info">
                                        <h4>{{item.remark}}</h4>
                                        <p class="clearfix"><span class="log-a">{{item.account}}</span><span class="log-t">{{item.createTime | formatTime}}</span></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </section>
    </div>
</template>

<script>
import Header from "@/components/Header";
import { Toast, MessageBox } from "mint-ui";
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
            orderInfo: {
                createTime:'1997/01/01 00:00:00',
                sumAmount:0,
                couponAmount:0,
                preAmount:0,
                tailAmount:0
            },
            orderLog: [],
            auditLen: "",
            returnOrderDetailInfo: [],
            groupImagesList: [],
            returnAuditLog: [],
            goodsautive: "",
            isShow: false
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
    mounted: function() {
        var id = this.$route.query.id;
    },
    methods: {
        back: function() {
            this.$router.back(-1);
        },
        orderDetail() {
            //获取登录信息
            var id = this.$route.query.id,
                _content = '{"orderCode": "' + id + '"}';
            this.$post("/appPreOrder/selectAppPreorderDetail.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.orderInfo = response.res.order;
                    this.skuList = response.res.skuLists;
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
            this.$post("/appPreOrder/selectAppPreorderLog.do", {
                content: content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.orderLog = response.res;
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
