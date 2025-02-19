<script setup lang="ts">
import {ref} from "vue";
import {StudentEvaluationItem} from "@/ts/type/tool/eduEvaluation/studentEvaluation";
import {http} from "@/ts/http";
import {ElMessage} from "element-plus";
import {jwxt} from "@/ts/jwxt";
import {StudentEvaluationQueryListAPIRes} from "@/ts/type/tool/eduEvaluation/studentEvaluationAPIRes";


const data = ref({
    activeItem: {
        listItem: null as StudentEvaluationItem | null,
        data: null as ItemData | null,
    },
    list: {
        itemArr: JSON.parse(localStorage.getItem("studentEvaluationList") || "[]") as StudentEvaluationItem[],
        page: {
            currentPage: 1,
            totalCount: 0,
            pageSize: 15,
        }
    },
});

function getList(retry = true) {
    const postData = http.objectToFormUrlEncoded({
            _search: false,
            nd: Date.now(),
            queryModel: {
                showCount: data.value.list.page.pageSize,
                currentPage: data.value.list.page.currentPage,
                sortName: "kcmc, jzgmc",
                sortOrder: "asc",
            },
            time: 0,
        })
    ;
    http.post("https://jwxt2018.gxu.edu.cn/jwglxt/xspjgl/xspj_cxXspjIndex.html?doType=query&gnmkdm=N401605", postData)
        .then((res: StudentEvaluationQueryListAPIRes) => {
            if (!res) {
                ElMessage.error("查询失败，请联系管理员");
                return;
            }
            if (typeof res === "object") {
                console.log(res);
                // 列表分页
                data.value.list.page.totalCount = res.totalCount;
                data.value.list.itemArr = res.items;
                localStorage.setItem("studentEvaluationList", JSON.stringify(res.items));
            } else if (retry) {
                ElMessage.error("查询失败，尝试重新获取Cookie...");
                jwxt.refreshCookie()
                    .then(res => {
                        if (Array.isArray(res) && res.length >= 2) {
                            ElMessage.success("尝试重新查询...");
                            getList(false);
                        }
                    });
            } else {
                ElMessage.error("查询失败，请尝试手动登录或稍后再进行查询，请联系管理员");
            }
        });
}

// getList();

function loadItem(item: StudentEvaluationItem) {
    data.value.activeItem.listItem = item;
    ElMessage.info(`加载${item.jxbmc}评价页面...`);
    const postData = http.objectToFormUrlEncoded({
        jxb_id: item.jxb_id,
        kch_id: item.kch_id,
        xsdm: item.xsdm,
        jgh_id: item.jgh_id,
        tjzt: item.tjzt,
        pjmbmcb_id: item.pjmbmcb_id,
        sfcjlrjs: item.sfcjlrjs,
    });
    http.post("https://jwxt2018.gxu.edu.cn/jwglxt/xspjgl/xspj_cxXspjDisplay.html?gnmkdm=N401605", postData)
        .then((res: any) => {
            if (!res) {
                ElMessage.error("加载失败，请联系管理员");
                return;
            }
            ElMessage.success(`加载${item.jxbmc}评价页面成功`);
            const dom = new DOMParser().parseFromString(res, "text/html");
            data.value.activeItem.data = parseData(dom);
            console.log(data);
        });
}

interface OptionTdItem {
    options: string[];
    select: number | null;
}

interface ItemData {
    info: string;
    selectionList: Record<string, Record<string, string | OptionTdItem>>;
    comment: string;
}

/**
 * 解析获取的评价页面
 * @param html 页面HTML
 * @returns {ItemData} 解析结果
 */
function parseData(html: Document): ItemData {
    const res = {
        info: html.querySelector("#ajaxForm1 > div.row > div.col-sm-8").textContent.trim(),
        selectionList: {},
        comment: "",
    } as ItemData;

    const selectionList = {};
    const blockquotes = [...html.querySelectorAll(".panel-body > blockquote > p")].map(p => p.textContent.trim());
    const table = html.querySelectorAll("table");
    table.forEach((t: HTMLTableElement, i) => {
        const trs = t.querySelectorAll("tr");
        const title = blockquotes[i];
        if (!selectionList[title]) selectionList[title] = {};
        trs.forEach((tr: HTMLTableRowElement, j) => {
            const tds = tr.querySelectorAll("td");
            let part = selectionList[title];
            if (!tds[1].querySelector("div")) {
                part[tds[0].textContent.trim()] = tds[1].textContent.trim();
            } else {
                part[tds[0].textContent.trim()] = {};
                part[tds[0].textContent.trim()].options =
                    [...tds[1].querySelectorAll("label")].map(l => l.textContent.trim());
                // 查找选中项
                if (tds[1].querySelector("input[type='radio']:checked")) {
                    part[tds[0].textContent.trim()].select =
                        [...tds[1].querySelectorAll("input[type='radio']")]
                            .findIndex((r: HTMLInputElement) => r.checked);
                } else part[tds[0].textContent.trim()].select = null;
            }
        });
    });
    res.selectionList = selectionList;

    const commentEle = html.querySelector("#pyDiv > .input-xspj");
    if (!commentEle.querySelector("textarea")) {
        res.comment = commentEle.textContent.trim();
    } else res.comment = commentEle.querySelector("textarea").textContent.trim();
    return res;
}
</script>

<template>
    <el-card shadow="never" body-class="card">
        <el-table
            @row-click="loadItem"
            max-height="50vh"
            :data="data.list.itemArr">
            <el-table-column label="提交状态" prop="tjztmc" width="80px" align="center">
                <template #default="scope">
                    <span v-if="scope.row.tjzt==='1'"
                          style="color: var(--el-color-success);">{{ scope.row.tjztmc }}</span>
                    <span v-else style="color: var(--el-color-danger);">{{ scope.row.tjztmc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="教职工名称" prop="jzgmc" width="100px"/>
            <el-table-column label="教学班" prop="jxbmc" width="200px"/>
            <el-table-column label="课程" prop="kcmc" width="200px"/>
            <el-table-column label="学时" prop="xsmc" width="70px"/>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="data.list.page.currentPage"
            :page-size="data.list.page.pageSize"
            :total="data.list.page.totalCount"
            @current-change="getList"
        />
    </el-card>
    <el-card shadow="never">
        <div>
            自动填写选项
        </div>
    </el-card>
    <el-card v-if="data.activeItem.data" shadow="never">
        <template #header>
            <span>评价页面</span>
        </template>
        <div>
            评价教师：{{ data.activeItem.listItem.jzgmc }}
            <br/>
            评价信息：{{ data.activeItem.data.info }}
        </div>
        <el-card
            shadow="never"
            v-for="(table, title) in data.activeItem.data.selectionList">
            <template #header>
                <span>{{ title }}</span>
            </template>
            <el-row
                v-for="(part, partTitle) in table">
                <el-col :span="12">
                    <span>{{ partTitle }}</span>
                </el-col>
                <el-col :span="12">
                    <el-radio-group
                        v-if="typeof part === 'object'"
                        v-model="part.select">
                        <el-radio
                            v-for="(option, index) in part.options"
                            :label="index">
                            {{ option }}
                        </el-radio>
                    </el-radio-group>
                    <span v-else>{{ part }}</span>
                </el-col>
            </el-row>

        </el-card>
    </el-card>
</template>

<style scoped lang="scss">
.el-card:not(:first-child),
.el-row:not(:first-child) {
    margin-top: 15px;
}
</style>
