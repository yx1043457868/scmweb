<template>
    <div class="classify" style="height:100VH">
        <!--头部start-->
        <Header title="样品申报"></Header>
        <div class="header">
            <mt-header title="样品申报">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header>
        </div>
        <div class="top-bar clearfix" style="box-shadow:none">
            <div class="top-bar-box">
                <div class="top_search  mui-pull-left">
                    <span class="search-icon iconfont">&#xe7b7;</span>
                    <input type="search" class="mui-pull-left" placeholder="输入食材名称/编码/拼音搜索" v-model="searchKey" id="search_input" @keyup.enter="search(searchKey)">
                    <button class="search_btn" @click="search(searchKey)">搜索</button>
                </div>
            </div>
        </div>
        <!--tab开始-->
        <div class="tab tabContent classifyBox">
            <div class="left menu-wrapper" ref="menuWrapper">
                <ul id="typeList">
                    <li v-for="(item,index) in ProductClass" :key="index" :id="item.id" :index="index" :class="{'cur':currentIndex===index}" ref="menuList" @click.stop="selectMenu(index,item.id)"><span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="right foods-wrapper" id="goodsList" ref="foodsWrapper">
                <div class="fixed-bar" v-show="classTwoList.length > 0 && currentIndex !== ''">
                    <div class="slider" ref="slider">
                        <div class="slider-group">
                            <div class="slider-item" v-for="(item,index) in classTwoList" :key="index" :id="item.id" @click="selectSubMenu(index,item.id)" :class="{'cur':curIndex===index}">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="up-down" @click="popupVisible = !popupVisible">
                        <span class="iconfont">&#xe728;</span>
                    </div>
                    <div class="popupVisible" v-show="popupVisible" @click.stop.prevent="popupVisible=false">
                        <div class="popWrap">
                            <div class="pop-item" v-for="(item,index) in classTwoList" :key="index" :id="item.id" @click="selectSubMenu(index,item.id)" :class="{'cur':curIndex===index}">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!--mescroll滚动区域的基本结构-->
                <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" :class="[classTwoList.length > 0 && currentIndex !== ''?'top-mescroll':'']">
                    <!--内容...-->
                    <div id="mescroll">
                        <div class="tab_content" ref="foodList">
                            <ul class="goods-list">
                                <li class="mui-table-view-cell" :key="index" v-for="(food,index) in ProductS" :giftId="food.giftId">
                                    <router-link class="food-link" :to='{path:"/simpleDetail",query:{id:food.giftId}}' tag="div">
                                        <img v-lazy="baseurl+food.img_path">
                                        <span class="is_enable" v-show="food.is_enable != 'Y'">已下架</span>
                                        <div class="recommend sales-info">
                                            <h4 class="skuName">{{food.sku_name}}</h4>
                                            <!-- <p class="qty">商品编码：{{food.sku_code}}</p> -->
                                            <p class="styleno">规格：{{food.styleno}}</p>
                                            <span class="price" style="font-size:11px;color:#888">商品编码：{{food.sku_code}}</span>
                                            <!-- <span class="price"><span style="color:#e75b5a">￥</span><span style="color:#e75b5a;fontSize:18px;">{{food.unit_price}}</span>/{{food.unit}}<span class="retail_price" v-if="food.retail_flag =='Y'">(￥{{food.price}}/{{food.uom_default}})</span></span> -->
                                        </div>
                                    </router-link>
                                    <div class="cartcontrol-wrapper">
                                        <samplecontrol :food="food" @addCart="addFood"></samplecontrol>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </mescroll-vue>
            </div>
        </div>
        <section id="dialogMask" class="dialogMask" v-show="popupSample" @click="popupSample= false"></section>
        <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="dialog-wrapper" id="dialog" v-show="popupSample">
                <div class="dialog-box">
                    <div class="popup">
                        <div class="popup-header">
                            <span>已选样品</span>
                            <span @click="clear" class="iconfont clearpopup">&#xe64d;清空</span>
                        </div>
                        <div class="cart-wrapper" ref="sampleCart">
                            <div>
                                <ul>
                                    <li class="mui-input-row mui-checkbox mui-left" v-for="(car,index) in sample" :key="index">
                                        <label class="sku_name">{{car.sku_name}}</label>
                                        <!-- <input name="checkbox" v-model="car.checked" type="checkbox"> -->
                                        <div class="cartcontrol-wrapper" style=" right: 25px;">
                                            <div class="cartcontrol">
                                                <button class="cart-decrease" @click.stop.prevent="decreaseCart(car,index)">-</button>
                                                <input class="cart-count" type="number" step="1" min="0" :id="car.id" v-model="car.value" @blur="changeValue(car,index,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu = "value=value.replace(/[^\d]+/g,'')"/>
                                                <button class="cart-add" @click.stop.prevent="addCart(car,index)">+</button>
                                            </div>
                                        </div>
                                        <em class="uomDefault">{{car.uom_default}}</em>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <shopBar ref="shopcart" @popupOpen="appear"></shopBar>
    </div>
