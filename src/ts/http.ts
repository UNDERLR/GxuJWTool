import {cookie} from "@/ts/cookie";
import {ipcRenderer} from "electron";

const channel = "http";

function generateDefaultHeaders() {
    return {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": cookie.getFormatted()
    };
}


function objectToFormUrlEncoded(obj: any, prefix = ""): string {
    let res = "";
    for (const key in obj) {
        if (typeof obj[key] === "object") {
            res += objectToFormUrlEncoded(obj[key], prefix + key + ".");
        } else res += prefix + key + "=" + encodeURIComponent(obj[key]) + "&";
    }
    if (!prefix) res = res.slice(0, -1);
    return res;
}

function post(url: string, data: any = {}, headers: any = generateDefaultHeaders()) {
    return ipcRenderer.invoke(channel, "post", url, data, headers);
}

export const http = {
    post,
    objectToFormUrlEncoded
};
