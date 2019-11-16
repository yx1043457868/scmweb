<template>
    <div>
        <!-- <Header title="积分商城"></Header> -->
        <div class="header-content">
            <!-- <mt-header title="积分商城">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header> -->
            <header class="mint-header">
                <div class="mint-header-button is-left" @click="back">
                    <button data-v-a23dccce="" class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
                        <label class="mint-button-text"></label>
                    </button>
                </div>
                <h1 class="mint-header-title">积分商城</h1>
                <div class="mint-header-button is-right"></div>
            </header>
        </div>
        <div class="integral-box">
            <router-link class="header-info" to="/pointsInfo">
                <img src="../../../static/images/logo.png" alt="">
                <div class="integral-info">
                    <span class="user-name">{{shopName}}</span>
                    <span class="user-num">总积分：<em>{{totalPoints}}</em></span>
                </div>
                <span class="integral-text"><em>{{ablePoints}}</em>可用积分<i class="iconfont right">&#xe603;</i></span>
            </router-link>
        </div>
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div id="mescroll">
                <div class="integral-wrapper">
                    <div class="hot-list">
                        <ul class="productList clearfix">
                            <li v-for="(item,index) in pointsmallList" :key="index">
                                <div>
                                    <div class="list-img">
                                        <img v-lazy="baseurl+item.picUrl" alt="item.skuName" />
                                    </div>
                                    <div class="goods-info">
                                        <h4 class="list-name mui-ellipsis">{{item.skuName}}</h4>
                                        <p class="list-size mui-ellipsis">{{item.explain}}</p>
                                        <em class="list-price">
                                            <span>{{item.points}}</span>
                                            <span class="unit">积分</span></em>
                                        <div class="cartcontrol-wrapper">
                                            <intercartcontrol :food="item" @addCart="addFood"></intercartcontrol>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </mescroll-vue>
        <interBar ref="shopcart" @popupOpen="appear"> </interBar>
        <section id="dialogMask" class="dialogMask" v-show="popup" @click="popup= false"></section>
        <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="dialog-wrapper" id="dialog" v-show="popup">
                <div class="dialog-box">
                    <div class="popup">
                        <div class="popup-header">
                            <span>已选礼品</span>
                            <span @click="clear" class="iconfont clearpopup">&#xe64d;清空</span>
                        </div>
                        <div class="cart-wrapper" ref="sampleCart">
                            <div>
                                <ul>
                                    <li class="mui-input-row mui-checkbox mui-left" v-for="(car,index) in integrals" :key="index">
                                        <label class="sku_name">{{car.skuName}}</label>
                                        <div class="cartcontrol-wrapper" style=" right: 25px;">
                                            <div class="cartcontrol">
                                                <button class="cart-decrease" @click.stop.prevent="decreaseCart(car,index)">-</button>
                                                <input class="cart-count" type="number" step="1" min="0" :id="car.id" v-model="car.value" @blur="changeValue(car,index,$event)" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')" />
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
        <!-- <emptyBox v-show="addressList.length == 0" tiptext="您还没有收货地址哦！"></emptyBox> -->
    </div>
</template>

