<script setup lang="ts">

import {cookie} from "@/ts/cookie";
import {ElMessage} from "element-plus";
import {Tool} from "@/ts/tool";
import {Link} from "@element-plus/icons-vue";

const version = window.version;

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
        <div>
            <span>软件信息</span>
            <div>
                <el-text>CopyRight © 2025 寰辰&lt;UNDERLR@foxmail.com&gt;</el-text>
                <br/>
                <el-text>版本: {{ version }}</el-text>
            </div>
        </div>
        <div>
            <span>Github仓库</span>
            <div>
                <el-tooltip content="点击复制" placement="top">
                    <el-button type="text" @click="Tool.copy('https://github.com/UNDERLR/GxuJWTool')">
                        <el-icon>
                            <Link/>
                        </el-icon>
                        GxuJWTool
                    </el-button>
                </el-tooltip>
            </div>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.el-card__body > div {
    display: flex;
    justify-content: space-between;
}

.el-card__body > div:not(:last-child) {
    margin-bottom: 10px;
}
</style>
