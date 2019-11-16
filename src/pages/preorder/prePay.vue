<template>
    <div class="order_pay">
        <div class="header">
            <mt-header title="支付">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header>
        </div>
        <div class="my-content">
            <div class="pay-info">
                <div class="pay-title">
                    <h5>订单信息</h5>
                </div>
                <div class="mui-input-group">
                    <div class="mui-input-row coder-input">
                        <label>订单号</label>
                        <input type="text" v-model="preOrderCode" readonly="readonly" />
                    </div>
                    <div class="mui-input-row coder-input">
                        <label>订单总额</label>
                        <input type="text" v-model="sumAmount" readonly="readonly" class="code-red" />
                    </div>
                    <div class="mui-input-row coder-input" id="preAmount" v-if="payStatus=='2'">
                        <label>应付定金</label>
                        <input type="text" v-model="preAmount" readonly="readonly" class="code-red" />
                    </div>
                    <div class="mui-input-row coder-input" id="preAmount" v-if="payStatus=='3' && couponAmount > 0">
                        <label>优惠券抵扣</label>
                        <input type="text" v-model="couponAmountStr" readonly="readonly" class="code-red" />
                    </div>
                    <div class="mui-input-row coder-input" id="preAmount" v-if="payStatus=='3'">
                        <label>应付尾款</label>
                        <input type="text" v-model="tailAmount" readonly="readonly" class="code-red" />
                    </div>
                </div>
            </div>
            <div class="pay-ways" id="onlineWay">
                <div class="pay-title">
                    <h5>线上支付类型</h5>
                </div>
                <div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell abvanceradio">
                            <div class="mui-navigate-right mui-radio">
                                <label>
                                    <input type="radio" name="advance" v-model="checkedValue" value="微信客户端支付" />
                                    <img class="mui-media-object mui-pull-left" src="../../../static/images/wx.png">
                                    <div class="mui-media-body">
                                        微信支付
                                        <p class='mui-ellipsis'>微信安全支付</p>
                                    </div>
                                </label>
                            </div>
                        </li>
                        <li class="mui-table-view-cell abvanceradio">
                            <div class="mui-navigate-right mui-radio">
                                <label>
                                    <input type="radio" name="advance" v-model="checkedValue" value="支付宝" />
                                    <img class="mui-media-object mui-pull-left" src="../../../static/images/fkm.png">
                                    <div class="mui-media-body">
                                        支付宝付款码
                                        <p class='mui-ellipsis'>支付宝付款码支付</p>
                                    </div>
                                </label>
                            </div>
                        </li>
                        <li class="mui-table-view-cell">
                            <div class="mui-navigate-right  abvanceradio">
                                <div class="mui-media-body mui-radio">
                                    <label><input type="radio" name="advance" value="微信" v-model="checkedValue">
                                        <img class="mui-media-object mui-pull-left" src="../../../static/images/wxsm.png">
                                        微信付款码
                                        <p class='mui-ellipsis'>微信付款码支付</p>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom-btn">
                <button type="button" class="def-btn" @click="confirmBtn">确认支付</button>
            </div>
        </div>
    </div>
