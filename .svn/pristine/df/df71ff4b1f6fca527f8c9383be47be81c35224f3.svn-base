<template>
    <div class="search">
        <div class="header">
            <header class="mint-header">
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
                                <input v-focus ref="input" type="search" :placeholder="placeholder" class="mint-searchbar-core" v-model="value" @keyup.enter="search" autofocus="autofocus">
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
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    name: "searchPage",
    props:["placeholder"],
    data() {
        return {
            isShow: true,
            selected: "/",
            value: "",
            ProductS: [],
            tip: false,
            historyList: localStorage.getItem("historyList")
                ? JSON.parse(localStorage.getItem("historyList"))
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
            this.$emit("hide");
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
            if(!this.value){
                Toast("请输入搜索关键词");
                return false;
            }else{
                this.searchVal(this.value);
                this.$emit("handleSearch",this.value)
            }
            
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.search{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    z-index: 9999;
    background-color: #f1f1f1;
}
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
</style>
