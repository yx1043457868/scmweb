<template>
    <div class="viewBox"
         ref="viewBox"
         id="viewBox"
         v-show="shareId_str != null">
        <!--头部start-->
        <div class="header-top">
            <p class="nm" @click="changeConpany">{{ nm }} <i class="iconfont">&#xe728;</i></p>
        </div>
        <div class="top-h">
            <a href="tel:400-168-7117"><i class="iconfont iconKH">&#xe6ad;</i></a>
            <router-link :to="{ path: '/search' }"
                         class="homeSearch"
                         tag="div">
                <input type="search"
                       placeholder="输入食材名称/编码/拼音搜索" />
                <i class="mintui mintui-search"></i>
            </router-link>
            <a class="msg-icon iconfont"
               @click="toMsg">&#xe67e;
                <mt-badge size="small"
                          type="error"
                          class="badge"
                          v-if="messageCount">{{ messageCount | countFormat }}</mt-badge>
            </a>
            <!-- <router-link to="addmenber" tag="div" class="rollMember" v-if="shopType==4&&!MemberFlag" style="overflow:hidden">
                <div class="delMember" @click.stop="delMember">×</div>
                <div class="rollMember1"><span>完善资料，申请成为会员后享受会员价</span></div>
            </router-link> -->
        </div>
        <!-- 头部end -->
        <!-- 轮播图 -->
        <homeBanner />
        <router-link to="addmenber" tag="div" class="rollMember" v-if="shopType==4&&!MemberFlag">
            <div class="delMember" @click.stop="delMember">×</div>
            <div class="rollMember1">完善资料，申请成为会员后享受会员价<span class="icon iconfont" style="font-size:12px;padding-left:10px">&#xe603;</span></div>
        </router-link>
        <!-- 分类 -->
        <classSlider1></classSlider1>
        <classSlider></classSlider>
 
        <!-- 主题活动 -->
        <!-- <activitySlider/> -->
        <activeBanner />

        <!-- 积分商城 -->
        <!-- <integralContent /> -->

        <!-- 选项卡 -->
        <mt-navbar class="mt-tab"
                   v-model="tab"
                   id="tab">
            <mt-tab-item id="1"
                         class="hot">热销爆款</mt-tab-item>
            <!-- <mt-tab-item id="2" class="new">新品抢购</mt-tab-item>
            <mt-tab-item id="3" class="discount">超值特价</mt-tab-item> -->
            <mt-tab-item id="4"
                         class="suggest">人气推荐</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="tab">
            <mt-tab-container-item id="1">
                <productList :dataList="hotList"
                             :shopcart="this.$refs.shopcart"></productList>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <productList :dataList="rawNewList"
                             :shopcart="this.$refs.shopcart"></productList>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <productList :dataList="discountList"
                             :shopcart="this.$refs.shopcart"></productList>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <productList :dataList="suggestList"
                             :shopcart="this.$refs.shopcart"></productList>
            </mt-tab-container-item>
        </mt-tab-container>
        <!--列表end-->
