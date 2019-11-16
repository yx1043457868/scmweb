<template>
    <div>
        <div class="header">
            <mt-header :title="'退货详情'">
                <mt-button icon="back" slot="left" @click="back()"></mt-button>
            </mt-header>
        </div>
                            <div class="bodyMid">
                        <ul v-for="(item,index) in orderList" :key="index">
                            <li>
                                <div class="head">
                                    <span>单号:{{item.orderCode}}</span>
                                    <span>{{item.handleStatus}}</span>
                                    <span @click="cancel(item.orderCode,index,item)" v-if="item.handleStatus !='已取消'">取消申请</span>
                                </div>
                                <div class="body_" v-for="(list,index) in item.set" :key="index">
                                    <div class="body_img">
                                        <img :src="baseurl+list.imgPath">
                                    </div>
                                    <div class="body_name">
                                        <span>{{list.skuName}}</span>
                                        <span>×{{list.qty}}</span>
                                    </div>
                                    <div class="body_Specifications">
                                        <span>{{list.styleno}}</span>
                                    </div>
                                    <div class="body_describe" v-html="list.skuDec">
                                        {{list.skuDec}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
        <ul class="mui-table-view logis-ul">
            <li class="mui-table-view-cell mui-media" v-for="(item,index) in orderLogis.orderLocalLink" :key="index">
                <i class="mui-media-object mui-pull-left iconfont">&#xe60f;</i>
                <div class="mui-media-body">
                    {{item.optDesc}}
                    <p class='mui-ellipsis'>{{item.optTime}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderLogis: [],
            orderList:[],
        };
    },
    methods:{
        back: function() {
            
        },
    }
};
</script>
<style lang="less" scoped>
.logis-ul {
    padding: 15px 15px 0 36px !important;
}
</style>


