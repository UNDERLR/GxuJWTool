import {ipcRenderer} from "electron";
import {ElMessage} from "element-plus";

function refreshCookie(){
    const logData = JSON.parse(localStorage.getItem("logData") ?? "{}");
    ElMessage.info("正在重新获取Cookie...");
    ipcRenderer.invoke("jwxt", "autoGetCookies", logData.username, logData.password)
        .then(res => {
            if (res?.length >= 2) {
                res.forEach(cookie => {
                    document.cookie = `${cookie.name}=${cookie.value};expires= Fri, 31 Dec 9999 23:59:59 GMT`;
                });
                ElMessage.success("获取成功");
            } else ElMessage.error("获取失败，请在首页重新登录");
        });
}

export const jwxt = {
    refreshCookie: refreshCookie
}
