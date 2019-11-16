<template>
    <div class="classify">
        <!--头部start-->
        <div class="top-bar clearfix">
            <div class="top-bar-box">
                <div class="top_search  mui-pull-left">
                    <span class="search-icon iconfont">&#xe7b7;</span>
                    <form action="#">
                        <input type="search" class="mui-pull-left" placeholder="输入食材名称/编码/拼音搜索" v-model="searchTx" id="search_input" @focus="search">
                    </form>
                    <!-- <button class="search_btn" @click="search(searchTx)">搜索</button> -->
                </div>
            </div>
        </div>
        <!--tab开始-->
        <div class="tab tabContent classifyBox">
            <div class="left menu-wrapper" ref="menuWrapper">
                <ul id="typeList">
                    <!-- <li :class="{'cur':currentIndex=='-1'}" @click="alwarysByProductList('-1')"><span>常购清单</span>
                    </li> -->
                    <li v-for="(item,index) in ProductT" :key="index" :id="item.ID" :index="index" :class="{'cur':currentIndex==index}" ref="menuList" @click="selectMenu(index)"><span>{{item.NAME}}</span>
                    </li>
                </ul>
            </div>
            <div class="right foods-wrapper" id="goodsList" ref="foodsWrapper">
                <div class="fixed-bar" v-show="classTwoList.length > 0 ">
                    <div class="slider" ref="slider">
                        <div class="slider-group">
                            <div class="slider-item" v-show="item.class_two_name" v-for="(item,index) in classTwoList" :key="index" :id="item.class_two_id" @click="selectSubMenu(index,item.class_two_id)" :class="{'cur':curIndex===index}">
                                {{item.class_two_name}}
                            </div>
                        </div>
                    </div>
                    <div class="up-down" @click="popupVisible = !popupVisible">
                        <span class="iconfont">&#xe728;</span>
                    </div>
                    <div class="popupVisible" v-show="popupVisible" @click.stop.prevent="popupVisible=false">
                        <div class="popWrap">
                            <div class="pop-item" v-show="item.class_two_name" v-for="(item,index) in classTwoList" :key="index" :id="item.class_two_id" @click="selectSubMenu(index,item.class_two_id)" :class="{'cur':curIndex===index}">
                                <span>{{item.class_two_name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab_content" ref="foodList" :class="[classTwoList.length > 0 ?'top-content':'']" style="overflow: auto;">
                    <div>
                        <ul class="goods-list">
                            <router-link :to='{path:"/detail",query:{id:food.id}}'  class="mui-table-view-cell" tag="li" :key="index" v-for="(food,index) in ProductS" :pid="food.id">
                                <div class="food-link">
                                    <img v-lazy="baseurl+food.img_path+'?time='+timeNum" :key="food.img_path">
                                    <!-- <div class="gift-img"><span>赠</span><img :src="baseurl + food.img_path" alt=""></div> -->
                                    <span class="is_enable" v-show="food.is_enable == 'N'">已下架</span>
                                    <div class="recommend">
                                        <h4 class="skuName">
                                            <!-- <i class="iconfont gift" v-if="food.is_gift == 'Y'">&#xe6c7;</i> -->
                                            {{food.spu_name ? food.spu_name : food.sku_name}}</h4>
                                        <p class="styleno">规格:{{food.styleno}}</p>
                                        <span class="tag" v-if="food.full_gift && JSON.parse(food.full_gift).requireType != 2">满赠</span>
                                        <span class="tag" v-else-if="food.full_gift && JSON.parse(food.full_gift).requireType == 2">满减</span>
                                        <p class="styleno"><span class="tag" v-if="food.rkpriceList">以量定价</span></p>
                                        <p class="styleno" v-show="registerFlag"> <span v-show="shopType!=4" style="font-size:12px;color:#e75b5a">会员价：</span></p>
                                        <span class="price hide-price" v-show="!registerFlag">价格:登录后可见</span>
                                        <span class="price" v-show="registerFlag">
                                            <span style="color:#e75b5a">￥</span>
                                            <span v-if="food.is_default_spu ==1&&food.spu_min_unit_price" style="font-size:18px;color:rgb(231, 91, 90)">{{food.spu_min_unit_price }}</span>
                                            <span style="font-size:18px;color:rgb(231, 91, 90)" v-else>{{food.unit_price}}</span>/{{food.unit}}
                                            <span class="retail_price" v-if="food.retail_flag =='Y'&&food.is_default_spu!=1">(￥{{food.price}}/{{food.uom_default}})</span>
                                            <span class="retail_price" v-if="food.retail_flag =='Y'&&food.is_default_spu==1&& !food.spu_min_price">(￥{{food.price}}/{{food.uom_default}})</span>
                                             <span class="retail_price" v-if="food.retail_flag =='Y'&&food.is_default_spu==1 && food.spu_min_price">(￥{{food.spu_min_price}}/{{food.uom_default}})</span>
                                             <em v-if="food.is_default_spu ==1&&food.spu_min_unit_price" class="begin" style="text-decoration: none;">起</em>
                                        </span>
                                    </div>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food" @addCart="addFood"></cartcontrol>
                                </div>
                            </router-link>
                        </ul>
                    </div>
                </div>
                <div class="empty-box" v-show="isShow">
                    <div class="empty-img">
                        <img src="../../../static/images/none.png" alt="">
                    </div>
                    <p>亲,暂无相关数据哦~</p>
                </div>
            </div>
        </div>
        <Tabbar :selected="selected" ref="shopcart"></Tabbar>
    </div>
</template>

<script>
// import BScroll from "better-scroll";
import Tabbar from "@/components/Tabbar";
import { Toast } from "mint-ui";
import cartcontrol from "@/components/cartcontrol";
import { getPcid } from "../../utils/index.js";
export default {
    name: "classify",
    components: {
        Tabbar,
        cartcontrol
    },

    data() {
        return {
            selected: "/classify",
            classTwoList: [],
            currentIndex: this.$route.query.tab?this.$route.query.tab:0,
            registerFlag: this.$store.getters["company"] ? true : false,
            showList: [],
            ProductS: [],
            ProductT: [],
            scrollY: 0,
            isShow: this.$route.query.tab ? false : true,
            searchTx: "",
            popupVisible: false,
            curIndex: "",
            alwarysList: [],
            foodsScroll : null,
            scrollTop:this.$store.state.scrollY,
            shopType:this.$store.getters["shop"].shopType ? this.$store.getters["shop"].shopType:4,
            timeNum:(new Date()).valueOf(),
        };
    },
    created() {
        // this.alwarysByProductList("-2"); //初始化
        this.initProduct();
       
    },
    activated() {
        this.registerFlag = this.$store.getters["company"] ? true : false;
        const scrollTop = sessionStorage.getItem("scrollY") || 0;
        this.$refs.foodList.scrollTo(0,scrollTop)
    },
    //在页面离开时记录滚动位置
    beforeRouteLeave (to, from, next) {
        let scrollTop = this.$refs.foodList.scrollTop || 0;
        sessionStorage.setItem("scrollY", scrollTop);
        sessionStorage.setItem("currentIndex", this.currentIndex)
        next();
    },
    methods: {
        //改变顶栏定位
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            });
        },
        search() {
            this.$router.push({ path: "/search" });
        },
        initProduct() {
            //获取产品信息
            let companyId = getPcid();
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let shopType=this.$store.getters["shop"].shopType
                ? this.$store.getters["shop"].shopType
                : ""; 
            this.$post("/appVpProduct/classProductList.do", {
                content: '{"companyId":"' + companyId +'","shopId":"' + shopId + '","shopType":"' + shopType + '"}',
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    var resList=response.res
                    var temp;
                    for (var i = 0; i < resList.length; i++) {
                        for (var j = i; j < resList.length; j++) {
                            var itemN = resList[i].sort||parseFloat(resList[i].sort)==0
                                ? parseFloat(resList[i].sort)
                                : 999999999999;
                            var itemM = resList[j].sort||parseFloat(resList[j].sort)==0
                                ? parseFloat(resList[j].sort)
                                : 999999999999;
                            if (itemN > itemM) {
                                temp = resList[i];
                                resList[i] = resList[j];
                                resList[j] = temp;
                            }
                        }
                    }
                    this.ProductT =resList.map((item)=>{
                        let tempTwo;
                        if(item.list){
                            for (var i = 0; i < item.list.length; i++) {
                                for (var j = i; j < item.list.length; j++) {
                                    var itemTwoN = item.list[i].classTwoSort||parseFloat(item.list[i].classTwoSort)==0
                                        ? parseFloat(item.list[i].classTwoSort)
                                        : 999999999999;
                                    var itemTwoM = item.list[j].classTwoSort||parseFloat(item.list[j].classTwoSort)==0
                                        ? parseFloat(item.list[j].classTwoSort)
                                        : 999999999999;
                                    if (itemTwoN > itemTwoM) {
                                        tempTwo = item.list[i];
                                        item.list[i] = item.list[j];
                                        item.list[j] = tempTwo;
                                    }
                                }
                            }
                        }
                        return item
                    });
                    if (this.currentIndex != "-1") {
                        this.ProductS = this.ProductT[this.currentIndex].list;
                        this.ProductS.length > 0
                        ? (this.isShow = false)
                        : (this.isShow = true);
                        let classTwoList = this.ProductS.filter(item => {
                            return (
                                item.class_two_id != "" &&
                                item.class_two_id != null
                            );
                        });
                        let classList = [];
                        this.classTwoList = this.array_merge(
                            classTwoList,
                            classList
                        );
                        // this.$nextTick(() => {
                        //     this._initScroll();
                        // });
                    }
                } else {
                    Toast({
                        message: "商品加载失败",
                        duration: 1000
                    });
                }
            });
        },
        _initScroll() {
        //     var self = this;
        //     self.meunScroll = new BScroll(self.$refs.menuWrapper, {
        //         click: true,
        //         useTransition: false //防止苹果端卡顿
        //     });
        //     self.slider = new BScroll(self.$refs.slider, {
        //         click: true,
        //         scrollX: true,
        //         eventPassthrough: "vertical" //忽略竖直方向的滚动
        //     });
        //     self.foodsScroll = new BScroll(self.$refs.foodList, {
        //         click: true,
        //         probeType: 3,
        //         useTransition: false //防止苹果端卡顿
        //     });
            
            // self.foodsScroll.scrollTo(0, self.$store.state.scrollY);
            // self.foodsScroll.hasVerticalScroll = true;
            // self.foodsScroll.maxScrollY += 2000;

        },
        //获取常购清单列表
        alwarysByProductList(type) {
            let tab = this.$route.query.tab;
            this.curIndex = "";
            if (tab == "0" && type == "-2") {
                //初始化
                this.currentIndex = tab;
                this.initProduct();
            } else if (tab && type == "-2") {
                //初始化
                this.currentIndex = tab;
                this.initProduct();
            } else if (tab && type == "-1") {
                //点击常购清单
                this.currentIndex = "-1";
                this.initAlwarysList();
                this.initProduct();
            } else if (!tab && type == "-1") {
                this.currentIndex = "-1";
                this.initAlwarysList();
                this.initProduct();
            } else {
                this.currentIndex = "-1";
                this.initAlwarysList();
                this.initProduct();
            }
        },
        initAlwarysList() {
            let companyId = getPcid();
            let shopId = this.$store.getters["account"].shopId
                ? this.$store.getters["account"].shopId
                : "";
            let content = {
                companyId,
                shopId
            };
            this.$post("/appVpProduct/alwarysByProductList.do", {
                content: JSON.stringify(content),
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.ProductS = response.res.suggestList;
                    this.alwarysList = response.res.suggestList;
                    this.ProductS.length > 0
                        ? (this.isShow = false)
                        : (this.isShow = true);
                    let classTwoList = this.ProductS.filter(item => {
                        return (
                            item.class_two_id != "" && item.class_two_id != null
                        );
                    });
                    let classList = [];
                    this.classTwoList = this.array_merge(
                        classTwoList,
                        classList
                    );
                    // this.$nextTick(() => {
                    //     this._initScroll();
                    // });
                } else {
                    Toast("商品加载失败");
                }
            });
        },
        selectMenu(index) {
            this.curIndex = "";
            this.currentIndex = index;
            this.ProductS = this.ProductT[index].list;
            this.ProductS.length > 0
                ? (this.isShow = false)
                : (this.isShow = true);
            let classTwoList = this.ProductS.filter(item => {
                return item.class_two_id != "" && item.class_two_id != null;
            });
            let classList = [];
            this.classTwoList = this.array_merge(classTwoList, classList);
            this.$router.replace({ path: "/classify", query:{tab:index}});
            this.$refs.foodList.scrollTo(0,0)
        },
        array_merge(base_array, current_array) {
            for (var i = 0; i < base_array.length; i++) {
                var flag = true;
                for (var j = 0; j < current_array.length; j++) {
                    if (
                        base_array[i].class_two_id ==
                        current_array[j].class_two_id
                    ) {
                        flag = false;
                    }
                }
                if (flag) {
                    current_array.push(base_array[i]);
                }
            }
            return current_array;
        },
        selectSubMenu(index, classTwoId) {
            this.popupVisible = false;
            this.curIndex = index;
            let _index = this.currentIndex;
            if (_index == "-1") {
                this.ProductS = this.alwarysList.filter(item => {
                    return item.class_two_id == classTwoId;
                });
            } else {
                this.ProductS = this.ProductT[_index].list.filter(item => {
                    return item.class_two_id == classTwoId;
                });
            }
            this.ProductS.length > 0
                ? (this.isShow = false)
                : (this.isShow = true);
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.top-bar {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1;
    padding: 0 15px;
    height: 60px;
    border-bottom: 0;
    background:linear-gradient(to right, #fc9105, #f35410);
    .top-bar-box {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        .top_search {
            position: relative;
            height: 100%;
            flex: 1;
            .search-icon {
                position: absolute;
                top: 20px;
                left: 10px;
                color: #b3b3b3;
                font-size: 14px;
                border: 0;
                box-sizing: border-box;
            }
            input {
                margin: 12px auto;
                padding: 0 15px !important;
                height: 36px;
                width: 100%;
                border-radius: 3px !important;
                background-color: #fff;
                text-align: left;
                text-indent: 15px;
                line-height: 36px;
            }
            .search_btn {
                position: absolute;
                top: 12px;
                right: 10px;
                height: 36px;
                border: 0;
                background-color: transparent;
                color: @base;
                letter-spacing: 0;
                font-weight: 400;
                font-stretch: normal;
                font-size: 1pc;
            }
        }
    }
}
.tabContent {
    position: fixed;
    top: 60px;
    bottom: 45px;
    z-index: 2;
    display: flex;
    overflow: hidden;
    width: 100%;
    flex-flow: row;
    .left {
        float: none;
        overflow-x: hidden;
        width: 70px;
        height: 100%;
        background: #f3f5f7;
        flex: 0 0 70px;
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
                width: 100px;
                height: 3px;
                background-color: @base;
            }
        }
    }
    .right {
        float: none;
        // margin-bottom: calc(100vh - 221px);
        // margin-bottom: -moz-calc(100VH - 221px);
        flex: 1;
        background: #fff;
        height: 100%;
        width: calc(100vw - 70px);
        position: relative;
        .fixed-bar {
            position: absolute;
            left: 0;
            right: 0;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #eee;
            background-color: #fff;
            z-index: 2;
            padding-left: 10px;
            .up-down {
                position: absolute;
                height: 100%;
                width: 55px;
                text-align: center;
                top: 0;
                right: 0px;
                font-size: 16px;
                font-weight: 600;
                color: #666666;
                border-left: 1px solid #eee;
                z-index: 4;
                background-color: #ffffff;
            }
            .slider {
                width: 240px;
                height: 100%;
                overflow: hidden;
                .slider-group {
                    position: absolute;
                    left: 10px;
                    top: 0;
                    width: auto;
                    white-space: nowrap;
                    .slider-item {
                        display: inline-block;
                        margin-right: 15px;
                        width: auto;
                        &.cur {
                            color: @base;
                        }
                    }
                }
            }
        }
        .empty-box {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            .empty-img {
                width: 108px;
                height: 84px;
                margin: auto;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
.popupVisible {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    top: 40px;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    .popWrap {
        background-color: #fff;
        display: flex;
        padding: 10px 0 0 10px;
        justify-content: flex-start;
        flex-flow: row wrap;
        .pop-item {
            background-color: #ddd;
            color: #333;
            width: 88px;
            height: 42px;
            text-align: center;
            border-radius: 3px;
            margin-bottom: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 10px;
            &.cur {
                background-color: #ffffff;
                color: @base;
                border: 1px solid @base;
            }
        }
    }
}
.tab_content {
    pointer-events: auto;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    &.top-content {
        top: 40px;
    }
    h1 {
        padding: 5px 10px;
        background-color: #ddd;
        text-align: left;
        font-size: 14px;
    }
}
</style>
