<script setup lang="ts">
import {Close, Minus} from "@element-plus/icons-vue";
import {ipcRenderer} from "electron";
import {getCurrentInstance} from "vue";

const {proxy}: any = getCurrentInstance();

function menuHandler(key: string, keyPath: string[]) {
    proxy.$router.push({name: key});
}

function minimizeHandler() {
    ipcRenderer.send('window-min');
}

function maxHandler() {
    ipcRenderer.send('window-max');
}

function closeHandler() {
    ipcRenderer.send("window-close");
}
</script>

<template>
    <div class="header">
        <div class="headerLeft">
            <el-image class="icon" :src="require('@/assets/icon.jpg')"/>
            广西大学教务系统工具
        </div>
        <div class="headerCenter">
            <el-menu
                @select="menuHandler"
                router
                background-color="transparent"
                text-color="#eee"
                active-text-color="#fff"
                mode="horizontal">
                <el-menu-item index="home">首页</el-menu-item>
                <el-menu-item index="tools">工具</el-menu-item>
                <el-menu-item index="settings">设置</el-menu-item>
            </el-menu>
        </div>
        <div class="headerRight">
            <div @click="minimizeHandler">
                <el-icon>
                    <Minus/>
                </el-icon>
            </div>
            <div @click="maxHandler">
                <el-icon></el-icon>
            </div>
            <div
                class="closeBtn"
                @click="closeHandler"
            >
                <el-icon style="font-size: inherit">
                    <Close/>
                </el-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/element-variables";
.header {
    $headerHeight: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: mix($--color-primary, #fff, 45%);
    height: $headerHeight;
    user-select: none;
    -webkit-app-region: drag;

    .el-menu--horizontal > .el-menu-item {
        height: $headerHeight - 1px;
        line-height: $headerHeight - 1px;
        color: #fff !important;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2) !important;
        }
    }

    & > div {
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .headerLeft {
        .icon {
            border-radius: 20%;
            margin-right: .5em;
            height: $headerHeight *(2/3);
            width: $headerHeight *(2/3);
        }

        padding: 0 1em;
        position: absolute;
        left: 0;
    }

    .headerCenter {
        -webkit-app-region: no-drag;
        width: fit-content;
        justify-self: center;
    }

    .headerRight {
        $iconWidth: $headerHeight ;

        display: flex;
        position: absolute;
        right: 0;
        width: $iconWidth * 3;
        -webkit-app-region: no-drag;

        & > div {
            height: 100%;
            width: $iconWidth;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }

        .closeBtn {
            font-size: 1.1em;

            &:hover {
                background-color: #C42B1C;
                color: #fff;
            }
        }
    }
}
</style>
