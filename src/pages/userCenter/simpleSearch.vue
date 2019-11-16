<template>
    <div>
        <div class="header">
            <header class="mint-header">
                <div class="mint-header-button is-left" @click="back">
                    <button class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon">
                            <i class="mintui mintui-back"></i>
                        </span>
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
                            <a class="mint-searchbar-cancel" @click="search" v-show="value !=''">搜索</a>
                        </div>
                    </form>
                    <iframe name='frameFile' style="display: none;"></iframe>
                </div>
            </header>
        </div>
        <div class="my-content">
            <div class="search-key" v-if="isShow">
                <div class="clearfix">
                    <span class="mui-pull-left">历史搜索记录</span>
                    <span class="mui-pull-right clearHis" @click="clearHis">清空历史</span>
                </div>
                <ul class="key-box">
                    <li class="search-item" v-for="(item,index) in historyList" :key="index" @click="keySearch(item)">
                        <span>{{item}}</span>
                    </li>
                </ul>
            </div>
            <div class="order-wrapper">
                <ul class="productList clearfix">
                    <li v-for="(item,index) in ProductS" :key="index" :sku_code="item.sku_code" :class_id="item.class_id">
                        <div class="list-img">
                            <img v-lazy="baseurl+item.imgPath" alt="推荐购买" />
                        </div>
                        <div class="goods-info">
                            <h4 class="list-name mui-ellipsis">{{item.skuName}}</h4>
                            <p class="list-size mui-ellipsis">规格：{{item.styleno}}</p>
                            <p class="list-size mui-ellipsis" style="height:21px">{{item.giftDesc}}</p>
                            <!-- <p class="blue">{{item.supplier_name}}</p> -->
                            <em class="list-price">
                                <span>￥</span>{{item.price}}
                                <span class="unit">/{{item.uomDefault}}</span>
                            </em>
                            <div class="cartcontrol-wrapper" v-if="item.surplusNum !=0">
                                <sampleList :food="item" @addCartx="addFood"></sampleList>
                            </div>
                            <div class="cartcontrol-wrapper" v-if="item.surplusNum ==0">
                                <span class="hadTake">已领完</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <emptyBox v-show="tip" tiptext="亲,暂无相关数据哦~"></emptyBox>
        <Tabbar :selected="selected" ref="shopcart" v-show="false"></Tabbar>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import Tabbar from "@/components/Tabbar";
import cartcontrol from "@/components/cartcontrol";
import emptyBox from "@/components/emptyBox";
import { getPcid } from "../../utils/index.js";
export default {
    name: "Search",
    components: {
        cartcontrol,
        emptyBox,
        Tabbar
    },
    data() {
        return {
            isShow: true,
            selected: "/",
            value: "",
            ProductS: [],
            tip: false,
            historyList: localStorage.getItem("SimpleHistoryList")
                ? JSON.parse(localStorage.getItem("SimpleHistoryList"))
                : []
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
    created() {},
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
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
                "SimpleHistoryList",
                JSON.stringify(this.historyList)
            );
        },
        searchVal(val) {
            val = val.trim(); // 清除空格
            if (val == "") {
                return;
            }
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
                "SimpleHistoryList",
                JSON.stringify(this.historyList)
            );
        },
        search() {
            let companyId = getPcid(),
                owner = "";
            this.$store.state.logindata
                ? (owner = this.$store.state.logindata.company.owner)
                : (owner = "");
            var _content =
                "{'companyId':'" +
                companyId +
                "','queryParam':'" +
                this.value +
                "',}";
            this.searchVal(this.value);
            this.isShow = false;
               this.$router.replace({
                path: "/applySimple",
                query: {
                    goodName:this.value
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.mint-search {
    width: 100%;
    height: 45px;
    .mint-searchbar {
        padding: 6px 10px;
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
.productList li {
    margin: 4px 0 0 0;
    width: calc((100vw - 20px) / 2);
    height: 100%;
    box-sizing: border-box;
    padding: 0;
    overflow: hidden;
    float: left;
    background-color: #ffffff;
    border-radius: 5px;
    margin-left: 8px;
    &:nth-of-type(2n) {
        margin-left: 4px;
    }
    .list-img {
        z-index: 1;
        margin-bottom: 7px;
        height: calc((100vw - 70px) / 2);
        overflow: hidden;
        position: relative;
        display: block;
        img {
            display: block;
            width: auto;
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
            font-size: 14px;
            line-height: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .list-size {
            margin-bottom: 4px;
            color: #999;
            font-size: 10px;
        }
        .list-price {
            display: inline-block;
            color: #ff671d;
            font-size: 15px;
            font-style: normal;
            margin-top: 12px;
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 10px;
            bottom: 7px;
        }
    }
}
</style>
