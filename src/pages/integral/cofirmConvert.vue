<template>
    <div style="padding-bottom: 100px;">
        <Header title="确认兑换"></Header>
        <!--头部end-->
        <div class="my-content order-detail">
            <div class="address-wrapper">
                <!--选择的地址-->
                <div class="address-info" style="margin-bottom: 10px" v-if="selectAddressList != ''" @click="selectAddress">
                    <i class="iconfont add-icon">&#xe681;</i>
                    <div class="add-contact">
                        <h5 class="clearfix">
                            <span class="contact-name">{{selectAddressList.shopTact}}</span>
                            <span class="contact-tel">{{selectAddressList.shopTel}}</span>
                        </h5>
                        <p class="address">收货地址：{{selectAddressList.province}}{{selectAddressList.city}}{{selectAddressList.address}}</p>
                    </div>
                    <div class="address-r">
                        <i class="iconfont you">&#xe603;</i>
                    </div>
                </div>
                <!--默认地址-->
                <div class="address-info" style="margin-bottom: 10px" @click="selectAddress" v-else>
                    <i class="iconfont add-icon">&#xe681;</i>
                    <div class="add-contact" v-if="shopInfo.shopTact && shopInfo.shopTel">
                        <h5 class="clearfix">
                            <span class="contact-name">{{shopInfo.shopTact}}</span>
                            <span class="contact-tel">{{shopInfo.shopTel}}</span>
                        </h5>
                        <p class="address">收货地址：{{shopInfo.province}}{{shopInfo.city}}{{shopInfo.address}}</p>

                    </div>
                    <div class="add-contact" v-else style="height:36px">
                        请编辑收货地址
                    </div>
                    <div class="address-r">
                        <i class="iconfont you">&#xe603;</i>
                    </div>
                </div>
            </div>
            <!--确认订单列表-->
            <mt-cell title="礼品清单"><span style="color: #eb6000">总数：{{integralsCount}}</span></mt-cell>
            <ul class="mui-table-view goods-list">
                <li class="mui-table-view-cell" v-for="(food,index) in salesorders" :key="index">
                    <div class="food-link">
                        <img v-lazy="baseurl+food.picUrl">
                        <div class="recommend">
                            <h4 class="skuName">{{food.skuName}}</h4>
                            <span class="price" style="height:auto">{{food.points}}积分</span>
                            <p class="styleno">{{food.explain}}</p>
                            <span class="blue">×{{food.value}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="form-wrapper mt-10">
                <mt-cell title="兑换总积分"><span style="color: #eb6000">{{totalPoints}}</span></mt-cell>
                <mt-field label="买家留言" class="my-cell" placeholder="请输入留言/备注信息（选填）" v-model="node"></mt-field>
            </div>
            <!--工具栏start-->
            <div class="bottom-btn">
                <button type="button" class="def-btn" @click.stop="submitOrder" :disabled="isDisable">确认兑换</button>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import {
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    isNull
} from "../../utils/index.js";
import { mapState, mapGetters } from "vuex";
export default {
    name: "cofirmConvert",
    components: {
        Header
    },
    data() {
        return {
            shopInfo: {},
            node: "",
            selectAddressList: "",
            orderCode: "",
            isDisable: true
        };
    },
    created() {
        this.initAddress();
        //获取缓存地址
        this.changeAdsByCookie();
        if (!this.salesorders || this.salesorders.length == 0) {
            this.$router.push({
                path: "/integralList"
            });
        }
    },
    computed: {
        //确认订单产品列表
        ...mapGetters(["integralsCount"]),
        salesorders() {
            return this.$store.state.integrals;
        },
        totalPoints() {
            //如果计算属性写成函数，默认调用get方法
            var _this = this;
            return _this.$store.state.integrals.reduce(function(
                prev,
                next,
                index
            ) {
                if (!next.checked) return prev;
                return prev + next.points * next.value;
            },0);
        }
    },
    methods: {
        back() {
            this.$router.back(-1);
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
            let account = accountObj.account;
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
                    if (response.shop) {
                        this.shopInfo = response.shop;
                    }
                    this.shopPickAdd = response.VpShopAddress;
                    this.isDisable = false;
                } else {
                    this.isDisable = true;
                }
            });
        },
        touchstart() {},
        selectAddress() {
            this.$router.push({
                path: "/selectAddress"
            });
        },
        submitOrder() {
            var _this = this;
            _this.isDisable = true;

            if (_this.selectAddressList) {
                if (
                    isNull(_this.selectAddressList.shopTact) ||
                    isNull(_this.selectAddressList.shopTel) ||
                    isNull(_this.selectAddressList.address)
                ) {
                    MessageBox("提示", "请编辑收货地址");
                    _this.isDisable = false;
                    return false;
                }
            } else {
                if (
                    isNull(_this.shopInfo) ||
                    isNull(_this.shopInfo.address) ||
                    isNull(_this.shopInfo.shopTact) ||
                    isNull(_this.shopInfo.shopTel)
                ) {
                    MessageBox("提示", "请编辑收货地址");
                    _this.isDisable = false;
                    return false;
                }
            }

            var accountObj = this.$store.getters["account"],
                companyObj = this.$store.getters["company"],
                shopObj = this.$store.getters["shop"];
            var companyId = accountObj.companyId;
            var shopId = shopObj.id;
            // var account = accountObj.account;
            var createBy = accountObj.account;

            // if (_this.selectAddressList) {
            //     var receiveName = _this.selectAddressList.shopTact || "",
            //         receivePhone = _this.selectAddressList.shopTel || "",
            //         shopProvinceCode =
            //             _this.selectAddressList.province_id || "",
            //         shopCityCode = _this.selectAddressList.city_id || "",
            //         shopProvinceName = _this.selectAddressList.province || "",
            //         shopCityName = _this.selectAddressList.city || "",
            //         receiveAddress = _this.selectAddressList.address || "";
            // } else {
            //     var receiveName = _this.shopInfo.shopTact || "",
            //         receivePhone = _this.shopInfo.shopTel || "",
            //         shopProvinceCode = _this.shopInfo.province_id || "",
            //         shopCityCode = _this.shopInfo.city_id || "",
            //         shopProvinceName = _this.shopInfo.province || "",
            //         shopCityName = _this.shopInfo.city || "",
            //         receiveAddress = _this.shopInfo.address || "";
            // }

            if (_this.selectAddressList) {
                var receiveName = _this.selectAddressList.shopTact || "",
                    receivePhone = _this.selectAddressList.shopTel || "",
                    // shopProvinceCode =
                    //     _this.selectAddressList.province_id || "",
                    // shopCityCode = _this.selectAddressList.city_id || "",
                    // shopProvinceName = _this.selectAddressList.province || "",
                    // shopCityName = _this.selectAddressList.city || "",
                    receiveAddress =
                        _this.selectAddressList.province +
                        _this.selectAddressList.city +
                        _this.selectAddressList.address;
            } else {
                var receiveName = _this.shopInfo.shopTact || "",
                    receivePhone = _this.shopInfo.shopTel || "",
                    shopProvinceCode = _this.shopInfo.province_id || "",
                    // shopCityCode = _this.shopInfo.city_id || "",
                    // shopProvinceName = _this.shopInfo.province || "",
                    // shopCityName = _this.shopInfo.city || "",
                    receiveAddress =
                        _this.shopInfo.province +
                        _this.shopInfo.city +
                        _this.shopInfo.address;
            }

            var opt = new Array();
            _this.salesorders.forEach(function(item, index) {
                var op = [];
                op.push("'id':'" + item.id + "'");
                op.push("'qty':'" + item.value + "'");
                opt.push("{" + op.join(",") + "}");
            });
            var content_ =
                "{'shopId': '" +
                shopId +
                "'," +
                "'companyId': '" +
                companyId +
                "'," +
                "'receiveName': '" +
                receiveName +
                "'," +
                "'receivePhone': '" +
                receivePhone +
                "'," +
                // "'shopProvinceCode': '" +
                // shopProvinceCode +
                // "'," +
                // "'shopCityCode': '" +
                // shopCityCode +
                // "'," +
                // "'shopProvinceName': '" +
                // shopProvinceName +
                // "'," +
                // "'shopCityName': '" +
                // shopCityName +
                // "'," +
                "'receiveAddress': '" +
                receiveAddress +
                "'," +
                "'skuJson': [" +
                opt.join(",") +
                "]," +
                "'createBy': '" +
                createBy +
                "'," +
                "'note': '" +
                _this.node +
                "'" +
                "}";
            _this
                .$post("/points/addPointsorder.do", {
                    content: content_,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                })
                .then(function(res) {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        _this.$store.commit("clearintegrals", []);
                        _this.$router.push({
                            path: "/cofirmOk",
                            query: {
                                createTime: response.res.createTime,
                                orderCode: response.res.orderCode
                            }
                        });
                    } else {
                        _this.isDisable = false;
                        MessageBox("积分已禁用，请联系客服处理", response.optShortDesc);
                    }
                })
                .catch(function(error) {
                    _this.isDisable = false;
                    console.log(error);
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.total1 {
    padding: 5px 17px;

    border-bottom: 1px solid #eee;

    .total_num {
        float: right;
    }
}
.expectTime {
    float: right;
    height: 40px;
    line-height: 40px;
}
.password {
    float: right;
    text-align: right;
    color: black !important;
    line-height: 38px;
    font-size: 14px;
    padding-right: 3px;
}
.recommend {
    position: relative;
    .blue {
        position: absolute;
        top: 7px;
        right: 10px;
    }
}
.mui-input-row::after {
    left: 0px;
}
</style>
