<template>
	<div class="integralContent">
        <router-link
            :to="{ path: '/integralList' }"
            class="integralLeft"
            tag="div"
        >
            <h3>积分商城</h3>
            <p>会员积分 超值兑换</p>
            <div class="go">
                GO<span class="go-icon iconfont">&#xe603;</span>
            </div>
        </router-link>
        <div class="integraRight">
            <router-link
                :to="{ path: '/classify' }"
                tag="div"
                class="presenter"
            >
                <h3>买十送一</h3>
                <p>有买有送 限量抢购</p>
                <div class="go">
                    GO<span class="go-icon iconfont">&#xe603;</span>
                </div>
            </router-link>
            <router-link
                :to="{ path: '/preorderList' }"
                class="preorderList1"
                tag="div"
            >
                <h3>新品预售</h3>
                <p>当季新品 抢先预定</p>
                <div class="go">
                    GO<span class="go-icon iconfont">&#xe603;</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Bus from '../utils/bus.js'
export default {
    name: "integralContent",
    data() {
        return {
            
		};
    },
    mounted() {

    },
	
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.integralContent {
        //积分商城
        padding: 10px 10px;
        height: auto;
        display: flex;
        .integralLeft {
            flex: 1;
            height: 165px;
            background: url(../../static/images/integral.png) no-repeat center
                center;
            background-size: cover;
            border-radius: 5px;
            padding: 15px 7px;
            h3 {
                font-size: 18px;
                font-weight: 500;
                letter-spacing: 0px;
                color: #ff5b5b;
            }
            p {
                font-size: 11px;
                font-weight: normal;
                letter-spacing: 0px;
                color: #888888;
            }
            .go {
                width: 38px;
                height: 18px;
                line-height: 19px;
                background-color: #ff5b5b;
                border-radius: 10px;
                color: #ffffff;
                text-align: center;
                margin-top: 15px;
                .go-icon{
                    color: #fff;
                    font-size:10px;
                    vertical-align: middle;
                }
            }
        }
        .integraRight {
            flex: 1;
            padding: 0 0 0 5px;
            .presenter {
                height: 80px;
                background: url(../../static/images/presenter.png) no-repeat
                    center center;
                background-size: cover;
                border-radius: 5px;
                padding: 10px 0 5px 5px;
                margin-bottom: 5px;
                h3 {
                    font-size: 15px;
                    font-weight: 500;
                    color: #84bb48;
                }
                p {
                    font-size: 11px;
                    font-weight: normal;
                    color: #888888;
                }
                .go {
                    width: 38px;
                    height: 18px;
                    line-height: 19px;
                    background-color: #84bb48;
                    border-radius: 10px;
                    color: #ffffff;
                    text-align: center;
                    margin-top: 4px;
                    .go-icon{
                        color: #fff;
                        font-size:10px;
                        vertical-align: middle;
                    }
                }
            }
            .preorderList1 {
                height: 80px;
                background: url(../../static/images/preorderList1.png) no-repeat
                    center center;
                background-size: cover;
                border-radius: 5px;
                padding: 10px 0 5px 5px;
                h3 {
                    font-size: 15px;
                    font-weight: 500;
                    color: #a36f37;
                }
                p {
                    font-family: AlibabaPuHuiTiR;
                    font-size: 11px;
                    font-weight: normal;
                    color: #888888;
                }
                .go {
                    width: 38px;
                    height: 18px;
                    line-height: 19px;
                    background-color: #a36f37;
                    border-radius: 10px;
                    color: #ffffff;
                    text-align: center;
                    margin-top: 4px;
                    .go-icon{
                        color: #fff;
                        font-size:10px;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>
