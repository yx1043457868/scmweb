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
                        <input type="text" v-model="orderCode" readonly="readonly" />
                    </div>
                    <div class="mui-input-row coder-input">
                        <label>订单金额</label>
                        <div class="code-red">￥{{totalPrice | formatMoney}}</div>
                    </div>
                    <div class="mui-input-row coder-input" id="coupon_amount" v-if="isShow">
                        <label>优惠券抵扣</label>
                        <div class="code-red">￥-{{(coupon_amount) | formatMoney}}</div>
                    </div>
                    <div class="mui-input-row coder-input" id="pointAmount" v-if="isPointShow">
                        <label>积分抵扣</label>
                        <div class="code-red">￥-{{pointAmount | formatMoney}}</div>
                    </div>
                    <div class="mui-input-row coder-input">
                        <label>应付金额</label>
                        <div class="code-red">￥{{fu_sum | formatMoney}}</div>
                    </div>
                    <!-- <div class="mui-input-row coder-input on_off" v-if="!!advance&&fu_sum<=advance">
                        <label>预付款</label>
                        <div class="code-red" :style="!!switchvalue?'color:#eb6000':'color:#aaa'">￥{{advance | formatMoney}}</div>
                        <mt-switch v-model="switchvalue" class="abvance_switch" @change="changSwitch"></mt-switch>
                    </div> -->
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
                        <li class="mui-table-view-cell  abvanceradio" :class="credit_state == 'Y'?'':'background_e'" v-if='this.$store.getters["logintoken"]'>
                            <div :class="[credit_state=='Y'?'mui-navigate-right':'']">
                                <div class="mui-media-body mui-radio">
                                    <label style="padding-right:0"><input type="radio" name="advance" value="信用" v-model="checkedValue" :disabled="credit_state == 'Y' && credit_lines - used_lines>0?false:true">
                                        <img class="mui-media-object mui-pull-left" src="../../../static/images/credit-pay.png">信用支付
                                        <p class='mui-ellipsis1' v-if="credit_state == 'Y'"><span class="title">信用额度</span> <span class="price">{{credit_lines | toFixed2}}</span><span class="title">可用</span> <span class="price">{{(credit_lines - used_lines) | toFixed2}}</span></p>
                                        <p class='mui-ellipsis1' v-else><span class="title">不可用</span></p>
                                    </label>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="pay-ways">
                <div class="pay-title">
                    <h5>线下结算</h5>
                </div>
                <div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell abvanceradio">
                            <div class="mui-navigate-right">
                                <div class="mui-media-body mui-radio">
                                    <label><input type="radio" name="advance" value="现金" v-model="checkedValue">
                                        <img class="mui-media-object mui-pull-left" src="../../../static/images/xj.png">线下支付
                                        <p class='mui-ellipsis'>现金或POS支付，请联系店内人员</p>
                                    </label>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="bank">
                        <h5 class="input-title">收款银行账户</h5>
                        <div class="bankContent">
                            <div class="bankInline">收款名称:</div>
                            <div class="bankInput">{{depositBankAccount}}</div>
                        </div>
                        <div class="bankContent">
                            <div class="bankInline">开户银行:</div>
                            <div class="bankInput">{{depositBankBranch}}</div>
                        </div>
                        <div class="bankContent">
                            <div class="bankInline">银行账号:</div>
                            <div class="bankInput">{{settleBankAccount}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-btn">
            <button type="button" class="def-btn" @click="confirmBtn">确认支付<span v-if="flagadvance">￥{{advance_sun | formatMoney}}</span></button>
        </div>
    </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import {
    isWeixinBrowser,
    m_add,
    getFormarNum,
    m_sub,
    getUrlParam,
    isNull
} from "../../utils/index.js";
export default {
    name: "pay",
    data() {
        return {
            code: this.$route.query.orderCode,
            orderCode: "",
            fu_sum: 0,
            advance: "",
            advance_sun: "",
            switchvalue: false,
            checkedValue: "",
            shop_id: "",
            flagadvance: true,
            coupon_amount: 0,
            isShow: false,
            isPointShow:false,
            popupVisible: false,
            popupWx: false,
            credit_state: "",
            credit_lines: 0,
            used_lines: 0,
            totalPrice: 0,
            isWeixinBrowser: isWeixinBrowser(),
            can_owe_payment: "",
            owe_payment_status: "",
            depositBankAccount: "",
            depositBankBranch: "",
            settleBankAccount: "",
            wxcode: "",
            openid: "",
            pointAmount:""
        };
    },
    watch: {
        checkedValue(val) {
            if (val && this.switchvalue) {
                MessageBox.confirm("该支付方式不能与预付款支付同时进行，是否关闭预付款支付")
                    .then(action => {
                        this.switchvalue = false;
                        let content_ =
                            "{'shop_id':'" +
                            this.shop_id +
                            "','switch_status':'Y'}";
                        this.$post("appAdvance/switchStatus.do", {
                            content: content_,
                            version: "kkllo",
                            login_token: this.$store.getters["logintoken"]
                        }).then(res => {
                            let response = JSON.parse(res);
                            if (response.optFlag == "yes") {
                                Toast(response.optDesc);
                                if (!this.switchvalue) {
                                    this.flagadvance = true;
                                    this.advance_sun = this.fu_sum;
                                }
                                return (val = "");
                            } else {
                                Toast(response.optDesc);
                                return val;
                            }
                        });
                    })
                    .catch(() => {
                        this.switchvalue = true;
                        this.checkedValue = "";
                    });
            } else {
                return val;
            }
        }
    },
    created() {
        this.initpayInfo();
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
            const agent = navigator.userAgent;
            var appid = this.appid;
            let redirect_uri = location.origin + "/pay?orderCode=" + this.code;
            let url =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                appid +
                "&redirect_uri=" +
                encodeURIComponent(redirect_uri) +
                "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
            //分路由替换
            // const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
            // XXX: 修复iOS版微信HTML5 History兼容性问题
            // if (isWeixinBrowser()) {
            //     if (!code) {
            //         window.location.href = url;
            //     } else {
            //         //储存code
            //         this.wxcode = code;
            //         this.getOpenIdByCode(code);
            //     }
            // }
            if (!code) {
                window.location.href = url;
            } else {
                this.wxcode = code;
                if (!this.$store.getters["openId"]) {
                    this.getOpenIdByCode(code);
                }
            }
        },
        changSwitch() {
            //改变是否预支付
            if (!this.switchvalue) {
                MessageBox.confirm("该支付方式不能与预付款支付同时进行，是否关闭预付款支付")
                    .then(action => {
                        this.switchvalue = false;
                        let content_ =
                            "{'shop_id':'" +
                            this.shop_id +
                            "','switch_status':'Y'}";
                        this.$post("appAdvance/switchStatus.do", {
                            content: content_,
                            version: "kkllo",
                            login_token: this.$store.getters["logintoken"]
                            // shop_id:shopId,
                            // switch_status:"Y"
                        }).then(res => {
                            let response = JSON.parse(res);
                            if (response.optFlag == "yes") {
                                Toast(response.optDesc);
                                if (!this.switchvalue) {
                                    this.flagadvance = true;
                                    this.advance_sun = this.fu_sum;
                                }
                            } else {
                                Toast(response.optDesc);
                            }
                        });
                    })
                    .catch(() => {
                        // Toast('操作取消');
                        this.switchvalue = true;
                    });
            } else {
                MessageBox.confirm("确认打开预付款支付?")
                    .then(action => {
                        this.switchvalue = true;
                        let content_ =
                            "{'shop_id':'" +
                            this.shop_id +
                            "','switch_status':'N'}";
                        this.$post("/appAdvance/switchStatus.do", {
                            content: content_,
                            version: "kkllo",
                            login_token: this.$store.getters["logintoken"]
                            // shop_id:shopId,
                            // switch_status:"N"
                        }).then(res => {
                            let response = JSON.parse(res);
                            if (response.optFlag == "yes") {
                                this.checkedValue = "";
                                Toast(response.optDesc);
                                if (!!this.switchvalue) {
                                    var advanceSum = m_sub(
                                        this.fu_sum,
                                        this.advance
                                    );
                                    this.advance_sun = advanceSum;
                                    if (advanceSum > 0) {
                                        this.flagadvance = true;
                                    } else {
                                        this.flagadvance = false;
                                    }
                                } else {
                                    this.flagadvance = true;
                                    this.advance_sun = this.fu_sum;
                                }
                            } else {
                                Toast(response.optDesc);
                            }
                        });
                    })
                    .catch(() => {
                        // Toast('操作取消');
                        this.switchvalue = false;
                    });
            }
        },
        goPay() {
            this.$router.push({
                path: "/"
            });
        },
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.push({ path: "/vpOrderList" });
            }
        },
        creditPay(type) {
            if (type == "Y") {
                // MessageBox.confirm("确认支付").then(action => {
                let accountObj = this.$store.getters["account"];
                let content_ =
                    "{'orderCode':'" +
                    this.code +
                    "','account':'" +
                    accountObj.account +
                    "'}";
                this.$post("/appVpOrder/payOrderByCreditLines.do", {
                    content: content_,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(res => {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        this.$router.push({
                            path: "/orderOk",
                            query: {
                                code: response.orderCode,
                                creatTime: response.creatTime,
                                orderQRCodePath: response.orderQRCodePath,
                                type: "pay"
                            } //前往订单成功页面
                        });
                    } else {
                        Toast(response.optDesc);
                    }
                });
                // });
            } else {
                return;
            }
        },
        moneyPay(payType) {
            let content_ =
                "{'orderCode':'" + this.code + "','payType':'" + payType + "'}";
            this.$post("/appVpOrder/updateOrderPayType.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.$router.push({
                        path: "/orderOk",
                        query: {
                            code: response.orderCode,
                            creatTime: response.creatTime,
                            orderQRCodePath: response.orderQRCodePath
                        } //前往订单成功页面
                    });
                } else {
                    Toast(response.optDesc);
                }
            });
        },
        touchstart() {},
        initpayInfo() {
            this.$post("/appVpOrder/getPayMoney.do", {
                out_trade_no: this.code
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.depositBankAccount = response.res.depositBankAccount;
                    this.depositBankBranch = response.res.depositBankBranch;
                    this.settleBankAccount = response.res.settleBankAccount;
                    this.shop_id = response.res.shop_id;
                    this.orderCode = response.res.orderCode;
                    this.credit_state = response.res.credit_state;
                    this.credit_lines = response.res.credit_lines
                        ? response.res.credit_lines
                        : 0;
                    this.used_lines = response.res.used_lines
                        ? response.res.used_lines
                        : 0;
                    this.fu_sum = response.res.fu_sum;
                    this.can_owe_payment = response.res.can_owe_payment;
                    this.owe_payment_status = response.res.owe_payment_status;
                    this.totalPrice = m_add(
                        parseFloat(response.res.fu_sum),
                        parseFloat(response.res.coupon_amount)
                    );
                    this.advance =
                        parseFloat(response.res.amount_use) > 0
                            ? response.res.amount_use
                            : 0; //预付款
                    var advanceSun = m_sub(
                        m_add(
                            parseFloat(response.res.fu_sum),
                            parseFloat(response.res.coupon_amount)
                        ),
                        parseFloat(response.res.amount_use)
                    );
                    if (
                        response.res.switch_status == "Y" &&
                        response.res.fu_sum <= response.res.amount_use
                    ) {
                        // this.advance_sun = advanceSun;
                        // this.switchvalue = true;
                        // if (advanceSun > 0) {
                        //     this.flagadvance = true;
                        // } else {
                        //     this.flagadvance = false;
                        // }
                        this.switchvalue = false;
                        this.flagadvance = true;
                        this.advance_sun = this.fu_sum;
                    } else {
                        this.switchvalue = false;
                        this.flagadvance = true;
                        this.advance_sun = this.fu_sum;
                    }
                    if (
                        response.res.coupon_amount != "0.00" ||
                        response.res.coupon_amount != 0.0
                    ) {
                        // this.isShow = true;
                        this.pointAmount=response.res.pointAmount
                        if(isNull(this.pointAmount)){
                            this.isPointShow=false
                        }else{
                            this.isPointShow=true
                        }
                        this.coupon_amount =m_sub(response.res.coupon_amount,response.res.pointAmount);
                        if(this.coupon_amount>0){
                            this.isShow = true;
                        }else{
                            this.isShow = false;
                        }
                    }
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
            window.location.href =
                this.baseurl +
                "swiftPay/scanCodePayMent.do?decType=mobile&payType=ALI&out_trade_no=" +
                this.code;
        },
        wxcodePay() {
            window.location.href =
                this.baseurl +
                "swiftPay/scanCodePayMent.do?decType=mobile&payType=WX&out_trade_no=" +
                this.code;
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
            var flag = isWeixinBrowser();
            if (flag) {
                //公众号支付/Wx/scanCodePayMent.do
                try {
                    this.$post("/wx/jsWxApiPayMent.do", {
                        out_trade_no: this.code,
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
                        // returnBack();
                        this.$router.push({ path: "/" });
                    } else if ( res.err_msg == "get_brand_wcpay_request:cancel") {
                        Toast("您已取消支付");
                    } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                        MessageBox("提示", res.err_desc);
                    }
                }
            );
        },
        checkIsPay() {
            this.$post("/wxPay/checkIsPay.do", {
                out_trade_no: this.code
            }).then(res => {
                let response = JSON.parse(res);
                this.popupVisible = false;
                this.popupWx = false;
                if (response.optFlag == "yes") {
                    Toast({
                        message: response.optDesc,
                        duration: 950
                    });
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 950
                    });
                }
            });
        },
        //预支付接口
        advancePay() {
            let account = this.$store.getters["account"].account;
            let content_ =
                "{'orderCode':'" + this.code + "','account':'" + account + "'}";
            this.$post("/appVpOrder/payOrderByAdvance.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.$router.push({
                        path: "/orderOk",
                        query: {
                            code: response.orderCode,
                            creatTime: response.creatTime,
                            orderQRCodePath: response.orderQRCodePath,
                            type: "advance"
                        } //前往订单成功页面
                    });
                } else {
                    Toast(response.optDesc);
                }
            });
        },
        confirmBtn() {
            //确认支付
            var advanceSun = parseFloat(this.advance_sun);
            if (!!this.switchvalue && advanceSun <= 0) {
                this.advancePay();
            } else {
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
                if (this.checkedValue == "信用") {
                    this.creditPay(this.credit_state);
                }
                // if (this.checkedValue == "POS支付") {
                //     this.moneyPay(6);
                // }
                if (this.checkedValue == "现金") {
                    this.moneyPay(4);
                }
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
.mui-ellipsis1 {
    overflow: hidden;
    /* white-space: nowrap; */
    text-overflow: ellipsis;
}
</style>
