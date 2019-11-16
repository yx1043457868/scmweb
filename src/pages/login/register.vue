<template>
    <div class="login">
        <header class="mint-header">
            <div class="mint-header-button is-left" @click="back">
                <button
                    class="mint-button mint-button--default mint-button--normal"
                >
                    <span class="mint-button-icon"
                        ><i class="mintui mintui-back"></i
                    ></span>
                    <label class="mint-button-text"></label>
                </button>
            </div>
            <h1 class="mint-header-title">注册</h1>
            <div class="mint-header-button is-right"></div>
        </header>
        <!-- <a href="http://service.weibo.com/share/share.php?appkey=222&title=111&url=http://m.lzl98.com/web/register?pcid=65&searchPic=false&style=simple" target="_blank"><img src="/static/weibo.png" alt="wechat"> 分享到微博</a> -->
        <div class="login-box">
            <div class="login-logo">
                <img src="../../assets/logo.png" alt="" />
            </div>
            <div class="login-group">
                <form action="" autocomplete="off">
                    <div class="input-item">
                        <label for=""
                            ><i class="icon iconfont">&#xe725;</i></label
                        >
                        <span class="pie">|</span>
                        <input
                            type="tel"
                            placeholder="请输入您的手机号"
                            v-model="phone"
                            autofocus="autofocus"
                        />
                    </div>
                    <div class="input-item">
                        <label for=""
                            ><i class="icon iconfont">&#xe658;</i></label
                        >
                        <span class="pie">|</span>
                        <input
                            type="text"
                            placeholder="请输入验证密码"
                            v-model="secCode"
                        />
                        <button
                            type="button"
                            class="reg-btn"
                            @click="sendCode"
                            :disabled="disabled"
                        >
                            {{ code_text }}
                        </button>
                    </div>
                    <div
                        class="input-item"
                    >
                        <!--:class="recommend!=addCompCity?'input-item-margin':''" -->
                        <label for=""
                            ><i class="icon iconfont">&#xe82b;</i></label
                        >
                        <span class="pie">|</span>
                        <input
                            type="password"
                            placeholder="请设置密码"
                            v-model="pwd"
                        />
                    </div>
                    
                    <div class="input-item input-item-border">
                        <label for=""
                            ><i class="icon iconfont">&#xe646;</i></label
                        >
                        <span class="pie">|</span>
                        <input
                            type="text"
                            placeholder="请输入联系人姓名（可不填）"
                            v-model="linkman"
                            autofocus="autofocus"
                        />
                    </div>
                    <div class="input-item input-item-border" style="margin-bottom:0">
                        <label for=""
                            ><i class="icon iconfont">&#xe676;</i></label
                        >
                        <span class="pie">|</span>
                        <input
                            type="text"
                            placeholder="业务员邀请码（可不填）"
                            v-model="inviteCode"
                        />
                    </div>
                    <!-- <div style="color:red" v-show="recommend != addCompCity">
                        当前定位：{{ addCompCity }}--暂无门店,已为您推荐附近城市
                    </div> -->
                    <div class="serverItem">------------ 请选择为您服务的门店 ------------</div>
                    <div class="input-item" style="margin-bottom:0">
                        <!-- <label for=""
                            ><i class="icon iconfont">&#xe60c;</i></label
                        >
                        <span class="pie">|</span> -->
                        <select
                            name="city"
                            v-model="city"
                            class="changStyleCity"
                            @change="changeCity(city)"
                        >
                            <option value="-1" disabled="disabled"
                                >请选择城市</option
                            >
                            <option
                                :value="city.id"
                                v-for="(city, index) in provinceList"
                                :key="index"
                                >{{ city.NAME }}</option
                            >
                        </select>
                        <i class="icon iconfont colorIcon">&#xe728;</i>
                        <!-- <span class="pie">|</span> -->
                        <div
                            @click="contactUsFalse = true"
                            style="height:40px;line-height:40px;width:70%;text-align:center;"
                        >
                            {{ cidName }}
                        </div>
                        <i class="icon iconfont colorIcon">&#xe728;</i>
                        <!-- <select name="cid" v-model="cid" style="height: 100%;width:210px;" v-show="companyList && companyList.length > 0"> 
                            <option value="" disabled="disabled">请选择门店</option>
                            <option :value="item.itemId" v-for="(item,index) in companyList" :key="index">{{item.NAME}}({{item.address}})</option>
                        </select> -->
                    </div>
                    <div class="changeServer" v-if="!latitude||!longitude">定位关闭，获取门店距离不准，请打开定位后刷新</div>
                    <div class="changeServer" v-else>已自动为您定位就近门店，您也可以点击修改</div>
                    <button
                        type="button"
                        size="large"
                        class="login-btn"
                        @click="register"
                        :disabled="disabledReg"
                    >
                        注册
                    </button>
                </form>
                <div class="link-box">
                    <router-link to="/login" class="link" style="margin-right:0">
                        已有账号，去登录 》
                    </router-link>
                </div>
                <div class="link-box"></div>
            </div>
        </div>
        <div class="mask" v-show="contactUsFalse">
            <div class="mask-table-view" @click="contactUsFalse = false">
                <div class="mask-title">附近门店</div>
                <ul class="mui-table-view">
                    <li
                        class="mui-table-view-cell mui-media"
                        v-for="(item, index) in companyList"
                        :key="index"
                        @click="changecid(item)"
                    >
                        <a href="javascript:;" class="mui-navigate-right">
                            <!-- <img class="mui-media-object mui-pull-left" src="../images/shuijiao.jpg"> -->
                            <div class="mui-media-body">
                                <div class="clearfix shop-title">
                                    <span class="mui-pull-left shop-name">{{
                                        item.NAME
                                    }}</span>
                                    <span
                                        class="mui-pull-right mask-distance"
                                        v-show="item.distance"
                                        >距离您：{{
                                            item.distance | formatPrePrice
                                        }}km</span
                                    >
                                </div>
                                <p class="address-text" v-show="item.address">
                                    {{ item.address }}
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import wx from 'weixin-js-sdk'
import {
    isPoneAvailable,
    getPcid,
    toFloat2,
    m_div
} from "../../utils/index.js";
import md5 from "js-md5";
export default {
    name: "Login",
    components: {},
    data() {
        return {
            linkman: "",
            phone: "",
            pwd: "",
            secCode: "",
            inviteCode: "",
            pcid: "",
            cid: "",
            cidName: "",
            city: "-1",
            disabled: false,
            count: 60,
            code_text: "获取验证码",
            intervalobj: null,
            companyList: [],
            provinceList: [],
            cityList: [],
            contactUsFalse: false,
            // addCompCity: "",
            recommend: "",
            latitude:'',//纬度
            longitude:''//经度
        };
    },
    created() {
        let pcid = this.$route.query.pcid;
        this.$store.commit("setpcid", parseFloat(pcid));
        // this.getNearCompany();
        this.isweixin(); 
        // this.getCompanyList(this)
    },
    filters: {
        formatPrePrice: function(value) {
            return toFloat2(value);
        }
    },
    computed: {
        disabledReg() {
            if (this.phone == "" || this.pwd == "" || this.secCode == "") {
                return true;
            } else {
                return false;
            }
        }
    },
    directives: {
        mtfocus(el, binding, vnode) {
            let mtinput = el.querySelector("input");
            mtinput.onfocus = function() {
                alert(this.phone);
            };
            mtinput.onblur = function() {
                alert(this.phone);
            };
        }
    },
    methods: {
        isweixin() {
            var self=this
            const ua = window.navigator.userAgent.toLowerCase()
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                self.wxRegister(self)
            } else {
                self.getCompanyList(self)
            }
        },
        wxRegister(self) {
            var url = window.location.href.split("#")[0];
            this.$post("/share/signature.do?ts=" + Math.random(), {
                url: url
            }).then(res => {
                var response = JSON.parse(res);
                wx.config({
                    debug:false, // 开启调试模式
                    appId: response.appId, // 必填，公众号的唯一标识
                    timestamp: response.timestamp, // 必填，生成签名的时间戳
                    nonceStr: response.nonceStr, // 必填，生成签名的随机串
                    signature: response.signature, // 必填，签名，见附录1
                    jsApiList: ['getLocation']
                })
                wx.ready(() => {
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            self.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            self.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            var speed = res.speed; // 速度，以米/每秒计
                            var accuracy = res.accuracy; // 位置精度
                            self.getCompanyList(self)
                        },
                        cancel:function(){
                            self.getCompanyList(self)
                        },
                        fail:function(){
                            self.getCompanyList(self)
                        },
                    });
                })
                // wx.error(()=>{
                //     var geolocation = new BMap.Geolocation();
                //     geolocation.getCurrentPosition(
                //         function(r) {
                //             if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                //                 self.longitude = r.point.lng;
                //                 self.latitude = r.point.lat;
                //                 self.getCompanyList(self)
                //             }
                //         })
                // })
            }).catch((error) => {
                console.log(error)
            })
        },
        changecid(item) {
            this.cidName = item.NAME;
            this.cid = item.itemId;
            this.contactUsFalse = false;
        },
        changeCity(value) {
            if (value) {
                this.companyList = this.cityList.filter(item => {
                    return item.parentid == value;
                });
                this.contactUsFalse = true;
                this.cid = "";
                this.cidName = "";
            } else {
                this.companyList = [];
                this.cid = "";
                this.cidName = "";
            }
        },
        back() {
            this.$router.push({ path: "/login" });
        },
        //md5密码加密
        CalcuMD5(pwd) {
            pwd = md5(pwd);
            return pwd;
        },
        checkFhone() {
            var content_ = "{'contactPhone':'" + this.phone + "'}";
            this.$post("/appAccount/appCheckPhone.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
                    ? this.$store.getters["logintoken"]
                    : ""
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.checkCode();
                } else {
                    Toast(response.optDesc);
                    this.phone = "";
                }
            });
        },
        // objectArraySort(keyName) {
        //     return function (objectN, objectM) {
        //     var valueN = objectN[keyName]?parseFloat(objectN[keyName]):999999999999
        //     var valueM = objectM[keyName]?parseFloat(objectM[keyName]):999999999999
        //     if (valueN < valueM) return -1
        //     else if (valueN > valueM) return 1
        //     else return 0
        //     }
        // },
        getCompanyList(self) {
            let pcid = self.$route.query.pcid
                ? self.$route.query.pcid
                : getPcid();
            var _content =
                "{'gpsLongitude':'" +
                self.longitude +
                "','gpsLatitude':'" +
                self.latitude +
                "','pcid':'" +
                pcid +
                "'}";
            self.$post("/appAccount/getNewCompanyListTo.do", {
                content: _content,
                version: "kkllo",
                login_token: self.$store.getters["logintoken"]
                    ? self.$store.getters["logintoken"]
                    : ""
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    var res = response.res;
                    // res.sort(self.objectArraySort('distance'))
                    var temp;
                    for (var i = 0; i < res.length; i++) {
                        for (var j = i; j < res.length; j++) {
                            var itemN = res[i].distance||parseFloat(res[i].distance)==0
                                ? parseFloat(res[i].distance)
                                : 999999999999;
                            var itemM = res[j].distance||parseFloat(res[j].distance)==0
                                ? parseFloat(res[j].distance)
                                : 999999999999;
                            if (itemN > itemM) {
                                temp = res[i];
                                res[i] = res[j];
                                res[j] = temp;
                            }
                        }
                    }
                    //门店地址
                    self.cityList = res.filter(item => {
                        return item.isUse === 1;
                    });
                    //门店城市
                    self.provinceList = res.filter(item => {
                        return item.isUse === 0;
                    });
                    var cityFirst = res[0];
                    if(self.longitude&&self.latitude){
                        self.pcid = cityFirst.itemId;
                        self.cidName = cityFirst.NAME;
                        self.cid = cityFirst.itemId;

                        self.city = cityFirst.parentid;
                    }
                    
                    self.companyList = self.cityList.filter(
                        item => {
                            return item.parentid == self.city;
                        }
                    );
                    self.provinceList.map(item => {
                        if (item.id == cityFirst.parentid) {
                            self.recommend = item.NAME;
                        }
                    });
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            })
        },
        register() {
            if (!isPoneAvailable(this.phone)) {
                Toast({
                    message: "请输入正确的手机号格式",
                    duration: 1000
                });
                return false;
            }
            if (this.cid == "") {
                Toast({
                    message: "请选择门店",
                    duration: 1000
                });
                return false;
            }
            let shareId = sessionStorage.shareId ? sessionStorage.shareId : "";
            let content_ =
                "{'name':'" +
                this.linkman +
                "','contactPhone':'" +
                this.phone +
                "','pwd':'" +
                this.pwd +
                "','cid':'" +
                this.cid +
                "','secCode':'" +
                this.secCode +
                "','shareId':'" +
                shareId +
                "','realid':'','inviteCode':'" +
                this.inviteCode +
                "','deviceOS':'H5'}";

            this.$post("/appAccount/saveChildRegister.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
                    ? this.$store.getters["logintoken"]
                    : ""
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: "注册成功",
                        duration: 1000
                    });
                    this.login();
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            });
        },
        login() {
            var deviceOS = "";
            var pwd = this.CalcuMD5(this.CalcuMD5(this.pwd));
            if (
                navigator.userAgent.indexOf("Android") > -1 ||
                navigator.userAgent.indexOf("Linux") > -1
            ) {
                //安卓手机
                deviceOS = "android";
            } else {
                deviceOS = "iPhone";
            }
            var _content =
                "{'account':'" +
                this.phone +
                "','pwd':'" +
                pwd +
                "','deviceOS':'H5'}";
            this.$post("/appAccount/login.do", {
                content: _content,
                version: "kkllo",
                deviceOS: deviceOS,
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: "登录成功",
                        duration: 1000
                    });
                    // 这里改变vuex里的状态管理
                    this.$store.commit("setData", response.res);
                    var companyObj = response.res.company;
                    var accountObj = response.res.account;
                    var shopObj = response.res.shop;
                    this.$store.commit("setpcid", parseFloat(companyObj.id));
                    this.$router.push({
                        path: "/",
                        query: {
                            pcid: accountObj.companyId,
                            firstRegister:1
                        }
                    });
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            });
        },
        checkCode() {
            let content_ = "{'phone':'" + this.phone + "'}";
            this.intervalobj = setInterval(() => {
                if (this.count > 0) {
                    this.code_text = this.count + "s" + "后重新获取";
                    this.disabled = true;
                    this.count--;
                } else if (this.count == 0) {
                    this.code_text = "获取验证码";
                    this.disabled = false;
                    clearInterval(this.intervalobj);
                    this.count = 60;
                }
            }, 1000);
            this.$post("/appAccount/sendYzm.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: "发送成功",
                        duration: 1000
                    });
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            });
        },
        sendCode() {
            if (this.phone == "") {
                Toast({
                    message: "请输入手机号",
                    duration: 1000
                });
                return false;
            }
            if (!isPoneAvailable(this.phone)) {
                Toast({
                    message: "请输入正确的手机号格式",
                    duration: 1000
                });
                return false;
            }
            this.checkFhone();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@write: #f1f1f1;
.mint-header {
    background: @write;
    .mintui-back,
    .mint-header-title {
        color: @base;
        font-size: 18px;
        font-weight: 500;
    }
}
.changStyleCity {
    height: 100%;
    width: 28%;
    color: #333333;
    padding: 0 ;
    font-size: 0.4rem;
    text-align:center;
    
}
.colorIcon{
    color:#eb6000;
}
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    .mask-table-view {
        position: fixed;
        bottom: 0;
        height: 300px;
        width: 100%;
        padding-bottom: 50px;
        background: #ffffff;
        .mask-title {
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            background: #eb6000;
            color: #ffffff;
            padding-left: 10px;
        }
        ul {
            height: 100%;
            overflow-y: auto;
            padding-inline-start: 0;
            &::after {
                height: 0;
            }
            li {
                .shop-title {
                    line-height: 16px;
                    margin-bottom: 8px;
                    .shop-name {
                        white-space: normal;
                        font-size: 14px;
                        color: #333333;
                        font-size: 0.373333rem;
                        color: #333333;
                        display: inline-block;
                        width: 64%;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .mask-distance {
                        color: @base;
                        font-size: 12px;
                        padding-right: 15px;
                    }
                }
                .address-text {
                    white-space: normal;
                    font-size: 12px;
                    color: #888888;
                    padding-right: 15px;
                }
            }
        }
    }
}
.serverItem{
    height:30px;
    width:100%;
    line-height:30px;
    text-align:center;
    color:#eb6000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.changeServer{
    color:#999999;
    font-size:10px;
}
.login-box .login-group .input-item-margin {
    margin-bottom: 10px;
}
.login-box .login-group .input-item-border {
    border: 0.026667rem solid rgba(48, 48, 48, 0.5);
}
</style>
