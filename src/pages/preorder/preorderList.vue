<template>
    <div>
        <!-- <Header title="拼猪猪"></Header> -->
        <div class="header">
            <mt-header title="拼猪猪">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header>
        </div>
        <div class="my-content">
            <div class="time-box">
                <div class="month-round">
                    <span class="start-time">{{start_time | formatMonth}}</span>-<span class="end-time">{{end_time | formatMonth}}</span>
                </div>
                <span class="content">{{content}}</span>
            </div>
           
            <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
                <div id="mescroll">
                    <div class="order-wrapper" style="padding-top:0">
                        <ul class="goods-list" id="goodsList">
                            <li>
                                <img src="../../../static/images/jifen.jpg" class="jifenImg"/>
                            </li>
                            <li class="mui-table-view-cell" v-for="(food,index) in preorderList" :pid="food.id" :key="index">
                                <router-link :to='{path:"/preDetail",query:{id:food.id}}'>
                                    <div class="food-link">
                                        <img v-lazy="baseurl+food.imgPath">
                                        <!-- <span class="is_pre">预购</span> -->
                                        <div class="recommend">
                                            <h4 class="skuName">{{food.skuName}}</h4>

                                            <p class="styleno">规格：{{food.styleno}}</p>
                                            <p class="tip">{{food.minNum}}{{food.unit}}起拼购 <span>下单预付{{food.preScale}}%保价</span> <span>{{food.deliverDay}}天内到货</span></p>
                                            <p class="styleno">{{food.lightMark}}</p>
                                            <!-- <div class="price"><span >￥{{food.preunitPrice}}/{{food.unit}}<em>￥{{food.unitPrice}}/{{food.unit}}</em></span></div> -->
                                            <div class="price"><span style="color:#e75b5a;fontSize:14px;">￥{{food.preunitPrice ? food.preunitPrice : 0}}/{{food.unit}}</span>
                                                <!-- <em>￥{{food.unitPrice}}/{{food.unit}}</em> -->
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <precartcontrol :food="food" @addCart="addFood"></precartcontrol>
                                    </div>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </mescroll-vue>
        </div>
        <section id="dialogMask" class="dialogMask" v-show="popupPre" @click="popupPre= false"></section>
        <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="dialog-wrapper" id="dialog" v-show="popupPre">
                <div class="dialog-box">
                    <div class="popup">
                        <div class="popup-header">
                            <span>已选商品</span>
                            <span @click="clear" class="iconfont clearpopup">&#xe64d;清空</span>
                        </div>
                        <div class="cart-wrapper" ref="sampleCart">
                            <div>
                                <ul>
                                    <li class="mui-input-row mui-checkbox mui-left" v-for="(car,index) in preorder" :key="index">
                                        <label class="sku_name">{{car.skuName}}</label>
                                        <div class="cartcontrol-wrapper" style="right: 25px;">
                                            <div class="cartcontrol">
                                                <button class="cart-decrease" @click.stop.prevent="decreaseCart(car,index)">-</button>
                                                <input class="cart-count" type="number" step="1" min="0" :id="car.id" v-model="car.value" @blur="changeValue(car,index,$event)" onkeyup="value=value.replace(/[^\d]+/g,'')" onpaste="value=value.replace(/[^\d]+/g,'')" oncontextmenu="value=value.replace(/[^\d]+/g,'')" />
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
        <preBar ref="shopcart" @popupOpen="appear"></preBar>
    </div>
</template>

