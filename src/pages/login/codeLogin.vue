<template>
  <div class="login">
    <Header title="验证码快捷登录"></Header>
    <div class="login-box">
      <div class="login-logo" style="padding-top:120px">
        <img src="../../assets/logo.png" alt>
      </div>
      <div class="login-group">
        <form action autocomplete="off">
          <div class="input-item">
            <label for>
              <i class="icon iconfont">&#xe725;</i>
            </label>
            <span class="pie">|</span>
            <input type="text" placeholder="请输入您的手机号" v-model="phone" autofocus="autofocus">
          </div>
          <div class="input-item">
            <label for>
              <i class="icon iconfont">&#xe658;</i>
            </label>
            <span class="pie">|</span>
            <input type="text" placeholder="请输入手机验证码" v-model="secCode">
            <button
              type="button"
              class="reg-btn"
              @click="sendCode"
              :disabled="disabled"
            >{{code_text}}</button>
          </div>
          <button
            type="button"
            size="large"
            class="login-btn"
            @click="commit"
            :disabled="disabledCommit"
          >登录</button>
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
  components: { Header },
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
      oneStep: true,
      twoStep: false
    };
  },
  created() {},
  computed: {
    disabledReg() {
      if (this.account == "") {
        return true;
      } else {
        return false;
      }
    },
    disabledCommit() {
      if (this.secCode == "") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    commit() {
      if (this.secCode == "") {
        Toast({
          message: "请输入您的验证码号",
          duration: 1000
        });
        return false;
      }
      let content_ =
        "{'phone':'" + this.phone + "','yzm':'" + this.secCode + "'}";
      this.$post("/appAccount/yzmLogin.do", {
        content: content_,
        version: "kkllo",
        login_token: this.$store.getters["logintoken"]
      }).then(res => {
        let response = JSON.parse(res);
        if (response.optFlag == "yes") {
          Toast({
            message: "登录成功",
            duration: 1000
          });
          this.$store.commit("setData", response.res);
          var companyObj = response.res.company;
          var accountObj = response.res.account;
          var shopObj = response.res.shop;
          this.$store.commit("setpcid", parseFloat(companyObj.id));
          var shareId = accountObj.id ? accountObj.id : "";
          var redirect = this.$route.query.redirect;
          //   this.$router.push({path: "/login"});
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
      this.$post("/appAccount/sendLoginYzm.do", {
        content: content_,
        version: "kkllo",
        login_token: this.$store.getters["logintoken"]
      }).then(res => {
        console.log(res);
        let response = JSON.parse(res);
        if (response.optFlag == "yes") {
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
          Toast({
            message: "发送成功",
            duration: 1000
          });
        } else {
          Toast({
            message: response.optDesc,
            duration: 3000
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
.mint-header {
  background: @write;
  .mintui-back,
  .mint-header-title {
    color: @base;
    font-size: 18px;
    font-weight: 500;
  }
}

input::-webkit-input-placeholder {
  color: #b3b3b3;
  font-size: 15px;
}

input::-moz-placeholder {
  color: #b3b3b3;
  font-size: 15px;
}

input:-ms-input-placeholder {
  color: #b3b3b3;
  font-size: 15px;
}
</style>
