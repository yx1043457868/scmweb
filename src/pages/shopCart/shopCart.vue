


<template>
    <div class="cards">
        <div class="header">
            <mt-header title="采购单">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
                <mt-button icon="" slot="right" @click="editor" v-if="isShow==false"><span class="headBtn">编辑</span></mt-button>
                <mt-button icon="" slot="right" @click="finish" v-else><span class="headBtn">完成</span></mt-button>
            </mt-header>
        </div>
        <div class="my-content">
            <div class="classify-item">
                <router-link :to="{path:'/couponsCenter'}" class="link-counps">领取优惠券</router-link>
                <!-- <span v-if="minOrderNum > totalPrice" class="tipPrice"><span class="price">{{minOrderNum}}</span>元起配送,您还差<span class="price">{{chajia | toFixed2}}</span>元<span class="goClassify mui-pull-right" @click="goClassify" style="padding-right:15px">去湊单</span></span> -->
                <!-- <span v-else class="tipPrice"><span class="price">{{minOrderNum}}</span>元起送,已达到配送标准</span> -->
                <!-- <span class="tipPrice">*货品为非抄码货品，只能输入整数*</span> -->
                <router-link :to="{path:'/classify'}" class="goClassify">再逛逛</router-link>
            </div>
            <ul class="goods-list">
                <li v-for="(car,index) in carts" :key="index">
                    <div class="mui-input-row car-info mui-checkbox mui-left">
                         <input name="checkbox" :checked="car.checked" type="checkbox"  class="checked" @click=changeCheckOne(index) />
                        <mt-cell-swipe :right="[
                                {
                                content: '删除',
                                style: { background: '#ff7900', color: '#fff' },
                                handler(){delHandle(index)}
                                }  
                            ]">
                            <a href="javascript:;" style="width:100%">
                                <div class="food-link" >
                                    <img v-lazy="baseurl+car.img_path" :key="car.img_path" style="float: left;width: 50px;height: 50px; margin:0">
                                    <span class="is_enable" v-show="car.is_enable == 'N'">已下架</span>
                                    <router-link  class="recommend" :to='{path:"/detail",query:{id:car.id}}'  tag="div">
                                        <h4 class="skuName" >{{car.sku_name}}</h4>
                                        <p class="styleno">规格：{{car.styleno}}</p>
                                        <p class="styleno">库存量：{{car.qty}}{{car.uom_default}} <span v-if="car.sku_flag" style="color:red;font-size:10px;" >  (库存不足，等待调拨)</span></p>
                                        <!-- <span v-show="car.sku_flag" class="kuc">库存不足</span> -->
                                        <span class="tag" v-if="car.full_gift && car.full_gift.requireType != 2">满赠</span>
                                        <span class="tag" v-else-if="car.full_gift && car.full_gift.requireType == 2">满减</span>
                                        <span style="display:block;height:12px" v-show="shopType==4" v-else></span>
                                        <span style="color:#e75b5a;fontSize:12px;" v-show="shopType!=4">会员价：</span>
                                        <div class="price">
                                            <span>  
                                                <span style="color:#e75b5a;fontSize:14px;">￥{{car.unit_price}}/{{car.unit}}</span>
                                                <span class="retail_price">(￥{{car.price || '--'}}/{{car.uom_default}})</span>
                                            </span>
                                            <!-- <span v-else>  
                                                <span style="color:#e75b5a;fontSize:14px;">￥{{car.price}}/{{car.uom_default}}</span>
                                            </span> -->
                                        </div>
                                    </router-link>
                                    <div class="cartcontrol-wrapper">
                                        <!-- 抄码 -->
                                        <div class="countcontrol" v-if="car.sku_type == 1" >
                                            <input v-if="car.equation_factor != 1" class="unit-count" type="number" step="1" min="0" v-model="car.value" @blur="changeValue(car,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" /><span class="unit" v-if="car.equation_factor != 1">{{car.unit}}</span>
                                            <input v-if="car.equation_factor == 1" class="unit-count" type="number" step="1" min="0" v-model="car.value" @blur="changeValue(car,1,$event)" onkeyup="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" onpaste="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" oncontextmenu="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" /><span class="unit" v-if="car.equation_factor == 1">{{car.unit}}</span>
                                            <input v-if="car.equation_factor != 1" class="uom-count" type="number" step="1" min="0" v-model="car.mnum_value" @blur="changeMnumValue(car,1,$event)" onkeyup="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" onpaste="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" oncontextmenu="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" /><span class="unit" v-if="car.equation_factor != 1">{{car.uom_default}}</span>
                                        </div>
                                        <!-- 计件 -->
                                        <div class="countcontrol" v-else >
                                            <input class="unit-count" type="number" step="1" min="0" v-model="car.value" @blur="changeValue(car,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" /><span class="unit">{{car.unit}}</span>
                                            <input class="uom-count" type="number" step="1" min="0" v-if="car.equation_factor != 1" v-model="car.mnum_value" @blur="changeMnumValue(car,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" /><span class="uom_default" v-if="car.equation_factor != 1">{{car.uom_default}}</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- requireType 0:满多少数量赠送 1:满多少金额赠送 -->
                                <!-- unitType  0 主单位 1辅单位 -->
                                <div v-if="car.full_gift && car.full_gift.requireType == 0">
                                    <div v-if="car.full_gift.unitType == 0">
                                        <div v-show="handleShow(car.full_gift.require, car.value, car.equation_factor, car.mnum_value)">
                                            <div class="gift-link clearfix" v-for="(gift, index) in car.full_gift.productList" :key="index">
                                                <img v-lazy="baseurl+ gift.imagPath" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
                                                <span class="is_gift">赠</span>
                                                <div class="gift-info">
                                                    <h4 class="skuName">{{gift.skuName}}</h4>
                                                    <p class="styleno">规格：{{gift.styleno}}</p>
                                                    <span class="gift-num">x {{gift.requirement | FormatGift(car)}}
                                                        <!-- unitType  0 主单位 1辅单位 -->
                                                        <em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
                                                        <em v-else>{{gift.unit}}</em>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else>
                                        <div v-show="parseFloat(car.full_gift.require) <= parseFloat(car.value)">
                                            <div class="gift-link clearfix" v-for="(gift, index) in car.full_gift.productList" :key="index">
                                                <img v-lazy="baseurl+ gift.imagPath" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
                                                <span class="is_gift">赠</span>
                                                <div class="gift-info">
                                                    <h4 class="skuName">{{gift.skuName}}</h4>
                                                    <p class="styleno">规格：{{gift.styleno}}</p>
                                                    <span class="gift-num">x {{gift.requirement | FormatGift(car)}}
                                                        <!-- unitType  0 主单位 1辅单位 -->
                                                        <em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
                                                        <em v-else>{{gift.unit}}</em>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="car.full_gift && car.full_gift.requireType == 1">
                                    <div v-show="parseFloat(car.full_gift.require) <= parseFloat(car.totalPrice)">
                                        <div class="gift-link clearfix" v-for="(gift, index) in car.full_gift.productList" :key="index">
                                            <img v-lazy="baseurl + gift.imagPath" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
                                            <span class="is_gift">赠</span>
                                            <div class="gift-info">
                                                <h4 class="skuName">{{gift.skuName}}</h4>
                                                <p class="styleno">规格：{{gift.styleno}}</p>
                                                <span class="gift-num">x {{gift.requirement | FormatGift(car)}}
                                                    <!-- unitType  0 主单位 1辅单位 -->
                                                    <em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
                                                    <em v-else>{{gift.unit}}</em>
                                                </span>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                                <div v-else-if="car.full_gift && car.full_gift.requireType == 2">
                                    <div v-show="parseFloat(car.full_gift.require) <= parseFloat(car.totalPrice)">
                                        <div class="gift-link clearfix" style="padding:4px 0 0 0">
                                            <span class="mui-pull-left span_tip">满{{car.full_gift.require}}元减{{car.full_gift.rductionAmount}}元</span>
                                            <span class="mui-pull-right span_tip">可减：￥{{car.full_gift.rductionAmount | FormatAmount(car.full_gift.require,car.totalPrice)}}</span>
                                        </div>
                                    </div>  
                                </div>
                            </a>
                        </mt-cell-swipe>
                    </div>
                </li>
            </ul>
            <ul class="goods-list mt-10" v-if="outcarts && outcarts.length > 0">
                <div class="outProduct">
                    <h4 class="out-title">已下架产品</h4>
                    <button type="button" class="clearOut" @click="clearOut">清空下架产品</button>
                </div>
                <li v-for="(car,index) in outcarts" :key="index">
                    <div class="mui-input-row car-info mui-checkbox mui-left">
                        <input name="checkbox" type="checkbox" :checked="car.checked" class="checked" disabled />
                        <mt-cell-swipe :right="[
                        {
                          content: '删除',
                          style: { background: '#ff7900', color: '#fff' },
                          handler(){delHandle(index)}
                        }  
                      ]">
                            <router-link :to='{path:"/detail",query:{id:car.id}}' style="width:100%">
                                <div class="food-link">
                                    <img v-lazy="baseurl+car.img_path" :key="car.img_path">
                                    <span class="is_enable" v-show="car.is_enable == 'N'">已下架</span>
                                    <div class="recommend" style="margin-left: 0px;">
                                        <h4 class="skuName">{{car.sku_name}}</h4>
                                        <p class="styleno">规格：{{car.styleno}}</p>
                                        <!-- <p class="styleno">库存量：{{car.qty}}{{car.uom_default}}</p> -->
                                        <!-- <p v-show="car.sku_flag" style="color:red" class="styleno">库存不足</p> -->
                                        <span class="price">￥{{car.unit_price}}/{{car.unit}}<span class="retail_price" v-if="car.retail_flag =='Y'">(￥{{car.price || '--'}}/{{car.uom_default}})</span></span>
                                    </div>
                                </div>
                            </router-link>
                            <div class="cartcontrol-wrapper">
                                <!-- 抄码 -->
                                <div class="countcontrol" v-if="car.sku_type == 1">
                                    <input v-if="car.equation_factor != 1" class="unit-count" type="number" step="1" min="0" v-model="car.value" @blur="changeValue(car,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" /><span class="unit" v-if="car.equation_factor != 1">{{car.unit}}</span>
                                    <input v-if="car.equation_factor == 1" class="unit-count" type="number" step="1" min="0" v-model="car.value" @blur="changeValue(car,1,$event)" onkeyup="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" onpaste="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" oncontextmenu="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" /><span class="unit" v-if="car.equation_factor == 1">{{car.unit}}</span>
                                    <input v-if="car.equation_factor != 1" class="uom-count" type="number" step="1" min="0" v-model="car.mnum_value" @blur="changeMnumValue(car,1,$event)" onkeyup="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" onpaste="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" oncontextmenu="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" /><span class="unit" v-if="car.equation_factor != 1">{{car.uom_default}}</span>
                                </div>
                                <!-- 计件 -->
                                <div class="countcontrol" v-else>
                                    <input class="unit-count" type="number" step="1" min="0" v-model="car.value" @blur="changeValue(car,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" /><span class="unit">{{car.unit}}</span>
                                    <input class="uom-count" type="number" step="1" min="0" v-if="car.equation_factor != 1" v-model="car.mnum_value" @blur="changeMnumValue(car,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" /><span class="uom_default" v-if="car.equation_factor != 1">{{car.uom_default}}</span>
                                </div>
                            </div>
                        </mt-cell-swipe>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 没数据的时候 -->
        <div class="gwc" v-if="!carts.length">
            <div class="gwc_imgs">
                <img src="../../../static/images/no-order.png" class="no-img">
                <div class="go" @click="go">去逛逛</div>
            </div>
        </div>
        <!--工具栏start-->
        <div class="shop-toolbar mui-input-row mui-checkbox mui-left">
            <label>全选
                <span class="total" v-show="isShow==false"><em>合计：</em>
                    <span class="tip-text">￥{{totalPrice | toFixed2}}</span>
                    <!-- <span class="tip-text" v-else>￥{{ subTotalPrice | toFixed2}}</span> -->
                </span>
            </label>
            <input name="checkbox" type="checkbox" :checked="checkAll" @click=changeCheckAll />
            <button class="mui-btn" type="button" @click.stop="submitOrder" v-show="isShow==false && checkedCount!=0">下单</button>
            <button class="mui-btn" type="button" v-show="isShow==false && checkedCount==0" disabled>下单</button>
            <button class="mui-btn collect-btn" type="button" @click.stop="collect" v-show="isShow==true" style="border-right:2px solid #fff">加入收藏</button>
            <button class="mui-btn clear-btn" type="button" @click.stop="clear" v-show="isShow==true">删除</button>
        </div>
        <!-- 底部组件 -->
        <Tabbar :selected="selected"></Tabbar>
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import cartcontrol from "@/components/cartcontrol";
import { Toast, MessageBox } from "mint-ui";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    isNull,
    toFloat2
} from "../../utils/index.js";
// 引入vuex快捷写法
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
    name: "shopCart",
    components: {
        Tabbar,
        cartcontrol
    },
    data() {
        return {
            carts:[],
            selected: "/shopCart",
            checkedLen: "",
            isShow: false,
            couponSend: "",
            minOrderNum: 0,
            outcarts: [],
            accountObj: this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "",
            shopType:this.$store.getters["shop"].shopType
                ? this.$store.getters["shop"].shopType
                : 4,
            checkAll:false,
            totalPrice:'',
            checkedCount:0,
            delShop:''
        };
    },
    filters: {
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
        //全选按钮
        shopCount() {
            return this.$store.getters["shopCount"];
        },
        // subTotalPrice(){
        //     return m_sub(this.totalPrice, this.subPrice || 0)
        // },
        // subPrice(){
        //      //如果计算属性写成函数，默认调用get方法
        //     var _this = this;
        //     var sum = 0;
        //     _this.carts.map((cart) => {
        //         if(cart.checked && cart.full_gift && cart.full_gift.requireType == 2){
        //             var _shang = parseInt(m_div(parseFloat(cart.totalPrice), parseFloat(cart.full_gift.require)));
        //             cart.total = m_mul(parseFloat(cart.full_gift.rductionAmount), parseFloat(_shang));
        //         }else{
        //             cart.total = 0;
        //         }
        //         sum += parseFloat(cart.total)
        //     })
        //     return sum;
        // },
        
    },
    created() {
        this.changecompanyId()
    },
    methods: {
        changecompanyId(){
            var deviceOS = "Android";
            if (
                navigator.userAgent.indexOf("Android") > -1 ||
                navigator.userAgent.indexOf("Linux") > -1
            ) {
                //安卓手机
                deviceOS = "android";
            } else {
                deviceOS = "iPhone";
            }
            this.$post("/appAccount/toAccountFot.do", {
                content: "{'account':'"+this.$store.getters["account"].account +"'}",
                version: "kkllo",
                deviceOS: deviceOS,
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    var companyObj = response.res.company;
                    var accountObj = response.res.account;
                    if(this.$store.getters["account"]&&this.$store.getters["account"].companyId!=accountObj.companyId){
                        this.$store.commit("setData", response.res);
                        this.$store.commit("setpcid", parseFloat(companyObj.id));
                        Toast("后台已帮你更换门店");
                        setTimeout(function (){
                           window.location.href =window.location.href
                        }, 2000);
                        
                    }else{
                        this.shoppingCart();
                        this.initMinOrderNum();
                    }
                } else {
                    Toast("加载失败");
                }
            });
        },
        changetotalPrice() {
            //  return this.$store.getters["totalPrice"];
            //如果计算属性写成函数，默认调用get方法
            var _this = this;
            return _this.carts.reduce(function(prev, next, index) {
                if (!next.checked) return prev;
                if (!_this.carts[index].rkpriceList) {
                    return m_add(
                        m_add(
                            prev,
                            m_mul(
                                parseFloat(next.unit_price) || 0,
                                parseFloat(next.value)
                            )
                        ),
                        m_mul(
                            parseFloat(next.price || 0),
                            parseFloat(next.mnum_value) || 0
                        )
                    );
                } else if (_this.carts[index].rkpriceList) {
                    return m_add(
                        m_add(
                            prev,
                            m_mul(
                                parseFloat(next.rank_price) || 0,
                                parseFloat(next.value)
                            )
                        ),
                        m_mul(
                            parseFloat(next.price || 0),
                            parseFloat(next.mnum_value) || 0
                        )
                    );
                }
            }, 0);
        },
        changeCheckOne(index){
            this.carts[index].checked=!this.carts[index].checked
            this.totalPrice=this.changetotalPrice()
            this.checkedCount=this.carts&&this.carts.filter(function(item) {
                return item.checked;
            }).length
            if(this.checkedCount!=0&&this.checkedCount==this.carts.length){
                this.checkAll=true
            }else{
                this.checkAll=false
            }
        },
        changeCheckAll(){
            this.checkAll=!this.checkAll;
            this.carts=this.carts&& this.carts.map((item) =>{
                    item.checked = this.checkAll
                    return item
                });
            this.totalPrice=this.changetotalPrice()
            this.checkedCount=this.carts&&this.carts.filter(function(item) {
                return item.checked;
            }).length
        },
        handleShow(require,value=0,equation_factor,mnum_value){
           var _total = m_add(m_mul(parseFloat(value || 0), equation_factor), parseFloat(mnum_value) || 0);
           if(require <= _total){
               return true;
           }else{
               return false;
           }
        },
        delHandle(index) {
            MessageBox.confirm("确定删除该产品?")
                .then(action => {
                    this.$store.commit("shanchu", index);
                    this.carts =
                        this.$store.state.carts ||
                        JSON.parse(localStorage.getItem("carts"));
                    this.totalPrice=this.changetotalPrice()
                    this.checkedCount=this.carts&&this.carts.filter(function(item) {
                        return item.checked;
                    }).length
                    if(this.checkedCount!=0&&this.checkedCount==this.carts.length){
                        this.checkAll=true
                    }else{
                        this.checkAll=false
                    }
                })
                .catch(() => {
                    // Toast('操作取消');
                });
        },
        //返回
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        },
        // 去逛逛
        go() {
            this.$router.push({ path: "/classify" });
        },
        // 编辑
        editor() {
            this.isShow = true;
        },
        // 完成
        finish() {
            this.isShow = false;
        },
        // 清除
        clear() {
            if (this.checkedCount == 0) {
                Toast("请先选购商品");
                return;
            }
            MessageBox.confirm("确定删除勾选产品?")
                .then(action => {
                    var orders = this.carts.filter(function(item) {
                        return item.checked == false;
                    });
                    this.$store.commit("setcarts", orders);
                    this.carts = orders;
                    this.totalPrice=this.changetotalPrice()
                    this.checkedCount=this.carts&&this.carts.filter(function(item) {
                        return item.checked;
                    }).length
                    if(this.checkedCount!=0&&this.checkedCount==this.carts.length){
                        this.checkAll=true
                    }else{
                        this.checkAll=false
                    }
                })
                .catch(() => {
                    // Toast('操作取消');
                });
        },
        clearOut() {
            MessageBox.confirm("确定删除该产品?")
                .then(action => {
                    this.outcarts = [];
                    let carts =
                        this.$store.state.carts ||
                        JSON.parse(localStorage.getItem("carts"));
                    this.carts = carts.filter(item => {
                        return item.is_enable != "N";
                    });
                    this.$store.commit("setcarts", this.carts);
                    this.totalPrice=this.changetotalPrice()
                    this.checkedCount=this.carts&&this.carts.filter(function(item) {
                        return item.checked;
                    }).length
                    if(this.checkedCount!=0&&this.checkedCount==this.carts.length){
                        this.checkAll=true
                    }else{
                        this.checkAll=false
                    }
                })
                .catch(() => {
                    // Toast('操作取消');
                });
        },
        collect() {
            //添加收藏
            var ids = [],
                account = "";
            var selected = this.carts.filter(item => {
                return item.checked != false;
            });
            selected.forEach(item => {
                ids.push(item.id);
            });

            this.accountObj
                ? (account = this.accountObj.account)
                : (account = "");
            if (this.accountObj) {
                let _content =
                    "{'id':'" +
                    ids.join(",") +
                    "','account':'" +
                    account +
                    "'}";
                this.$post("/appVpProduct/vpAddFavory.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(res => {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        Toast("商品已加入收藏");
                    } else {
                        Toast("收藏失败");
                    }
                });
            } else {
                this.$router.push({ path: "/login" }); //前往登录页
            }
        },
        goClassify() {
            this.$router.push({
                path: "/classify"
            });
        },
        getTClasses() {
            var cls = [],
                newCls = [];
            this.orders.forEach(item => {
                cls.push(item.class_id);
            });
            //遍历数组
            for (var i = 0; i < cls.length; i++) {
                if (newCls.indexOf(cls[i]) == -1) {
                    //判断在newCls数组中是否存在，不存在则push到newCls数组中
                    newCls.push(cls[i]);
                }
            }
            return newCls;
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
                } else {
                    this.minOrderNum = 0;
                }
            });
        },
        shoppingCart() {
            let ids = [],
                companyId = "";
            this.carts = this.$store.state.carts 
            if(this.carts.length<1){
                return
            }
            this.carts.forEach((item, index) => {
                ids.push(item.id);
            });
            companyId = this.$store.getters["account"].companyId;
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
            this.$post("/appVpProduct/shoppingCart.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    let onLinecarts = response.res;
                    if (onLinecarts.length > 0) {
                        this.carts.map((cart,i)=>{
                            let shopIndex = onLinecarts.findIndex(todo => {
                                return todo.id == cart.id;
                            });
                            if (shopIndex == -1 || shopIndex == null || shopIndex == undefined) {
                            //    Toast({
                            //         message: cart.skuName+"商品暂销售",
                            //         duration: 950
                            //     });
                                this.delShop=this.delShop?(this.delShop+","+cart.sku_name):cart.sku_name;
                                clearTimeout(time)
                                var time=setTimeout(()=>{
                                        this.delShop?Toast({message: this.delShop+"商品暂销售",duration: 2000}):''
                                    },100)
                                this.$store.commit("shanchu", i);
                            }else{
                                let item=onLinecarts[shopIndex]
                                this.carts[i].qty = item.qty?item.qty:0;
                                this.carts[i].unit_price = item.unit_price
                                    ? item.unit_price
                                    : 0;
                                this.carts[i].price = item.price
                                    ? item.price
                                    : 0;
                                this.carts[i].totalPrice = toFloat2(m_add(m_mul(this.carts[i].value||0, item.unit_price||0), m_mul(this.carts[i].mnum_value || 0, item.price||0)));
                                this.carts[i].full_gift = item.full_gift ? JSON.parse(item.full_gift) : '';
                                this.carts[i].qty_flag = item.qty_flag;
                                this.carts[i].class_id=item.class_id;
                                if(item.classTwoSort){
                                    this.carts[i].classTwoSort=item.classTwoSort;
                                }
                                if(item.class_two_id){
                                    this.carts[i].class_two_id=item.class_two_id;
                                }
                                if(item.class_two_name){
                                    this.carts[i].class_two_name=item.class_two_name;
                                }
                                if(item.dealer_price){
                                    this.carts[i].dealer_price=item.dealer_price;
                                }
                                if(item.dealer_unitprice){
                                    this.carts[i].dealer_unitprice=item.dealer_unitprice;
                                }
                                if(item.is_discount){
                                    this.carts[i].is_discount=item.is_discount;
                                }
                                if(item.is_gift){
                                    this.carts[i].is_gift=item.is_gift;
                                }
                                if(item.is_hot){
                                    this.carts[i].is_hot=item.is_hot;
                                }
                                if(item.main_enable){
                                    this.carts[i].main_enable=item.main_enable;
                                }
                                if(item.market_unitprice){
                                    this.carts[i].market_unitprice=item.market_unitprice;
                                }
                                if(item.owner){
                                    this.carts[i].owner=item.owner;
                                }
                                if(item.pinyin_text){
                                    this.carts[i].pinyin_text=item.pinyin_text;
                                }
                                if(item.retail_price){
                                    this.carts[i].retail_price=item.retail_price;
                                }
                                if(item.retail_unitprice){
                                    this.carts[i].retail_unitprice=item.retail_unitprice;
                                }
                                if(item.sku_type){
                                    this.carts[i].sku_type=item.sku_type;
                                }
                                if(item.supplier_code){
                                    this.carts[i].supplier_code=item.supplier_code;
                                }
                                if(item.unit_cost){
                                    this.carts[i].unit_cost=item.unit_cost;
                                }
                                this.carts[i].sku_type = item.sku_type;
                                this.carts[i].sku_name = item.sku_name;
                                this.carts[i].img_path = item.img_path;;
                                this.carts[i].styleno = item.styleno;
                                this.carts[i].sku_code = item.sku_code;
                                this.carts[i].retail_flag = item.retail_flag;
                                this.carts[i].wm_code = item.wm_code;
                                this.carts[i].is_enable = item.is_enable;
                                this.carts[i].equation_factor =
                                    item.equation_factor;
                                this.carts[i].uom_default = item.uom_default;
                                this.carts[i].unit = item.unit;
                                let countNum = m_mul(
                                    this.carts[i].value * 1 || 0,
                                    this.carts[i].equation_factor * 1 || 0
                                );
                                let countMnum = m_add(
                                    countNum,
                                    this.carts[i].mnum_value * 1 || 0
                                );
                                if (countMnum > this.carts[i].qty) {
                                    this.carts[i].sku_flag = true;
                                } else {
                                    this.carts[i].sku_flag = false;
                                }
                            }

                        })
                        this.carts = this.carts.filter(item => {
                            return item.unit_price!=0;
                        });
                        this.$store.commit("setcarts", this.carts);
                        this.totalPrice=this.changetotalPrice()
                        this.outcarts = this.carts.filter(item => {
                            return (item.is_enable == "N" || item.is_enable == "");
                        });
                        this.carts = this.carts.filter(item => {
                            return item.is_enable == "Y";
                        });
                        
                        this.checkAll=this.carts.every(function(item) {
                            return item.checked;
                        });
                        this.checkedCount=this.carts&&this.carts.filter(function(item) {
                            return item.checked;
                        }).length
                        //储存最新的采购单数据
                    } else {
                        this.carts.map((item,index)=>{
                            this.delShop=this.delShop?(this.delShop+","+item.sku_name):item.sku_name;
                                clearTimeout(time)
                                var time=setTimeout(()=>{
                                        this.delShop?Toast({message: this.delShop+"商品暂销售",duration: 2000}):''
                                    },100)
                        })
                        this.carts = [];
                        this.$store.commit("setcarts", this.carts);
                    }
                } else {
                    // Toast({
                    //     message: "采购单加载失败",
                    //     duration: 950
                    // });
                }
            });
        },
        addCart(food, index) {
            this.$store.commit("add", index);
            food.value = this.$store.state.carts[index].value;
            food.rank_price = this.$store.state.carts[index].rank_price;
        },
        changeValue(food, type, e) {
            var value = e.target.value || 0;
            //抄码
            if (type == 1) {
                food.value = parseFloat(value.toString().match(/\d+(\.\d{0,2})?/)
                    ? value.toString().match(/\d+(\.\d{0,2})?/)[0]
                    : "")||0
            }else{
                //计件
                if (food.value.toString().indexOf(".") != -1) {
                    Toast("该商品只能输入整数");
                }
                food.value=parseInt(value.toString().replace(/[^\d]+/g,0))||0;
            }
            if (food.equation_factor != "1") {
                if (isNull(food.value) && isNull(food.mnum_value)) {
                    Toast("采购数量不能为空");
                    food.value = 0;
                    food.mnum_value = 1;
                } 
            }else{
                if (isNull(food.value) && isNull(food.mnum_value)) {
                    Toast("采购数量不能为空");
                    food.value = 1;
                    food.mnum_value = 0;
                } 
            }
            var allqty=m_add(m_mul(food.value||0, food.equation_factor||1),food.mnum_value || 0)
            if (allqty>food.qty) {
                // Toast("库存不足，等待调拨");
                food.sku_flag = true;
            } else {
                food.sku_flag = false;
            }
            food.totalPrice = toFloat2(m_add(
                m_mul(food.value||0, food.unit_price||0),
                m_mul(food.mnum_value || 0, food.price||0)));
            this.$store.commit("setcarts", this.carts);
            this.totalPrice=this.changetotalPrice()
        },
        changeMnumValue(food,type, e) {
            var mnum_value = e.target.value||0;
            if (type == 0) {
                //计件
                if (food.mnum_value.toString().indexOf(".") != -1) {
                    Toast("该商品只能输入整数");
                }
                food.mnum_value = parseInt(mnum_value.toString().replace(/[^\d]+/g, ""))||0;
               
            }else{
                //抄码
                food.mnum_value = parseFloat(mnum_value.toString().match(/\d+(\.\d{0,2})?/)
                    ? mnum_value.toString().match(/\d+(\.\d{0,2})?/)[0]
                    : "")||0
            }
             if (isNull(food.value) && isNull(food.mnum_value)){
                Toast("采购数量不能为空");
                food.mnum_value = 1;
            } else {
                let rem = m_rem(
                    parseFloat(food.mnum_value) || 0,
                    parseFloat(food.equation_factor)
                );
                let _div = parseInt(
                    m_div(food.mnum_value || 0, food.equation_factor)
                );
                if (_div >= 1) {
                    food.mnum_value = type==1?rem:parseInt(rem);
                    food.value = parseInt(food.value) + _div;
                }
                food.totalPrice = toFloat2(m_add(
                m_mul(food.value||0, food.unit_price||0),
                m_mul(food.mnum_value || 0, food.price||0)));      
                this.$store.commit("setcarts", this.carts);
            }
            var allqty=m_add(m_mul(food.value||0, food.equation_factor||1),food.mnum_value || 0)
            if (allqty>food.qty) {
                // Toast("库存不足，等待调拨");
                food.sku_flag = true;
            } else {
                food.sku_flag = false;
            }
            food.totalPrice = toFloat2(m_add(
                m_mul(food.value||0, food.unit_price||0),
                m_mul(food.mnum_value || 0, food.price||0)));      
            this.$store.commit("setcarts", this.carts);
            this.totalPrice=this.changetotalPrice()
        },
        decreaseCart(food, index) {
            if (this.$store.state.carts[index].value == 1) {
                // this.$store.commit("reduce", index);
                // this.carts.splice(index, 1);
                Toast({
                    message: "受不了啦,宝贝不能再减少啦",
                    duration: 1000
                });
                return false;
            } else {
                this.$store.commit("reduce", index);
                food.value = this.$store.state.carts[index].value;
                food.rank_price = this.$store.state.carts[index].rank_price;
            }
        },
        submitOrder() {
            let flag = true;
            this.carts.map((item, index) => {
                if (
                    item.checked &&
                    item.value * item.equation_factor * 1 +
                        item.mnum_value * 1 >
                        item.qty
                ) {
                    flag = false;
                }
            });
            this.checkedLen = this.carts.filter(function(item) {
                return item.checked;
            }).length;
            if (this.checkedLen == 0) {
                Toast({
                    message: "您还未勾选商品",
                    duration: 1000
                });
                return false;
            } else {
                if (flag) {
                    var orders = this.carts.filter(function(item) {
                        return item.checked != false;
                    });
                    this.$store.commit("setcarts", this.carts);
                    this.$store.commit("orders", orders);
                    this.$router.push({ path: "/confirmOrder" });
                } else {
                    var orders = this.carts.filter(function(item) {
                        return item.checked != false;
                    });
                    this.$store.commit("setcarts", this.carts);
                    this.$store.commit("orders", orders);
                    this.$router.push({ path: "/confirmOrder" });
                }
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.gwc {
    text-align: center;
    .go {
        width: 120px;
        height: 36px;
        line-height: 36px;
        background-color: @base;
        color: #fff;
        border-radius: 5px;
        margin: 20px auto;
    }
}

.no-img {
    width: 120px;
    height: 150px;
}

.my-content {
    padding-bottom: 98px;
    .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .outProduct {
        position: relative;
        width: 100%;
        height: 34px;
        line-height: 34px;
        background-color: #eee;
        border-top: 1px solid #dddddd;
        h4 {
            text-align: center;
            line-height: 34px;
        }
        button.clearOut {
            position: absolute;
            top: 4px;
            right: 10px;
            padding: 0 4px;
            background-color: #ff671d;
            height: 25px;
            color: #fff;
        }
    }
}
</style>