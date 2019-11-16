<template>
    <div class="login">
        <header class="mint-header">
            <div @click="back" class="mint-header-button is-left">
                <button
                    class="mint-button mint-button--default mint-button--normal"
                >
                    <span class="mint-button-icon">
                        <i class="mintui mintui-back"></i>
                    </span>
                    <label class="mint-button-text"></label>
                </button>
            </div>
        </header>
        <div class="login-box">
            <div class="login-logo">
                <img src="../../assets/logo.png" alt />
            </div>
            <div class="login-group">
                <form action autocomplete="on">
                    <div class="input-item">
                        <label for>
                            <i class="icon iconfont">&#xe725;</i>
                        </label>
                        <span class="pie">|</span>
                        <input
                            type="text"
                            placeholder="请输入您的账号/手机号"
                            v-model="account"
                            autocomplete="on"
                        />
                    </div>
                    <div class="input-item">
                        <label for>
                            <i class="icon iconfont">&#xe82b;</i>
                        </label>
                        <span class="pie">|</span>
                        <input
                            type="password"
                            placeholder="请输入登录密码"
                            v-model="pwd"
                            autocomplete="on"
                        />
                    </div>
                    <button
                        type="button"
                        size="large"
                        class="login-btn"
                        @click="login"
                    >
                        登录
                    </button>
                </form>
                <div class="link-box">
                    <a href="javascript:;" class="link" @click="register"
                        >账号注册</a
                    >
                    <span class="pie">|</span>
                    <router-link to="/findPwd" class="link"
                        >忘记密码</router-link
                    >
                </div>
                <div class="login-bg"></div>
            </div>
        </div>
        <div class="other_acount">
            <div class="title">
                ----------&nbsp;&nbsp;其他登录方式&nbsp;&nbsp;----------
            </div>
            <div class="weixin_box">
                <!-- 验证码登录 -->
                <div class="out_box" @click="codelogin">
                    <span class="icon iconfont weixin_icon1">&#xe6ac;</span>
                    <span>验证码登录</span>
                </div>
                <!-- 微信登录 -->
                <div class="right_weixin" @click="wxLogin">
                    <span class="icon iconfont weixin_icon2">&#xe6a4;</span>
                    <span>微信登录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import md5 from "js-md5";
import { getPcid } from "../../utils/index.js";
export default {
    name: "Login",
    components: {},
    data() {
        return {
            account: "",
            pwd: ""
        };
    },
    created() {
        let logintoken = this.$store.getters["logintoken"];
        if (logintoken) {
            this.$router.push({
                path: "/"
            });
        }
    },
    methods: {
        back() {
            this.$router.push({
                path: "/"
            });
        },
        //md5密码加密
        CalcuMD5(pwd) {
            pwd = md5(pwd);
            return pwd;
        },
        register() {
            let pcid = getPcid();
            this.$router.push({
                path: "register",
                query: {
                    pcid: pcid
                }
            });
        },
        codelogin() {
            this.$router.push({
                path: "codeLogin",
                query: {
                    pcid: 0
                }
            });
        },
        wxLogin() {
            var APPID = this.appid;
            var REDIRECT_URI = "";
            //良之隆appidhttp://p1.lzl98.com
            if (location.hostname === "m.lzl98.com") {
                //良之隆正式环境web
                REDIRECT_URI = "http://m.lzl98.com/bindingWx";
            } else if (location.hostname === "mt1.lzl98.com") {
                //良之隆准生产环境
                REDIRECT_URI = "http://mt1.lzl98.com/bindingWx";
            } else {
                REDIRECT_URI = "http://mt1.lzl98.com/bindingWx";
            }
            window.location.href =
                "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
                APPID +
                "&redirect_uri=" +
                REDIRECT_URI +
                "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        },
        login() {
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
                "','deviceOS':'H5'}";
            this.$post("/appAccount/login.do", {
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
                                query: {
                                    firstFlag: 1
                                }
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

<style lang="less" scoped>
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
