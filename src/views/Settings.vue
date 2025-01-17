<script setup lang="ts">

import DevelopSetting from "@/views/settings/DevelopSetting.vue";
import ThemeSetting from "@/views/settings/ThemeSetting.vue";
</script>

<template>
    <el-space
        direction="vertical"
        style="width: 100%;"
        fill>
        <ThemeSetting/>
        <DevelopSetting/>
    </el-space>
</template>

<style scoped lang="scss">

</style>
