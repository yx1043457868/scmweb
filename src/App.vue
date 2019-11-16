<template>
    <div id="app" :class="[isIos ? 'xn-ios':'']">
        <!-- <transition :name="transitionName"> -->
        <keep-alive key="keep-alive" :include="include">
            <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <!-- </transition> -->
        <!-- <transition :name="transitionName"> -->
        <router-view class="router-view" v-if="!$route.meta.keepAlive" key="not-keep-alive"></router-view>
        <!-- </transition> -->
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            isIos: false,
            include : []
        };
    },
	mounted(){

	},
    methods: {
        getDevice() {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                this.isIos = true;
            }
        },
    },
    watch: {
        //使用watch 监听$router的变化
        $route(to, from) {
            if(to.meta.keepAlive){
                !this.include.includes(to.name) && this.include.push(to.name);
            }
            //再根据deepth来判断是前进还是后退
            if(from.meta.keepAlive && to.meta.deepth < from.meta.deepth){
                var index = this.include.indexOf(from.name);
                index !== -1 && this.include.splice(index, 1);
            }
        }
    }
};
</script>

<style lang="less">
@import "./assets/css/base.less";
@import "./assets/css/mint-ui.less";
body {
    background-color: #f1f1f1 !important;
}
html,
body{
    width: 100%;
    height: 100%;
    color: #666666;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-family: "PingFang SC", "Lantinghei SC", "Microsoft YaHei", "HanHei SC",
        "Helvetica Neue", "Open Sans", Arial, "Hiragino Sans GB", "微软雅黑",
        STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
     
    -webkit-overflow-scrolling: touch;
    -webkit-overflow-scrolling: touch;
}
@font-face {
  font-family: 'iconfont';  /* project id 551263 */
  src: url('//at.alicdn.com/t/font_551263_m75w6syhhj.eot');
  src: url('//at.alicdn.com/t/font_551263_m75w6syhhj.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_551263_m75w6syhhj.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_551263_m75w6syhhj.woff') format('woff'),
  url('//at.alicdn.com/t/font_551263_m75w6syhhj.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_551263_m75w6syhhj.svg#iconfont') format('svg');
}
.iconfont {
    font-style: normal;
    font-size: 16px;
    font-family: iconfont !important;
    /*-webkit-font-smoothing: antialiased;*/
    /*-webkit-text-stroke-width: .2px;*/
    /*-moz-osx-font-smoothing: grayscale*/
}

* {
    margin: 0;
    padding: 0;
}
// .v-modal{
//    height: 80%!important;
// }
</style>
