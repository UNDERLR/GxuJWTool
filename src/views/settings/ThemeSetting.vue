<script setup lang="ts">
import {Color} from "@/ts/color";
import {theme, ThemeOption} from "@/ts/theme";
import {ref} from "vue";

const data = ref({
    primaryColor: theme.getThemeOption(ThemeOption.primaryColor, "#409eff"),
    darkMode: theme.getThemeOption(ThemeOption.darkMode, false),
});

function primaryColorView(value: string) {
    const primaryColor = new Color(value);
    theme.setPrimaryColor(primaryColor);
}

function primaryColorChange(value: string) {
    const primaryColor = new Color(value);
    theme.setPrimaryColor(primaryColor);
    theme.setThemeOption(ThemeOption.primaryColor, value);
}

function darkModeChange(value: boolean) {
    theme.setDarkMode(value);
}
</script>

<template>
    <el-card shadow="hover" header="主题设计">
        <div>
            <span>主题颜色</span>
            <div>
                <el-color-picker @active-change="primaryColorView" @change="primaryColorChange" v-model="data.primaryColor"/>
            </div>
        </div>
        <div>
            <span>深色模式</span>
            <el-switch v-model="data.darkMode" @change="darkModeChange" active-text="开启" inactive-text="关闭"/>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.el-card__body > div {
    display: flex;
    justify-content: space-between;
}
</style>
