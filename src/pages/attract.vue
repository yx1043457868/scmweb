<template>
	<div class="attract">
        <div class="attractTop">
            <img v-lazy="attractTop" />
            <ul class="attract-nav" :class="isFixed ? 'fixedBar' : ''">
                <!-- <li @click="changecompany"><a href="#company" :class="name=='company'?'changeA':''">公<span>司简</span>介</a></li>
                <li @click="changepolicy"><a href="#policy" :class="name=='policy'?'changeA':''">招<span>商政</span>策</a></li>
                <li @click="changepartner"><a href="#partner" :class="name=='partner'?'changeA':''">招<span>商对</span>象</a></li>
                <li @click="changehotLine"><a href="#hotLine" :class="name=='hotLine'?'changeA':''">招<span>商热</span>线</a></li>
                <li @click="changeproduct"><a href="#product" :class="name=='product'?'changeA':''">重<span>点产</span>品</a></li>
                <li @click="changestrategy"><a href="#strategy" :class="name=='strategy'?'changeA':''">战<span>略合作品</span>牌</a></li>  -->
                <li><a href="#company" :class="name=='company'?'changeA':''">公<span>司简</span>介</a></li>
                <li><a href="#policy" :class="name=='policy'?'changeA':''">招<span>商政</span>策</a></li>
                <li><a href="#partner" :class="name=='partner'?'changeA':''">加<span>盟要</span>求</a></li>
                <li><a href="#hotLine" :class="name=='hotLine'?'changeA':''">招<span>商热</span>线</a></li>
                <li><a href="#product" :class="name=='product'?'changeA':''">重<span>点产</span>品</a></li>
                <li><a href="#strategy" :class="name=='strategy'?'changeA':''">战<span>略合作品</span>牌</a></li>   
            </ul>
        </div>
        <div id="company" ref="company">
            <div class="nav-title-chn">良之隆简介</div>
            <div class="nav-title-en">INTRODUCTION</div>
            <div class="company">
                <img  v-lazy="attractCompany" /> 
                <div class="company-content">
                    <h3>19年来一直专注于冷冻餐饮食材</h3>
                    <div class="company-content-span"><span>一站式服务</span><span>优质食材</span></div>
                    <p>武汉良之隆食材股份有限公司（证券代码：870067） ，成立19年来一直专注于冷冻餐饮食材的设计、研发与推广，本着“好食材从田间到餐桌一站式服务”的理念，为全国餐饮酒店提供“安全、品质、时尚”的优质食材与服务。 </p>
                    <p>以旗下众多厨师会员为基础和依托，良之隆组建专业的食材压法团队，以中餐美食标准化、间烹化和传承为己任，每年定制研发退出108款经典、时尚、旺销的预制菜，真正做到“新食材，天天见”</p>
                </div>
            </div>
        </div>
        <div class="attract-banner"><img v-lazy="attractBanner" /></div>
        <div  id="policy" ref="policy">
            <div class="nav-title-chn">招商政策</div>
            <div class="nav-title-en"> PROJECT FOR INVESTMENT</div>
            
            <div class="policy">
                <div>请放心选择我们</div>
                <div style="font-size:0.3em"><span style="border-top:1px solid #eb6000">PLEASE SELECT US</span></div>
                <div class="policy-content">
                    <div class="policy-content-img">
                        <img v-lazy="attractPolicy1" />
                        <img v-lazy="attractPolicy2" />
                    </div>
                    <ul>
                        <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>品牌共享</h3>
                                <div class="policy-content-title-en">BRAND SHARING</div>
                                <P>授“良之隆联盟商”匾牌</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>市场保护</h3>
                                <div class="policy-content-title-en">MARKET PROTECTION</div>
                                <P>每个县市仅限一到两家联盟商</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>营销支持</h3>
                                <div class="policy-content-title-en">Brand Sharing</div>
                                <P>数百万营销预算帮助联盟商进行新品送样、品鉴</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>高额返利</h3>
                                <div class="policy-content-title-en">BRAND SHARING</div>
                                <P>最高可享5%达量 政策</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>安全保障</h3>
                                <div class="policy-content-title-en">BRAND SHARING</div>
                                <P>提供产品检验报告和增值税发票</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>管理培训</h3>
                                <div class="policy-content-title-en">BRAND SHARING</div>
                                <P>专业讲师传授良之隆20年管理检验</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR"/>
                            <div class="policy-content-title">
                                <h3>贴心服务</h3>
                                <div class="policy-content-title-en">BRAND SHARING</div>
                                <P>每个区域设一名专员驻地服务，协助提升销售</P>
                            </div>
                        </li>
                         <li>
                            <img v-lazy="attractR.png"/>
                            <div class="policy-content-title">
                                <h3>信息化赋能</h3>
                                <div class="policy-content-title-en">BRAND SHARING</div>
                                <P>免费帮助搭建电商网站，免费提供信息化管理平台</P>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="partner" id="partner" ref="partner">
            <div class="nav-title-chn" style="color:#ffffff;">加盟要求</div>
            <div class="nav-title-en">FOUR MAJOR FRANGHISEES</div>
            <div style="width:20px;height:3px;border:2px solid #ffffff;margin:auto;"></div>
            <ul>
                <li>
                    <img v-lazy="attractPartner1">
                    <p>各区域冻品、调料经商或5年以上厨师行业从业者</p>
                </li>
                <li>
                    <img v-lazy="attractPartner2">
                    <p>自有营业场所及冷库</p>
                </li>
                <li>
                    <img v-lazy="attractPartner3">
                    <p>提供营业执照复印件、税务登记复印件、法人代表人身份证复印件</p>
                </li>
                <li>
                    <img v-lazy="attractPartner4">
                    <p>签约后缴纳1万元保证金</p>
                    <p>（停止合作后退还）</p>
                </li>
            </ul>
        </div>                            
        <div id="hotLine" ref="hotLine">
            <div class="nav-title-chn">招商热线</div>
            <div class="nav-title-en">HOT LINE</div>
            <div class="hotLine">
                <div class="hotLine-phone">
                    <!-- <img v-lazy="attractHotLinePhone" > -->
                    <div class="hotLine-img">
                        <a href="tel:13377875077">
                            <div class="hotLine-h3"><span>夏先生</span><span style="font-weight:600;">13377875077</span></div>
                        </a>
                        <a href="tel:13886141666">
                            <div class="hotLine-h3"><span>朱先生</span><span style="font-weight:600;">13886141666</span></div>
                        </a>
                        <a href="tel:400-168-7117">
                            <div class="hotLine-h3"><span style="color:#eb6000;font-size:24px;font-weight:600;">400-168-7117</span></div>
                        </a>
                        <a href="www.lzl98.com" class="hotLine-h3">www.lzl98.com</a>
                    </div>
                    <p>欢迎来电洽谈</p>
                </div>
                <img v-lazy="attrattractHotLinePerson">
            </div>
        </div>
        <div class="product" id="product" ref="product">
            <div class="nav-title-chn">重点产品</div>
            <div class="nav-title-en">IMPORTANT</div>
            <ul>
                <li v-for="(item,index) in productList" :key="index">
                    <img v-lazy="item.url" >
                    <p>{{item.name}}</p>
                </li>
            </ul>
        </div>
        <div  id="strategy" ref="strategy">
            <div class="nav-title-chn">战略合作品牌</div>
            <div class="nav-title-en">STRATEGIC COOPERATION</div>
            <div class="strategy">
                <img v-lazy="attractStrategy" class="strategy-img1">
                <img v-lazy="attractStrategy" class="strategy-img2">
            </div>
        </div> 
        <router-link :to="{path:'/attractAdd'}" class="bottom-btn" tag="div">
            <button type="button" class="def-btn">立即报名</button>
        </router-link>
    </div>
