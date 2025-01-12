<script setup lang="ts">
import {ElMessage} from "element-plus";
import {getCurrentInstance, ref} from "vue";

const {proxy}:any = getCurrentInstance();
const http = proxy.$http;
const cookie = ref('');
function setCookie() {
    const cookies = cookie.value.replace("'","").split(';');
    for(let i=0;i<cookies.length;i++){
        document.cookie = `${cookies[i]};Expires=Thu, 01 Jan 9999 00:00:01 GMT`;
    }
    ElMessage.success('设置成功');
}
</script>

<template>
<div class="container">
    <div class="loginContainer">
        <h1>设置Cookie</h1>
        <p>在浏览器中登录教务系统，然后按F12，切换到控制台（Console），粘贴以下代码 <pre>document.cookie</pre>，回车运行，复制输出的代码，粘贴到下面输入框中，点击设置即可。</p>
        <el-form label-width="auto">
            <el-form-item label="Cookie">
                <el-input v-model="cookie"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="setCookie">设置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<style scoped lang="scss">
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .loginContainer{
        text-align: center;
        width: 18em;
        min-height: 20em;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 1em;
    }
</style>
