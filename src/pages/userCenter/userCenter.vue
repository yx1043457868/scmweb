<template>
    <div class="userCenter">
        <div class="user-head">
            <div class="head-info">
                <img :src="userImg" alt="">
                <div class="user-info">
                    <span class="user-name">{{LoginInfo.shop.shop_name}}</span>
                    <i class="iconfont" style=" color:#f9e444;font-size:26px;" v-if="shopType!=4">&#xe6a2;</i>
                    <div v-if="shopType==4">
                        <div v-if="handleStatus" style="color:#ffffff">会员审核中</div>
                        <router-link to="addmenber" tag="div"  class="userBtn" v-else>申请会员</router-link>
                    </div>
                    
                    <!-- <span class="user-nm">{{LoginInfo.company.nm}}</span> -->
                </div>
                <div class="handle-info">
                    <router-link to="accountEdit" class="sz-icon iconfont" tag="a">&#xe65a;</router-link>
                    <router-link to="/myNews" class="msg-icon iconfont" tag="a">&#xe67e;
                        <mt-badge size="small" color="#ff6719" v-show="messageCount">{{messageCount | countFormat}}</mt-badge>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="center-wrapper">
            <div class="center-item first-item" v-if="used_linesobj && used_linesobj.creditState=='Y' && noused_lines>0">
                <div class="c-h">
                    <span class="c-t">资金账户</span>
                    <span class="p-t">信用额度(元)￥{{used_linesobj.creditLines | formatMoney}}</span>
                </div>
                <div class="t-info">
                    <!-- <h2 class="l-t">{{(LoginInfo.shop.credit_lines - LoginInfo.shop.used_lines).toFixed(0)}}</h2> -->
                    <h2 class="l-t">￥{{noused_lines | formatMoney}}</h2>
                    <p>可用额度(元)</p>
                </div>
            </div>
            <div class="center-item">
                <router-link to="/vpOrderList" class="c-h border-b" tag="div">
                    <span class="c-t">我的订单</span>
                    <span class="c-p">订单总额：￥{{obj.sumAmount | formatMoney}}</span>
                    <span class="p-tip">全部订单</span>
                    <span class="icon iconfont">&#xe603;</span>
                </router-link>
                <div class="t-info">
                    <div class="order-box">
                        <router-link class="order-item" tag="div" :to="{path:'/vpOrderList',query:{typeId: '',payStatus:'2'}}">
                            <i class="iconfont">&#xe6a1;</i>
                            <mt-badge size="small" color="#ff6719" v-show="obj.UnpaidCount > 0">{{obj.UnpaidCount}}</mt-badge>
                            <span class="order-text">待付款</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/vpOrderList',query:{typeId: '1,7,8,9'}}">
                            <i class="iconfont">&#xe6ab;</i>
                            <mt-badge size="small" color="#ff6719" v-show="obj.PendingDistributionCount > 0">{{obj.PendingDistributionCount}}</mt-badge>
                            <span class="order-text">待配送</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/vpOrderList',query:{typeId: '2'}}">
                            <i class="iconfont">&#xe6a3;</i>
                            <mt-badge size="small" color="#ff6719" v-show="obj.ShippedCount > 0">{{obj.ShippedCount}}</mt-badge>
                            <span class="order-text">配送中</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/vpOrderList',query:{typeId: '3'}}">
                            <i class="iconfont">&#xe819;</i>
                            <span class="order-text">已签收</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/returnOrderList'}">
                            <i class="iconfont">&#xe618;</i>
                            <span class="order-text">退货单</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="center-item">
                <router-link to="/orderList" class="c-h border-b" tag="div">
                    <span class="c-t">我的预购订单</span>
                    <span class="p-tip">全部订单</span>
                    <span class="icon iconfont">&#xe603;</span>
                </router-link>
                <div class="t-info">
                    <div class="order-box">
                        <router-link class="order-item" tag="div" :to="{path:'/orderList',query:{typeId: '1'}}">
                            <i class="iconfont">&#xe6a1;</i>
                            <mt-badge size="small" color="#ff6719" v-show="preObj.UnpaidCount > 0">{{preObj.UnpaidCount}}</mt-badge>
                            <span class="order-text">待预付</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/orderList',query:{typeId: '2'}}">
                            <i class="iconfont">&#xe6ab;</i>
                            <mt-badge size="small" color="#ff6719" v-show="preObj.PendingDistributionCount > 0">{{preObj.PendingDistributionCount}}</mt-badge>
                            <span class="order-text">待接单</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/orderList',query:{typeId: '3,4,5,6'}}">
                            <i class="iconfont">&#xe6a3;</i>
                            <mt-badge size="small" color="#ff6719" v-show="preObj.ShippedCount > 0">{{preObj.ShippedCount}}</mt-badge>
                            <span class="order-text">配送中</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/orderList',query:{typeId: '7'}}">
                            <i class="iconfont">&#xe819;</i>
                            <!-- <mt-badge size="small" color="#ff6719" v-show="preObj.ReceiveCount > 0">{{preObj.ReceiveCount}}</mt-badge> -->
                            <span class="order-text">已签收</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/orderList',query:{typeId: '99'}}">
                            <i class="iconfont">&#xe7e6;</i>
                            <!-- <mt-badge size="small" color="#ff6719" v-show="preObj.CancelCount > 0">{{preObj.CancelCount}}</mt-badge> -->
                            <span class="order-text">已取消</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="center-item">
                <router-link to="/allOrder" class="c-h border-b" tag="div">
                    <span class="c-t">我的样品</span>
                    <span class="p-tip">全部申请</span>
                    <span class="icon iconfont">&#xe603;</span>
                </router-link>
                <div class="t-info">
                    <div class="order-box">
                        <router-link class="order-item" tag="div" :to="{path:'/allOrder',query:{typeId: '7,8,9'}}">
                            <i class="iconfont">&#xe6a9;</i>
                            <mt-badge size="small" color="#ff6719" v-show="count0 > 0">{{count0}}</mt-badge>
                            <span class="order-text">待审核</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/allOrder',query:{typeId: '1'}}">
                            <i class="iconfont">&#xe6ab;</i>
                            <mt-badge size="small" color="#ff6719" v-show="count1 > 0">{{count1}}</mt-badge>
                            <span class="order-text">待配送</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/allOrder',query:{typeId: '2'}}">
                            <i class="iconfont">&#xe6a3;</i>
                            <mt-badge size="small" color="#ff6719" v-show="count2 > 0">{{count2}}</mt-badge>
                            <span class="order-text">配送中</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/allOrder',query:{typeId: '3'}}">
                            <!-- <i class="iconfont">&#xe689;</i> -->
                            <i class="iconfont">&#xe819;</i>
                            <!-- <mt-badge size="small" color="#ff6719" v-show="count3 > 0">{{count3}}</mt-badge> -->
                            <span class="order-text">已签收</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/allOrder',query:{typeId: '4'}}">
                            <i class="iconfont">&#xe7e6;</i>
                            <span class="order-text">已取消</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="center-item">
                <router-link to="/pointsOrder" class="c-h border-b" tag="div">
                    <span class="c-t">我的礼品</span>
                    <span class="p-tip">全部兑换</span>
                    <span class="icon iconfont">&#xe603;</span>
                </router-link>
                <div class="t-info">
                    <div class="order-box">
                        <router-link class="order-item" tag="div" :to="{path:'/pointsOrder',query:{typeId: '10'}}">
                            <i class="iconfont">&#xe6aa;</i>
                            <mt-badge size="small" color="#ff6719" v-if="points[0] && points[0].type_10 > 0">{{points[0].type_10}}</mt-badge>
                            <span class="order-text">待接单</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/pointsOrder',query:{typeId: '20'}}">
                            <i class="iconfont">&#xe6a7;</i>
                            <mt-badge size="small" color="#ff6719" v-if="points[1] && points[1].type_20 > 0">{{points[1].type_20}}</mt-badge>
                            <span class="order-text">处理中</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/pointsOrder',query:{typeId: '30'}}">
                            <!-- <i class="iconfont">&#xe689;</i> -->
                            <i class="iconfont">&#xe6cb;</i>
                            <mt-badge size="small" color="#ff6719" v-if="points[2] && points[2].type_30 > 0">{{points[2].type_30}}</mt-badge>
                            <span class="order-text">已处理</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/pointsOrder',query:{typeId: '70'}}">
                            <i class="iconfont">&#xe7e6;</i>
                            <mt-badge size="small" color="#ff6719" v-if="points[3] && points[3].type_70 > 0">{{points[3].type_70}}</mt-badge>
                            <span class="order-text">已取消</span>
                        </router-link>
                        <router-link class="order-item" tag="div" :to="{path:'/pointsOrder',query:{typeId: '90'}}">
                            <i class="iconfont">&#xe716;</i>
                            <mt-badge size="small" color="#ff6719" v-if="points[4] && points[4].type_90 > 0">{{points[4].type_90}}</mt-badge>
                            <span class="order-text">已删除</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="list-box">
                <ul>
                    <!-- <router-link :to="{path:'/refund'}" class="center-list" tag="li">
                        <div class="list-img">
                            <i class="icon sprites th"></i>
                            <span class="list-text">退货单</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </router-link> -->
                    <router-link :to="{path:'/integralList'}" class="center-list" tag="li">
                        <div class="list-img">
                            <i class="icon sprites jf"></i>
                            <span class="list-text">我的积分</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </router-link>
                    <router-link :to="{path:'/selectAddress'}" class="center-list" tag="li">
                        <div class="list-img">
                            <i class="icon sprites dz"></i>
                            <span class="list-text">收货地址</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </router-link>
                    <router-link :to="{path:'/myCoupons'}" class="center-list" tag="li">
                        <div class="list-img">
                            <i class="icon sprites yhj"></i>
                            <span class="list-text">优惠券</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </router-link>
                    <router-link :to="{path:'/fav'}" class="center-list" tag="li">
                        <div class="list-img">
                            <i class="icon sprites sc"></i>
                            <span class="list-text">我的收藏</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </router-link>
                    <router-link :to="{path:'/myactivity'}" class="center-list" tag="li">
                        <div class="list-img">
                            <i class="icon sprites hd"></i>
                            <span class="list-text">已报名活动</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </router-link>
                    <a href="tel:400-168-7117"><li class="center-list">
                        <div class="list-img">
                            <!-- <i class="icon sprites fk"></i> -->
                            <i class="iconfont iconKH">&#xe6ad;</i>
                            <span class="list-text">联系客服</span>
                            <span class="iconPhone iconfont">&#xe729;</span>
                        </div>
                    </li> </a>
                    <!-- <li class="center-list">
                        <div class="list-img">
                            <i class="icon sprites fk"></i>
                            <span class="list-text">意见反馈</span>
                            <span class="icon iconfont">&#xe603;</span>
                        </div>
                    </li> -->
                </ul>
            </div>
        </div>
        <Tabbar :selected="selected"></Tabbar>
        <!-- <div class="mask" v-show="contactUsFalse"></div>
        <div class="mint-msgbox-wrapper" v-show="contactUsFalse" style="z-index:9999">
            <div class="mint-msgbox" style="z-index:9999">
                <div class="mint-msgbox-content">
                    <div class="mint-msgbox-message">400-168-7117</div> 
                    <div class="mint-msgbox-input" style="display: none;">
                        <input placeholder="" type="text"> 
                        <div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>
                    </div>
                </div> 
                <div class="mint-msgbox-btns">
                    <button class="mint-msgbox-btn mint-msgbox-cancel " @click="contactUsFalse=false">取消</button> 
                    <a href="tel:400-168-7117" class="mint-msgbox-btn mint-msgbox-confirm "><button >确定</button></a>
                </div>
            </div>
        </div>
        <div></div> -->
    </div>
