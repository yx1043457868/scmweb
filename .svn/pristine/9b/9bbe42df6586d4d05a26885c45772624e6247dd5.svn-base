<template>
	<div class="classify-slider">
		<swiper :options="classOption1" ref="mySwiper" class="classify-container">
            <swiper-slide>
				<router-link :to="{ path: '/couponsCenter' }">
                    <img src="../../static/images/couponscenter1.jpg" alt="优惠券" />
                    <!-- <img src="../../static/images/nine.png" alt="优惠券" /> -->
                    <span>领劵中心</span>
                </router-link>
			</swiper-slide>
            <swiper-slide>
				<router-link :to="{ path: '/userCenter' }">
                    <img src="../../static/images/memberCenter.jpg" alt="" />
                    <!-- <img src="../../static/images/zhou.png" alt="" /> -->
                    <span>会员中心</span>
                </router-link>
			</swiper-slide>
            <swiper-slide>
				<router-link :to="{ path: '/applySimple' }">
                    <img src="../../static/images/apply-simle1.jpg" alt="" />
                    <!-- <img src="../../static/images/nian.png" alt="" /> -->
                    <span>样品申请</span>
                </router-link>
			</swiper-slide>
            <swiper-slide>
				<router-link :to="{ path: '/aboutUs' }">
                    <img src="../../static/images/aboutUs.jpg" alt="" />
                    <!-- <img src="../../static/images/qing.png" alt="" /> -->
                    <span>关于我们</span>
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
	name: 'classSlider1',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
			classOption1: {
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
				observeParents: true, //修改swiper的父元素时，自动初始化swiper
				freeMode: true,
				slidesPerView: 4,
                spaceBetween: 15,
                slidesPerColumn: 1,
                slidesPerColumnFill : 'row',
			},
			companyId: getPcid()
		};
	},
	created() {
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.classify-slider {
		width: 100%;
        // height: 190px;
        color:#000000;
        // margin-bottom:10px;
		.classify-container {
			width:100%;
            padding:10px 10px;
			.swiper-slide {
				display: flex;
				height:80px;
				vertical-align: middle;
				text-align: center;
				flex-direction: column;
				justify-content: center;
                align-items: center;
				img {
					display: block;
					width: 70px;
                    height: 70px;
                    margin: auto;
                    border-radius:50%;
				}
				span {
					color: #333333; 
                    font-size: 0.32rem;
                    width: 100%;
                    overflow: hidden;
                    display: inline-block;
                    height: 21px;
				}
			}
		}
	}
</style>
