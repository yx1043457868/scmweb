<template>
    <div>
        <Header title="活动列表"></Header>
        <div style="height:50px"></div>
        <div v-if="activing&&activing.length>0" class="active-list" id="changflag1">
           <a href="#changflag1"><div class="activeTab" ref="activeTab1" :class="flag1?'fixed1':''"><i></i><span>正在进行</span></div></a>
           <div v-if="flag1" style="height:38px"></div>
           <ul>
                <li class="" v-for="(item,index) in activing" :key="index">
                    <router-link :to="{path:'/activitydetail',query:{id:item.id}}">
                        <div class="list-img">
                            <img v-lazy="baseurl+item.img_path" alt="正在进行" />
                            <!-- <img src="../../../static/images/reg-bg.png" /> -->
                        </div>
                        <div class="activecontent clearfix ">
                            <p class="list-content">{{item.name}}</p>
                            <p class="list-time">{{item.start_time}}——{{item.end_time}}</p>
                            <div class="apply" v-if="item.signflag" style="background:#888">已报名</div>
                            <div class="apply" v-else-if="changDate1(item.signups_time)" style="background:#888">未开始报名</div>
                            <div class="apply" v-else @click.stop.prevent="addactive(item.id)">立即报名</div>
                        </div>
                    </router-link>
                </li>
            </ul> 
        </div>
        <div id="changflag2" v-if="activiteStart&&activiteStart.length>0" class="active-list">
           <a href="#changflag2"><div class="activeTab2" ref="activeTab2" :class="flag2?(flag1?'fixed2':'fixed1'):''"><i></i><span>即将开始</span></div></a>
           <div v-if="flag2" style="height:38px"></div>
           <ul>
                <li class="" v-for="(item,index) in activiteStart"  :key="index">
                    <router-link  :to="{path:'/activitydetail',query:{id:item.id}}">
                        <div class="list-img">
                            <img v-lazy="baseurl+item.img_path" alt="正在进行" />
                            <!-- <img src="../../../static/images/reg-bg.png" /> -->
                        </div>
                        <div class="activecontent clearfix ">
                            <p class="list-content">{{item.name}}</p>
                            <p class="list-time">{{item.start_time}}——{{item.end_time}}</p>
                            
                            <div class="apply" v-if="item.signflag" style="background:#888">已报名</div>
                            <div class="apply" v-else-if="changDate1(item.signups_time)" style="background:#888">未开始报名</div>
                            <div class="apply" v-else @click.stop.prevent="addactive(item.id)">立即报名</div>
                        </div>
                    </router-link>
                </li>
            </ul> 
        </div>
        <div id="changflag3" v-if="activitend&&activitend.length>0" class="active-list">
            <a href="#changflag3"><div class="activeTab3" ref="activeTab3" :class="flag3?(flag2&&flag1?'fixed3':(flag2||flag1?'fixed2':'fixed1')):''"><i></i><span>往期回顾</span></div></a>
            <div v-if="flag3" style="height:38px"></div>
            <ul>
                <li class="" v-for="(item,index) in activitend"  :key="index">
                    <router-link :to="{path:'/activitydetail',query:{id:item.id}}">
                        <div class="list-img">
                            <img v-lazy="baseurl+item.img_path" alt="特价专区" />
                            <!-- <img src="../../../static/images/reg-bg.png" /> -->
                            <div class="activeend">已结束</div>
                        </div>
                        <div class="activecontent">
                            <p class="list-content">{{item.name}}</p>
                            <p class="list-time">{{item.start_time}}——{{item.end_time}}</p>
                        </div>
                    </router-link>
                </li>
            </ul> 
        </div>
        <div class="mask" v-show="!isShow"></div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import Header from "@/components/Header";
import { CompareDate,changDate } from "../../utils/index.js";

