<template>
	<div class="seckill-slider">
        <div class="seckill-title">
            <div class="seckill-top"><span>超级</span><img src="../../static/images/seckill.png" alt="" /></div>
            <div class="time-box">
                <span class="span-left"> 距结束还剩 </span><span class="span-right"> 00:00:00 </span>
            </div>
        </div>
		<swiper :options="seckillOption" ref="mySwiper" class="seckill-container">
			<swiper-slide v-for="(item, index) in seckillList" :key="index" :class_id="item.id">
				<router-link :to="{ path: '/classify', query: { tab: item.id } }">
					<!-- <img v-lazy="baseurl + item.icon" :alt="item.name" /> -->
                    <img src="../../static/images/home-seckillshop.png" :alt="item.name" />
					<p>余姚鸿基进口青豆</p>
                    <p><span style="color:#ef3c06">￥233</span>/件</p>
				</router-link>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { getPcid } from '../utils/index.js';
export default {
	name: 'seckillSlider',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			seckillList: [],
			seckillOption: {
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
				freeMode: true,
				slidesPerView: 4,
                spaceBetween: 15,
                slidesPerColumn: 1,
			},
			companyId: getPcid()
		};
	},
	created() {
		let _content = "{'companyId':'" + this.companyId + "'}";
		this.$post('/appVpProduct/selClass.do', {
			content: _content,
			version: 'kkllo',
			login_token: this.$store.getters['logintoken']
		})
		.then(res => {
            //初始化分类
            JSON.parse(res).optFlag == 'yes' ? (this.seckillList=JSON.parse(res).res.list): (this.seckillList = []);
		})
		.catch(err => {});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.seckill-slider {
		width: 100%;
        // height: 190px;
        color:#000000;
        margin-bottom:10px;
        font-size: 15px;
        .seckill-title{
            position:relative;
            width: 100%;
            height: 30px;
            line-height:30px;
            font-family: PingFang-SC-Bold;
            font-weight: normal;
            font-stretch: normal;
            padding:0 10px;
            background: linear-gradient(90deg, 
                #ffead9 0%,
                #ffffff 70%) ;
            .seckill-top{
                img{
                    width:26px;
                    height:16px;
                }
            }
            .time-box{
                position:absolute;
                right:10px;
                top:0;
                .span-left{
                    border-radius:5px 0 0 5px;
                    background:#eb6000;
                    border:#eb6000 solid 1px;
                    color:#ffffff;
                    font-size:11px;
                }
                .span-right{
                    border-radius:0 5px 5px 0;
                    border:#eb6000 solid 1px;
                    color:#eb6000;
                    font-size:11px;
                }
            }
        }
		.seckill-container {
			width:100%;
			height:150px;
            background: #fff;
            padding:0 10px;
			.swiper-slide {
				display: flex;
				height:100%;
				vertical-align: middle;
				text-align: center;
				flex-direction: column;
				justify-content: center;
                align-items: center;
				img {
					display: block;
					padding:5px 8px;
					width: 85px;
					height: 85px;
                    border:1px solid #dddddd;
                    border-radius:3px;
				}
				p {
					width: 85px;
                    height: 18px;
                    line-height:18px;
                    font-family: PingFang-SC-Medium;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #000000;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    text-align:left;
                    font-size:10px;
				}
			}
		}
	}
</style>
