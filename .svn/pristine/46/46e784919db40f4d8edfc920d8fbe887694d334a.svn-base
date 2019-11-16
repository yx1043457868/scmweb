<template>
    <div>
        <Header title="常购清单"></Header>
        <div class="my-content">
            <ul class="goods-list" id="goodsList">
                <li class="mui-table-view-cell" v-for="(food,index) in ProductS" :pid="food.id" :key="index" :chag="food.equation_factor" :class_id="food.class_id">
                    <router-link :to='{path:"/detail",query:{id:food.id}}'>
                        <div class="food-link">
                            <img v-lazy="baseurl+food.img_path">
                            <div class="recommend">
                                <h4 class="skuName">{{food.sku_name}}</h4>
                                <p class="styleno">规格：{{food.styleno}}</p>
                                <p class="styleno">已购次数：{{food.count2?food.count2:0}}</p>
                                <div class="price"><span style="color:#e75b5a">￥</span><span style="color:#e75b5a;fontSize:18px;">{{food.unit_price}}</span><span>/{{food.unit}}</span></div>
                                <!-- <span class="blue">{{food.supplier_name}}</span> -->
                            </div>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cartcontrol :food="food" @addCart="addFood"></cartcontrol>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <emptyBox v-show="tip" tiptext="亲,暂无相关数据哦~"></emptyBox>
        <cartBox ref="shopcart"></cartBox>
    </div>
</template>

<script>
import Header from "@/components/Header";
import { Toast } from "mint-ui";
import cartcontrol from "@/components/cartcontrol";
import emptyBox from "@/components/emptyBox";
import cartBox from "@/components/cartBox";
import { getPcid } from "../../utils/index.js";
export default {
    name: "Search",
    components: {
        Header,
        cartcontrol,
        emptyBox,
        cartBox
    },
    data() {
        return {
            selected: "/",
            value: "",
            ProductS: [],
            tip: false
        };
    },
    created() {
        this.getBuyProduct();
    },
    methods: {
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        getBuyProduct() {
            let companyId = getPcid();
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            var _content =
                "{'companyId':'" + companyId + "','shopId':'" + shopId + "'}";
            this.$post("/appVpProduct/alwarysByProductList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    if (response.res.suggestList.length > 0) {
                        this.tip = false;
                        this.ProductS = response.res.suggestList;
                    } else {
                        this.tip = true;
                        this.ProductS = [];
                    }
                } else {
                    Toast({
                        message: "商品查询失败",
                        duration: 1000
                    });
                    this.tip = true;
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
