<script setup lang="ts">
import {Close, Minus} from "@element-plus/icons-vue";
import {ipcRenderer} from "electron";
import {getCurrentInstance, ref} from "vue";

const {proxy}: any = getCurrentInstance();
const data = ref({
    fullscreen: false,
});

function menuHandler(key: string, keyPath: string[]) {
    proxy.$router.push({name: key});
}

function minimizeHandler() {
    ipcRenderer.send('window-min');
}

function maxHandler() {
    data.value.fullscreen =!data.value.fullscreen;
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
                :ellipsis="false"
                text-color="#333"
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
                <el-icon v-if="!data.fullscreen">
                    <svg t="1736783053476" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9574" width="200" height="200"><path d="M853.1 916.4H167.6c-34.9 0-63.3-28.4-63.3-63.3V167.6c0-34.9 28.4-63.3 63.3-63.3h685.5c34.9 0 63.3 28.4 63.3 63.3v685.5c0 34.9-28.4 63.3-63.3 63.3z m-685.5-772c-12.8 0-23.3 10.4-23.3 23.3v685.5c0 12.8 10.4 23.3 23.3 23.3h685.5c12.8 0 23.3-10.4 23.3-23.3V167.6c0-12.8-10.4-23.3-23.3-23.3H167.6z" p-id="9575"></path></svg>
                </el-icon>
                <el-icon v-else style="transform: scale(.9)">
                    <svg t="1736783180760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1462" width="200" height="200"><path d="M770.56 768v256H2.56V256h250.88V0h768v768h-250.88zM64 317.44v645.12h645.12V317.44H64z m896-256H314.88v194.56h455.68v450.56h189.44V61.44z" p-id="1463"></path></svg>
                </el-icon>
            </div>
            <div
                class="closeBtn"
                @click="closeHandler"
            >
                <el-icon>
                    <svg t="1736782912648" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7894" width="200" height="200"><path d="M0 0h1024v1024H0z" fill-opacity="0" p-id="7895"></path><path d="M240.448 168l2.346667 2.154667 289.92 289.941333 279.253333-279.253333a42.666667 42.666667 0 0 1 62.506667 58.026666l-2.133334 2.346667-279.296 279.210667 279.274667 279.253333a42.666667 42.666667 0 0 1-58.005333 62.528l-2.346667-2.176-279.253333-279.253333-289.92 289.962666a42.666667 42.666667 0 0 1-62.506667-58.005333l2.154667-2.346667 289.941333-289.962666-289.92-289.92a42.666667 42.666667 0 0 1 57.984-62.506667z" p-id="7896"></path></svg>
                </el-icon>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "@/global";
.header {
    $headerHeight: 50px;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: mix($--color-primary , #fff, 45%);
    height: $headerHeight;
    user-select: none;
    -webkit-app-region: drag;


    & > div {
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
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
            &:hover {
                background-color: #C42B1C;
                color: #fff;
            }
        }
    }
}
</style>
