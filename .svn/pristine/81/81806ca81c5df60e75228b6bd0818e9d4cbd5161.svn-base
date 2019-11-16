<template>
    <div>

        <div class="mint-tabbar tabbar is-fixed">
            <router-link :to="{path:'/',query:{pcid:pcid}}" class="mint-tab-item" :class="[active === '/' ? 'is-selected' : '']">
                <div class="mint-tab-item-icon"><i class="iconfont tab-icon">&#xe634;</i></div>
                <div class="mint-tab-item-label">
                    主页
                </div>
            </router-link>
            <router-link to="/classify" class="mint-tab-item" :class="[active === '/classify' ? 'is-selected' : '']">
                <div class="mint-tab-item-icon"><i class="iconfont tab-icon">&#xe627;</i></div>
                <div class="mint-tab-item-label">
                    分类
                </div>
            </router-link>
            <router-link to="/shopCart" class="mint-tab-item" :class="[active === '/shopCart' ? 'is-selected' : '']">
                <div class="mint-tab-item-icon"><i class="iconfont tab-icon">&#xe61e;</i>
                    <mt-badge size="small" type="error" class="shop-count" v-show="shopCount > 0">{{shopCount | countFormat}}</mt-badge>
                </div>
                <div class="mint-tab-item-label">
                    采购单
                </div>
            </router-link>
            <router-link to="/userCenter" class="mint-tab-item" :class="[active === '/userCenter' ? 'is-selected' : '']">
                <div class="mint-tab-item-icon"><i class="iconfont tab-icon">&#xe646;</i></div>
                <div class="mint-tab-item-label">
                    我的
                </div>
            </router-link>
        </div>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getPcid } from "../utils/index.js";
export default {
    name: "Tabbar",
    data() {
        return {
            active: this.selected,
            titleText: "",
            pcid:getPcid(),
            balls: [
                { show: false },
                { show: false },
                { show: false },
                { show: false },
                { show: false }
            ],
            dropBalls: []
        };
    },
    props: {
        selected: {
            type: String,
            required: true,
            default: "/"
        }
    },
    computed: {
        // shopCount() {
        //     let sum = 0;
        //     this.$store.state.carts.forEach(cart => {
        //         sum += parseFloat(cart.value);
        //     });
        //     return sum;
        // },
        ...mapGetters(["shopCount"])
        // ...mapState({
        //     shopCount: function(state) {
        //         let sum = 0;
        //         state.carts.forEach(cart => {
        //             sum += parseFloat(cart.value);
        //         });
        //         return sum;
        //     }
        // })
    },
    watch: {
        $route() {
            // this.selected = sessionStorage.getItem("pageUrl");
        },
        active: function(val, oldVal) {
            // 这里就可以通过 val 的值变更来确定
            this.$router.push({
                path: val,
            });
            // this.titleText = sessionStorage.getItem("pageTitle");
        }
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeDrop(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 220;
                    let y = -(window.innerHeight - rect.top - 52);
                    el.style.display = "";
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName("inner-hook")[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping(el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = "translate3d(0,0,0)";
                el.style.transform = "translate3d(0,0,0)";
                let inner = el.getElementsByClassName("inner-hook")[0];
                inner.style.webkitTransform = "translate3d(0,0,0)";
                inner.style.transform = "translate3d(0,0,0)";
                el.addEventListener("transitionend", done);
            });
        },
        afterDrop(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = "none";
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.tabbar {
    height: 45px;
    z-index: 99;
    .mint-tab-item {
        padding: 4px 0;
        width: 22px;
        height: 22px;
        .tab-icon {
            font-size: 20px;
            display: block;
            position: relative;
            top: 2px;
        }
        .tab-text {
            font-size: 12px;
        }
        .mint-tab-item-icon {
            width: auto;
            position: relative;
            margin-bottom: 0;
        }
        .mint-tab-item-label {
            font-size: 11px;
        }
        .shop-count {
            position: absolute;
            min-width: 16px;
            width: auto;
            height: 16px;
            padding: 0;
            line-height: 16px;
            text-align: center;
            top: -4px;
            right: 23%;
            font-size: 10px;
            color: @base;
            border: 1px solid @base;
            background-color: #ffffff !important;
        }
    }
}
.ball-container {
    .ball {
        position: fixed;
        left: 220px;
        bottom: 28px;
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.14); //贝塞尔曲线
        .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #ff671d;
            transition: all 0.6s linear;
        }
    }
}
</style>
