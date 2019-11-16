<template>
    <div>
        <Header title="我的收货地址"></Header>
        <div class="my-content selectAddress">
            <!--默认地址-->
            <!-- <div class="address-li" @click="selectDefAddress" v-if="defShopAddress.shopTact">
                <div class="address-l">
                    <h5 class="clearfix">
                        <span class="contact-name">{{defShopAddress.shopTact ? defShopAddress.shopTact :"暂无"}}</span>
                        <span class="contact-tel">{{defShopAddress.shopTel ? defShopAddress.shopTel :"暂无"}}</span>
                    </h5>
                    <p class="address">
                        <span class="def-tag">默认</span>{{defShopAddress.province}}{{defShopAddress.city}}{{defShopAddress.address}}</p>
                </div>
                <div class="address-r" @click.stop="editAddress(defShopAddress)">
                    编辑
                </div>
            </div> -->
            <!--默认地址-->
            <div class="address-li" @click="selectAddress(item)" v-for="(item,index) in addressList" :key="index">
                <div class="address-l">
                    <h5 class="clearfix">
                        <span class="contact-name">{{item.shopTact}}</span>
                        <span class="contact-tel">{{item.shopTel}}</span>
                    </h5>
                    <p class="address" v-if="item.province==item.city">{{item.province}}{{!!item.address?(item.address=='undefined'?'':item.address):''}}</p>
                    <p class="address" v-else>{{item.province}}{{item.city}}{{!!item.address?(item.address=='undefined'?'':item.address):''}}</p>
                </div>
                <div class="address-r" @click.stop="editAddress(item)">
                    编辑
                </div>
            </div>
            <div class="bottom-btn">
                <button type="button" class="def-btn" @click="addAdd">添加收货地址</button>
            </div>
            <emptyBox v-show="addressList.length == 0" tiptext="您还没有收货地址哦！"></emptyBox>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import emptyBox from "@/components/emptyBox";
export default {
    name: "selectAddress",
    components: {
        Header,
        emptyBox
    },
    data() {
        return {
            defShopAddress: {},
            addressList: []
        };
    },
    created() {
        this.initAddress();
    },
    mounted(){
        if(this.addressList.length == 0){
            this.$store.commit("clearaddress");
        }
    },
    methods: {
        selectAddress(obj) {
            if(!obj.shopTact || !obj.shopTel){
                Toast("请先编辑收货地址")
            }else{
                this.$store.commit("address", obj);
                this.$router.go(-1);
            }
        },
        selectDefAddress() {
            this.$store.commit("clearaddress");
            this.$router.go(-1);
        },
        addAdd() {
            this.$router.push({ path: "/addAddress" });
        },
        editAddress(obj) {
            this.$router.push({ name: "editAddress", query: obj });
        },
        initAddress() {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            let shopId = accountObj.shopId;
            let account = accountObj.account;
            let content_ =
                "{'shopId':'" + shopId + "'}";
            this.$post("/appShippingAddress/appShopAddressList.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    if(response.shop){
                        this.addressList = response.shop;
                    }else{
                        this.addressList = [];
                    }
                } else {
                    Toast({
                        message: "地址初始化失败",
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
.selectAddress {
    padding-bottom: 70px;
    .address-li {
        display: flex;
        justify-content: space-between;
        position: relative;
        width: 100%;
        padding: 18px;
        background-color: #fff !important;
        .address-l {
            flex: 1;
            padding-right: 15px;
            h5 {
                margin-bottom: 6px;
                color: #333;
                span.contact-name {
                    font-size: 16px;
                    display: inline-block;
                    line-height: 1;
                    vertical-align: middle;
                    color: #333333;
                }
                span.contact-tel {
                    font-size: 12px;
                    display: inline-block;
                    margin-left: 8px;
                    vertical-align: middle;
                    color: #888888;
                }
            }
            p.address {
                font-size: 13px;
                line-height: 1.2;
                color: #333333;
                .def-tag {
                    background-color: #eb6000;
                    color: #ffffff;
                    text-align: center;
                    font-size: 10px;
                    padding: 0 4px;
                    vertical-align: middle;
                    margin-right: 4px;
                }
            }
        }
        .address-r {
            position: relative;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color: #888888;
            font-size: 12px;
            flex: 0 0 36px;
            text-align: right;

            &::before {
                content: "";
                position: absolute;
                width: 1px;
                height: 100%;
                left: 0;
                top: 0;
                bottom: 0;
                background-color: #eee;
            }
        }
    }
}
</style>
