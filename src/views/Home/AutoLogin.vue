<script setup lang="ts">
import {ipcRenderer} from "electron";
import {ElMessage} from "element-plus";
import {ref} from "vue";

const logData = JSON.parse(localStorage.getItem("logData") ?? "{}");
const data = ref({
    form: {
        username: logData.username ?? "",
        password: logData.password ?? ""
    }
});

function submit() {
    localStorage.setItem("logData", JSON.stringify({
        username: data.value.form.username,
        password: data.value.form.password
    }));
    ElMessage.info("正在登录...");
    ipcRenderer.invoke("jwxt", "autoGetCookies", data.value.form.username, data.value.form.password)
        .then(res => {
            if (res?.length >= 2) {
                res.forEach(cookie => {
                    document.cookie = `${cookie.name}=${cookie.value};expires= Fri, 31 Dec 9999 23:59:59 GMT`;
                });
                ElMessage.success("获取成功");
            } else ElMessage.error("获取失败，请重试");
        });

}
</script>

<template>
    <el-card shadow="hover">
        <h1>登录</h1>
        <p>请输入教务系统的用户名和密码，默认保存登录信息，当cookie失效时自动获取。</p>
        <p>重新输入用户名或密码后，重新登录可修改保存的登录信息。</p>
        <el-form
            label-width="auto"
            :model="data.form"
        >
            <el-form-item label="用户名">
                <el-input v-model="data.form.username"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="data.form.password"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped lang="scss">

</style>
