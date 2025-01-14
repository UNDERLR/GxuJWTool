<script setup lang="ts">

import {cookie} from "@/ts/cookie";
import {ElMessage} from "element-plus";

function copyCookie() {
    const text = cookie.getFormatted();
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    ElMessage.success(`成功复制Cookie: ${text}`);
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
