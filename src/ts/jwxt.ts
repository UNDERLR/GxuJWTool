import {ipcRenderer} from "electron";
import {ElMessage} from "element-plus";
import {cookie} from "@/ts/cookie";

function refreshCookie(){
    return new Promise((resolve, reject) => {
        const logData = JSON.parse(localStorage.getItem("logData") ?? "{}");
        if (!logData.username || !logData.password) {
            ElMessage.error("请先登录设置用户名和密码，自动刷新Cookie才能正常使用");
            resolve(null);
            return;
        }
        ElMessage.info("正在重新获取Cookie...");
        ipcRenderer.invoke("jwxt", "autoGetCookies", logData.username, logData.password)
            .then(res => {
                if (res?.length >= 2) {
                    res.forEach(item => {
                         cookie.set(item.name, item.value);
                    });
                    ElMessage.success("获取Cookie成功");
                    resolve(res);
                } else {
                    ElMessage.error("获取Cookie失败，请在首页重新登录");
                    resolve(null)
                }
            });
    });
}

export const jwxt = {
    refreshCookie: refreshCookie
}
