function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatDate(date, time) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/');
    if (time == 1) {
        return `${t1}`
    }
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}

export function formatMonth(date, time) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [month, day].map(formatNumber).join('.');
    if (time == 1) {
        return `${t1}`
    }
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}


export function isPoneAvailable(phone) {
    var myreg = /^[1][0-9]{10}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}
export function isTelAvailable(phone) {
    var myreg = /^0\d{2,3}[-]{0,1}\d{7,8}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}
export function getLoginInfo() {
    var loginInfo = JSON.parse(localStorage.getItem("logindata")) ? JSON.parse(localStorage.getItem("logindata")) : "";
    return loginInfo;
}
//加
export function m_add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (m_mul(a, e) + m_mul(b, e)) / e;
}

//减
export function m_sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (m_mul(a, e) - m_mul(b, e)) / e;
}

//乘
export function m_mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

//除
export function m_div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), m_mul(c / d, Math.pow(10, f - e));
}

//取余数
export function m_rem(a, b) {
    return m_sub(a, m_mul(parseInt(m_div(a, b)), b));
}
//取区间价
export function rankPrice(good, value) {
    if (good && good.rkpriceList) {
        var rankPrice = good.rkpriceList;
        var fnum = parseFloat(value);
        // debugger;
        for (var k = 0, len = rankPrice.length; k < len; k++) {
            var begin_qty = rankPrice[k].begin_qty,
                end_qty = rankPrice[k].end_qty;
            if (fnum >= begin_qty && fnum <= end_qty && end_qty != undefined) {
                return rankPrice[k].qty_price;
                break;
            } else if (fnum >= begin_qty && end_qty == undefined) {
                return rankPrice[k].qty_price;
                break;
            } else if (fnum > rankPrice[len - 1].end_qty) {
                return good.unit_price;
                break;
            } else if (fnum < rankPrice[0].begin_qty) {
                return good.unit_price;
                break;
            }
        }
    }

}

/***
 * 数字 保留两位小数
 * @param value
 * @returns {___anonymous5369_5373}
 */
export function toFloat2(value) {
    if (isNull(value)) {
        value = 0;
    }
    var value = Math.round(parseFloat(value) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
    }
    if (xsd.length > 1) {
        if (xsd[1].length < 2) {
            value = value.toString() + "0";
        }
        return value;
    }
    return value;
}


export function isNull(s) {
    if (s == null || s == "null" || s == undefined || s == 'undefined' || s == "" || s == 0 || s == "0") {
        return true;
    }
    return false;
}

/**
 * 判断是否是微信内置的浏览器
 */
export function isWeixinBrowser() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取pcid
 */
export function getPcid() {
    var pcid = JSON.parse(localStorage.getItem("pcid"));
    let logindata = JSON.parse(localStorage.getItem("logindata"));
    if (pcid && logindata) {
        return parseInt(pcid);
    } else if (pcid && !logindata) {
        return parseInt(pcid);
    } else if (!pcid && logindata) {
        return parseInt(JSON.parse(logindata).account.companyId);
    } else {
        return process.env.NODE_ENV !== 'production' ? 65 : 65;
    }
}
//金额转化格式
export function getFormarNum(value) {
    if (value) {
        var str = (Math.round(value * 100) / 100).toFixed(2) + '';
        var intSum = str.substring(0, str.indexOf(".")).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
        var dot = str.substring(str.length, str.indexOf(".")) //取到小数部分搜索
        var ret = "￥" + intSum + dot;
        return ret;
    } else {
        return '￥0.00';
    }
}
//时间段
export function CompareDate(begintime, endtime) {
    var curTime = new Date();
    //2把字符串格式转换为日期类
    begintime = begintime.replace(new RegExp(/-/gm), "/");
    endtime = endtime.replace(new RegExp(/-/gm), "/");
    //解决IE、firefox浏览器下JS的new Date()的值为Invalid Date、NaN-NaN的问题
    var startTime = new Date(Date.parse(begintime));
    var endTime = new Date(Date.parse(endtime));
    //3进行比较
    return curTime >= startTime && curTime <= endTime;
}


export function changDate(begintime) {
    begintime = begintime.replace(new RegExp(/-/gm), "/");
    var startTime = new Date(Date.parse(begintime));
    return startTime
}
export function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

/**
 * 动画垂直滚动到页面指定位置
 * @param { Number } currentY 当前位置
 * @param { Number } targetY 目标位置
 */
export function scrollAnimation(currentY, targetY) {
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
        const dist = Math.ceil(needScrollTop / 10)
        _currentY += dist
        window.scrollTo(_currentY, currentY)
            // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
        if (needScrollTop > 10 || needScrollTop < -10) {
            scrollAnimation(_currentY, targetY)
        } else {
            window.scrollTo(_currentY, targetY)
        }
    }, 1)
}
export default {
    formatNumber,
    formatDate,
    isPoneAvailable,
    getLoginInfo,
    rankPrice,
    m_add,
    m_sub,
    m_mul,
    m_div,
    m_rem,
    isWeixinBrowser,
    isNull,
    getPcid,
    getFormarNum,
    CompareDate,
    changDate,
    getUrlParam,
    toFloat2,
    formatMonth,
    scrollAnimation,
    isTelAvailable
}