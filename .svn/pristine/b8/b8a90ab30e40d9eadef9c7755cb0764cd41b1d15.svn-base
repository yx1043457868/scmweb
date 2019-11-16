<template>
    <div>
        <Header title="确认订单"></Header>
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
                        <img v-lazy="baseurl+food.img_path">
                        <div class="recommend">
                            <h4 class="skuName">{{food.sku_name}}</h4>
                            <p class="styleno">规格：{{food.styleno}}</p>
                            <span class="tag" v-if="food.full_gift">满赠</span>
                            <span class="store">请货量：{{food.value}}{{food.unit}}<span v-if="food.mnum_value">{{food.mnum_value}}{{food.uom_default}}</span></span>
                            <span class="price"><span v-show="shopType!=4" style="font-size:12px;">会员价：</span>￥{{food.unit_price?food.unit_price:0}}/{{food.unit}} <span class="retail_price" v-if="food.retail_flag =='Y'">(￥{{food.price?food.price:0}}/{{food.uom_default}})</span></span>
                        </div>
                    </div>
                    <!-- requireType 0:满多少数量赠送 1:满多少金额赠送 -->
                    <!-- unitType  0 主单位 1辅单位 -->
                    <div v-if="food.full_gift && food.full_gift.requireType == 0">
                        <div v-if="food.full_gift.unitType == 0">
                            <div v-show="handleShow(food.full_gift.require, food.value, food.equation_factor, food.mnum_value)">
                                <div class="gift-link clearfix" v-for="(gift, index) in food.full_gift.productList" :key="index">
                                   <img v-lazy="baseurl+ gift.imagPath" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
                                    <span class="is_gift">赠</span>
                                    <div class="gift-info">
                                        <h4 class="skuName">{{gift.skuName}}</h4>
                                        <p class="styleno">规格：{{gift.styleno}}</p>
                                        <span class="gift-num">x {{gift.requirement | FormatGift(food)}}
                                            <!-- unitType  0 主单位 1辅单位 -->
                                            <em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
                                            <em v-else>{{gift.unit}}</em>
                                        </span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div v-else>
                            <div v-show="parseFloat(food.full_gift.require) <= parseFloat(food.value)">
                                <div class="gift-link clearfix" v-for="(gift, index) in food.full_gift.productList" :key="index">
                                    <img v-lazy="baseurl+ gift.imagPath" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
                                    <span class="is_gift">赠</span>
                                    <div class="gift-info">
                                        <h4 class="skuName">{{gift.skuName}}</h4>
                                        <p class="styleno">规格：{{gift.styleno}}</p>
                                        <span class="gift-num">x {{gift.requirement | FormatGift(food)}}
                                            <!-- unitType  0 主单位 1辅单位 -->
                                            <em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
                                            <em v-else>{{gift.unit}}</em>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="food.full_gift && food.full_gift.requireType == 1">
                        <div v-show="parseFloat(food.full_gift.require) <= parseFloat(food.totalPrice)">
                            <div class="gift-link clearfix" v-for="(gift, index) in food.full_gift.productList" :key="index">
                                <img v-lazy="baseurl+ gift.imagPath" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
                                <span class="is_gift">赠</span>
                                <div class="gift-info">
                                    <h4 class="skuName">{{gift.skuName}}</h4>
                                    <p class="styleno">规格：{{gift.styleno}}</p>
                                    <span class="gift-num">x {{gift.requirement | FormatGift(food)}}
                                        <!-- unitType  0 主单位 1辅单位 -->
                                        <em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
                                        <em v-else>{{gift.unit}}</em>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="food.full_gift && food.full_gift.requireType == 2">
                        <div v-show="parseFloat(food.full_gift.require) <= parseFloat(food.totalPrice)">
                            <div class="gift-link clearfix" style="padding:4px 0 0 60px;">
                                <span class="mui-pull-left span_tip">满{{food.full_gift.require}}元减{{food.full_gift.rductionAmount}}元</span>
                                <span class="mui-pull-right span_tip">可减：￥{{food.full_gift.rductionAmount | FormatAmount(food.full_gift.require,food.totalPrice)}}</span>
                            </div>
                        </div>  
                    </div>
                </li>
            </ul>
            <!--确认订单操作列表-->
            <div class="form-wrapper mt-10">
                <div class="mint-cell" @click="payWayShow= true">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">结算方式</div>
                        <div class="mint-cell-value is-link"><span style="color: #eb6000">{{payWayTitle}}</span></div>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
                <div class="mint-cell" @click="cardShow= true">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">优惠券抵扣</div>
                        <div class="mint-cell-value is-link"> 
                            <span v-if="totalCount == 0 ">不可用</span>
                            <span v-else-if="totalCount && (couponInfo && couponInfo.ID.length>0)">优惠<span class="price">{{couponInfo.couponValue}}</span>元</span>
                            <span v-else-if="totalCount > 0 && (couponInfo && couponInfo.ID.length == 0)">{{totalCount}}张可用</span>
                        </div>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
                <div class="mint-cell" v-if="integralNum&&integralNum!=null"><!-- v-if="integralNum&&integralNum!=null&&integralNum.minPoints<=integralNum.ablePoints" -->
                    <div class="mint-cell-wrapper mui-checkbox">
                        <div class="mint-cell-title">可用积分{{point}}</div>
                         <div class="mint-cell-value is-link"><span v-if="pointAmount==0" >不可用</span><span :style="switchPoint?'color: #eb6000':'color:#999999'"  v-else-if="(totalPrice - couponInfo.couponValue - subPrice-pointAmount)>0">可抵扣{{pointAmount}}元</span><span v-else>不可用</span></div>
                        <!-- <mt-switch v-model="switchPoint"  @change="changeSwitchPoint"></mt-switch> -->
                        <input name="checkbox1" type="checkbox" style="top:12px;right:5px;" v-model="switchPoint" @change="changeSwitchPoint" v-if="(totalPrice - couponInfo.couponValue - subPrice-pointAmount)>0&&pointAmount>=1 ">
                        <input name="checkbox1" type="checkbox" v-model="switchPoint" disabled="disabled" v-else style="top:12px;right:5px;">
                    </div>
                </div>
                <!-- <div class="mint-cell" v-else>
                    <div class="mint-cell-wrapper mui-checkbox">
                        <div class="mint-cell-title">可用积分{{point}}</div>
                        <div class="mint-cell-value is-link"><span>可用积分满{{integralNum.minPoints}}可参与抵扣</span></div>
                        <input name="checkbox1" type="checkbox" style="top:12px;right:5px;" v-model="switchPoint" disabled="disabled">
                    </div>
                </div> -->
            </div>
            <div class="form-wrapper mt-10">
                <mt-field label="买家留言" class="my-cell" placeholder="请输入留言/备注信息（选填）" v-model="node"></mt-field>
                <mt-cell title="商品总额"><span style="color: #eb6000">{{totalPrice | toFixed}}</span></mt-cell>
                <mt-cell title="满减抵扣金额" v-if="subPrice"><span style="color: #eb6000">-{{subPrice | toFixed}}</span></mt-cell>
                <mt-cell title="优惠券抵扣" v-if="totalCount && couponInfo.ID.length>0"><span style="color: #eb6000">-{{couponInfo.couponValue | toFixed}}</span></mt-cell>
                <mt-cell title="积分抵扣" v-if="switchPoint && pointAmount>=1"><span style="color: #eb6000">-{{pointAmount| toFixed}}</span></mt-cell>
            </div>

            <!--优惠券-->
            <div class="dialogMask" v-show="cardShow" @click="cardShow= false" @touchmove.prevent="touchstart"></div>
            <cardsDialog v-show="cardShow" :totalPrice="totalPrice" :orders="orders" :cardShow="cardShow" :switchPoint="switchPoint" :pointAmount="pointAmount" :subPrice="subPrice" @hide="cardShow= false" @initCount="initCount" />

            <!--支付方式-->
            <div class="dialogMask" v-show="payWayShow" @click="payWayShow= false" @touchmove.prevent="touchstart"></div>
            <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
                <div class="dialog-wrapper card-dialog" v-show="payWayShow" @touchmove.prevent="touchstart">
                    <div class="dialog-box">
                        <div class="dialog-header center">请选择支付方式</div>
                        <div>
                            <form class="mui-input-group">
                                <div class="mui-input-row mui-radio">
                                    <label><i class="iconfont">&#xe6c0;</i>先款后货</label>
                                    <input name="radio1" type="radio" value="online" v-model="payWays">
                                </div>
                                <div class="mui-input-row mui-radio">
                                    <label><i class="iconfont">&#xe7bd;</i>货到付款
                                        <span class="tip">{{tipText}}</span>
                                    </label>
                                    <input name="radio1" type="radio" value="cod" v-model="payWays" v-if="tipHandle== 'yes'">
                                    <input name="radio1" type="radio" value="cod" v-model="payWays" disabled="disabled" v-else>
                                </div>
                            </form>
                        </div>
                        <div class="confirm_b">
                            <button class="sure_btn" @click="confirmPayWays()">确定</button>
                        </div>
                    </div>
                </div>
            </transition>
            <!--工具栏start-->
            <div class="shop-toolbar mui-input-row mui-checkbox mui-left" style="padding-left: 10px;bottom:0">
                <label style="padding-left: 0">
                    <span class="total" style="margin-left: 0"><em>合计：</em>
                        <span class="tip-text" v-if="totalCount && couponInfo.ID.length > 0 && switchPoint">{{(totalPrice - couponInfo.couponValue - subPrice-pointAmount) | toFixed}}</span>
                        <span class="tip-text" v-else-if="totalCount && couponInfo.ID.length > 0 && !switchPoint">{{(totalPrice - couponInfo.couponValue - subPrice) | toFixed}}</span>
                        <span class="tip-text" v-else-if="switchPoint">{{(totalPrice - subPrice-pointAmount) | toFixed}}</span>
                        <span class="tip-text" v-else>{{(totalPrice - subPrice)| toFixed}}</span>
                    </span>
                </label>
                <button class="mui-btn" type="button" @click.stop="submitOrder">提交订单</button>
            </div>
            <!--修改自提方式-->
            <div class="mint-msgbox-wrapper" style="position: fixed;z-index: 999;top: 44px;left: 0;bottom: 0;right: 0;margin: auto;background-color: rgba(100,100,100,0.5);" v-if="changShopAddFlag">
                <div class="mint-msgbox" style="">
                    <div class="mint-msgbox-header">
                        <div class="mint-msgbox-title">提示</div>
                    </div>
                    <div class="mint-msgbox-content">
                        <div class="mint-msgbox-input" style="">
                            <input type="text" v-model="accountRealName" placeholder="请输入自提联系人" @blur="blurWatch">
                            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                        </div>
                        <div class="mint-msgbox-input" style="">
                            <input type="text" v-model="accountPhone" placeholder="请输入联系电话" @blur="blurWatch">
                            <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                        </div>
                    </div>
                    <div class="mint-msgbox-btns">
                        <!-- <button class="mint-msgbox-btn mint-msgbox-cancel " style="" @click.stop="changShopAddFlag=false">取消</button> -->
                        <button class="mint-msgbox-btn mint-msgbox-confirm " @click.stop="changShopAddConfig">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import Header from "@/components/Header";
