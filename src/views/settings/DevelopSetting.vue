<script setup lang="ts">

import {ElMessage} from "element-plus";

function copyCookie() {
    const cookie = document.cookie;
    const el = document.createElement('textarea');
    el.value = cookie;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    ElMessage.success('复制成功');
}
</script>

<template>
    <el-card shadow="hover" header="开发相关">
        <div>
            <span>Cookie</span>
            <div>
                <el-button type="primary" @click="copyCookie()">复制cookie</el-button>
            </div>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.el-card__body>div {
    display: flex;
    justify-content: space-between;
}
</style>
