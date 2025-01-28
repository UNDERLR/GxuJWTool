<script setup lang="ts">
import {ref} from "vue";
import {http} from "@/ts/http";
import {ElMessage} from "element-plus";
import {jwxt} from "@/ts/jwxt";
import {Course} from "@/ts/type/course";
import {BaseColor, Color} from "@/ts/color";

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
    randomColor: [
        new Color(BaseColor.pink),
        new Color(BaseColor.lightgreen),
        new Color(BaseColor.skyblue),
        new Color(BaseColor.orange),
        new Color(BaseColor.tan),
        new Color(BaseColor.sandybrown),
        new Color(BaseColor.navy),
        new Color(BaseColor.maroon),
        new Color(BaseColor.mediumspringgreen),
        new Color(BaseColor.slateblue),
        new Color(BaseColor.yellowgreen),
        new Color(BaseColor.red),
        new Color(BaseColor.yellow),
        new Color(BaseColor.gold),
        new Color(BaseColor.lightskyblue),
        new Color(BaseColor.lightsteelblue),
        new Color(BaseColor.limegreen),
        new Color(BaseColor.mediumaquamarine),
        new Color(BaseColor.mediumblue),
    ]
};

interface CourseItem extends Course {
    // 在课程表中显示的背景颜色
    backgroundColor: string;
}

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
    ] as CourseItem[][],
    dialog: {
        visible: false,
        ori: {} as CourseItem,
        detail: [] as { key: string, value: string }[],
    },
    week: {
        current: 1,
        total: 20,
    },
    form: {
        year: 4,
        term: 0,
        tag: 0,
    }
});

function query(retry = true) {
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
                randomCourseColor(res.kbList);
                data.value.result = res;
                localStorage.setItem("classSchedule", JSON.stringify(res));
                ElMessage.success("查询成功");
                parseCourses();
            } else if (retry) {
                ElMessage.error("查询失败，尝试重新获取Cookie...");
                jwxt.refreshCookie()
                    .then(res => {
                        if (Array.isArray(res) && res.length >= 2) {
                            ElMessage.success("尝试重新查询...");
                            query();
                        }
                    });
            } else {
                ElMessage.error("查询失败，请尝试手动登录或稍后再进行查询，请联系管理员");
            }
            console.log(res);
        });
}

function randomCourseColor(courseList: CourseItem[]) {
    //使得相同课程的颜色相同
    const courseColor = {};
    courseList.forEach((course: CourseItem) => {
        if (!courseColor[course.kcmc]) {
            let randomNum = Math.floor(Math.random() * staticData.randomColor.length);
            course.backgroundColor =
                courseColor[course.kcmc] =
                    staticData.randomColor[randomNum].setAlpha(0.3).rgbaString;
        } else course.backgroundColor = courseColor[course.kcmc];
    });
}

function parseCourses() {
    data.value.classList = [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ] as CourseItem[][];
    if (data.value.result.kbList) {
        data.value.result.kbList.forEach((course: CourseItem) => {
            if (testCourseWeek(course)) {
                data.value.classList[parseInt(course.xqj) - 1].push(course);
            }
        });
    }
}

parseCourses();

function testCourseWeek(course: CourseItem): boolean {
    const weekSpans = course.zcd.split(",");
    let res = false;
    weekSpans.forEach(weekSpan => {
        const weeks = weekSpan.replace("周", "")
            .split("-")
            .map(week => parseInt(week));
        if (weeks.length === 1 && weeks[0] === data.value.week.current ||
            weeks[0] <= data.value.week.current && data.value.week.current <= weeks[1]) {
            res = true;
            return;
        }
    });
    return res;
}

function showDetail(course: CourseItem) {
    const details = {
        "课程名称": course.kcmc,
        "场地": course.cdmc,
        "学分": course.xf,
        "周次": course.zcd,
        "上课时间": course.xqjmc + course.jc,
        "考查方式": course.khfsmc,
        "QQ群": course.qqqh,
        "课程类别": course.kclb,
        "教师": course.xm,
        "教学班组成": course.jxbzc,
    };
    data.value.dialog.ori = course;
    data.value.dialog.detail = [];
    for (const key in details) {
        data.value.dialog.detail.push({
            key: key,
            value: details[key]
        });
    }
    console.log(data.value.dialog.detail)
    data.value.dialog.visible = true;
}

function removeData() {
    localStorage.setItem("classSchedule", JSON.stringify({}));
    data.value.result = JSON.parse("{}");
    ElMessage.success("本地数据已清空");
}

function copy(text: string) {
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
    ElMessage.success("已复制到剪贴板");
}
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
            <el-space>
                <el-text style="font-size: 1.1em">查询结果</el-text>
                <el-button
                    type="danger"
                    text
                    @click="removeData">
                    清空本地数据
                </el-button>
            </el-space>
            <div style="display: flex;">
                <el-text style="word-break: keep-all;margin-right: 1em;">当前周数：</el-text>
                <el-slider
                    step="1"
                    v-model="data.week.current"
                    :min="1"
                    :max="data.week.total"
                    @input="parseCourses"
                    show-input/>
            </div>
            <el-divider/>
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
                        <el-text>{{ time }}</el-text>
                    </div>
                </el-col>
                <el-col
                    :span="3"
                    class="day"
                    v-for="(day,index) in staticData.days">
                    <div>{{ day }}</div>
                    <div
                        v-for="course in data.classList[index] as CourseItem[]"
                        :key="data.classList[index].indexOf(course)"
                        @click="showDetail(course)"
                        :style="
                        `background-color:${course.backgroundColor};`+
                        `--span: ${parseInt(course.jcs.split('-')[1])-parseInt(course.jcs.split('-')[0])+1};`+
                        `--dy:${parseInt(course.jcs.split('-')[0])-1};`"
                        class="course">
                        <el-text>{{ course.kcmc }}</el-text>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <el-dialog v-model="data.dialog.visible" title="课程详情">
            <el-text>点击数据复制到剪贴板</el-text>
            <el-table
                :data="data.dialog.detail"
                style="width: 100%">
                <el-table-column prop="key" label="属性"/>
                <el-table-column prop="value" label="值">
                    <template #default="scope">
                        <div
                            @click="copy(scope.row.value)"
                            style="cursor: pointer;">
                            {{ scope.row.value }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <el-button @click="copy(JSON.stringify(data.dialog.ori))">
                    复制原始数据
                </el-button>
                <el-button type="primary" @click="data.dialog.visible = false">
                    关闭
                </el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.el-card:not(:first-child) {
    margin-top: 1em;
}

.day {
    $spanHeight: 4em;
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
        border-radius: 5px;
        margin-top: $marginTop;
        overflow: hidden;
    }

    &:not(:first-child) .course {
        position: absolute;
    }
}
</style>