<!-- 分享 -->
        <!-- <div class="shared"
             v-if="!FirstShare">
            <img class="share-png"
                 src="../../static/images/share.png"
                 alt="点击这里"
                  />
            <div class="sharedContent" v-if="!sharedSuccess && !!registerFlag && !!firstRegister">
                <div class="sharedtop firstR">
                    <h3>良之隆送您 <span style="color:#ffffff">{{firstCouponsAll}}元</span> 新人劵</h3>
                    <ul class="card-ul" id="goods-ul">
                        <li class="card-list" v-for="(item,index) in couponsList" :key="index">
                            <div class="card-center-info">
                                <h4 class="card-name">满{{item.minMoney}}使用</h4>
                                 <div style="font-size:10px;">{{item.beginTime | format}}~{{item.endTime | format}}</div>
                                <div>{{item.couponName}}</div>
                                
                            </div>
                            <div class="couponRight">
                                <div class="yuan1"></div>
                                <div class="yuan2"></div>
                                <div class="circl">
                                    ￥{{item.couponValue}}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p style="color:#666666;margin-top:10px;">
                        分享还可以领更多优惠劵哦
                    </p>
                </div>
                <div class="sharedcancel">
                    <i class="iconfont"
                       @click.stop="changIsFirstShare">&#xe64a;</i>
                </div>
            </div>
             <div class="sharedContent" v-if="!sharedSuccess && !!registerFlag&& !firstRegister">
                <div class="sharedtop">
                    <h3>提示</h3>
                    <p>好食材大家有，分享一下吧</p>
                    <p >
                        分享还可以领更多优惠劵哦
                    </p>
                    
                </div>
                <div class="sharedcancel">
                    <i class="iconfont"
                       @click.stop="changIsFirstShare">&#xe64a;</i>
                </div>
            </div>
            <div class="sharedContent"
                 v-if="sharedSuccess && !!registerFlag">
                <div class="sharedtop">
                    <h3>分享成功</h3>
                    <p>坐等好友注册成功</p>
                </div>
                <div class="sharedcancel">
                    <i class="iconfont"
                       @click.stop="changIsFirstShare">&#xe64a;</i>
                </div>
            </div>
            <div class="sharedContent"
                 v-if="!registerFlag">
                <div class="sharedtop">
                    <h3>客官你来啦</h3>
                    <p>良之隆新食材，天天有健康</p>
                    <p>注册会员，天天有惊喜</p>
                    <button @click.stop="goRegister"
                            class="shareBtn">
                        去注册
                    </button>
                </div>
                <div class="sharedcancel">
                    <i class="iconfont"
                       @click.stop="changIsFirstShare">&#xe64a;</i>
                </div>
            </div>
        </div> -->
        <!-- 优惠劵190--14234 -->
        <div class="shared" v-if="CouponShow">
            <div class="sharedContent" >
                 <router-link :to="{ path: '/couponsCenter' }" >
                    <img src="../../static/images/discount.png" @click.stop="CouponShow=false"/>
                </router-link>
                <div class="sharedcancel">
                    <i class="iconfont"
                       @click.stop="CouponShow=false">&#xe64a;</i>
                </div>
            </div>
        </div>
        
        <Tabbar :selected="selected" ref="shopcart"></Tabbar>
        <!-- 更换门店 -->
        <div v-show="meckShow" class="meck" @click="meckShow=false">
            <div class="meckBack">
                <div v-show="conpanyShow">
                    <h3>切换门店</h3>
                    <div  class="cityContent">
                    <ul class="left">
                        <li v-for="(item,index) in cityList" :key="index" :class="{'cur':currentIndex==item.id}" @click.stop="changeCity(item.id)"><span>{{item.NAME}}</span>
                        </li>
                    </ul>
                    <ul class="right" >
                        <li v-for="(item,index) in conpanyList" :key="index" @click.stop="selectSales(item.itemId)">
                            <div class="conpanyName">{{item.NAME}} <i class="iconfont iconRight">&#xe603;</i></div>
                            <div class="conpanyAddress">{{item.address}}</div>
                        </li>
                    </ul>
                    </div>
                </div>
                <div v-show="!conpanyShow">
                    <h3 @click.stop="conpanyShow=!conpanyShow"><i class="iconfont iconleft">&#xe6fb;</i>请选择业务员</h3>
                    <div  class="cityContent">
                        <ul class="salesBorder" v-if="salesList && salesList.length>0">
                            <li v-for="(item,index) in salesList" :key="index"  @click.stop="changeSales(item)">
                                <div class="real_name">{{item.real_name}}</div>
                                <div style="color:#999999">{{item.phone}}</div>
                            </li>
                        </ul>
                        <div v-else style="text-align:center;line-height:100px;width:100%">暂无业务员</div>
                    </div>
                </div>
            </div>    
        </div>
    </div>
