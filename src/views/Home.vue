<script lang="ts" setup>
import AutoLogin from "@/views/Home/AutoLogin.vue";
import LoginCard from "@/views/Home/LoginCard.vue";

</script>

<template>
    <el-space
        fill
        style="width: 100%;"
        direction="vertical">
        <AutoLogin/>
        <!--手动登录-->
        <!--<LoginCard/>-->
    </el-space>
</template>
