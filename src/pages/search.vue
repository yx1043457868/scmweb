<template>
    <div>
        <div class="header">
            <header class="mint-header search-header">
                <div class="mint-header-button is-left" @click="back">
                    <button class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
                        <label class="mint-button-text"></label>
                    </button>
                </div>
                <div class="mint-search">
                    <form action="" target="frameFile">
                        <div class="mint-searchbar">
                            <div class="mint-searchbar-inner">
                                <i class="mintui mintui-search"></i>
                                <input v-focus ref="input" type="search" placeholder="输入食材名称/编码/拼音搜索" class="mint-searchbar-core" v-model="value" @keyup.enter="search" autofocus="autofocus">
                            </div>
                            <a class="mint-searchbar-cancel" @click="search">搜索</a>
                        </div>
                    </form>
                    <iframe name='frameFile' style="display: none;"></iframe>
                </div>
            </header>
        </div>
        <div class="my-content">
            <div class="search-key" v-if="isShow">
                <div class="clearfix"><span class="mui-pull-left">历史搜索记录</span><span class="mui-pull-right clearHis" @click="clearHis">清空历史</span></div>
                <ul class="key-box">
                    <li class="search-item" v-for="(item,index) in historyList" :key="index" @click="keySearch(item)"><span>{{item}}</span></li>
                </ul>
            </div>
            <div>
                <ul class="goods-list" id="goodsList">
                    <li class="mui-table-view-cell search-li" v-for="(food,index) in ProductS" :pid="food.id" :key="index" :chag="food.equation_factor" :class_id="food.class_id">
                        <router-link :to='{path:"/detail",query:{id:food.id}}'>
                            <div class="food-link">
                                <img v-lazy="baseurl+food.img_path">
                                <div class="recommend">
                                    <h4 class="skuName">{{food.sku_name}}</h4>                                  
                                    <p class="styleno">规格：{{food.styleno}}</p><br>
                                    <span class="tag" v-if="food.full_gift && JSON.parse(food.full_gift).requireType != 2">满赠</span>
                                    <span class="tag" v-else-if="food.full_gift && JSON.parse(food.full_gift).requireType == 2">满减</span>
                                    <span class="price" v-show="registerFlag"><span v-show="shopType!=4" style="font-size:12px;">会员价：</span>￥{{food.unit_price}}/{{food.unit}}</span>
                                    <span class="price" v-show="!registerFlag">价格:登录后可见</span>
                                </div>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food" @addCart="addFood"></cartcontrol>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <emptyBox v-show="tip" tiptext="亲,暂无相关数据哦~"></emptyBox>
        <cartBox ref="shopcart"></cartBox>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import cartBox from "@/components/cartBox";
import cartcontrol from "@/components/cartcontrol";
import emptyBox from "@/components/emptyBox";
import { getPcid } from "../utils/index.js";
export default {
    name: "Search",
    components: {
        cartcontrol,
        emptyBox,
        cartBox
    },
    data() {
        return {
            isShow: true,
            registerFlag: this.$store.getters["company"] ? true : false,
            selected: "/",
            value: sessionStorage.searchValue?sessionStorage.searchValue:'',
            ProductS: [],
            tip: false,
            historyList: localStorage.getItem("historyList")
                ? JSON.parse(localStorage.getItem("historyList"))
                : [],
            shopType:this.$store.getters["shop"].shopType ? this.$store.getters["shop"].shopType:4
        };
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function(el) {
                el.focus();
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.input.focus();
        });
    },
    created() {
        this.search();
    },
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                sessionStorage.searchValue='';
                this.$router.back(-1);
            }
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
        keySearch(val) {
            this.value = val;
            this.search();
        },
        clearHis() {
            this.historyList = [];
            localStorage.setItem(
                "historyList",
                JSON.stringify(this.historyList)
            );
        },
        searchVal(val) {
            val = val.trim(); // 清除空格
            if (this.historyList.length > 0) {
                // 有数据的话 判断
                if (this.historyList.indexOf(val) !== -1) {
                    // 有相同的，先删除 再添加
                    this.historyList.splice(this.historyList.indexOf(val), 1);
                    this.historyList.unshift(val);
                } else {
                    // 没有相同的 添加
                    this.historyList.unshift(val);
                }
            } else {
                // 没有数据 添加
                this.historyList.unshift(val);
            }
            if (this.historyList.length > 6) {
                // 保留六个值
                this.historyList.pop();
            }
            localStorage.setItem(
                "historyList",
                JSON.stringify(this.historyList)
            );
        },
        search() {
            let  owner = "";
            if(!this.value){
                // Toast("请输入搜索关键词");
                return false;
            }
            sessionStorage.searchValue=this.value;
            let companyId = getPcid();
            this.$store.state.logindata
                ? (owner = this.$store.state.logindata.company.owner)
                : (owner = "");
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let shopType=this.$store.getters["shop"].shopType
                ? this.$store.getters["shop"].shopType
                : "";
            var _content =
                "{'companyId':'" +
                companyId +
                "','skuname':'" +
                this.value +
                "','shopId':'" + shopId + "','shopType':'" + shopType + 
                "','owner':'" +
                owner +
                "','skucode':''}";
            this.searchVal(this.value);
            this.isShow = false;
            this.$post("/appVpProduct/productList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                // console.log(response);
                if (response.optFlag == "yes") {
                    if (response.res.list.length > 0) {
                        this.tip = false;
                        this.ProductS = response.res.list;
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
.search-header{
    background: linear-gradient(90deg,#fc9105,#f35410);
    .mint-button-icon .mintui.mintui-back {
        color: #ffffff;
    }
}
.mint-search {
    width: 100%;
    height: 45px;
    .mint-searchbar {
        padding: 6px 10px;
        background: linear-gradient(90deg,#fc9105,#f35410);
        input {
            color: #333;
        }
    }
}
.search-key {
    font-size: 12px;
    padding: 10px;
    .clearHis {
        background: #ddd;
        width: auto;
        padding: 4px 15px;
        line-height: 14px;
        text-align: center;
        border-radius: 10px;
    }
    .key-box {
        display: flex;
        justify-content: flex-start;
        flex-flow: row wrap;
        padding: 20px 0;
    }
    .search-item {
        background: #ddd;
        width: auto;
        min-width: 60px;
        padding: 4px 15px;
        margin-right: 15px;
        line-height: 14px;
        text-align: center;
        border-radius: 10px;
        margin-bottom: 10px;
        span {
            font-size: 12px;
        }
    }
}
</style>
