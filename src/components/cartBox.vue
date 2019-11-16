<template>
    <div>
        <div class="cart-icon" @click="toShopCart">
            <i class="iconfont">&#xe635;</i>
            <mt-badge size="small" type="error" class="shop-count">{{shopCount | countFormat}}</mt-badge>
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
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../utils/index.js";
export default {
    name: "cartBox",
    props: ["title"],
    data() {
        return {
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
    computed: {
        ...mapGetters(["shopCount"]),
    },
    methods: {
        toShopCart() {
            this.$router.push({ path: "/shopCart" });
        },
        back() {
            this.$store.commit("settlement");
            this.$router.back(-1);
        },
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
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
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
.cart-icon {
    position: fixed;
    width: 40px;
    height: 40px;
    line-height: 40px;
    left: 55px;
    bottom: 15px;
    z-index: 50;
    background-color: rgba(235, 96, 0, 0.7);
    box-shadow: 2px 1px 10px #eb6000;
    border:2px solid #eb6000;
    border-radius: 50%;
    text-align: center;
    i {
        font-size: 36px;
        color: #fff;
    }
    .shop-count{
        // background-color: #eb6000;
        position: absolute;
        min-width: 16px;
        width: auto;
        height: 16px;
        padding: 0;
        line-height: 16px;
        text-align: center;
        top: -4px;
        right: 0;
        font-size: 10px;
        color: @base;
        border: 1px solid @base;
        background-color: #ffffff !important;
    }
}
.ball-container {
    .ball {
        position: fixed;
        left: -15px;
        bottom: 30px;
        z-index: 1000;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.4); //贝塞尔曲线
        .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #eb6000;
            transition: all 0.6s linear;
        }
    }
}
</style>
