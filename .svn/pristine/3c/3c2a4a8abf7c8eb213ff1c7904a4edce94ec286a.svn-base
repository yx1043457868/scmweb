<template>
	<div class="active clearfix" v-if="activitybanner && activitybanner.length > 0">
		<div class="activetop">
			<i class="iconfont zticon">&#xe693;</i>
			<span>主题活动</span>
		</div>
		<swiper :options="swiperActive" ref="activeSwiper" class="active-container swiper-container">
			<swiper-slide v-for="(item, index) in activitybanner" :key="index">
				<router-link :to="{ path: '/activitydetail', query: { id: item.id } }" class="active-item">
					<img :src="baseurl + item.img_path" />
				</router-link>
			</swiper-slide>
		</swiper>
		<router-link class="active-btn" :to="{ path: '/activitylist' }" v-if="activitybanner.length >= 2" tag="div">
			查看更多主题活动
			<i class="iconfont activeBtn">&#xe601;</i>
		</router-link>
	</div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { getPcid } from '../utils/index.js';
export default {
	name: 'activeSlider',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			activitybanner:[],
			swiperActive: {
				direction: 'horizontal',
				notNextTick: true,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
				freeMode: true,
				slidesPerView: 2,
				spaceBetween: 15
			},
			companyId: getPcid()
		};
	},
	created() {
		let shopId = this.$store.getters['account'].shopId ? this.$store.getters['account'].shopId : '';
		let _suggestcontent = "{'companyId':'" + this.companyId + "','shopId':'" + shopId + "'}";
		this.$post('/activity/customerActivityList.do', {
			content: _suggestcontent,
			version: 'kkllo',
			login_token: this.$store.getters['logintoken']
		})
			.then(res => {
				//初始化活动主题
				if(JSON.parse(res).optFlag == 'yes'){
					var activityList = JSON.parse(res).res;
					if(activityList.length > 0){
						this.activitybanner = activityList.slice(0, 6);
					}
				}else{
					this.activitybanner = [];
				} 
			})
			.catch(err => {});
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.active {
	width: 100%;
	// height: 180px;
	padding: 10px 0;
	background: #ffffff;
	margin: 10px 0;
	position: relative;

	.activetop {
		position: absolute;
		top: 15px;
		left: 20px;
		z-index: 2;
		.zticon {
			font-size: 12px;
			width: 18px;
			height: 18px;
			line-height: 18px;
			text-align: center;
			color: #ffffff;
			background: #eb6000;
			border-radius: 50%;
			display: inline-block;
			vertical-align: middle;
			margin-right: 4px;
		}
		span {
			font-size: 18px;
			color: #eb6000;
			vertical-align: top;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0px;
			font-family: PingFang-SC-Bold;
			color: #ffffff;
			text-shadow: 0px 1px 1px rgba(18, 7, 10, 0.75);
		}
	}
	.active-container {
		width: 100%;
		height: 100%;
		padding: 0 10px;
		.swiper-wrapper {
			width: 100%;
			.swiper-slide {
				text-align: center;
				font-size: 18px;
				width: 90%;
				// max-width: 120px;
				height: 90px;
				display: flex;
				justify-content: center;
				align-items: center;
				.active-item {
					display: block;
					width: 100%;
					height: 100%;
					font-size: 14px;
					img {
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 3px;
						border: 1px solid #eeeeee;
					}
				}
			}
		}
	}
	.active-btn {
		text-align: center;
		line-height: 30px;
		color: #333333;
		font-size: 12px;
		.activeBtn {
			font-size: 12px;
			color: #333333;
		}
	}
}
</style>
