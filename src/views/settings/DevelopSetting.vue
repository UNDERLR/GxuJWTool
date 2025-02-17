<script setup lang="ts">

import {cookie} from "@/ts/cookie";
import {ElMessage} from "element-plus";
import {Tool} from "@/ts/tool";

function copyCookie() {
    const text = cookie.getFormatted();
    Tool.copy(text);
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
