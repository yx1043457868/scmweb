<template>
    <div>
        <div class="mint-search fixed">
            <form action="" target="frameFile">
                <div class="mint-searchbar">
                    <div class="mint-searchbar-inner">
                        <i class="mintui mintui-search"></i>
                        <input id="search" type="search" placeholder="输入食材名称/编码/拼音搜索" class="mint-searchbar-core" v-model="value" @keyup.enter="search" autofocus="autofocus">
                    </div>
                    <a class="mint-searchbar-cancel" @click="$router.back(-1)" v-show="value !=''">取消</a>
                </div>
            </form>
            <iframe name='frameFile' style="display: none;"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: "Search",
    data() {
        return {
            active: this.selected,
            titleText: ""
        };
    },
    props: {
        selected: {
            type: String,
            required: true,
            default: "/"
        }
    },
    mounted(){
        window.onload = function(){
            document.getElementById("search").focus();
        }  
    },
    watch: {
        $route() {
            // this.selected = sessionStorage.getItem("pageUrl");
        },
        active: function(val, oldVal) {
            // 这里就可以通过 val 的值变更来确定
            this.$router.push({
                path: val
            });
            // this.titleText = sessionStorage.getItem("pageTitle");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tabbar {
    height: 55px;
    .tab-icon {
        font-size: 24px;
        display: block;
    }
    .tab-text {
        font-size: 12px;
    }
    .mint-tab-item-icon {
        width: auto;
        height: auto;
    }
}
</style>
