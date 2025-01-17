import {ipcMain} from "electron";
import Store from "electron-store"

export const store = new Store

function setItem(key: string, value: any) {
    store.set(key, value)
}

function getItem(key: string) {
    return store.get(key)
}

function init() {
    ipcMain.handle("storage", (event, {type, key, value})=>{
        if (type === "setItem") {
            setItem(key, value)
        } else if (type === "getItem") {
            event.returnValue = getItem(key)
        }
    })
}

export const storage = {
    init,
    setItem,
    getItem
}
