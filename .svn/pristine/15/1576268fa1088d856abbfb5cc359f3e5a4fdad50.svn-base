<template>
    <div>
        <div class="header">
            <mt-header title="编辑收货地址">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
                <mt-button icon="" slot="right" @click="save"><span class="headBtn">保存</span></mt-button>
            </mt-header>
        </div>
        <div class="my-content">
            <div class="form-wrapper">
                <mt-field label="" placeholder="请输入收货人" v-model="contactName"></mt-field>
                <mt-field label="" placeholder="请输入手机号" type="tel" v-model="contactPhone"></mt-field>
                <div data-v-3c547f92="" class="mint-cell mint-field">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-value">
                            <select name="province" id="province" class="required" @change="loadCity(contactProvince,'change')" v-model="contactProvince">
                                <option disabled value="-1" selected :class="!contactProvince?'backColor':''"> 请选择</option>
                                <option v-for="(province,index) in provinceList" :value="province.id" :key="index" :class="contactProvince==province.title?'backColor':''">{{province.title}}</option>
                            </select>
                            <select name="city" id="city" v-model="contactCity" v-show="cityList && cityList.length > 0">
                                <option disabled value="-1" selected :class="!contactProvince?'backColor':''">请选择</option>
                                <option v-for="(city,index) in cityList" :value="city.id" :key="index" :class="contactCity==city.title?'backColor':''">{{city.title}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </div>
                <mt-field label="" placeholder="请输入详细地址" type="textarea" rows="2" v-model="contactAddress"></mt-field>
            </div>
            <div class="bottom-btn" v-show="flag == '2'">
                <button type="button" class="def-btn" @click="deleteAdd">删除收货地址</button>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { isPoneAvailable } from "../../utils/index.js";
export default {
    name: "editAddress",
    components: {},
    data() {
        return {
            contactName: "",
            contactPhone: "",
            contactProvince:'-1',
            contactCity: "-1",
            contactAddress: "",
            provinceList: [],
            cityList: [],
            flag: "2"
        };
    },
    created() {
        this.initProvinceList();
        this.contactName = this.$route.query.shopTact?this.$route.query.shopTact:'';
        this.contactPhone = this.$route.query.shopTel?this.$route.query.shopTel:'';
        this.contactAddress = this.$route.query.address?(this.$route.query.address=='undefined'?'':this.$route.query.address):'';
        this.contactProvince = this.$route.query.province_id?(this.$route.query.province_id=='undefined'?'-1':this.$route.query.province_id):'-1';
        this.contactCity = this.$route.query.city_id?(this.$route.query.city_id=='undefined'?'-1':this.$route.query.city_id):'-1';
        this.loadCity(this.$route.query.province_id,'init');
    },
    methods: {
        //返回
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        },
        deleteAdd() {
            MessageBox.confirm("确定删除该地址?").then(action => {
                let content_ =
                    "{'shopAddressId':'" + this.$route.query.id + "'}";
                this.$post("/appShippingAddress/deleteShopAddress.do", {
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
                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1000);
                    } else {
                        Toast({
                            message: response.optDesc,
                            duration: 1000
                        });
                    }
                });
            }).catch(() => {
                // Toast('操作取消');
            });
        },
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
        loadCity(province_id,type) {
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
                        if(type == "change"){
                            this.contactCity = this.cityList[0].id;
                        }else{
                            this.contactCity = this.$route.query.city_id;
                        } 
                    }else{
                        this.contactCity = ""
                    }
                } else {
                    Toast("地址初始化失败");
                }
            });
        },
        save() {
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
            if (this.contactProvince == "" || this.contactProvince=="-1") {
                Toast({
                    message: "请选择所在地区",
                    duration: 1000
                });
                return false;
            }
            // console.log(this.contactProvince)
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
            if(!this.contactCity){
                this.contactCity = "";
            }
    
            //其它地址
            var content_ =
                "{'shopAddress':{'id':'" +
                this.$route.query.id +
                "','shopId':'" +
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
                "'}}";
        
            this.$post("/appShippingAddress/updateShopAddress.do", {
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
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000);
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
.def-btn {
    background-color: #ff671d !important;
}
.backColor{
    background:linear-gradient(to right, #fc9105, #f35410);
}
</style>