</template>
<script>
import Header from "@/components/Header";
import BScroll from "better-scroll";
import { Toast ,MessageBox} from "mint-ui";
import shopBar from "@/components/shopBar";
import samplecontrol from "@/components/samplecontrol";
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import { getPcid,isNull } from "../../utils/index";
export default {
    name: "applySimple",
    components: {
        samplecontrol,
        shopBar,
        MescrollVue,
        Header
    },
    data() {
        return {
            popupVisible: false,
            currentIndex: 0,
            curIndex: "",
            mescroll: null, // mescroll实例对象
            mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
                // 上拉加载的配置.
                callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
                //以下是一些常用的配置,当然不写也可以的.
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 10 //每页数据条数,默认10
                },
                //isBounce: false, //此处禁止ios回弹,解析(务必认真阅读,特别是最后一点): http://www.mescroll.com/qa.html#q10
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了 --</p>',
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因;
                // toTop: {
                //     //回到顶部按钮
                //     src: "/static/images/mescroll-totop.png", //图片路径,默认null,支持网络图
                //     offset: 1000 //列表滚动1000px才显示回到顶部按钮
                // },
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
                    icon: "static/images/none.png", //图标,默认null,支持网络图
                    tip: "暂无相关数据~" //提示
                }
            },
            ProductS: [], // 列表数据
            classId: "",
            searchKey: sessionStorage.searchValue?sessionStorage.searchValue:"",
            classTwoId: "",
            classTwoList: "",
            ProductClass: [],
            popupSample: false,
            fakeLoginInfo: this.$store.getters["fakeLoginInfo"]
        };
    },
    computed: {
        sample() {
            return this.$store.state.sample;
        }
    },
    created() {
        this.initClass();
    },
    mounted() {},
    watch: {
        ProductClass: function(val, oldVal) {
            if (this.ProductClass.length > 0 && this.currentIndex == 0) {
                this.classId = this.ProductClass[0].id;
            }
        },
        popupSample: function() {
            this.$nextTick(function() {
                if (this.popupSample) {
                    this._initScroll();
                }
            });
        }
    },
    methods: {
        toShopCart() {
            this.$router.push({ path: "/shopCart" });
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        beforeRouteEnter(to, from, next) {
            // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
            next(vm => {
                vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
            });
        },
        beforeRouteLeave(to, from, next) {
            // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
            this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
            next();
        },
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        back() {
            sessionStorage.searchValue=''
            this.$router.back(-1);
        },
        _initTab() {
            var _index = this.$route.query.tab;
            if (_index) {
                var foodList = this.$refs.foodList;
                var el = foodList[_index];
                this.foodsScroll.scrollToElement(el, 300, 0, 0);
            }
        },
        _initScroll() {
            var self = this;
            self.meunScroll = new BScroll(self.$refs.menuWrapper, {
                click: true,
                probeType: 3
            });
            self.slider = new BScroll(self.$refs.slider, {
                click: true,
                scrollX: true,
                eventPassthrough: "vertical" //忽略竖直方向的滚动
            });
            self.sampleCart = new BScroll(self.$refs.sampleCart, {
                click: true,
                probeType: 3
            });
        },
        selectMenu(index, classId) {
            this.ProductS = [];
            this.popupVisible = false;
            this.classId = classId;
            this.curIndex = "";
            this.searchKey = "";
            sessionStorage.searchValue='';
            this.classTwoId = "";
            this.currentIndex = index;
            this.classTwoList = this.ProductClass[index].classTwoList;
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
        },
        selectSubMenu(index, classTwoId) {
            this.popupVisible = false;
            this.classTwoId = classTwoId;
            this.searchKey = "";
            sessionStorage.searchValue='';
            this.curIndex = index;
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
        },
        // 详情
        godetails: function(id) {
            this.$router.push({
                path: "details",
                query: {
                    id: id
                }
            });
        },
        search(key) {
            if (key) {
                sessionStorage.searchValue=key;
                this.searchKey = key;
                this.classId = "";
                this.currentIndex = "";
                this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
            }
        },
        initClass() {
            let companyId = getPcid();
            //  if (this.$store.getters["fakeLoginInfo"]) {
            //     var companyId = this.$store.getters["fakeLoginInfo"].account
            //         .companyId;
            // } else {
            //     this.$router.push({ path: "/login" });
            // }
            this.$post("/appSaleManGift/saleGiftClass.do", {
                content: '{"companyId":"' + companyId + '"}',
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.ProductClass = response.res.list;
					this.classId = response.res.list[0].id;
                    this.classTwoList = response.res.list[0].classTwoList;
                    this.$nextTick(() => {
                        this._initScroll();
                    });
                } else {
                    Toast("商品加载失败");
                }
            });
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            setTimeout(() => {
                // if (this.$store.getters["fakeLoginInfo"]) {
                //     var companyId = this.$store.getters["fakeLoginInfo"].account
                //         .companyId;
                // } else {
                //     this.$router.push({ path: "/login" });
                // }
                let companyId = getPcid();
                if(this.searchKey){
                    this.classId=''
                    this.classTwoId='';
                    this.currentIndex = -1;
                    this.classTwoList=[];
                }
                let classId = this.classId;
                let _content =
                    '{"companyId":"' +
                    companyId +
                    '","searchKey":"' +
                    this.searchKey +
                    '","classId":"' +
                    classId +
                    '","classTwoId": "' +
                    this.classTwoId +
                    '","pageSize": "' +
                    page.size +
                    '","pageNo": "' +
                    page.num +
                    '"}';
                //此处模拟上拉加载返回的数据
                this.$post("/appSaleManGift/saleClassGiftList.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                })
                    .then(response => {
                        let data = JSON.parse(response);
                        // 请求的列表数据
                        if (data.res && data.res.length > 0) {
                            let arr = data.res;
                            // 如果是第一页需手动制空列表
                            if (page.num === 1) this.ProductS = [];
                            // 把请求到的数据添加到列表
                            this.ProductS = this.ProductS.concat(arr);
                            // 数据渲染成功后,隐藏下拉刷新的状态
                            this.$nextTick(() => {
                                mescroll.endSuccess(arr.length);
                            });
                        } else {
                            this.ProductS = [];
                            this.$nextTick(() => {
                                mescroll.endSuccess(this.ProductS.length);
                            });
                        }
                    })
                    .catch(e => {
                        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                        mescroll.endErr();
                    });
            }, 1000);
        },

        clear() {
            this.$store.commit("clearsample");
            this.popupSample = false;
        },
        appear() {
            this.popupSample = !this.popupSample;
        },
        //辅单位值改变
        changeValue(food, index, e) {
            var value = e.target.value;
            if (food.value.toString().indexOf(".") != -1) {
                    Toast("样品数量只能输入整数");
            }
            food.value = parseInt(value.toString().replace(/[^\d]+/g,""))||0
            if (isNull(food.value)) {
                Toast("样品数量不能为空");
                food.value = 1;
            }
        },
        addCart(food, index) {
            if (food.is_gift == "Y") {
                MessageBox("提示", "赠品时不能修改数量，默认为1");
                return false;
            } else {
                this.$store.commit("addsample", index);
            }
        },
        decreaseCart(food, index) {
            if (this.$store.state.sample[index].value == 1) {
                MessageBox.confirm("确定删除该样品?").then(action => {
                    this.$store.commit("reducesample", index);
                }).catch(() => {
                    // Toast('操作取消');
                });
            } else {
                this.$store.commit("reducesample", index);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.header .shop-car {
    font-size: 24px;
}
.mescroll {
    position: absolute;
    top: 0;
    bottom: 0;
    height: auto;
}
.top-mescroll {
    top: 40px;
}
.popupVisible {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    top: 40px;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    .popWrap {
        background-color: #fff;
        display: flex;
        padding: 10px 0 0 10px;
        justify-content: flex-start;
        flex-flow: row wrap;
        .pop-item {
            background-color: #ddd;
            color: #333;
            width: 88px;
            height: 42px;
            text-align: center;
            // border-radius: 3px;
            margin-bottom: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            &.cur {
                background-color: #ffffff;
                color: @base;
                border: 1px solid @base;
            }
        }
    }
}

.top-bar {
    position: fixed;
    top: 55px;
    right: 0;
    left: 0;
    z-index: 1;
    padding: 0 10px;
    height: 45px;
    border-bottom: 0;
    background-color: transparent;
    .top-bar-box {
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
.tabContent {
    position: fixed;
    top: 98px;
    bottom: 0;
    z-index: 2;
    display: flex;
    overflow: hidden;
    width: 100%;
    flex-flow: row;
    .left {
        float: none;
        overflow-x: hidden;
        width: 70px;
        height: 100%;
        background: #f3f5f7;
        flex: 0 0 70px;
        z-index: 4;
        li {
            position: relative;
            float: none;
            display: table;
            padding: 0 8px;
            width: auto;
            height: 46px;
            border-right: 1px solid #eee;
            text-align: left;
            line-height: 14px;
            span {
                display: table-cell;
                width: 56px;
                color: #333;
                vertical-align: middle;
                font-size: 12px;
            }
            &.cur {
                background-color: #fff;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                border-right: none;
                span {
                    color: @base;
                }
            }
            &.cur:before {
                content: "";
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                width: 3px;
                height: 100%;
                background-color: @base;
            }
        }
    }
    .right {
        float: none;
        flex: 1;
        width: calc(100vw - 70px);
        background: #fff;
        position: relative;
        .fixed-bar {
            position: absolute;
            left: 0;
            right: 0;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            z-index: 2;
            padding-left: 10px;
            .up-down {
                position: absolute;
                height: 100%;
                width: 55px;
                text-align: center;
                top: 0;
                right: 0px;
                font-size: 16px;
                font-weight: 600;
                color: #666666;
                border-left: 1px solid #eee;
                z-index: 4;
                background-color: #ffffff;
            }
            .slider {
                width: 240px;
                height: 100%;
                overflow: hidden;
                .slider-group {
                    position: absolute;
                    left: 10px;
                    top: 0;
                    width: auto;
                    white-space: nowrap;
                    .slider-item {
                        display: inline-block;
                        margin-right: 15px;
                        width: auto;
                        &.cur {
                            color: @base;
                        }
                    }
                }
            }
        }
    }
}
.tab_content {
    pointer-events: auto;
    h1 {
        padding: 5px 10px;
        background-color: #ddd;
        text-align: left;
        font-size: 14px;
    }
}
.shop-count {
    background-color: #eb6000;
    position: absolute;
    width: 0.426667rem;
    height: 0.426667rem;
    padding: 0;
    line-height: 0.426667rem;
    text-align: center;
    left: 0.506667rem;
    top: 0.106667rem;
    font-size: 0.266667rem;
}
.mint-tab-item-icon {
    width: auto;
    height: auto;
    position: relative;
    top: 0;
    left: 0.32rem;
    line-height: 1.253333rem;
}
.tab-icon {
    font-size: 0.8rem;
    display: block;
}
.popup {
    width: 100%;
}
</style>
