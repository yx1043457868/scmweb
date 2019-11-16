<template>
    <div>
        <Header title="免费送样申请"></Header>
        <div class="my-content">
            <div class="form-wrapper">
                <mt-field label="公司名称" placeholder="请输入公司名称" type="text" v-model="companyName"></mt-field>
                <mt-field label="联系人" placeholder="请输入联系人" type="tel" v-model="contactName"></mt-field>
                <mt-field label="联系电话" placeholder="请输入联系电话" type="tel" v-model="contactPhone"></mt-field>
                <mt-field label="收货地址" placeholder="请输入收货地址" type="text" v-model="contactAddress"></mt-field>
                <div class="mint-cell cell-link" @click="popupVisible1=true">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">公司性质</div>
                        <div class="mint-cell-value is-link">
                            <span :class="[companyType !='' ? 'active':'']">{{companyType ? companyType : "请选择公司性质"}}</span>
                        </div>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
                <div class="mint-cell cell-link" @click="popupVisible=true">
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">公司所在区域</div>
                        <div class="mint-cell-value is-link">
                            <span :class="[address !='' ? 'active':'']">{{address ? address : "请选择公司所在区域"}}</span>
                        </div>
                        <i class="mint-cell-allow-right"></i>
                    </div>
                </div>
                <!-- <div data-v-3c547f92="" class="mint-cell mint-field">
                    <div class="mint-cell-left"></div>
                    <div class="mint-cell-wrapper">
                        <div class="mint-cell-title">
                            <span class="mint-cell-text">公司所在区域</span>
                        </div>
                        <div class="mint-cell-value">
                            <select name="province" id="province" class="required" @change="loadCity(contactProvince)" v-model="contactProvince">
                                <option disabled value=""> 请选择</option>
                                <option v-for="(province,index) in provinceList" :value="province.id" :key="index">{{province.title}}</option>
                            </select>
                            <select name="city" id="city" v-model="contactCity" v-show="cityList && cityList.length > 0">
                                <option disabled value="-1" selected>请选择</option>
                                <option v-for="(city,index) in cityList" :value="city.id" :key="index">{{city.title}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="mint-cell-right"></div>
                </div> -->
                <!-- 公司所在区域 -->
                <section id="dialogMask" class="dialogMask" v-show="popupVisible"></section>
                <div class="picker-view" v-show="popupVisible">
                    <mt-picker :slots="slots" :visible-item-count="5" :show-toolbar="true" ref="picker" valueKey="aname" @change="handleValChange">
                        <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible=false">取消</span>
                        <span class="mint-datetime-action mint-datetime-confirm" @click="handleFillAddress">确定</span>
                    </mt-picker>
                </div>
                <div class="mt-10">
                    <div class="upload-img-wrapper">
                        <div class="upload-title" @click.stop="openDialog"><i class="iconfont">&#xe67a;</i><span>添加送样商品</span> <em>说明：最多申请三个商品</em> </div>
                        <div class="upload-img clearfix">
                            <div class="img-list" v-for="(item,index) in skus" :key="index">
                                <img v-lazy="baseurl+item.img_path">
                                <p>{{item.sku_name}}</p>
                                <span class="delete-img" @click.stop="deleteImg(index)">×</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bottom-btn">
                <button type="button" class="def-btn" @click="commit">提交</button>
            </div>
        </div>
        <section id="dialogMask" class="dialogMask" v-show="isShow"></section>
        <transition name="slide" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
            <div class="dialog-wrapper" id="dialog" v-show="isShow">
                <div class="dialog-box" style="padding-bottom:0">
                    <div class="dialog-header center">添加商品<span class="close-dialog" @click.stop="isShow= false">×</span></div>
                    <form class="form-wrapper" action='#' method='post' enctype="multipart/form-data">
                        <mt-field label="商品名称" placeholder="请输入商品名称" type="text" v-model="skuName" @blur.native.capture="blurWatch"></mt-field>
                        <div class="upload-wrapper">
                            <div class="add">
                                <div class="add-image">
                                    <i class="icon-camera"></i>
                                    <img src="" id="upLoadImg" v-show="imgShow">
                                    <input @change="fileChange($event)" type="file" accept="image/*" name="image" id="inputFile" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="confirm_b">
                        <button class="sure_btn" @click="savaImg">保存</button>
                        <!-- <button class="no_pay">未支付</button> -->
                    </div>
                </div>
            </div>
        </transition>
        <!-- 公司性质 -->
        <section id="dialogMask" class="dialogMask" v-show="popupVisible1"></section>
        <div class="picker-view" v-show="popupVisible1">
            <mt-picker :slots="dataList" :visible-item-count="5" :show-toolbar="true" ref="popupPicker1" valueKey="name">
                <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible1=false">取消</span>
                <span class="mint-datetime-action mint-datetime-confirm" @click="valueConfirm">确定</span>
            </mt-picker>
        </div>
    </div>
</template>

<script>
import { Toast, MessageBox, Indicator } from "mint-ui";
import Header from "@/components/Header";
import { isPoneAvailable, myaddress } from "../../utils/index.js";
import { address, slots } from "../../utils/address3.js";
export default {
    name: "applySample",
    components: {
        Header
    },
    data() {
        return {
            companyName: "",
            contactName: "",
            contactPhone: "",
            contactAddress: "",
            companyType: "",
            company_nature: "",
            companyList: [],
            cityList: [],
            provinceList: "",
            isShow: false,
            imgShow: false,
            popupVisible: false,
            popupVisible1: false,
            slots,
            address: "",
            tempAddress: "",
            skuName: "",
            city_name: "",
            area_name: "",
            city_id: "",
            area_id: "",
            handler: function(e) {
                e.preventDefault();
            },
            dataList: [
                // 当slots这样定义时，因为tagList是通过api异步请求的，无法正常渲染，出现下图空白
                {
                    flex: 1,
                    values: [
                        {
                            name: "餐饮酒店",
                            value: "1"
                        },
                        {
                            name: "经销商",
                            value: "2"
                        },
                        {
                            name: "供应商",
                            value: "3"
                        },
                        {
                            name: "联盟商",
                            value: "4"
                        },
                        {
                            name: "其他",
                            value: "5"
                        }
                    ],
                    className: "slot1",
                    textAlign: "center",
                    valueKey: 0
                }
            ],
            slots: [
                {
                    flex: 1,
                    values: address.filter(item => item.apid === 0),
                    className: "slot1",
                    textAlign: "center"
                },
                {
                    flex: 1,
                    values: address.filter(item => item.apid === 1),
                    className: "slot2",
                    textAlign: "center"
                },
                {
                    flex: 1,
                    values: address.filter(item => item.apid === 36),
                    className: "slot3",
                    textAlign: "center"
                }
            ],
            upLoadUrl: "",
            skus: []
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
        },
        popupVisible1(val) {
            if (val) {
                this.closeTouch();
            } else {
                this.openTouch();
            }
        },
        isShow(val) {
            if (val) {
                this.closeTouch();
            } else {
                this.openTouch();
            }
        }
    },
    created() {
        // this.initProvinceList();
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
        deleteImg(index) {
            MessageBox.confirm("确定取消该订单吗?")
            .then(action => {
                this.skus.splice(index, 1);
            })
            .catch(() => {
                // Toast('操作取消');
            });
        },
        blurWatch() {
            window.scroll(0, 0);
        },
        valueConfirm() {
            this.popupVisible1 = false;
            this.companyType = this.$refs.popupPicker1.getValues()[0].name;
            this.company_nature = this.$refs.popupPicker1.getValues()[0].value;
        },
        handleValChange(picker, values) {
            // 防止没有省份时报错
            if (values[0]) {
                picker.setSlotValues(
                    1,
                    address.filter(item => item.apid === values[0].aid)
                );
            }
            // 防止没有市时报错
            if (values[1]) {
                picker.setSlotValues(
                    2,
                    address.filter(item => item.apid === values[1].aid)
                );
            }
            // 防止没有区时报错
            if (values[2]) {
                // 这里可以指定地址符之间的连接符，此处以空格进行连接
                this.tempAddress = [
                    values[0].aname,
                    values[1].aname,
                    values[2].aname
                ].join(" ");
            }
        },
        handleFillAddress() {
            // 填入省市区
            this.address = this.tempAddress;
            this.city_name = this.address.split(" ")[1];
            this.area_name = this.address.split(" ")[2] || "";
            this.popupVisible = false;
        },
        fileChange(el) {
            var self = this;
            if (!el.target.files[0].size) return;
            Indicator.open({
                text: "图片上传中...",
                spinnerType: "fading-circle"
            });
            var formData = new FormData();
            formData.append("image", el.target.files[0]);
            //图片预览
            let windowURL = window.URL || window.webkitURL;
            let url = windowURL.createObjectURL(el.target.files[0]); // 得到bolb对象路径，可当成普通的文件路径一样使用，赋值给src;
            //图片上传到服务器
            var XHR = null;
            if (window.XMLHttpRequest) {
                // 非IE内核
                XHR = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                // IE内核，这里早期IE版本不同，具体可以查下
                XHR = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                XHR = null;
            }
            if (XHR) {
                XHR.open("POST", self.apiurl + "/appSample/uploadSamplePic.do");
                XHR.onreadystatechange = function() {
                    if (XHR.readyState == 4 && XHR.status == 200) {
                        var resultValue = XHR.responseText;
                        var data = JSON.parse(resultValue);
                        if (data.optFlag == "yes") {
                            Indicator.close();
                            Toast(data.optDesc);
                            self.imgShow = true;
                            self.upLoadUrl = data.res;
                            document.getElementById("upLoadImg").src = url;
                        } else {
                            Toast(data.optDesc);
                            Indicator.close();
                            document.getElementById("upLoadImg").src = "";
                            self.imgShow = false;
                            self.upLoadUrl = "";
                        }
                        XHR = null;
                    }
                };
                XHR.send(formData);
            }
        },
        openDialog() {
            if (this.skus.length >= 3) {
                Toast("最多申请三个商品");
                return false;
            }
            this.isShow = true;
        },
        savaImg() {
            var imgUrl = document.getElementById("upLoadImg").src;
            if (this.skuName == "") {
                Toast("请输入商品名称");
                return false;
            }
            if (this.upLoadUrl == "" || imgUrl == "") {
                Toast("请上传商品图片");
                return false;
            }
            document.getElementById("upLoadImg").src = "";
            this.imgShow = false;
            var obj = {
                sku_name: this.skuName,
                img_path: this.upLoadUrl
            };
            this.skus.push(obj);
            this.isShow = false; //关闭弹出层
            this.skuName = ""; //清空商品名称
            this.upLoadUrl = "";
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
                    if (this.cityList.length > 0) {
                        this.contactCity = this.cityList[0].id;
                    } else {
                        this.contactCity = "";
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
            if (this.companyName == "") {
                Toast({
                    message: "请输入公司名称",
                    duration: 1000
                });
                return false;
            }
            if (this.contactName == "") {
                Toast({
                    message: "请输入联系人",
                    duration: 1000
                });
                return false;
            }
            if (this.contactPhone == "") {
                Toast({
                    message: "请输入联系方式",
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
            if (this.contactProvince == "") {
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
            let accountObj = this.$store.getters["account"];
            let account = accountObj.account;
            let content_ =
                "{'account':'" +
                account +
                "','customer_name':'" +
                this.companyName +
                "','customer_account':'" +
                this.contactName +
                "','customer_phone':'" +
                this.contactPhone +
                "','receive_address':'" +
                this.contactAddress +
                "','company_nature':'" +
                this.company_nature +
                "','city_name':'" +
                this.city_name +
                "','city_id':'" +
                this.city_id +
                "','area_id':'" +
                this.area_id +
                "','area_name':'" +
                this.area_name +
                "','skus':" +
                JSON.stringify(this.skus) +
                "}";
            this.$post("/appSample/saveSampleApply.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.$router.push({path:"/applyOK"});
                } else {
                    Toast(response.optDesc);
                }
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.upload-img-wrapper {
    background-color: #fff;
    min-height: 180px;
    padding: 10px;
    .upload-title {
        font-size: 14px;
        color: @base;
        i {
            vertical-align: middle;
            font-size: 16px;
        }
        em {
            color: #b3b3bb;
            font-size: 12px;
            vertical-align: middle;
            margin-left: 15px;
        }
    }
    .upload-img {
        // display: flex;
        // justify-content: space-around;
        padding: 15px 0;
        .img-list {
            float: left;
            text-align: center;
            margin-right: 10px;
            width: 100px;
            position: relative;
            img {
                width: 100px;
                height: 100px;
                display: block;
                border: 1px solid #eee;
                margin-bottom: 4px;
            }
            p {
                color: #888888;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .delete-img {
                position: absolute;
                top: -4px;
                display: block;
                right: -4px;
                width: 16px;
                height: 16px;
                color: #fff;
                background-color: red;
                border-radius: 50%;
                font-size: 18px;
                line-height: 14px;
                z-index: 99;
                cursor: pointer;
            }
        }
    }
}
.upload-wrapper {
    padding: 15px 10px;
    display: flex;
    min-height: 180px;
    justify-content: space-between;
    flex-flow: row wrap;
    .add {
        display: inline-block;
        .add-image {
            width: 100px;
            height: 100px;
            position: relative;
            .icon-camera {
                width: 100px;
                height: 100px;
                position: absolute;
                width: 100px;
                height: 100px;
                left: 0;
                top: 0;
                background: url("../../../static/images/z_add.png") left top
                    no-repeat;
                background-size: cover;
                background-color: #ffffff;
            }
            .upLoadImg {
                display: block;
                width: 100px;
                height: 100px;
                position: relative;
                z-index: 2;
            }
            img {
                display: block;
                width: 100px;
                height: 100px;
                position: relative;
                z-index: 2;
            }
            input::-webkit-file-upload-button {
                position: absolute;
                width: 100px;
                height: 100px;
                outline: 0;
                border: 0;
                opacity: 0;
            }

            input[type="file"] {
                display: block;
                position: absolute;
                left: 0;
                top: 0;
                width: 100px;
                height: 100px;
                border: 0;
                // vertical-align: middle;
            }
            .font-text {
                font-size: 12px;
                margin-top: 4px;
                line-height: 20px;
                text-align: center;
                height: 36px;
            }
        }
    }
}
</style>
