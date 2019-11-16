<template>
    <div>
        <div class="header-content">
            <header class="mint-header">
                <div class="mint-header-button is-left" @click="back">
                    <button data-v-a23dccce="" class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
                        <label class="mint-button-text"></label>
                    </button>
                </div>
                <h1 class="mint-header-title">积分详情</h1>
                <div class="mint-header-button is-right"></div>
            </header>
            <div class="points-info">
                <div class="my-points">
                    <span>可用积分</span>
                    <strong>{{obj.ablePoints}}</strong>
                </div>
                <em>总积分<span>{{obj.totalPoints}}</span></em>
            </div>
            <div class="btn-group">
                <router-link tag="button" to="/integralList">兑换</router-link>
            </div>
        </div>

        <!--mescroll滚动区域的基本结构-->
        <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <!--内容...-->
            <div id="mescroll">
                <div class="points-wrapper">
                    <ul class="points-ul">
                        <li class="points-list">
                            <h5 class="points-title">积分明细</h5>
                        </li>
                        <li class="points-list" v-for="(item,index) in pointsList" :key="index">
                            <div class="points-info">
                                <h4 class="points-name">{{item.pointsType}}</h4>
                                <span class="points-t">{{item.createTime}}</span>
                                <p>{{item.desc}}</p>
                            </div>
                            <span class="points-num">{{item.points}}</span>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </mescroll-vue>

    </div>
</template>
			
<script>
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import { Toast, MessageBox } from "mint-ui";
import { formatDate } from "../../utils/index.js";
import searchPage from "@/components/searchPage";
export default {
    name: "vpOrderList",
    components: {
        MescrollVue, // 注册mescroll组件
        searchPage
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
                isBounce: true,
                htmlNodata: '<p class="upwarp-nodata">-- 没有更多了 --</p>',
                noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据避免列表数据过少(比如只有一条数据),显示无更多数据会不好看这就是为什么无更多数据有时候不显示的原因;
                empty: {
                    //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
                    warpId: "mescroll", //父布局的id (1.3.5版本支持传入dom元素)
                    icon: "static/images/none.png", //图标,默认null,支持网络图
                    tip: "暂无相关数据~" //提示
                }
            },
            pointsList: [],
            obj: {}
        };
    },
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll;
        },
        // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
        upCallback(page, mescroll) {
            // 联网请求
            setTimeout(() => {
                let accountObj = this.$store.getters["account"];
                var _content =
                    '{"shopId":"' +
                    accountObj.shopId +
                    '","pageSize": "' +
                    page.size +
                    '","pageNo": "' +
                    page.num +
                    '"}';
                //此处模拟上拉加载返回的数据
                this.$post("/points/pointsDetailList.do", {
                    content: _content,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                })
                    .then(response => {
                        let data = JSON.parse(response);
                        if (data.optFlag == "yes") {
                            // 请求的列表数据
                            this.obj.totalPoints = data.res.totalPoints
                                ? data.res.totalPoints
                                : 0;
                            this.obj.ablePoints = data.res.ablePoints
                                ? data.res.ablePoints
                                : 0;
                            if (data.res && data.res.pointsList) {
                                let arr = data.res.pointsList;
                                // 如果是第一页需手动制空列表
                                if (page.num === 1) this.pointsList = [];
                                // 把请求到的数据添加到列表
                                this.pointsList = this.pointsList.concat(arr);
                                // 数据渲染成功后,隐藏下拉刷新的状态
                                this.$nextTick(() => {
                                    mescroll.endSuccess(arr.length);
                                });
                            } else {
                                this.$nextTick(() => {
                                    mescroll.endSuccess(0);
                                });
                            }
                        } else {
                            Toast(data.optDesc);
                            this.pointsList = [];
                            this.obj.totalPoints = 0;
                            this.obj.ablePoints = 0;
                            this.$nextTick(() => {
                                mescroll.endSuccess(0);
                            });
                        }
                    })
                    .catch(e => {
                        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                        mescroll.endErr();
                    });
            }, 500);
        }
    }
};
</script>
			
<style scoped lang="less">
@base: #eb6000;
/*通过fixed固定mescroll的高度*/
.mescroll {
    position: fixed;
    top: 180px;
    bottom: 0;
    height: auto;
}
.header-content {
    position: relative;
    width: 100%;
    height: 200px;
    // background: -webkit-gradient(
    //     linear,
    //     left top,
    //     right top,
    //     from(#fc9105),
    //     to(#f35410)
    // );
    background: url("../../../static/images/points-bg.jpg") center no-repeat;
    background-size: 100% 100%;
    // clip-path: circle(158% at 50% -201%);
    .mint-header {
        background: transparent;
        .mint-button-icon .mintui.mintui-back {
            color: #ffffff;
        }
    }
    .mint-header-title {
        color: #ffffff;
    }
    .points-info {
        padding: 20px 30px;
        .my-points {
            margin-bottom: 25px;
            span {
                display: block;
                color: #ffffff;
                font-size: 16px;
                margin-bottom: 10px;
            }
            strong {
                display: block;
                color: #ffffff;
                font-size: 28px;
            }
        }
        em {
            display: block;
            color: #ffffff;
            font-size: 16px;
            span {
                margin-left: 6px;
            }
        }
    }
    .btn-group {
        position: absolute;
        bottom: 40px;
        right: 30px;
        button {
            border-radius: 15px;
            width: 80px;
            height: 28px;
            color: @base;
        }
    }
}
.points-wrapper {
    // margin-top: -40px;
    position: relative;
    z-index: 2;
    // padding: 15px;
    overflow: hidden;
    margin: 0 15px;
    .points-ul {
        background-color: #fff;
        border-radius: 4px;
        min-height: 280px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        // margin: 15px;
        .points-list {
            position: relative;
            height: auto;
            padding: 15px 15px;
            display: flex;
            align-items: center;
            .points-title {
                text-align: center;
                width: 100%;
                color: @base;
                font-size: 16px;
                font-weight: 500;
            }
            &::after {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 15px;
                height: 1px;
                content: "";
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                background-color: #dddddd;
            }
            &:first-child::after {
                left: 0;
            }
            &:last-child::after {
                height: 0px;
            }
            .points-info {
                display: inherit;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                h4.points-name {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 4px;
                }
                .points-t {
                    font-size: 12px;
                    line-height: 1;
                    color: #888888;
                }
            }

            .points-num {
                width: 60px;
                text-align: right;
                color: @base;
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
}
</style>
		