<script setup lang="ts">
import {jwxt} from "@/ts/jwxt";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {http} from "@/ts/http";
import {SchoolTerms, SchoolYears} from "@/ts/type/global";
import {ExamInfoQueryRes} from "@/ts/type/tool/infoQuery/examInfoQuery";
import {Tool} from "@/ts/tool";

const staticData = {
    year: [
        ["", "全部"],
        ...SchoolYears,
    ],
    term: [
        ["", "全部"],
        ...SchoolTerms,
    ],
    tag: [
        ["", "全部"],
        ["0", "主修"],
        ["1", "辅修"],
        ["2", "微专业"],
        ["3", "二学位"],
        ["4", "非学位"],
        ["8", "二学位转一专"],
    ]
};

const data = ref({
    result: JSON.parse(localStorage.getItem("examInfo") || "{}"),
    page: {
        current: 1,
        size: 15,
    },
    dialog: {
        ori: {} as any,
        visible: false,
        content: [] as string[][],
    },
    form: {
        year: staticData.year.findIndex((item) => item[0] === (new Date().getFullYear() - 1).toString()),
        term: Tool.inRange(new Date().getMonth() + 1, 2, 7)
            ? staticData.term.findIndex(item => item[1] === "2")
            : staticData.term.findIndex(item => item[1] === "1"),
        tag: 0,
    }
});

function query(retry = true) {
    const formData = {
        xnm: staticData.year[data.value.form.year][0],
        xqm: staticData.term[data.value.form.term][0],
        kcbj: staticData.tag[data.value.form.tag][0],
        _search: false,
        queryModel: {
            showCount: data.value.page.size,
            currentPage: data.value.page.current,
            sortName: "",
            sortOrder: "asc",
        },
        time: 0,
    };
    ElMessage.info("正在查询...");
    // 通过Electron主进程发送请求
    http.post("https://jwxt2018.gxu.edu.cn/jwglxt/cjcx/cjcx_cxXsgrcj.html?doType=query", http.objectToFormUrlEncoded(formData))
        .then((res: ExamInfoQueryRes) => {
            if (!res) {
                ElMessage.error("查询失败，请联系管理员");
                return;
            }
            if (typeof res === "object") {
                data.value.result = res;
                localStorage.setItem("examInfo", JSON.stringify(res));
                ElMessage.success("查询成功");
            } else if (retry) {
                ElMessage.error("查询失败，尝试重新获取Cookie...");
                jwxt.refreshCookie()
                    .then(res => {
                        if (Array.isArray(res) && res.length >= 2) {
                            ElMessage.success("尝试重新查询...");
                            query(false);
                        }
                    });
            } else {
                ElMessage.error("查询失败，请尝试手动登录或稍后再进行查询，请联系管理员");
            }
            console.log(res);
        });
}

function showDetail(index: number) {
    data.value.dialog.content = [];
    data.value.dialog.ori = data.value.result.items[index];
    let ori = data.value.result.items[index];
    for (const key in ori) {
        if (Object.prototype.toString.call(ori[key]) !== "[object Object]") {
            data.value.dialog.content.push([key, ori[key]]);
        }
    }
    data.value.dialog.visible = true;
}

function removeData() {
    localStorage.setItem("examInfo", JSON.stringify({}));
    data.value.result = JSON.parse("{}");
    ElMessage.success("本地数据已清空");
}
</script>

<template>
    <div class="container">
        <el-card shadow="never">
            <el-form :model="data.form" label-width="auto">
                <el-form-item required label="学年学期">
                    <el-col :span="12">
                        <el-select
                            v-model="data.form.year"
                            filterable>
                            <el-option
                                v-for="(item,index) in staticData.year"
                                :key="index"
                                :label="item[1]"
                                :value="index"/>
                        </el-select>
                    </el-col>
                    <el-col :span="11" :offset="1">
                        <el-select
                            v-model="data.form.term"
                            filterable>
                            <el-option
                                v-for="(item,index) in staticData.term"
                                :key="index"
                                :label="item[1]"
                                :value="index"/>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="课程标记">
                    <el-select
                        v-model="data.form.tag"
                        filterable>
                        <el-option
                            v-for="(item,index) in staticData.tag"
                            :key="index"
                            :label="item[1]"
                            :value="index"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="每页数量">
                    <el-input-number v-model="data.page.size" :min="1" :max="100">
                        <template #suffix>
                            <span>条/页</span>
                        </template>
                    </el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="query">查询</el-button>
                    <el-button @click="jwxt.openPage('cjcx/cjcx_cxDgXscj.html?gnmkdm=N305005&layout=default')">打开教务系统成绩查询页面</el-button>
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
            <el-pagination
                v-model:current-page="data.page"
                v-model:page-size="data.result.pageSize"
                background
                style="margin-top: 1em"
                layout="total, prev, pager, next, jumper"
                :total="data.result.totalCount"
                @size-change="query"
                @current-change="query"
            />
            <el-table :data="data.result.items" style="width: 100%;margin-top: 1em;">
                <el-table-column width="100px">
                    <template #default="scope">
                        <el-button
                            text
                            type="primary"
                            @click="showDetail(scope.$index)">详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="xnmmc" label="学年" width="100px"/>
                <el-table-column prop="kcmc" label="课程名称" width="200px"/>
                <el-table-column prop="cj" label="成绩" width="70px"/>
                <el-table-column prop="xf" label="学分" width="70px"/>
                <el-table-column prop="jd" label="绩点" width="70px"/>
<!--                <el-table-column prop="dateDigit" label="成绩时间" width="150px"/>-->
                <el-table-column prop="jxbmc" label="教学班" width="190px"/>
                <el-table-column prop="jsxm" label="教师" width="100px"/>
            </el-table>

            <el-dialog v-model="data.dialog.visible" title="成绩详情">
                <el-text>点击数据复制到剪贴板</el-text>
                <el-table
                    :data="data.dialog.content"
                    style="width: 100%">
                    <el-table-column prop="0" label="属性"/>
                    <el-table-column prop="1" label="值">
                        <template #default="scope">
                            <div
                                @click="Tool.copy(scope.row[1])"
                                style="cursor: pointer;">
                                {{ scope.row[1] }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <template #footer>
                    <el-button @click="Tool.copy(JSON.stringify(data.dialog.ori))">
                        复制原始数据
                    </el-button>
                    <el-button type="primary" @click="data.dialog.visible = false">
                        关闭
                    </el-button>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.container > .el-card {
    margin-bottom: 1em;
}
</style>
