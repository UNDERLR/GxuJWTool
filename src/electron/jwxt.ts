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

async function autoGetCookies(username: string, password: string) {
    return await new Promise((resolve, reject) => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
        });
        let res = [];
        win.webContents.on("did-finish-load", async () => {
            const url = win.webContents.getURL();
            if (url.includes("login_slogin.html")) {
                // 输入用户名密码, 点击登录
                setTimeout(async () => {
                    await win.webContents.executeJavaScript(
                        `
    document.getElementById("yhm").value = "${username}"
    document.getElementById("mm").value = "${password}"
    document.getElementById("dl").click();`);
                }, 100);
                // 判断是否登录成功
                setTimeout( async () => {
                    if (win.webContents.getURL().includes("login_slogin.html"))
                        resolve(await win.webContents.executeJavaScript("document.getElementById(\"tips\").innerText"));
                }, 5000);
            } else if (url.includes("index_initMenu.html")) {
                // 获取cookie
                res = await win.webContents.session.cookies.get({
                    domain: "jwxt2018.gxu.edu.cn",
                });
                win.destroy();
                resolve(res);
            }
        });
        win.loadURL(`https://jwxt2018.gxu.edu.cn/jwglxt/xtgl/login_slogin.html?time=${Date.now()}`);
    })

}

async function login() {
    console.log("awa");
    const win = jwxt.loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadURL(`https://jwxt2018.gxu.edu.cn/jwglxt/xtgl/login_slogin.html?time=${Date.now()}`);
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
        case "autoGetCookies":
            return await autoGetCookies(args[1], args[2]);
    }
}

export const jwxt = {
    loginWindow: null as BrowserWindow | null,
    ipcHandler: ipcHandler,
    getRouteCookie: getRouteCookie
};
