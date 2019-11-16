<template>
        <div class="classify-item" >
            <div class="accountRealName">
                <div class="tipPrice">门店配送，需与线下门店协商确定</div>
                <div v-show="accountRealName || accountPhone" class="tipAccount">
                    联系人：<span v-show="accountRealName">{{accountRealName}}</span>
                    <span v-show="accountPhone"> {{accountPhone}}</span>
                </div>
            </div>
            <a :href="'tel:'+accountPhone" v-show="accountPhone" class="accountPhone"><i class="iconfont phone-icon">&#xe729;</i></a>
        </div>
</template>

<script>

export default {
    name: "logisticsItem",
    data() {
        return {
            accountPhone:this.$store.getters["company"].contactPhone?this.$store.getters["company"].contactPhone:'',
            accountRealName:this.$store.getters["company"].contactName?this.$store.getters["company"].contactName:'',
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
