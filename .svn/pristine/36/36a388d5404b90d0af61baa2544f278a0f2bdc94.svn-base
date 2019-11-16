<template>
    <div>
        <Header title="申请会员"></Header>
        <div class="my-content">
            <form class="form-wrapper">
                    <mt-field label="名称(企业/个人)" placeholder="请输入客户名称(必填)" v-model="obj.shopName" >
                        <span class="red">*</span>
                    </mt-field>
                    <div class="mint-cell mint-field">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text">经营类型</span>
                            </div>
                            <div class="mint-cell-value">
                                <!-- <select name="class" id="class" class="required" v-model="obj.spClass">
                                    <option disabled value="">请选择</option>
                                    <option v-for="(item,index) in classList" :value="item.id" :key="index">{{item.name}}</option>
                                </select> -->
                                <select name="classTwo" id="classTwo" class="required selectPadding" v-model="obj.classCode">
                                    <option disabled value="">请选择</option>
                                    <option v-for="(item,index) in classListTwo" :value="item.itemId" :key="index">{{item.name}}</option>
                                </select>
                                <select name="classThree" id="classThree" class="selectPadding" v-model="obj.classThird" v-show="classListThree && classListThree.length>0">
                                    <option disabled value="">请选择</option>
                                    <option v-for="(item,index) in classListThree" :value="item.itemId" :key="index">{{item.name}}</option>
                                </select>
                                <div class="mint-field-other"><span data-v-7c0b8970="" class="red">*</span></div>
                            </div>
                            <!-- <em class="iconfont">&#xe603;</em> -->
                        </div>
                    </div>
                    <div class="mint-cell mint-field" state="warning">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text">区域</span>
                            </div>
                            <div class="mint-cell-value">
                                <select name="province" id="province" class="required" @change="loadCity(obj.province)" v-model="obj.province">
                                    <option disabled value="">请选择</option>
                                    <option v-for="(province,index) in provinceList" :value="province.id" :key="index">{{province.title}}</option>
                                </select>
                                <select name="city" id="city" v-model="obj.city" v-show="cityList && cityList.length > 0">
                                    <option disabled value="">请选择</option>
                                    <option v-for="(city,index) in cityList" :value="city.id" :key="index">{{city.title}}</option>
                                </select>
                                <div class="mint-field-other"><span data-v-7c0b8970="" class="red">*</span></div>
                            </div>
                            <!-- <em class="iconfont">&#xe603;</em> -->
                        </div>
                    </div>
                     <mt-field label="经营地址" placeholder="请输入经营地址(必填)" v-model="obj.address"><span class="red">*</span></mt-field>
                    <mt-field label="联系人名称" placeholder="请输入联系人(必填)" v-model="obj.contactName"><span class="red">*</span></mt-field>
                    <a class="mint-cell mint-field">
                        <div class="mint-cell-wrapper radio-cell">
                            <div class="mint-cell-title">
                                 <span class="mint-cell-text">联系人性别</span>
                            </div>
                            <div class="mint-cell-value">
                                <div class="mui-row">
                                    <div class="mui-radio mui-left select-radio mui-col-xs-4">
                                        <label>男</label>
                                        <input name="contactSex" type="radio" value="01" v-model="obj.contactSex">
                                    </div>
                                    <div class="mui-radio mui-left select-radio mui-col-xs-4">
                                        <label>女</label>
                                        <input name="contactSex" type="radio" value="02" v-model="obj.contactSex">
                                    </div>
                                </div>
                                <div class="mint-field-other"><span class="red">*</span></div>
                            </div>
                        </div>
                    </a>
                    <mt-field label="联系人职位" placeholder="请选择联系人职位(必选)" v-model="obj.positionName" @focus.native.capture="popupVisible=true" :readonly="true"><span class="red">*</span></mt-field>
                    <mt-field label="联系人电话" placeholder="请输入联系人电话(必填)" v-model="obj.contactPhone" @blur.native.capture="contactPhone1(obj.contactPhone,2)"><span class="red">*</span></mt-field>
                    <a class="mint-cell mint-field">
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text">营业执照号码</span>
                            </div>
                            <div class="mint-cell-value">
                                <input placeholder="请输入营业执照号码(必填)" v-model="obj.blisCode"  type="text" class="mint-field-core" onkeyup="value=value.replace(/[^0-9a-zA-Z]/g,'')" onpaste="value=value.replace(/[^0-9a-zA-Z]/g,'')" oncontextmenu="value=value.replace(/[^0-9a-zA-Z]/g,'')">
                                <div class="mint-field-other"><span class="red">*</span></div>
                            </div>
                        </div>
                    </a>
                     <a class="mint-cell mint-field">
                        <div class="mint-cell-wrapper">
                            <div class="mint-cell-title">
                                 <span class="mint-cell-text">营业执照名称</span>
                            </div>
                            <div class="mint-cell-value">
                                <input placeholder="请输入营业执照名称(必填)" v-model="obj.blisNm"  type="text" class="mint-field-core">
                                <div class="mint-field-other"><span class="red">*</span></div>
                            </div>
                        </div>
                    </a>
            </form>
            <div class="bottom-btn" @click.stop="submit">
                <button type="button" class="def-btn">提交</button>
            </div>
            <!-- 联系人职位-->
            <section id="dialogMask" class="dialogMask" v-show="popupVisible"></section>
            <div class="picker-view" v-show="popupVisible">
                <mt-picker :slots="dataList" :visible-item-count="5" :show-toolbar="true" ref="picker" valueKey="name">
                    <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible=false">取消</span>
                    <span class="mint-datetime-action mint-datetime-confirm" @click="positonConfirm">确定</span>
                </mt-picker>
            </div>

            <!-- </mt-popup> -->
        </div>
    </div>
