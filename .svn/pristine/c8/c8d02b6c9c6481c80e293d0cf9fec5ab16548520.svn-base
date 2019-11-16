<template>
    <div class="header">
        <mt-header :title="title">
            <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            required: true,
            default: ""
        }
    },
    methods: {
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