<template>
    <div>
        <Header title="加盟客户"></Header>
        <div class="my-content">
            <div class="form-wrapper">
                <mt-field label="客户名称" placeholder="请输入客户名称" v-model="customerName" @blur.native.capture="checkCard"><span style="color:red">*</span></mt-field>
                <mt-field label="手机号码" placeholder="请输入手机号码" type="tel" v-model="phone" @blur.native.capture="phone1(phone,2)"><span style="color:red">*</span></mt-field>
                <div class="mint-cell mint-field">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">区域</span>
                        </div>
                        <div class="mint-cell-value">
                            <select name="province" id="province" class="required" @change="loadCity(province)" v-model="province">
                                <option disabled value=""> 请选择</option>
                                <option v-for="(province,index) in provinceList" :value="province.id" :key="index">{{province.title}}</option>
                            </select>

                            <select name="city" id="city" v-model="city" v-show="cityList && cityList.length > 0">
                                <option value="">请选择</option>
                                <option v-for="(city,index) in cityList" :value="city.id" :key="index">{{city.title}}</option>
                            </select>
                            <div class="mint-field-other"><span data-v-7c0b8970="" style="color:red">*</span></div>
                        </div>
                        <!-- <em class="iconfont">&#xe603;</em> -->
                    </div>
                </div>
            </div>
            <div class="bottom-btn">
                <button type="button" class="def-btn" @click="commit">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import {isTelAvailable,getPcid,isPoneAvailable} from "../utils/index.js"
export default {
    name: "confirmOrder",
    components: {
        Header
    },
    data() {
        return {
            customerName: "",
            phone: "",
            province: "",
            city: "",
            provinceList: [],
            cityList: [],
        };
    },
    created() {
        this.initProvinceList()
    },
    methods: {
        checkCard() {
            if(!this.customerName) return;
            var regex =/^[a-zA-Z0-9\u4e00-\u9fa5-（）()-+]+$/
            if(regex.test (this.customerName)){
               
            }else{
                Toast('客户名只能含汉字，数字，英文(可以带括号 + -)');
            }
        },
        phone1(value,type) {
            if(!value) return;
            if (!isTelAvailable(value)&&!isPoneAvailable(value)) {
                this.phone=''
                Toast({
                    message: "手机号格式不正确",
                    duration: 1000
                });
                return false;
            }
        },
        loadCity(province_id) {
            let content_ = "{'parentid':'" + province_id + "'}";
            this.province =province_id;
            this.$post("/appRegister/cityList.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.cityList = response.res;
                    if(this.cityList.length > 0){
                        this.city = this.cityList[0].id;
                    }else{
                        this.city = "";
                    }
                } else {
                    Toast({
                        message: "地址初始化失败",
                        duration: 1000
                    });
                }
            });
        },
        initProvinceList() {
            let company_id = this.$store.getters["account"].companyId? this.$store.getters["account"].companyId:getPcid();
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
        commit() {
            if (this.customerName == "") {
                Toast("请输入客户名称");
                return false;
            }
            if (this.phone == "") {
                Toast("请输入手机号");
                return false;
            }
            if (this.province == "") {
                Toast("请选择区域");
                return false;
            }
            let province_title='',city_title=''
            this.provinceList&&this.provinceList.map((item)=>{
                if(item.id==this.province) {
                    province_title=item.title
                }
            })
            this.cityList&this.cityList.map((item)=>{
                if(item.id==this.city) {
                    city_title=item.title
                }
            })
            
            let _content = "{'customerName':'" + this.customerName + "','phone':'" + this.phone +"','province':'" + province_title+"','city':'" + city_title +"'}";
            this.$post("/mobileShop/addJoinCustomer.do", {
                content:_content,
                version: "kkllo",
                login_token:this.$store.getters["logintoken"]
                    ? this.$store.getters["logintoken"]
                    : ''
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({
                        message: '报名成功',//response.optDesc,
                        duration: 1000
                    });
                     this.$router.push({ path: "/" });
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
#city option {
    background: none;
    border: none;
    font-style: none;
}
.mint-cell-wrapper {
    font-size: 14px !important;
}
.mint-cell {
    min-height: 48px;
}
</style>
