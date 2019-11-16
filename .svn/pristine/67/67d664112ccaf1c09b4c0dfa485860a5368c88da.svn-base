<template>
    <div class="product_detail">
        <div class="goods_banner">
            <div class="back" @click="back"><i class="iconfont">&#xe6fb;</i></div>
            <div class="swiper-container goods-container" id="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in imgList" :key="index" v-show="imgList && imgList.length>0">
                        <img :src="baseurl+item" class="img-dec" >
                    </div>
                    <div class="swiper-slide" v-if="imgList.length == 0">
                        <img :src="baseurl+img_path" class="img-dec" :alt="product.sku_name">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
            <div class="time-content">
                <span class="content">{{content}}</span>
            </div>
        </div>
        <div class="pre-info">
            <h4 class="list-name mui-ellipsis">{{product.skuName}}
            </h4>
            <!-- <p class="blue">{{product.supplier_name}}</p> -->
            <p class="list-size mui-ellipsis">规格：{{product.styleno}}</p>
            <p class="light-mark" v-if="product.lightMark">{{product.lightMark}}</p>
            <span><em class="pre-price">￥{{product.preunitPrice}}/{{product.unit}}</em>
                <span class="min-num">{{product.minNum}}{{product.unit}}起预购</span></span>
            <span class="pre-r">现在下单预支付{{product.preScale}}%</span>
        </div>
        <!-- <div class="goods-info">
            <h4 class="list-name mui-ellipsis">{{product.skuName}}
            </h4>

            <p class="list-size mui-ellipsis">规格：{{product.styleno}}</p>
            <span class="list-price">
                <em class="price_type">预购价:￥</em>
                {{product.preunitPrice}}
                <em class="price_unit">/{{product.unit}}</em>
            </span>
            <span class="market_price">销售价:
                <em class="price_type">￥</em>{{product.unitPrice}}
                <em class="price_unit">/{{product.unit}}</em></span>
            <br>
        </div> --> 

        <div class="product-text" v-if="sku_dec && sku_dec != ''">
            <h4 class="dec-title"><span>---商品信息---</span></h4>
            <p class="dec-text" v-html="sku_dec"></p>
        </div>
        <ul class="pre-company mt-10">
            <h4 class="t-title">可预售门店</h4>
            <li v-for="(item,index) in companyList" :key="index">
                <h5 class="list-title clearfix">
                    <span class="mui-pull-left">{{item.contactPhone}}</span>
                    <span class="mui-pull-right">{{item.cityCn}}</span></h5>
                <p>{{item.nm}}</p>
            </li>
        </ul>
        <section id="dialogMask" class="dialogMask" v-if="isShow" @click="isShow= false"></section>
        <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="dialog-wrapper" id="dialog" v-if="isShow">
                <div class="dialog-box">
                    <ul class="goods-list dialog-goods" id="dialog-goods">
                        <li class="mui-table-view-cell">
                            <div class="food-link">
                                <img :src="baseurl+img_path" />
                                <div class="recommend">
                                    <span class="close-dialog" @click.stop="isShow= false">×</span>
                                    <h4 class="skuName">{{product.skuName}}</h4>
                                    <p class="styleno">规格：{{product.styleno}}</p>
                                    <span class="price">预购价：￥{{product.preunitPrice}}/{{product.unit}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="input-content">
                        <label class="left">订购数量({{product.unit}})：</label>
                        <div class="right input-row">
                            <div class="cartcontrol">
                                <button class="cart-decrease" @click.stop.prevent="decreaseCart(product)">-</button>
                                <input class="cart-count" type="number" v-model="fnum_unit" @blur="changeValue(product,$event)" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')" />
                                <button class="cart-add" @click.stop.prevent="addCart(product)">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="sure_btn" @click="confirm(product)">确定</button>
                </div>
            </div>
        </transition>
        <div class="toolbar">
            <!-- <router-link class="toolbar-item" :to="{path:'/shopCart'}">
                <span class="mui-icon iconfont">&#xe61f; <mt-badge size="small" type="error" class="shop-count">{{shopCount | countFormat}}</mt-badge></span>
                <span class="toolbar-label">采购单</span>
            </router-link> -->
            <button class="mui-btn add-btn" type="button" disabled="disabled" v-if="product.isEnable == 'N'" style="width:100%">已下架</button>
            <button class="mui-btn add-btn" type="button" @click.stop="add(product)" v-else style="width:100%">加入采购单</button>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Toast, MessageBox } from "mint-ui";
