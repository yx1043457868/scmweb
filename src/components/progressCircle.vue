
<template>
    <section class="container">
        <div class="progress">
            <span class="blue" :style="{ width: percent }"><span>{{percent}}</span></span>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        percent: {
            type: String,
            default: 0
        }
    },
    data() {
        return {
            
        };
    },
    computed: {
       
    }
};
</script>

<style scoped lang="less">
.progress {
    height: 12px;
    background: #ebebeb;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-radius: 10px;
}
.progress > span {
    position: relative;
    float: left;
    margin: 0 -1px;
    min-width: 30px;
    height: 12px;
    line-height: 12px;
    text-align: right;
    background: #cccccc;
    border: 1px solid;
    border-color: #bfbfbf #b3b3b3 #9e9e9e;
    border-radius: 10px;
    background-image: -webkit-linear-gradient(
        top,
        #f0f0f0 0%,
        #dbdbdb 70%,
        #cccccc 100%
    );
    background-image: -moz-linear-gradient(
        top,
        #f0f0f0 0%,
        #dbdbdb 70%,
        #cccccc 100%
    );
    background-image: -o-linear-gradient(
        top,
        #f0f0f0 0%,
        #dbdbdb 70%,
        #cccccc 100%
    );
    background-image: linear-gradient(
        to bottom,
        #f0f0f0 0%,
        #dbdbdb 70%,
        #cccccc 100%
    );
    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.3),
        0 1px 2px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.3),
        0 1px 2px rgba(0, 0, 0, 0.2);
}
.progress > span > span {
    padding: 0 8px;
    font-size: 11px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 1px rgba(255, 255, 255, 0.4);
}
.progress > span:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 12px;
    border-radius: 10px;
}

.progress .red {
    background: #db3a27;
    border-color: #c73321 #b12d1e #8e2418;
    background-image: -webkit-linear-gradient(
        top,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
    background-image: -moz-linear-gradient(
        top,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
    background-image: -o-linear-gradient(
        top,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
    background-image: linear-gradient(
        to bottom,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
}

.progress .blue {
    background: #eb6000;
    border-color: #eb6000 #eb6000 #eb6000;
    // background-image: -webkit-linear-gradient(
    //     top,
    //     #aed5ed 0%,
    //     #3181ff 70%,
    //     #eb6000 100%
    // );
    // background-image: -moz-linear-gradient(
    //     top,
    //     #aed5ed 0%,
    //     #3181ff 70%,
    //     #eb6000 100%
    // );
    // background-image: -o-linear-gradient(
    //     top,
    //     #aed5ed 0%,
    //     #3181ff 70%,
    //     #eb6000 100%
    // );
    // background-image: linear-gradient(
    //     to bottom,
    //     #aed5ed 0%,
    //     #3181ff 70%,
    //     #eb6000 100%
    // );
    background-image: -webkit-linear-gradient(
        top,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
    background-image: -moz-linear-gradient(
        top,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
    background-image: -o-linear-gradient(
        top,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
    background-image: linear-gradient(
        to bottom,
        #ea8a7e 0%,
        #e15a4a 70%,
        #db3a27 100%
    );
}
</style>