</template>

<script>
import { Toast,MessageBox } from "mint-ui";
import Tabbar from "@/components/Tabbar";
import { m_sub } from "../../utils/index.js";
export default {
    name: "userCenter",
    components: {
        Tabbar
    },
    data() {
        return {
            selected: "/userCenter",
            obj: {},
            userImg : this.$store.getters['account'].logoPath ? this.$store.getters['account'].logoPath : require('../../../static/images/logo.png'),
            preObj:{
                UnpaidCount:0,
                PendingDistributionCount:0,
                ShippedCount:0,
                ReceiveCount:0,
                CancelCount:0
            },
            simpleObj: {},
            LoginInfo: this.$store.state.logindata,
            messageCount: "",
            count0: "",
            count1: "",
            count2: "",
            count3: "",
            used_linesobj: {},
            points: [],
            preShow: location.origin == "http://m.lzl98.com" ||"https://m.lzl98.com"? false : true,
            shopType:this.$store.getters['shop'].shopType?this.$store.getters['shop'].shopType:4,
            handleStatus:''
        };
    },
    created() {
        this.getMessageCount();
        this.getPreCount();
        this.getStateCount();
        this.simple_X();
        this.getShopused();
        this.getPoints();
        this.initCustomer();
    },
    computed: {
        noused_lines() {
            return m_sub(
                this.used_linesobj.creditLines || 0,
                this.used_linesobj.usedLines || 0
            );
        }
    },
    methods: {
        initCustomer() {
            let content_ = "{'shopId':'" + this.$store.getters['account'].shopId + "'}";
            this.$post("/mobileShop/shopView.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    if (response.res.tShopDoc) {
                        this.handleStatus = response.res.tShopDoc.handleStatus?response.res.tShopDoc.handleStatus:'';
                    }
                }
            })
        },
        getPoints() {
            let accountObj = this.$store.getters["account"];
            let _content =
                "{'shopId':'" + accountObj.shopId + "','selectType':'20'}";
            this.$post("/points/pointsorderList.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.points = response.res;
                } else {
                    Toast("数据查询失败");
                }
            });
        },
        getPreCount(){
            let accountObj = this.$store.getters["account"];
            var _content =
                "{'account':'" + accountObj.account + "'}";
            this.$post("/appPreOrder/getPreOrderStateCount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.preObj = response.res[0];
                } else {
                    Toast("数据查询失败");
                }
            });
        },
        simple_X() {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            var _content =
                "{'companyId':'" +
                accountObj.companyId +
                "','shopId':'" +
                accountObj.shopId +
                "','account':'" +
                accountObj.account +
                "'}";
            this.$post("/appGift/orderCount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.flag == true) {
                    let simpleObj = response.data;
                    // console.log(simpleObj[0].count);
                    let [count0, count1, count2, count3] = [
                        simpleObj[0].count,
                        simpleObj[1].count,
                        simpleObj[2].count,
                        simpleObj[3].count
                    ];
                    this.count0 = count0;
                    this.count1 = count1;
                    this.count2 = count2;
                    this.count3 = count3;
                } else {
                    Toast("数据查询失败");
                }
            });
        },
        getStateCount: function() {
            var _content =
                "{'account':'" + this.LoginInfo.account.account + "'}";
            this.$post("/appAccount/getStateCount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.obj = response.res[0];
                } else {
                    Toast("数据查询失败");
                }
            });
        },
        getShopused: function() {
            var _content = "{'shopId':'" + this.LoginInfo.account.shopId + "'}";
            this.$post("/mobileShop/getShop.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.used_linesobj = response.res;
                    if(response.res.shopType!=this.$store.getters['shop'].shopType){
                        this.LoginInfo.shop.shopType=response.res.shopType;
                         this.$store.commit("setData",this.LoginInfo);
                    }
                } else {
                    Toast("数据查询失败");
                }
            });
        },
        getMessageCount: function() {
            var _content =
                "{'account':'" + this.LoginInfo.account.account + "'}";
            this.$post("/message/messageCount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.messageCount = response.res;
                } else {
                    Toast("数据查询失败");
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="less">
@base: #eb6000;
.user-head {
    position: relative;
    height: 140px;
    padding: 15px;
    width: 100%;
    background: url("../../../static/images/points-bg.jpg") center no-repeat;
    background-size: 100% 100%;
    // background: linear-gradient(to right, #fc9105, #f35410);
    // background-size: 100% 140px;
    clip-path: circle(150% at 50% -204%);
    .head-info {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 0 0 40px;
        img {
            width: 40px;
            height: 40px;
            border-radius:50%; 
        }
        .user-info {
            margin-left: 12px;
            flex: 1;
            // display: inherit;
            // flex-direction: row;
            // justify-content: flex-start;
            .user-name {
                font-size: 15px;
                color: #ffffff;
            }
            .userBtn {
                font-size: 12px;
                width:30%;
                text-align:center;
                border:1px solid #ffffff;
                border-radius:4px;
                color: #ffffff;
            }
        }
        .handle-info {
            flex: 0 0 80px;
            text-align: right;
            a.msg-icon {
                font-size: 24px;
                color: #ffffff;
                position: relative;
                margin-left: 10px;
                span.mint-badge {
                    position: absolute;
                    top: -8px;
                    left: 20px;
                    padding: 0 0.053333rem;
                    min-width: 14px;
                    height: 14px;
                    line-height: 12px;
                    font-size: 11px;
                    color: @base;
                    border: 1px solid @base;
                    background-color: #ffffff !important;
                }
            }
            a.sz-icon {
                font-size: 22px;
                color: #ffffff;
            }
        }
    }
}
.center-wrapper {
    padding: 0 15px;
    .center-item {
        position: relative;
        width: 100%;
        height: 112px;
        padding: 0;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 3px;
        margin-bottom: 12px;
        &.first-item {
            margin-top: -70px;
            box-shadow: 0px 2px 8px 0px rgba(8, 25, 63, 0.5);
            background-color: rgba(255, 255, 255, 0.7);
        }
        &:first-child {
            margin-top: -70px;
        }
        .c-h {
            position: relative;
            height: 33px;
            line-height: 34px;
            padding: 0 10px;
            &.border-b {
                border-bottom: 1px solid #eeeeee;
            }
            span.c-t {
                font-size: 14px;
                line-height: 16px;
                font-weight: 500;
                font-stretch: normal;
                color: #171717;
            }
            span.c-p {
                font-size: 12px;
                color: #999999;
                margin-left: 10px;
                line-height: 14px;
            }
            span.p-tip {
                position: absolute;
                top: 0;
                right: 25px;
                font-size: 12px;
                color: #999999;
                margin-left: 10px;
            }
            span.p-t {
                position: absolute;
                top: 0;
                right: 10px;
                color: #666666;
            }
            span.icon {
                position: absolute;
                top: 0;
                right: 10px;
                font-size: 12px;
                color: #999999;
            }
        }

        .t-info {
            text-align: center;
            margin-top: 8px;
            h2.l-t {
                text-align: center;
                font-size: 34px;
                font-weight: 700;
                font-stretch: normal;
                color: #ff6719;
            }
            p {
                font-size: 12px;
                font-weight: 500;
                font-stretch: normal;
                color: #333333;
            }
            .order-box {
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                height: 70px;
                .order-item {
                    display: inherit;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    i.iconfont {
                        width: 28px;
                        height: 30px;
                        font-size: 24px;
                        margin-bottom: 5px;
                        // background: linear-gradient(to right, #fc9105, #f35410);
                        // -webkit-background-clip: text;
                        color: #eb6000;
                    }
                    span.mint-badge {
                        position: absolute;
                        top: -8px;
                        left: 20px;
                        padding: 0 0.053333rem;
                        min-width: 14px;
                        height: 14px;
                        line-height: 12px;
                        font-size: 11px;
                        color: #fff;
                        border: 1px solid @base;
                        background-color: @base;
                    }
                    span.order-text {
                        font-size: 12px;
                        color: #666666;
                    }
                }
            }
        }
    }
    .list-box {
        position: relative;
        width: 100%;
        height: auto;
        padding: 0;
        background-color: #ffffff;
        border-radius: 3px;
        margin-bottom: 12px;
        .center-list {
            padding: 0 15px;
            height: 65px;
            display: flex;
            align-items: center;
            position: relative;
            &::after {
                position: absolute;
                right: 0;
                bottom: 0;
                left: 60px;
                height: 1px;
                content: "";
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                background-color: #dddddd;
            }
            &:last-child::after {
                height: 0;
            }
            .sprites {
                background: url("../../../static/images/center-list.png")
                    no-repeat;
                background-size: 25px 200px;
                display: inline-block;
                vertical-align: middle;
                margin-right: 15px;
            }

            .th {
                height: 25px;
                width: 25px;
                background-position: 0 0;
            }
            .sc {
                height: 25px;
                width: 25px;
                background-position: 0 -25px;
            }
            .yhj {
                height: 25px;
                width: 25px;
                background-position: 0 -50px;
            }
            .thd {
                height: 25px;
                width: 25px;
                background-position: 0 -75px;
            }
            .fk {
                height: 25px;
                width: 25px;
                background-position: 0 -100px;
            }
            .dz {
                height: 25px;
                width: 25px;
                background-position: 0 -125px;
            }
            .jf {
                height: 25px;
                width: 25px;
                background-position: 0 -150px;
            }
            .hd {
                height: 25px;
                width: 25px;
                background-position: 0 -175px;
            }
            .list-text {
                display: inline-block;
                font-size: 16px;
                color: #171717;
                vertical-align: middle;
            }
            span.icon {
                color: #999999;
                position: absolute;
                right: 10px;
                top: 22px;
                font-size: 14px;
            }
            span.iconPhone{
                color: #999999;
                position: absolute;
                right: 10px;
                top: 22px;
                font-size: 26px;
            }
            .iconKH{
                height: 25px;
                width: 25px; 
                display: inline-block;
                vertical-align: middle;
                margin-right: 15px;
                font-size:25px; 
                color:rgb(108, 182, 108); 
                position: relative;
                top: 4px;   
            }
        }
    }
}
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
}
.mint-msgbox-confirm{
    color:red;
    button{
        text-align: center;
        line-height: 40px;
        width: 100%;
        color: red;
    }
}
</style>