</template>
<script>
import {Toast, MessageBox } from "mint-ui";
import Header from "@/components/Header";
import {
    isWeixinBrowser,
    m_add,
    getFormarNum,
    m_sub,
    getUrlParam,
    isNull
} from "../../utils/index.js";
export default {
    name: "prePay",
    data() {
        return {
            sumAmount: "",
            couponAmountStr: "",
            couponAmount: 0,
            payStatus: "",
            tailAmount: "",
            preAmount: "",
            preOrderCode: "",
            code: this.$route.query.orderCode,
            switchvalue: false,
            checkedValue: "",
            isWeixinBrowser: isWeixinBrowser(),
            wxcode: "",
            openid: "",
            preCode: ""
        };
    },
    components: {
        Header
    },
    created() {
        this.initPreInfo();
        const code = getUrlParam("code");
        if (isWeixinBrowser()) {
            if (!this.$store.getters["openId"]) {
                if (!code) {
                    //网页静默授权
                    this.authorize();
                } else {
                    //储存获取openId
                    this.getOpenIdByCode(code);
                }
            }
        }
    },
    mounted() {},
    methods: {
        authorize() {
            const code = getUrlParam("code");
            var appid = this.appid;
            let redirect_uri = location.origin + "/prePay?orderCode=" + this.code;
            let url =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                appid +
                "&redirect_uri=" +
                encodeURIComponent(redirect_uri) +
                "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
            if (!code) {
                window.location.href = url;
            } else {
                this.wxcode = code;
                if (!this.$store.getters["openId"]) {
                    this.getOpenIdByCode(code);
                }
            }
        },
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.push({ path: "/orderList" });
            }
        },
        initPreInfo() {
            this.$post("/appPreOrder/getPayMoney.do", {
                out_trade_no: this.code
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.preOrderCode = response.res.orderCode;
                    this.sumAmount = "￥" + response.res.sumAmount;
                    this.preAmount = "￥" + response.res.preAmount;
                    this.couponAmountStr = "￥-" + response.res.couponAmount;
                    this.couponAmount = response.res.couponAmount;
                    this.tailAmount = "￥" + response.res.tailAmount,
                    this.payStatus = response.res.payStatus;
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 950
                    });
                }
            });
        },
        //支付宝付款码支付
        aliPay() {
            if (this.payStatus == "2") {
                // 定金未支付
                this.preCode = this.code + "_1";
            } else if (this.payStatus == "3") {
                // 尾款未支付
                this.preCode = this.code + "_2";
            } else {
                this.preCode = this.code;
            }
            window.location.href =
                this.baseurl +
                "preOrder/scanCodePayMent.do?decType=mobile&payType=ALI&out_trade_no=" +
                this.preCode;
        },
        wxcodePay() {
            if (this.payStatus == "2") {
                // 定金未支付
                this.preCode = this.code + "_1";
            } else if (this.payStatus == "3") {
                // 尾款未支付
                this.preCode = this.code + "_2";
            } else {
                this.preCode = this.code;
            }
            window.location.href =
                this.baseurl +
                "preOrder/scanCodePayMent.do?decType=mobile&payType=WX&out_trade_no=" +
                this.preCode;
        },
        getOpenIdByCode(code) {
            let params = {
                code: code ? code : this.wxcode,
                orderCode: this.code
            };
            this.$post("/wx/getOpenIdByCode.do", params).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.$store.commit("setOpenId", response.res.openid);
                    this.openid = response.res.openid;
                    // alert(response.res.openid)
                } else {
                    // Toast(response.optDesc);
                }
            });
        },
        wxH5Pay() {
            let url = "",
                wxurl = "";
            wxurl = "/appPreOrder/jsWxApiPayMent.do";
            if (this.payStatus == "2") {
                // 定金未支付
                this.preCode = this.code + "_1";
            } else if (this.payStatus == "3") {
                // 尾款未支付
                this.preCode = this.code + "_2";
            } else {
                this.preCode = this.code;
            }
            var flag = isWeixinBrowser();
            if (flag) {
                //公众号支付/Wx/scanCodePayMent.do
                try {
                    this.$post(wxurl, {
                        out_trade_no: this.preCode,
                        openid: this.openid
                            ? this.openid
                            : this.$store.getters["openId"]
                    }).then(res => {
                        let response = JSON.parse(res);
                        if (response.optFlag == "yes") {
                            let result = JSON.parse(response.result);
                            let payInfo = JSON.parse(result.pay_info);
                            this.weixinPay(payInfo);
                        } else {
                            Toast(response.optDesc);
                        }
                    });
                } catch (e) {
                    Toast({
                        message: "支付异常",
                        duration: 950
                    });
                }
            } else {
                Toast({
                    message: "仅在微信客户端使用",
                    duration: 950
                });
            }
        },
        /**
         * @method :微信支付方法
         * @param data
         */
        weixinPay(data) {
            if (typeof WeixinJSBridge == "undefined") {
                //微信浏览器内置对象。参考微信官方文档
                if (document.addEventListener) {
                    document.addEventListener(
                        "WeixinJSBridgeReady",
                        this.onBridgeReady(data),
                        false
                    );
                } else if (document.attachEvent) {
                    document.attachEvent(
                        "WeixinJSBridgeReady",
                        this.onBridgeReady(data)
                    );
                    document.attachEvent(
                        "onWeixinJSBridgeReady",
                        this.onBridgeReady(data)
                    );
                }
            } else {
                this.onBridgeReady(data);
            }
        },
        onBridgeReady(response) {
            WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                    appId: response.appId,
                    timeStamp: response.timeStamp,
                    nonceStr: response.nonceStr, //随机串
                    package: response.package,
                    signType: response.signType, //微信签名方式：
                    paySign: response.paySign //微信签名
                },
                res => {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        this.back();
                    } else if (
                        res.err_msg == "get_brand_wcpay_request:cancel"
                    ) {
                        Toast("您已取消支付");
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        MessageBox("提示", res.err_desc);
                    }
                }
            );
        },
        confirmBtn() {
            //确认支付
            if (!this.checkedValue) {
                Toast("请选择支付结算类型");
            }
            if (this.checkedValue == "微信客户端支付") {
                this.wxH5Pay();
            }
            if (this.checkedValue == "支付宝") {
                this.aliPay();
            }
            if (this.checkedValue == "微信") {
                this.wxcodePay();
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@red: #ff671d;
.order_pay {
    .pay-title {
        text-indent: 15px;
        padding: 10px 0;
        h5 {
            color: #555555;
        }
    }
    .code-red {
        color: @red;
        display: inline-block;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
    }
}
.pay-ways {
    .mui-media-body {
        font-size: 15px;
        color: #333333;
    }
    p {
        font-size: 12px;
        color: #888888;
    }
    span.title {
        font-size: 12px;
        color: #666666;
        padding: 0;
    }
    span.price {
        color: @base;
        margin-right: 10px;
        &:last-child {
            color: @red;
        }
    }
    input {
        line-height: 42px;
        height: 42px;
        margin-right: 10px;
    }
}
.background_e {
    background-color: #f7f7f7;
}
.mui-navigate-right:after,
.mui-push-left:after,
.mui-push-right:after {
    color: #fff;
}
.bank {
    background: #fff;
    padding: 10px 15px;
    .input-title {
        font-size: 14px;
        color: @red;
    }
    .bankContent {
        border-bottom: 1px solid #eee;
        vertical-align: top;
        font-size: 14px;
        padding: 10px 0;
        display: flex;
        .bankInline {
            width: 20%;
            display: inline-block;
        }
        .bankInput {
            display: inline-block;
            width: 78%;
            height: auto;
            line-height: 24px;
            box-sizing: border-box;
        }
    }
}
</style>
