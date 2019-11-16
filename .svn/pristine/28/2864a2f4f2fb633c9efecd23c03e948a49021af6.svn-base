<template>
    <div class="container">
        <!-- 头部广告图 -->
        <div class="top_img">
            <div class="back"
                 @click="back">
                <i class="iconfont">&#xe6fb;</i>
            </div>
            <div class="out_box01"
                 v-if="imgList && imgList !=null">
                <div class="swiper_img">
                    <img class="img-dec"
                         v-lazy="baseurl+imgList.img_path"
                         :alt="imgList.content">
                </div>
            </div>
        </div>
        <!-- 优惠券 -->
        <div class="coupon"
             v-if="couponList && couponList.length>0">
            <div class="coupon_box"
                 v-for="(item,index) in couponList"
                 :key="index">
                <div class="left_span">
                    <p>￥{{item.couponValue}}</p>
                    <div class="description">
                        <span>满{{item.minMoney}}使用</span>
                    </div>
                    <div class="notice">{{item.couponName}}</div>
                </div>
                <div class="right_span">
                    <span v-if="item.hasGotten == '0' && (item.gottenCount / item.totalNum) != 1"
                          @click="receiveCouponHandle(item.parentId,item.ID,index)">立即领取</span>
                    <span v-else-if="item.hasGotten == '0' && (item.gottenCount / item.totalNum) == 1"
                          class="no_used">已抢完</span>
                    <!-- <span v-else class="has_uesd"  @click.stop="receiveCouponHandle(item.parentId,item.ID,index)">已领取</span> -->
                    <span v-else
                          class="has_uesd"
                          @click.stop="useHandle">已领取</span>
                    <!-- 右边锯齿形 -->
                    <span class="span1 span0"></span>
                    <span class="span1 span2"></span>
                    <span class="span1 span3"></span>
                    <span class="span1 span4"></span>
                </div>
            </div>
        </div>
        <!--货品 -->
        <productList :dataList="rawNewList" v-show="rawNewList.length > 0"
                     :shopcart="this.$refs.shopcart"></productList>
        <div class="empty_box"
             v-if="rawNewList==null || rawNewList.length ==0 || rawNewList == ''">
            <div class="empty-box">
                <div class="empty-img">
                    <img src="../../../static/images/none.png" />
                </div>
                <p>{{notice}}</p>
            </div>
        </div>
        <cartBox ref="shopcart"></cartBox>
    </div>
