<template>
    <div class="login">
 <Header title="商品反馈"></Header>
<div class="bodyMid">
    <ul>
        <li>
            <div class="head">
          <span>单号：125698996589002</span>
            <span>待审核</span>
              <span>样品反馈</span>
            </div>
            <div class="body_">
                <div class="body_img">
                    <img src="../../../static/images/logo.png">
                </div>
                <div class="body_name">
                    <span>木兰草原生态土鸡蛋</span>
                     <span>X1</span>
                </div>
                    <div class="body_Specifications">
                    <span>500g/袋</span>
                </div>
                <div class="body_describe">
                   样品描述样品描述样品描述样品描述样品描述
                </div>
            </div>
                        <div class="body_">
                <div class="body_img">
                    <img src="../../../static/images/logo.png">
                </div>
                <div class="body_name">
                    <span>木兰草原生态土鸡蛋</span>
                     <span>X1</span>
                </div>
                    <div class="body_Specifications">
                    <span>500g/袋</span>
                </div>
                <div class="body_describe">
                   样品描述样品描述样品描述样品描述样品描述
                </div>
            </div>
        </li>
    </ul>
</div>
    </div>
</template>

<script>
import Header from "@/components/Header";
export default {
    name: "allOrder",
    components: {
          Header
    },
    data() {
        return {
            phone: "",
            password: ""
        };
    },
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        },
        login(){
            //appAccount/login.do
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
@write: #ffffff;
.login{
    background: #f2f2f2!important;
    height: 100%;
}
.bodyMid{
    ul{
        li{
          .head{
              height: 30px;
              padding: 6px 10px;
               line-height: 30px;
               border-bottom: 1px solid #c9c9c9;
               padding-bottom: 28px;
              span{
                  font-size: 14px;
              }:nth-child(1){
                  margin-right: 40px;
              }:nth-child(2){
                  color: #ff0000;
              }:nth-child(3){
                  float: right;
                  padding: 0px 10px;
                  border: 1px solid #c9c9c9;
                  border-radius: 10px;
                  line-height:22px;
              }
          }
          .body_{
              padding-bottom: 18px;
              padding-top: 10px;
              padding-right: 30px;
              overflow: hidden;
              .body_img{
                  width: 77px;
                  height: 95px;
                  overflow: hidden;
                  float: left;
                  margin-right: 17px;
                  img{
                      width: 100%;
                      height: 100%;
                  }
              }
          }
          .body_name{
              span{
              }:nth-child(1){
                  color: black;
                  font-size: 14px
              }:nth-child(2){
                  font-size: 12px;
                  float:right;
              }
          }
          .body_Specifications{
              line-height: 25px;
          }
          .body_describe{
              width: 166px;
              float: left;
              line-height: 16px;
              margin-top: 10px;
          }
        }
    }
}
</style>