</template>
<script>
import Tabbar from "@/components/Tabbar";
import homeBanner from "@/components/homeBanner";
import activeBanner from "@/components/activeBanner";
import classSlider from "@/components/classSlider";
import classSlider1 from "@/components/classSlider1";
import activitySlider from "@/components/activitySlider";
import productList from "@/components/productList";
import integralContent from "@/components/integralContent";
import { MessageBox, Toast } from "mint-ui";
import {
    getPcid,
    m_div,
    m_sub,
    getUrlParam,
    isWeixinBrowser
} from "../utils/index.js";
import wxapi from "../utils/wxapi.js";
// 引入vuex快捷写法
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
    name: "home",
    components: {
        Tabbar,
        homeBanner,
        activeBanner,
        classSlider,
        classSlider1,
        activitySlider,
        productList,
        integralContent
    },
    data() {
        return {
            sharedSuccess: false,
            FirstShare: sessionStorage.isFirstShare,
            registerFlag: this.$store.getters["company"] ? true : false,
            viewBox: "",
            selected: "/",
            tab: "1",
            offsetTop: "",
            scrollTop: "",
            messageCount: "",
            nm: this.$store.getters["company"]
                ? this.$store.getters["company"].nm
                : "良之隆官方商城",
            hotList: [],
            NewList: [],
            num: 2,
            size: 10,
            rawNewList: [],
            discountList: [],
            suggestList: [],
            scrollHeight: "",
            windowHeight: "",
            companyId: getPcid(),
            shareId_str: getUrlParam("shareId"),
            meckShow:false,
            conpanyList:[],
            conpanyAll:[],
            cityList:[],
            currentIndex:0,
            conpanyShow:true,
            salesList:[],
            firstRegister:this.$route.query.firstRegister?this.$route.query.firstRegister:'',
            couponsList:[],
            firstCouponsAll:0,
            CouponShow:false,
            shopType:this.$store.getters["shop"].shopType? this.$store.getters["shop"].shopType: "",
            MemberFlag:sessionStorage.MemberFlag?sessionStorage.MemberFlag:false,
            // activityList: []
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        },
        logintoken() {
            return this.$store.getters["logintoken"];
        }
    },
    created() {
        if (this.shareId_str != null) {
            this.initPage();
            //初始化消息
            this.initMessageCount();
            //初始化货品
            this.initProduct();
            this.firstRegisterChange();
            this.initCouponShow();
            if(this.shopType){
                this.initCustomer() ;
            }
            
        } else {
            //网页地址替换
            this.authorize();
        }
    },
    mounted() {
        //分享
        if (this.shareId_str != null) {
            this.sharePage();
        }
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        sessionStorage.setItem("scrollTop", scrollTop);
        next();
    },
    // 进入该页面时，用之前保存的滚动位置赋值
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
                        if(response.res.tShopDoc.handleStatus){
                            this.MemberFlag=true;
                            sessionStorage.MemberFlag=true;
                        }  
                    }
                }
            })
        },
        initPage() {
            if (!this.logintoken) {
                let pcid = this.$route.query.pcid;
                this.$store.commit("setpcid", Number(pcid)); //未登录状态重新储存pcid
            }
            if (this.$route.query && this.$route.query.shareId) {
                sessionStorage.shareId = this.$route.query.shareId;
            }
        },
        authorize() {
            let shareId_str = getUrlParam("shareId");
            // const agent = navigator.userAgent;
            let companyId = this.companyId;
            let accountObj = this.$store.getters["account"];
            let shareId = accountObj.id ? accountObj.id : "";
            let firstRegister=this.$route.query.firstRegister
            if(firstRegister){
                var redirect_uri =
                location.origin + "/?pcid=" + companyId + "&shareId=" + shareId+"&firstRegister="+firstRegister;
            }else{
                var redirect_uri =
                location.origin + "/?pcid=" + companyId + "&shareId=" + shareId;
            }
            
            //分路由替换
            // const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
            // XXX: 修复iOS版微信HTML5 History兼容性问题
            if (shareId_str == null || shareId_str == undefined) {
                window.location.href = redirect_uri;
            } else {
            }
        },
        sharePage() {
            var url = window.location.href.split("#")[0];
            wxapi.wxRegister(this, url, {
                title: "新食材 天天见", // 分享标题
                imgUrl: "http://p1.lzl98.com/scmplus/upload/adv/logo.png", //分享图标
                desc: "良之隆邀您来逛逛，新人有礼哟！", // 分享描述
                success: res => {
                    this.sharedSuccess = true;
                },
                fail: res => {
                    Toast("产生了一个分享错误");
                }
            });
        },
        changIsFirstShare() {
            this.$store.commit("changIsFirstShare", true);
            this.FirstShare = sessionStorage.isFirstShare;
        },
        initProduct() {
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let _indexcontent =
                '{"companyId":"' +
                this.companyId +
                '","shopId":"' +
                shopId +
                '","shopType":"' +
                this.shopType +
                '","skuName":"","classid":"","owner":"","flag":"T"}';
            this.$post("/appVpProduct/productIndex.do", {
                content: _indexcontent,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(res => {
                    //初始化tab列表
                    if (JSON.parse(res).optFlag == "yes") {
                        this.hotList = JSON.parse(res).res.hotList;
                        this.suggestList = JSON.parse(res).res.maxSaleList;
                        this.$nextTick(() => {
                            const _scrollTop = sessionStorage.getItem("scrollTop") || 0;
                            window.scrollTo(0, parseInt(_scrollTop))
                        });
                    }
                })
                .catch(err => {});
        },

        initMessageCount() {
            let _content = "{'companyId':'" + this.companyId + "'}";
            this.$post("/message/messageCount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
               .then(res => {
                    //初始化消息个数
                    JSON.parse(res).optFlag == "yes"
                        ? (this.messageCount = JSON.parse(res).res)
                        : (this.messageCount = "");
                })
                .catch(err => {});
        },
        initCouponShow(){
            var account=this.$store.getters['account']?this.$store.getters['account'].account:''
            let _content = "{'couponId':'" + 17030 +"','account':'" +
                account + "'}";
            this.$post("/appCounpon/checkSpecialCouponShow.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(res => {
                   this.CouponShow=JSON.parse(res).optFlag
                })
                .catch(err => {});
        },
        upCallback(windowHeight) {
            if (
                this.$refs.viewBox.scrollTop + this.windowHeight ==
                this.scrollHeight
            ) {
                //     // 如果是第一页需手动制空列表
                if (this.num === 1) this.rawNewList = [];
                let arr = this.NewList.slice(
                    (this.num - 1) * this.size,
                    this.num * this.size
                );
                if (arr.length > 0) {
                    // 把请求到的数据添加到列表
                    this.rawNewList = this.rawNewList.concat(arr);
                    this.num++;
                } else {
                }
            }
        },
        goRegister() {
            let pcid = getPcid();
            this.$router.push({
                path: "register",
                query: { pcid: pcid, shareId: sessionStorage.shareId }
            });
        },
        toMsg() {
            if (this.logintoken) {
                this.$router.push({ path: "/myNews" });
            } else {
                this.$router.push({ path: "/login" });
            }
        },
        changeConpany(){
            let pcid = getPcid();
            var _content =
                "{'gpsLongitude':'" +
                0 +
                "','gpsLatitude':'" +
                0 +
                "','pcid':'" +
                pcid +
                "'}";
            this.$post("/appAccount/getNewCompanyListTo.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
                    ? this.$store.getters["logintoken"]
                    : ""
            })
            .then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                     this.meckShow=true
                     this.conpanyShow=true
                    var res = response.res;
                    //门店城市
                    this.cityList = res.filter(item => {
                        return item.isUse === 0;
                    });
                    //门店
                    this.conpanyAll = res.filter(item => {
                        return item.isUse === 1;
                    });
                    let value
                    res&&res.map(item=>{
                        if(item.itemId==pcid){
                            this.currentIndex=item.parentid
                            value=item.parentid
                        }
                    })
                    this.conpanyList = this.conpanyAll.filter(item => {
                        return item.parentid == value;
                    });
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            })
            .catch(err => {});
        },
       changeCity(value) {
            if (value) {
                this.currentIndex=value
                this.conpanyList = this.conpanyAll.filter(item => {
                    return item.parentid == value;
                });    
            } else {
                this.conpanyList = [];
            }
        },
        selectSales(companyId){
            var _content =
                "{'companyId':'" +
                companyId +
                "'}";
            this.$post("/mobileShop/checkSaleMan.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
                    ? this.$store.getters["logintoken"]
                    : ""
            })
            .then(res => {
                let response = JSON.parse(res);
                if(response.optFlag=='yes'){
                    this.conpanyShow=false;
                    this.salesList=response.res
                }else{
                    Toast(response.optDesc)
                }

            })
            .catch(err => {});
        },
        changeSales(item){
            // mobileShop/updateShopCompany.do 传参shopId，shopName，oldCompanyId（客户以前公司id），
            // newCompanyId（客户现在公司id），salesmanAccount（客户选择的业务员account），
            // salesGroupcode（客户选择的业务员业务组编码），salesGroupname（客户选择的业务员业务组名称）
            if(!this.$store.getters["shop"]){
                this.$router.push({path: "/login" });
                return
            }
            var shopId=this.$store.getters["shop"].id
            var shopName=this.$store.getters["shop"].shop_name
            var oldCompanyId=this.$store.getters["account"].companyId
            var _content =
                "{'shopId':'" +
                shopId +
                "','shopName':'" +
                shopName +
                "','oldCompanyId':'" +
                oldCompanyId +
                "','newCompanyId':'" +
                item.company_id +
                "','salesmanAccount':'" +
                item.account +
                "','salesGroupcode':'" +
                item.group_code +
                "','salesGroupname':'" +
                item.group_name +
                "'}";
            this.$post("/mobileShop/updateShopCompany.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
                    ? this.$store.getters["logintoken"]
                    : ""
            })
            .then(res => {
                let response = JSON.parse(res);
                if(response.optFlag=='yes'){
                    Toast(response.optDesc)
                    this.$store.commit("loginOut");
                    this.$store.commit("changIsFirstShare",'');
                    this.$router.push("/login");
                }else{
                    // this.meckShow=false
                    Toast(response.optDesc)
                    var str=response.optDesc;
                    if(str.indexOf('不允许修改门店')!=-1){
                        this.meckShow=false      
                    }
                }

            })
            .catch(err => {});
        },
        firstRegisterChange(){
            if(this.firstRegister){
                this.$post("/appCounpon/getCouponByRegister.do", {
                    content: "{'account':'" + this.$store.getters["account"].account + "'}",
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                        ? this.$store.getters["logintoken"]
                        : ""
                })
                .then(res => {
                    let response = JSON.parse(res);
                    console.log(response)
                    if(response.optFlag=='yes'){
                        // Toast(response.optDesc)
                        this.couponsList=response.res
                        response.res&& response.res.map((item)=>{
                           this.firstCouponsAll=this.firstCouponsAll+item.couponValue*1
                        })
                       
                    }else{
                        // this.meckShow=false
                        // Toast(response.optDesc);
                        this.firstRegister=''
                    }

                })
                .catch(err => {});
            }else{
                
            }
            
        },
        delMember(){
            this.MemberFlag=true;
            sessionStorage.MemberFlag=true;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.viewBox {
    .header-top {
        background: linear-gradient(to right, #fc9105, #f35410);
        height: 25px;
        line-height: 25px;
        position: relative;
        padding: 4px 10px;
        .nm {
            color: #ffffff;
            font-size: 15px;
            .down {
                font-size: 10px;
                margin-left: 4px;
            }
        }
    }
    .top-h {
        position: sticky;
        width: 100%;
        left: 0;
        top: 0;
        width: 100%;
        height: 45px;
        padding: 4px 10px;
        align-items: center;
        display: flex;
        align-items: center;
        z-index: 10;
        background: linear-gradient(to right, #fc9105, #f35410);
        .iconKH {
            font-style: normal;
            font-size: 24px;
            font-family: iconfont !important;
            color: #ffffff;
            width: 100%;
            display: inline-block;
            vertical-align: middle;
            text-align: left;
        }
        .homeSearch {
            flex: 1;
            margin-right: 15px;
            margin-left: 15px;
            height: 28px;
            position: relative;
            display: inline-block;
            vertical-align: middle;
            input {
                border: none;
                background: #ffffff;
                text-align: left;
                width: 100%;
                height: 28px;
                line-height: 30px;
                padding: 0 30px;
                border-radius: 3px;
                font-size: 12px;
            }
            .mintui {
                position: absolute;
                left: 10px;
                top: 5px;
                color: #b3b3b3;
            }
        }
        .msg-icon {
            position: relative;
            flex: 0 0 30px;
            display: inline-block;
            font-size: 26px;
            color: #fff;
            vertical-align: middle;
            .badge {
                background-color: #ff671d;
                position: absolute;
                width: auto;
                height: 14px;
                padding: 0 4px;
                line-height: 16px;
                text-align: center;
                top: 0px;
                right: -8px;
                font-size: 10px;
            }
        }
    }
    .mt-tab {
        position: sticky;
        width: 100%;
        left: 0;
        top: 44px;
        z-index: 10;
    }
    .shared {
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        height: 100%;
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        .share-png {
            position: absolute;
            top: 0;
            right: -10px;
            width: 180px;
            z-index: 1003;
        }
        .sharedContent {
            position: absolute;
            left: 0;
            right: 0;
            top: 120px;
            margin: auto;
            width: 270px;
            border-radius: 15px 15px 0 0;
            .sharedcancel {
                margin-top: 30px;
                text-align: center;
                background: rgba(0, 0, 0, 0);
                i {
                    font-size: 30px;
                    color: #ffffff;
                    cursor: pointer;
                    display: block;
                }
            }
            img {
                width: 100%;
                border-radius: 15px 15px 0 0;
            }
            .sharedtop {
                background: #fff;
                text-align: center;
                padding: 10px;
                border-radius: 10px;
                p {
                    color: #eb6000;
                    height: 28px;
                    line-height: 28px;
                    font-size: 14px;
                }
                h3 {
                    color: #eb6000;
                    height: 34px;
                    line-height: 34px;
                    font-size: 16px;
                    font-weight: 800;
                }
                .shareBtn {
                    margin: 10px;
                    width: 150px;
                    height: 34px;
                    line-height: 34px;
                    color: #fff;
                    background-color: #eb6000;
                    border-radius: 15px;
                }
            }
        }
    }
}

.swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px !important;
    left: 0;
    width: 100%;
}
.meck{
    position:fixed;
    right:0;
    left:0;
    top:0;
    bottom:0;
    margin:auto;
    background:rgba(0, 0, 0, 0.5);
    z-index:115;
    .meckBack{
        background:#ffffff;
        width:94%;
        margin:200px 3%;
        height:130px;
        max-height:350px;
        border-radius:10px;
        box-shadow:3px 3px 3px rgba(0, 0, 0, 0.4);
        h3{
            background:#eb6000;
            height:30px;
            width:100%;
            text-align:center;
            line-height:30px;
            font-size:16px;
            color:#ffffff;
            border-radius:10px 10px 0 0;
            position:relative;
            .iconleft{
                position:absolute;
                left:10px;
            }
        }
        .cityContent{
            display:flex;
            height:320px;
            width:100%;
            border-radius:0 0 10px 10px;
            .salesBorder{
                float: none;
                overflow-y: auto;
                background:#ffffff;
                // height: 100px;
                // max-height: 320px;
                width:100%;
                li{
                    height:28px;
                    line-height:28px;
                    width:97%;
                    border:1px solid #eeeeee;
                    margin:10px 1.5%;
                    display:flex;
                    .real_name{
                        width:40%;
                        padding-left:15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .phone{
                        flex:1;
                        color:#999999;
                    }
                }
            }
            .left {
                float: none;
                overflow: auto;
                // overflow-x:
                width: 70px;
                height: 100%;
                background: #f3f5f7;
                li {
                    position: relative;
                    float: none;
                    display: table;
                    padding: 0 8px;
                    width: auto;
                    height: 46px;
                    // border-bottom: 1px solid #ddd;
                    text-align: left;
                    font-size: 12px;
                    line-height: 14px;
                    span {
                        display: table-cell;
                        width: 56px;
                        color: #333;
                        vertical-align: middle;
                        font-size: 12px;
                    }
                    &.cur {
                        background-color: #fff;
                        span {
                            color: @base;
                        }
                    }
                    &.cur:before {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        height: 3px;
                        background-color: @base;
                    }
                }
            }
            .right {
                flex: 1;
                overflow-y: auto;
                background: #fff;
                padding-bottom:20px;
                // height: 100%;
                li{
                    padding:5px 10px;
                    border-bottom:1px solid #eeeeee;
                    .conpanyName{
                        color:#333333;
                        font-size:14px;
                        position:relative;
                        .iconRight{
                            position: absolute;
                            right: 0px;
                            font-size: 12px;
                        }
                    }
                    .conpanyAddress{
                        color:#999999;
                    }
                }

            }
        }
    }
}
.firstR{
    background:@base !important;
    h3{
        color:#333333 !important;
    }
    .card-ul {
        padding: 10px;
        height: 280px;
        overflow: auto;
        .card-list {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            background-color: #ffffff;
            position: relative;
            overflow: hidden;
            padding: 10px 5px 10px 0;
            -webkit-touch-callout: none;
            margin-bottom: 10px;
            .card-center-info {
                position: relative;
                flex: 1;
                width: 100%;
                height: 63px;
                padding-right: 5px;
                .card-name{
                    height: auto;
                    line-height: 16px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
            .couponRight {
                display: inline-block;
                position: relative;
                width: 60px;
                height: 63px;
                flex: 0 60px;
                -webkit-justify-content: center;
                justify-content: center;
                text-align: center;
                &:before {
                    content: "";
                    position: absolute;
                    top: -5px;
                    left: -6px;
                    bottom: -5px;
                    width: 1px;
                    border-left: 2px dotted #f1f1f1;
                }
                .yuan1 {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    background-color: #eb6000;
                    left: -10px;
                    top: -16px;
                }
                .yuan2 {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    background-color: #eb6000;
                    left: -10px;
                    bottom: -16px;
                }   
                .circl{
                    width:100%;
                    height:63px;
                    line-height:63px;
                    color:#eb6000;
                    font-size:18px;
                    font-weight:600;
                    text-align:center;
                }
            }
        }
    }
}
.rollMember{
    position: relative;
    // left:10px;
    
    // background: rgb(243, 162, 111);//;
    padding:10px;
    // height: 34px;
    .rollMember1{
        width:99%;
        // height:34px;
        line-height:34px;
        background:rgb(243, 162, 111);
        box-shadow:6px 4px 3px rgba(243, 162, 111, 0.5);
        color:#ffffff;
        padding-left:10px;
        // border-radius:8px;
        span{
            font-size:22px;
        }
        // position:absolute;
        // left:0;
        // top:0;
        // animation:mymove1 10s linear 0s infinite;
        // span{
        //     display:inline-block;
        //     width:50%;
        // }

    }
    // .rollMember2{
    //     width:100%;
    //     height:40px;
    //     line-height:40px;
    //     // background:rgba(235,96,0,0.5);
    //     color:#ffffff;
    //     position:absolute;
    //     left:0;
    //     top:0;
    //     animation:mymove2 10s linear 0s infinite;
    //     span{
    //         display:inline-block;
    //         width:50%;
    //     }
    // }
    .delMember{
        color: #999;
        position: absolute;
        right: 0.4rem;
        top: 15px;
        font-size: 0.6rem;
        z-index: 155;
        border-radius: 50%;
        width: 30px;
        text-align: right;
        height: 30px;
    }
}

@keyframes mymove2
{
	from {left:375px;}
    to {left:0px;}
}
@-webkit-keyframes mymove2 /*Safari and Chrome*/
{
	from {left:375px;}
    to {left:0px;}
}
@keyframes mymove1
{
	from {left:0px;}
    to {left:-375px;}
}
@-webkit-keyframes mymove1 /*Safari and Chrome*/
{
	from {left:0px;}
    to {left:-375px;}
}
</style>