import {
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    getPcid
} from "../../utils/index.js";
export default {
    name: "detail",
    data() {
        return {
            product: {},
            content: "0天00小时00分00秒",
            imgList: [],
            img_path: "",
            fnum_unit: 0,
            mnum_unit: 0,
            isShow: false,
            shopCarts: [],
            owner: "",
            swiper: null,
            good: {},
            retailShow: false,
            sku_dec: "",
            companyList: ""
        };
    },
    computed: {
        shopCount() {
            var sum = 0;
            this.$store.state.carts.forEach(cart => {
                sum += parseFloat(cart.value);
            });
            return sum;
        }
    },
    created() {
        this.productDetail();
    },
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.go(-1);
            }
        },
        countdowm(timestamp) {
            let self = this;
            let timer = window.setInterval(function() {
                let nowTime = new Date();
                let endTime = new Date(timestamp);
                let t = endTime.getTime() - nowTime.getTime();
                if (t > 0) {
                    let day = Math.floor(t / 1000 / 60 / 60 / 24); //计算剩余的天数
                    let hour = Math.floor((t / 1000 / 60 / 60) % 24); //计算剩余的小时数
                    let min = Math.floor((t / 1000 / 60) % 60); //计算剩余的分钟数
                    let sec = Math.floor((t / 1000) % 60); //计算剩余的秒数
                    hour = hour < 10 ? "0" + hour : hour;
                    min = min < 10 ? "0" + min : min;
                    sec = sec < 10 ? "0" + sec : sec;
                    let format = "";
                    if (day > 0) {
                        format = `${day}天${hour}小时${min}分${sec}秒`;
                    }
                    if (day <= 0 && hour > 0) {
                        format = `${hour}小时${min}分${sec}秒`;
                    }
                    if (day <= 0 && hour <= 0) {
                        format = `${min}分${sec}秒`;
                    }
                    self.content = "距结束还剩"+ " " + format;
                } else {
                    window.clearInterval(timer);
                    self.content = "活动已结束";
                }
            }, 1000);
        },
        productDetail() {
            let pid = this.$route.query.id;
            let companyId = getPcid();
            let _content =
                "{'id':'" + pid + "','companyId':'" + companyId + "'}";
            this.$post("/appPreOrder/selectAppPreProductDetail.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.product = response.res.tPreproduct;
                    this.companyList = response.res.list;
                    this.countdowm(response.res.tPreproduct.endTime);
                    this.sku_dec = response.res.tPreproduct.skuDec;
                    this.img_path = response.res.tPreproduct.imgPath;
                    if(response.res.tPreproductImg&&response.res.tPreproductImg.length>0){
                        response.res.tPreproductImg.map((item,index)=>{
                            this.imgList.push(item.img_path)
                        })
                    }else{
                        this.imgList =[]
                    }
                    this.$nextTick(() => {
                        this._initSwiper();
                    });
                    var foodIndex = this.$store.state.preorder.findIndex(
                        todo => {
                            return todo.id == response.res.tPreproduct.id;
                        }
                    );
                    //foodIndex为-1表示不存在 ,要加入商品
                    if (foodIndex === -1) {
                        this.fnum_unit =  response.res.tPreproduct.minNum || 1;
                        // this.mnum_unit = 0;
                    } else {
                        this.fnum_unit = this.$store.state.preorder[
                            foodIndex
                        ].value;
                        // this.mnum_unit =
                        //     this.$store.state.preorder[foodIndex].mnum_value || 0;
                    }
                } else {
                    Toast({
                        message: "数据请求失败",
                        duration: 1000
                    });
                }
            });
        },
        _initSwiper() {
            let swiper = new Swiper("#swiper", {
                loop: true,
                pagination: ".swiper-pagination",
                autoplay: 2000,
                direction: "horizontal",
                watchOverflow: true, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
                autoplayDisableOnInteraction: false,
                slidesPerView: 1,
                paginationClickable: true,
                centeredSlides: false,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            });
        },
        add(good) {
            let logintoken = this.$store.state.logindata.logintoken;
            if (!logintoken) {
                MessageBox.confirm("请先登录系统")
                    .then(action => {
                        this.$router.push({
                            path: "/login"
                        });
                    })
                    .catch(() => {
                        // Toast('操作取消');
                    });
                return false;
            }
            var foodIndex = this.companyList.findIndex(todo => {
                return todo.companyId == getPcid();
            });
            //foodIndex为-1表示不存在 ,要加入商品
            if (foodIndex === -1) {
                MessageBox("提示", "当前货品不在预售门店范围内");
                return false;
            }
            if (good.isEnable == "N") {
                Toast({
                    message: "该商品已下架！",
                    duration: 950
                });
                return false;
            } else {
                this.isShow = true;
            }
        },
        changeValue(food,e) {
            var value = e.target.value;
            if (this.fnum_unit.toString().indexOf(".") != -1) {
                    Toast("该商品只能输入整数");
                }
            this.fnum_unit = parseInt(value.toString().replace(/[^\d]+/g,''))||0;
            // console.log(this.fnum_unit);
            if (this.fnum_unit == "") {
                this.fnum_unit = 0;
            }
        },
        confirm(food) {
            if (food.retail_flag != "Y") {
                if (this.fnum_unit == "" || this.fnum_unit == 0) {
                    Toast("采购数量不能为0");
                    return false;
                }
            } else {
                if (
                    (this.fnum_unit == "" || this.fnum_unit == 0) &&
                    (this.mnum_unit == "" || this.mnum_unit == 0)
                ) {
                    Toast("采购数量不能为0");
                    return false;
                }
            }
            // if (food.is_gift == "Y") {
            //     MessageBox("提示", "赠品时不能修改数量，默认为1");
            //     this.fnum_unit = 1; //输入框值重置
            //     return false;
            // }
            this.isShow = false;
            var foodIndex = this.$store.state.preorder.findIndex(todo => {
                return todo.id == food.id;
            });
            //foodIndex为-1表示不存在 ,要加入商品
            if (foodIndex === -1) {
                food.value = this.fnum_unit;
                food.checked = true;
                this.$store.commit("addPrecarts", food);
                // data传给vuex状态里,然后vuex通过localstorage setItem存
                Toast("加入采购单成功！");
            } else {
                this.$store.state.preorder[foodIndex].value = this.fnum_unit;
                this.$store.commit("setPreorder", this.$store.state.preorder);
                Toast("加入采购单成功！");
            }
        },
        addCart(food) {
            if (!this.fnum_unit) {
                this.fnum_unit = 1; //输入框值重置
            } else {
                this.fnum_unit++;
            }
        },
        // plus(food) {
        //     //添加零售数量
        //     if (!this.mnum_unit) {
        //         this.mnum_unit = 1; //输入框值重置
        //     } else {
        //         this.mnum_unit++;
        //     }
        //     if (this.mnum_unit >= food.equationFactor) {
        //         this.mnum_unit = 0;
        //         this.fnum_unit += 1;
        //         Toast({
        //             message: "亲！您已凑合" + this.fnum_unit + food.unit + "啦",
        //             // iconClass: "icon icon-success",
        //             duration: 950
        //         });
        //     }
        // },
        decreaseCart(food) {
            if (this.fnum_unit <= 0) {
                this.fnum_unit = 0;
                Toast({
                    message: "宝贝不能再减少啦！",
                    // iconClass: "icon icon-success",
                    duration: 950
                });
                return false;
            } else {
                if(this.fnum_unit > food.minNum){
                    this.fnum_unit -= 1;
                }else{
                    Toast("该货品"+food.minNum + food.unit + "起预购")
                    return false;
                }
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@price: #eb6000;
.product_detail {
    padding-bottom: 50px;
    .goods_banner {
        position: relative;
        .back {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 4;
            width: 33px;
            height: 33px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.4);
            text-align: center;
            i {
                color: #fff;
                font-weight: 700;
                font-size: 20px;
                line-height: 35px;
            }
        }
        .time-content {
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 9;
            // background-color: @base;
            background-color: rgba(235, 96, 0, 0.8);
            text-align: center;
            padding: 2px 10px;
            span {
                color: #fff;
                font-size: 11px;
                line-height: 12px;
            }
        }
        .goods-container {
            display: block;
            width: 100%;
            height: 100vw;
            .img-dec {
                display: block;
                width: 100%;
                height: 100vw;
            }
        }
    }
    .goods-info {
            position: relative;
            padding: 10px;
            background-color: #fff;
            margin-bottom: 10px;
            color: #999999;
            h4.list-name {
                color: #333333;
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;
                margin-bottom: 4px;
                i.gift {
                    margin-right: 4px;
                    font-size: 20px;
                    color: @price;
                    vertical-align: middle;
                }
            }
            .list-size {
                color: #999;
                font-size: 13px;
                line-height: 16px;
            }
            .list-price {
                display: inline-block;
                color: @price;
                font-size: 16px;
                font-style: normal;
                margin-right: 20px;
                .price_type {
                    font-size: 12px;
                    font-style: normal;
                }
                .price_unit {
                    font-size: 15px;
                    font-style: normal;
                }
                .retail_price {
                    font-size: 10px;
                }
            }
            .market_price {
                color: #999;
                text-decoration: line-through;
                .price_type {
                    font-size: 12px;
                    font-style: normal;
                }
                .price_unit {
                    font-size: 12px;
                    font-style: normal;
                }
            }
        }
        .collapse-content {
            position: relative;
            margin-top: 0;
            padding: 10px;
            border-top: 1px solid @base;
            background-color: rgba(49, 165, 255, 0.1);
            zoom: 1;
            .sale-tag {
                position: relative;
                top: -10px;
                display: block;
                width: 90px;
                height: 23px;
                border-radius: 0 0 10px 10px;
                background-color: @base;
                color: #fff;
                text-align: center;
                font-weight: 400;
                font-stretch: normal;
                font-size: 13px;
                line-height: 24px;
            }
            .has-standard {
                width: 100%;
                .price-title {
                    text-align: right;
                    color: @base;
                    font-size: 15px;
                    padding: 6px 0;
                }
                .amount-title {
                    color: @base;
                    font-size: 15px;
                    text-align: left;
                    padding: 6px 0;
                }
                .price {
                    text-align: right;
                    .value {
                        color: @price;
                        font-size: 16px;
                    }
                }
            }
        }
        .product-text {
            background-color: #fff;
            margin-top: 10px;
            padding: 10px;
            h4.dec-title {
                font-size: 14px;
                color: #fff;
                text-align: center;
				margin-bottom: 10px;
                span {
                    display: block;
                    background: @base;
                    width: 140px;
                    height: 24px;
                    line-height: 24px;
                    margin: auto;
                    padding: 0 15px;
                    border-radius: 15px;
                }
            }
            .dec-text p {
                font-size: 14px;
            }
        }
    .pre-company {
        padding: 10px 10px;
        background-color: #fff;
        h4.t-title {
            color: @base;
            height: 18px;
            line-height: 18px;
            font-size: 15px;
            text-indent: 15px;
            margin-bottom: 15px;
            border-left: 2px solid @base;
        }
        li {
            margin-bottom: 10px;
            h5 {
                color: #333333;
                font-size: 13px;
            }
            p {
                color: #888888;
                font-size: 11px;
            }
        }
    }
    .pre-info {
        position: relative;
        margin-top: 0;
        padding: 10px;
        border-bottom: 1px solid @base;
        background-color: rgba(235, 96, 0, 0.1);
        zoom: 1;
        .list-name {
            font-size: 16px;
            color: #333333;
            line-height: 18px;
            margin-bottom: 4px;
        }
        .list-size {
            font-size: 14px;
            color: #888888;
        }
        .light-mark{
            font-size: 12px;
            color: #eb6000;
            line-height: 16px;
        }
        .tag {
            position: relative;
            top: -10px;
            display: block;
            width: 60px;
            height: 23px;
            border-radius: 0 0 10px 10px;
            background-color: @base;
            color: #fff;
            text-align: center;
            font-weight: 400;
            font-stretch: normal;
            font-size: 13px;
            line-height: 24px;
        }
        .pre-price {
            display: inline-block;
            color: @price;
            font-size: 16px;
            font-style: normal;
            margin-right: 20px;
        }
        .min-num {
            color: @price;
        }
        .pre-r {
            float: right;
        }
    }
    .toolbar {
        position: fixed;
        width: 100%;
        height: 50px;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        border-top: 1px solid #ddd;
        background-color: #fff;
        flex-flow: row;
        align-items: center;
        .toolbar-item {
            display: inherit;
            text-align: center;
            flex: 1;
            flex-direction: column;
            &:nth-of-type(1) {
                border-right: 1px solid #ddd;
            }
            span.iconfont {
                position: relative;
                margin: 0 auto 6px;
                width: 24px;
                height: 24px;
                color: #888888;
                font-size: 24px;
                .shop-count {
                    background-color: #ff671d;
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    padding: 0;
                    line-height: 16px;
                    text-align: center;
                    top: -4px;
                    right: -12px;
                    font-size: 10px;
                }
                &.favory {
                    color: #fcbc35 !important;
                    // font-size: 18px;
                }
            }
            span.toolbar-label {
                display: block;
                overflow: hidden;
                color: #888888;
                text-overflow: ellipsis;
                font-size: 11px;
                line-height: 1;
            }
        }
        .add-btn {
            width: 110px;
            height: 100%;
            border: 0;
            border-radius: 0;
            background-color: @base;
            color: #fff;
            font-size: 14px;
            align-self: flex-end;
        }
    }
}
.showRetail {
    text-align: right;
    padding: 4px 10px;
    .retail_btn {
        background-color: @base;
        padding: 4px 10px;
        color: #fff;
    }
}
.dialogMask,
.shoppingMask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}
.dialog-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100000;
    overflow: hidden;
    width: 100%;
    height: auto;
    border-radius: 10px 10px 0 0;
    background-color: #fff;
    .dialog-box {
        position: relative;
        width: 100%;
        height: 100%;
        .dialog-header {
            position: static;
            top: 0;
            right: 0;
            left: 0;
            width: 100%;
            height: 36px;
            padding: 0 15px;
            text-align: left;
            font-weight: 700;
            font-size: 16px;
            line-height: 36px;
        }
        span.close-dialog {
            position: absolute;
            top: 10px;
            right: 10px;
            display: block;
            width: 18px;
            height: 18px;
            color: #999;
            text-align: center;
            font-size: 24px;
            line-height: 18px;
            cursor: pointer;
        }
        button.sure_btn {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0;
            width: 100%;
            height: 45px;
            border: 0;
            background-color: @base;
            color: #fff;
            font-size: 1pc;
            line-height: 45px;
        }
        .input-content {
            padding: 0 10px;
            height: 40px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .input-row .reduce,
            .input-row .plus {
                color: #318eff;
                font-size: 22px;
                vertical-align: middle;
                cursor: pointer;
            }
            input {
                vertical-align: top;
            }
            label {
                color: #333;
            }
        }
        .dialog-goods {
            li img {
                width: 70px;
                height: 70px;
                float: left;
            }
            li div.recommend {
                margin-left: 80px;
            }

            li::after {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 15px;
                height: 1px !important;
                content: "";
                transform: scaleY(0.5);
                background-color: #c8c7cc;
            }
        }
    }
}
</style>
