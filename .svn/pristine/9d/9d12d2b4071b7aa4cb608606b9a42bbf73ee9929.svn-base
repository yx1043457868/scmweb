<template>
    <div class="product_detail">
        <div class="goods_banner">
            <div class="back" @click="back"><i class="iconfont">&#xe6fb;</i></div>
            <div class="swiper-container goods-container" id="swiper1">
                <div class="swiper-wrapper" v-if="imgList && imgList.length > 0">
                    <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
                        <img :src="baseurl+item.img_path+'?time='+timeNum" class="img-dec" :alt="item.sku_name">
                    </div>
                </div>
                <div class="swiper-wrapper" v-else>
                    <div class="swiper-slide">
                        <img :src="baseurl+img_path+'?time='+timeNum" class="img-dec" :alt="product.sku_name">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="goods-info" :sku_code="product.sku_code" :class_id="product.class_id" :id="product.id">
            <h4 class="list-name mui-ellipsis"><i class="iconfont gift" v-if="product.is_gift == 'Y'">&#xe6c7;</i>{{product.sku_name}}
            </h4>
            <!-- <p class="blue">{{product.supplier_name}}</p> -->
            <p class="list-size mui-ellipsis">规格：{{product.styleno}}</p>
            <span class="tag" v-if="full_gift && full_gift.requireType != 2">满赠</span>
            <span class="tag" v-else-if="full_gift && full_gift.requireType == 2">满减</span>
            <p class="list-size mui-ellipsis" v-if="full_gift && full_gift.requireType == 2" style="font-size:12px;color:#888888;margin:4px 0">满减描述：满{{full_gift.require}}元减{{full_gift.rductionAmount}}元</p>
            <span class="list-price" v-show="registerFlag">
                <!-- <span v-if="product.sku_type=='1'">
                    <em>￥{{product.price}}/{{product.uom_default}}</em>
                </span> -->
                <!-- <span> -->
                    <span v-show="shopType!=4" style="font-size:12px;">会员价：</span>
                    <em>￥{{product.unit_price || '--'}}/{{product.unit}}</em>
                    <span class="retail_price">(￥{{product.price  || '--'}}/{{product.uom_default}})</span>
                <!-- </span> -->
            </span>
            <span class="market_price" v-if="product.unit_price>0 && product.unit_price<product.market_unitprice" v-show="registerFlag">
                <!-- 市场价:
                <em class="price_type">￥</em>{{product.market_unitprice}}
                <em class="price_unit">/{{product.unit}}</em> -->
            </span>
            <span class="list-price hide-price" v-show="!registerFlag">价格：登录后可见</span>
            <br>
            <ul class="sku-group" v-if="product.skuGroup">
                <li v-for="(sku,index) in product.skuGroup" :key="index" :class="{'active':currentIndex==index}" @click="selectSkuStyle(index,sku.id)">
                    {{sku.spu_styleno}}
                </li>
            </ul>
        </div>
        <!-- requireType 0:满多少数量赠送 1:满多少金额赠送 -->
        <!-- unitType  0 主单位 1辅单位 -->
        <h5 class="gift-title" v-if="full_gift && full_gift.requireType != 2">
			<span v-if="full_gift.requireType == 0">满{{full_gift.require}}{{full_gift.unitType == 0 ? full_gift.uomDefault : full_gift.unit}}赠品如下：</span>
			<span v-else>满{{full_gift.require}}元赠品如下：</span>
		</h5>
        <div v-if="full_gift && full_gift.requireType != 2">
           <div class="gift-link clearfix" v-for="(gift, index) in full_gift.productList" :key="index">
				<img v-lazy="baseurl+ gift.imagPath+'?time='+timeNum" :key="baseurl+ gift.imagPath" style="float: left;width: 50px;height: 50px; margin:0">
				<span class="is_gift">赠</span>
				<div class="gift-info">
					<h4 class="skuName">{{gift.skuName}}</h4>
					<p class="styleno">规格：{{gift.styleno}}</p>
					<span class="gift-num">x {{gift.requirement}}
						<!-- unitType  0 主单位 1辅单位 -->
						<em v-if="gift.unitType == 0">{{gift.uomDefault}}</em>
						<em v-else>{{gift.unit}}</em>
					</span>
				</div>
			</div>
        </div>
        <div class="product-text" v-if="headContent && headContent != ''">
            <p class="dec-text" v-html="headContent"></p>
        </div>
        <div class="product-text" v-if="sku_dec && sku_dec != ''">
            <h4 class="dec-title"><span>---商品信息---</span></h4>
            <p class="dec-text" v-html="sku_dec"></p>
        </div>
        <div class="product-text" v-if="endContent && endContent != ''">
            <p class="dec-text" v-html="endContent"></p>
        </div>
        <!-- <div>
            <img src="https://p.lzl98.com/scmplus/upload/adv/lzl_info.jpg" style="width:100%;height:1041px" />
        </div> -->
        <section id="dialogMask" class="dialogMask" v-show="isShow" @click="isShow= false"></section>
        <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="dialog-wrapper" id="dialog" v-show="isShow">
                <div class="dialog-box">
                    <ul class="goods-list dialog-goods" id="dialog-goods">
                        <li class="mui-table-view-cell">
                            <div class="food-link">
                                <img :src="baseurl+img_path+'?time='+timeNum" />
                                <div class="recommend">
                                    <span class="close-dialog" @click.stop="isShow= false">×</span>
                                    <h4 class="skuName shotName">{{product.sku_name}}</h4>
                                    <p class="styleno">规格：{{product.styleno}}</p>
                                    <span class="price" v-show="registerFlag">
                                        <span v-if="product.sku_type=='0'">￥{{product.unit_price || '--'}}/{{product.unit}}</span>
                                        <span v-else>￥{{product.price || '--'}}/{{product.unit}}</span>
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <!-- 非抄码 -->
                    <div v-if="product.sku_type == '0'"> 
                        <div class="input-content"><span class="red">*该货品只能输入整数*</span></div>
                        <div class="input-content">
                            <label class="left">订购数量({{product.unit}})：</label>
                            <div class="right input-row">
                                <div class="cartcontrol">
                                    <button class="cart-decrease" @click.stop.prevent="decreaseCart(product)">-</button>
                                    <input class="cart-count" type="number" step="1" min="0" v-model="fnum_unit" @blur="changeValue(product,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" />
                                    <button class="cart-add" @click.stop.prevent="addCart(product)">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="input-content" v-if="product.equation_factor != 1">
                            <label class="left">零售数量({{product.uom_default}})：</label>
                            <div class="right input-row">
                                <div class="cartcontrol">
                                    <button class="cart-decrease" @click.stop.prevent="reduce(product)">-</button>
                                    <input class="cart-count" type="number" step="1" min="0" v-model="mnum_unit" @blur="changeMnumValue(product,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" />
                                    <button class="cart-add" @click.stop.prevent="plus(product)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 抄码 -->
                    <div v-if="product.sku_type == '1'">
                        <div class="input-content">
                            <label class="left">订购数量({{product.unit}})：</label>
                            <div class="right input-row">
                                <div class="cartcontrol">
                                    <button class="cart-decrease" @click.stop.prevent="decreaseCart(product)">-</button>
                                    <input v-if="product.equation_factor != 1" class="cart-count" type="number" step="1" min="0" v-model="fnum_unit" @blur="changeValue(product,0,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" />
                                    <input v-else class="cart-count" type="number" step="1" min="0" v-model="fnum_unit" @blur="changeValue(product,1,$event)" onkeyup="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" onpaste="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" oncontextmenu="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" />
                                    <button class="cart-add" @click.stop.prevent="addCart(product)">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="input-content" v-if="product.equation_factor != 1">
                            <label class="left">零售数量({{product.uom_default}})：</label>
                            <div class="right input-row">
                                <div class="cartcontrol">
                                    <button class="cart-decrease" @click.stop.prevent="reduce(product)">-</button>
                                    <input class="cart-count" type="number" step="1" min="0" v-model="mnum_unit" @blur="changeMnumValue(product,1,$event)" onkeyup="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" onpaste="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" oncontextmenu="value=value.match(/\d+(\.\d{0,2})?/) ? value.match(/\d+(\.\d{0,2})?/)[0] : ''" />
                                    <button class="cart-add" @click.stop.prevent="plus(product)">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="sure_btn" @click="confirm(product)">确定</button>
                </div>
            </div>
        </transition>
        <div class="toolbar">
            <a class="toolbar-item  mui-active" href="javascript:;" v-if="favory == 'N'" @click="addFav">
                <span class="mui-icon unfavory iconfont">&#xe65d;</span>
                <span class="toolbar-label">收藏</span>
            </a>
            <a class="toolbar-item  mui-active" href="javascript:;" v-if="favory == 'Y'" @click="delFav">
                <span class="mui-icon favory iconfont">&#xe6c9;</span>
                <span class="toolbar-label">收藏</span>
            </a>
            <router-link class="toolbar-item" :to="{path:'/shopCart'}">
                <span class="mui-icon iconfont">&#xe61f; <mt-badge size="small" type="error" class="shop-count">{{shopCount | countFormat}}</mt-badge></span>
                <span class="toolbar-label">采购单</span>
            </router-link>
            <button class="mui-btn add-btn" type="button" disabled="disabled" v-if="product.is_enable != 'Y'">已下架</button>
            <button class="mui-btn add-btn" type="button" @click.stop="add(product)" v-else>加入采购单</button>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Toast, MessageBox } from "mint-ui";
