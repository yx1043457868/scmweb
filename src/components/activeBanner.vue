<template>
    <!-- 轮播图 -->
    <div>
        <div class="customerSection"
            v-if="activityUrl1">
            <!-- v-if="activityList && activityList.length > 0"<mt-swipe :auto="0" :show-indicators="false"
                    class="customerSection-container">
                <mt-swipe-item v-for="(item, index) in activityList"
                            :url="item.bannerPath"
                            :key="index">
                    <a :href="item.bannerPath ? item.bannerPath : 'javascript:;'">
                        <img :src="baseurl +item.bannerUrl"
                            :alt="item.bannerName" />
                    </a>
                </mt-swipe-item>
            </mt-swipe> -->
            <a :href="activityUrl1.bannerPath ? activityUrl1.bannerPath : 'javascript:;'"><img :src="baseurl +activityUrl1.bannerUrl" :alt="activityUrl1.bannerName" /></a>
        </div>
        <div class="integralContent">
        <div class="integralLeft">
            <a :href="activityUrl2.bannerPath ? activityUrl2.bannerPath : 'javascript:;'" v-if="activityUrl2">
                <img :src="baseurl +activityUrl2.bannerUrl" :alt="activityUrl2.bannerName" />
            </a>
            <a :href="hostName+'/integralList'" v-else>
                <img v-lazy="activityLocal2" alt="积分商城"/>
            </a>
        </div>
        <div class="integraRight">
            <div class="presenter">
                <a :href="activityUrl3.bannerPath ? activityUrl3.bannerPath : 'javascript:;'" v-if="activityUrl3">
                    <img :src="baseurl +activityUrl3.bannerUrl"  :alt="activityUrl3.bannerName"/>
                </a>
                <a :href="hostName+'/classify'" v-else>
                    <img v-lazy="activityLocal3" alt="买十送一"/>
                </a>
            </div>
            <div class="preorderList1">
                <a :href="activityUrl4.bannerPath ? activityUrl4.bannerPath : 'javascript:;'" v-if="activityUrl4">
                    <img :src="baseurl +activityUrl4.bannerUrl"  :alt="activityUrl4.bannerName"/>
                </a>
                <a :href="hostName+'/preorderList'" v-else>
                    <img v-lazy="activityLocal4" alt="预购商品"/>
                </a>
            </div>
           
            
        </div>
    </div>
    </div>
</template>

<script>
import Bus from "../utils/bus.js";
export default {
    name: "activeBanner",
    data() {
        return {
            activityList: [],
            activityUrl1:'',
            activityUrl2:'',
            activityUrl3:'',
            activityUrl4:'',
            activityLocal2:require("../../static/images/integral.png"),
            activityLocal3:require("../../static/images/presenter.png"),
            activityLocal4:require("../../static/images/preorderList1.png"),
            hostName:window.location.origin
        };
    },
    mounted() {
        // 用$on事件来接收参数
        Bus.$on("activityListBanner", data => {
            this.activityList = data;
            this.activityList&&this.activityList.map((item)=>{
                if(item.type==1){
                    this.activityUrl1=item
                }
                if(item.type==2){
                    console.log()
                    this.activityUrl2=item
                }
                if(item.type==3){
                    this.activityUrl3=item
                }
                if(item.type==4){
                    this.activityUrl4=item
                }
            })
        });
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.customerSection {
    width: 100%;
    height: 118px;
    padding: 0 10px;
    overflow: hidden;
    // background: #ffffff;
    img {
        width: 100%;
        height: 100%;
    }
}
.integralContent {
        //积分商城
        padding: 10px 10px;
        height: auto;
        display: flex;
        .integralLeft {
            flex: 1;
            height: 165px;
            // background: yellow;
            border-radius: 5px;
            img{
                width:100%;
                height:100%;
                border-radius: 5px;
            }
            
        }
        .integraRight {
            flex: 1;
            padding: 0 0 0 5px;
            .presenter {
                height: 80px;
                // background:red;
                border-radius: 5px;
                margin-bottom: 5px;
                img{
                    width:100%;
                    height:100%;
                    border-radius: 5px;
                }
                
            }
            .preorderList1 {
                height: 80px;
                // background: blue;
                border-radius: 5px;
               img{
                    width:100%;
                    height:100%;
                    border-radius: 5px;
                }
            }
        }
    }
</style>