import LogisticsItem from "@/components/logisticsItem";
import cardsDialog from "@/components/cardsDialog";
import {
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    isWeixinBrowser,
    isNull,
    toFloat2
} from "../../utils/index.js";
export default {
    name: "confirmOrder",
    components: {
        Header,
        LogisticsItem,
        cardsDialog,
    },
    data() {
        return {
            accountPhone:this.$store.getters["account"].phone?this.$store.getters["account"].phone:
                        this.$store.getters["shop"].shopType==4?this.$store.getters["company"].contactPhone:'',
            accountRealName:this.$store.getters["account"].realName?this.$store.getters["account"].realName:
                            this.$store.getters["shop"].shopType==4?this.$store.getters["company"].contactName:'',
            orders: this.$store.state.orders,
            shopPickAdd: {},
            shopPickName: this.$store.getters["account"].account,
            changShopAddFlag: false,
            isShow: false,
            shopInfo: {},
            node: "",
            selectAddressList: "",
            orderCode: "",
            cardShow: false,
            payWayShow: false,
            picked: "shopPick",
            payWays: "online",
            payWayTitle: "先款后货",
            couponInfo: { couponValue: 0, minMoney: 0, ID: [] },
            totalCount: "",
            tipText: "",
            tipHandle: "",
            couponSend: "",
            sendType: "1",
            minOrderNum: 0,
            isDisable: true,
            showMap:false,
            integralNum:'',
            point:0,
            pointAmount:'',
            switchPoint:true,
            shopType:this.$store.getters["shop"].shopType?this.$store.getters["shop"].shopType:4
        };
    },
    created() {
        // this.initMinOrderNum();暂时屏蔽
        this.initAddress();
        //获取缓存地址
        this.changeAdsByCookie();
        this.shoppingCart();
        this.checkPaymentMethod();
        this.checkHasCouponSend();
        this.getIntegral();
        this.NameAndPhone();
        
    },
    mounted(){
       
    },
    filters: {
        toFixed: function(value) {
            return "￥" + parseFloat(value).toFixed(2);
        },
        FormatGift: function(requirement,food) {
            var _shang = 1;
            //  <!-- requireType 0:满多少数量赠送 1:满多少金额赠送 -->
            //  <!-- unitType  0 主单位 1辅单位 -->
            if(food.full_gift.requireType == 0){
                if(food.full_gift.unitType == 0){
                    var _total = m_add(m_mul(parseFloat(food.value || 0), food.equation_factor), parseFloat(food.mnum_value) || 0);
                    _shang = parseInt(m_div(parseFloat(_total), parseFloat(food.full_gift.require)));
                }else{
                    _shang = parseInt(m_div(parseFloat(food.value) || 0, parseFloat(food.full_gift.require)));
                }
            }else{
                _shang = parseInt(m_div(parseFloat(food.totalPrice) || 0, parseFloat(food.full_gift.require)));
            }
            return m_mul(parseFloat(requirement), parseFloat(_shang));
        },
        FormatAmount:function(rductionAmount,require,totalPrice){
            var _shang = parseInt(m_div(parseFloat(totalPrice), parseFloat(require)));
            return m_mul(parseFloat(rductionAmount), parseFloat(_shang));
        }
    },
    computed: {
        chajia() {
            return m_sub(
                parseFloat(this.minOrderNum),
                parseFloat(this.totalPrice)
            );
        },
        subTotalPrice(){
            return m_sub(this.totalPrice, this.subPrice || 0)
        },
        subPrice(){
            //如果计算属性写成函数，默认调用get方法
            var _this = this;
            var sum = 0, _shang = 1;
            _this.$store.state.orders.map((cart) => {
                if(cart.checked && cart.full_gift && cart.full_gift.requireType == 2){
                    _shang = parseInt(m_div(parseFloat(cart.totalPrice), parseFloat(cart.full_gift.require)));
                    cart.total = m_mul(parseFloat(cart.full_gift.rductionAmount) || 0, parseFloat(_shang));
                }else{
                    cart.total = 0;
                }
                sum += parseFloat(cart.total)
            })
            return sum;
        },
        totalPrice() {
            //如果计算属性写成函数，默认调用get方法
            var _this = this;
            return _this.$store.state.orders.reduce(function(
                prev,
                next,
                index
            ) {
                if (!next.checked) return prev;
                if (!_this.$store.state.orders[index].rkpriceList) {
                    return (
                        prev +
                        (next.unit_price || 0) * (next.value || 0) +
                        (next.price || 0) * (next.mnum_value || 0)
                    );
                } else if (_this.$store.state.orders[index].rkpriceList) {
                    return (
                        prev +
                        (next.rank_price || 0) * (next.value || 0) +
                        (next.price || 0) * (next.mnum_value || 0)
                    );
                }
            },
            0);
        }
    },
    methods: {
        NameAndPhone(){
            this.$post("/appVpOrder/checkAccountHasNameAndPhone.do", {
                content:"{'account':'" + this.shopPickName + "'}",
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == true) {
                   this.changShopAddFlag=true;
                }
            })
        },
        changShopAddConfig() {
            if (this.accountRealName == "") {
                Toast("自提联系人不能为空");
                return false;
            }
            if (this.accountPhone == "") {
                Toast("自提联系电话不能为空");
                return false;
            }else{
                var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; 
                var isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
                var isMob=/^1[0-9]{10}$/;
                if (isMob.test(this.accountPhone) || isPhone.test(this.accountPhone) || isPhone02.test(this.accountPhone)) { 
                } else {
                    Toast('请输入正确手机号或座机电话'); 
                    return false;
                }
            }
            let _content=
                "{'account':'" + this.shopPickName + "','name':'" + this.accountRealName +"','phone':'" + this.accountPhone + "'}";
            this.$post("/appVpOrder/updateShopAccountContactNameAndPhone.do", {
                content:_content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == true) {
                    let accountObj = this.$store.state.logindata
                    accountObj.account.realName=this.accountRealName;
                    accountObj.account.phone=this.accountPhone
                    this.$store.commit("setData", accountObj);
                    this.changShopAddFlag=false;
                }else{
                   Toast({
                        message: response.optDesc,
                        duration: 1000
                    }); 
                }
            })
            this.changShopAddFlag = false;
        },
        handleShow(require,value=0,equation_factor,mnum_value){
           var _total = m_add(m_mul(parseFloat(value || 0), equation_factor), parseFloat(mnum_value) || 0);
           if(require <= _total){
               return true;
           }else{
               return false;
           }
        },
        //获取子组件初始化优惠券信息
        initCount(val, couponInfo) {
            this.totalCount = val;
            this.couponInfo = couponInfo;
        },
        blurWatch() {
            window.scroll(0, 0);
        },
        initAddress() {
            let accountObj = this.$store.getters["account"],
                account = accountObj.account,
                shopId = accountObj.shopId,
                companyId = accountObj.companyId;
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
                        this.shopInfo = response.shop;
                        this.shopPickAdd = response.VpShopAddress;
                        this.isDisable = false;
                    }
                } else {
                    // Toast("请编辑收货地址");
                    this.isDisable = true;
                }
            });
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
        initMinOrderNum() {
            let companyId = this.$store.getters["account"].companyId;
            //获取登录信息
            this.$post("/companyConfig/initCompanyConfig.do", {
                content: '{"companyId": "' + companyId + '"}',
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.res) {
                    this.minOrderNum = response.res;
                    var total = this.totalPrice;
                    total >= this.minOrderNum
                        ? (this.picked = "logistics")
                        : (this.picked = "shopPick");
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
                }
            });
        },
        confirmPayWays: function() {
            if (this.payWays == "online") {
                //先款后货
                this.payWayTitle = "先款后货";
            } else {
                //货到付款
                this.payWayTitle = "货到付款";
            }
            this.payWayShow = false;
        },
        touchstart() {},
        selectAddress() {
            this.$router.push({
                path: "/selectAddress"
            });
        },
        // editShopPickAdd() {
        //     this.changShopAddFlag = true;
        // },
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
        shoppingCart() {
            var ids = [],
                companyId = this.$store.getters["account"].companyId;
            if (this.orders && this.orders.length > 0) {
                this.orders.forEach(item => {
                    ids.push(item.id);
                });
                var shopId = this.$store.getters["account"].shopId
                    ? this.$store.getters["account"].shopId
                    : "";
                var shopType = this.$store.getters["shop"].shopType
                    ? this.$store.getters["shop"].shopType
                    : "";
                let _content =
                    "{'ids':'" +
                    ids.join(",") +
                    "','companyId':'" +
                    companyId +
                    "','shopId':'" +
                    shopId +
                    "','shopType':'" +
                    shopType +
                    "'}";
                //获取登录信息
                this.$post("/appVpProduct/shoppingCart.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(res => {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        this.onLineShopCarts = response.res;
                        this.onLineShopCarts.forEach((item, index) => {
                            this.orders[index].qty = item.qty || 0;
                            this.orders[index].unit_price = item.unit_price || 0; 
                            this.orders[index].price = item.price || 0;
                            this.orders[index].wm_code = item.wm_code;
                            this.orders[index].full_gift = item.full_gift ? JSON.parse(item.full_gift) : '';
                        });
                        this.$store.commit("orders", this.orders);
                        this.orders =
                            JSON.parse(localStorage.getItem("orders")) ||
                            this.$store.state.orders;
                    } else {
                        // Toast({
                        //     message: "获取失败",
                        //     duration: 1000
                        // });
                    }
                });
            } else {
                this.$router.push({
                    path: "/"
                });
            }
        },
        getIntegral(){
            let shopId = this.$store.getters["account"].shopId;
            //获取客户积分
            this.$post("/points/checkCanBeUsedToDeduct.do", {
                content: '{"shopId": "' + shopId + '"}',
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if(response.optFlag=='yes'){
                    var optData=JSON.parse(response.optData)
                    this.integralNum=optData
                    this.point=optData.ablePoints>0?optData.ablePoints:0
                    var pointAmountInt=parseInt(m_div(this.point,optData.deductRate))
                    
                    this.$nextTick(() => {
                        // if(optData.ablePoints>=optData.minPoints){//
                            if(pointAmountInt<1){
                                this.pointAmount=0
                            }else if(pointAmountInt>this.totalPrice*0.05){
                                this.pointAmount=parseInt(this.totalPrice*0.05)
                            }else{
                            this.pointAmount= pointAmountInt
                            }
                            if((this.totalPrice - this.couponInfo.couponValue - this.subPrice-this.pointAmount)>0&&this.pointAmount>=1){
                                this.switchPoint=true;
                            }else{
                                this.switchPoint=false;
                            }
                        // }else{
                        //     this.pointAmount=0;
                        //     this.switchPoint=false;
                        // }
                    })
                }else{
                    this.switchPoint=false;
                    var optData=JSON.parse(response.optData)
                    this.integralNum=optData
                    this.point=optData.ablePoints>0?optData.ablePoints:0 
                }
            });
        },
        changeSwitchPoint(){
            if(this.switchPoint){
                this.point=this.integralNum.ablePoints
                var pointAmountInt=parseInt(m_div(this.integralNum.ablePoints,this.integralNum.deductRate))
                if(pointAmountInt<1){
                    this.pointAmount=0
                }else if(pointAmountInt>this.totalPrice*0.05){
                    this.pointAmount=parseInt(this.totalPrice*0.05)
                }else{
                    this.pointAmount= pointAmountInt
                }
                
            }else{
                // this.point=0
                // this.pointAmount=0
            }
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
            let accountObj = this.$store.getters["account"],
                companyObj = this.$store.getters["company"],
                shopObj = this.$store.getters["shop"];
            var companyId = accountObj.companyId;
            var owner = companyObj.owner;
            var wmCode = shopObj.wm_code;
            var shopId = shopObj.id;
            var account = accountObj.account;
            var createBy = accountObj.account;
            //是否货到付款(1: 货到付款，0：在线付款)
            if (_this.payWays == "online") {
                //先款后货
                var paymentMethod = "0";
            } else {
                //货到付款
                var paymentMethod = "1";
            }
            if (_this.totalCount && _this.couponInfo.ID.length > 0) {
                var couponAmount = _this.couponInfo.couponValue;
                var couponId = _this.couponInfo.ID.join(",");
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
                var obj = {};
                var giftArr = [];
                var giftQty = "";
                var _shang = 1;
                var rductionAmount = 0;
                var qty = m_add(
                    m_mul(item.value || 0, item.equation_factor),
                    item.mnum_value || 0
                );
                if (item.rkpriceList && item.rkpriceList.length > 0) {
                    var price = item.rank_price || item.unit_price;
                } else {
                    var price = item.unit_price || 0;
                }
                var skuCode = item.sku_code;
                //新赠品逻辑
                
                //  <!-- requireType 0:满多少数量赠送 1:满多少金额赠送 -->
                //  <!-- unitType  0 主单位 1辅单位 -->
                if(item.full_gift && item.full_gift.requireType == 0){
                    if(item.full_gift.unitType == 0){
                        var _total = m_add(m_mul(parseFloat(item.value || 0), item.equation_factor), parseFloat(item.mnum_value) || 0);
                        _shang = parseInt(m_div(parseFloat(_total), parseFloat(item.full_gift.require)));
                        for(var i = 0,len = item.full_gift.productList.length; i < len; i++){
                            if(item.full_gift.productList[i].unitType == 0){
                                giftQty = m_mul(parseFloat(item.full_gift.productList[i].requirement) || 0, parseFloat(_shang));
                            }else{
                                giftQty =  m_mul(m_mul(item.full_gift.productList[i].requirement, item.full_gift.productList[i].equationFactor || 1),parseFloat(_shang));
                            } 
                            obj = {
                                giftSkuCode : item.full_gift.productList[i].skuCode || "",
                                giftQty : giftQty
                            }
                            giftArr.push(obj);
                        }
                    }else{
                        _shang = parseInt(m_div(parseFloat(item.value), parseFloat(item.full_gift.require)));
                        for(var i = 0,len = item.full_gift.productList.length; i < len; i++){
                            if(item.full_gift.productList[i].unitType == 0){
                                giftQty = m_mul(parseFloat(item.full_gift.productList[i].requirement) || 0, parseFloat(_shang));
                            }else{
                                giftQty =  m_mul(m_mul(item.full_gift.productList[i].requirement, item.full_gift.productList[i].equationFactor || 1),parseFloat(_shang));
                            } 
                            obj = {
                                giftSkuCode : item.full_gift.productList[i].skuCode || "",
                                giftQty : giftQty
                            }
                            giftArr.push(obj);
                        }
                    }
                }else if(item.full_gift && item.full_gift.requireType == 1){
                    for(var i = 0,len = item.full_gift.productList.length; i < len; i++){
                        _shang = parseInt(m_div(parseFloat(item.totalPrice), parseFloat(item.full_gift.require)));
                        giftQty = m_mul(m_mul(item.full_gift.productList[i].requirement, item.full_gift.productList[i].equationFactor || 1),parseFloat(_shang));
                        obj = {
                            giftSkuCode : item.full_gift.productList[i].skuCode || "",
                            giftQty : giftQty
                        }
                        giftArr.push(obj);
                    }
                }else if(item.full_gift && item.full_gift.requireType == 2){
                    _shang = parseInt(m_div(parseFloat(item.totalPrice), parseFloat(item.full_gift.require)));
                    rductionAmount = (m_mul(parseFloat(item.full_gift.rductionAmount) || 0, parseFloat(_shang))) || 0;
                }
                op.push("'wmCode':'" + wmCode + "'");
                op.push("'qty':'" + qty + "'");
                op.push("'skuCode':'" + skuCode + "'");
                op.push("'price':'" + price + "'");
                op.push("'rductionAmount':'" + rductionAmount + "'");
                op.push("'giftObj':'" + JSON.stringify(giftArr) + "'");
                opt.push("{" + op.join(",") + "}");
            });
            var pointSubmit,pointAmountSubmit
            if(this.switchPoint){
                // pointSubmit=this.point;
                pointSubmit=this.pointAmount*(this.integralNum.deductRate||0)
                pointAmountSubmit=this.pointAmount
            }else{
                pointSubmit=0;
                pointAmountSubmit=0
            }
            // point:0,
            // pointAmount:'',
            // switchPoint:true
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
                "'couponAmount': '" +
                couponAmount +
                "'," +
                "'couponId': '" +
                couponId +
                "'," +
                "'paymentMethod': '" +
                paymentMethod +
                "'," +
                "'sendType': '" +
                _this.sendType +
                "'," +
                "'note': '" +
                _this.node +
                "'," +
                "'point': '" +
                pointSubmit +
                "'," +
                "'pointAmount': '" +
                pointAmountSubmit +
                "'" +
                "}";
            this.$post("/appVpOrder/submitOrder.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                sessionStorage.searchValue="";
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    var orderCode = response.res.orderCode;
                    _this.orderCode = orderCode;
                    _this.getRestshopCarts();
                    if (paymentMethod == "0") {
                        this.$router.push({
                            path: "/pay",
                            query: { orderCode: orderCode } //前往订单成功页面
                        });
                        // window.location.href = location.origin +"/pay?orderCode="+ orderCode;
                    } else {
                        this.$router.push({
                            path: "/orderOk",
                            query: { code: orderCode } //前往订单成功页面
                        });
                    }
                } else {
                    _this.isDisable = false;
                    MessageBox("提示", response.optDesc);
                }
            });
        },
        getRestshopCarts() {
            var carts =
                this.$store.state.carts ||
                JSON.parse(localStorage.getItem("carts"));
            //储存购物车最新数据清空已经购买的购物车
            var shopCarts = carts.map(item => {
                 if(item.checked == true){
                     item.value=1
                     if(item.mnum_value){
                         item.mnum_value=0
                     }
                 };
                 return item
            });
            this.$store.commit("setcarts", shopCarts);
            this.$store.commit("clearorders", this.orders);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
