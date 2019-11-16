


<template>
    <div class="login">
        <Header title="忘记密码"></Header>
        <div class="login-box">
            <div class="login-logo" style="padding-top:120px">
                <img src="../../assets/logo.png" alt="">
            </div>
            <div class="login-group" v-show="oneStep">
                <form action="" autocomplete="off" >
                    <div class="input-item">
                        <label for=""><i class="icon iconfont">&#xe725;</i></label>
                        <span class="pie">|</span>
                        <input type="text" placeholder="请输入您的登录账号" v-model="account" autofocus="autofocus">
                    </div>
                    <button type="button" size="large" class="login-btn" @click="next" :disabled="disabledReg">下一步</button>
                </form>
            </div>
             <div class="login-group" v-show="!oneStep">
                <form action="" autocomplete="off">
                    <div class="input-item">
                        <label for=""><i class="icon iconfont">&#xe725;</i></label>
                        <span class="pie">|</span>
                        <input type="tel" placeholder="请输入您的手机号" v-model="phone" autofocus="autofocus" readonly="readonly">
                    </div>
                    <div class="input-item">
                        <label for=""><i class="icon iconfont">&#xe658;</i></label>
                        <span class="pie">|</span>
                        <input type="text" placeholder="请输入验证密码" v-model="secCode">
                        <button type="button" class="reg-btn" @click="sendCode" :disabled="disabled">{{code_text}}</button>
                    </div>
                    <div class="input-item">
                        <label for=""><i class="icon iconfont">&#xe82b;</i></label>
                        <span class="pie">|</span>
                        <input type="password" placeholder="请设置密码" v-model="pwd">
                    </div>
                    <button type="button" size="large" class="login-btn" @click="commit" :disabled="disabledCommit">完成</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import { isPoneAvailable } from "../../utils/index.js";
import md5 from "js-md5";
export default {
    name: "Login",
    components: {Header},
    data() {
        return {
            account: "",
            pwd: "",
            phone: "",
            secCode: "",
            inviteCode: "",
            pcid: "",
            disabled: false,
            count: 60,
            code_text: "获取验证码",
            intervalobj: null,
            oneStep:true,
            twoStep:false,
        };
    },
    created() {

    },
    computed:{
        disabledReg(){
            if(this.account == ""){
                return true;
            }else{
                 return false;
            }
        },
        disabledCommit(){
             if(this.secCode == "" || this.pwd == ""){
                return true;
            }else{
                 return false;
            }
        }
    },
    methods: {
        next(){
            if(this.account == ""){
                 Toast({
                    message: "请输入您的账号",
                    duration: 1000
                });
                return false;
            }
            let _content = "{'account':'" + this.account +"'}";
            this.$post("/appAccount/selectIsAccount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.oneStep = false;
                    this.phone = response.res;
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            });
        },
        //md5密码加密
        CalcuMD5(pwd) {
            pwd = md5(pwd);
            return pwd;
        },
        commit() {
            if (this.secCode == "") {
                Toast({
                    message: "请输入您的验证码号",
                    duration: 1000
                });
                return false;
            }
            if (this.pwd == "") {
                Toast({
                    message: "请输入您要修改的密码",
                    duration: 1000
                });
                return false;
            }
            let pwd = this.CalcuMD5(this.CalcuMD5(this.pwd));
            let content_ = "{'account':'"+this.account+"','pwd':'"+pwd+"','phone':'"+this.phone +"','yzm':'"+this.secCode+"'}"; 
            this.$post("/appAccount/saveResetPwd.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: "修改成功",
                        duration: 1000
                    });
                  this.$router.push({path: "/login"});
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
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@write: #f1f1f1;

</style>
