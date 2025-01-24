<script setup lang="ts">
import {jwxt} from "@/ts/jwxt";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {http} from "@/ts/http";

const staticData = {
    year: [
        ["", "全部"],
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
        ["", "全部"],
        ["3", "1"],
        ["12", "2"],
        ["16", "3"],
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
    result: JSON.parse(localStorage.getItem("score") || "{}"),
    page: {
        current: 1,
        size: 15,
    },
    dialog: {
        visible: false,
        content: [] as string[][],
    },
    form: {
        year: 5,
        term: 1,
        tag: 0,
    }
});

function queryScore() {
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
    console.log(formData)
    // 通过Electron主进程发送请求
    http.post("https://jwxt2018.gxu.edu.cn/jwglxt/cjcx/cjcx_cxXsgrcj.html?doType=query", formData)
        .then(res => {
            if (!res) {
                ElMessage.error("查询失败，请联系管理员");
                return;
            }
            if (typeof res === "object") {
                data.value.result = res;
                localStorage.setItem("score", JSON.stringify(res));
                ElMessage.success("查询成功");
            } else {
                ElMessage.error("查询失败，尝试重新获取Cookie...");
                jwxt.refreshCookie()
                    .then(res => {
                        if (Array.isArray(res) && res.length >= 2) {
                            ElMessage.success("尝试重新查询...");
                            queryScore();
                        }
                    });
            }
            console.log(res);
        });
}

function handleDetail(index: number) {
    data.value.dialog.content = [];
    let ori = data.value.result.items[index];
    for (const key in ori) {
        if (Object.prototype.toString.call(ori[key]) !== "[object Object]") {
            data.value.dialog.content.push([key, ori[key]]);
        }
    }
    data.value.dialog.visible = true;
}

function removeData() {
    localStorage.setItem("score", JSON.stringify({}));
    data.value.result = JSON.parse("{}");
    ElMessage.success("本地数据已清空");
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
                    <el-button type="primary" @click="queryScore">查询</el-button>
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
                @size-change="queryScore"
                @current-change="queryScore"
            />
            <el-table :data="data.result.items" style="width: 100%;margin-top: 1em;">
                <el-table-column width="100px">
                    <template #default="scope">
                        <el-button
                            text
                            type="primary"
                            @click="handleDetail(scope.$index)">详情
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="xnmmc" label="学年" width="100px"/>
                <el-table-column prop="kcmc" label="课程名称" width="200px"/>
                <el-table-column prop="cj" label="成绩" width="70px"/>
                <el-table-column prop="xf" label="学分" width="70px"/>
                <el-table-column prop="jd" label="绩点" width="70px"/>
                <el-table-column prop="dateDigit" label="成绩时间" width="150px"/>
                <el-table-column prop="jxbmc" label="教学班" width="190px"/>
                <el-table-column prop="jsxm" label="教师" width="100px"/>
            </el-table>

            <el-dialog v-model="data.dialog.visible" title="成绩详情">
                <el-table
                    :data="data.dialog.content"
                    style="width: 100%">
                    <el-table-column prop="0" label="属性"/>
                    <el-table-column prop="1" label="值"/>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.container > .el-card {
    margin-bottom: 1em;
}
</style>
