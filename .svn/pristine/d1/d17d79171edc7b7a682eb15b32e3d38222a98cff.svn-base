<template>
    <div class="cartcontrol">
        <button class="cart-btn" @click.stop.prevent="addCart($event,food)"><span>免费拿样</span></button>
    </div>
</template>

<script type="text/ecmascript-6">
// import Vue from "vue";
const Vue = require("vue")
import {Toast, MessageBox } from "mint-ui";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../utils/index.js";
export default {
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart(event, food) {
            if (food.is_enable == "N") {
                Toast({
                    message: "该商品已下架！",
                    duration: 950
                });
                return false;
            } else {
                var foodIndex = this.$store.state.sample.findIndex(todo => {
                    return todo.giftId == food.giftId;
                });
                //foodIndex为-1表示不存在 ,要加入商品
                if (foodIndex === -1 || foodIndex == null || foodIndex == undefined) {
                    food.value = 1;
                    food.checked = true;
                    this.$store.commit("addsampleCarts", food);
                    // data传给vuex状态里,然后vuex通过localstorage setItem存
                    this.$emit("addCart", event.target); // 向父组件触发一个自定义的cart-add事件，同时将事件对象传递给父组件this.$emit("addCart", event.target); // 向父组件触发一个自定义的cart-add事件，同时将事件对象传递给父组件
                } else {
                    if (food.is_gift == "Y") {
                        MessageBox("提示", "赠品时不能修改数量，默认为1");
                        food.value = 1;
                        return false;
                    }
                    food.checked = true;
                    this.$store.commit("addsample", foodIndex);
                    this.$emit("addCart", event.target); // 向父组件触发一个自定义的cart-add事件，同时将事件对象传递给父组件
                }
            }
        },
    }
};
</script>
<style scoped lang="less">
.cartcontrol {
    bottom: -4px !important;
    right: -4px !important;
    border: none;
    height: auto;
    .cart-btn {
        outline: 0;
        span{
            display: block;
            line-height: 24px;
            height: 24px;
            text-align: center;
            border: 1px solid #ff671d;
            border-radius: 3px;
            width: 60px;
            font-size: 12px;
            color: #ff671d;
            overflow: hidden;
        }
    }
}
</style>
