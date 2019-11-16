<template>
	<div class="classify-slider">
		<swiper :options="classOption" ref="mySwiper" class="classify-container">
			<swiper-slide v-for="(item, index) in classList" :key="index" :class_id="item.id">
				<router-link v-if="classList.length>0" :to="{ path: '/classify', query: { tab: index } }">
					<!-- <img v-if="index==0" src="../../static/images/baokuan.png" alt="爆款" />
                    <img v-else-if="index==1" src="../../static/images/ten.png" alt="爆款" />
                    <img v-else-if="index==2" src="../../static/images/send.png" alt="爆款" />
                    <img v-else-if="index==3" src="../../static/images/one.png" alt="爆款" /> -->
					<img v-lazy="baseurl + item.icon" :alt="item.name" />
                    <span>{{ item.name }}</span>
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
	name: 'classSlider',
	components: {
		swiper,
		swiperSlide
	},
	data() {
		return {
            classList: [],
			classOption: {
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
		let _content = "{'companyId':'" + this.companyId + "'}";
		this.$post('/appVpProduct/selClass.do', {
			content: _content,
			version: 'kkllo',
			login_token: this.$store.getters['logintoken']
		})
		.then(res => {
            //初始化分类
            JSON.parse(res).optFlag == 'yes' ? (this.classList=JSON.parse(res).res.list): (this.classList = []);
		})
		.catch(err => {});
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
