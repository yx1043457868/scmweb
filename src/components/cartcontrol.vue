<template>
    <div class="cartcontrol">
        <!-- <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart(food)"><i class="iconfont reduce">&#xe652;</i></div>
        </transition>
        <input class="cart-count" type="tel" v-show="food.count>0" v-model="food.count" @click.stop.prevent="change(food)" /> -->
        <!-- <div class="cart-add" @click.stop.prevent="addCart(food)"><i class="iconfont plus">&#xe657;</i></div> -->
        <button class="cart-btn" @click.stop.prevent="addCart($event,food)"><i class="iconfont addCart">&#xe635;</i></button>
    </div>
</template>

<script>
// import Vue from "vue";
const Vue = require("vue")
import { Toast, MessageBox } from "mint-ui";
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
                // 通知后台，回调成功后执行下面的函数
                if (!this.food.count) {
                    Vue.set(this.food, "count", 1);
                } else {
                    this.food.count++;
                }
                
                var foodIndex = this.$store.state.carts.findIndex(todo => {
                    return todo.id == food.id;
                });
                //foodIndex为-1表示不存在 ,要加入商品
                if (foodIndex === -1 || foodIndex == null || foodIndex == undefined) {
                    food.value = 1;
                    food.checked = true;
                    this.$store.commit("addcarts", food);
                    // data传给vuex状态里,然后vuex通过localstorage setItem存
                    Toast({
                        message: "加入采购单成功！",
                        // iconClass: "icon icon-success",
                        duration: 950
                    });
                    this.$emit("addCart", event.target); // 向父组件触发一个自定义的cart-add事件，同时将事件对象传递给父组件
                } else {
                    // if (food.is_gift == "Y") {
                    //     MessageBox("提示", "赠品时不能修改数量，默认为1");
                    //     food.value = 1;
                    //     return false;
                    // }
                    food.checked = true;
                    this.$store.commit("add", foodIndex);
                    Toast({
                        message: "加入采购单成功！",
                        // iconClass: "icon icon-success",
                        duration: 950
                    });
                    this.$emit("addCart", event.target); // 向父组件触发一个自定义的cart-add事件，同时将事件对象传递给父组件
                }
            }
        },
        decreaseCart(food) {
            if (this.food.count) {
                this.food.count--;
            }
            var foodIndex = this.$store.state.carts.findIndex(todo => {
                return todo.id == food.id;
            });
            //foodIndex为-1表示不存在 ,要加入商品
            if (foodIndex === -1) {
                // var data = {
                //     id: food.id,
                //     name: food.name,
                //     price: this.goodDetails[index].price,
                //     imgone: this.goodDetails[index].imgone,
                //     value: 1
                // };
                // food.value = 1;
                // this.$store.commit("addcarts", food);
                // data传给vuex状态里,然后vuex通过localstorage setItem存
                // Toast({
                //     message: "加入采购单成功！",
                //     // iconClass: "icon icon-success",
                //     duration: 950
                // });
            } else {
                this.$store.commit("reduce", foodIndex);
            }
        }
    }
};
</script>
<style scoped lang="less">
.cartcontrol {
    bottom: -4px !important;
    right: -4px !important;
    border: none;
    height: auto !important;
    .cart-btn {
        width: 32px;
        height: 32px;
        background-color: #eb6000;
        display: flex;
        align-items: center;
        line-height: 32px;
        border-radius: 50%;
        i.addCart {
            font-size: 32px !important;
            font-weight: 500;
            color: #ffffff;
        }
    }
}
</style>
