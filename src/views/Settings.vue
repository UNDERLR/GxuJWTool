<script setup lang="ts">

</script>

<template>
    <el-button
        type="primary"
        @click="$router.push({ name: 'setCookie' })"
    >
        设置Cookie
    </el-button>
    <router-view></router-view>
</template>

<style scoped lang="scss">

</style>
