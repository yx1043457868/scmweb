<template>
    <div>
        <Header title="确认预购订单"></Header>
        <!--头部end-->
        <div class="my-content order-detail">
            <!--门店配送提示-->
            <LogisticsItem />
            <ul class="mui-table-view">
                <li class="mui-table-view-cell confirm-list mui-row">
                    <label class="mui-col-xs-3">取货方式</label>
                    <div class="mui-radio mui-left select-logistics mui-col-xs-4">
                        <label>门店配送</label>
                        <input name="select-radio" type="radio" value="logistics" v-model="picked">
                    </div>
                    <div class="mui-radio mui-left select-logistics mui-col-xs-4">
                        <label>门店自提</label>
                        <input name="select-radio" type="radio" value="shopPick" v-model="picked">
                    </div>
                </li>
            </ul>
            <!--门店配送地址-->
            <div class="address-wrapper" v-show="picked == 'logistics'">
                <div class="address-info" v-if="selectAddressList != ''" style="margin-bottom: 10px" @click="selectAddress">
                    <!--选择的地址-->
                    <i class="iconfont add-icon">&#xe681;</i>
                    <div class="add-contact">
                        <h5 class="clearfix">
                            <span class="contact-name">{{selectAddressList&&selectAddressList.shopTact?selectAddressList.shopTact:"暂无"}}</span>
                            <span class="contact-tel">{{selectAddressList.shopTel ? selectAddressList.shopTel :"暂无"}}</span>
                        </h5>
                        <p class="address" v-if="selectAddressList.province==selectAddressList.city">收货地址：{{selectAddressList.province}}{{selectAddressList.address}}</p>
                        <p class="address" v-else>收货地址：{{selectAddressList.province}}{{selectAddressList.city}}{{selectAddressList.address}}</p>
                    </div>
                    <div class="address-r">
                        <i class="iconfont you">&#xe603;</i>
                    </div>
                </div>
                <!--默认地址-->
                <div class="address-info" v-else style="margin-bottom: 10px" @click="selectAddress">
                    <i class="iconfont add-icon">&#xe681;</i>
                    <div class="add-contact" v-if="shopInfo.shopTact && shopInfo.shopTel">
                        <h5 class="clearfix">
                            <span class="contact-name">{{shopInfo.shopTact}}</span>
                            <span class="contact-tel">{{shopInfo.shopTel}}</span>
                        </h5>
                        <p class="address" v-if="shopInfo.province==shopInfo.city">收货地址：{{shopInfo.province}}{{shopInfo.address}}</p>
                        <p class="address" v-else>收货地址：{{shopInfo.province}}{{shopInfo.city}}{{shopInfo.address}}</p>
                    </div>
                    <div class="add-contact" v-else style="height:36px">
                        请编辑收货地址
                    </div>
                    <div class="address-r">
                        <i class="iconfont you">&#xe603;</i>
                    </div>
                </div>
            </div>
            <!--门店自提地址-->
            <div class="address-wrapper" v-show="picked == 'shopPick'">
                <div class="address-info" style="margin-bottom: 10px">
                    <i class="iconfont add-icon">&#xe681;</i>
                    <div class="add-contact">
                        <h5 class="clearfix">
                            <span class="contact-name">{{accountRealName}}</span>
                            <span class="contact-tel">{{accountPhone}}</span>
                        </h5>
                        <p class="address">自提地址：{{shopPickAdd.address}}</p>
                    </div>
                    <div class="address-r">
                        <!-- <i class="iconfont you" @click.stop="editShopPickAdd">&#xe636;</i> -->
                        <router-link class="iconfont you" :to='{path:"/mapShow",query:{ad:shopPickAdd.address}}'>&#xe6a8;</router-link>
                    </div>
                </div>
            </div>
            <!--确认订单列表-->
            <ul class="mui-table-view goods-list">
                <li class="mui-table-view-cell" v-for="(food,index) in orders" :key="index">
                    <div class="food-link">
                        <img v-lazy="baseurl+food.imgPath">
                        <div class="recommend">
                            <h4 class="skuName">
                                {{food.skuName}}</h4>
                            <p class="styleno">规格：{{food.styleno}}</p>
                            <p class="tip">预付定金 <em>¥{{food.preScale | formatEarnest(food.preunitPrice || 0,food.value)}}</em> <span style="margin-left:8px">预付<em>{{food.preScale}}%</em></span></p>
                            <span class="store">请货量：{{food.value}}{{food.unit}}</span>
                            <span class="price">￥{{food.preunitPrice || 0}}/{{food.unit}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <!--确认订单操作列表-->
            <div class="form-wrapper mt-10">
                <mt-field label="买家留言" class="my-cell" placeholder="选填，给商家留言（50字以内）" v-model="node"></mt-field>
                <div class="mint-cell" @click="cardShow= true">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">优惠券抵扣</div>
                        <div class="mint-cell-value is-link"> <span v-if="totalCount == 0 ">不可用</span>
                            <span v-else-if="totalCount && (couponInfo && couponInfo.ID.length>0)">优惠<span class="price">{{couponInfo.couponValue}}</span>元</span>
                            <span v-else-if="totalCount > 0 && (couponInfo && couponInfo.ID.length == 0)">{{totalCount}}张可用</span>
                        </div>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
            </div>
            <div class="form-wrapper mt-10">
                <mt-cell title="商品总额"><span style="color: #ff671d">{{totalPrice | toFixed}}</span></mt-cell>
                <mt-cell title="优惠券抵扣" v-if="totalCount && couponInfo.ID.length>0"><span style="color: #eb6000">-{{couponInfo.couponValue | toFixed}}</span></mt-cell>
                <mt-cell title="预付定金"><span style="color: #ff671d">￥{{totalEarnest}}</span></mt-cell>
                <mt-cell title="尾款总额"><span style="color: #ff671d">￥{{totalBalance}}</span></mt-cell>
            </div>
            <!--优惠券-->
            <div class="dialogMask" v-show="cardShow" @click="cardShow= false"></div>
            <cardsDialog v-show="cardShow" :totalPrice="totalPrice" :orders="orders" :cardShow="cardShow" @hide="cardShow= false" @initCount="initCount" />
            <!--工具栏start-->
            <div class="shop-toolbar mui-input-row mui-checkbox mui-left" style="padding-left: 10px;bottom:0">
                <label style="padding-left: 0">
                    <span class="total" style="margin-left: 0"><em>合计预付定金 </em>
                        <span class="tip-text">￥{{totalEarnest}}</span></span>
                </label>
                <button class="mui-btn" type="button" @click.stop="submitOrder">确认订单</button>
            </div>
            <!--修改自提方式-->
            <div class="mint-msgbox-wrapper" style="position: fixed;z-index: 999;top: 0;left: 0;bottom: 0;right: 0;margin: auto;background-color: rgba(100,100,100,0.5);" v-if="changShopAddFlag">
                <div class="mint-msgbox" style="">
                    <div class="mint-msgbox-header">
                        <div class="mint-msgbox-title">提示</div>
                    </div>
                    <div class="mint-msgbox-content">
                        <div class="mint-msgbox-input" style="">
                            <input type="text" v-model="shopPickName" placeholder="请输入修改的门店自提联系人" @blur="blurWatch">
                            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                        </div>
                        <div class="mint-msgbox-input" style="">
                            <input type="text" v-model="shopPickAdd.address" placeholder="请输入修改的门店自提地址" @blur="blurWatch">
                            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                        </div>
                    </div>
                    <div class="mint-msgbox-btns">
                        <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click.stop="changShopAddFlag=false">取消</button>
                        <button class="mint-msgbox-btn mint-msgbox-confirm " @click.stop="changShopAddConfig">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox, DatetimePicker } from "mint-ui";
