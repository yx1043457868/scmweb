<template>
    <!-- 轮播图 -->
    <div class="banner">
        <mt-swipe :auto="4000"
                  v-if="EnableList && EnableList.length > 0">
            <mt-swipe-item v-for="(item, index) in EnableList"
                           :url="item.bannerPath"
                           :key="index">
                <a :href="item.bannerPath ? item.bannerPath : 'javascript:;'">
                    <img :src="baseurl + item.bannerUrl"
                         :alt="item.bannerName" />
                </a>
            </mt-swipe-item>
        </mt-swipe>
        <mt-swipe :auto="4000"
                  v-else>
            <mt-swipe-item v-for="(item, index) in swiperList"
                           :key="index">
                <img :src="baseurl + item.backgroundImage"
                     alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
import Bus from "../utils/bus.js";
export default {
    name: "homeBanner",
    data() {
        return {
            EnableList: [],
            activityList: [],
            swiperList: [
                {
                    backgroundImage: "upload/adv/idx/top1.jpg",
                    name: "top1"
                },
                {
                    backgroundImage: "upload/adv/idx/top2.jpg",
                    name: "top2"
                },
                {
                    backgroundImage: "upload/adv/idx/top3.jpg",
                    name: "top3"
                }
            ]
        };
    },
    created() {
        this.$get("/homeBanner/getEnableList.do")
            .then(res => {
                //初始化轮播
                if (JSON.parse(res).flag == true) {
                    this.EnableList = JSON.parse(res).data.bannerList
                        ? JSON.parse(res).data.bannerList
                        : [];
                    this.activityList = JSON.parse(res).data.activityList
                        ? JSON.parse(res).data.activityList
                        : [];
                    Bus.$emit("activityListBanner", this.activityList);
                } else {
                    this.EnableList = [];
                    this.activityList = [];
                    // Bus.$emit('activityListBanner', this.activityList)
                }
                Bus.$emit("activityListBanner", this.activityList);
            })
            .catch(err => {});
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.banner {
    width: 100%;
    height: 180px;
    padding: 0 10px;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        display: block;
    }
}
</style>
