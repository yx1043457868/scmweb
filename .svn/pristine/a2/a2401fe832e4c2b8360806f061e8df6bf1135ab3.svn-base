<template>
    <div class="order_success">
        <div class="pay-info">
            <i class="iconfont">&#xe60f;</i>
            <h3>已提交，请等待审核</h3>
            <h3 class="dd">单号     {{code}}</h3>
            <h3 class="dd">提交时间     {{createTime}}</h3>
        </div>
        <div class="btn_group">
            <router-link :to='{path:"/"}' class="lick">返回首页</router-link>
             <router-link to="/allOrder" class="lick">查看样品单</router-link>
            <!-- <a href="javascript:;" class="lick" @click="goPay">立即支付</a> -->
        </div>
    </div>
</template>
<script>
export default {
    name: "orderOk",
    data() {
        return {
            code:"",
            time:"",
            index:0,
            createTime:"",
        };
    },
    created() {},
    methods: {

    },
    mounted(){
        this.code = this.$route.query.orderCode;
        this.createTime= this.$route.query.createTime;
        this.index=this.$route.query.index;
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
    .dd {
           font-size: 12px;
    color: #8f8f94;
    padding: 0 74px;
    text-align: left;
    margin-bottom: 10px;
    text-align: center;
    }
    .btn_group {
        margin-top: 20px;
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
