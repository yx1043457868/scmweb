<template>
    <div>
        <footer class="shop_cart">
            <div class="gwcInfo" :class="[preorderCount> 0 ? 'fill' : '']" @click.stop="popupVisible" ><i v-show="preorderCount>0">{{preorderCount}}</i></div>
            <button type="button" @click="commit" :disabled="disabled">抢先拼购</button>
        </footer>
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
import { mapState ,mapGetters} from "vuex";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../utils/index.js";
export default {
    name: "preBar",
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
        ...mapGetters(['preorderCount']),
        disabled(){
            if(this.preorderCount == 0){
                return true;
            }else{
                return false;
            }
        }
    },
    methods: {
        commit(){
            this.$router.push({ path: "/cofirmPreOrder" });
        },
        popupVisible(){
            this.$emit("popupOpen");
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
                    let x = rect.left;
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
footer.shop_cart {
    position: fixed;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 50px;
    background-color: #3a3a3a;
    z-index: 1003;
    div.gwcInfo {
        float: left;
        display: block;
        margin-top: -24px;
        margin-left: 20px;
        width: 72px;
        height: 72px;
        background: url("../../static/images/shop-cart.png") center center no-repeat;
        background-size: 72px 72px;
        color: #ccc;
        cursor: pointer;
        i {
            position: absolute;
            top: -10px;
            left: 75px;
            padding: 0 4px;
            height: 1pc;
            min-width: 15px;
            border-radius: 14px;
            font-size: 9pt;
            line-height: 1pc;
            color: @base;
            border: 1px solid @base;
            background-color: #ffffff !important;
        }
        &.fill {
            background: url("../../static/images/shop-cart-fill.png") center center
                no-repeat;
            background-size: 72px 72px;
        }
    }
    .total {
        float: left;
        overflow: hidden;
        margin-top: 10px;
        margin-left: 10px;
        width: auto;
        color: #fff;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 20px;
    }
    button {
        position: relative;
        z-index: 99;
        float: right;
        width: 105px;
        height: 100%;
        border: 0;
        border-radius: 0;
        background-color: #ff671d;
        color: #fff;
        font-size: 14px;
    }
}
.ball-container {
    .ball {
        position: fixed;
        left: -15px;
        bottom: 36px;
        z-index: 800;
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
