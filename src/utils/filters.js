//vue定义全局过滤器


import { formatDate } from "../utils/index";

/***
 * 数字 金额保存两位小数
 * @param value
 * @returns {___anonymous5369_5373}
 */

let toFixed2 = value => {
    if (!value) return "0.00";
    return parseFloat(value).toFixed(2);
}

/***
 * 数字 时间格式化
 * @param value
 * @returns {___anonymous5369_5373}
 */
let formatTime = (value) => {
    var createTime = new Date(value);
    return formatDate(createTime);
}


/***
 * 数字 金额格式化
 * @param value
 * @returns {___anonymous5369_5373}
 */
let formatMoney = (val) => {
    val = parseFloat(val).toString().replace(/\$|\,/g, '');
    if (isNaN(val)) {
        val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val * 100 + 0.50000000001);
    let cents = val % 100;
    val = Math.floor(val / 100).toString();
    if (cents < 10) {
        cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
    }

    return (((sign) ? '' : '-') + val + '.' + cents);
}


let format = (value) => {
    if (value) {
        return value.split(" ")[0].replace(new RegExp(/-/gm), ".");
    }
}

let countFormat = (val) => {
    return val >= 100 ? "99+" : val;
}
export default {
    toFixed2,
    formatTime,
    formatMoney,
    format,
    countFormat
}