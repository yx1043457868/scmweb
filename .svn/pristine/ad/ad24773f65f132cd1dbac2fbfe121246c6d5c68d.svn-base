<template>
    <div>
        <Header title="活动详情"></Header>
        <div class="activetop">
            <p>活动标题:{{activedetail.name}}</p>
            <p>活动类型:{{activedetail.typeName}}</p>
            <p>报名时间:{{activedetail.signups_time}}---{{activedetail.signupe_time}}</p>
            <p>活动时间:{{activedetail.start_time}}---{{activedetail.end_time}}</p>
        </div>
        <div class="activecontent">
            <p>活动内容:</p>
            <div v-html="activedetail.content"></div>

        </div>
        <div class="bottom-btn" v-if="activeStyle==0">
            <button type="button" class="def-btn" @click="addactive">报名参加</button>
        </div>
        <div class="bottom-btn" v-if="activeStyle==1">
            <button type="button" class="def-btn" disabled>已报名</button>
        </div>
        <div class="bottom-btn" v-if="activeStyle==3">
            <button type="button" class="def-btn" disabled>报名已结束</button>
        </div>
        <div class="bottom-btn" v-if="activeStyle==2">
            <button type="button" class="def-btn" disabled>未开始报名</button>
        </div>
        <div class="mask" v-show="!isShow"></div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import { isPoneAvailable, changDate } from "../../utils/index.js";
export default {
    name: "activitydetail",
    components: {
        Header
    },
    data() {
        return {
            activeStyle: 0,
            activedetail: {},
            isShow:true
        };
    },
    computed: {},
    created() {
        this.activeDetail();
    },
    methods: {
        activeDetail() {
            let activityId = this.$route.query.id ? this.$route.query.id : {};
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            var _content =
                "{'activityId':'" +
                activityId +
                "','shopId':'" +
                accountObj.shopId +
                "'}";
            this.$post("/activity/activityView.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                // console.log(response)
                if (response.optFlag == "yes") {
                    this.activedetail = response.res[0];
                    var curTime = new Date();
                    // var startTime = changDate(this.activedetail.start_time);
                    // var endTime = changDate(this.activedetail.end_time);
                    var startTime = changDate(this.activedetail.signups_time);
                    var endTime = changDate(this.activedetail.signupe_time);
                    if (this.activedetail && this.activedetail.signflag) {
                        return (this.activeStyle = 1);
                    }
                    if (startTime > curTime) {
                        return (this.activeStyle = 2);
                    }
                    if (curTime > endTime) {
                        return (this.activeStyle = 3);
                    }
                } else {
                    Toast("数据查询失败");
                }
            });
        },
        addactive() {
            // activityId   shopId account
            this.isShow=false;
            let activityId = this.$route.query.id ? this.$route.query.id : {};
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            var _content =
                "{'activityId':'" +
                activityId +
                "','shopId':'" +
                accountObj.shopId +
                "','account':'" +
                accountObj.account +
                "'}";
            var that = this;
            this.$post("/activity/signUpactivity.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                var response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    Toast({ message: "报名成功", duration: 1800 });
                    let timeAc = setInterval(() => {
                        that.$router.push({ path: "/myactivity" });
                        clearInterval(timeAc);
                    }, 2000);
                } else {
                    Toast("报名失败，重新试试");
                    this.isShow=true
                }
            });
        }
    }
};
</script>
<style scoped lang="less">
.activetop {
    margin: 50px 10px 10px;
    background: #fff;
    padding: 10px 10px;
    p {
        font-size: 14px;
        height: 24px;
        line-height: 24px;
        color: #333;
    }
}
.activecontent {
    margin: 10px;
    background: #fff;
    padding: 10px 10px;
    overflow-x: hidden;
}
.activecontent img {
    max-width: 100%;
    height: 100%;
    display: block;
}
.mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
}    
</style>




