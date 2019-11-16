<template>
    <div>
        <Header title="我的优惠券"></Header>
        <!--菜单-->
        <div class="nav">
            <p v-for="(item,index) in couponStatusCount" :key="index" @click="chosen(index,item.state)" :value="item.state" :class="{'active':index==isActive}">{{item.couponStatus}}({{item.totalCount}})
            </p>
        </div>
        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div class="card-content" id="mescroll">
                <ul class="card-ul" id="goods-ul">
                    <li class="card-list" v-for="(item,index) in couponList" :key="index">
                        <!--页眉，放置标题-->
                        <div class="icon-card" :class="[stateId === 'N' ? activeClass : errorClass]">
                            <strong><span>￥</span>{{item.couponValue}}</strong>
                            <p>满{{item.minMoney}}元可用</p>
                        </div>
                        <div class="card-info">
                            <h4 class="card-name">{{item.couponName}}</h4>
                            <p class="card-time">{{item.beginTime | format}}~{{item.endTime | format}}</p>
                            <button class="mui-btn card-btn" v-if="stateId == 'N'" @click.stop="useHandle(item.yuGou)">立即使用
                            </button>
                            <div class="status" :class="classObject"></div>
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
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
    name: "couponsCenter",
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
            couponList: [],
            couponStatusCount: [],
            searchTx: "",
            stateId: "N",
            isActive: "0",
            login_info: {},
            result: {},
            activeClass: "active",
            errorClass: "disable"
        };
    },
    computed: {
        classObject: function() {
            return {
                used: this.stateId == "Y",
                over: this.stateId == "D"
            };
        }
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
        useHandle(type) {
            type == 0 ?  this.$router.push({ path: "/classify" }) : this.$router.push({ path: "/preorderList" }); //前往分类页面
        },
        /*初始化菜单*/
        chosen(index, id) {
            this.isActive = index;
            this.stateId = id;
            // mui('#popover').popover('hide');//show hide toggle
            this.mescroll.resetUpScroll(); //重新搜索,重置列表数据
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            let companyId = "",
                account = "";
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            accountObj ? (account = accountObj.account) : (account = "");
            var _content =
                '{"account": "' +
                account +
                '", "state": "' +
                this.stateId +
                '","pageSize": "' +
                page.size +
                '","pageNo": "' +
                page.num +
                '"}';
            //此处模拟上拉加载返回的数据
            this.$post("/appCounpon/getMyCouponApp.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(response => {
                    let data = JSON.parse(response);
                    this.couponStatusCount = data.res.couponStatusCount;
                    // 请求的列表数据
                    if (data.res && data.res.couponList) {
                        let arr = data.res.couponList;
                        // 如果是第一页需手动制空列表
                        if (page.num === 1) this.couponList = [];
                        // 把请求到的数据添加到列表
                        this.couponList = this.couponList.concat(arr);
                        // 数据渲染成功后,隐藏下拉刷新的状态
                        this.$nextTick(() => {
                            mescroll.endSuccess(arr.length);
                        });
                    } else {
                        this.couponList = [];
                        this.$nextTick(() => {
                            mescroll.endSuccess(this.couponList.length);
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
    top: 81px;
    bottom: 0;
    height: auto;
}
/*优惠券*/
.card-content{
    .card-ul {
        padding: 10px;  
        .card-list {
            .icon-card {
                display: flex;
                width: 100px;
                flex: 0 0 100px;
                height: 75px;
                flex-flow: column nowrap;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
                color: #fff;
                text-align: center;
                &.active {
                    background: linear-gradient(
                            to right,
                            #fc9105,
                            #f35410
                        );
                    // background: url("../../../static/images/card_active.png") center center no-repeat;
                    background-size: cover;
                }
                
                &.disable {
                    background: url("../../../static/images/card_disabled.png") center center no-repeat;
                    background-size: cover;
                }
                strong {
                    font-size: 24px;
                    font-weight: 900;
                    margin-bottom: 15px;
                    span {
                        font-size: 16px
                    }
                }
                h3 {
                    font-size: 18px;
                    color: #fff;
                    font-weight: 900;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 12px;
                    color: #fff !important;
                }
            } 
            .card-info {
                position: relative;
                flex: 1;
                width: 100%;
                height: 75px;
                overflow: hidden;
                h4.card-name {
                    color: #333333;
                    font-weight: 400;
                    width:76%;
                    font-size: 16px;
                    line-height: 18px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .card-time {
                    position: absolute;
                    color: #333;
                    font-size: 11px;
                    bottom: 0
                }
                .status {
                    display: block;
                    width: 65px;
                    height: 65px;
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    z-index: 110;
                    background-size: 65px 65px !important;
                    &.get {
                        background:url("../../../static/images/bid_label_get.png")
                            no-repeat center center;
                    }
                    &.used {
                        background: url("../../../static/images/bid_label_used.png") no-repeat
                            center center;
                    }

                    &.over {
                        background: url("../../../static/images/bid_label_over.png") no-repeat
                            center center;
                    }
                }
                .card-btn {
                    position: absolute;
                    color: #fff;
                    width: 65px;
                    height: 20px;
                    line-height: 16px;
                    max-width: 65px;
                    font-size: 12px;
                    bottom: 0;
                    padding: 1px 0;
                    right: 0;
                    border-radius: 15px;
                    border-color: @base;
                    background-color: @base;
                    &.card-use {
                        border-color: #eb6000;
                        background-color: #eb6000;
                    }
                }
            }   
        }
            
    }
}
</style>
		