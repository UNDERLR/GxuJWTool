<script lang="ts" setup>
import LoginCard from "@/views/Home/LoginCard.vue";
import {jwxt} from "@/ts/jwxt";
</script>

<template>
    <el-space
        fill
        style="width: 100%;padding: var(--el-main-padding);box-sizing: border-box;"
        direction="vertical">
        <LoginCard/>
        <el-card shadow="never">
            <el-button type="primary" @click="jwxt.openPage()">打开教务系统首页</el-button>
        </el-card>
    </el-space>
</template>
