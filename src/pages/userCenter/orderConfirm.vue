<template>

    <div id="confirmInfox" v-cloak>
        <mt-header title="确认收货">
            <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <section class="receiving">
            <h2><i class="iconfont password" style="color:#eb6000;margin-right: 3px">&#xe64c;</i>运单编号：{{orderCode}}</h2>
            <ul class="shopping_food" id="goodsList">
                <li v-for="(item,index) in goodsList" :tplId="item.tpl_id" :chag="item.equation_factor" :price_type="item.price_type" class="clearfix" :key="index">
                    <img :src="baseurl+item.img_path">
                    <div class="infor">
                        <span>{{item.skuName}}</span>
                        <span>规格：{{item.styleno}}</span>
                        <span v-if="item.price_type =='1'">实发：{{item.sendQtyx}}{{item.assist_unit}}</span>
                        <span v-if="item.price_type !='1'">实发：{{item.sendQtyx | capitalize(item.uom_default,item.assist_unit,item.equation_factor)}}</span>
                    </div>
                    <div class="right">
                        <label>实收：</label>
                        <input type="number" v-model="item.sendQty" min="0" @blur="checkInput(item,item.sendQty)" style="width:70px;height:25px;text-align: center;" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                        <em v-if="item.price_type =='1'">{{item.assist_unit}}</em>
                        <em v-if="item.price_type !='1'">{{item.uom_default}}</em>
                    </div>
                </li>
            </ul>
        </section>

        <footer class="add_address">
            <button type="button" @click="submitOrder">确认收货</button>
        </footer>
    </div>
</template>
<script>
import Header from "@/components/Header";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../../utils/index.js";
export default {
    data() {
        return {
            orderCode: "",
            groupCode: "",
            shopObj: "",
            goodsList: []
        };
    },
    components: {
        Header
    },
    filters: {
        capitalize: function(value, uom_default, assist_unit, equation_factor) {
            var _yu = m_rem(value || 0, equation_factor || 1);
            var shang = parseInt(value / equation_factor);
            if (_yu == 0) {
                return shang.toFixed(2) + "" + assist_unit;
            } else if (shang == 0) {
                return _yu + "" + uom_default;
            } else {
                return shang + "" + assist_unit + _yu + "" + uom_default;
            }
        },
        qty: function(value, equation_factor) {
            return m_div(
                parseFloat(value) || 0,
                parseFloat(equation_factor) || 1
            ).toFixed(2);
        }
    },
    mounted: function() {
        this.orderCode = this.$route.query.orderCode;
        this.groupCode = this.$route.query.groupCode;
        this.initOrder();
    },
    methods: {
        back() {
            this.$router.back(-1);
        },
        checkInput: function(food, value) {
            if (food.price_type == "1") {
                if (food.sendQty > food.sendQtyx) {
                    Toast("实收数量不能大于实发数量");
                    food.sendQty = food.sendQtyx;
                    return;
                }
                food.sendQty = value;
            }
        },
        initOrder: function() {
            var self = this;
            //获取登录信息
            var content_ =
                "{'orderCode':'" +
                this.orderCode +
                "','groupCode':'" +
                this.groupCode +
                "'}";
            this.$post(
                "/appOrder3/toConfirmGroup.do",
                {
                    content: content_,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                },
                { emulateJSON: true }
            )
                .then(function(res) {
                    var response = JSON.parse(res);
                    if (response.optFlag == "yes") {
                        self.goodsList = response.res;
                    }
                    // var shopObj = readCookie("shopObj");
                    let shopObj = self.$store.getters["shop"]
                        ? self.$store.getters["shop"]
                        : {};
                    self.goodsList.forEach(function(item) {
                        //                        var own = self;
                        if (shopObj.typeId == "2") {
                            item.sendQty = m_div(
                                parseFloat(item.sendQty),
                                parseFloat(item.equation_factor)
                            ).toFixed(2);
                            item.sendQtyx = item.sendQty;
                        } else {
                            //零售
                            // var _yu = m_rem(item.sendQty || 0,item.equation_factor || 1);
                            // var shang = parseInt(item.sendQty / item.equation_factor);
                            // if(_yu == 0){
                            //    item.sendQty = shang + '' + item.uom_default;
                            // }else{
                            //    item.sendQty = shang + '' + item.assist_unit + _yu + '' + item.uom_default;
                            // }
                            item.sendQty = parseFloat(item.sendQty).toFixed(2);
                            item.sendQtyx = item.sendQty;
                        }
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        submitOrder: function() {
            MessageBox.confirm("确认收货？").then(action => {
                var that = this;
                let account = this.$store.getters["account"]
                    ? this.$store.getters["account"]
                    : {};
                var opt = new Array();
                this.goodsList.forEach(function(ele, index) {
                    var op = [];
                    var price_type = ele.price_type;
                    if (price_type == "1") {
                        var recivedStr = ele.sendQty;
                        var chag = ele.equation_factor;
                        //乘
                        var recivedQty = m_mul(recivedStr, chag);
                    } else {
                        var recivedQty = ele.sendQty;
                    }
                    var tplId = ele.tpl_id;
                    op.push("'recivedQty':'" + recivedQty + "'");
                    op.push("'tplId':'" + tplId + "'");
                    opt.push("{" + op.join(",") + "}");
                });
                var content_ =
                    "{" +
                    "'account': '" +
                    account.account +
                    "'," +
                    "'groupSkuList': [" +
                    opt.join(",") +
                    "]," +
                    "'group_code': '" +
                    that.groupCode +
                    "'," +
                    "'order_code': '" +
                    that.orderCode +
                    "'" +
                    "}";
                var shr = that;
                shr.$post("/appOrder3/confirmGroup.do", {
                    content: content_,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                }).then(function(data) {
                        var response = JSON.parse(data);
                        if (response.optFlag == "yes") {
                            Toast("确认收货成功");
                            shr.$router.push("/vpOrderList");
                        } else {
                            Toast(response.optDesc);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }).catch(() => {
                // Toast('操作取消');
            });
        }
    }
};
</script>
<style scoped lang="less">
// body{
//     background: #fff!important;
// }
.my-content {
    padding-top: 46px;
    margin-top: 0 !important;
}
.receiving {
    padding-bottom: 100px;
}
.receiving h2 {
    font-size: 14px;
    border-top: 1px solid #ddd;
    height: 40px;
    line-height: 40px;
    font-weight: normal;
    text-align: left;
    padding-left: 10px;
    background: #fff;
}
.shopping_food {
    background-color: #eaf1f8;
}
.shopping_food li {
    padding: 10px;
    position: relative;
    border-bottom: 1px solid #ddd;
}
.shopping_food li img {
    float: left;
    width: 50px;
    height: 50px;
}
.shopping_food li .infor {
    float: left;
    margin-left: 10px;
    text-align: left;
}
.shopping_food li .infor span:nth-child(1) {
    font-size: 14px;
    margin-bottom: 10px;
    color: #333333;
}
.shopping_food li .infor span:nth-child(2) {
    color: #757575;
    margin-bottom: 5px;
}
.shopping_food li .infor span {
    display: block;
    font-size: 14px;
}
.shopping_food li .right {
    position: absolute;
    right: 10px;
    bottom: 6px;
}
.right {
    float: right;
}
.shopping_food li .right input {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 10px;
}
footer.add_address {
    position: fixed;
    bottom: 0;
    width: 100%;
}
footer.add_address button {
    width: 100%;
    height: 40px;
    background-color: #eb6000;
    color: #fff;
    border: 0;
    font-size: 16px;
    bottom: -1px;
}
</style>

