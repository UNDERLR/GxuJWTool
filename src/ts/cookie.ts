function getCookie(name: string) {
    const cookies = JSON.parse(localStorage.getItem("cookies") || "{}");
    return cookies[name];
}

function setCookie(name: string, value: any) {
    const cookies = JSON.parse(localStorage.getItem("cookies") || "{}");
    cookies[name] = value;
    localStorage.setItem("cookies", JSON.stringify(cookies));
}

function removeCookie(name: string) {
    const cookies = JSON.parse(localStorage.getItem("cookies") || "{}");
    delete cookies[name];
    localStorage.setItem("cookies", JSON.stringify(cookies));
}

function getAllCookies() {
    return JSON.parse(localStorage.getItem("cookies") || "{}");
}

function getFormattedCookies() {
    const cookies = JSON.parse(localStorage.getItem("cookies") || "{}");
    return Object.keys(cookies).map(key => `${key}=${cookies[key]}`).join("; ");
}

export const cookie = {
    get: getCookie,
    set: setCookie,
    remove: removeCookie,
    getAll: getAllCookies,
    getFormatted: getFormattedCookies
}
