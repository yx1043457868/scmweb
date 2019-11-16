<template>
    <div>
        <div class="header">
            <mt-header title="退货详情">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header>
        </div>
        <div class="my-content">
            <mt-cell title="关联订单号" is-link :to='{path:"/vpOrderDetail",query:{id:relOrderCode}}'><span style="color: #eb6000">{{relOrderCode}}</span></mt-cell>
            <ul class="mui-table-view order-ul mt-10" id="order-ul">
                <li class="mui-table-view-cell mui-media" v-for="(item,index) in returnOrderDetailInfo" :key="index">
                    <a class="clearfix" href="javascript:;">
                        <div class="list-img">
                            <img class="mui-media-object mui-pull-left" v-lazy="baseurl+item.imgPath" />
                        </div>
                        <div class="mui-media-body detail-info">
                            <h4 class="list-name">{{item.skuName}}<span class="price">￥{{item.unitPrice | toFixed2}}/{{item.unit}}</span></h4>
                            <h5 class="mui-ellipsis list-size">规格：{{item.styleno}}</h5>
                            <div>
                                <h5 class="mui-ellipsis def-text">请货量：{{item.qty |
                                    capitalize(item.equationFactor,item.unit,item.uomDefault)}}
                                </h5>
                                <p class="mui-ellipsis list-deliver">
                                    <span>实发：{{item.sendQty | capitalize(item.equationFactor,item.unit,item.uomDefault)}}</span>
                                    <span>已退：{{item.returnQty | capitalize(item.equationFactor,item.unit,item.uomDefault)}}</span>
                                </p>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="sales-return" v-if="note">
                <div class="return-item">
                    <h4 class="return-title">异常描述：</h4>
                    <p class="return-text">{{note ? note : "暂无"}}</p>
                </div>
            </div>
            <div class="mt-10" v-if="returnAuditLog && returnAuditLog.length > 0">
                <div class="truck">
                    <span>退货追踪</span>
                </div>
                <ul class="mui-table-view log-ul">
                    <li class="mui-table-view-cell mui-media" v-for="(item,index) in returnAuditLog" :key="index">
                        <em></em>
                        <i style="line-height:24px;" class="mui-media-object object mui-pull-left iconfont">&#xe60f;</i>
                         
                        <div class="mui-media-body">
                            {{item.action}}
                            <p class='mui-ellipsis'>{{item.actionUser}}</p>
                            <p class='mui-ellipsis'>{{item.actionTime}}</p>
                        </div>
                         
                    </li>
                     
                </ul>
            </div>
        </div>
    </div>
</template>
			
<script>
import {
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem
} from "../../utils/index.js";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
    name: "returnOrderDetail",
    data() {
        return {
            tab: "1",
            skuList: [],
            orderInfo: {},
            orderLog: [],
            auditLen: "",
            returnOrderDetailInfo: [],
            groupImagesList: [],
            returnAuditLog: [],
            goodsautive: "",
            isShow: false,
            note: "",
            relOrderCode: ""
        };
    },
    filters: {
        capitalize(value, equation_factor, assist_unit, uom_default) {
            // if (price_type == 1) {
            if (equation_factor == 1) {
                //转换率为1
                return parseFloat(value).toFixed(2) + "" + assist_unit;
            } else {
                var _yu = m_rem(
                    parseFloat(value) || 0,
                    parseFloat(equation_factor) || 1
                );
                var shang = parseInt(
                    parseFloat(value) / parseFloat(equation_factor)
                );
                if (_yu == 0) {
                    //被整除
                    return shang.toFixed(2) + "" + assist_unit;
                } else if (shang == 0) {
                    return _yu + "" + uom_default;
                } else {
                    return shang + "" + assist_unit + _yu + "" + uom_default;
                }
            }
        },
        qtyStr: function(value, equation_factor) {
            return m_div(
                parseFloat(value) || 0,
                parseFloat(equation_factor) || 1
            ).toFixed(2);
        },
        price: function(value, value1, value2) {
            if (shopObj.typeId == 2) {
                value = value2;
            } else {
                value = value1;
            }
            return value;
        }
    },
    created: function() {
        this.getReturnOrderDetail(); //获取退货详情
    },
    methods: {
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.go(-1);
            }
        },
        getReturnOrderDetail() {
            //获取登录信息
            var id = this.$route.query.id;
            var content = '{"wmsNo": "' + id + '"}';
            this.$post("/returnorder/getReturnOrderDetails.do", {
                content: content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    this.returnOrderDetailInfo =
                        response.res.returnOrderDetailInfo;
                    this.returnAuditLog = response.res.returnAuditLog;
                    this.note = response.res.note;
                    this.relOrderCode = response.res.wmsAsn.relOrderCode;
                    this.returnAuditLog.forEach((item, index) => {
                        let list = [];
                        let obj = {
                            action: item.action
                        };
                        list.push(obj);
                    });
                } else {
                    Toast(response.optDesc);
                }
            });
        }
    }
};
</script>
			
<style scoped lang="less">
@base: #eb6000;
.mui-table-view li em {
    height: 100%;
    width: 1px;
    background-color: #ddd;
    position: absolute;
    left: 0.66rem;
    top: 11px;
}
.object {
    line-height: 24px !important;
}
.log-ul .mui-table-view-cell{
    padding: 0 15px 15px;
}
.mui-table-view li:last-child em{
    display: none;
}
.mui-table-view li:last-child {
    margin-bottom: 10px;
}
.truck {
    padding: 10px;
    background: #fff;
    span {
        font-size: 14px;
    }
}
.log-ul {
    background: #fff;
    position: relative;
    &:before {
        display: none;
    }
    .mui-table-view-cell {
        position: relative;
        .mui-media-object {
            position: relative;
            z-index: 2;
            color: @base;
            font-size: 22px;
            overflow: visible;
        }
        &:before {
            content: "";
            position: absolute;
            bottom: 0;
            left:-9px;
            width: 1px;
            height: 100%;
            z-index: 1;
            background-color: @base;
        }
        &::after{
            display: none;
        }
        .mui-media-body {
            font-size: 15px;
            color: #333;
            p {
                font-size: 12px;
                color: #888888
            }
        }
    }
}
 
</style>
		