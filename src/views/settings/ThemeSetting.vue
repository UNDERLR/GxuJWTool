<script setup lang="ts">
import { ref} from "vue";
const data = ref({
    color: "#5ddac8",
});
</script>

<template>
    <el-card shadow="hover" header="主题设计">
        <div>
            <span>主题颜色</span>
            <div>
                <el-color-picker v-model="data.color"/>
            </div>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
    .el-card__body>div {
        display: flex;
        justify-content: space-between;
    }
</style>
