<script setup lang="ts">
import { getCurrentInstance, ref} from "vue";

const {proxy}: any = getCurrentInstance();
const data = ref({
    isCollapse: false,
});

function menuHandler(key: string, keyPath: string[]) {
    proxy.$router.push({name: key});
}
</script>

<template>
    <el-container style="flex-direction: row;height: 100%;">
        <el-aside style="width: fit-content;">
            <el-menu
                @select="menuHandler"
                router
                class="menu"
                :collapse="data.isCollapse">
                <el-menu-item @click="data.isCollapse = !data.isCollapse">
                    <el-icon>
                        <Menu/>
                    </el-icon>
                    <span>菜单</span>
                </el-menu-item>
                <el-menu-item index="scoreQuery">
                    <el-icon>
                        <Histogram/>
                    </el-icon>
                    <span>成绩查询</span>
                </el-menu-item>
                <el-menu-item index="classScheduleQuery">
                    <el-icon>
                        <Calendar/>
                    </el-icon>
                    <span>课表查询</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
    </el-container>
</template>

<style scoped lang="scss">
.menu {
    max-width: 10em;
    user-select: none;
    .el-menu-item {
        .el-icon {
            transform: scale(1.5);
        }

        span {
            margin-left: 1em;
        }
    }
}
</style>
