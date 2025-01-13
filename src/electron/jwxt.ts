import axios from "axios";
import {BrowserWindow} from "electron";

async function getRouteCookie() {
    const response = await axios.get("https://jwxt2018.gxu.edu.cn/jwglxt/xtgl/login_slogin.html");
    // 结构如下，获取第二个route
    // 'set-cookie': [
    //     'JSESSIONID=BAA9B6BBD6DFB19D3E10703A4931DD88; Path=/jwglxt; HttpOnly',
    //     'route=1a30fbe1d4abfc0b74b9a9bea68314d9;Path=/'
    // ],
    return response.headers["set-cookie"][1].split(";")[0];
}

async function login() {
    console.log("awa");
    const win = jwxt.loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    await win.loadURL(`https://jwxt2018.gxu.edu.cn/jwglxt/xtgl/login_slogin.html?time=${Date.now()}`);
}

async function getCookies() {
    if (jwxt.loginWindow) {
        let cookies = jwxt.loginWindow.webContents.session.cookies.get({
            domain: "jwxt2018.gxu.edu.cn",
        });
        jwxt.loginWindow.destroy();
        return cookies;
    } else return [];
}

async function ipcHandler(args: any[]) {
    switch (args[0]) {
        case "openLoginWindow":
            return await login();
        case "getCookies":
            return await getCookies();
    }
}

export const jwxt = {
    loginWindow: null as BrowserWindow | null,
    ipcHandler: ipcHandler,
    getRouteCookie: getRouteCookie
};
