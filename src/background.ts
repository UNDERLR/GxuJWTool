'use strict';

import {Http} from "@/electron/http";
import {jwxt} from "@/electron/jwxt";
import {app, protocol, BrowserWindow} from 'electron';
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib';
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer';
import {ipcMain} from 'electron';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
]);

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        minWidth: 800,
        height: 600,
        minHeight: 600,
        frame: false,
        icon: "./src/assets/icon.jpg",
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: (process.env
                .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
            // nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
        }
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) {
            // win.webContents.openDevTools();
            // support f12 debug
            win.webContents.on("before-input-event", (e, input) => {
                if (input.key == "F12") {
                    win.webContents.openDevTools();
                    e.preventDefault();
                }
            });
        }
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        // 通过点击首页按钮初始化首页
        win.loadURL('app://./index.html')
            .then(()=>{
                win.webContents.executeJavaScript("document.querySelector(\"#app > section > header > div > div.headerCenter > ul > li:nth-child(1)\").click()");
            })
    }
    // 启动时获取route cookie(已废弃，登录时会自动获取)
    // const routeCookie = await jwxt.getRouteCookie();
    // await win.webContents.executeJavaScript(`document.cookie="${routeCookie}; Expires=Expires=Thu, 01 Jan 9999 00:00:01 GMT;"`)

    ipcMain.handle("http",async (e, ...args)=>{
        return await Http(args);
    })
    ipcMain.handle("jwxt",async (e, ...args)=>{
        return await jwxt.ipcHandler(args);
    })
//接收最小化命令
    ipcMain.on('window-min', function() {
        win.minimize();
    })
//接收最大化命令
    ipcMain.on('window-max', function() {
        if (win.isMaximized()) {
            win.restore();
        } else {
            win.maximize();
        }
    })
//接收关闭命令
    ipcMain.on('window-close', function() {
        win.destroy();
    })

}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS);
        } catch (e: any) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
