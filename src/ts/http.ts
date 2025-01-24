import {cookie} from "@/ts/cookie";
import {ipcRenderer} from "electron";

const channel = "http";
const defaultHeaders = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie.getFormatted()
};

function objectToFormUrlEncoded(obj: any) {
    return Object.keys(obj).map(key => `${key}=${encodeURIComponent(obj[key])}`).join("&");
}

function post(url: string, data: any = {}, headers: any = defaultHeaders) {
    return ipcRenderer.invoke(channel, "post", url, data, headers);
}

export const http = {
    post,
    objectToFormUrlEncoded
};
