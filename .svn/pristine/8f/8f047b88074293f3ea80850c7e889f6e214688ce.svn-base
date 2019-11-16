<template>
    <div>
        <div class="header">
            <mt-header :title="'我的消息'">
                <mt-button icon="back" slot="left" @click="back(1)"></mt-button>
                <mt-button slot="right" @click="edit(1)"><span class="headBtn" v-show="!foot">编辑</span><span class="headBtn" v-show="foot" style="background:#dddddd;color:#666">取消</span></mt-button>
            </mt-header>
        </div>

        <section class="my_message my-content" id="msgList">
            <ul id="ul">
                <li v-for="(item,index) in data1" :key="index" :read="item.isRead" :data-id="item.id" class="radio">
                    <i v-if="item.isRead =='N'" class="noRead"></i>
                    <div v-if="foot" class="s" @click="messageSel(index,item)">
                        <em class="iconfont mes" v-if="item.show">&#xe672;</em>
                        <em class="iconfont mes1" v-if="!item.show">&#xe673;</em>
                    </div>
                    <span :class=" foot?'s1':''" @click="readMessage(item.id,item.isRead,item,index)">{{item.msg}}</span>
                    <div class="show_content" v-if="!item.show1">
                        <p>{{item.msg}}</p>
                    </div>
                    <i class="iconfont password" v-if="item.show1">&#xe603;</i>
                    <i class="iconfont password" v-if="!item.show1">&#xe675;</i>
                </li>
            </ul>
        </section>

        <footer class="all_select" v-if="foot">
            <span @click="selectAll">全选</span>
            <button type="button" class="delete_btn" @click="delMessage">删除</button>
        </footer>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            data1: [],
            list: [],
            foot: false,
            show: true,
            actived: true,
            show1: false
        };
    },
    methods: {
        initMessage() {
            let accountObj = this.$store.getters["account"]
                ? this.$store.getters["account"]
                : {};
            var content_ = "{'account':'" + accountObj.account + "'}";
            var that = this;
            this.$post("/message/messageList.do", {
                content: content_,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            })
                .then(function(res) {
                    // var $ul = $("#ul");
                    // $ul.empty();
                    that.data1 = JSON.parse(res).res;
                    that.data1.forEach((item, index) => {
                        item.show = true;
                        item.show1 = true;
                    });
                    that.list = that.data1;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        readMessage(id, isRead, item, index) {
            item.show1 = !item.show1;
            this.$set(this.data1, index, item);
            if (isRead == "N") {
                var content_ = "{'ids':'[" + id + "]'}";
                var that = this;
                this.$post("/message/messageRead.do", {
                    content: content_,
                    version: "kkllo",
                    login_token: this.$store.getters["logintoken"]
                })
                    .then(function(res) {
                        let response = JSON.parse(res);
                        if (response.optFlag == "yes") {
                            item.isRead = "Y";
                            that.$set(that.data1, index, item);
                        } else {
                            Toast(response.optDesc);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
        edit() {
            this.foot = !this.foot;
        },
        back() {
            this.$router.back(-1);
        },
        messageSel(index, item) {
            item.show = !item.show;
            this.$set(this.data1, index, item);
        },
        selectAll() {
            this.actived = !this.actived;
            if (!this.actived) {
                this.data1.forEach((item, index) => {
                    item.show = false;
                    this.$set(this.data1, index, item);
                });
            } else {
                this.data1.forEach((item, index) => {
                    item.show = true;
                    this.$set(this.data1, index, item);
                });
            }
        },
        delMessage() {
            let ids = [];
            this.data1.forEach((item, index) => {
                if (!item.show) {
                    ids.push(item.id);
                }
            });
            var _content = "{'ids':'[" + ids + "]'}";
            var that = this;
            this.$post("/message/messageDel.do", {
                content: _content,
                version: "kkllo",
                login_token: this.$store.getters["logintoken"]
            }).then(res => {
                let response = JSON.parse(res);
                if (response.optFlag == "yes") {
                    that.initMessage();
                    Toast({
                        message: "删除成功",
                        duration: 1000
                    });
                } else {
                    Toast({
                        message: "获取失败",
                        duration: 1000
                    });
                }
            });
        }
    },
    mounted() {
        this.initMessage();
    }
};
</script>
<style scoped lang="less">
body {
    overflow: hidden;
    background-color: #fff;
}

.my_message {
    overflow-y: scroll;
}

.all_select {
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #fff;
}

.all_select span {
    float: left;
    margin-left: 20px;
}

.all_select button {
    width: 80px;
    float: right;
    margin: 10px 20px 0px 0px;
    background-color: #eb6000;
    color: #fff;
    font-size: 15px;
    height: 40px;
    border-radius: 4px;
}
.my_message li {
    text-align: left;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
    position: relative;
    background: #fff;
}
.my_message li span {
    width: 81%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    color: #333;
}
.my_message li .show_content {
    background-color: #fff;
    line-height: 20px;
    padding: 5px 10px;
}
.my_message p {
    font-size: 12px;
    text-align: justify;
    word-break: break-all;
}
.password {
    content: "\e61d";
    color: #333;
    font-size: 14px;
    font-family: "iconfont" !important;
    position: absolute;
    right: 10px;
    top: 1px;
}
// .my_message li.no_read span:after {
//     background: #f00;
//     width: 10px;
//     height: 10px;
//     font-size: 40px;
//     font-family: "iconfont" !important;
//     position: absolute;
//     right: 20px;
//     top: 3px;
//     border-radius: 50%;
// }
.noRead {
    background: #f00;
    width: 10px;
    height: 10px;
    color: #f00;
    font-size: 40px;
    font-family: "iconfont" !important;
    position: absolute;
    right: 31px;
    top: 14px;
    border-radius: 50%;
}
.s {
    display: inline-block;
    position: absolute;
    left: 10px;
}
.s1 {
    margin-left: 40px !important;
    width: 74% !important;
}
.mes {
    font-size: 22px !important;
}
.mes1 {
    font-size: 22px !important;
    color: #eb6000;
}
</style>