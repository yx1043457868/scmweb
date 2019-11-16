<template>
    <div class="login">
        <div v-show="show">
            <mt-header :title="'账户管理'">
                <mt-button icon="back" slot="left" @click="back(1)"></mt-button>
                <!-- <mt-button slot="right" @click="backTo(1)">保存</mt-button> -->
            </mt-header>
            <form class="mui-input-group">
                <div class="mui-input-row" style="height:auto;padding: 10px 0;">
                    <label>头像</label>
                    <div class="right headerImg">
                        <img class="header-icon" :src="userImg">
                        <!-- <croppa class="mycroppa" auto-sizing v-model="myCroppaLicence" :file-size-limit="2097152" @new-image-drawn="handleNewImage"></croppa> -->
                    </div>
                </div>
                <div class="mui-input-row" @click="modify(0)">
                    <label>登录账号</label>
                    <i class="iconfont password">&#xe603;</i>
                    <div class="iRight">{{name}}</div>
                </div>
                <div class="mui-input-row" @click="modify(1)">
                    <label>手机绑定</label>
                    <i class="iconfont password">&#xe603;</i>
                    <div class="iRight">{{Info.phone}}</div>
                </div>
                <!-- <div class="mui-input-row" style="line-height: 40px">
                    <label>所属门店</label>
                </div> -->

                <div class="mui-input-row" @click="modify(2)">
                    <label>修改密码</label>
                    <i class="iconfont password">&#xe603;</i>
                </div>
                <!-- <div class="mui-input-row" @click="modify(3)">
                    <label>我的业务员</label>
                    <i class="iconfont password">&#xe603;</i>
                    <div class="iRight" v-if="shopObj.salesman==''">未绑定业务员</div>
                    <div class="iRight" v-if="shopObj.salesman !=''">{{shopObj.salesman}}</div>
                </div> -->
            </form>
        </div>
        <div class="password0" v-show="!show0">
            <mt-header :title="'修改登录账号'">
                <mt-button icon="back" slot="left" @click="back(0)"></mt-button>
                <mt-button slot="right" @click="backTo(0)"><span class="headBtn">保存</span></mt-button>
            </mt-header>
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>登录账号</label>
                    <input type="text" class="mui-input-password" placeholder="请输入名称" v-model="name" @blur="contact">
                </div>
            </form>
        </div>
        <div class="password1" v-show="!show2">
            <mt-header :title="'修改密码'">
                <mt-button icon="back" slot="left" @click="back(2)"></mt-button>
                <mt-button slot="right" @click="backTo(2)"><span class="headBtn">保存</span></mt-button>
            </mt-header>
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>旧密码</label>
                    <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="old">
                </div>
                <div class="mui-input-row">
                    <label>新密码</label>
                    <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="new1">
                </div>
                <div class="mui-input-row">
                    <label>确认密码</label>
                    <input type="password" class="mui-input-password" placeholder="请输入密码" v-model="new2">
                </div>
            </form>
        </div>
        <div class="password2" v-show="!show1">
            <mt-header :title="'修改业务员'">
                <mt-button icon="back" slot="left" @click="back(3)"></mt-button>
                <mt-button slot="right" @click="backTo(3)"><span class="headBtn">保存</span></mt-button>
            </mt-header>
            <form class="mui-input-group">
                <div class="mui-input-row">
                    <label>输入邀请码</label>
                    <input type="text" class="mui-input-password" placeholder="请输入邀请码" v-model="Invatecode">
                </div>
            </form>
        </div>
        <div class="password3" v-show="!show3">
            <mt-header :title="'修改手机'">
                <mt-button icon="back" slot="left" @click="back(4)"></mt-button>
                <mt-button slot="right" @click="backTo(4)"><span class="headBtn">保存</span></mt-button>
            </mt-header>
            <form class="mui-input-group">
                <mt-field label="手机号" placeholder="请输入新手机号" type="tel" v-model="phone">

                </mt-field>
                <button type="button" class="reg-btn" @click="sendCode" :disabled="disabled" style="line-height: 10px;">{{code_text}}</button>
                <mt-field label="验证码" placeholder="请输入验证码" type="tel" v-model="code"></mt-field>
            </form>
        </div>
        <div class="loginx" v-if="show">
            <button type="button" class="loginOut" @click="loginOut">退出登录</button>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import { isPoneAvailable , isNull} from "../../utils/index.js";