</template> 
<script>
import cartBox from "@/components/cartBox";
import Tabbar from "@/components/Tabbar";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Toast, MessageBox } from "mint-ui";
import productList from "@/components/productList";
// import emptyBox from "@/components/emptyBox";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    getPcid,
    isNull
} from "../../utils/index.js";
export default {
    name: "advdetail",
    data() {
        return {
            imgList: {},
            rawNewList: [],
            imgList: [],
            couponList: [],
            notice: "亲,暂无相关数据哦~",
        };
    },
    components: {
        Tabbar,
        productList,
        cartBox
    },
    computed: {
        // 获取登录状态
        logintoken() {
            return this.$store.getters["logintoken"];
        }
    },
    created() {
        this.initPage();
        //初始化货品
        this.initProduct();
    },
    mounted() {
        this._initSwiper();
        //   数据加载完后
        //     this.$nextTick(() => {
        //                     this._initSwiper();
        //                 });
    },
    methods: {
        // 返回上一页
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.go(-1);
            }
        },
        _initSwiper() {
            let swiper = new Swiper("#swiper1", {
                autoplay: false,
                speed: 300,
                loop: false,
                pagination: ".swiper-pagination",
                direction: "horizontal",
                watchOverflow: true, //当没有足够的slide切换时，例如只有1个slide（非loop），swiper会失效且隐藏导航等。默认不开启这个功能。
                autoplayDisableOnInteraction: false,
                slidesPerView: 1,
                paginationClickable: true,
                centeredSlides: false,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            });
        },
        initPage() {
            if (!this.logintoken) {
                let pcid = this.$route.query.pcid;
                this.$store.commit("setpcid", Number(pcid)); //未登录状态重新储存pcid
            }
        },
        // 默认加载全部数据
        initProduct() {
            // content={'shopId':'165496','account':'test98','actId':'1','companyId':'1350','shopType':'4'}
            // &version=kkllo&deviceOS=iPhone&login_token=5a2695756cea4c59939b173648f8cf3c
            let actId = this.$route.query.id;
            let account = this.$store.getters["account"].account
                ? this.$store.getters["account"].account
                : "";
            let companyId = this.$store.getters["account"].companyId
                ? this.$store.getters["account"].companyId
                : "";
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let shopType = this.$store.getters["shop"].shopType
                ? this.$store.getters["shop"].shopType
                : "";
            let _indexcontent =
                '{"companyId":"' +
                companyId +
                '","shopId":"' +
                shopId +
                '","shopType":"' +
                shopType +
                '","actId":"' +
                actId +
                '","account":"' +
                account +
                '"}';
            this.$post("/mktAct/mktActivityDetail.do", {
                content: _indexcontent,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(res => {
                    if (JSON.parse(res).optFlag == "yes") {
                        if (JSON.parse(res).res.mktAct) {
                            this.imgList = JSON.parse(res).res.mktAct;
                        }
                        // 优惠券
                        this.couponList = JSON.parse(res).res.mktActCoupon;
                        // 商品
                        let mktActProductList = JSON.parse(res).res
                            .mktActProduct;
                        let children = [];
                        for (
                            var i = 0, len = mktActProductList.length;
                            i < len;
                            i++
                        ) {
                            // children.push(mktActProductList[i].list)
                            children = [
                                ...mktActProductList[i].list,
                                ...children
                            ];
                        }
                        this.rawNewList = children;
                    } else if (JSON.parse(res).optFlag == "n") {
                        this.imgList = null;
                        if (
                            JSON.parse(res).optDesc != null &&
                            JSON.parse(res).optDesc != ""
                        )
                            this.notice = JSON.parse(res).optDesc;
                    } else {
                        this.notice = "亲，暂无数据~哟";
                    }
                })
                .catch(err => {});
        },
        // 领取优惠券
        receiveCouponHandle(parentId, ID, index) {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : "";
            let companyObj = this.$store.getters["company"]
                ? this.$store.getters["company"]
                : "";
            if (accountObj) {
                if (accountObj.role == "1") {
                    var _content =
                        '{"account": "' +
                        accountObj.account +
                        '","parentId": "' +
                        parentId +
                        '","couponId": "' +
                        ID +
                        '"}';

                    this.$post("/appCounpon/receiveCouponApp.do", {
                        content: _content,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    })
                        .then(res => {
                            let response = JSON.parse(res);
                            if (response.optFlag == "yes") {
                                Toast({
                                    message: response.optDesc,
                                    duration: 950
                                });
                                this.couponList[index].hasGotten = 1;
                                if (response.receiveCoupon) {
                                    this.receiveCoupon = response.receiveCoupon;
                                    this.cardShow = true;
                                }
                            } else if (response.optFlag == "no") {
                                Toast({
                                    message: response.optDesc,
                                    duration: 950
                                });
                            }
                        })
                        .catch(e => {
                            // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
                            mescroll.endErr();
                        });
                } else {
                    Toast({
                        message: "仅微批自营用户可领用",
                        duration: 950
                    });
                }
            } else {
                MessageBox.confirm("请先登录系统")
                    .then(action => {
                        this.$router.push({ path: "/login" });
                    })
                    .catch(() => {
                        // Toast('操作取消');
                    });
            }
        },
        useHandle() {
            Toast({
                message: "已经领取该优惠券",
                duration: 950
            });
        }
    }
};
</script>
<style  scoped lang="less">
@base: #eb6000;
@price: #ff671d;
.container {
    background: #fff;
    width: 100%;
    height: 100vh;
    .back {
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 4;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);
        text-align: center;
        i {
            color: #fff;
            font-weight: 700;
            font-size: 20px;
            line-height: 35px;
        }
    }
    .goods-container {
        display: block;
        width: 100%;
        height: 50vw;
        .img-dec {
            display: block;
            width: 100%;
            height: auto;
            // height: 50vw;
        }
    }
    .coupon {
        width: 100%;
        // padding:0 2%;
        // height: 30vw;
        background: #fff;
        display: flex;
        justify-content: flex-start;
        // align-items:center;
        flex-wrap: wrap;
        .coupon_box {
            margin: 5px 2%;
            width: 46%;
            height: 50px;
            background: #fff;
            text-align: center;
            .left_span {
                width: 70%;
                height: 50px;
                background: @base;
                border-radius: 5px 0 0 5px;
                border-right: 1px dashed #fff;
                float: left;
                vertical-align: middle;
                p {
                    text-align: center;
                    width: 100%;
                    height: 16px;
                    line-height: 16px;
                    color: rgb(241, 240, 240);
                    font-style: normal;
                    font-weight: 600;
                }
                .description {
                    width: 100%;
                    height: 12px;
                    line-height: 12px;
                    text-align: center;
                    span {
                        display: block;
                        width: 60%;
                        margin-left: 20%;
                        height: 12px;
                        background: #fff;
                        border-radius: 10px;
                        color: @base;
                        font-size: 12px;
                    }
                }
                .notice {
                    width: 100%;
                    height: 16px;
                    font-size: 10px;
                    line-height: 16px;
                    color: #fff;
                    text-align: center;
                    overflow: hidden;
                }
            }
            .right_span {
                width: 30%;
                height: 50px;
                vertical-align: middle;
                background: @base;
                float: left;
                position: relative;
                .has_uesd {
                    display: flex;
                    flex-wrap: wrap;
                    width: 30%;
                    height: 50px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(65, 62, 62);
                    justify-content: center;
                    margin-left: 30%;
                    align-items: center;
                }
                .no_used {
                    display: flex;
                    flex-wrap: wrap;
                    width: 30%;
                    height: 50px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(192, 187, 187);
                    justify-content: center;
                    margin-left: 30%;
                    align-items: center;
                }
                span {
                    display: flex;
                    flex-wrap: wrap;
                    width: 30%;
                    height: 50px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #fff;
                    justify-content: center;
                    margin-left: 30%;
                }
                .span1 {
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    background: #fff;
                }
                .span0 {
                    position: absolute;
                    top: 0px;
                    right: -5px;
                }
                .span2 {
                    position: absolute;
                    top: 13px;
                    right: -5px;
                }
                .span3 {
                    position: absolute;
                    top: 25px;
                    right: -5px;
                }
                .span4 {
                    position: absolute;
                    top: 38px;
                    right: -5px;
                }
            }
        }
    }
}
.out_box0 {
    margin-top: 10px;
    margin-bottom: 50px;
    width: 100%;
    position: relative;
    background: #fff;
    .nav_box0 {
        width: 90%;
        height: 30px;
        line-height: 30px;
        display: flex;
        // flex-direction:row ;
        justify-content: flex-start;
        align-items: center;
        // background: #eb6000;
        float: left;
        .li_box0 {
            // display: inline-block;
            // width:40%;
            min-width: 70px;
            max-width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: left;
            // background: #20b42c;
            font-size: 12px;
            font-weight: 600;
            color: rgb(19, 1, 1);
        }
        .active {
            border-bottom: 2px solid rgb(224, 137, 5);
            color: rgb(224, 137, 5);
            font-size: 12px;
        }
    }
    .right_icon {
        float: left;
        width: 10%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #b1a9a4;
        font-size: 12px;
    }
    .out_box {
        position: relative;
        width: 100%;
        height: 30px;
        // border-bottom: 1px solid #ddd;
    }
    .other_show {
        width: 100%;
        height: 30px;
        position: absolute;
        left: 0;
        top: 30px;
        // background: #20b42c;
        z-index: 99;
        border: 1px solid #ddd;
        background: #fff;
        color: #000;
        font-size: 12px;
    }
    .other_show1 {
        width: 100%;
        line-height: 30px;
        position: absolute;
        left: 0;
        top: 30px;
        // background: #20b42c;
        z-index: 99;
        border-bottom: 1px solid #ddd;
        background: #fff;
        color: #000;
        font-size: 12px;
        display: flex;
        // flex-direction:row ;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        .li_box01 {
            // width: 60px;
            min-width: 70px;
            max-width: 80px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            float: left;
            font-size: 12px;
            font-weight: 600;
        }
    }
}
.empty_box {
    width: 100%;
    height: 180px;
    // background: #eb6000;
    position: relative;
    .empty-box {
        position: absolute;
        // top: 0;
        // right: 0;
        // bottom: 0;
        // left: 0;
        // margin: auto;
        width: 100%;
        height: 180px;
        text-align: center;
        font-size: 14px;
        .empty-img {
            margin: 30px auto;
            width: 112px;
            height: 84px;
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }
    }
}
.top_img {
    width: 100%;
    min-height: 100px;
    height: auto;
    position: relative;
    .back {
        position: fixed;
        left: 10px;
        top: 10px;
        z-index: 20;
    }
    .out_box01 {
        width: 100%;
        height: auto;
        .swiper_img {
            width: 100%;
            height: auto;
            .img-dec {
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>
