<template>
    <div>
        <div v-show="isShow">
            <!--头部start-->
            <Header title="退货"></Header>
             <div class="top-bar clearfix">
                <div class="top-bar-box">
                    <div class="top_search  mui-pull-left">
                        <span class="search-icon iconfont">&#xe7b7;</span>
                        <input type="search" class="mui-pull-left" placeholder="请输入商品名称/商品id/关键字" v-model="searchKey" id="search_input">
                        <button class="search_btn" @click="search(searchKey)"></button>
                    </div>
                </div>
            </div>
            <div class="form-wrapper">           
                <div class="not-title">请选择需要退货的商品</div>
                <ul class="mui-table-view order-ul bg-write" v-show="searchKey == ''">
                    <li class="mui-table-view-cell mui-media mui-checkbox mui-left" v-for="(item,index) in orderList" :key="index">
                        <a class="clearfix" href="javascript:;">
                            <input name="checkbox" type="checkbox" v-model="item.checked" class="checked" v-if="item.realSendQty==item.alreadyReturnQty" disabled="disabled"/>
                            <input name="checkbox" type="checkbox" v-model="item.checked" class="checked" v-else/>
                            <div class="list-img">
                                <img class="mui-media-object mui-pull-left" v-lazy="baseurl+item.imgPath" />
                            </div>
                            <div class="mui-media-body detail-info">
                                <h4 class="list-name">{{item.skuName}}<span class="price">￥{{item.unit_price}}/{{item.unit}}</span></h4>
                                <h5 class="mui-ellipsis list-size">规格：{{item.styleno}}</h5>
                                <h5 class="mui-ellipsis list-size"> 商品编码: {{item.skuCode}}</h5>
                                <div>
                                    <h5 class="mui-ellipsis def-text">请货量：{{item.qty |
                                        capitalize(item.equation_factor,item.unit,item.uom_default)}}
                                    </h5>
                                    <p class="mui-ellipsis list-deliver">
                                        <span>实发：{{item.wms_outqyt | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                        <!-- <span>实收：{{item.recived_qty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span> -->
                                        <span v-if="item.alreadyReturnQty">已退：{{item.alreadyReturnQty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="mui-table-view order-ul bg-write">
                    <li class="mui-table-view-cell mui-media mui-checkbox mui-left" v-for="(item,index) in searchData" :key="index">
                        <a class="clearfix" href="javascript:;">
                            <input name="checkbox" type="checkbox" v-model="item.checked" class="checked" v-if="item.realSendQty==item.alreadyReturnQty" disabled="disabled"/>
                            <input name="checkbox" type="checkbox" v-model="item.checked" class="checked" v-else/>
                            <div class="list-img">
                                <img class="mui-media-object mui-pull-left" v-lazy="baseurl+item.imgPath" />
                            </div>
                            <div class="mui-media-body detail-info">
                                <h4 class="list-name">{{item.skuName}}<span class="price">￥{{item.unit_price}}/{{item.unit}}</span></h4>
                                <h5 class="mui-ellipsis list-size">规格：{{item.styleno}}</h5>
                                <h5 class="mui-ellipsis list-size"> 商品编码: {{item.skuCode}}</h5>
                                <div>
                                    <h5 class="mui-ellipsis def-text">请货量：{{item.qty |
                                        capitalize(item.equation_factor,item.unit,item.uom_default)}}
                                    </h5>
                                    <p class="mui-ellipsis list-deliver">
                                        <span>实发：{{item.wms_outqyt | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                        <span v-if="item.alreadyReturnQty">已退：{{item.alreadyReturnQty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="bottom-btn">
                <button type="button" @click.stop="submit" class="def-btn">确定</button>
            </div>
        </div>

        <div class="return-detail" v-show="!isShow">
            <div class="header">
                <mt-header title="退货">
                    <mt-button icon="back" slot="left" @click="isShow = true"></mt-button>
                </mt-header>
            </div>
            <div class="my-content order-detail">
                <!--确认订单列表-->
                <ul class="cart-ul">
                    <li class="cart-li" v-for="(item,index) in outOrderList" :key="index">
                        <div class="cart-info">
                            <img class="cart-img" v-lazy="baseurl+item.imgPath">
                            <div class="cart-dec">
                                <h4 class="skuName">{{item.skuName}}</h4>
                                <p class="styleno">规格：{{item.styleno}}</p>
                                <p class="styleno">货品编码：{{item.skuCode}}</p>

                                <p class="styleno">请货量：{{item.qty |
                                    capitalize(item.equation_factor,item.unit,item.uom_default)}}
                                </p>
                                <p class="styleno">
                                    <span>实发：{{item.wms_outqyt | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                    <span>已退：{{item.alreadyReturnQty | capitalize(item.equation_factor,item.unit,item.uom_default)}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="handle-info">
                            <div class="cartcontrol-wrapper">
                                <div class="countcontrol">
                                    退货数量:
                                    <input class="unit-count" type="number" v-model="item.value" @blur="changeValue(item,index,$event)" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')" /><span class="unit">{{item.unit}}</span>
                                    <input v-show="item.retail_flag=='Y'" class="uom-count" type="number" v-model="item.mnum_value" @blur="changeMnumValue(item,index,$event)" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')" /><span class="uom_default" v-show="item.retail_flag=='Y'">{{item.uom_default}}</span>
                                </div>
                            </div>
                            <div class="total-wrapper">
                                <div>
                                    <span ref="totalPrice">应退金额:￥{{item.must_amount}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="textvalue">
                    <span class="cellm">异常描述</span>
                    <textarea placeholder="请输入描述信息" v-model="note"></textarea>
                </div>
            </div>
            <div class="bottom-btn">
                <button type="button" @click.stop="submitOrder" v-show="isShow==false" class="def-btn">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../../utils/index.js";
import { MessageBox ,Toast } from "mint-ui";
export default {
    name: "returngood",
    components: {
        Header
    },
    data() {
        return {
            goods: "",
            searchKey: "",
            isShow: true,
            orderList: [],
            note: ""
        };
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
        }
    },
    computed: {
        checkedLen() {
            return this.orderList.filter(item => {
                return item.checked;
            }).length;
        },
        outOrderList : {
            get(){
                return this.orderList.filter(item => {
                    return item.checked == true;
                });
            },
            set(){

            }
        },
        searchData(){
            var search = this.searchKey;
            if (search) {
                return this.orderList.filter(function(product) {
                    return Object.keys(product).some(function(key) {
                        return String(product[key]).toLowerCase().indexOf(search) > -1
                    })
                })
            }

            return this.products;
        }
    },
    created() {
        this.orderDetailForSale();
    },
    watch: {
        ProductClass: function(val, oldVal) {
            if (this.ProductClass.length > 0 && this.currentIndex == 0) {
                this.classId = this.ProductClass[0].id;
            }
        }
    },
    methods: {
        changeValue(item, index, e) {
            let _qty = m_add(
                m_mul(parseFloat(item.value), item.equation_factor),
                parseFloat(item.mnum_value) || 0
            );
            if (_qty > item.qty) {
                Toast("退货数量不能大于请货量");
                item.value =  e.target.value;
                item.mnum_value = 0;
            }
            item.must_amount = m_add(
                m_mul(parseFloat(item.value) || 0, item.unit_price),
                m_mul(parseFloat(item.mnum_value) || 0, item.price)
            );
        },
        changeMnumValue(item, index, e) {
            let _qty = m_add(
                m_mul(parseFloat(item.value), item.equation_factor),
                parseFloat(item.mnum_value) || 0
            );
            if (_qty > item.qty) {
                Toast("退货数量不能大于请货量");
                e.target.value = 0;
                item.value = 0;
                item.mnum_value = e.target.value;
            }
            item.must_amount = m_add(
                m_mul(parseFloat(item.value) || 0, item.unit_price),
                m_mul(parseFloat(item.mnum_value) || 0, item.price)
            );
        },
        orderDetailForSale() {
            this.$post("/appVpOrder/orderDetailForSale.do", {
                content: '{"orderCode":"' + this.$route.query.orderCode + '"}',
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    response.res.skuList.forEach(item => {
                        item.checked = false;
                        item.untcg = "";
                    });
                    
                    this.orderList = response.res.skuList;
                    this.order = response.res.order;
                } else {
                    Toast("商品加载失败");
                }
            });
        },
        submit() {
            if (this.checkedLen == 0) {
                Toast({
                    message: "请选择需要退货的商品",
                    duration: 1000
                });
                return false;
            } else {
                //储存确认购物车最新数据
                // this.outOrderList = this.orderList.filter(item => {
                //     return item.checked == true;
                // });
                this.outOrderList.map(item => {
                    if (item.equation_factor == 1) {
                        item.value = parseFloat(item.realSendQty);
                    } else {
                        var _yu = m_rem(
                            parseFloat(item.realSendQty) || 0,
                            parseFloat(item.equation_factor) || 1
                        );
                        var shang = parseInt(
                            parseFloat(item.realSendQty) /
                                parseFloat(item.equation_factor)
                        );
                        if (_yu == 0) {
                            //被整除
                            item.value = shang;
                            item.mnum_value = _yu;
                        } else if (shang == 0) {
                            item.value = shang;
                            item.mnum_value = _yu;
                        } else {
                            item.value = shang;
                            item.mnum_value = _yu;
                        }
                    }
                    item.totalPrice = m_add(
                        m_mul(parseFloat(item.value), item.unit_price),
                        m_mul(parseFloat(item.mnum_value), item.price)
                    );
                });
                this.isShow = false;
            }
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        // search(search) {
        //     var searchKey = this.searchKey;
        //     if (search) {
        //         this.orderList = this.orderList.filter((product)=> {
        //             return Object.keys(product).some((key)=> {
        //                 return (
        //                     String(product[key])
        //                         .toLowerCase()
        //                         .indexOf(search) > -1
        //                 );
        //             });
        //         });
        //     }  
        // },
        submitOrder() {
            let obj = {},
                skuJson = [];
            this.outOrderList.forEach(item => {
                obj = {
                    returnQty: m_add(
                        m_mul(parseFloat(item.value) || 0, item.equation_factor || 1),
                        parseFloat(item.mnum_value) || 0
                    ),
                    price: item.price,
                    equationFactor: item.equation_factor,
                    styleno: item.styleno,
                    skuCode: item.skuCode,
                    skuName: item.skuName,
                    uomDefault: item.uom_default,
                    unit: item.unit
                };
                skuJson.push(obj);
            });

            let _content = {
                account: this.$store.getters["account"].account,
                companyId: this.$store.getters["account"].companyId,
                orderCode: this.$route.query.orderCode,
                sendWmcode: this.$route.query.wmcode
                    ? this.$route.query.wmcode
                    : this.outOrderList[0].send_wm_code,
                note: this.note,
                skuJson
            };
            this.$post("/returnorder/saveReturnOrder.do", {
                content: JSON.stringify(_content),
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    MessageBox.alert(response.optDesc).then(action => {
                        this.$router.go(-1);
                    });
                }else{
                    MessageBox.alert(response.optDesc).then(action => {
                        this.$router.go(-1);
                    });
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@base-rgba : rgba(235, 96, 0, 0.1);
.form-wrapper {
    padding-top: 90px;
    padding-bottom: 45px;
    .not-title {
        height: 34px;
        line-height: 34px;
        color: #666666;
        padding: 0 10px;
        font-size: 14px;
        background-color: @base-rgba;
    }
}
.order-ul {
    .mui-checkbox {
        padding-left: 36px;
        input[type="checkbox"] {
            left: 0;
            top: 20px;
        }
    }
}
/* 搜索 */
.top-bar {
    position: fixed;
    top: 45px;
    right: 0;
    left: 0;
    z-index: 1;
    padding: 0 10px;
    width: 100%;
    height: 45px;
    border-bottom: 0;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    .top-bar-box {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        .top_search {
            position: relative;
            height: 100%;
            flex: 1;
            .search-icon {
                position: absolute;
                top: 6px;
                left: 10px;
                color: #b3b3b3;
                font-size: 14px;
                border: 0;
                box-sizing: border-box;
            }
            input {
                margin: 0 auto;
                padding: 0 15px !important;
                height: 36px;
                width: 100%;
                border-radius: 4px !important;
                background-color: #fff;
                text-align: left;
                text-indent: 15px;
                line-height: 36px;
            }
            .search_btn {
                position: absolute;
                top: 0;
                right: 10px;
                height: 36px;
                border: 0;
                background-color: transparent;
                color: @base;
                letter-spacing: 0;
                font-weight: 400;
                font-stretch: normal;
                font-size: 1pc;
            }
        }
    }
}

.return-detail {
    padding-bottom: 50px;
    .cart-ul {
        padding: 10px 15px;
        .cart-li {
            position: relative;
            margin-bottom: 10px;
            background-image: linear-gradient(#ffffff, #ffffff),
                linear-gradient(#ffffff, #ffffff);
            background-blend-mode: normal, normal;
            border-radius: 3px 3px 0px 0px;
            .clear {
                position: absolute;
                top: 8px;
                right: 10px;
                color: #b3b3b3;
                font-size: 16px;
                cursor: pointer;
            }
            input[type="checkbox"] {
                top: 16px;
                left: 10px;
            }
            .cart-info {
                position: relative;
                padding: 10px 0 4px 0;
                margin-left: 10px;
                .is_enable {
                    position: absolute;
                    top: 10px;
                    left: 0;
                    width: 35px;
                    height: 14px;
                    background-color: rgba(0, 0, 0, 0.6);
                    color: #fff;
                    text-align: center;
                    font-size: 10px;
                    line-height: 14px;
                }
                img.cart-img {
                    width: 35px;
                    height: 35px;
                    float: left;
                    border: 1px solid #dddddd;
                }
                .cart-dec {
                    margin-left: 42px;
                    h4.skuName {
                        font-size: 15px;
                        line-height: 16px;
                        width: 88%;
                        color: #333333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    p.styleno {
                        font-size: 12px;
                        color: #999999;
                    }
                    p.blue {
                        font-size: 12px;
                        color: @base;
                        padding-right: 10px;
                        .tag {
                            border: 1px solid @base;
                            color: @base;
                            border-radius: 4px;
                            font-size: 8px;
                            width: auto;
                            height: 18px;
                            line-height: 16px;
                            padding: 0;
                            text-align: center;
                            margin-right: 4px;
                            float: right;
                        }
                    }
                }
            }
            .handle-info {
                position: relative;
                background-color: rgba(235, 96, 0, 0.1);
                border-radius: 0px 0px 3px 3px;
                display: flex;
                width: 100%;
                min-height: 50px;
                align-items: center;
                padding: 10px 10px;
                justify-content: space-between;
                .cartcontrol-wrapper {
                    .countcontrol {
                        .unit-count,
                        .uom-count {
                            padding: 0 4px;
                            width: 46px;
                            height: 30px;
                            line-height: 16px;
                            text-align: center;
                            font-size: 14px;
                            color: #333333;
                            border-radius: 4px;
                            border: 1px solid #ddd;
                            margin-bottom: 0;
                            padding: 0 4px;
                            margin-right: 4px;
                            &[disabled] {
                                background-color: #eeeeee !important;
                            }
                        }
                    }
                    .unit,
                    .uom_default {
                        width: auto;
                        height: 100%;
                        font-size: 12px;
                        list-style: 24px;
                        color: #333333;
                        vertical-align: middle;
                    }
                }
                .total-wrapper {
                    display: inherit;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-end;
                    title {
                        font-size: 14px;
                        color: #333333;
                        list-style: 24px;
                        vertical-align: middle;
                    }
                    input.total-price {
                        padding: 0 4px;
                        width: 60px;
                        height: 30px;
                        line-height: 16px;
                        text-align: center;
                        font-size: 14px;
                        color: #eb6000;
                        border-radius: 4px;
                        border: 1px solid #ddd;
                        margin-bottom: 0;
                        padding: 0 4px;
                        margin-right: 4px;
                        &[disabled] {
                            background-color: #eeeeee !important;
                        }
                    }
                    .unit {
                        width: auto;
                        height: 100%;
                        font-size: 12px;
                        list-style: 24px;
                        vertical-align: middle;
                        color: #333333;
                    }
                }
            }
        }
    }
    .tipPrice {
        margin-left: 25px;
        color: #eb6000;
    }
    .iconfont.def {
        font-size: 14px;
    }
    .order-list {
        overflow: hidden;
        margin-bottom: 10px;
        padding: 0;
        background-color: #fff;
    }
    .g-left,
    .g-center,
    .price-number {
        float: left;
        margin-top: 0.6rem;
    }
    .order-wrapper {
        padding: 10px 0px;
    }
    .g-left {
        margin-left: 0.5rem;
    }
    .g-name {
        font-size: 16px;
        margin-bottom: 12px;
    }
    .cations span {
        font-size: 12px;
        color: #888888;
        margin-bottom: 4px;
    }
    .b-code {
        display: block;
        margin-bottom: 4px;
    }
    .t-price .g-number {
        color: #333333;
        margin-right: 15px;
    }
    .t-price span {
        color: #eb6000;
    }
    .g-center {
        margin-right: 30px;
        margin-bottom: 0.3rem;
    }
    .price-number {
        float: right;
        margin-right: 15px;
    }
    .order-wrapper {
        padding-bottom: 50px;
    }
    .not {
        margin-top: 14px;
        color: #333;
        font-size: 16px;
        text-indent: 15px;
    }
    input[type="checkbox"] {
        top: 0.426667rem;
        left: 0.266667rem;
    }
    input[type="radio"]:checked:before {
        color: #eb6000;
    }
    .g-left img {
        width: 34px;
        height: 34px;
        border: 1px solid #ccc;
        margin-right: 4px;
        margin-left: 24px;
    }
    input[type="checkbox"] {
        top: 0.726667rem;
    }
    .tutlm {
        background: #eaf6ff;
    }
    .tutlm span {
        display: block;
    }
    .tutlm span i {
        font-weight: normal;
        font-size: 14px;
    }
    .t-money i {
        color: #eb6000;
        font-size: 14px;
    }
    .order-list {
        padding: 0pt;
    }
    .goods-list li {
        padding: 0px;
    }
    .pritn {
        background: #eaf6ff;
        overflow: hidden;
        padding: 18px 15px;
    }
    .pritn .t-price {
        float: left;
    }
    .pritn .t-number {
        float: right;
    }
    .t-price span {
        font-size: 14px;
    }
    .t-number span {
        font-size: 14px;
    }
    .t-number span i {
        font-style: normal;
        width: 90px;
        height: 90px;
        border: 1px solid #ccc;
        color: #eb6000;
    }
    .t-number input {
        width: 30px;
        height: 20px;
        text-align: center;
        width: 4em;
        font-size: 12px;
        margin-left: 6px;
        margin-right: 6px;
    }
    .t-number span {
        font-style: 14px;
    }
    .t-price span {
        color: #333;
    }
    .t-price i {
        color: #eb6000;
    }
    .specif {
        margin-bottom: 15px;
    }
    .cations span {
        display: block;
    }
    .t-price span:last-child {
        color: #eb6000;
    }
    .goods-list ul li {
        margin-bottom: 20px;
    }
    .goods-list {
        background: none;
    }
    .goods-list li {
        background: #fff;
    }
    .cellm {
        font-size: 16px;
        color: #333333;
        display: block;
        margin-left: 15px;
    }
    .textvalue textarea {
        width: 93%;
        border: 0.026667rem solid #ccc;
        margin: 0 auto;
        display: block;
        height: 78px;
        margin-top: 15px;
    }
    .textvalue span {
    }
    .mui-table-view:after {
        display: none;
    }
    .styleno span {
        display: block;
    }

}
</style>
