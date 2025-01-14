<script setup lang="ts">

import {getCurrentInstance} from "vue";

const {proxy} : any = getCurrentInstance();
const router = proxy.$router;

const toolList = [
    {
        name: "成绩查询",
        description: "查询个人成绩及详细信息",
        pathName: "scoreQuery"
    },
];

function handleClick(pathName: string) {
    router.push({ name: pathName });
}
</script>

<template>
    <el-space wrap :fill-ratio="70">
        <el-card
            shadow="hover"
            class="toolCard"
            @click="handleClick(tool.pathName)"
            v-for="tool in toolList">
            <h1>{{ tool.name }}</h1>
            <p>{{ tool.description }}</p>
        </el-card>
    </el-space>
</template>

<style scoped lang="scss">
.toolCard {
    width: 15em;
}
</style>