<script>
import Header from "@/components/Header";
import { Toast, MessageBox } from "mint-ui";
import preBar from "@/components/preBar";
import BScroll from "better-scroll";
import precartcontrol from "@/components/precartcontrol";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    getPcid,
    formatMonth
} from "../../utils/index.js";
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
    name: "preorderList",
    components: {
        Header,
        precartcontrol,
        preBar,
        MescrollVue
    },
    data() {
        return {
            flag: false,
            start_time: 0.0,
            end_time: 0.0,
            content: "0天00小时00分00秒",
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
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了 --</p>',
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因;

                toTop: {
                    //回到顶部按钮
                    src: "/static/images/mescroll-totop.png", //图片路径,默认null,支持网络图
                    offset: 1000 //列表滚动1000px才显示回到顶部按钮
                },
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
                    icon: "/static/images/none.png", //图标,默认null,支持网络图
                    tip: "本期团购已结束，下期即将开团" //提示
                }
            },
            popupPre: false,
            preorderList: []
        };
    },
    computed: {
        preorder() {
            return this.$store.state.preorder;
        }
    },
    watch: {
        popupPre: function() {
            this.$nextTick(function() {
                if (this.popupPre) {
                    this._initScroll();
                }
            });
        }
    },
    filters: {
        formatMonth: function(v) {
            if (!v) return `00.00`;
            //2把字符串格式转换为日期类
            v = v.replace(new RegExp(/-/gm), "/");
            //解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题
            var time = new Date(v);
            return formatMonth(time, 1);
        }
    },
    created() {
        this.selectAppPreactivity();
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
    methods: {
        back(){
             this.$router.push({ path: "/" });
        },
        countdowm(timestamp) {
            let self = this;
            let timer = window.setInterval(function() {
                let nowTime = new Date();
                timestamp = timestamp.replace(new RegExp(/-/gm), "/");
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
                    self.content = "距结束还剩 " + format;
                } else {
                    window.clearInterval(timer);
                    self.content = "活动已结束";
                }
            }, 1000);
        },
        getTimeDay(timestamp){
            let now = new Date();
            let nowTime = new Date(now.getFullYear()+"/"+(now.getMonth()*1+1)+"/"+now.getDate());
            timestamp = timestamp.replace(new RegExp(/-/gm), "/");
            let endTime = new Date(timestamp);
            let t = endTime.getTime() - nowTime.getTime();
            if (t > 0) {
                let day = Math.floor(t / 1000 / 60 / 60 / 24); //计算剩余的天数
                let hour = Math.floor((t / 1000 / 60 / 60) % 24); //计算剩余的小时数
                let min = Math.floor((t / 1000 / 60) % 60); //计算剩余的分钟数
                let sec = Math.floor((t / 1000) % 60); //计算剩余的秒数
                // hour = hour < 10 ? "0" + hour : hour;
                // min = min < 10 ? "0" + min : min;
                // sec = sec < 10 ? "0" + sec : sec;
                let format = "";
                if (day > 0) {
                    format = day;
                    return format
                }else{
                    return 1
                }
            } else {
                return 1
            }
        },
        clear() {
            this.$store.commit("clearPreOrder");
            this.popupPre = false;
        },
        _initScroll() {
            var self = this;
            self.sampleCart = new BScroll(self.$refs.sampleCart, {
                click: true,
                probeType: 3
            });
        },
        appear() {
            this.popupPre = !this.popupPre;
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
            food.value = parseInt(value.toString().replace(/[^\d]+/g, "")) || 0;
            if (food.value == 0 || food.value == "") {
                Toast("礼品数量数量不能为空");
                food.value = 1;
            }
        },
        addCart(food, index) {
            this.$store.commit("addPreorder", index);
        },
        decreaseCart(food, index) {
            if (this.$store.state.preorder[index].value > food.minNum) {
                this.$store.commit("reducePreorder", index);
            } else {
                MessageBox.confirm(
                    food.minNum + food.unit + "起预购,确定要删除该商品?"
                )
                    .then(action => {
                        this.$store.commit("deletePreOrder", index);
                    })
                    .catch(() => {
                        // Toast('操作取消');
                    });
            }
            // if (this.$store.state.preorder[index].value <= food.minNum) {

            // } else {

            // }
        },
        selectAppPreactivity() {
            // 联网请求
            var _content = "{}";
            //此处模拟上拉加载返回的数据
            this.$post("/appPreOrder/selectAppPreactivity.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    if (data.optFlag == "yes") {
                        // 请求的列表数据
                        this.start_time = data.res.startTime
                            ? data.res.startTime
                            : 0.0;
                        this.end_time = data.res.endTime
                            ? data.res.endTime
                            : 0.0;
                        this.countdowm(data.res.endTime);
                    } else {
                        this.$store.commit("clearPreOrder"); //清空采购单
						// MessageBox({
						//   title: '提示',
						//   message: '本期团购已结束，下期即将开团',
						//   closeOnClickModal:false
						// });
                    }
                })
                .catch(e => {});
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            let owner = this.$store.getters["company"].owner || 5500450;
            var _content =
                '{"owner":"' +
                owner +
                '","pageSize": "' +
                page.size +
                '","page": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/appPreOrder/selectAppPreProductList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    let arr = data.res.list;
                   arr&&arr.map((item,index)=>{
                        item.deliverDay=this.getTimeDay(item.sendEndtime)
                        return item
                    })
                    // 请求的列表数据
                    if (data.optFlag == "yes") {
                        // 如果是第一页需手动制空列表
                        if (page.num === 1) this.preorderList = [];
                        // 把请求到的数据添加到列表
                        this.preorderList = this.preorderList.concat(arr);
                        // 数据渲染成功后,隐藏下拉刷新的状态
                        this.$nextTick(() => {
                            mescroll.endSuccess(arr.length);
                        });
                    } else {
                        this.preorderList = [];
                        this.$nextTick(() => {
                            mescroll.endSuccess(0);
                        });
                    }
                })
                .catch(e => {
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr();
                });
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
    top: 90px;
    bottom: 60px;
    height: auto;
}
.time-box {
    display: flex;
    height: 28px;
    margin: 8px 15px;
    // padding: 0 10px;
    background-color: rgba(235, 96, 0, 0.1);
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid @base;
    z-index: 9;
    .month-round {
        display: inherit;
        align-items: center;
        background-color: @base;
        width: auto;
        height: 100%;
        flex: 0 0 auto;
        color: #fff;
        padding: 0 10px;
        span {
            color: #fff;
        }
    }
    .content {
        flex: 1;
        text-align: center;
        color: @base;
    }
}
.jifenImg{
    width:100%;
    height:150px;
}
</style>