<script>
import { Toast, MessageBox } from "mint-ui";
import BScroll from "better-scroll";
import MescrollVue from "mescroll.js/mescroll.vue";
import intercartcontrol from "@/components/intercartcontrol";
import interBar from "@/components/interBar";
import Header from "@/components/Header";
import emptyBox from "@/components/emptyBox";
import {isNull} from "../../utils/index.js";
export default {
    name: "integralList",
    components: {
        Header,
        emptyBox,
        interBar,
        intercartcontrol,
        MescrollVue // 注册mescroll组件
    },
    data() {
        return {
            shopName:"",
            totalPoints:0,
            ablePoints:0,
            mescroll: null, // mescroll实例对象
            mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
                // 上拉加载的配置.
                callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
                //以下是一些常用的配置,当然不写也可以的.
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 4 //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了 --</p>',
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因;
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
                    icon: "static/images/none.png", //图标,默认null,支持网络图
                    tip: "暂无相关数据~" //提示
                }
            },
            popup: false,
            pointsmallList: []
        };
    },
    created() {
        // 获取积分明细
        this.getPointsDetailList();
    },
    computed: {
        integrals() {
            return this.$store.state.integrals;
        }
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
    mounted() {
        // this.$nextTick(() => {
        //     this._initScroll();
        // });
    },
    watch: {
        popup: function() {
            this.$nextTick(() =>{
                if (this.popup) {
                    this._initScroll();
                }
            });
        }
    },
    methods: {
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        getPointsDetailList(){
            let accountObj = this.$store.getters["account"];
            var _content =
                '{"shopId":"' +
                accountObj.shopId +
                '","pageSize": "1","pageNo": "1"}';
            //此处模拟上拉加载返回的数据
            this.$post("/points/pointsDetailList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
            .then(response => {
                let data = JSON.parse(response);
                if(data.optFlag == "yes"){
                     // 请求的列表数据
                    this.totalPoints = data.res.totalPoints ? data.res.totalPoints : 0;
                    this.ablePoints = data.res.ablePoints ? data.res.ablePoints : 0;
                    this.shopName =  data.res.shopName ? data.res.shopName : this.$store.getters['shop'].shop_name;
                }else{
                    Toast(data.optDesc);
                    this.totalPoints = 0;
                    this.ablePoints = 0;
                    this.shopName = this.$store.getters['shop'].shop_name;
                }
            })         
        },
        _initScroll() {
            var self = this;
            self.sampleCart = new BScroll(self.$refs.sampleCart, {
                click: true,
                probeType: 3
            });
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            setTimeout(() => {
                var _content =
                    '{"pageSize": "' +
                    page.size +
                    '","pageNo": "' +
                    page.num +
                    '"}';
                //此处模拟上拉加载返回的数据
                this.$post("/points/pointsmallList.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                })
                    .then(response => {
                        let data = JSON.parse(response);
                        // 请求的列表数据
                        let arr = data.res;
                        // 如果是第一页需手动制空列表
                        if (page.num === 1) this.pointsmallList = [];
                        // 把请求到的数据添加到列表
                        this.pointsmallList = this.pointsmallList.concat(arr);
                        // 数据渲染成功后,隐藏下拉刷新的状态
                        this.$nextTick(() => {
                            mescroll.endSuccess(arr.length);
                        });
                    })
                    .catch(e => {
                        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                        mescroll.endErr();
                    });
            }, 500);
        },
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        },
        clear() {
            this.$store.commit("clearintegrals");
            this.popup = false;
        },
        appear() {
            this.popup = !this.popup;
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
        //辅单位值改变
        changeValue(food, index, e) {
            var value = e.target.value;
            if (food.value.toString().indexOf(".") != -1) {
                    Toast("该商品只能输入整数");
            }
            food.value = parseInt(value.toString().replace(/[^\d]+/g,""))||0
            if (isNull(food.value)) {
                Toast("礼品数量不能为空");
                food.value = 1;
            }
        },
        addCart(food, index) {
            this.$store.commit("addintegrals", index);
        },
        decreaseCart(food, index) {
            if (this.$store.state.integrals[index].value == 1) {
                MessageBox.confirm("确定删除该礼品?").then(action => {
                    this.$store.commit("reduceintegrals", index);
                }).catch(() => {
                    // Toast('操作取消');
                });
            } else {
                this.$store.commit("reduceintegrals", index);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
/*通过fixed固定mescroll的高度*/
.mescroll {
    position: fixed;
    top: 160px;
    bottom: 50px;
    height: auto;
}

.header-content {
    width: 100%;
    height: 150px;
    background: url("../../../static/images/points-bg.jpg") center no-repeat;
    background-size: 100% 100%;
    clip-path: circle(158% at 50% -201%);
    .mint-header {
        background: transparent;
        .mint-button-icon .mintui.mintui-back {
            color: #ffffff;
        }
    }
    .mint-header-title {
        color: #ffffff;
    }
}
.integral-box {
    padding: 10px 10px 0 10px;
    height: 110px;
    margin-top: -100px;
    .header-info {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        z-index: 2;
        padding: 10px;
        img {
            width: 60px;
            height: 60px;
        }
        .integral-info {
            margin-left: 12px;
            flex: 1;
            display: inherit;
            flex-direction: column;
            justify-content: flex-start;
            .user-name {
                font-size: 16px;
                color: #333333;
            }
            .user-num {
                font-size: 13px;
                color: #888888;
                em {
                    color: @base;
                }
            }
        }
        .integral-text {
            vertical-align: middle;
            em {
                color: @base;
            }
            .right {
                color: #888888;
                font-size: 11px;
                vertical-align: middle;
                margin-left: 4px;
            }
        }
    }
}
.integral-wrapper {
    width: 100%;
    overflow: hidden;
    .hot-list {
        position: relative;
        width: 100%;
        min-height: 345px;
        padding-bottom: 90px;
        font-size: 14px;
        padding: 0 0 10px 10px;
        overflow: hidden;
        .productList li {
            width: 50%;
            height: 100%;
            box-sizing: border-box;
            padding: 0;
            overflow: hidden;
            float: left;
            background-color: #f1f1f1;
            border-radius: 22px;
            padding: 5px;
            .list-img {
                z-index: 1;
                // margin-bottom: 7px;
                height: calc((100vw - 150px) / 2);
                width: 100%;
                overflow: hidden;
                position: relative;
                display: block;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    top: 0;
                    right: 0;
                    margin: auto;
                }
            }
            .goods-info {
                position: relative;
                height: auto;
                background-color: #fff;
                padding: 10px;
                h4.list-name {
                    color: #333333;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .list-size {
                    margin-bottom: 4px;
                    color: #999;
                    font-size: 12px;
                    min-height: 21px;
                }
                .list-price {
                    display: inline-block;
                    color: #ff671d;
                    font-size: 15px;
                    font-style: normal;
                    font-weight: 500;
                    margin-top: 12px;
                    .unit {
                        font-size: 12px;
                        color: #999999;
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 10px;
                    bottom: 10px;
                }
            }
        }
    }
}
</style>
