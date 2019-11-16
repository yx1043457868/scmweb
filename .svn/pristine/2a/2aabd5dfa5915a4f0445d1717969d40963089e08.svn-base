import wx from 'weixin-js-sdk'
const wxApi = {
    isweixin() {
        const ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true
        } else {
            return false
        }
    },
    wxRegister(self, url, opstion) {
        var url = url || window.location.href.split("#")[0];
        self.$post("/share/signature.do?ts=" + Math.random(), {
            url: url
        }).then(res => {
            var response = JSON.parse(res);
            wx.config({
                debug: false, // 开启调试模式
                appId: response.appId, // 必填，公众号的唯一标识
                timestamp: response.timestamp, // 必填，生成签名的时间戳
                nonceStr: response.nonceStr, // 必填，生成签名的随机串
                signature: response.signature, // 必填，签名，见附录1
                jsApiList: [
                        'onMenuShareTimeline', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                        'onMenuShareAppMessage', // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                        'onMenuShareQQ'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(() => {
                wx.onMenuShareTimeline({
                    title: opstion.title, // 分享标题
                    link: response.url, // 分享链接
                    imgUrl: opstion.imgUrl, // 分享图标
                    desc: opstion.desc, // 分享描述
                    success() {
                        // 用户成功分享后执行的回调函数
                        opstion.success()
                    },
                    fail() {
                        // 用户取消分享后执行的回调函数
                        opstion.fail()
                    }
                })
                wx.onMenuShareAppMessage({
                    title: opstion.title, // 分享标题
                    link: response.url, // 分享链接
                    imgUrl: opstion.imgUrl, // 分享图标
                    desc: opstion.desc, // 分享描述
                    success() {
                        // 用户成功分享后执行的回调函数
                        opstion.success()
                    },
                    fail() {
                        // 用户取消分享后执行的回调函数
                        opstion.fail()
                    }
                })
                wx.onMenuShareQQ({
                    title: opstion.title, // 分享标题
                    link: response.url, // 分享链接
                    imgUrl: opstion.imgUrl, // 分享图标
                    desc: opstion.desc, // 分享描述
                    success() {
                        // 用户成功分享后执行的回调函数
                        opstion.success()
                    },
                    fail() {
                        // 用户取消分享后执行的回调函数
                        opstion.fail()
                    }
                })
                wx.checkJsApi({
                    jsApiList: [
                        "onMenuShareTimeline",
                        "onMenuShareAppMessage",
                        "onMenuShareQQ"
                    ],
                    success: function(res) {
                        //alert(res.errMsg);
                        // self.sharedSuccess = true;
                    }
                });
            })
            wx.error((res) => {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                console.log("errorMSG:" + res);
            });
        }).catch((error) => {
            console.log(error)
        })
    },
}

export default wxApi