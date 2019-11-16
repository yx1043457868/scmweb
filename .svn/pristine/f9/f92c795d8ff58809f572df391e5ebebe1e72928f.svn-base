<template>
    <div>
        <div class="header">
            <mt-header title="地图">
                <mt-button icon="back" slot="left" @click="back"></mt-button>
            </mt-header>
        </div>
        <div id="allmap" class="allmap"></div>
    </div>
</template>

<script>
export default {
    name: "mapShow",
    data() {
        return {
           
        };
    },
    mounted(){
        const _address = this.$route.query.ad;
        this.initMap(_address);  
    },
    methods: {
        initMap(_address) {
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(116.331398,39.897445);
            map.centerAndZoom(point,12);
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(_address, function(point){
                if (point) {
                    map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                }else{
                    alert("您选择地址没有解析到结果!");
                }
            }, "北京市");
        },
        back() {
            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.back(-1);
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@base: #eb6000;
.allmap{
    position: fixed !important;
    width: 100%;
    overflow: hidden;
    margin:auto;
    top:45px !important;
    left:0;
    right:0;
    bottom:0;
    z-index: 1000 !important;
}
</style>
