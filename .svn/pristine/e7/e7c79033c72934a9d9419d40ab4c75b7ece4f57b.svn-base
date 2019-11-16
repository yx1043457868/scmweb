<template>
	<div class="hot-list">
		<ul class="productList clearfix">
			<li v-for="(item, index) in dataList" :key="index">
				<router-link :to="{ path: '/detail', query: { id: item.id } }">
					<div class="list-img">
						<img v-lazy="baseurl + item.img_path+'?time='+timeNum" alt="推荐购买" />
						<!-- <div class="gift-img" v-if="item.full_gift"><span>赠</span><img :src="baseurl + item.img_path" alt=""></div> -->
					</div>
					<div class="goods-info">
						<h4 class="list-name mui-ellipsis">{{ item.spu_name ? item.spu_name : item.sku_name }}</h4>
						<p class="list-size mui-ellipsis">规格：{{ item.styleno }}</p>
						<span class="tag" v-if="item.full_gift && JSON.parse(item.full_gift).requireType != 2">满赠</span>
                        <span class="tag" v-else-if="item.full_gift && JSON.parse(item.full_gift).requireType == 2">满减</span>
						<span class="tag_empty" v-else></span>
						<em class="list-price" v-if="registerFlag">
                            <span v-if="shopType!=4" style="font-size:12px">会员价:</span><span>￥</span><span v-if="item.is_default_spu==1&&item.spu_min_unit_price">{{item.spu_min_unit_price}}</span><span v-else>{{ item.unit_price }}</span><span class="unit">/{{ item.unit }}</span>
                            <span v-if="item.is_default_spu==1&&item.spu_min_unit_price" style="font-size:10px;">起</span>
						</em>
						<em class="list-price hide-price" v-else>价格：登录后可见</em>
						<div class="cartcontrol-wrapper"><cartcontrol :food="item" @addCart="addFood"></cartcontrol></div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import cartcontrol from '@/components/cartcontrol';
import { getPcid } from '../utils/index.js';
export default {
	name: 'activeSlider',
	props: {
		dataList: {
			type: Array,
			default() {
				return [];
			}
		},
		shopcart:{
			type: Object,
			default () {
				return {}
			}
		}
	},
	components: {
		cartcontrol
	},
	data() {
		return {
            registerFlag: this.$store.getters['logintoken'] ? true : false,
            shopType:this.$store.getters['shop']?this.$store.getters['shop'].shopType:4,
            timeNum:(new Date()).valueOf(),
		};
	},
	methods: {
		addFood(target) {
			this._drop(target);
		},
		_drop(target) {
			// 体验优化,异步执行下落动画
			this.$nextTick(() => {
				this.shopcart.drop(target);
			});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.hot-list {
	position: relative;
	width: 100%;
	min-height: 345px;
	padding-bottom: 90px;
	font-size: 14px;
	padding: 4px;
    overflow: hidden;
    background:#ffffff;
    padding-bottom: 50px;
	.productList li {
		width: 50%;
		height: 100%;
		box-sizing: border-box;
		padding: 0;
		overflow: hidden;
		float: left;
		background-color: #f1f1f1;
		border-radius: 22px;
		padding: 5px;
		.list-img {
			z-index: 1;
			// margin-bottom: 7px;
			height: calc((100vw - 70px) / 2);
			width: 100%;
			overflow: hidden;
			position: relative;
			display: block;
			.gift-img{
				position: absolute;
				top:10px;
				right:10px;
				width: 40px;
				height: 40px;
				border: 1px solid @base;
				border-radius:3px;
				background-color: #fff;
				span{
					position: absolute;
					color: @base;
				}
			}
			img {
				display: block;
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
				top: 0;
				right: 0;
				margin: auto;
			}
		}
		.goods-info {
			position: relative;
			height: auto;
			background-color: #fff;
			padding: 10px;
			h4.list-name {
				color: #333333;
				font-weight: 400;
				font-size: 15px;
				line-height: 18px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.list-size {
				margin-bottom: 4px;
				color: #999;
				font-size: 12px;
			}
			.tag{
				display: block;
				color: @base;
				width: 35px;
				text-align: center;
				height: 18px;
				line-height: 14px;
				font-size: 10px;
				border: 1px solid @base;
				border-radius: 4px;
				padding: 2px 2px;
			}
			.tag_empty{
				display: block;
				color: @base;
				height: 18px;
				padding: 2px 2px;
			}
			.list-price {
				display: inline-block;
				color: #ff671d;
				font-size: 15px;
				font-style: normal;
				font-weight: 500;
				// margin-top: 12px;
				&.hide-price {
					color: #eb6000;
					font-size: 12px;
				}
				.unit {
					font-size: 12px;
					color: #999999;
				}
			}
			.cartcontrol-wrapper {
				position: absolute;
				right: 10px;
				bottom: 10px;
			}
		}
	}
}
</style>
