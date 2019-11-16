<!--
Description 发布动态
@authors Benny
@date    2018-04-23 10:31:30
@version 1.0.0
-->
<template>
    <div id="dynamic_create">
        <mt-field v-model="dynamicContent" :placeholder="lang.dynamic_moments_thought" type="textarea" rows="4"></mt-field>
        <uploader @getFiles='getImageList' @removeFiles='removeImage'></uploader>
        <div class="btn-wrapper">
            <!-- <mt-button class='btn-send' size="large" type="primary" @click="send">{{this.lang.dynamic_release}}</mt-button> -->
            <load-button :class="isSubmit ? 'text-666 btn-send' : 'bg-blue text-white btn-send'" :loading="isSubmit" @callback="send" :text="lang.dynamic_release"></load-button>
        </div>

    </div>
</template>

<script>
import Header from "@/components/Header";
export default {
    data() {
        return {
            lang: this.$lang("dynamic"), //语言包
            files: [], // 文件缓存
            index: 0, // 序列号
            maxLength: 9, // 图片最大数量
            maxSize: 10240000 //图片限制为10M内
        };
    },
    methods: {
        getImageList(files) {
            this.$nextTick(() => {
                for (let i = 0, len = files.length; i < len; i++) {
                    this.imgList.push(files[i].src.split("base64,")[1]);
                    //上传图片
                    this._getFileCode({
                        Base64Str: files[i].src.split("base64,")[1],
                        AttachmentType: this.$enums.AttachmentType.Activity
                    });
                }
            });
        }
    },
    mounted() {
        this.initPhotoSwipeFromDOM(".my-gallery");
    }
};
</script>

<style src='styles/profile/dynamic/create.less' scoped lang="less"/>