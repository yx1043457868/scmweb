<template>
    <div class="contaniner_s">
        <Header title="确认申报"></Header>
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
                <div class="total1">商品清单
                    <span class="total_num">总数：{{orderNum}}</span>
                </div>
                <li class="mui-table-view-cell" v-for="(food,index) in orders" :key="index">
                    <div class="food-link">
                        <img v-lazy="baseurl+food.img_path">
                        <div class="recommend">
                            <h4 class="skuName">
                                <!-- <i class="iconfont gift" v-if="food.is_gift == 'Y'">&#xe6c7;</i> -->
                                {{food.sku_name}}
                            </h4>
                            <!-- <span class="price" style="height:auto" v-if="food.rkpriceList && food.rkpriceList.length > 0 ">￥{{food.price}}/{{food.uomDefault}}</span>
                            <span class="price" style="height:auto" v-else>￥{{food.price}}/{{food.uom_default}}</span> -->
                            <p class="styleno">规格：{{food.styleno}}</p>
                            <p class="styleno">
                                <span class="tag" v-if="food.rkpriceList">以量定价</span>
                            </p>
                            <p class="styleno">商品编码：{{food.sku_code}}</p>
                            <span class="blue">×{{food.value}}</span>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="form-wrapper mt-10">
                <div class="mint-cell" @click="openPicker">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">期望交货时间</div>
                        <div class="mint-cell-value is-link">
                            <span :class="[exceptedTime !='' ? 'active':'']">{{exceptedTime ?exceptedTime :"请选择期望交货时间"}}</span>
                        </div>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
                <mt-field label="买家留言" class="my-cell" placeholder="请输入留言/备注信息（选填）" v-model="node"></mt-field>
            </div>
            <mt-datetime-picker type="date" ref="picker" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm" :startDate="startDate">
            </mt-datetime-picker>
            <div class="bottom-btn" style="padding:0">
                <button type="button" class="def-btn" @click.stop="submitOrder">确认申报</button>
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
import {
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    formatDate,
    isNull
} from "../../utils/index.js";
export default {
    name: "confirmSimple",
    components: {
        Header,
        LogisticsItem,
    },
    data() {
        return {
            accountPhone:this.$store.getters["company"].contactPhone?this.$store.getters["company"].contactPhone:'',
            accountRealName:this.$store.getters["company"].contactName?this.$store.getters["company"].contactName:'',
            orders: this.$store.state.sample,
            companywm: {},
            shopPickAdd: {},
            isShow: false,
            shopInfo: {},
            shopPickName: this.$store.getters["account"].account,
            changShopAddFlag: false,
            node: "",
            mergeFlag: {},
            selectAddressList: "",
            orderCode: "",
            cardShow: false,
            payWayShow: false,
            choices: [],
            isActive: "0",
            picked: "shopPick",
            payWays: "online",
            payWayTitle: "先款后货",
            couponInfo: "",
            priceSpread: 0,
            couponListY: [],
            couponListN: [],
            Y: true,
            N: false,
            checkedObj: [],
            checked: "",
            totalCount: "",
            tipText: "",
            tipHandle: "",
            activeClass: "active",
            errorClass: "disable",
            couponSend: "",
            sendType: "1",
            minOrderNum: 0,
            dateTime: "",
            startDate: new Date(),
            exceptedTime: "",
            orderNum: null,
            isDisable: true
        };
    },
    created() {
        this.initAddress();
        //获取缓存地址
        this.changeAdsByCookie();
        if (this.orders.length == 0) {
            this.$router.push({
                path: "/"
            });
        }
    },
    mounted() {
        var that = this;
        this.orders.forEach(function(item, index) {
            that.orderNum += Number(item.value);
        });
    },
    methods: {
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
        touchstart() {},
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
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            var shopObj, companyObj;
            companyObj = this.$store.getters["company"]
                ? this.$store.getters["company"]
                : {};
            shopObj = this.$store.getters["shop"]
                ? this.$store.getters["shop"]
                : {};
            var companyId = accountObj.companyId;
            var owner = companyObj.owner;
            var wmCode = shopObj.wm_code;
            var shopId = shopObj.id;
            var account = accountObj.account;
            var createBy = accountObj.account;
            if (this.picked == "logistics") {
                this.sendType = "1";
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
                this.sendType = "4";
                var receiveName = _this.accountRealName,
                    receivePhone = _this.accountPhone,
                    shopProvinceCode = "",
                    shopCityCode = "",
                    shopProvinceName = "",
                    shopCityName = "",
                    receiveAddress = _this.shopPickAdd.address;
            }
            var opt = new Array();
            _this.orders.forEach(function(item, index) {
                var op = [];
                var giftId = item.giftId || "";
                var price = item.price || 0; 
                op.push("'giftId':'" + giftId + "'");
                op.push("'qty':'" + item.value + "'");
                op.push("'skuCode':'" + item.sku_code + "'");
                op.push("'price':'" + price + "'");
                opt.push("{" + op.join(",") + "}");
            });
            var content_ =
                "{" +
                "'companyId': '" +
                companyId +
                "'," +
                "'refType': '1'," +
                "'owner': '" +
                owner +
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
                "'shopProvinceCode': '" +
                shopProvinceCode +
                "'," +
                "'shopCityCode': '" +
                shopCityCode +
                "'," +
                "'shopProvinceName': '" +
                shopProvinceName +
                "'," +
                "'shopCityName': '" +
                shopCityName +
                "'," +
                "'receiveAddress': '" +
                receiveAddress +
                "'," +
                "'skus': [" +
                opt.join(",") +
                "]," +
                "'createBy': '" +
                createBy +
                "'," +
                "'exceptedTime': '" +
                this.exceptedTime +
                "'," +
                "'sendType': '" +
                _this.sendType +
                "'," +
                "'note': '" +
                _this.node +
                "'" +
                "}";
            _this
                .$post(
                    "/appGift/submitOrder.do",
                    {
                        content: content_,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    },
                    { emulateJSON: true }
                )
                .then(function(res) {
                    sessionStorage.searchValue='';
                    let response = JSON.parse(res);
                    if (response.flag == true) {
                        
                        _this.$store.commit("clearsample", []);
                        _this.$router.push({
                            path: "/simpleOk",
                            query: {
                                createTime: response.data.createTime,
                                orderCode: response.data.orderCode,
                                index:
                                    accountObj.role == "01"
                                        ? 1
                                        : accountObj.role
                            }
                        });
                    } else {
                        _this.isDisable = false;
                        Toast(response.message);
                    }
                })
                .catch(function(error) {
                    // removeLoad();
                    console.log(error);
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.contaniner_s {
    padding-bottom: 100px;
}
.total1 {
    padding: 5px 17px;

    border-bottom: 1px solid #c8c7cc;

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
