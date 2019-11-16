<template>
    <div class="login"
         v-show="bindWxShow">
        <header class="mint-header">
            <div class="mint-header-button is-left"
                 @click="back">
                <button class="mint-button mint-button--default mint-button--normal">
                    <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
                    <label class="mint-button-text"></label>
                </button>
            </div>
        </header>
        <div class="login-box">
            <div class="login-logo">
                <img src="../../assets/logo.png"
                     alt />
            </div>
            <div class="login-group">
                <h5 class="login-tip">绑定良之隆账号，下次微信一键登录</h5>
                <form action
                      autocomplete="on">
                    <div class="input-item">
                        <label for>
                            <i class="icon iconfont">&#xe725;</i>
                        </label>
                        <span class="pie">|</span>
                        <input type="text"
                               placeholder="请输入您的账号/手机号"
                               v-model="account"
                               autocomplete="on" />
                    </div>
                    <div class="input-item">
                        <label for>
                            <i class="icon iconfont">&#xe82b;</i>
                        </label>
                        <span class="pie">|</span>
                        <input type="password"
                               placeholder="请输入登录密码"
                               v-model="pwd"
                               autocomplete="on" />
                    </div>
                    <button type="button"
                            size="large"
                            class="login-btn"
                            @click="bindWxLogin">
                        立即绑定
                    </button>
                </form>
                <div class="login-bg"></div>
                <div class="link-box">
                    <a href="javascript:;"
                       class="link"
                       @click="register"
                       style="margin-right:0">还没有账号? 先去注册<span class="iconfont"
                              style="font-size:10px;color:#eb6000">&#xe603;</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import md5 from "js-md5";
import { getPcid, getUrlParam, isWeixinBrowser } from "../../utils/index.js";
export default {
    name: "Login",
    components: {},
    data() {
        return {
            account: "",
            pwd: "",
            openid: "",
            bindWxShow: false
        };
    },
    created() {
        const code = getUrlParam("code");
        if (isWeixinBrowser()) {
            // wx.miniProgram.getEnv((res)=>{
            //     if (res.miniprogram) {
            //         alert("在小程序里");
            //     } else {
                     
            //     }
            // })
            //储存获取openId
            this.getOpenIdByCode(code);
           
        }
    },
    methods: {
        getOpenIdByCode(code) {
            let params = {
                code: code
            };
            this.$post("/wx/getOpenIdByCode.do", params).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.$store.commit("setOpenId", response.res.openid);
                    this.openid = response.res.openid;
                    this.wxLogin(response.res.openid);
                } else {
                    Toast(response.optDesc);
                    setTimeout(() => {
                        this.$router.push({ path: "/login" });
                    }, 2000);
                }
            });
        },
        back() {
            this.$router.push({ path: "/login" });
        },
        //md5密码加密
        CalcuMD5(pwd) {
            pwd = md5(pwd);
            return pwd;
        },
        register() {
            let pcid = getPcid();
            this.$router.push({ path: "register", query: { pcid: pcid } });
        },
        wxLogin(openid) {
            var deviceOS = "Android";
            if (
                navigator.userAgent.indexOf("Android") > -1 ||
                navigator.userAgent.indexOf("Linux") > -1
            ) {
                //安卓手机
                deviceOS = "android";
            } else {
                deviceOS = "iPhone";
            }
            var _content = "{'openid':'" + openid + "','deviceOS':'wx'}";
            this.$post("/appAccount/wxLogin.do", {
                content: _content,
                version: "kkllo",
                deviceOS: deviceOS,
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    // 这里改变vuex里的状态管理
                    this.$store.commit("setData", response.res);
                    var companyObj = response.res.company;
                    var accountObj = response.res.account;
                    var shopObj = response.res.shop;
                    this.$store.commit("setpcid", parseFloat(companyObj.id));
                    var shareId = accountObj.id ? accountObj.id : "";
                    var redirect = this.$route.query.redirect;
                    if (accountObj.role == "1") {
                        // 客户
                        if (!!response.res.isFirstLogin) {
                            this.$router.push({
                                path: "/accountEdit",
                                query: { firstFlag: 1 }
                            });
                        } else {
                            if (redirect) {
                                this.$router.replace(redirect);
                            } else {
                                window.location.href =
                                    location.origin +
                                    "/?pcid=" +
                                    companyObj.id +
                                    "&shareId=" +
                                    shareId;
                            }
                        }
                    } else {
                        Toast("您不是注册客户");
                        this.$store.commit("loginOut");
                        return false;
                    }
                } else {
                    if (response.optCode == "-2") {
                        this.bindWxShow = true;
                    } else {
                        Toast(response.optDesc);
                        this.bindWxShow = true;
                    }
                }
            });
        },
        bindWxLogin() {
            if (this.account == "") {
                Toast({
                    message: "请输入您的账号",
                    duration: 1000
                });
                return false;
            }
            if (this.pwd == "") {
                Toast({
                    message: "请输入您的密码",
                    duration: 1000
                });
                return false;
            }
            var deviceOS = "Android";
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
                this.account +
                "','pwd':'" +
                pwd +
                "','deviceOS':'wx','openid':'" +
                this.openid +
                "'}";
            this.$post("/appAccount/wxBindAccount.do", {
                content: _content,
                version: "kkllo",
                deviceOS: deviceOS,
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    // 这里改变vuex里的状态管理
                    this.$store.commit("setData", response.res);
                    var companyObj = response.res.company;
                    var accountObj = response.res.account;
                    var shopObj = response.res.shop;
                    this.$store.commit("setpcid", parseFloat(companyObj.id));
                    var shareId = accountObj.id ? accountObj.id : "";
                    var redirect = this.$route.query.redirect;
                    if (accountObj.role == "1") {
                        // 客户
                        if (!!response.res.isFirstLogin) {
                            this.$router.push({
                                path: "/accountEdit",
                                query: { firstFlag: 1 }
                            });
                        } else {
                            if (redirect) {
                                this.$router.replace(redirect);
                            } else {
                                window.location.href =
                                    location.origin +
                                    "/?pcid=" +
                                    companyObj.id +
                                    "&shareId=" +
                                    shareId;
                            }
                        }
                    } else {
                        Toast("您不是注册客户");
                        this.$store.commit("loginOut");
                        return false;
                    }
                } else {
                    Toast(response.optDesc);
                }
            });
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
    .mintui-back {
        color: @base;
        font-size: 18px;
    }
}
</style>
