<template>
    <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
        <div class="dialog-wrapper card-dialog">
            <div class="dialog-box">
                <div class="dialog-header">优惠券<em class="tip-text">(*最多可使用200张)</em> <span class="close-dialog" @click.stop="hideDialog">×</span>
                </div>
                <div class="nav">
                    <p v-for="(item,index) in choices" @click="chosen(index,item.state)" :key="index" :value="item.state" :class="{'active':index==isActive}">{{item.couponStatus}}({{item.totalCount}})
                    </p>
                </div>
                <div class="card-wrapper" ref="cardsWrapper">
                    <div>
                        <ul class="mui-table-view" v-show="Y">
                            <li class="mui-table-view-cell card-list" v-for="(item,index) in couponListY" :key="index">
                                <!--页眉，放置标题-->
                                <div class="icon-card" :class="[(item.minMoney <= totalPrice && CompareDate(item.beginTime,item.endTime) == true) ? activeClass : errorClass]">
                                    <strong><span>￥</span>{{item.couponValue}}</strong>
                                    <p>满{{item.minMoney}}元可用</p>
                                </div>
                                <div class="card-info mui-checkbox">
                                    <h4 class="card-name">{{item.couponName}}</h4>
                                    <p class="card-time">{{item.beginTime | format}}~{{item.endTime | format}}</p>
                                    <input name="checkbox1" type="checkbox" :value="item" v-model="checked" @change="changChecked(index,item.ID)" v-if="((couponInfo.minMoney*1+item.minMoney*1)<=totalPrice && CompareDate(item.beginTime,item.endTime) == true )|| !!item.flag ">
                                    <input name="checkbox1" type="checkbox" :value="item" v-model="checked" disabled="disabled" v-else>
                                </div>
                            </li>
                        </ul>
                        <ul class="mui-table-view" v-show="N">
                            <li class="mui-table-view-cell card-list" v-for="(item,index) in couponListN" :key="index">
                                <!--页眉，放置标题-->
                                <div class="icon-card disable">
                                    <strong><span>￥</span>{{item.couponValue}}</strong>
                                    <p>满{{item.minMoney}}元可用</p>
                                </div>
                                <div class="card-info mui-checkbox">
                                    <h4 class="card-name">{{item.couponName}}</h4>
                                    <p class="card-time">{{item.beginTime | format}}~{{item.endTime | format}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="confirm_b">
                    <button class="sure_btn" @click="cardConfirm">确定</button>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
import { Toast ,Indicator} from "mint-ui";
import BScroll from "better-scroll";
import {
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    isNull,
    toFloat2
} from "../utils/index.js";
export default {
    name: "cardsWrapper",
    props: {
        totalPrice: {
            type: Number, //规定此数据必须是Boolean或Number类型
            default() {
                return 0; //规定此数据的默认值
            }
        },
        orders: {
            type: Array,
            default() {
                return 0; //规定此数据的默认值
            }
        },
        cardShow: {
            type: Boolean
        }
    },
    data() {
        return {
            // orders: this.$store.state.orders,
            couponInfo: { couponValue: 0, minMoney: 0, ID: [] },
            priceSpread: 0,
            couponListY: [],
            couponListN: [],
            Y: true,
            N: false,
            checkedObj: [],
            checked: [],
            totalCount: "",
            choices: [],
            isActive: "0",
            activeClass: "active",
            errorClass: "disable",
            couponSend: ""
        };
    },
    mounted() {},
    watch: {
        cardShow: function(val) {
            if (val) {
                this.$nextTick(() => {
                    this._initScroll();
                });
            }
        },
        checked: function() {
            this.couponInfo.couponValue = 0;
            this.couponInfo.minMoney = 0;
            this.couponInfo.ID =
                this.checked &&
                this.checked.map((item, index) => {
                    this.couponInfo.couponValue = m_add(
                        this.couponInfo.couponValue,
                        item.couponValue
                    );
                    this.couponInfo.minMoney = m_add(
                        this.couponInfo.minMoney,
                        item.minMoney
                    );
                    return item.ID;
                });
            //向父组件传递优惠券信息
            this.$emit("initCount", this.totalCount, this.couponInfo);
        }
    },
    created() {
        // this.getCouponForOrderApp("Y");
        // this.getCouponForOrderApp("N");
        this.getCouponForOrderApp();
    },
    methods: {
        changChecked(i, id) {
            this.couponListY[i].flag = !this.couponListY[i].flag;
        },
        /*初始化菜单*/
        chosen(index, state) {
            this.isActive = index;
            if (state == "Y") {
                this.Y = true;
                this.N = false;
            } else {
                this.Y = false;
                this.N = true;
            }
        },
        CompareDate: function(begintime, endtime) {
            var curTime = new Date();
            //2把字符串格式转换为日期类
            begintime = begintime.replace(new RegExp(/-/gm), "/");
            endtime = endtime.replace(new RegExp(/-/gm), "/");
            //解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题
            var startTime = new Date(Date.parse(begintime));
            var endTime = new Date(Date.parse(endtime));
            //3进行比较
            return curTime >= startTime && curTime <= endTime;
        },
        cardConfirm() {
            this.$nextTick(() => {
                let total = this.totalPrice;
                let minMoney =
                    this.couponInfo && this.couponInfo.minMoney
                        ? this.couponInfo.minMoney
                        : "0";
                this.priceSpread = m_sub(
                    parseFloat(minMoney),
                    parseFloat(total)
                );
            });
            this.hideDialog();
        },
        hideDialog() {
            this.$emit("hide");
        },
        _initScroll() {
            var self = this;
            self.cardScroll = new BScroll(self.$refs.cardsWrapper, {
                click: true
            });
        },
        getTClasses() {
            var cls = [];
            var orderlist = this.orders;
            var len = orderlist.length;
            for (var i = 0; i < len; i++) {
                var unit_price = orderlist[i].preunitPrice || orderlist[i].unit_price || orderlist[i].unitPrice || 0;
                var m_price = orderlist[i].prePrice || orderlist[i].price || 0;
                var price = m_add(
                    m_mul(parseFloat(unit_price), orderlist[i].value || 0),
                    m_mul(parseFloat(m_price), orderlist[i].mnum_value || 0)
                );
              
                var obj = {
                    classId: orderlist[i].couponLabelId ? orderlist[i].couponLabelId : orderlist[i].class_id ? orderlist[i].class_id : orderlist[i].classId,
                    price: price
                };
                cls.push(obj);
            }
            return cls;
        },
        repeatArr(arr, key) {
            if(arr.length < 2){
                return arr;
            }
            let newArr = [];
            arr.forEach(el => {
                const _index = newArr.findIndex(ol => {
                    return el[key] === ol[key];
                });
                if (_index !== -1) {
                    //存在相同的classId
                    newArr[_index].price = newArr[_index].price + el.price;
                } else {
                    //不存在相同的classId
                    newArr.push(el);
                }
            });
            return newArr;
        },
        getCouponForOrderApp() {
            let accountObj = this.$store.getters["account"];
            let account = accountObj.account;
            Indicator.open({
                text: 'loading...',
                spinnerType: 'fading-circle'
            });
            let newCls = this.repeatArr(this.getTClasses(), "classId");
            let cls = JSON.stringify(newCls);
            let content_ = '{"skus":' + cls + ',"account":"' + account + '"}';
            this.$post("/appCounpon/getCouponForOrderAppNew.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.choices = response.res.couponStatusCount;
                    this.totalCount = response.res.couponStatusCount[0]
                        .totalCount
                        ? response.res.couponStatusCount[0].totalCount
                        : 0;
                    //向父组件传递优惠券信息
                    this.$emit("initCount", this.totalCount, this.couponInfo);
                    this.couponListY = response.res.canUseCouponList;
                    this.getMaxValueCouponApp(
                        response.res.canUseCouponList,
                        this.totalPrice
                    );
                    this.couponListN = response.res.canNotUseCouponList;
                    setTimeout(() => {
                        Indicator.close();
                    }, 22500)
                } else {
                    Toast({
                        message: "获取失败",
                        duration: 1000
                    });
                    setTimeout(() => {
                        Indicator.close();
                    }, 33500)
                }
            });
        },
        getMaxValueCouponApp(couponListY, totalPrice) {
            couponListY &&
                couponListY.map((item, index) => {
                    let minMoney = m_add(
                        this.couponInfo.minMoney,
                        item.minMoney
                    );
                    let flag = this.CompareDate(item.beginTime, item.endTime);
                    if (minMoney <= totalPrice && flag == true) {
                        this.checked.push(item);
                        this.couponListY[index].flag = !this.couponListY[index]
                            .flag;
                        this.couponInfo.couponValue = m_add(
                            this.couponInfo.couponValue,
                            item.couponValue
                        );
                        this.couponInfo.minMoney = m_add(
                            this.couponInfo.minMoney,
                            item.minMoney
                        );
                        this.couponInfo.ID.push(item.ID);
                    }
                });
            // this.priceSpread = m_sub(
            //     parseFloat(this.couponInfo.minMoney),
            //     parseFloat(totalPrice)
            // );
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
