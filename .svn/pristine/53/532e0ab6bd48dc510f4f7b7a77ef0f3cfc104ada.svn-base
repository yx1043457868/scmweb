<template>
    <div>
        <Header title="添加收货地址"></Header>
        <div class="my-content">
            <div class="form-wrapper">
                <mt-field label="收货人" placeholder="请输入收货人" v-model="contactName"></mt-field>
                <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="contactPhone"></mt-field>
                <div data-v-3c547f92="" class="mint-cell mint-field">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <!----><span class="mint-cell-text">所在地区</span>
                        </div>
                        <div class="mint-cell-value">
                            <select name="province" id="province" class="required" @change="loadCity(contactProvince)" v-model="contactProvince">
                                <option disabled value="-1"> 请选择</option>
                                <option v-for="(province,index) in provinceList" :value="province.id" :key="index">{{province.title}}</option>
                            </select>
                            <select name="city" id="city" v-model="contactCity" v-show="cityList && cityList.length > 0">
                                <option disabled value="-1" selected>请选择</option>
                                <option v-for="(city,index) in cityList" :value="city.id" :key="index">{{city.title}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </div>
                <mt-field label="详细地址" placeholder="请输入详细地址" type="textarea" rows="2" v-model="contactAddress"></mt-field>
            </div>
            <div class="bottom-btn">
                <button type="button" class="def-btn" @click="commit">完成</button>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import { isPoneAvailable } from "../../utils/index.js";
export default {
    name: "confirmOrder",
    components: {
        Header
    },
    data() {
        return {
            contactName: "",
            contactPhone: "",
            contactProvince: "-1",
            contactCity: "-1",
            contactAddress: "",
            provinceList: [],
            cityList: []
        };
    },
    computed: {
        // disabledBtn() {
        //     if (
        //         this.contactName == "" ||
        //         this.contactPhone == "" ||
        //         this.contactAddress == "" ||
        //         this.contactProvince == ""
        //     ) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
    },
    created() {
        this.initProvinceList();
    },
    methods: {
        initProvinceList() {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            let company_id = accountObj.companyId;
            let content_ = "{'company_id':'" + company_id + "'}";
            this.$post("/appRegister/provinceList.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.provinceList = response.res;
                } else {
                    Toast({
                        message: response.optDesc,
                        duration: 1000
                    });
                }
            });
        },
        loadCity(province_id) {
            let content_ = "{'parentid':'" + province_id + "'}";
            this.$post("/appRegister/cityList.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.cityList = response.res;
                    if(this.cityList.length > 0){
                        this.contactCity = this.cityList[0].id;
                    }else{
                        this.contactCity = ""
                    }
                } else {
                    Toast({
                        message: "地址初始化失败",
                        duration: 1000
                    });
                }
            });
        },
        commit() {
            if (this.contactName == "") {
                Toast({
                    message: "请填写收货人",
                    duration: 1000
                });
                return false;
            }
            if (this.contactPhone == "") {
                Toast({
                    message: "请填写收货联系方式",
                    duration: 1000
                });
                return false;
            }
            if (!isPoneAvailable(this.contactPhone)) {
                Toast({
                    message: "手机号格式不正确",
                    duration: 1000
                });
                return false;
            }
            if (this.contactProvince == "" || this.contactProvince == "-1") {
                Toast({
                    message: "请选择所在地区",
                    duration: 1000
                });
                return false;
            }
            if (this.contactAddress == "") {
                Toast({
                    message: "请输入详细地址",
                    duration: 1000
                });
                return false;
            }
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            let shopId = accountObj.shopId;
            let account = accountObj.account;
            let content_ =
                "{'shopId':'" +
                shopId +
                "','contactName':'" +
                this.contactName +
                "','contactPhone':'" +
                this.contactPhone +
                "','contactProvince':'" +
                this.contactProvince +
                "','contactCity':'" +
                this.contactCity +
                "','contactAddress':'" +
                this.contactAddress +
                "'}";
            this.$post("/appShippingAddress/saveShopAddress.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: response.optRes,
                        duration: 1000
                    });
                    this.$router.go(-1);
                } else {
                    Toast({
                        message: response.optRes,
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

</style>
