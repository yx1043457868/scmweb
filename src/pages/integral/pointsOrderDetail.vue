<template>
    <div class="login">
        <section class="scm-tab" id="tab">
            <Header title="兑换订单详情"></Header>
            <!--tab-->
            <mt-navbar v-model="tab" id="tab" class="fixedBar">
                <mt-tab-item id="1">详情</mt-tab-item>
                <mt-tab-item id="2">日志</mt-tab-item>
            </mt-navbar>
            <div class="tab-container">
                <!-- tab-container -->
                <mt-tab-container v-model="tab">
                    <mt-tab-container-item id="1">
                        <div class="order-detail">
                            <!--默认地址-->
                            <div class="address-info" style="margin-bottom: 10px">
                                <i class="iconfont add-icon">&#xe681;</i>
                                <div class="add-contact">
                                    <h5 class="clearfix">
                                        <span class="contact-name">{{orderInfo.receiveName ? orderInfo.receiveName :"暂无"}}</span>
                                        <span class="contact-tel">{{orderInfo.receivePhone ? orderInfo.receivePhone :"暂无"}}</span>
                                    </h5>
                                    <p class="address">{{orderInfo.receiveAddress ? orderInfo.receiveAddress :"暂无"}}</p>
                                </div>
                            </div>
                            <section class="msg-con bg-write" v-if="orderInfo.note">
                                <p class="msg-dec"><span class="iconfont">&#xe609;</span>留言：{{orderInfo.note}}</p>
                            </section>
                            <section class="order-list bg-write">
                                <p class="order-dec"><span class="iconfont">&#xe61d;</span>订单编号：{{orderInfo.orderCode}}
                                    <span class="orderSt mui-pull-right">
                                        <em class="blue" v-if="orderInfo.handleStatus == 10">待接单</em>
                                        <em class="blue" v-else-if="orderInfo.handleStatus == 20">处理中</em>
                                        <em class="green" v-else-if="orderInfo.handleStatus == 30">已处理</em>
                                        <em class="gray" v-else-if="orderInfo.handleStatus == 70">已取消</em>
                                        <em class="gray" v-else-if="orderInfo.handleStatus == 90">已删除</em>
                                    </span></p>
                                <p class="order-t">（下单时间：{{orderInfo.createTime}}）</p>
                            </section>

                            <ul class="mui-table-view order-ul bg-write" id="order-ul">
                                <li class="mui-table-view-cell mui-media" v-for="(item,index) in skuList" :key="index">
                                    <a class="clearfix" href="javascript:;">
                                        <div class="list-img">
                                            <img class="mui-media-object mui-pull-left" v-lazy="baseurl+item.picUrl" />
                                        </div>
                                        <div class="mui-media-body detail-info">
                                            <h4 class="list-name">{{item.skuName}}<span class="price">x{{item.qty | toFixed}}</span></h4>
                                            <h5 class="mui-ellipsis list-size">规格：{{item.skuCode}}</h5>
                                            <h5 class="mui-ellipsis def-text">{{item.points}} 积分</h5>
                                          
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div class="order-price-info">
                                <div class="mustAmount clearfix">
                                    <span class="mui-pull-left">兑换总积分</span><span class="mui-pull-right">{{orderInfo.totalPoints}}</span>
                                </div>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class="order-detail" v-show="orderLog && orderLog.length > 0">
                            <ul class="log-ul">
                                <li class="log-list" v-for="(item,index) in orderLog" :key="index">
                                    <div class="log-info">
                                        <h4>{{item.message}}</h4>
                                        <p class="clearfix"><span class="log-a">{{item.createBy}}</span><span class="log-t">{{item.createTimeStr}}</span></p>
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
            orderInfo: {},
            orderLog: [],
            auditLen: "",
        };
    },
    created: function() {
        this.orderDetail(); //查看订单详情
        this.orderLogForSale(); //查看日志
    },
    filters: {
        toFixed: function(v) {
            return parseFloat(v).toFixed(0);
        }
    },
    methods: {
        back: function() {
            this.$router.back(-1);
        },
        orderDetail() {
            //获取登录信息
            let accountObj = this.$store.getters["account"];
            let id = this.$route.query.id,
                _content =
                    '{"shopId":"' +
                    accountObj.shopId +
                    '","selectType":"10","orderCode":"' +
                    id +
                    '","handleStatus": ""}';
            this.$post("/points/pointsorderList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.orderInfo = response.res[0];
                    this.skuList = response.res[0].skuList;
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
            this.$post("/points/pointsorderLogList.do", {
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
