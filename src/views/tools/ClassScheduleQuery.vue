<script setup lang="ts">
import {ref} from "vue";
import {http} from "@/ts/http";
import {ElMessage} from "element-plus";
import {jwxt} from "@/ts/jwxt";
import {Course} from "@/ts/type/course";

const staticData = {
    year: [
        ["2028", "2028-2029"],
        ["2027", "2027-2028"],
        ["2026", "2026-2027"],
        ["2025", "2025-2026"],
        ["2024", "2024-2025"],
        ["2023", "2023-2024"],
        ["2022", "2022-2023"],
        ["2021", "2021-2022"],
        ["2020", "2020-2021"],
        ["2019", "2019-2020"],
        ["2018", "2018-2019"],
        ["2017", "2017-2018"],
        ["2016", "2016-2017"],
        ["2015", "2015-2016"],
        ["2014", "2014-2015"],
        ["2013", "2013-2014"],
        ["2012", "2012-2013"],
        ["2011", "2011-2012"],
        ["2010", "2010-2011"],
        ["2009", "2009-2010"],
        ["2008", "2008-2009"],
        ["2007", "2007-2008"],
        ["2006", "2006-2007"],
        ["2005", "2005-2006"],
    ],
    term: [
        ["3", "1"],
        ["12", "2"],
        ["16", "3"],
    ],
    days: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
    ],
};

const data = ref({
    result: JSON.parse(localStorage.getItem("classSchedule") || "{}"),
    classList: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ] as Course[][],
    maxWeek:1,
    form: {
        year: 4,
        term: 0,
        tag: 0,
    }
});

function query() {
    const formData = {
        xnm: staticData.year[data.value.form.year][0],
        xqm: staticData.term[data.value.form.term][0],
        // 以下参数不确定作用，不会影响返回
        kzlx: "ck",
        xsdm: ""
    };
    ElMessage.info("正在查询...");
    // 通过Electron主进程发送请求
    http.post("https://jwxt2018.gxu.edu.cn/jwglxt/kbcx/xskbcx_cxXsgrkb.html", http.objectToFormUrlEncoded(formData))
        .then(res => {
            if (!res) {
                ElMessage.error("查询失败，请联系管理员");
                return;
            }
            if (typeof res === "object") {
                data.value.result = res;
                localStorage.setItem("classSchedule", JSON.stringify(res));
                ElMessage.success("查询成功");
            } else {
                ElMessage.error("查询失败，尝试重新获取Cookie...");
                jwxt.refreshCookie()
                    .then(res => {
                        if (Array.isArray(res) && res.length >= 2) {
                            ElMessage.success("尝试重新查询...");
                            query();
                        }
                    });
            }
            console.log(res);
        });
}

function parseCourses() {
    data.value.result.kbList.forEach((course: Course) => {
        data.value.classList[parseInt(course.xqj) - 1].push(course);
    });
    console.log(data.value.classList)
}

parseCourses();
</script>

<template>
    <div class="container">
        <el-card shadow="never">
            <el-form :model="data.form" label-width="auto">
                <el-form-item label="学年">
                    <el-select
                        v-model="data.form.year"
                        filterable>
                        <el-option
                            v-for="(item,index) in staticData.year"
                            :key="index"
                            :label="item[1]"
                            :value="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="学期">
                    <el-select
                        v-model="data.form.term"
                        filterable>
                        <el-option
                            v-for="(item,index) in staticData.term"
                            :key="index"
                            :label="item[1]"
                            :value="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="never">
            <el-row style="text-align: center;" :gutter="5">
                <el-col
                    :span="3"
                    class="day">
                    <div>时间</div>
                    <div
                        v-for="time in 13"
                        class="course"
                        :style="`--span:1;--dy:${time-1};`"
                    >
                        <p>{{ time }}</p>
                    </div>
                </el-col>
                <el-col
                    :span="3"
                    :key="data.classList[index].length"
                    class="day"
                    v-for="(day,index) in staticData.days">
                    <div>{{ day }}</div>
                    <div
                        v-for="course in data.classList[index] as Course[]"
                        :key="data.classList[index].indexOf(course)"
                        :style="
                        `--span: ${parseInt(course.jcs.split('-')[1])-parseInt(course.jcs.split('-')[0])+1};`+
                        `--dy:${parseInt(course.jcs.split('-')[0])-1};`"
                        class="course">
                        <p>{{ course.kcmc }}</p>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.el-card:not(:first-child) {
    margin-top: 1em;
}

.day {
    $spanHeight: 3em;
    $marginTop: 10px;
    $weekTextHeight: 2em;

    position: relative;

    & > :first-child {
        height: $weekTextHeight;
    }

    .course {
        min-height: calc(var(--span) * $spanHeight + (var(--span) - 1) * $marginTop);
        height: calc(var(--span) * $spanHeight + (var(--span) - 1) * $marginTop);
        left: 5%;
        top: calc(var(--dy) * $spanHeight + var(--dy) * $marginTop + $weekTextHeight);
        width: 90%;
        border: 1px solid var(--el-border-color);
        box-sizing: border-box;
        margin-top: $marginTop;
        overflow: hidden;
        transition: 0.3s ease-in-out;
    }

    .course:hover {
        height: fit-content;
    }

    &:not(:first-child) .course {
        position: absolute;
    }
}
</style>