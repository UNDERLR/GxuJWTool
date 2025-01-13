<script setup lang="ts">
import {ipcRenderer} from "electron";
import {ElMessage} from "element-plus";
import {ref} from "vue";

const data = ref({
});

function openLoginWindow() {
    ipcRenderer.invoke("jwxt", "openLoginWindow");
}

function getCookies() {
    ipcRenderer.invoke("jwxt", "getCookies")
        .then(res => {
            if (res?.length >=2){
                res.forEach(cookie => {
                    document.cookie = `${cookie.name}=${cookie.value};expires= Fri, 31 Dec 9999 23:59:59 GMT`;
                });
                ElMessage.success("获取成功");
            }else ElMessage.error("获取失败，请重试");
        });
}
</script>

<template>
    <el-card shadow="hover">
        <h2>登录</h2>
        <p>在登录页进入主页后，点击“获取Cookies”按钮。</p>
        <p>重复登录会刷新Cookies。</p>
        <el-space>
            <el-button type="primary" @click="openLoginWindow">打开登录窗口</el-button>
            <el-button type="primary" @click="getCookies">获取Cookies</el-button>
        </el-space>
    </el-card>
</template>

<style scoped lang="scss">

</style>