import Header from "@/components/Header";
import LogisticsItem from "@/components/logisticsItem";
import cardsDialog from "@/components/cardsDialog";
import {
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    formatDate,
    isNull,
    toFloat2
} from "../../utils/index.js";
export default {
    name: "confirmPreOrder",
    components: {
        Header,
        LogisticsItem,
        cardsDialog
    },
    data() {
        return {
            accountPhone:this.$store.getters["company"].contactPhone?this.$store.getters["company"].contactPhone:'',
            accountRealName:this.$store.getters["company"].contactName?this.$store.getters["company"].contactName:'',
            shopInfo: {},
            shopPickAdd: {},
            shopPickName: this.$store.getters["account"].account,
            changShopAddFlag: false,
            node: "",
            selectAddressList: "",
            orderCode: "",
            picked: "logistics",
            cardShow: false,
            payWayShow: false,
            picked: "logistics",
            payWays: "online",
            payWayTitle: "先款后货",
            couponInfo:{couponValue:0,minMoney:0,ID:[]},
            totalCount: "",
            tipText: "",
            tipHandle: "",
            couponSend: "",
            sendType: "1",
        };
    },
    created() {
        this.initAddress();
        //获取缓存地址
        this.changeAdsByCookie();
        this.checkPaymentMethod();
        this.checkHasCouponSend();
        if (this.orders.length == 0) {
            this.$router.push({
                path: "/preorderList"
            });
        }
    },
    computed: {
        //确认订单产品列表
        orders() {
            return this.$store.state.preorder;
        },
        totalPrice() {
            //如果计算属性写成函数，默认调用get方法
            var _this = this;
            return _this.$store.state.preorder.reduce(function(
                prev,
                next,
                index
            ) {
                if (!next.checked) return prev;
                return (prev = prev + (next.preunitPrice || 0) * (next.value || 0));
            },
            0);
        },
        totalEarnest() {
            //如果计算属性写成函数，默认调用get方法
            var _this = this;
            var sum = 0;
            _this.orders.map(cart => {
                sum += parseFloat(
                    m_div(
                        m_mul(
                            m_mul(cart.preunitPrice || 0, cart.value || 0),
                            cart.preScale || 0
                        ),
                        100
                    )
                );
            });
            return toFloat2(sum);
        },
        totalBalance() {
            return toFloat2(m_sub(m_sub(this.totalPrice, this.totalEarnest),this.couponInfo.couponValue));
        }
    },
    filters: {
        toFixed: function(value) {
            return "￥" + parseFloat(value).toFixed(2);
        },
        formatEarnest: function(preScale = 0, price = 0, value = 0) {
            return toFloat2(m_div(m_mul(m_mul(price, value), preScale), 100));
        },
        formatPrePrice: function(value) {
            return toFloat2(m_div(value, 100));
        }
    },
    methods: {
        //获取子组件初始化优惠券信息
        initCount(val, couponInfo) {
            this.totalCount = val;
            this.couponInfo = couponInfo;
        },
        blurWatch() {
            window.scroll(0, 0);
        },
        back() {
            this.$router.back(-1);
        },
        openPicker() {
            this.$refs.picker.open();
        },
        handleConfirm(data) {
            this.exceptedTime = formatDate(data, 1);
        },
        //获取缓存地址
        changeAdsByCookie() {
            let address = this.$store.state.address;
            if (address == null || address == "") {
                this.selectAddressList = "";
            } else {
                this.selectAddressList = address;
            }
        },
        initAddress() {
            let accountObj = this.$store.getters["account"];
            let shopId = accountObj.shopId;
            let companyId = accountObj.companyId;
            let content_ =
                "{'shopId':'" + shopId + "','companyId':'" + companyId + "'}";
            this.$post("/appShippingAddress/appVpShopAddress.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    if (!response.shop) {
                        this.shopPickAdd = response.VpShopAddress;
                        this.isDisable = false;
                    } else {
                        // console.log(response.shop);
                        this.shopInfo = response.shop;
                        this.shopPickAdd = response.VpShopAddress;
                        this.isDisable = false;
                    }
                } else {
                    this.isDisable = true;
                }
            });
        },
        selectAddress() {
            this.$router.push({
                path: "/selectAddress"
            });
        },
        editShopPickAdd() {
            this.changShopAddFlag = true;
        },
        changShopAddConfig() {
            if (this.shopPickAdd.address == "") {
                Toast("自提地址不能为空");
                return false;
            }
            if (this.shopPickName == "") {
                Toast("自提联系人不能为空");
                return false;
            }
            this.changShopAddFlag = false;
        },
        checkPaymentMethod() {
            let accountObj = this.$store.getters["account"];
            let shopId = accountObj.shopId;
            var content_ = '{"shopId":"' + shopId + '"}';
            this.$post("/appVpOrder/checkPaymentMethod.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    //可以使用货到付款
                    this.tipText = response.optDesc;
                    this.tipHandle = "yes";
                } else {
                    //不可以使用货到付款
                    this.tipText = response.optDesc;
                    this.tipHandle = "no";
                }
            });
        },
        checkHasCouponSend: function() {
            let companyId = this.$store.getters["account"].companyId;
            let account = this.$store.getters["account"].account;
            let content_ =
                '{"account":"' + account + '","companyId":"' + companyId + '"}';
            this.$post("/appCounpon/checkHasCouponSend.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.couponSend = response.res;
                } else {
                    // Toast({
                    //     message: "获取失败",
                    //     duration: 1000
                    // });
                }
            });
        },
        shoppingCart(){

        },
        submitOrder() {
            var _this = this;
            _this.isDisable = true;
            if (this.picked == "logistics") {
                if (_this.selectAddressList) {
                    if (
                        isNull(_this.selectAddressList.shopTact) ||
                        isNull(_this.selectAddressList.shopTel) ||
                        isNull(_this.selectAddressList.address)
                    ) {
                        MessageBox("提示", "请编辑完整的收货地址");
                        return false;
                    }
                } else {
                    if (
                        isNull(_this.shopInfo) ||
                        isNull(_this.shopInfo.address) ||
                        isNull(_this.shopInfo.shopTact) ||
                        isNull(_this.shopInfo.shopTel)
                    ) {
                        MessageBox("提示", "请编辑完整的收货地址");
                        return false;
                    }
                }
            } else {
                if (
                    isNull(_this.shopPickAdd) ||
                    isNull(_this.shopPickAdd.address) ||
                    isNull(_this.shopPickName)
                ) {
                    MessageBox("提示", "请编辑完整的门店自提地址");
                    return false;
                }
            }
            var accountObj = this.$store.getters["account"],
                companyObj = this.$store.getters["company"],
                shopObj = this.$store.getters["shop"];
            var companyId = accountObj.companyId;
            var owner = companyObj.owner;
            var wmCode = shopObj.wm_code ? shopObj.wm_code: shopObj.wmCode;
            var shopId = shopObj.id;
            var account = accountObj.account;
            var createBy = accountObj.account;
            if (_this.totalCount && _this.couponInfo.ID.length > 0) {
                var couponAmount = _this.couponInfo.couponValue;
                var couponId = _this.couponInfo.ID.join(',');
            } else {
                var couponAmount = "";
                var couponId = "";
            }
            //门店配送
            if (_this.picked == "logistics") {
                _this.sendType = "1";
                if (_this.selectAddressList) {
                    var receiveName = _this.selectAddressList.shopTact || "",
                        receivePhone = _this.selectAddressList.shopTel || "",
                        shopProvinceCode =
                            _this.selectAddressList.province_id || "",
                        shopCityCode = _this.selectAddressList.city_id || "",
                        shopProvinceName =
                            _this.selectAddressList.province || "",
                        shopCityName = _this.selectAddressList.city || "",
                        receiveAddress = _this.selectAddressList.address || "";
                } else {
                    var receiveName = _this.shopInfo.shopTact || "",
                        receivePhone = _this.shopInfo.shopTel || "",
                        shopProvinceCode = _this.shopInfo.province_id || "",
                        shopCityCode = _this.shopInfo.city_id || "",
                        shopProvinceName = _this.shopInfo.province || "",
                        shopCityName = _this.shopInfo.city || "",
                        receiveAddress = _this.shopInfo.address || "";
                }
            } else {
                //门店自提
                _this.sendType = "4";
                var receiveName = _this.shopPickName,
                    receivePhone = "",
                    shopProvinceCode = "",
                    shopCityCode = "",
                    shopProvinceName = "",
                    shopCityName = "",
                    receiveAddress = _this.shopPickAdd.address;
            }
            var opt = new Array();
            _this.orders.forEach(function(item, index) {
                var op = [];
                var wmCode = item.wm_code || shopObj.wmCode;
                op.push("'qty':'" + item.value + "'");
                op.push("'skuCode':'" + item.skuCode + "'");
                op.push("'price':'" + item.preunitPrice + "'");
                op.push("'cycleId':'" + item.cycleId + "'");
                op.push("'cycleCode':'" + item.cycleCode + "'");
                opt.push("{" + op.join(",") + "}");
            });
            var content_ =
                "{" +
                "'companyId': '" +
                companyId +
                "'," +
                "'owner': '" +
                owner +
                "'," +
                "'wmCode': '" +
                wmCode +
                "'," +
                "'shopId': '" +
                shopId +
                "'," +
                "'account': '" +
                account +
                "'," +
                "'receiveName': '" +
                receiveName +
                "'," +
                "'receivePhone': '" +
                receivePhone +
                "'," +
                "'province': '" +
                shopProvinceCode +
                "'," +
                "'city': '" +
                shopCityCode +
                "'," +
                "'provinceCn': '" +
                shopProvinceName +
                "'," +
                "'cityCn': '" +
                shopCityName +
                "'," +
                "'receiveAddress': '" +
                receiveAddress +
                "'," +
                "'skus': [" +
                opt.join(",") +
                "]," +
                "'sendType': '" +
                _this.sendType +
                "'," +
                "'note': '" +
                _this.node +
                "'," +
                "'delaypayFlag': 'N'," +
                "'couponAmount': '" +
                couponAmount +
                "'," +
                "'couponId': '" +
                couponId +
                "'," +
                "'sumAmount': '" +
                _this.totalPrice +
                "'," +
                "'preAmount': '" +
                _this.totalEarnest +
                "'," +
                "'tailAmount': '" +
                _this.totalBalance +
                "'}";
            this.$post("/appPreOrder/submitPreOrder.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    var orderCode = response.res.orderCode;
                    _this.orderCode = orderCode;
                    _this.$store.commit("clearPreOrder");
                    this.$router.push({
                        path: "/prePay",
                        query: { orderCode: orderCode, type: "preorder" } //前往支付页面
                    });
                } else {
                    _this.isDisable = false;
                    MessageBox("提示", response.optDesc);
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.recommend {
    position: relative;
    .blue {
        position: absolute;
        top: 7px;
        right: 10px;
    }
}
</style>
