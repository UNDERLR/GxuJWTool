<template>
    <el-container>
        <el-header>
            <NormalHeader/>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import NormalHeader from "@/components/NormalHeader.vue";
</script>

<style scoped lang="scss">
.el-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .el-header {
        height: fit-content;
        padding: 0;
    }

    .el-main {
        flex: 1;
        overflow: scroll;
        box-sizing: border-box;
        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