export default {
    name: "activitylist",
    components: {
        Header
    },
    data() {
        return {
            activiteStart:[],
            activing:[],
            activitend:[],
            flag1:false,
            flag2:false,
            flag3:false,
            isShow:true    
        };
    },  
    created() {
        this.activeList(),
        this.changDate1(),
        this.init()
    },
    methods: {
        activeList(){
            let accountObj = this.$store.getters["account"]? this.$store.getters["account"]: {};
            var _content="{'companyId':'" +accountObj.companyId +"','shopId':'" + accountObj.shopId+"'}";
            this.$post("/activity/customerActivityList.do",{
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res=>{
                var response = JSON.parse(res);
                if (response.optFlag== "yes") {
                    let activelist=response.res;
                    activelist&&activelist.map((item,index)=>{
                        var curTime = new Date();
                        var startTime = changDate(item.start_time);
                        if(startTime>curTime){
                            return this.activiteStart.push(item)
                        }
                    })
                    activelist&&activelist.map((item,index)=>{
                        var curTime = new Date();
                        var startTime = changDate(item.start_time);
                        var endTime = changDate(item.end_time);
                        if(startTime<curTime&&curTime<endTime){
                            return this.activing.push(item)
                        }
                    })
                    activelist&&activelist.map((item,index)=>{
                        var curTime = new Date();
                        var endTime = changDate(item.end_time);
                        if(curTime>endTime){
                            return this.activitend.push(item)
                        }
                    })
                } else {
                    Toast("数据查询失败");
                }
            })
        },
        addactive(id){
            // activityId   shopId account
            this.isShow=false;
            let accountObj = this.$store.getters["account"]? this.$store.getters["account"]: {};
            var _content="{'activityId':'" +id+"','shopId':'" + accountObj.shopId+"','account':'" + accountObj.account+"'}";
            var that=this;
            this.$post("/activity/signUpactivity.do",{
                content: _content,
                version: "kkllo",
                 login_token: this.$store.getters["logintoken"]
            }).then(res=>{
                var response = JSON.parse(res);
                if (response.optFlag== "yes") {
                    Toast({message: "报名成功",duration: 1800});
                let timeAc=setInterval(() => {
                    that.$router.push({ path: "/myactivity" })
                    clearInterval(timeAc)
                    }, 2000);
                } else {
                    Toast("报名失败，重新试试");
                    this.isShow=true
                }
            })
        },
        changDate1(begintime) {
            var curTime = new Date();
            begintime = begintime&&begintime.replace(new RegExp(/-/gm), "/");
            var startTime = new Date(Date.parse(begintime));
            return startTime>curTime
        },
        init(){
            window.addEventListener("scroll",this.scrollFun)
        },
        scrollFun(){
            if(this.$refs.activeTab1){
                let activeTabtop1 = this.$refs.activeTab1.parentNode.offsetTop
                if(window.pageYOffset>=activeTabtop1-42){
                    this.flag1=true;
                }else{
                    this.flag1=false;
                }
            }
            if(this.$refs.activeTab2){
                let activeTabtop2 = this.$refs.activeTab2.parentNode.offsetTop
                if(window.pageYOffset>=activeTabtop2-71){
                    this.flag2=true;
                }else{
                    this.flag2=false;
                }
            }
            if(this.$refs.activeTab3){
                let activeTabtop3 = this.$refs.activeTab3.parentNode.offsetTop
                if(window.pageYOffset>=activeTabtop3-120){
                    this.flag3=true;
                }else{
                    this.flag3=false;
                }
            }
        }, 
    },
    destroyed(){
        window.removeEventListener("scroll",this.scrollFun)
    },
};
</script>
<style scoped lang="less">
    .active-list{
        width:100%;
        // position:relative;
        
        // margin-top:44px;
        .fixed1{
            position:fixed;
            left:0;
            top:44px;
        }
        .fixed2{
            position:fixed;
            left:0;
            top:82px;
        }
        .fixed3{
            position:fixed;
            left:0;
            top:120px;
        }
        .activeTab,.activeTab3,.activeTab2{
            // position:absolute;
            // top:0;
            // left:0;
            height:38px;
            width:100%;
            line-height:38px;
            padding-left:10px;
            font-size:18px;
            color:#333;
            text-align:center;
            font-weight:normal;
            background:#ffffff;
            z-index:10;
        }
        ul{
            width:345px;
            margin:15px;
            li{
                background:#ffffff;
                margin:18px 0;
                .list-img{
                    width: 100%;
                    height: 110px;
                    position:relative;
                    img{
                        width: 100%;
                        height: 110px;
                        background-color: #090813;
                        border-radius: 3px 3px 0px 0p
                    }
                    .activeend{
                        width:100px;
                        height:100px;
                        line-height:100px;
                        text-align:center;
                        background:rgba(0,0,0,0.5);
                        border-radius:50%;
                        font-size:16px;
                        color:#fff;
                        position:absolute;
                        left:0;
                        right:0;
                        bottom:0;
                        top:0;
                        margin:auto;
                    }
                }
            }
            .list-time{
                font-size:12px;
                color:#666;
                padding:0 0 8px 10px;
            }
            .activecontent{
                position:relative;
                .list-content{
                    font-size:16px;
                    color:#333;
                    padding:8px 0 0 10px;
                    width:210px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .apply{
                    width: 78px;
                    height: 33px;
                    background-color: #eb6000;
                    border-radius: 3px;
                    line-height:33px;
                    font-size:14px;
                    color:#fff;
                    text-align:center;
                    // float:right;
                    position:absolute;
                    right:10px;
                    bottom:10px;
                }
            }
        }
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