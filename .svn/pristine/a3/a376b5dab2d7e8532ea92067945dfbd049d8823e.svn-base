<template>
    <div class="order_success">
        <div class="pay-info">
            <i class="iconfont">&#xe60f;</i>
            <h3>{{title}}</h3>
            <p>订单编号：{{this.$route.query.code}}</p>
            <p>提交时间：{{this.$route.query.creatTime}}</p>
            <img class="order-qcode" :src="baseurl+this.$route.query.orderQRCodePath" alt="订单二维码">
        </div>
        <div class="btn_group">
            <router-link :to="{path:'/'}" class="lick">回到首页</router-link>
            <router-link :to="{path:'/vpOrderList'}" class="lick">查看订单</router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "orderOk",
    data() {
        return {
            title: this.$route.query.type ? "支付成功" : "提交成功"
        };
    },
    created() {},
    methods: {
        // goPay() {
        //     this.$router.push({
        //         path: "/pay"
        //     });
        // }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.order_success {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    text-align: center;
    padding-top: 120px;
    i.iconfont {
        color: @base;
        font-size: 100px;
    }
    h3 {
        color: @base;
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
        font-weight: 400;
    }
    p {
        font-size: 12px;
        color: #999999;
        margin-bottom: 20px;
    }
    .order-qcode{
        width: 120px;
        height: 120px;
        display: block;
        margin: 15px auto;
        border: 1px solid #dddddd;
    }
    .btn_group {
        a {
            background-color: @base;
            color: #fff;
            height: 40px;
            display: inline-block;
            line-height: 40px;
            width: 40%;
            margin: 0 10px;
            border-radius: 4px;
            text-align: center;
        }
    }
}
</style>