</template>
<script>
import Header from "@/components/Header";
import { Toast, MessageBox } from "mint-ui";
import { formatDate, isPoneAvailable} from "../../utils/index.js";
export default {
    components: {
        Header
    },
    data() {
        return {
            obj: {
                shopName: this.$store.getters["shop"].shop_name,
                contactName: "",
                contactPhone: "",
                province: "",
                city: "",
                address: "",
                classCode: "",
                classThird:"",
                contactSex:"",
                positionName: "",
                positionValue: "",
                blisCode: "",
                blisNm:"",
                CompanyList:[],
                companyCode:"0"
            },
            // startDate:new Date(),
            // dataVal: new Date(),
            popupVisible: false,
            provinceList: [],
            cityList: [],
            customer: [],
            dataList: [
                // 当slots这样定义时，因为tagList是通过api异步请求的，无法正常渲染，出现下图空白
                {
                    flex: 1,
                    values: [],
                    className: "slot1",
                    textAlign: "center",
                    valueKey: 0
                }
            ],
            handler: function(e) {
                e.preventDefault();
            },
        };
    },
    //侦听属性
    watch: {
        //picker关闭没有回调函数，所以侦听该属性替代
        popupVisible(val) {
            if (val) {
                this.closeTouch();
            } else {
                this.openTouch();
            }
        }
    },
    mounted() {},
    created() {
        this.initProvinceList();
        this.getPosition(); //获取职位
        this.getCustomer();
        this.initCompanyList();
        // this.initCustomer()
    },
    computed: {
        classListTwo() {
            return this.customer.filter(item => {
                return item.parentid == 2;
            });
        },
        classListThree() {
            var classCode = this.obj.classCode;
            this.obj.classThird=''
            return this.customer.filter((item,index)=>{
                var flag = false;
                if(item.parentid == classCode&&item.parentid!=0){
                    flag = true;
                }else{
                    flag = false;
                }
                return flag;
            })
        },
        thirdName() {
           var classThird = this.obj.classThird;
            var _index = this.classListThree.findIndex((item, index)=>{
               return classThird == item.id;
           })
           if(_index === -1 || _index == undefined){
               return "";
           }
           else{
               return this.classListThree[_index].name;
           }
        },
        className(){
            var foodIndex = this.classListTwo.findIndex(todo => {
                return todo.itemId == this.obj.classCode;
            });
            if (
                foodIndex === -1 ||
                foodIndex == null ||
                foodIndex == undefined
            ) {
                return "";
            } else {
                return this.classListTwo[foodIndex].name;
            }
        }
    },
    methods: {
        /*解决页面层级相互影响滑动的问题*/
        closeTouch() {
            document
                .getElementsByTagName("body")[0]
                .addEventListener("touchmove", this.handler, {
                    passive: false
                }); //阻止默认事件
        },
        openTouch() {
            document
                .getElementsByTagName("body")[0]
                .removeEventListener("touchmove", this.handler, {
                    passive: false
                }); //打开默认事件
        },
        initCustomer() {
            let content_ = "{'shopId':'" + this.$store.getters['account'].shopId + "'}";
            this.$post("/mobileShop/shopView.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                console.log(res)
            })
        },
        // checkCard() {
        //     if (!this.obj.shopName) return;
        //     var regex =/^[a-zA-Z0-9\u4e00-\u9fa5-（）()-+]+$/
        //     if(regex.test (this.obj.shopName)){
        //         var content_ = "{'shopName':'" + this.obj.shopName + "'}";
        //         this.$post("/mobileShop/checkShopname.do", {
        //             content: content_,
        //             version: "kkllo",
        //             login_token: this.$store.getters["logintoken"]
        //         }).then(res => {
        //             let response = JSON.parse(res);
        //             if (response.optFlag == "yes") {
        //             } else {
        //                 Toast(response.optDesc);
        //                 this.obj.shopName = "";
        //             }
        //         });
        //     }else{
        //         Toast('客户名只能含汉字，数字，英文(可以带括号 + -)');
        //     }
           
        // },

        contact(value, type) {
            if (!value) return;
            var content_ = "{'account':'" + value + "'}";
            this.$post("/appAccount/checkAccount.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                } else {
                    if (type == 1) {
                        Toast("账户名已存在");
                    } else {
                        Toast("手机号已注册");
                        this.obj.contactPhone = "";
                    }
                }
            });
        },
        contactPhone1(value, type) {
            if (!value) return;
            if (!isPoneAvailable(value)) {
                this.obj.contactPhone=''
                Toast({
                    message: "手机号格式不正确",
                    duration: 800
                });
                return false;
            }
            var content_ = "{'phone':'" + value + "'}";
            this.$post("/appAccount/checkPhone.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                } else {
                    Toast("手机号已存在");
                    this.obj.contactPhone = "";
                }
            });
        },
        positonConfirm() {
            this.popupVisible = false;
            this.obj.positionName = this.$refs.picker.getValues()[0].name;
            this.obj.positionValue = this.$refs.picker.getValues()[0].value;
        },
        getPosition() {
            let owner = this.$store.getters["company"].owner;
            let content_ = "{'owner':'" + owner + "'}";
            this.$post("/appAccount/checkPosition.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    let list = [];
                    response.res.forEach((item, index) => {
                        let obj = {
                            name: item.pos_name,
                            value: item.pos_code
                        };
                        list.push(obj);
                    });
                    this.dataList[0].values = list;
                } else {
                    Toast(response.optDesc);
                }
            });
        },
        getCustomer() {
            let owner = this.$store.getters["company"].owner;
            let content_ = "{'owner':'" + owner + "'}";
            this.$post("/mobileShop/shopTypeTree.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.customer = response.res;
                } else {
                    Toast({
                        message: "获取客户失败",
                        duration: 800
                    });
                }
            });
        },
        initProvinceList() {
            let accountObj = this.$store.getters["account"];
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
                    Toast(response.optDesc);
                }
            });
        },
        initCompanyList(){
            this.$post("/mobileShop/getCityParentCompanyList.do", {
                // content: content_,
                // version: "kkllo",
                // login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    // this.provinceList = response.res;
                    response.res && response.res.map((item,index)=>{
                       if(item.isUse==1){
                           this.obj.CompanyList.push(item)
                          } 
                         
                    })
                } else {
                    Toast(response.optDesc);
                }
            });
        },
        loadCity(province_id) {
            let content_ = "{'parentid':'" + province_id + "'}";
            this.obj.province = province_id;
            this.$post("/appRegister/cityList.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.cityList = response.res;
                    if (this.cityList.length > 0) {
                        this.obj.city = this.cityList[0].id;
                    } else {
                        this.obj.city = "";
                    }
                } else {
                    Toast(response.optDesc);
                }
            });
        },
        checkTel(tel) {
            //\d{3}-\d{8}|\d{4}-\d{7}
            var phone = /^0\d{2,3}-?\d{7,8}$/;
            return phone.test(tel);
        },
        submit() {
            if (this.obj.shopName == "") {
                Toast({
                        message: "请输入客户名称",
                        duration: 800
                    });
                return false;
            }
            if (this.obj.classCode == "") {
                    Toast({
                    message: "请选择经营类型",
                    duration: 800
                });
                return false;
            }else if(this.obj.classCode != "" && this.classListThree.length > 0){
                if(this.obj.classThird == ''){
                    Toast({
                        message: "请选择二级经营类型",
                        duration: 800
                    })
                    return false;
                }
            }
            if (this.obj.province == "") {
                 Toast({
                        message: "请输入区域",
                        duration: 800
                    });
                return false;
            }
            if (this.obj.address == "") {
                Toast({
                    message: "请输入经营地址",
                    duration: 800
                });
                return false;
            }
            if (this.obj.contactName == "") {
                 Toast({
                        message: "请输入联系人名称",
                        duration: 800
                    });
                return false;
            }
            
            if (this.obj.contactSex == "") {
                 Toast({
                        message: "请选择联系人性别",
                        duration: 800
                    });
                return false;
            }
            if (this.obj.positionValue == "") {
                 Toast({
                        message: "请选择联系人职位",
                        duration: 800
                    });
                return false;
            }
            if (this.obj.contactPhone == "") {
                 Toast({
                        message: "请输入联系电话",
                        duration: 800
                    });
                return false;
            }
             if (this.obj.blisCode == "") {
                 Toast({
                        message: "请输入营业执照号码",
                        duration: 800
                    });
                return false;
            }
            if (this.obj.blisNm == "") {
                 Toast({
                        message: "请输入营业执照名称",
                        duration: 800
                    });
                return false;
            }
            let accountObj = this.$store.getters["account"];
            let shopVo = {
                shopName: this.obj.shopName,//名称
                contactName: this.obj.contactName, //联系人
                contactPhone: this.obj.contactPhone,
                address: this.obj.address,
                className: this.className,
                classCode: this.obj.classCode,
                classThird:this.obj.classThird,
                thirdName:this.thirdName,
                province: this.obj.province,
                id:accountObj.shopId,
                city: this.obj.city,
            };

            let shopDocVo = {
                blisCode: this.obj.blisCode,
                blisNm: this.obj.blisNm,
            };

            let _content = {
                shopVo: shopVo,
                shopDocVo: shopDocVo,
                // saleRealname: accountObj.realName || "",
                positionCode: this.obj.positionValue,
                positionName: this.obj.positionName,
                contactSex:this.obj.contactSex,
                accountId:accountObj.id
            };
            let content_ = JSON.stringify(_content);
            this.$post("/mobileShop/applyShop.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast("感谢您的信任，信息已提交，良之隆将尽快进行审核");
                    setTimeout(() => {
                        this.$router.back(-1);
                    }, 1000);
                } else {
                    Toast(response.optDesc);
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
h2 {
    font-size: 14px;

    height: 30px;
    line-height: 30px;
    font-weight: normal;
    text-align: left;
    padding-left: 10px;
    background: #ddd;
}
.red{
    color:red;
}
</style>

