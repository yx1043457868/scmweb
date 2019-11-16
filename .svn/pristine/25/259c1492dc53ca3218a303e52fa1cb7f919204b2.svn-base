<template>
    <div>
        <Header title="我的收藏"></Header>
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div class="order-wrapper" id="mescroll">
                <ul class="goods-list">
                    <li class="mui-table-view-cell" v-for="(food,index) in favoryList" :pid="food.id" :key="index" :chag="food.equation_factor" :class_id="food.class_id">
                        <router-link :to='{path:"/detail",query:{id:food.id}}'>
                            <div class="food-link">
                                <img v-lazy="baseurl+food.img_path">
                                <div class="recommend">
                                    <h4 class="skuName">{{food.sku_name}}</h4>
                                    <p class="styleno">规格：{{food.styleno}}</p><br>
                                </div>
                            </div>
                        </router-link>
                        <div class="favory-box" @click.stop="addFavory(food.id,index)">
                            <i class="iconfont favory">&#xe6c9;</i>
                        </div>
                    </li>
                </ul>
            </div>
        </mescroll-vue>
    </div>
</template>
			
<script>
import Header from "@/components/Header";
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import { Toast } from "mint-ui";
export default {
    name: "fav",
    components: {
        MescrollVue, // 注册mescroll组件
        Header
    },
    data() {
        return {
            mescroll: null, // mescroll实例对象
            mescrollDown: {}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
                // 上拉加载的配置.
                callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
                //以下是一些常用的配置,当然不写也可以的.
                page: {
                    num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
                    size: 10 //每页数据条数,默认10
                },
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了 --</p>',
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因;
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
                    icon: "static/images/none.png", //图标,默认null,支持网络图
                    tip: "暂无相关数据~" //提示
                }
            },
            favoryList: [] // 列表数据
        };
    },
    beforeRouteEnter(to, from, next) {
        // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
        next(vm => {
            vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
        });
    },
    beforeRouteLeave(to, from, next) {
        // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
        this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
        next();
    },
    methods: {
        addFavory(pid, index) {
            let account = "";
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            accountObj ? (account = accountObj.account) : (account = "");
            var _content = "{'id':'" + pid + "','account':'" + account + "'}";
            //此处模拟上拉加载返回的数据
            this.$post("/appVpProduct/vpDelFavory.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: "操作成功",
                        duration: 950
                    });
                    this.favoryList.splice(index, 1);
                } else {
                    Toast({
                        message: "收藏失败",
                        duration: 950
                    });
                }
            });
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            let account = "";
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            accountObj ? (account = accountObj.account) : (account = "");
            var _content =
                '{"account": "' +
                account +
                '","pageSize": "' +
                page.size +
                '","page": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/appVpProduct/vpSelectFavoryList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    // console.log(data);
                    // 请求的列表数据
                    if (data.res && data.res.list) {
                        let arr = data.res.list;
                        // 如果是第一页需手动制空列表
                        if (page.num === 1) this.favoryList = [];
                        // 把请求到的数据添加到列表
                        this.favoryList = this.favoryList.concat(arr);
                        // 数据渲染成功后,隐藏下拉刷新的状态
                        this.$nextTick(() => {
                            mescroll.endSuccess(arr.length);
                        });
                    } else {
                        this.favoryList = [];
                        this.$nextTick(() => {
                            mescroll.endSuccess(this.favoryList.length);
                        });
                    }
                })
                .catch(e => {
                    // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                    mescroll.endErr();
                });
        }
    }
};
</script>
			
<style scoped lang="less">
@base: #eb6000;
/*通过fixed固定mescroll的高度*/
.mescroll {
    position: fixed;
    top: 44px;
    bottom: 0;
    height: auto;
}
</style>
		