import wxapi from "../utils/wxapi.js";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    getPcid,
    isNull
} from "../utils/index.js";
export default {
    name: "detail",
    data() {
        return {
            product: {},
            img_path: "",
            imgList: [],
            fnum_unit: 0,
            mnum_unit: 0,
            isShow: false,
            shopCarts: [],
            owner: "",
            swiper: null,
            good: {},
            favory: "N",
            retailShow: false,
            sku_dec: "",
            headContent:"",
            endContent:"",
            registerFlag: this.$store.getters["company"] ? true : false,
            full_gift:"",
            currentIndex:0,
            shopType:this.$store.getters["shop"].shopType? this.$store.getters["shop"].shopType:4,
            timeNum:(new Date()).valueOf(),
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
    // beforeRouteLeave (to, from, next) {
    //     // 设置下一个路由的mete,让列表页缓存，不刷新页面
    //     to.meta.keepAlive  = true; // 判断是否需要缓存
    //     next();
    // },
    created() {
        this.productDetail();
        this.isFavoryProduct(); 
    },
    methods: {
        selectSkuStyle(index,id){
            this.currentIndex = index;
            this.initDetail(id);
            this.$router.replace({ path: "/detail", query:{id:id} });
        },
        initDetail(pid) {
            let companyId = this.$store.getters["account"]
                ? this.$store.getters["account"].companyId
                : "";
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let shopType = this.$store.getters["shop"].shopType
                ? this.$store.getters["shop"].shopType
                : "";
            let _content =
                "{'productid':'" +
                pid +
                "','companyId':'" +
                companyId +
                "','shopId':'" +
                shopId +
                "','shopType':'" +
                shopType +
                "'}";
            this.$post("/appVpProduct/productInfo.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    if(response.res.skuGroup&&response.res.skuGroup.length>1){
                        var temp;
                        for (var i = 0; i < response.res.skuGroup.length; i++) {
                            for (var j = i; j < response.res.skuGroup.length; j++) {
                                var itemN = response.res.skuGroup[i].unit_price
                                var itemM = response.res.skuGroup[j].unit_price
                                if (itemN > itemM) {
                                    temp = response.res.skuGroup[i];
                                    response.res.skuGroup[i] = response.res.skuGroup[j];
                                    response.res.skuGroup[j] = temp;
                                }
                            }
                        }
                    }
                    this.product = response.res;
                    this.full_gift = response.res.full_gift ? JSON.parse(response.res.full_gift) : "";
                    var foodIndex = this.$store.state.carts.findIndex(todo => {
                        return todo.id == response.res.id;
                    });
                    //foodIndex为-1表示不存在 ,要加入商品
                    if (foodIndex === -1) {
                        this.fnum_unit = 0;
                        this.mnum_unit = 0;
                    } else {
                        this.fnum_unit = this.$store.state.carts[
                            foodIndex
                        ].value;
                        this.mnum_unit =
                            this.$store.state.carts[foodIndex].mnum_value || 0;
                    }
                } else {
                    Toast({
                        message: "数据请求失败",
                        duration: 1000
                    });
                }
            });
        },
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.go(-1);
            }
        },
        addRetail() {
            this.retailShow = !this.retailShow;
        },
        addFav() {
            //添加收藏
            let pid = this.$route.query.id;
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            if (accountObj && accountObj.account) {
                let _content =
                    "{'id':'" +
                    pid +
                    "','account':'" +
                    accountObj.account +
                    "'}";
                this.$post("/appVpProduct/vpAddFavory.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(res => {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        Toast("商品已加入收藏");
                        this.favory = "Y";
                    } else {
                        Toast({
                            message: response.optDesc,
                            duration: 1000
                        });
                    }
                });
            } else {
                this.$router.push({ path: "/login" }); //前往登录页
            }
        },
        delFav() {
            //取消收藏
            let pid = this.$route.query.id;
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            if (accountObj && accountObj.account) {
                let _content =
                    "{'id':'" +
                    pid +
                    "','account':'" +
                    accountObj.account +
                    "'}";
                this.$post("/appVpProduct/vpDelFavory.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(res => {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        Toast({
                            message: response.optDesc,
                            duration: 1000
                        });
                        this.favory = "N";
                    } else {
                        Toast({
                            message: response.optDesc,
                            duration: 1000
                        });
                    }
                });
            } else {
                this.$router.push({ path: "/login" }); //前往登录页
            }
        },
        productDetail() {
            let pid = this.$route.query.id;
            // let companyId = getPcid();
            //    let companyId=""
            let companyId = this.$store.getters["account"]
                ? this.$store.getters["account"].companyId
                : "";
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let shopType = this.$store.getters["shop"].shopType
                ? this.$store.getters["shop"].shopType
                : "";
            let _content =
                "{'productid':'" +
                pid +
                "','companyId':'" +
                companyId +
                "','shopId':'" +
                shopId +
                "','shopType':'" +
                shopType +
                "'}";
            this.$post("/appVpProduct/productInfo.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    if(response.res.skuGroup&&response.res.skuGroup.length>1){
                        var temp;
                        for (var i = 0; i < response.res.skuGroup.length; i++) {
                            for (var j = i; j < response.res.skuGroup.length; j++) {
                                var itemN = response.res.skuGroup[i].unit_price
                                var itemM = response.res.skuGroup[j].unit_price
                                if (itemN > itemM) {
                                    temp = response.res.skuGroup[i];
                                    response.res.skuGroup[i] = response.res.skuGroup[j];
                                    response.res.skuGroup[j] = temp;
                                }
                            }
                        }
                    }
                    this.product = response.res;
                    this.img_path = response.res.img_path;
                    this.sku_dec = response.res.sku_dec;
                    this.headContent=response.res.headContent;
                    this.endContent=response.res.endContent;
                    this.full_gift = response.res.full_gift ? JSON.parse(response.res.full_gift) : "";
                    this.imgList = response.res.imgList
                        ? response.res.imgList
                        : [];
                    if(response.res.skuGroup){
                        this.currentIndex =  response.res.skuGroup.findIndex(item => {
                            return item.defalut_stylno == true;
                        });
                    }
                       
                    var url = window.location.href.split("#")[0];
                    wxapi.wxRegister(this, url, {
                        title: "良之隆官方商城",
                        imgUrl: this.baseurl + response.res.img_path, // 分享图标
                        desc:response.res.sku_name, // 分享描述
                        success: res => {},
                        fail: res => {
                            Toast("产生了一个分享错误");
                        }
                    });
                    this.$nextTick(() => {
                        this._initSwiper();
                    });
                    var foodIndex = this.$store.state.carts.findIndex(todo => {
                        return todo.id == response.res.id;
                    });
                    //foodIndex为-1表示不存在 ,要加入商品
                    if (foodIndex === -1) {
                        this.fnum_unit = 0;
                        this.mnum_unit = 0;
                    } else {
                        this.fnum_unit = this.$store.state.carts[
                            foodIndex
                        ].value;
                        this.mnum_unit =
                            this.$store.state.carts[foodIndex].mnum_value || 0;
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
            let swiper = new Swiper("#swiper1", {
                autoplay: 3000,
                speed: 300,
                loop: false,
                pagination: ".swiper-pagination",
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
        isFavoryProduct() {
            let pid = this.$route.query.id;
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};

            if (accountObj && accountObj.account) {
                let _content =
                    "{'id':'" +
                    pid +
                    "','account':'" +
                    accountObj.account +
                    "'}";
                this.$post("/appVpProduct/isFavoryProduct.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(res => {
                    let response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        this.favory = response.isFavory;
                    } else {
                        Toast({
                            message: "数据请求失败",
                            duration: 1000
                        });
                    }
                });
            } else {
                this.favory = "N";
            }
        },
        add(good) {
            let logintoken = this.$store.state.logindata.logintoken;
            if (!logintoken) {
                MessageBox.confirm("请先登录系统")
                    .then(action => {
                        this.$router.push({
                            path: "/login",
							query: {
							    redirect: "/detail?id=" + this.$route.query.id
							} // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        });
                    })
                    .catch(() => {
                        // Toast('操作取消');
                    });
                return false;
            }
            if (good.is_enable != "Y") {
                Toast({
                    message: "该商品已下架！",
                    duration: 950
                });
                return false;
            } else {
                this.isShow = true;
            }
        },
        //辅单位数量
        changeValue(food, type, e) {
            var value = e.target.value||0;
            if (value == "") {
                this.fnum_unit = 0;
            }
            //抄码
            if (type == 1) {
                this.fnum_unit = parseFloat(value.toString().match(/\d+(\.\d{0,2})?/)
                    ? value.toString().match(/\d+(\.\d{0,2})?/)[0]
                    : "")||0;
            }else if(type == 0){
                //非抄码 
                if (this.fnum_unit.toString().indexOf(".") != -1) {
                    Toast("该商品只能输入整数");
                }
                this.fnum_unit = parseInt(value.toString().replace(/[^\d]+/g,''))||0;
            }
        },
        //主单位数量
        changeMnumValue(food,type, e) {
            var mnum_unit = e.target.value||0;
            if(type == 0){
                //非抄码
                if (this.mnum_unit.toString().indexOf(".") != -1) {
                    Toast("该商品只能输入整数");
                }
                this.mnum_unit =parseInt(mnum_unit.toString().replace(/[^\d]+/g, ""))||0;
                
            }else{
                //抄码
                this.mnum_unit =parseFloat(mnum_unit.toString().match(/\d+(\.\d{0,2})?/)
                    ? mnum_unit.toString().match(/\d+(\.\d{0,2})?/)[0]
                    : "")||0;
            }
            let rem = m_rem(
                parseFloat(this.mnum_unit),
                parseFloat(food.equation_factor)
            );
            let _div = parseInt(m_div(this.mnum_unit, food.equation_factor));
            if (_div >= 1) {
                this.mnum_unit =type==1?rem:parseInt(rem);
                this.fnum_unit = parseFloat(this.fnum_unit) + _div;
            }
           
        },
        confirm(food) {
            if (isNull(this.fnum_unit) && isNull(this.mnum_unit)) {
                Toast("采购数量不能为0");
                return false;
            }
            this.isShow = false;
            var foodIndex = this.$store.state.carts.findIndex(todo => {
                return todo.id == food.id;
            });
            //foodIndex为-1表示不存在 ,要加入商品
            if (foodIndex === -1) {
                food.value = this.fnum_unit;
                food.mnum_value = this.mnum_unit;
                food.checked = true;
                this.$store.commit("addcarts", food);
                // data传给vuex状态里,然后vuex通过localstorage setItem存
                Toast("加入采购单成功！");
            } else {
                this.$store.state.carts[foodIndex].value = this.fnum_unit;
                this.$store.state.carts[foodIndex].mnum_value = this.mnum_unit;
                this.$store.commit("setcarts", this.$store.state.carts);
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
        plus(food) {
            //添加零售数量
            if(food.sku_type == 0){
                if (!this.mnum_unit) {
                this.mnum_unit = 1; //输入框值重置
                } else {
                    this.mnum_unit++;
                }
                if (this.mnum_unit >= food.equation_factor) {
                    this.mnum_unit = 0;
                    this.fnum_unit += 1;
                    Toast({
                        message: "亲！您已凑合" + this.fnum_unit + food.unit + "啦",
                        // iconClass: "icon icon-success",
                        duration: 950
                    });
                }
            }else{
                this.mnum_unit++;
            }
        },
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
                this.fnum_unit -= 1;
            }
        },
        reduce(food) {
            if (this.mnum_unit <= 0) {
                this.mnum_unit = 0;
                Toast({
                    message: "宝贝不能再减少啦！",
                    // iconClass: "icon icon-success",
                    duration: 950
                });
                return false;
            } else {
                this.mnum_unit -= 1;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@price: #ff671d;
.product_detail {
    padding-bottom: 50px;
    .goods_banner{
        position:relative;
        .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom:40px;
        }
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
        .tag {
            display: block;
            color: @base;
            width: 30px;
            text-align: center;
            height: 18px;
            line-height: 14px;
            font-size: 10px;
            border: 1px solid @base;
            border-radius: 4px;
            padding: 2px 2px;
        }
        .list-price {
            display: inline-block;
            color: @price;
            font-size: 16px;
            font-style: normal;
            margin-right: 20px;
            &.hide-price {
                color: @base;
                font-size: 12px;
            }
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
        .sku-group{
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: center;
            li{
                border: 1px solid #dddddd;
                border-radius: 5px;
                margin-right: 15px;
                padding: 0 8px;
                color: #333333;
                margin-bottom: 6px;
                &.active{
                    background-color: @base;
                    border-color: @base;
                    color: #fff;
                }
            }
        }
    }
    .gift-title{
        height: 34px;
        line-height: 34px;
        background-color: rgba(235, 96, 0, 0.1);
        padding: 0 10px;
        color: #eb6000;
    }
    .gift-link {
        position: relative;
        height: 100%;
        padding: 10px 10px;
        background-color: #fff;
        .is_gift {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 50px;
            height: 18px;
            background-color: rgba(235, 96, 0, 0.7);
            color: #fff;
            text-align: center;
            font-size: 9pt;
            line-height: 18px;
        }
        img {
            float: left;
            width: 55px;
            height: 55px;
        }
        .gift-info{
            margin-left: 60px;
            text-align: left;
            position: relative;
            overflow: hidden;
            .skuName {
                margin-bottom: 5px;
                color: #333333;
                font-size: 14px;
                width: 100%;
                line-height: 1.4;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &.shotName{
                    width: 72% !important;
                }
            }
            p {
                width: 100%;
                font-size: 12px;
                line-height:17px;
                color: #999;
                font-size: 12px;
            }
            .gift-num{
                position: absolute;
                top:20px;
                right:0;
                color: #888888;
            }
        }
    }
    .collapse-content {
        position: relative;
        margin-top: 0;
        padding: 10px;
        border-top: 1px solid @base;
        background-color: rgba(235,96,0,.1);
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
            top: 0;
            right: 0;
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
            background-color: #eb6000;
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
                color: #eb6000;
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
.red {
    color: red;
}

</style>
