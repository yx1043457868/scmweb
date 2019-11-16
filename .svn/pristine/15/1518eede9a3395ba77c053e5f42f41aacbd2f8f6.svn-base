<template>
    <div class="aboutUs">
        <div class="back" @click="back"><i class="iconfont">&#xe6fb;</i></div>
        <img :src="aboutUsImg" /> 
    </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
import { m_sub } from "../../utils/index.js";
export default {
    name: "aboutUs",
    components: {
        Tabbar
    },
    data() {
        return {
           aboutUsImg:'http://p.lzl98.com/scmplus/upload/adv/aboutme2.jpg'
        };
    },
    created() {
        
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
    }
};
</script>
<style scoped lang="less">
@base: #eb6000;
.aboutUs{
    img{
        width:100%;
        height:1978px;
    }
    .back {
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 4;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.4);
        text-align: center;
        i {
            color: #fff;
            font-weight: 700;
            font-size: 20px;
            line-height: 35px;
        }
    }
}

</style>