import {Toast, Popup, MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";

export default {
    name: "Login",
    components: {
        Header
    },
    data() {
        return {
            userImg : this.$store.getters['account'].logoPath ? this.$store.getters['account'].logoPath : require('../../../static/images/logo.png'),
            phone: "",
            password: "",
            Info: "",
            popupVisible: false,
            name: "",
            value: [],
            x: "",
            currentTags: {},
            dateSlots: [],
            // addressData: ChinaAddressV4Data,
            showAddress: false,
            myCroppaLicence: [],
            show: true,
            show0: true,
            show1: true,
            show2: true,
            show3: true,
            old: "",
            new1: "",
            new2: "",
            disabled: false,
            count: 60,
            code_text: "获取验证码",
            intervalobj: null,
            code: "",
            Invatecode: "",
            nm: "",
            shopObj: ""
        };
    },
    mounted() {
        this.Info = this.$store.getters["account"]
            ? this.$store.getters["account"]
            : {};
        let company = this.$store.getters["company"]
            ? this.$store.getters["company"]
            : {};
        let shop = this.$store.getters["shop"]
            ? this.$store.getters["shop"]
            : {};
        this.nm = company.nm;
        this.name = this.Info.loginAccount;
        this.shopObj = shop;
        // this.$nextTick(() => {
        //     //vue里面全部加载好了再执行的函数 （类似于setTimeout）
        //     this.myAddressSlots[0].defaultIndex = 0; // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化 //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
        // });
    },
    created() {
        if(!!this.$route.query.firstFlag){
            Toast({
                    message: "首次登陆修改密码，并重新登录",
                    duration: 2000
                });
            this.modify(2)
        }
    },
    methods: {
        contact() {
            if (!this.name) return;
            var content_ = "{'account':'" + this.name + "'}";
            this.$post("/appAccount/checkLoginAccount.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                } else {
                    Toast("账户名已存在");
                }
            });
        },
        modify(index) {
            if (index == 0) {
                this.show = false;
                this.show0 = false;
            }
            if (index == 2) {
                this.show = false;
                this.show2 = false;
            } else if (index == 3) {
                this.show = false;
                this.show1 = false;
            } else if (index == 1) {
                this.show = false;
                this.show3 = false;
            }
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
            let content_ = "{'phone':'" + this.phone + "'}";
            this.$post(
                "/appAccount/sendModifyYzm.do",
                {
                    content: content_,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                },
                { emulateJSON: true }
            )
                .then(function(res) {
                    var data = JSON.parse(res);
                    if ((data.optFlag = "yes")) {
                        Toast(data.optDesc);
                    } else {
                        Toast(data.optDesc);
                        this.code_text = "获取验证码";
                        this.disabled = false;
                        clearInterval(this.intervalobj);
                        this.count = 60;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        change() {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            let content_ = {
                inviteCode: this.Invatecode,
                accountId: accountObj.id
            };
            var that = this;
            this.$post("/appAccount/bindingSalesman.do", {
                content: JSON.stringify(content_),
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(function(res) {
                    var data = JSON.parse(res);
                    if ((data.optFlag = "yes")) {
                        that.show = !that.show;
                        that.show2 = true;
                        that.show1 = true;
                        let shop = that.$store.getters["shop"]
                            ? that.$store.getters["shop"]
                            : {};
                        shop.salesman = data.salesman;
                        that.$store.state.logindata.shop.salesman =
                            data.salesman;
                        that.$store.commit(
                            "setData",
                            that.$store.state.logindata
                        );
                        Toast({
                            message: data.optDesc,
                            time: 2 //2秒后自动关闭
                        });
                    } else {
                        Toast({
                            content: data.optDesc,
                            btn: "确定"
                        });
                        return false;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        logHidex(str) {},
        logShowx(str) {},
        onShadowChange(ids, names) {
            // if (ids[2] !== null) {
            //     this.info.classId = ids[2];
            //     this.info.className = names[2];
            // } else if (ids[1] == null) {
            //     this.info.classId = ids[0];
            //     this.info.className = names[0];
            // }
        },
        handleNewImage() {},
        back(index) {
            if (index == 1) {
                this.$router.back(-1);
                return;
            } else if (index == 2) {
                this.show = !this.show;
                this.show1 = true;
                this.show2 = true;
                return;
            } else if (index == 3) {
                // this.change();
                this.show = !this.show;
                this.show3 = true;
                this.show2 = true;
                this.show1 = true;
            } else if (index == 4) {
                this.show = !this.show;
                this.show3 = true;
                this.show2 = true;
                this.show1 = true;
            } else if (index == 0) {
                this.show = !this.show;
                this.show2 = true;
                this.show1 = true;
                this.show0 = true;
            }
        },
        backTo(index) {
            if (index == 2) {
                this.savePass();
            } else if (index == 0) {
                //昵称
                this.saveName();
            } else if (index == 3) {
                //邀请码
                this.change();
            } else if (index == 4) {
                //绑定手机
                this.SavePhone();
            }
        },
        SavePhone() {
            if (this.phone == "") {
               MessageBox.confirm("未做修改，是否退出?").then(action => {
                    this.back(4)
                }).catch(() => {
                        // Toast('操作取消');
                    });
                return false;
            }
            if (!isPoneAvailable(this.phone)) {
                MessageBox.confirm("手机格式不正确，是否放弃修改?").then(action => {
                    this.back(4)
                }).catch(() => {
                        // Toast('操作取消');
                    });
                return false;
            }
            let content_ =
                "{'oldPhone':'" +
                this.Info.phone +
                "','newPhone':'" +
                this.phone +
                "','yzm':'" +
                this.code +
                "'}";
            this.$post("/appAccount/updatephone.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var data = JSON.parse(res);
                console.log(data);
                if ((data.optFlag == "yes")) {
                    this.Info.phone = this.phone;
                    this.$store.state.logindata.account.phone = this.phone;
                    this.$store.commit(
                        "setData",
                        this.$store.state.logindata
                    );
                    Toast(data.optDesc);
                    this.back(4);
                } else {
               MessageBox.confirm("手机号已注册或验证码不正确，是否退出?").then(action => {
                    this.back(4)
                }).catch(() => {
                        // Toast('操作取消');
                    });
                return false;
                }
            });
        },
        savePass() {
            if (this.old == "") {
                Toast({
                    message: "请输入旧密码",
                    time: 2 //2秒后自动关闭
                });
                return;
            }
            if (this.new1 == "") {
                Toast({
                    message: "请输入新密码",
                    time: 2 //2秒后自动关闭
                });
                return;
            }
            if (this.new1.length > 20 || this.new1.length < 6) {
                Toast({
                    message: "密码长度不正确",
                    time: 2 //2秒后自动关闭
                });
                return;
            }

            if (this.new1 != this.new2) {
                Toast({
                    message: "两次新密码请保持一致！",
                    time: 2 //2秒后自动关闭
                });
                return;
            }
            if (this.old == this.new1) {
                Toast({
                    message: "新密码不能与旧密码一样，请重新修改！",
                    time: 2 //2秒后自动关闭
                });
                return;
            }
            let content_ =
                "{'account':'" +
                this.Info.loginAccount +
                "','oldPwd':'" +
                this.old +
                "',,'newPwd':'" +
                this.new2 +
                "'}";
            var that = this;
            this.$post( "/appAccount/updatePassWard.do",{content: content_,version: "kkllo",login_token: this.$store.getters["logintoken"] },{ emulateJSON: true } )
                .then((res)=>{
                    var data = JSON.parse(res);
                    if (data.optFlag == "yes") {  
                        if(!!this.$route.query.firstFlag){
                            this.$router.push({ path: "/" })
                        }else{
                        Toast(data.res);
                        Toast({
                            message: data.res,
                            time: 2 //2秒后自动关闭
                        });
                        let timeBack=setInterval(() => {
                            this.back(2)
                            clearInterval(timeBack)
                            }, 2000);
                                                    
                        }
                    } else {
                        Toast({
                            message: data.res,
                            time: 2 //2秒后自动关闭
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        loginOut() {
            MessageBox.confirm("是否退出，重新登录?").then(action => {
                if (action == "confirm") {
                    let content_ = "{}";
                    this.$post("/appAccount/loginOut.do", {
                        content: content_,
                        version: "kkllo",
                        login_token: this.$store.getters["logintoken"]
                    }).then(res => {
                        var data = JSON.parse(res);
                        if ((data.yes = "yes")) {
                            //清空缓存
                            this.$store.commit("loginOut");
                            this.$store.commit("changIsFirstShare",'');
                            this.$router.push("/login");
                        }
                    });
                }
            }).catch(() => {
                // Toast('操作取消');
            });
        },
        saveName() {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            let shop = this.$store.getters["shop"]
                ? this.$store.getters["shop"]
                : {};
            if(isNull(this.name)){
                Toast("请输入登录名称")
                return
            }
            var _content =
                "{'account':'" +
                accountObj.account +
                "','shopId':'" +
                accountObj.shopId +
                "','loginAccount':'" +
                this.name +
                "'}";
            let that = this;
            this.$post("/appAccount/setAccountLoginAccount.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(function(res) {
                    var response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        // shop.shop_name = that.name;
                        that.$store.state.logindata.account.loginAccount = that.name;
                        that.$store.commit(
                            "setData",
                            that.$store.state.logindata
                        );
                        Toast({
                            message: response.optDesc,
                            time: 2 //2秒后自动关闭
                        });
                        let timeAc=setInterval(() => {
                            that.back(0)
                            clearInterval(timeAc)
                            }, 2000);
                    } else {
                        Toast({
                            message: response.optDesc,
                            time: 2 //2秒后自动关闭
                        });
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    },

    
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@write: #ffffff;
.bodyCen {
    padding-top: 45px;
}
.password {
    float: right;
    text-align: right;
    color: black;
    line-height: 42px;
    font-size: 14px;
    padding-right: 10px;
}
.vux-cell-box:not(:first-child):before {
    border-top: none;
}
.croppa-container.mycroppa {
    width: 100px;
    height: 100px;
    //   border-radius: 50%;
    //   overflow: hidden;
}
.reg-btn {
    right: 10px;
    top: 6px;
    height: 36px;
    padding: 0 10px;
    position: absolute;
    background-color: #eb6000;
    color: #ffffff;
    .mint-button-text {
        float: none;
    }
}
.iRight {
    float: right;
    line-height: 40px;
    color: #eb6000;
}
.loginx {
    width: 100%;
    position: relative;
    margin-top: 56px;
    font-size: 16px;
    padding: 0 15px;
    .loginOut {
        margin-top: 30px;
        appearance: none;
        border-radius: 4px;
        border: 0;
        box-sizing: border-box;
        color: #fff;
        display: block;
        font-size: 18px;
        width: 100%;
        height: 41px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
        background-color: @base;
    }
}
.headerImg .header-icon {
    width: 45px;
    height: 45px;
    margin-right: 15px;
    border-radius:50%; 
}
</style>
