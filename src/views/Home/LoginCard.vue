<script setup lang="ts">
import {cookie} from "@/ts/cookie";
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
            if (res?.length >= 2 && Array.isArray(res)) {
                res.forEach(item => {
                    cookie.set(item.name, item.value);
                });
                ElMessage.success("获取成功");
            } else ElMessage.error(`获取失败，请重试。错误信息：${res}`);
        });

}

function openLoginWindow() {
    ipcRenderer.invoke("jwxt", "openLoginWindow")
        .then(res => {
            if (res?.length >=2){
                res.forEach(item => {
                    cookie.set(item.name, item.value);
                });
                ElMessage.success("自动获取Cookie成功");
            }
        });
}

function getCookies() {
    ipcRenderer.invoke("jwxt", "getCookies")
        .then(res => {
            if (res?.length >=2){
                res.forEach(item => {
                    cookie.set(item.name, item.value);
                });
                ElMessage.success("获取成功");
            }else ElMessage.error("获取失败，请重试");
        });
}
</script>

<template>
    <el-card shadow="hover">
        <template #header>登录</template>
        <el-tabs>
            <el-tab-pane label="自动登录">
                <p>请输入教务系统的用户名和密码，默认保存登录信息，当cookie失效时自动获取。</p>
                <p>重新输入用户名或密码后，重新登录可修改保存的登录信息。</p>
                <p>若多次登录失败出现验证码，请尝试使用手动登录方式或一段时间后再次尝试自动登录。</p>
                <el-form
                    label-width="auto"
                    :model="data.form"
                >
                    <el-form-item label="用户名">
                        <el-input v-model="data.form.username"/>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" show-password v-model="data.form.password"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="手动登录">
                <p>在登录页进入教务系统主页后，会尝试自动获取Cookie，如果未生效，请手动点击“获取Cookies”按钮。</p>
                <p>重复登录会刷新Cookies。</p>
                <el-space>
                    <el-button type="primary" @click="openLoginWindow">打开登录窗口</el-button>
                    <el-button type="primary" @click="getCookies">获取Cookies</el-button>
                </el-space>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<style scoped lang="scss">

</style>
