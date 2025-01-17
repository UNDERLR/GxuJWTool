import {ipcRenderer} from "electron";

function setItem(key: string, value: any) {
    ipcRenderer.invoke("storage", {
        type: "setItem",
        key,
        value,
    });
}

async function getItem(key: string) {
    return ipcRenderer.invoke("storage", {
        type: "getItem",
        key,
    });
}

export const storage = {
    setItem,
    getItem,
}