</template>
<script>
import Tabbar from '@/components/Tabbar';
import { MessageBox, Toast } from 'mint-ui';
import { getPcid, m_div, m_sub, getUrlParam, isWeixinBrowser } from '../utils/index.js';
import wxapi from '../utils/wxapi.js';
// 引入vuex快捷写法
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
	name: 'Attract',
	components: {
	},
	data() {
		return {
            attractTop : require('../../static/images/attract-top.png'),
            attractCompany : require('../../static/images/attract-company.png'),
            attractStrategy: require('../../static/images/attract-strategy.png'),
            attrattractHotLinePerson: require('../../static/images/attract-hotLine-person.png'),
            attractPartner4: require('../../static/images/attract-partner4.png'),
            attractPartner3: require('../../static/images/attract-partner3.png'),
            attractPartner2: require('../../static/images/attract-partner2.png'),
            attractPartner1: require('../../static/images/attract-partner1.png'),
            attractR: require('../../static/images/attract-R.png'),
            attractPolicy1: require('../../static/images/attract-policy1.png'),
            attractPolicy2: require('../../static/images/attract-policy2.png'),
            attractBanner: require('../../static/images/attract-banner.png'),
            productList:[{
                url:require("../../static/images/attract-product1.png"),
                name:"小龙鱼泰香虾"
            },{
                url:require("../../static/images/attract-product2.png"),
                name:"巴沙鱼系列"
            },{
                url:require("../../static/images/attract-product3.png"),
                name:"国联水煮汉虾"
            },{
                url:require("../../static/images/attract-product4.png"),
                name:"半壳虾夷扇贝"
            },{
                url:require("../../static/images/attract-product5.png"),
                name:"厄瓜多尔白虾"
            },{
                url:require("../../static/images/attract-product6.png"),
                name:"温氏清远鸡"
            },{
                url:require("../../static/images/attract-product7.png"),
                name:"小龙鱼青虾仁"
            },{
                url:require("../../static/images/attract-product8.png"),
                name:"口口可臭鳜鱼"
            },{
                url:require("../../static/images/attract-product9.png"),               
                name:"口口可楚香藕条"
            },{
                url:require("../../static/images/attract-product10.png"),
                name:"好帮手Z型北京鸭鸭胚系列"
            },{
                url:require("../../static/images/attract-product11.png"),
                name:"獐子岛量贩蒜蓉粉丝扇贝"
            },{
                url:require("../../static/images/attract-product12.png"),
                name:"安德冻煮真空杂色蛤"
            },],
            name:"company",
            isFixed:false,
		};
	},
	mounted() {
        //设置bar浮动阈值为 #fixedBar 至页面顶部的距离
		// this.offsetTop = document.querySelector('#tab').offsetTop; //变量windowHeight是可视区的高度
		// this.viewBox = this.$refs.viewBox;
        // this.viewBox.addEventListener('scroll', this.handleScroll);
        window.addEventListener("scroll",this.handleScroll)
	},
	// destroyed() {
	// 	//离开该页面需要移除这个监听的事件
	// 	this.viewBox.removeEventListener('scroll', this.handleScroll);
	// },
	methods: {
        handleScroll() {
			if (window.pageYOffset<154) {
                this.isFixed = false;
                this.name='company'
            }else if(window.pageYOffset<this.$refs.company.offsetTop+10){
                this.name='company'
                this.isFixed = true;
            }else if(window.pageYOffset<this.$refs.policy.offsetTop+10){
                this.name='policy'
                this.isFixed = true;
            }else if(window.pageYOffset<this.$refs.partner.offsetTop+10){
                this.name='partner'
                this.isFixed = true;
            }else if(window.pageYOffset<this.$refs.hotLine.offsetTop+10){
                this.name='hotLine'
                this.isFixed = true;
            }else if(window.pageYOffset<this.$refs.product.offsetTop+10){
                this.name='product'
                this.isFixed = true;
            }else if(window.pageYOffset<this.$refs.strategy.offsetTop+10){
                this.name='strategy'
                this.isFixed = true;
            }else{
                this.isFixed = true;
            }
            // console.log(this.name,window.pageYOffset)
        },
        changepolicy(){
            this.name='policy'
        },
        changecompany(){
            this.name='company'
        },
        changepartner(){
            this.name='partner'
        },
        changehotLine(){
            this.name='hotLine'
        },
        changeproduct(){
            this.name='product'
        },
        changestrategy(){
            this.name='strategy'
        },
        confirmBtn(){

        }
    }
};
</script>
<style scoped lang="less">
.attract{
    background:#ffffff;
    font-family: PingFang-SC-Medium;
    font-size: 12px;
    color:#171717;
    text-align:left;
    line-height:12px;
    
    .attractTop{
        position:relative;
        img{
            width:100%;
            height:184px;
        }
        .attract-nav{
            width:100%;
            overflow-x:auto;
            height:30px;
            line-height:30px;
            position:absolute;
            left:0;
            bottom:0;
            background:rgba(0,0,0,0.6);
            white-space: nowrap;
            li{
                display:inline-block;
                padding:0 15px;
                a{
                    color:#d2d1d1;
                    
                }
                .changeA{
                    font-size:16px;
                    color:#ffffff;
                    span{
                        border-bottom:3px solid #eb6000;
                    }
                }
                
            }
            
            // li:first-child>a{
            //     font-size:16px;
            //     color:#ffffff;
            //     span{
            //         border-bottom:3px solid #eb6000;
            //     }
            // }
            // li:hover>a{
            //     font-size:16px;
            //     color:#ffffff;   
            // }
        }
        .fixedBar {
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 99;
        }
    }
    .nav-title-chn{
        padding-top:25px;
        width:100%;
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        line-height: 12px;
        color: #171717;
        text-align:center;
    }
    .nav-title-en{
        width: 100%;
        font-family: PingFang-SC-Regular;
        font-size: 0.44em;
        font-weight: normal;
        font-stretch: normal;
        line-height: 24px;
        letter-spacing: 2px;
        color: #999999;
        text-align:center;
    }
    .company{
        margin:8px 15px;
        display:flex;
        img{
            width:124px;
            height:118px;
            box-shadow:3px 0 3px rgba(0, 0, 0, 0.1);
        }
        .company-content{
            flex:1;
            padding-left:8px;
            h3{
                height: 12px;
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 12px;
                letter-spacing: 0px;
                color: #171717;
            }
            .company-content-span{
                span{
                    border-radius:10px;
                    background:#eb6000;
                    color:#ffffff;
                    font-size:0.3em;
                }
            }
            p{
                font-family: PingFang-SC-Medium;
                font-size: 0.7em;
                line-height: 12px;
                color: #757575;
                text-indent:2em;
            }
        }

    }
    .attract-banner{
        padding:22px 0 11px 0;
        img{
            width: 100%;
            height: 95px;
            background-color: #d6d6d6;
        }
        
    }
    .policy{
        margin:8px 15px;
        .policy-content{
            display:flex;
            .policy-content-img{
                width:93px;
                img{
                    width:86px;
                    height:120px;
                    box-shadow:6px 1px 3px rgba(0, 0, 0, 0.1);
                    margin-top:10px;
                }
            }
            ul{
                flex:1;
                li{
                    display:flex;
                    padding-left:6px;
                    width:120px;
                    float:left;
                    height:56px;
                    margin-top:11px;
                    img{
                        width:13px;
                        height:13px; 
                    }
                    .policy-content-title{
                        padding-left:6px;
                        .policy-content-title-en{
                            font-size:0.25em;
                            color:#eb6000;
                        }
                        p{  
                            font-size:0.8em;
                            color:#757575
                        }
                    }
                }
            }


        }
    }
    .partner{
        width:100%;
        height:224px;
        background:url(../../static/images/attract-partner.png) no-repeat center center;
        background-size:100%;
        // margin-top:5px;
        ul{
            padding:0 7px 0 32px;
            li{
                float:left;
                width: 143px;
                height: 60px;
                background-color: #1b1b1b;
                opacity: 0.6;
                margin:10px 25px 0 0;
                text-align:center;
                padding:7px 7px 0;
                img{
                    width: 16px;
                    height: 13px;
                    // background-color: #ffffff;
                    margin-bottom:9px;
                }
                p{
                    font-size:0.8em;
                    color:#ffffff;
                }
            }
        }
    }
    .hotLine{
        display:flex;
        padding:0 36px 24px 43px; 
        img{
            width:72px;
            height:131px;
        }
        .hotLine-phone{
            flex:1;
            text-align:center;
           
            .hotLine-img{
                width:220px;
                height:110px;
                margin:5px 0;
                background:url(../../static/images/attract-hotLine-phone1.png) no-repeat center center;
                background-size:100%;
                padding-top:10px;
                .hotLine-h3{
                    height:22px;
                    line-height:22px;
                    text-align:center;
                    font-size:14px;
                    color:#666666;
                }
            }
            p{
                font-family: PingFang-SC-Medium;
                font-size: 12px;
                color: #454545;
                
            }
        }
    }
    .product{
        background:#f0f0f0;
        ul{
            padding-left:15px;
            li{
                margin:0 15px 10px 0;
                width:75px;
                display:inline-block;
                img{
                    width:100%;
                    height:75px;
                }
                p{
                   width:100%;
                   font-size: 12px;
                    color: #333333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height:24px;

                }
            }
        }
    }
    .strategy{
        width:100%;
        height:140px;
        overflow:hidden;
        position:relative;
        margin-bottom:50px;
        .strategy-img1{
            width:523px;
            height:110px;
            position:absolute;
            left:0;
            top:0;
            animation:mymove1 10s linear 0s infinite;
        }
        .strategy-img2{
            width:523px;
            height:110px;
            position:absolute;
            left:0;
            top:0;
            animation:mymove2 10s linear 0s infinite;
        }

    }
}
@keyframes mymove1
{
	from {left:0px;}
    to {left:-523px;}
}
@-webkit-keyframes mymove1 /*Safari and Chrome*/
{
	from {left:0px;}
    to {left:-523px;}
}
@keyframes mymove2
{
	from {left:523px;}
    to {left:0px;}
}
@-webkit-keyframes mymove2 /*Safari and Chrome*/
{
	from {left:523px;}
    to {left:0px;}
}
</style>
